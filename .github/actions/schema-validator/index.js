const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const Validator = require('jsonschema').Validator;
const inputData = core.getInput('INPUT_DATA') || process.env.INPUT_DATA;

const nowSecureIssueSchema = {
    type: 'object',
    fields: {
            key: {
                type: 'number'
            },
         title: {
            type: 'string'
        },
         description: {
            type: 'string'

        },
         recommendation: {
            type: 'string'
        },
         severity: {
            type: 'string'
        }
    }
};

const jsonValidator = new Validator();

beautifiedInputData = dirtyJSON.parse(inputData);

  const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);
  const isValidSchema = (jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), nowSecureIssueSchema).errors.length === 0);

  if(isValidSchema) {
      console.log('Schema is valid')
  } else {
      console.log('Schema is not valid')
  }
