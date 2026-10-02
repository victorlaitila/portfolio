---
name: writing-tests
description: Use when adding, changing or debugging tests in this project (Vitest unit tests, pytest CV tests, Playwright e2e tests). Covers which layer a test belongs in, what is worth testing here, and known pitfalls with this app's preview server, toasts and selectors.
---

# Writing tests for this portfolio

Only test what a visitor or recruiter would notice breaking: content, links, CV download, the
contact form, navigation, and rendering on mobile. Don't add tests for styling details or
component internals.

## Pick the layer

| Layer            | Location     | Use for                                                       | Run                |
| ---------------- | ------------ | ------------------------------------------------------------- | ------------------ |
| Unit (Vitest)    | `tests/unit` | `career.yaml` data rules and the `src/data` filtering logic   | `npm test`         |
| CV (pytest)      | `tests/cv`   | The committed PDF matches `career.yaml`; the CV parser        | `npm run test:cv`  |
| E2E (Playwright) | `tests/e2e`  | Anything that needs the built site in a browser               | `npm run test:e2e` |

Prefer the cheapest layer that can catch the bug. For example, a malformed URL in `career.yaml` is
a unit test; whether that link opens in a new tab is e2e.

## Conventions

- **Derive expectations from `career.yaml`**, never hard-code content. E2E tests use
  `tests/e2e/career.ts`; unit tests import `career.yaml?raw`; CV tests use `engine.parser`.
  Content edits should never require test edits.
- **No real external traffic.**
  - EmailJS is mocked with `page.route` (see `contact.spec.ts`), with an abort-everything fallback
    so no real email is ever sent.
  - Navigations to other sites are answered with a stub page (see `links.spec.ts`).
  - Real link liveness is checked only by the weekly `.github/workflows/links.yml`.
- E2E tests run on both the `desktop` and `mobile` Playwright projects. A test must pass on both,
  or use `test.skip` with a reason.
- Locally, Playwright builds the app itself. In CI it reuses the build from the earlier step, which
  has the real EmailJS secrets.

## Known pitfalls

- **`vite preview` answers every unknown path with `index.html` (status 200).** Requesting a
  missing file or route therefore looks like a success. Check build output on disk (`dist/...`)
  and assert `href` attributes instead of relying on the preview server's response.
- **Radix toasts render their text twice**: once visibly and once in a screen-reader `role=status`
  span that appears after a delay. Match toast text with `{ exact: true }` using the full string,
  or the test will be flaky.
- **Labels collide.** "Email", "GitHub" and "LinkedIn" are also `aria-label`s on icon links. Scope
  locators, e.g. `getByLabel("Email", { exact: true }).and(page.locator("input"))`.
- Smooth scrolling is on: use the auto-retrying `toBeInViewport()` rather than one-off position
  checks.
- Files in `tests/e2e` and the Playwright config are type-checked by `tsconfig.node.json`.
  Browser-side code inside `evaluate()` relies on its `DOM` lib.

## Prove the test works

Before finishing, temporarily reintroduce the bug the test is meant to catch, for example by
reverting the fix or breaking the data. Confirm the test fails with a clear message, then restore
the code. For more confidence against flakiness, run
`npx playwright test <file> --repeat-each 3`.
