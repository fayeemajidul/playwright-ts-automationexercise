---
repo: playwright-ts-automationexercise
month: 2026-09
site: https://automationexercise.com
gate: pnpm gate
prefix: PW
---
# Roadmap

The daily agent takes the first unchecked item that is not under Blocked, and does
exactly one per day. Every item has a **Done when** line that must be true before
the checkbox moves.

Tags: `[offline-ok]` means the item needs no live site, so it is safe on a day the
target is down. `[scaffold]` lifts the diff size ceiling for that item only.

Why this site: automationexercise.com publishes a list of API endpoints and says
in writing that they exist for people to practise API testing on. That means the
API layer here is genuine rather than an afterthought, and setup can go through
the API instead of clicking through the interface.

## Capability checklist

The month is not finished until all eight of these are real.

- [ ] Logging, delivered by PW-09
- [ ] API layer, delivered by PW-06 and PW-07
- [ ] Reporting, delivered by PW-19
- [ ] CI, delivered by PW-01 and PW-20
- [ ] Page objects, delivered by PW-04 and PW-10 through PW-14
- [ ] Retries, delivered by PW-16
- [ ] Environment config, delivered by PW-02
- [ ] Docs, delivered by PW-03 and PW-25

## Week 1, foundation

- [x] PW-01 [offline-ok] [scaffold] Project scaffold: pnpm, TypeScript strict, Playwright, eslint, prettier, `.env.example`, and a `gate` script. Done when: `pnpm gate` passes with one placeholder test.
- [x] PW-02 [offline-ok] Typed environment config validated at startup with zod: base url, api url, credentials, timeouts, three named environments. Done when: a unit test proves an invalid environment fails fast with a readable message.
- [ ] PW-03 [offline-ok] Architecture doc with the layer table and a Mermaid diagram in `docs/ARCHITECTURE.md`. Done when: the README links to it and the diagram matches the real folders.
- [ ] PW-04 [offline-ok] Base page object and the locator strategy ladder in `docs/LOCATORS.md`. Done when: the doc states the ordered preference and BasePage exposes only navigation and waiting helpers.
- [ ] PW-05 Home page object and a first real smoke test against the live site. Done when: the smoke test asserts the carousel and category list render, and passes twice in a row.

## Week 2, the API layer and the core flows

- [ ] PW-06 API client with a typed request wrapper over the documented endpoints. Done when: `getAllProducts` and `getAllBrands` are covered by tests that assert the response shape, not just the status.
- [ ] PW-07 API driven test data: create and delete an account through the API for use as test setup. Done when: a fixture creates a unique account per test and removes it afterwards.
- [ ] PW-08 Negative API tests for the endpoints that deliberately return 405 and 400. Done when: each documented error case is asserted with its message.
- [ ] PW-09 Structured logging with pino, one event per meaningful step, run id attached, credentials redacted. Done when: a failing run's log alone identifies which step failed.
- [ ] PW-10 Products page object with search and category filtering. Done when: search results are asserted against the API response for the same query.
- [ ] PW-11 Product detail page object. Done when: price, availability, and brand are asserted.
- [ ] PW-12 Cart page object with quantity change and removal. Done when: cart totals are asserted after each mutation.

## Week 3, breadth and depth

- [ ] PW-13 Signup and login page objects, driven by API created accounts. Done when: valid login, invalid password, and a locked scenario are each covered.
- [ ] PW-14 Checkout page object through to order placement. Done when: the address shown at checkout matches the one the API created.
- [ ] PW-15 Contact form and file upload. Done when: the upload asserts the confirmation, and the fixture cleans the file up.
- [ ] PW-16 Retry policy: retries only in CI, capped at one, trace on first retry, and a recorded reason. Done when: `docs/FLAKE.md` explains when a retry is legitimate and when it hides a bug.
- [ ] PW-17 Parallel safety audit: every test creates its own data and shares no state. Done when: the suite passes with four workers, run twice.
- [ ] PW-18 Test tagging: smoke, regression, and api, with scripts to run each. Done when: `pnpm test:smoke` finishes in under three minutes.

## Week 4, hardening and polish

- [ ] PW-19 Reporting: the Playwright HTML report plus a run summary written to `status.json`. Done when: the nightly workflow publishes both and the index lists recent runs.
- [ ] PW-20 CI hardening: browser caching, artifact retention, and a workflow that stays green when the target site is down. Done when: a forced site outage produces a clear skip rather than a red suite.
- [ ] PW-21 Accessibility smoke with axe on the three highest traffic pages. Done when: violations are reported with severity and a documented budget.
- [ ] PW-22 [offline-ok] Error handling pass: every custom exception carries the context needed to debug it. Done when: no bare throw remains.
- [ ] PW-23 Data factory tidy up and removal of any duplicated fixtures. Done when: no test constructs a user object inline.
- [ ] PW-24 [offline-ok] Contributing guide and issue templates. Done when: a stranger could run the suite from the README alone.
- [ ] PW-25 [offline-ok] README final pass using the portfolio template. Done when: every badge resolves and the report link is live.
- [ ] PW-26 [offline-ok] Month retrospective in `docs/RETRO.md`. Done when: it names what was hard, what was cut, and what a reviewer should read first.

## Backlog

Used only when every dated item is done.

- [ ] PW-40 [offline-ok] Flake report over the last thirty nightly runs.
- [ ] PW-41 Visual comparison on the product grid.
- [ ] PW-42 [offline-ok] Dockerfile so the suite runs identically anywhere.

## Blocked

Items the loop failed twice, moved here automatically with a link to the run.
