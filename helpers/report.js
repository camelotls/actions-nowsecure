/* eslint-disable no-undef */
const { LOGGER } = require('../config/config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: LOGGER.NAME });

const nowSecure = require('./nowsecure-helpers');
const utils = require('./utils');
const { NOWSECURE } = require('../config/config');

const getAssessments = async (platforms, extractReport) => {
  const assessments = [];

  for (const platform of platforms) {
    log.info(`Retrieving the assessment for platform ${platform}...`);
    const assessment = await nowSecure.retrieveAssessment(platform);
    assessments.push(assessment);

    if (!assessment) {
      log.info(`The assessment for platform ${platform} was retrieved successfully!`);
    }
  }

  return assessments;
};

const generateReport = (platform, assessmentReference) => {
  utils.shellExec(`curl -k -o ${platform}.pdf -H 'Authorization: Bearer ${NOWSECURE.ACCESS_TOKEN}' 'https://lab-api.nowsecure.com/assessment/${assessmentReference}/report.pdf'`);
};

module.exports = { getAssessments, generateReport };
