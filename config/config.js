const { getInput } = require('../helpers/utils');

const NOWSECURE = {
  URI: 'https://lab-api.nowsecure.com',
  ENDPOINTS: {
    ASSESSMENT: 'assessment',
    APPLICATION: 'app',
    RESULTS: 'results',
    REPORT: 'report'
  },
  ACCESS_TOKEN: getInput('NOWSECURE_ACCESS_TOKEN'),
  GROUP_ID: getInput('NOWSECURE_GROUP_ID')
};

const REST = {
  HEADER_ACCEPT_APPLICATION_JSON: 'application/json'
};

const APPLICATION = {
  PACKAGES: {
    IOS: getInput('IOS_PACKAGE'),
    ANDROID: getInput('ANDROID_PACKAGE')
  }
};

const SEVERITIES = {
  LIST: 'high,medium,low,warn,info'
};

const LOGGER = {
  NAME: 'actions-nowsecure'
};

module.exports = { NOWSECURE, REST, APPLICATION, SEVERITIES, LOGGER };
