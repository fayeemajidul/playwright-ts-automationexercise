import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig } from '../../src/config/env.ts';

test('defaults to production with the known site and API urls', () => {
  const config = loadConfig({});
  assert.equal(config.environment, 'production');
  assert.equal(config.siteUrl, 'https://automationexercise.com');
  assert.equal(config.apiUrl, 'https://automationexercise.com/api');
  assert.deepEqual(config.timeouts, { short: 5_000, standard: 15_000, long: 30_000 });
});

test('reads urls, credentials, and timeouts from the environment', () => {
  const config = loadConfig({
    TEST_ENV: 'staging',
    SITE_URL: 'https://staging.example.com',
    API_URL: 'https://staging.example.com/api',
    SITE_USER: 'someone',
    SITE_PASS: 'secret',
    TIMEOUT_SHORT_MS: '1000',
    TIMEOUT_STANDARD_MS: '2000',
    TIMEOUT_LONG_MS: '3000',
  });
  assert.equal(config.environment, 'staging');
  assert.equal(config.siteUrl, 'https://staging.example.com');
  assert.deepEqual(config.credentials, { user: 'someone', pass: 'secret' });
  assert.deepEqual(config.timeouts, { short: 1_000, standard: 2_000, long: 3_000 });
});

test('rejects an environment name that is not one of the three known ones', () => {
  assert.throws(() => loadConfig({ TEST_ENV: 'production2' }), /TEST_ENV/);
});

test('rejects a non-production environment with no site or api url', () => {
  assert.throws(() => loadConfig({ TEST_ENV: 'staging' }), /staging.*no built-in urls/i);
});

test('rejects a site url that is not an absolute url', () => {
  assert.throws(() => loadConfig({ SITE_URL: 'not-a-url' }), /SITE_URL.*absolute URL/i);
});

test('rejects a timeout that is not a positive number', () => {
  assert.throws(() => loadConfig({ TIMEOUT_SHORT_MS: '-5' }), /TIMEOUT_SHORT_MS/);
});
