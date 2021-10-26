const assert = require('assert');

const rest = require('./rest-helper');
const config = require('./../config/config');

const retrieveAssessment = async function retrieveAssessment (platform) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowSecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/?group=${config.NOWSECURE.GROUP_ID}`;
  const response = await rest.get(retrieveAssessment.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowSecureEndpoint);

  assert(response.statusCode === 200, `Assessment cannot be retrieved for platform ${platform}: ${response.body.message}`);

  return response.body;
};

const retrieveAssessmentResults = async function retrieveAssessmentResults (platform, task) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowSecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${task}/${config.NOWSECURE.ENDPOINTS.RESULTS}?group=${config.NOWSECURE.GROUP_ID}`;
  const response = await rest.get(retrieveAssessmentResults.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowSecureEndpoint);
  return response;
};

const retrieveAssessmentReport = async function retrieveAssessmentReport (platform, task) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowSecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${task}/${config.NOWSECURE.ENDPOINTS.REPORT}?group=${config.NOWSECURE.GROUP_ID}`;
  const response = await rest.get(retrieveAssessmentResults.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowSecureEndpoint);
  return response;
};

module.exports = { retrieveAssessment, retrieveAssessmentResults, retrieveAssessmentReport };
