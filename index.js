const core = require('@actions/core');
const { v4 } = require('uuid');

const nowsecure = require('./helpers/nowsecure-helpers');
const platforms = core.getInput('PLATFORMS').split(',') || process.env.PLATFORMS.split(',');
const extraReportFields = (core.getInput('REPORT_FIELDS') || process.env.REPORT_FIELDS) ? core.getInput('REPORT_FIELDS').split(',') || process.env.REPORT_FIELDS.split(',') : '';

const startAnalysis = async () => {
  const assessments = [];
  const tasks = [];
  platforms.forEach(platform => {
    tasks.push({
      platform: {
        name: platform,
        latestTaskID: ''
      }
    });
  });

  for (const platform of platforms) {
    console.log(`Retrieving the assessment for platform ${platform}...`);
    const assessment = await nowsecure.retrieveAssessment(platform);
    assessments.push(assessment);

    if (assessment !== null || assessment !== undefined) {
      console.log(`The assessment for platform ${platform} was retrieved successfully!`);
    }
  }

  assessments.forEach(assessmentList => {
    if (assessmentList[0].platform === 'ios') {
      tasks[0].platform.latestTaskID = assessmentList[0].task;
    } else {
      tasks[1].platform.latestTaskID = assessmentList[0].task;
    }
  });

  const resultList = [];
  // eslint-disable-next-line no-unused-vars
  for (const [key, taskDetails] of Object.entries(tasks)) {
    console.log(`Retrieving the assessment results for platform ${taskDetails.platform.name}...`);
    const results = await nowsecure.retrieveAssessmentResults(taskDetails.platform.name, taskDetails.platform.latestTaskID);
    resultList.push(results);

    if (results !== null || results !== undefined) {
      console.log(`The assessment results for platform ${taskDetails.platform.name} were retrieved successfully!`);
    }
  }

  // fetch issues flagged with High | Medium | Low severity level
  const filteredReportedIssues = [];
  resultList.forEach(platform => {
    filteredReportedIssues.push(platform.filter(reportedIssue => {
      return (reportedIssue.severity === 'low' || reportedIssue.severity === 'medium' || reportedIssue.severity === 'high');
    }));
  });

  // construct the object acting as an input for the Jira Server Integration Action
  const reportOutput = {};
  filteredReportedIssues.forEach(filteredIssue => {
    filteredIssue.forEach(issue => {
      const uuid = v4().toString();
      const singleIssueData = {
        [uuid]: {
          key: issue.key,
          title: issue.title,
          description: issue.description,
          recommendation: issue.recommendation,
          severity: issue.severity
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
              // expose the id and url which are built in the regulations under the regulatory field from Nowsecure
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
