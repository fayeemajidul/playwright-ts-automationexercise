/**
 * Placeholder module so the scaffold has something real to typecheck and unit
 * test. PW-02 replaces this with the typed environment config.
 */
export const FRAMEWORK = 'playwright-ts-automationexercise' as const;

export function describeTarget(url: string): string {
  if (!url.startsWith('https://')) {
    throw new Error(`target must be https, got: ${url}`);
  }
  return `${FRAMEWORK} against ${new URL(url).hostname}`;
}
