---
name: update-career-content
description: Use when adding or changing portfolio/CV content in this project, such as a new project, job, skill, education entry, contact info, or wording in career.yaml. Covers every file that has to change alongside career.yaml and how to regenerate and verify the CV.
---

# Updating career content

`src/data/career.yaml` drives both the site and the CV PDF. Most content changes touch only that
file, but some need companion edits that are easy to miss. Work through the relevant parts below.

## 1. Edit `career.yaml`

- Decide `targets` first:
  - Leave `targets` out to show the entry on both the site and the CV.
  - Use `[portfolio]` for site-only entries (projects are usually site-only; the CV template doesn't
    render projects).
  - Use `[cv]` for CV-only entries.
- Dates are `YYYY-MM`; an ongoing role ends with `present`. Experience is listed **newest first**.
  A unit test checks both.
- Education `details` and `skills` entries can be plain strings or `{text|name, targets}` objects.
- In education details, keep at most one `:` per line. The CV template splits on `:` to bold the
  label, so anything after a second colon is dropped from the CV.

## 2. Companion edits

**New project** (shown in the Projects grid):
1. Put the thumbnail in `src/assets/` (16:9, like the existing `*-thumbnail.png` files).
2. In `career.yaml`, set `image: <filename>` and include at least one of `url` (GitHub), `demo`,
   or `video`. Every link must be `https://`.
3. Import the thumbnail in `src/data/extensions.ts` and add it to `projectImages` under the same
   filename. A unit test fails if this mapping is missing.
4. YouTube links must be exactly `https://www.youtube.com/watch?v=<11-char id>`, with no trailing
   `/` and no extra query parameters.
5. Add `tags` for the badges on the card.

**New skill:**
- Add an icon for it in `src/data/skillIcons.tsx`, keyed by the exact skill name. Use `react-icons/si`
  for brands, `lucide-react` otherwise. Without an entry the skill renders with no icon.
- If it's a technology that should be bold in CV bullet points, add it to `TECH_KEYWORDS` in
  `cv-generator/engine/pdf.py`.

**New skill category** (a new key under `skills:`): this needs code changes in
`src/data/index.ts`, `src/data/types.ts`, `src/components/Skills.tsx`,
`cv-generator/engine/parser.py`, `cv-generator/engine/schema.py` and `cv-generator/templates/cv.html`.
Confirm with the user before doing it.

## 3. Regenerate the CV

If the change affects anything that appears on the CV (any entry not limited to `[portfolio]`):

```bash
npm run generate:cv
```

The CV must stay **one page**, and `tests/cv` enforces this. If it overflows, ask the user what to
cut rather than shrinking the template's font or margins on your own.

## 4. Verify

Run `npm run check`. The usual failures after content edits:

- `tests/cv`: "CV PDF is out of date". You forgot to run `generate:cv`.
- `tests/unit`: a missing image mapping, a malformed link, or a date format or order problem.
- `tests/e2e/links.spec.ts`: it derives the expected links from `career.yaml`, so it fails only if
  a link renders without `target="_blank"` or isn't rendered at all.

Remind the user to commit the regenerated PDF together with the YAML change.
