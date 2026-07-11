# AGENTS.md

## Project Overview

This repository contains a production-style Playwright and TypeScript automation framework for Web UI and API testing.

The framework must remain scalable, maintainable, readable, and suitable for portfolio and enterprise-style use.

## Core Principles

- Inspect the existing implementation before making changes.
- Prefer small, focused, low-risk changes.
- Reuse existing abstractions before creating new ones.
- Fix the root cause instead of adding temporary workarounds.
- Do not modify stable or passing flows unless the change is necessary.
- Avoid over-engineering and unnecessary abstractions.
- Keep framework code separate from test code.
- Never commit secrets, credentials, generated reports, or local machine artifacts.
- Keep every change easy to review and explain.

## Architecture Rules

- Reusable framework code belongs under `src/`.
- Test specifications belong under `tests/`.
- Page Object Model must be used for UI automation.
- API clients and API-specific abstractions must remain separate from UI page objects.
- Shared setup must use Playwright fixtures where appropriate.
- Utilities must be application-independent.
- Configuration must be centralized.
- Test data must not be hardcoded repeatedly across tests.
- Each file and class should have a clear single responsibility.

## Playwright Rules

- Use TypeScript strict mode.
- Prefer Playwright-native APIs and auto-waiting.
- Do not use `page.waitForTimeout()` unless there is a documented and unavoidable reason.
- Do not add arbitrary delays.
- Prefer stable locators in this order:
  1. `getByTestId`
  2. Accessible role and name
  3. Label, placeholder, or visible text
  4. Stable CSS selector
  5. XPath only as a last resort
- Avoid brittle selectors based on layout, generated classes, or element position.
- Keep assertions inside tests unless a reusable domain validation clearly belongs elsewhere.
- Use `expect` assertions from Playwright Test.
- Keep tests independent and parallel-safe.
- Do not make tests depend on execution order.
- Manage browser context and page lifecycle through Playwright fixtures.
- Local development execution should use Chromium unless cross-browser validation is specifically required.

## Page Object Rules

- Page objects must expose meaningful business actions, not raw implementation details.
- Keep locators private or readonly where practical.
- Do not place test assertions throughout page objects.
- Avoid giant page objects.
- Split pages or components when responsibilities become too broad.
- Do not create a generic wrapper for every Playwright action.
- Introduce base abstractions only when they remove real duplication.
- Prefer composition for reusable page components where inheritance is not necessary.

## API Automation Rules

- Keep API request logic separate from test specifications.
- Centralize base URLs, headers, and authentication handling.
- Use typed request and response models where useful.
- Validate response status, schema, and important business data.
- Do not expose secrets in logs or reports.
- Reuse Playwright `APIRequestContext` where appropriate.

## Configuration and Secrets

- Use environment-based configuration.
- Commit `.env.example`, but never commit real `.env` files.
- Do not hardcode credentials, tokens, or environment-specific URLs.
- Fail clearly when required configuration is missing.
- Keep environment selection explicit and predictable.

## Code Quality

- Use clear and descriptive naming.
- Avoid duplicated code.
- Avoid unnecessary comments that repeat the code.
- Add comments only when they explain intent, constraints, or non-obvious behavior.
- Keep functions and methods focused.
- Prefer typed interfaces and explicit return types where they improve clarity.
- Do not use `any` unless there is a documented reason.
- Keep imports organized and remove unused code.

## Validation Before Completion

Before considering a change complete:

```bash
npx tsc --noEmit
npx playwright test --project=chromium