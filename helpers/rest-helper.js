const got = require('got');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-nowsecure' });

const GETRequestWrapper = async (requestName, address, accessToken, apiPath) => {
  try {
    const response = await got.get(`${address}${apiPath}`, {
      retry: 0,
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response;
  } catch (error) {
    log.warn(`GET request ${requestName} encountered the following error: ${error.message}`);

    return error;
  }
};

module.exports = { GETRequestWrapper };
