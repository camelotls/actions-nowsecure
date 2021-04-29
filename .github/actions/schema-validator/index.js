const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const Validator = require('jsonschema').Validator;
const inputData = core.getInput('INPUT_DATA') || process.env.INPUT_DATA;

const nowSecureIssueSchema = {
    "type": "object",
    "patternProperties": {
        "^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "recommendation": {
                    "type": "string"
                },
                "severity": {
                    "type": "string"
                },
                "assessmentVersion": {
                    "type": "string"
                },
                "platform": {
                    "type": "string"
                }
            },
            "required": ["key", "title", "description", "severity", "assessmentVersion", "platform"]
        }
    },
    "required": true,
    "additionalProperties": false
}

const jsonValidator = new Validator();
const beautifiedInputData = dirtyJSON.parse(inputData);

try {
    const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);

    const isValidSchema = jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema).errors.length === 0;

    if (isValidSchema) {
        console.log('NowSecure schema validation has succeeded.')
    } else {
        console.log('Validation of Nowsecure Schema has failed. ' + jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema));
        process.exit(1)
    }
}
catch(e) {
    console.log(e)
}
