/* eslint-disable no-undef */
const { spawnSync } = require('child_process');
const core = require('@actions/core');
const assert = require('assert');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'actions-nowsecure' });

const shellExec = (command) => {
  let cmdOutput = '';
  const executedCommand = spawnSync(command, {
    shell: true
  });

  if (executedCommand.status !== 0) {
    assert.fail(executedCommand.stderr.toString());
  } else {
    cmdOutput = executedCommand.stdout.toString().trim();
    if (cmdOutput !== '') {
      log.info(`shellExec command output: ${cmdOutput}`);
    }
    assert.strictEqual((cmdOutput.includes('FAILED') || []).length, 0, cmdOutput);
  }

  return cmdOutput;
};

const getInput = (name) => {
  return core.getInput(name) || process.env[name];
};

module.exports = { shellExec, getInput };
