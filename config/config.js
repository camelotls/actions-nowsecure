const core = require('@actions/core');

const NOWSECURE = {
  URI: 'https://lab-api.nowsecure.com',
  ENDPOINTS: {
    ASSESSMENT: 'assessment',
    APPLICATION: 'app',
    RESULTS: 'results',
    REPORT: 'report'
  },
  ACCESS_TOKEN: core.getInput('NOWSECURE_ACCESS_TOKEN') || process.env.NOWSECURE_ACCESS_TOKEN,
  GROUP_ID: core.getInput('NOWSECURE_GROUP_ID') || process.env.NOWSECURE_GROUP_ID
};

const REST = {
  HEADER_ACCEPT_APPLICATION_JSON: 'application/json'
};

const APPLICATION = {
  PACKAGES: {
    IOS: core.getInput('IOS_PACKAGE') || process.env.IOS_PACKAGE,
    ANDROID: core.getInput('ANDROID_PACKAGE') || process.env.ANDROID_PACKAGE
  }
};

const SEVERITIES = {
  LIST: 'high,medium,low,warn,info'
};

module.exports = { NOWSECURE: NOWSECURE, REST: REST, APPLICATION: APPLICATION, SEVERITIES: SEVERITIES };
