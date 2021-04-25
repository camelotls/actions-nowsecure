const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const Validator = require('jsonschema').Validator;
const inputData = process.env.INPUT_DATA;

const nowSecureIssueSchema = {
    "type": "object",
    "patternProperties": {
        "^[a-zA-Z0-9{}/]+$": {
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
    "required": true
}

const jsonValidator = new Validator();

beautifiedInputData = dirtyJSON.parse(inputData);

  const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);

  const isValidSchema = (jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema).errors.length === 0);


  if(isValidSchema) {
      console.log('Schema is valid')
  } else {
      console.log('Schema is not valid')
       process.exit(1)
  }