const core = require('@actions/core');

const nowsecure = require('./helpers/nowsecure-helpers');
const platforms = process.env.PLATFORMS.split(',') || core.getInput('PLATFORMS').split(',');

const startAnalysis = async () => {
    let assessments = [];
    let tasks = [];
    platforms.forEach(platform => {
        tasks.push({
            'platform': {
                'name': platform,
                'latestTaskID': ''
            }
        });
    });

    for(const platform of platforms) {
        console.log(`Retrieving the assessment for platform ${platform}...`);
        let assessment = await nowsecure.retrieveAssessment(platform);
        assessments.push(assessment);

        if(assessment !== null || assessment !== undefined) {
            console.log(`The assessment for platform ${platform} was retrieved successfully!`);
        }
    }

    assessments.forEach(assessmentList => {
        if(assessmentList[0].platform === 'ios') {
            tasks[0].platform.latestTaskID = assessmentList[0].task;
        } else {
            tasks[1].platform.latestTaskID = assessmentList[0].task;
        }
    });

    let resultList = [];
    for (const [key, taskDetails] of Object.entries(tasks)) {
        console.log(`Retrieving the assessment results for platform ${taskDetails.platform.name}...`);
        let results = await nowsecure.retrieveAssessmentResults(taskDetails.platform.name, taskDetails.platform.latestTaskID);
        resultList.push(results);

        if(results !== null || results !== undefined) {
            console.log(`The assessment results for platform ${taskDetails.platform.name} were retrieved successfully!`);
        }
    }

    // fetch issues flagged with High | Medium | Low severity level
    let filteredReportedIssues = [];
    resultList.forEach(platform => {
        filteredReportedIssues.push(platform.filter(reportedIssue => {
            return (reportedIssue.severity === 'low' || reportedIssue.severity === 'medium' || reportedIssue.severity === 'high');
        }));
    });

    // construct the object acting as an input for the Jira Server Integration Action
    let reportOutput = [];
    filteredReportedIssues.forEach(filteredIssue => {
        filteredIssue.forEach(issue => {
            let singleIssueData = {
                key: issue.key,
                title: issue.title,
                description: issue.description,
                recommendation: issue.recommendation,
                severity: issue.severity,
            };
            reportOutput.push(singleIssueData);
        });
    });

    // output the constructed object
    core.setOutput('nowsecureReportData', reportOutput);
};

(async () => {
    await startAnalysis();
})();

