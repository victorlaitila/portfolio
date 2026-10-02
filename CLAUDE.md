# Portfolio

Victor Laitila's personal portfolio: a single-page React site deployed to GitHub Pages at
https://victorlaitila.github.io/portfolio/, plus a Python generator for the downloadable CV PDF.

Stack: Vite + React 18 + TypeScript, Tailwind + shadcn/ui (`src/components/ui`), Python 3.10+
with Jinja2/WeasyPrint for the CV.

## Commands

- `npm run dev`: dev server at http://localhost:8080/portfolio/
- `npm run check`: lint, typecheck, unit, CV and e2e tests, with a pass/fail summary. **Run it
  before calling any change done.** It's the same set of checks CI runs. One-time setup:
  `npm run generate:cv` (creates the Python venv that `test:cv` uses) and
  `npx playwright install chromium`.
- `npm run generate:cv`: regenerates `public/Victor-Laitila-Software-Engineer-CV.pdf` from
  `career.yaml`. The PDF is committed.
- `npm run generate:og-image`: regenerates `public/og-image.jpg`, the link-preview image, from the
  hero section. Rerun it when the name, title, tagline or hero design changes.

## How the project fits together

- **`src/data/career.yaml` is the single source of truth** for the site *and* the CV. Never
  hard-code career content (jobs, projects, skills, contact info) in components. Read it through
  `getCareerData()` from `@/data`.
  - `targets: [cv]` or `[portfolio]` limits an entry to one output. Leaving `targets` out means both.
  - Site-only content that isn't career data (tagline, About text, project image imports) lives in
    `src/data/extensions.ts`.
  - `keywords` in `career.yaml` lists the technology names shown in bold in experience highlights,
    on both the site and the CV.
  - Any `career.yaml` change that affects CV content needs `npm run generate:cv` and the updated PDF
    committed. `tests/cv` fails otherwise. For content changes, use the `update-career-content` skill.
- **What "no hard-coding" covers:** content and data (`career.yaml`, `extensions.ts`), the site URL
  and path, section ids (`SECTION_IDS`), file names like `CV_FILENAME`, and anything else that would
  otherwise be written in two places. UI copy (button labels, toasts, form labels and placeholders,
  section titles) stays inline in the component that uses it. The site is single-language, so it
  doesn't go through a strings file.
- **The site is served under `/portfolio/`.** That path, the canonical and link-preview URLs and the
  test URLs all derive from `personal.links.website` in `career.yaml` (via `scripts/career.ts`).
  Never hard-code the site URL or path. Files in `public/` must be linked as
  `` `${import.meta.env.BASE_URL}file` ``. Router links use `<Link>`, never `<a href="/">`.
- `src/pages/Index.tsx` stacks the section components, separated by `<SectionDivider />`. Section
  ids live in `SECTION_IDS` (`src/config/site.ts`). Use them for anchors instead of string literals.
- **Pushing to `main` runs the checks but does not deploy.**
  - `ci.yml`: every check, on pushes to `main` and on pull requests. Never deploys.
  - `deploy.yml`: manual only (Actions → Deploy, or `gh workflow run deploy.yml`). Reruns every
    check through `ci.yml` and deploys `main` to GitHub Pages only if they pass. Never trigger it
    unless the user asks.
  - `links.yml`: weekly, and on PRs that change `career.yaml`. Checks that the external links
    still respond. It doesn't block deploys.
- The contact form uses EmailJS. Its `VITE_EMAILJS_*` keys come from the local `.env` (gitignored)
  and from repo secrets in CI.

## Conventions

- After a change, update the documentation it makes inaccurate: `README.md`, this file,
  `cv-generator/README.md` and the skills in `.claude/skills/`. Only add or extend docs when there
  is something a reader actually needs to know. Don't write docs just to have them.
- `README.md` is for visitors (recruiters, developers browsing GitHub). Keep it short and personal:
  what the site is, what it's built with, how to run it. Development details (checks, CI, data
  rules, conventions) belong here in CLAUDE.md, not in the README.
- New sections use `<Section id={SECTION_IDS.x} title="..." background={img}>` (`Section.tsx`). It
  renders the wrapper, the background image from `src/assets/`, the container and the
  `<SectionHeader />`.
- Split a component into its own file when more than one place uses it (`GlowCard`,
  `TimelineItem`, `SectionHeader`). A sub-component used only by one section stays in that
  section's file (`ProjectCard` in `Projects.tsx`, `Module` in `Skills.tsx`). Split a section file
  that grows hard to follow, not just to make files smaller.
- Content cards use `<GlowCard>` (border, glow and `<Shimmer />` on hover). Timeline entries use
  `<TimelineItem>` with `<BulletList>`.
- Headings and labels use the Orbitron font through the `font-display` class. Don't set
  `fontFamily` inline.
- Images go in `src/assets/` as WebP, sized for display (full-bleed backgrounds ~2560px wide,
  others ~3x their displayed size). The same applies to `public/`. Below-the-fold images use
  `loading="lazy"`.
- Use theme tokens (`primary`, `accent`, `muted-foreground`, defined in `src/index.css`), not raw
  colours. The site is dark-only.
- External links: `target="_blank" rel="noopener noreferrer"`. The e2e tests enforce this.
- Reuse the existing shadcn/ui components before adding dependencies.
- Changes must work at mobile width. The e2e tests run on a mobile viewport and fail on horizontal
  scrolling.

## Tests

Tests live in `tests/`: `unit/` (Vitest, data layer), `cv/` (pytest, the committed PDF matches
`career.yaml`), `e2e/` (Playwright against the production build). When adding or changing tests,
use the `writing-tests` skill.

Add or update tests as part of the change, without being asked, when it adds or changes something a
visitor would notice breaking. That includes content that should appear, links, forms, navigation,
and anything that hides content until it runs (e.g. scroll-triggered animations,
`tests/e2e/skills.spec.ts`). Purely visual changes don't need tests.
