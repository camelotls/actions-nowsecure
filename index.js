const core = require('@actions/core');
const { v4 } = require('uuid');
const { SEVERITIES } = require('./config/config');
const fs = require('fs');
const _ = require('lodash');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-nowsecure' });

const nowSecure = require('./helpers/nowsecure-helpers');
const report = require('./helpers/report');

const platforms = (core.getInput('PLATFORMS').split(',') || process.env.PLATFORMS.split(',')).map(platform => platform.toLowerCase());
const severityList = core.getInput('SEVERITY_LIST') || process.env.SEVERITY_LIST;
const extractReport = (core.getInput('EXTRACT_REPORT') || process.env.EXTRACT_REPORT).toLowerCase() === 'true';

let severityListSplit;
if (severityList !== undefined) {
  severityListSplit = severityList.split(',').map((item) => item.trim());
} else {
  log.info('SEVERITY_LIST has not been provided so all the severities will be fetched...');
  severityListSplit = SEVERITIES.LIST.split(',');
}
const extraReportFields = (core.getInput('REPORT_FIELDS') || process.env.REPORT_FIELDS) ? core.getInput('REPORT_FIELDS').split(',') || process.env.REPORT_FIELDS.split(',') : '';
const startAnalysis = async () => {
  const tasks = [];
  const assessmentVersion = [];
  const assessmentReferences = new Map();

  platforms.forEach(platform => {
    tasks.push({
      platform: {
        name: platform,
        latestTaskID: ''
      }
    });

    assessmentVersion.push({
      platform: {
        name: platform,
        latestVersion: ''
      }
    });
  });

  const assessments = await report.getAssessments(platforms, extractReport);

  for (const assessment of assessments) {
    const platform = assessment[assessment.length - 1].platform;
    const platformIndex = platforms.indexOf(platform);
    tasks[platformIndex].platform.latestTaskID = assessment[assessment.length - 1].task;

    if (extractReport) {
      log.info(`Retrieving the assessment reference for platform ${platform}...`);
      assessmentReferences.set(platform, assessment[assessment.length - 1].ref);
      log.info(`The assessment reference for platform ${platform} was retrieved successfully!`);
    }
  }

  for (const task of tasks) {
    const platform = task.platform.name;
    const taskID = task.platform.latestTaskID;
    const platformIndex = platforms.indexOf(platform.toString());

    log.info(`Retrieving the version name associated with the ${platform} assessment...`);
    const report = await nowSecure.retrieveAssessmentReport(platform, taskID);

    if (report.statusCode !== 200) {
      log.info(`Assessment's report cannot be retrieved for platform ${platform}: ${report.body.message}`);
    } else {
      if (_.isEmpty(report.body.yaap_filtered.result)) {
        log.info(`Assessment is currently running or Assessment's report is Incomplete for platform ${platform}. You may try to re-run the assessment...`);
        continue;
      } else {
        // the key for the assessment version changes between different platforms
        assessmentVersion[platformIndex].platform.latestVersion = platform === 'ios' ? report.body.yaap_filtered.result.info[0].file_info.short_bundle_id : report.body.yaap_filtered.result.info[0].file_info.version_name;
      }
    }
    log.info('Version name retrieved successfully!');
  }

  const resultList = [];
  // eslint-disable-next-line no-unused-vars
  for (const [key, taskDetails] of Object.entries(tasks)) {
    const platform = taskDetails.platform.name;

    log.info(`Retrieving the assessment results for platform ${platform}...`);

    const results = await nowSecure.retrieveAssessmentResults(platform, taskDetails.platform.latestTaskID);

    if (results.statusCode !== 200) {
      log.info(`Assessment's results cannot be retrieved for platform ${platform}: ${results.body.message}`);
      continue;
    } else {
      if (!_.isEmpty(results.body)) {
        // eslint-disable-next-line prefer-const
        let platformInfusedResults = [];

        results.body.forEach(result => {
          platformInfusedResults.push(Object.assign(result, { platform: platform }));
        });

        resultList.push(platformInfusedResults);

        if (results !== null || results !== undefined) {
          log.info(`The assessment results for platform ${platform} were retrieved successfully!`);
        }
      } else {
        log.info(`The assessment results for platform ${platform} are empty...`);
      }
    }
  }

  const filteredReportedIssues = [];
  for (const severityIssue of severityListSplit) {
    resultList.forEach(result => {
      filteredReportedIssues.push(result.filter(reportedIssue => {
        return (reportedIssue.severity === severityIssue);
      }));
    });
  }

  const reportOutput = {};
  filteredReportedIssues.forEach(filteredIssue => {
    filteredIssue.forEach(issue => {
      const uuid = v4().toString();
      const version = assessmentVersion[platforms.indexOf(issue.platform)].platform.latestVersion;
      const singleIssueData = {
        [uuid]: {
          key: issue.key || '',
          title: issue.title || '',
          description: issue.description || '',
          recommendation: issue.recommendation || '',
          severity: issue.severity || '',
          assessmentVersion: version,
          platform: issue.platform || ''
        }
      };

      if (extraReportFields.length > 0) {
        extraReportFields.forEach(field => {
          let extraFields;
          if (field.includes('regulatory')) {
            const regulation = field.split('-')[1];
            // eslint-disable-next-line multiline-ternary
            extraFields = (issue.regulatory[regulation] === undefined) ? {
              [regulation]: 'No data retrieved'
            } : {
              // expose the id and url which are built in the regulations under the regulatory field from NowSecure
              [`${regulation}-id`]: issue.regulatory[regulation][0].id,
              [`${regulation}-url`]: issue.regulatory[regulation][0].url
            };
          } else {
            extraFields = {
              [field]: issue[field]
            };
          }

          Object.assign(singleIssueData[uuid], extraFields);
        });
      }
      Object.assign(reportOutput, singleIssueData);
    });
  });

  if (extractReport) {
    for (const [key, value] of assessmentReferences.entries()) {
      log.info(`Generating the latest pdf report for ${key} platform...`);
      report.generateReport(key, value);
    }
  }
  try {
    fs.writeFileSync('nowsecure-report.json', reportOutput, 'utf8');
  } catch (e) {
    log.warn(e);
  }
};

(async () => {
  await startAnalysis();
})();
