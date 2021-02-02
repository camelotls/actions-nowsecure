const core = require('@actions/core');

const NOWSECURE = {
    URI: 'lab-api.nowsecure.com',
    ENDPOINTS: {
        ASSESSMENT: 'assessment',
        APPLICATION: 'app',
        RESULTS: 'results',
    },
    ACCESS_TOKEN: process.env.NOWSECURE_ACCESS_TOKEN
};
const REST = {
    HEADER_ACCEPT_APPLICATION_JSON: 'application/json'
};
const APPLICATION = {
    PACKAGES: {
        IOS: process.env.IOS_PACKAGE || core.getInput('IOS_PACKAGE'),
        ANDROID: process.env.ANDROID_PACKAGE || core.getInput('ANDROID_PACKAGE')
    }
}

module.exports = { NOWSECURE: NOWSECURE, REST: REST, APPLICATION: APPLICATION};
