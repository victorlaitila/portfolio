# Victor Laitila - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience as a software engineer.

## 🌐 Live Site

Visit the live site at: [https://victorlaitila.github.io/portfolio/](https://victorlaitila.github.io/portfolio/)

## 🚀 Development

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:8080/portfolio/
npm run build        # production build into dist/
npm run generate:cv  # regenerate public/Victor-Laitila-Software-Engineer-CV.pdf from src/data/career.yaml
```

`src/data/career.yaml` is the single source of truth for both the site and the CV.
After editing it, run `npm run generate:cv` and commit the updated PDF. CI fails otherwise.

## ✅ Quality checks

Run **`npm run check`** before pushing. It runs everything CI runs and ends with a pass/fail summary
that tells you which command to rerun for each failure. The individual checks:

| Command             | What it checks                                                                          |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm run lint`      | ESLint                                                                                  |
| `npm run typecheck` | TypeScript (app, tests and config files)                                                |
| `npm test`          | `career.yaml` is valid for the site: dates, targets, project images, well-formed links  |
| `npm run test:cv`   | The committed CV PDF has all current CV data, no portfolio-only data, and is one page   |
| `npm run test:e2e`  | The production build in a real browser (desktop + mobile), see below                    |

The e2e tests check that:

- every section, project and image renders without errors, and nothing scrolls sideways on mobile
- navigation and hero buttons scroll to their sections
- the page shows exactly the external links in `career.yaml`, each opening in a new tab (`noopener`)
- email links use the address from `career.yaml`
- **Download CV** serves the committed PDF
- the contact form sends via EmailJS (mocked, so no real email) and handles errors and empty fields
- unknown URLs show the 404 page, with a link back to the portfolio
- the title, description, link-preview tags and favicon are in place

All tests live in `tests/`: `unit/` (Vitest), `cv/` (pytest), `e2e/` (Playwright).
`test:cv` uses the CV generator's virtualenv, so run `npm run generate:cv` once first.
`test:e2e` needs Playwright's browser once: `npx playwright install chromium`.
In CI the e2e tests also fail if the `VITE_EMAILJS_*` repo secrets are missing, so a broken contact form can't be deployed.

## 🔁 CI/CD

`.github/workflows/ci.yml` runs every check above on each pull request and push to `main`.
Pushes to `main` that pass all checks are deployed to GitHub Pages automatically. There is no manual deploy step.

`.github/workflows/links.yml` checks every Monday (and on PRs that change `career.yaml`) that the external
links still respond, for example that project demos are still up. It doesn't block deploys.

## 📧 Contact

Feel free to reach out to me through the contact form on the website.

