const nowsecure = require('./helpers/nowsecure-helpers');
const platforms = ['ios', 'android'];

const startAnalysis = async () => {
    let assessments = [];
    let tasks = [{
        'platform': {
            'name': 'ios',
            'latestTaskID': ''
        }
    },
        {
            'platform': {
                'name': 'android',
                'latestTaskID': ''
            }
        }
    ];

    for(const platform of platforms) {
        assessments.push(await nowsecure.retrieveAssessment(platform));
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
        let results = await nowsecure.retrieveAssessmentResults(taskDetails.platform.name, taskDetails.platform.latestTaskID)
        resultList.push(results);
    }
};

(async () => {
    await startAnalysis();
})();

