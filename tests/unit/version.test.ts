import { test } from 'node:test';
import assert from 'node:assert/strict';
import { describeTarget, FRAMEWORK } from '../../src/version.ts';

test('describes the target host', () => {
  assert.equal(describeTarget('https://automationexercise.com/'), `${FRAMEWORK} against automationexercise.com`);
});

test('refuses a target that is not https', () => {
  assert.throws(() => describeTarget('http://example.com'), /must be https/);
});
