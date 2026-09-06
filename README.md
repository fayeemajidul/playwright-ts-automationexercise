# playwright-ts-automationexercise

A Playwright and TypeScript test framework built against
[automationexercise.com](https://automationexercise.com), one reviewed commit a
day through September 2026.

[![nightly](https://github.com/fayeemajidul/playwright-ts-automationexercise/actions/workflows/nightly.yml/badge.svg)](https://github.com/fayeemajidul/playwright-ts-automationexercise/actions/workflows/nightly.yml)
[![ci](https://github.com/fayeemajidul/playwright-ts-automationexercise/actions/workflows/ci.yml/badge.svg)](https://github.com/fayeemajidul/playwright-ts-automationexercise/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/fayeemajidul/playwright-ts-automationexercise)](LICENSE)

> Being built in the open. [`ROADMAP.md`](ROADMAP.md) is the plan and it is
> honest about what does not exist yet.

## Why this target

automationexercise.com publishes a list of API endpoints and states in writing
that they exist for practising API testing. So the API layer here is real work
rather than decoration, and test setup goes through the API instead of clicking
through the interface, which is both faster and not the thing under test.

## Quick start

```bash
pnpm install
pnpm exec playwright install chromium
cp .env.example .env
pnpm gate
```

## Commands

| Command | What it runs |
|---|---|
| `pnpm gate` | Everything that must pass before a commit: lint, typecheck, unit, smoke |
| `pnpm test:smoke` | The fast subset, tagged `@smoke` |
| `pnpm test:regression` | The full suite, as the nightly run does |
| `pnpm test:api` | API tests only |

## What this will demonstrate

Tracked in [`ROADMAP.md`](ROADMAP.md), each backed by a specific item: page
objects, an API layer, structured logging, reporting, CI, retries with a cap,
typed environment config, and docs.

## How it is built

One unit of work per day by a scheduled GitHub Actions job, reviewed weekly by
me. The agent cannot use git; the workflow reruns the gate independently and a
guard script rejects anything that is not real engineering. Details in
[`docs/HOW_THIS_REPO_IS_BUILT.md`](docs/HOW_THIS_REPO_IS_BUILT.md).

## License

MIT
