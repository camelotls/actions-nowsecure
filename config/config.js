const core = require('@actions/core')

const NOWSECURE = {
  URI: 'lab-api.nowsecure.com',
  ENDPOINTS: {
    ASSESSMENT: 'assessment',
    APPLICATION: 'app',
    RESULTS: 'results',
    REPORT: 'report',
    GROUP_ID: core.getInput('NOWSECURE_GROUP_ID') || process.env.NOWSECURE_GROUP_ID
  },
  ACCESS_TOKEN: core.getInput('NOWSECURE_ACCESS_TOKEN') || process.env.NOWSECURE_ACCESS_TOKEN
}
const REST = {
  HEADER_ACCEPT_APPLICATION_JSON: 'application/json'
}
const APPLICATION = {
  PACKAGES: {
    IOS: core.getInput('IOS_PACKAGE') || process.env.IOS_PACKAGE,
    ANDROID: core.getInput('ANDROID_PACKAGE') || process.env.ANDROID_PACKAGE
  }
}

module.exports = { NOWSECURE: NOWSECURE, REST: REST, APPLICATION: APPLICATION }
