const core = require('@actions/core');
const dirtyJSON = require('dirty-json');
const Validator = require('jsonschema').Validator;
const schemaType = process.env.ID;
const inputData = core.getInput('INPUT_DATA') || process.env.INPUT_DATA;
const { nowSecureSchema, nowSecureExtraFieldsSchema } = require('./schemaTemplate');
const schemaArray = [];

schemaArray.push(nowSecureSchema, nowSecureExtraFieldsSchema);
console.log("Schema type is " + schemaType);
schemaArray.forEach( schema => {

  if(dirtyJSON.parse(schema.id) === schemaType) {

    const jsonValidator = new Validator();
    const beautifiedInputData = dirtyJSON.parse(inputData);

    try {
      const beautifiedInputDataStringified = JSON.stringify(beautifiedInputData);

      const isValidSchema = jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), schema).errors.length === 0;

      if (isValidSchema) {
        console.log('NowSecure schema validation has succeeded.');
      } else {
        console.log('Validation of Nowsecure schema has failed. ' + jsonValidator.validate(JSON.parse(beautifiedInputDataStringified), schema));
        process.exit(1);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('Schema Type is not valid')
  }
});




