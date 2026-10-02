# Portfolio

Victor Laitila's personal portfolio: a single-page React site deployed to GitHub Pages at
https://victorlaitila.github.io/portfolio/, plus a Python generator for the downloadable CV PDF.

Stack: Vite + React 18 + TypeScript, Tailwind + shadcn/ui (`src/components/ui`), Python 3.10+
with Jinja2/WeasyPrint for the CV.

## Commands

- `npm run dev`: dev server at http://localhost:8080/portfolio/
- `npm run check`: lint, typecheck, unit, CV and e2e tests, with a pass/fail summary. **Run it
  before calling any change done.** It's the same set of checks CI runs.
- `npm run generate:cv`: regenerates `public/Victor-Laitila-Software-Engineer-CV.pdf` from
  `career.yaml`. The PDF is committed.

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
- **The site is served under `/portfolio/`.** Files in `public/` must be linked as
  `` `${import.meta.env.BASE_URL}file` ``. Router links use `<Link>`, never `<a href="/">`.
- `src/pages/Index.tsx` stacks the section components, separated by `<SectionDivider />`. Section
  ids live in `SECTION_IDS` (`src/config/site.ts`). Use them for anchors instead of string literals.
- **Pushing to `main` deploys to the live site** (`.github/workflows/ci.yml`), but only once all
  checks pass. There is no manual deploy.
- The contact form uses EmailJS. Its `VITE_EMAILJS_*` keys come from the local `.env` (gitignored)
  and from repo secrets in CI.

## Conventions

- New sections use `<Section id={SECTION_IDS.x} title="..." background={img}>` (`Section.tsx`). It
  renders the wrapper, the background image from `src/assets/`, the container and the
  `<SectionHeader />`.
- Content cards use `<GlowCard>` (border, glow and `<Shimmer />` on hover). Timeline entries use
  `<TimelineItem>` with `<BulletList>`.
- Headings and labels use the Orbitron font through the `font-display` class. Don't set
  `fontFamily` inline.
- Images go in `src/assets/` as WebP, sized for display (full-bleed backgrounds ~2560px wide).
  Below-the-fold images use `loading="lazy"`.
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
