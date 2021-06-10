const https = require('https');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-jira-integration' });

const GETRequestWrapper = async (requestName, address, accessToken, apiPath, parseJson) => {
  const options = {
    hostname: address,
    port: 443,
    path: apiPath,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    json: parseJson,
    requestCert: false,
    agent: false,
    timeout: 200000
  };

  return await new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let str = '';
      const obj = {
        body: str,
        statusCode: 0
      };
      response
        .on('data', data => {
          str += data;
        })
        .on('end', () => {
          let data = str;
          if (parseJson) {
            data = JSON.parse(str);
          }
          obj.body = data;
          obj.statusCode = response.statusCode;
          resolve(obj);
        })
        .on('error', err => {
          log.warn(err);
          obj.body = err;
          obj.statusCode = response.statusCode;
          reject(obj);
        });
    });

    request
      .on('error', err => {
        log.warn(`GET request ${requestName} encountered the following error: ${err.message}`);
        reject(err);
      });

    request.end();
  });
};

module.exports = { GETRequestWrapper };
