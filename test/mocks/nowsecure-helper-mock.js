const MOCK_ACCESS_TOKEN = '1234567890ABCDEFGHIJK';
const MOCK_APPLICATION_IOS_PACKAGE = 'co.uk.mock';
const MOCK_APPLICATION_ANDROID_PACKAGE = 'uk.co.mock.android.play';
const MOCK_GROUP_ID = 'e1a73363-42c2-45e2-b6b1-8d148f9a773e';
const MOCK_IOS_TASK = '1601305455038';
const MOCK_ANDROID_TASK = '1615165066367';
const MOCK_ASSESSMENT = [
  {
    ref: 'string',
    application: 'string',
    group: 'string',
    account: 'string',
    platform: 'string',
    package: 'string',
    task: 10,
    creator: 'string',
    created: '2020-09-24T09:34:14.994Z',
    updated: '2020-09-24T10:04:09.448Z',
    binary: 'string',
    config: {},
    status: {},
    cancelled: false,
    task_status: 'completed',
    events: {
      dynamic: []
    },
    adjusted_issues: {},
    adjusted_score: 0,
    identified_vuln_map: {}
  }
];

const MOCK_IOS_ASSESSMENT_REPORT_PER_TASK = [
  {
    yaap_filtered: {},
    yaap: {},
    static: {},
    dynamic: {}
  }
];

const MOCK_IOS_ASSESSMENT_RESULT = [
  {
    key: 'heartbleed_check',
    kind: 'static',
    title: 'App Contains Heartbleed Vulnerable Version of OpenSSL Library',
    category: 'code',
    summary: 'This test checks to see if your application is vulnerable to the Heartbleed vulnerability by checking the versions of the third-party library OpenSSL being used.',
    cvss: 7.5,
    cvss_vector: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    regulatory: {},
    affected: false,
    severity: 'pass'
  }
];
module.exports = { MOCK_ACCESS_TOKEN, MOCK_APPLICATION_ANDROID_PACKAGE, MOCK_APPLICATION_IOS_PACKAGE, MOCK_ASSESSMENT, MOCK_GROUP_ID, MOCK_IOS_TASK, MOCK_IOS_ASSESSMENT_REPORT_PER_TASK, MOCK_ANDROID_TASK, MOCK_IOS_ASSESSMENT_RESULT };
