const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const Validator = require('jsonschema').Validator;
const inputData =core.getInput('INPUT_DATA') || process.env.INPUT_DATA;

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
                }
            },
            "required": ["key", "title", "description", "recommendation", "severity"]
        }
   },
    "required": true,
    "additionalProperties": false
}

const jsonValidator = new Validator();

beautifiedInputData = dirtyJSON.parse(inputData);

// console.log(beautifiedInputData)

 const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);

// console.log(beautifiedInputDataStringified)

  const isValidSchema = (jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema).errors.length === 0);

  console.log(jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema))

  if(isValidSchema) {
      console.log('Schema is valid')
  } else {
      console.log('Schema is not valid')
       process.exit(1)
  }