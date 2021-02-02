# Nowsecure Report Parser

This repo takes advantage of [Nowsecure's REST API ](https://docs.nowsecure.com/auto/api/spec/#api-Account) in order to retrieve the report's findings for the given platforms. Since the ultimate goal is to use the output of that application as an input to the [Jira Server Integration Action](https://github.com/camelotls/actions-jira-integration), the report's JSON will be reformatted in order to retrieve the following data:

- vulnerabilityName
- issueSummary
- issueDescription
- issueSeverity

## Usage
### Inputs
|Parameter|Required|Default value|Description|
|:--:|:--:|:--:|:--:|
|PLATFORMS|true|N/A|An array of the platforms the Nowsecure report has run against|
|NOWSECURE_ACCESS_TOKEN|true|N/A|The access token retrieved from Nowsecure in order for the action to be able to interact with Nowsecure's API|
|IOS_PACKAGE|true|N/A|The name of the app's package for the iOS platform|
|ANDROID_PACKAGE|true|N/A|The name of the app's package for the Android platform|

### Outputs
The action outputs a array of JSON objects named `NOWSECURE_DATA` which has the following format for example:

```
[{ '17f53cbf-f744-482c-9437-ee5692716198':
      { key: 'leaked_logcat_data_build_fingerprint',
        title: 'Build Fingerprint Leaked To Device Logs',
        description: 'The information specified has been found within device logs. Data written to device system logs can be accessed through several attack vectors.  An attacker who is able to access the charging port may be able to access this data if the user acknowledges the trust.  Another attack vector includes devices that allow other apps to view the device system logs.  This is common on various OEM devices.',
        recommendation: 'To prevent this sensitive information from being compromised (such as by\nanother application or process running on the same device), it is recommended\nthat debug logs be disabled in a production environment. More details and code snippets can be found at [https://developer.android.com/studio/publish/preparing](https://developer.android.com/studio/publish/preparing). \n\nAnother method involves leveraging ProGuard or DexGuard (or an alternative) to completely remove the\nmethod calls to the Log class, thus stripping all calls to Log.d, Log.i,\nLog.v, Log.e methods. One example is use add the following snippet to\n`proguard.cfg`:\n\n```\n-assumenosideeffects class android.util.Log {\n  public static *** d(...);\n  public static *** v(...);\n  public static *** i(...);\n  public static *** e(...);\n}\n```\nThe context table below shows the log entries that contained the sensitive information specified.',
        severity: 'low'
       }
},
{...}]
```

## Example workflow

```
name: Nowsecure

on:
    schedule:
        - cron: "30 04 * * *"

jobs:
    chore:
        name: 'Creating Jira tickets for the Nowsecure detected vulnerabilities'
        runs-on: aws-core-runner
        steps:
            - name: Checkout uk-mobile repo
              uses: actions/checkout@v2
            - name: Use Node.js 12.x
              uses: actions/setup-node@v1
              with:
                  node-version: 12.x
            - name: Execute Nowsecure action
              id: nowsecure_action
              uses: ./actions-nowsecure/
              with:
                  PLATFORMS: "ios,android"
                  NOWSECURE_ACCESS_TOKEN: ${{ secrets.NOWSECURE_ACCESS_TOKEN }}
                  IOS_PACKAGE: 'co.uk.camelot'
                  ANDROID_PACKAGE: 'uk.co.theofficialnationallotteryapp.android.play'
            - name: Checkout Jira integration GitHub Action Repo
              uses: actions/checkout@v2
              with:
                  repository: camelotls/actions-jira-integration
                  ref: v1.1.1
                  token: ${{ secrets.MACHINEUSER_GITHUB_TOKEN }}
                  path: actions-jira-integration
            - name: Jira ticket creation
              id: jira_integration
              uses: ./actions-jira-integration/
              with:
                   JIRA_USER: ${{ secrets.JIRA_USER }}
                   JIRA_PASSWORD: ${{ secrets.JIRA_PASSWORD }}
                   INPUT_JSON: ${{ steps.nowsecure_action.outputs.reportOutput }}
                   JIRA_PROJECT: MBIL
                   JIRA_URI: 'jira.camelot.global'
                   REPORT_INPUT_KEYS: |
                       vulnerabilityName: {{key}}
                       issueSummary: Nowsecure: {{title}}
                       issueDescription: \`*Recommendation*:\\n\\n{{recommendation}}\\n\\n*Details for {{key}}*\\n\\n*Overview*\\n\\n{{description}}\\n\\n`
                       issueSeverity: {{severity}}
                   IS_NPM_AUDIT: false
                   JIRA_ISSUE_TYPE: 'Security Vulnerability'
                   RUNS_ON_GITHUB: true
            - name: Get actions' user id
              id: get_uid
              run: |
                  actions_user_id=`id -u $USER`
                  echo $actions_user_id
                  echo ::set-output name=uid::$actions_user_id
            - name: Correct Ownership in GITHUB_WORKSPACE directory
              uses: peter-murray/reset-workspace-ownership-action@v1
              with:
                  user_id: ${{ steps.get_uid.outputs.uid }}

```
