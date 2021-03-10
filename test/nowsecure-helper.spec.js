const { expect } = require('chai');
const nock = require('nock');
const { describe, it } = require('mocha');

const nowsecure = require('../helpers/nowsecure-helpers');
const mock = require('./mocks/nowsecure-helper-mock');
const config = require('../config/config');

describe('Nowsecure REST calls are functioning properly', () => {
  before(() => {
    config.NOWSECURE.GROUP_ID = 'e1a73363-42c2-45e2-b6b1-8d148f9a773e';
    config.APPLICATION.PACKAGES.ANDROID = 'uk.co.mock.android.play';
    config.APPLICATION.PACKAGES.IOS = 'co.uk.mock';

    process.env = {
      NOWSECURE_ACCESS_TOKEN: mock.MOCK_ACCESS_TOKEN,
      IOS_PACKAGE: mock.MOCK_APPLICATION_IOS_PACKAGE,
      ANDROID_PACKAGE: mock.MOCK_APPLICATION_ANDROID_PACKAGE,
      GROUP_ID: mock.MOCK_GROUP_ID
    };
  });

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
        .reply(200, mock.MOCK_IOS_ASSESSMENT_REPORT);

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
        .reply(200, mock.MOCK_ANDROID_ASSESSMENT_REPORT);

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
  });
});
