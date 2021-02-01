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
        IOS: 'co.uk.camelot',
        ANDROID: 'uk.co.theofficialnationallotteryapp.android.play'
    }
}

module.exports = { NOWSECURE: NOWSECURE, REST: REST, APPLICATION: APPLICATION};
