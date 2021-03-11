const { expect } = require('chai');
const nock = require('nock');
const { describe, it } = require('mocha');

const nowsecure = require('../helpers/nowsecure-helpers');
const rest = require('../helpers/rest-helper');
const mock = require('./mocks/nowsecure-helper-mock');
const config = require('../config/config');

describe('Nowsecure REST calls are functioning properly', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    config.NOWSECURE.GROUP_ID = 'e1a73363-47c2-45e2-b8b1-8a188f9a773e';
    config.APPLICATION.PACKAGES.ANDROID = 'android.mock';
    config.APPLICATION.PACKAGES.IOS = 'ios.mock';

    process.env = {
      NOWSECURE_ACCESS_TOKEN: mock.MOCK_ACCESS_TOKEN,
      IOS_PACKAGE: mock.MOCK_APPLICATION_IOS_PACKAGE,
      ANDROID_PACKAGE: mock.MOCK_APPLICATION_ANDROID_PACKAGE,
      GROUP_ID: mock.MOCK_GROUP_ID
    };
  });

  // eslint-disable-next-line no-undef
  after(() => {
    delete process.env.NOWSECURE_ACCESS_TOKEN;
    delete process.env.IOS_PACKAGE;
    delete process.env.ANDROID_PACKAGE;
    delete process.env.GROUP_ID;
    delete config.NOWSECURE.GROUP_ID;
    delete config.APPLICATION.PACKAGES.ANDROID;
    delete config.APPLICATION.PACKAGES.IOS;
  });

  describe('Nowsecure REST calls successful cases', () => {
    it('An assessment can be retrieved for iOS', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/ios/${mock.MOCK_APPLICATION_IOS_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_ASSESSMENT);

      const assessment = await nowsecure.retrieveAssessment('ios');
      expect(assessment[0]).to.be.instanceOf(Object).to.have.all.keys('ref',
        'application',
        'group',
        'account',
        'platform',
        'package',
        'task',
        'creator',
        'created',
        'updated',
        'binary',
        'config',
        'status',
        'cancelled',
        'task_status',
        'events',
        'adjusted_issues',
        'adjusted_score',
        'identified_vuln_map');
    });
    it('An assessment can be retrieved for Android', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/android/${mock.MOCK_APPLICATION_ANDROID_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_ASSESSMENT);

      const assessment = await nowsecure.retrieveAssessment('android');
      expect(assessment[0]).to.be.instanceOf(Object).to.have.all.keys('ref',
        'application',
        'group',
        'account',
        'platform',
        'package',
        'task',
        'creator',
        'created',
        'updated',
        'binary',
        'config',
        'status',
        'cancelled',
        'task_status',
        'events',
        'adjusted_issues',
        'adjusted_score',
        'identified_vuln_map');
    });
    it('Assessment results can be retrieved for iOS', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/ios/${mock.MOCK_APPLICATION_IOS_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${mock.MOCK_IOS_TASK}/results?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_IOS_ASSESSMENT_REPORT_PER_TASK);

      const assessmentResults = await nowsecure.retrieveAssessmentResults('ios', mock.MOCK_IOS_TASK);
      expect(assessmentResults[0]).to.be.instanceOf(Object).to.have.all.keys('yaap_filtered',
        'yaap',
        'static',
        'dynamic');
    });
    it('Assessment results can be retrieved for Android', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/android/${mock.MOCK_APPLICATION_ANDROID_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${mock.MOCK_ANDROID_TASK}/results?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_IOS_ASSESSMENT_REPORT_PER_TASK);

      const assessmentResults = await nowsecure.retrieveAssessmentResults('android', mock.MOCK_ANDROID_TASK);
      expect(assessmentResults[0]).to.be.instanceOf(Object).to.have.all.keys('yaap_filtered',
        'yaap',
        'static',
        'dynamic');
    });
    it('Assessment report can be retrieved for iOS', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/ios/${mock.MOCK_APPLICATION_IOS_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${mock.MOCK_IOS_TASK}/report?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_IOS_ASSESSMENT_RESULT);

      const assessmentResults = await nowsecure.retrieveAssessmentReport('ios', mock.MOCK_IOS_TASK);
      expect(assessmentResults[0]).to.be.instanceOf(Object).to.have.all.keys('key',
        'kind',
        'title',
        'category',
        'summary',
        'cvss',
        'cvss_vector',
        'regulatory',
        'affected',
        'severity');
    });
    it('Assessment report can be retrieved for Android', async () => {
      nock(`https://${config.NOWSECURE.URI}`)
        .get(`/${config.NOWSECURE.ENDPOINTS.APPLICATION}/android/${mock.MOCK_APPLICATION_ANDROID_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${mock.MOCK_ANDROID_TASK}/report?group=${mock.MOCK_GROUP_ID}`)
        .reply(200, mock.MOCK_IOS_ASSESSMENT_RESULT);

      const assessmentResults = await nowsecure.retrieveAssessmentReport('android', mock.MOCK_ANDROID_TASK);
      expect(assessmentResults[0]).to.be.instanceOf(Object).to.have.all.keys('key',
        'kind',
        'title',
        'category',
        'summary',
        'cvss',
        'cvss_vector',
        'regulatory',
        'affected',
        'severity');
    });
    it('Assessment report cannot be retrieved for Android', async () => {
      const nowsecureEndpoint = `/${config.NOWSECURE.ENDPOINTS.APPLICATION}/android/${mock.MOCK_APPLICATION_ANDROID_PACKAGE}/${config.NOWSECURE.ENDPOINTS.ASSESSMENT}/${mock.MOCK_ANDROID_TASK}/report?group=${mock.MOCK_GROUP_ID}`;

      nock(`https://${config.NOWSECURE.URI}`)
        .get(nowsecureEndpoint)
        .replyWithError(mock.MOCK_ERROR_ASSESSMENT_RESULT);

      await rest.GETRequestWrapper('retrieveAssessmentResults', config.NOWSECURE.URI, config.NOWSECURE.ACCESS_TOKEN, nowsecureEndpoint, true)
        .catch(error => expect(error.message).to.be.equal('Assessment not found within user scope'));
    });
  });
});
