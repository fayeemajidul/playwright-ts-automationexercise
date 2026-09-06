import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'site'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // A fixed sleep is the single most common cause of a flaky suite.
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.property.name='waitForTimeout']",
          message: 'No fixed sleeps. Wait for a condition, never for a duration. See AGENTS.md.',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
);
