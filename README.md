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
{
    "6b2a7a6d-a7e5-48a0-b8c9-ddbbf9b2038d": {
        "key": "local_auth_check",
        "title": "Application Includes Insecure Library for Processing Biometric Authentication",
        "description": "The Local Authentication library was found included in your application binary. At worst, it is being used for biometric authentication that is easily bypassed by someone with access to the device. At best, it is extraneous functionality that should not be included in the app as a best practice.",
        "recommendation": "Consider using Keychain ACLs (Access Control Lists) to achieve similar\nfunctionality.\n\nAn example implementation would store the application's\nsecret in a Keychain and assign an ACL to this Keychain item that would\ninstruct iOS to perform a user presence check before reading and returning\nthe Keychain item to the application. Sample code can be found\non [Apple's website](https://developer.apple.com/documentation/localauthentication/accessing_keychain_items_with_face_id_or_touch_id).",
        "severity": "low"
    },
    "6e53cd8c-e317-4af0-8b38-d81728301a4d": {
        "key": "app_transport_security",
        "title": "Disabled App Protection (ATS) Can Lead to Insecure Network Connections",
        "description": "Your application has globally disabled App Transport Security (ATS). ATS helps ensure secure connections between an app and the back end server(s). Disabling ATS globally will allow a\nconnection regardless of HTTP or HTTPS configuration, allow\nconnection to servers with lower TLS versions, and allow connection\nusing cipher suites that do not support forward secrecy (FS).\nIt is on by default when an app is linked against iOS 9.0 SDK or later. With ATS enabled, HTTP connections are forced to use HTTPS (TLS v1.2), and any attempts to connect using insecure HTTP will fail. There are a couple of options when implementing ATS:\n* ATS can be enabled globally (by linking to iOS 9.0 or later SDK), and the developer can choose to decrease ATS restrictions on a specific server using an exception key.\n* ATS can be disabled globally (by settings the NSAllowsArbitraryLoads key to YES). An exception could then allow the developer to increase ATS restrictions on a specific server. Uses of weak ciphers and old versions of TLS, along with only accepting valid self-signed certificates are all processes that can lead to man-in-the-middle attacks, but can be prevented through the use of AppTransportSecurity.  This client side protection can be used to enforce widely adopted best practice networks security standards, and should be used on all apps.",
        "recommendation": "For apps running on iOS 9.0 or higher, ATS must be\nenabled globally by linking to the iOS 9.0 or later SDK, and avoid\nsetting the \"NSAllowsArbitraryLoads\" key to \"Yes\" or \"True.\" For any\nexisting apps which communicate to servers over HTTP, an exception must\nbe set using either the “NSExceptionAllowsInsecureHTTPLoads” or\n“NSThirdPartyExceptionAllowsInsecureHTTPLoads” key.\n\nInstructions for Cordova can be found at https://cordova.apache.org/docs/en/9.x/guide/appdev/whitelist/index.html#ios-whitelisting",
        "severity": "medium"
    },
    {...}
}
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
            -  name: Checkout Nowsecure GitHub Action Repo
               uses: actions/checkout@v2
               with:
                  repository: camelotls/actions-nowsecure
                  ref: v1.0.0
                  token: ${{ secrets.MACHINEUSER_GITHUB_TOKEN }}
                  path: actions-nowsecure
            - name: Execute Nowsecure action
              id: nowsecure_action
              uses: ./actions-nowsecure/
              with:
                  PLATFORMS: 'ios,android'
                  NOWSECURE_ACCESS_TOKEN: ${{ secrets.NOWSECURE_ACCESS_TOKEN }}
                  IOS_PACKAGE: 'co.uk.camelot'
                  ANDROID_PACKAGE: 'uk.co.theofficialnationallotteryapp.android.play'
            - name: Checkout Jira integration GitHub Action Repo
              uses: actions/checkout@v2
              with:
                  repository: camelotls/actions-jira-integration
                  ref: v1.2.0
                  token: ${{ secrets.MACHINEUSER_GITHUB_TOKEN }}
                  path: actions-jira-integration
            - name: Jira ticket creation
              id: jira_integration
              uses: ./actions-jira-integration/
              with:
                   JIRA_USER: ${{ secrets.JIRA_USER }}
                   JIRA_PASSWORD: ${{ secrets.JIRA_PASSWORD }}
                   INPUT_JSON: ${{ steps.nowsecure_action.outputs.nowsecureReportData }}
                   JIRA_PROJECT: MBIL
                   JIRA_URI: 'jira.camelot.global'
                   REPORT_INPUT_KEYS: |
                                          vulnerabilityName: {{key}}
                                          issueSummary: Nowsecure: {{title}}
                                          issueDescription: *Recommendation*:\\n\\n{{recommendation}}\\n\\n*Overview*\\n\\n{{description}}\\n
                                          issueSeverity: {{severity}}
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
