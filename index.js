const core = require('@actions/core');
const { v4 } = require('uuid');
const { SEVERITIES } = require('./config/config');
const _ = require('lodash');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-nowsecure' });

const nowSecure = require('./helpers/nowsecure-helpers');
const platforms = core.getInput('PLATFORMS').split(',') || process.env.PLATFORMS.split(',');
const severityList = core.getInput('SEVERITY_LIST') || process.env.SEVERITY_LIST;
let severityListSplit;

if (severityList !== undefined) {
  severityListSplit = severityList.split(',').map((item) => item.trim());
} else {
  log.info('SEVERITY_LIST has not been provided so all the severities will be fetched...');
  severityListSplit = SEVERITIES.LIST.split(',');
}
const extraReportFields = (core.getInput('REPORT_FIELDS') || process.env.REPORT_FIELDS) ? core.getInput('REPORT_FIELDS').split(',') || process.env.REPORT_FIELDS.split(',') : '';
const startAnalysis = async () => {
  const assessments = [];
  const tasks = [];
  const assessmentVersion = [];

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

  for (const platform of platforms) {
    log.info(`Retrieving the assessment for platform ${platform}...`);
    const assessment = await nowSecure.retrieveAssessment(platform);
    assessments.push(assessment);

    if (assessment !== null || assessment !== undefined) {
      log.info(`The assessment for platform ${platform} was retrieved successfully!`);
    }
  }

  for (const assessment of assessments) {
    if (assessment[assessment.length - 1].platform === 'ios') {
      tasks[0].platform.latestTaskID = assessment[assessment.length - 1].task;
    }

    if (assessment[assessment.length - 1].platform === 'android') {
      tasks[1].platform.latestTaskID = assessment[assessment.length - 1].task;
    }
  }

  for (const task of tasks) {
    const platform = task.platform.name;
    const taskID = task.platform.latestTaskID;

    log.info(`Retrieving the version name associated with the ${platform} assessment...`);
    const report = await nowSecure.retrieveAssessmentReport(platform, taskID);
    if (report.statusCode !== 200) {
      log.info(`Assessment's report cannot be retrieved for platform ${platform}: ${report.body.message}`);
    } else {
      if (_.isEmpty(report.body.yaap_filtered.result)) {
        log.info(`Assessment is currently running or Assessment's report is Incomplete for platform ${platform}. You may try to re-run the assessment...`);
        continue;
      } else {
        if (platform === 'ios') {
          assessmentVersion[0].platform.latestVersion = report.body.yaap_filtered.result.info[0].file_info.short_bundle_id;
        } else {
          assessmentVersion[1].platform.latestVersion = report.body.yaap_filtered.result.info[0].file_info.version_name;
        }
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
  // fetch issues flagged with High | Medium | Low severity level
  const filteredReportedIssues = [];
  for (const severityIssue of severityListSplit) {
    resultList.forEach(result => {
      filteredReportedIssues.push(result.filter(reportedIssue => {
        return (reportedIssue.severity === severityIssue);
      }));
    });
  }
  // construct the object acting as an input for the Jira Server Integration Action

  const reportOutput = {};
  filteredReportedIssues.forEach(filteredIssue => {
    filteredIssue.forEach(issue => {
      const uuid = v4().toString();
      const version = issue.platform === 'ios' ? assessmentVersion[0].platform.latestVersion : assessmentVersion[1].platform.latestVersion;
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
  // output the constructed object
  core.setOutput('nowsecureReportData', reportOutput);
};

(async () => {
  await startAnalysis();
})();
