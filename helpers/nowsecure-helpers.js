const assert = require('assert');

const rest = require('./rest-helper');
const config = require('./../config/config');

const retrieveAssessment = async function retrieveAssessment (platform) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowsecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/`;
  const response = await rest.GETRequestWrapper(retrieveAssessment.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowsecureEndpoint, true);

  assert(response.statusCode === 200, `Assessment cannot be retrieved for platform ${platform}: ${response.body.message}`);

  return response.body;
};

const retrieveAssessmentResults = async function retrieveAssessmentResults (platform, task) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowsecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${task}/${config.NOWSECURE.ENDPOINTS.RESULTS}`;
  const response = await rest.GETRequestWrapper(retrieveAssessmentResults.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowsecureEndpoint, true);

  assert(response.statusCode === 200, `Assessment's results cannot be retrieved for platform ${platform}: ${response.body.message}`);

  return response.body;
};

const retrieveAssessmentReport = async function retrieveAssessmentReport (platform, task) {
  const appPackage = platform === 'android' ? config.APPLICATION.PACKAGES.ANDROID : config.APPLICATION.PACKAGES.IOS;
  const nowsecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/${platform}/${appPackage}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${task}/${config.NOWSECURE.ENDPOINTS.REPORT}`;
  const response = await rest.GETRequestWrapper(retrieveAssessmentResults.name, config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowsecureEndpoint, true);

  assert(response.statusCode === 200, `Assessment's report cannot be retrieved for platform ${platform}: ${response.body.message}`);

  return response.body;
};

module.exports = { retrieveAssessment, retrieveAssessmentResults, retrieveAssessmentReport };
