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
    let BreakException = {};

    for(const platform of platforms) {
        assessments.push(await nowsecure.retrieveAssessment(platform));
    }

    assessments.forEach(assessmentList => {
        try {
            assessmentList.forEach(assessment => {
                // retrieve the first task only per assessment since this contains the latest results
                if(assessment.platform === 'ios') {
                    tasks[0].platform.latestTaskID = assessment.task;
                } else {
                    tasks[1].platform.latestTaskID = assessment.task;
                }
                throw BreakException;
            });
        } catch (e) {
            if (e !== BreakException) throw e
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
