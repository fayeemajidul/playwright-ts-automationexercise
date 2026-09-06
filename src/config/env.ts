import { z } from 'zod';

const ENVIRONMENT_NAMES = ['production', 'staging', 'local'] as const;

export type EnvironmentName = (typeof ENVIRONMENT_NAMES)[number];

// Only "production" is a host that actually exists. Staging and local are
// named so the config shape supports pointing at another deployment later,
// but they must say where that is rather than guessing a URL nobody runs.
const PRODUCTION_DEFAULTS = {
  siteUrl: 'https://automationexercise.com',
  apiUrl: 'https://automationexercise.com/api',
};

const rawEnvSchema = z.object({
  TEST_ENV: z.enum(ENVIRONMENT_NAMES).default('production'),
  SITE_URL: z.string().url('must be an absolute URL, e.g. https://example.com').optional(),
  API_URL: z.string().url('must be an absolute URL, e.g. https://example.com/api').optional(),
  SITE_USER: z.string().default(''),
  SITE_PASS: z.string().default(''),
  TIMEOUT_SHORT_MS: z.coerce.number().int().positive().default(5_000),
  TIMEOUT_STANDARD_MS: z.coerce.number().int().positive().default(15_000),
  TIMEOUT_LONG_MS: z.coerce.number().int().positive().default(30_000),
});

export interface Config {
  environment: EnvironmentName;
  siteUrl: string;
  apiUrl: string;
  credentials: { user: string; pass: string };
  // The three wait tiers from AGENTS.md: short for an element that should
  // already be present, standard for a normal navigation, long only for a
  // documented slow operation.
  timeouts: { short: number; standard: number; long: number };
}

/**
 * Parses and validates environment config, failing fast with every problem
 * named at once rather than letting a bad value surface deep inside a test.
 */
export function loadConfig(source: NodeJS.ProcessEnv = process.env): Config {
  const parsed = rawEnvSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(`invalid environment config:\n${formatIssues(parsed.error.issues)}`);
  }

  const raw = parsed.data;
  const isProduction = raw.TEST_ENV === 'production';
  const siteUrl = raw.SITE_URL ?? (isProduction ? PRODUCTION_DEFAULTS.siteUrl : undefined);
  const apiUrl = raw.API_URL ?? (isProduction ? PRODUCTION_DEFAULTS.apiUrl : undefined);

  if (!siteUrl || !apiUrl) {
    throw new Error(
      `invalid environment config:\n  - the "${raw.TEST_ENV}" environment has no built-in URLs; ` +
        'set SITE_URL and API_URL explicitly (only "production" has defaults)',
    );
  }

  return {
    environment: raw.TEST_ENV,
    siteUrl,
    apiUrl,
    credentials: { user: raw.SITE_USER, pass: raw.SITE_PASS },
    timeouts: { short: raw.TIMEOUT_SHORT_MS, standard: raw.TIMEOUT_STANDARD_MS, long: raw.TIMEOUT_LONG_MS },
  };
}

function formatIssues(issues: readonly { path: readonly PropertyKey[]; message: string }[]): string {
  return issues.map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`).join('\n');
}
