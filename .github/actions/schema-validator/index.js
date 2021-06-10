const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const { Validator } = require('jsonschema');
const schemaType = process.env.ID || 'basic';
const inputData = core.getInput('INPUT_DATA') || process.env.INPUT_DATA;
const { nowSecureSchema, nowSecureExtraFieldsSchema } = require('./schemaTemplate');
const schemaArray = [];
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-jira-integration' });

schemaArray.push(
  nowSecureSchema,
  nowSecureExtraFieldsSchema
);

schemaArray.forEach((schema) => {
  if (dirtyJSON.parse(schema.id) === schemaType) {
    const jsonValidator = new Validator();
    const beautifiedInputData = dirtyJSON.parse(inputData);
    try {
      const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);
      const isValidSchema = jsonValidator.validate(
        JSON.parse(beautifiedInputDataStringified),
        schema
      ).errors.length === 0;

      if (isValidSchema) {
        log.info('NowSecure schema validation has succeeded.');
      } else {
        log.warn(`Validation of NowSecure schema has failed: ${jsonValidator.validate(
                    JSON.parse(beautifiedInputDataStringified),
                    schema
                )}`);
        process.exit(1);
      }
    } catch (e) {
      log.warn(e);
    }
  }
});
