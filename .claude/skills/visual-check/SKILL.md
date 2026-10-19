---
name: visual-check
description: Screenshot comparison of every site section at 10 screen sizes, between main (or another git ref) and the working tree. Run only when the user invokes /visual-check.
disable-model-invocation: true
---

# Visual check

The user runs this when they judge a UI change risky enough, often before a PR. Arguments, if
any, are a git ref to compare against (default `main`; `HEAD` compares only uncommitted changes).

1. **Know what is being compared.** Run `git log --oneline <ref>..HEAD` and `git status --short`.
   The comparison covers every commit listed plus all uncommitted changes, not only the latest edit.
2. **Run the check:** `npm run --silent visual:check -- <ref>`. It takes about 30 seconds and
   prints one of:
   - `No visual changes against <ref>...`: report that and stop.
   - `Changed against <ref> (section: screen sizes):`, then one line per section, e.g.
     `#projects: 320x568, 1280x720`. A line `page scrolls horizontally: <sizes>` means the page got
     wider than the screen at those sizes. That is always a regression. Sections clip their
     content (`overflow-hidden`), so content that overflows inside a section won't trigger it and
     only shows in that section's diff.
   - `Comparison did not run:` or a build error means nothing was compared. Common causes are a
     failed build or port 4173 already in use (`lsof -i :4173`). Report the cause and stop. Don't
     guess at results.
3. **Classify each changed section and size** against what the user asked for, not against what
   the code change technically touches:
   - **Expected:** the sections and sizes the request was about. Tailwind styles follow width
     only, so map the request's words to sizes like this:

     | Request says        | Sizes                                         | Tailwind         |
     | ------------------- | --------------------------------------------- | ---------------- |
     | phone, mobile       | 320x568, 375x667, 412x915, 740x360            | no prefix, `sm:` |
     | tablet              | 768x1024, and 852x393 (a phone turned sideways, but 768+ wide) | `md:` |
     | desktop, large      | 1024x768, 1280x720, 1920x1080, 2560x1440      | `lg:` and up     |
     | (no size mentioned) | all                                           |                  |

     If an expected section or size did **not** change, say so: the change probably has no effect
     there.

   - **Unexpected:** everything else, even when you can explain it, and even when it comes from
     the same line of code. List it under Unexpected, never as a note under Expected. Common causes:
     - A shared component (`GlowCard`, `Section`, `SectionHeader`, ...) changes other sections.
       Find where it is used with `grep -rln "<Component" src/components`, and repeat for each
       result until you reach the section files (e.g. `GlowCard` → `TimelineItem` → `Experience`).
     - A breakpoint prefix that starts earlier than the request (`md:` for "desktop").
     - A commit on the branch rather than the latest edit: check `git diff <ref> HEAD --stat -- src`.
     - A section that got taller or shorter. Everything below it moves, and so does the hero
       background showing through the translucent nav bar. This shows up first at short sizes
       (740x360, 852x393).

     To confirm a cause, read the change itself (`git diff <ref> -- <file>`) and the containers
     around it.
4. **Look only where needed.** List all diff images once: `find test-results -name "*-diff.png"`.
   The folder name ends in the screen size. Changed pixels are red. Next to each diff are
   `<section>-expected.png` (the ref) and `<section>-actual.png` (the working tree).
   - For each unexpected section, open one diff image to say what moved: at the size where the
     change is most likely to show, or 1280x720 if it changed everywhere.
   - Don't open diffs of expected sections unless the user asks.
5. **Report** in this shape, then stop. Fix nothing unless the user asks.
   - **Compared:** one line, `<ref>` vs the working tree (N commits + uncommitted changes). Don't
     list files.
   - **Expected:** section, sizes, one line on what changed.
   - **Unexpected:** section, sizes, what changed and the likely cause.
   - **Not covered:** see below, only the parts that apply to this change.

## Limits

- Shots use reduced motion, so animations, hover states and content revealed on scroll are not
  compared. Behavior that only appears at one screen size needs an e2e test at that size (see
  `writing-tests`).
- Chromium only.
- Differences under 50 pixels per screenshot are ignored. This is anti-aliasing noise; real changes
  measured here were hundreds of pixels. A change that small (e.g. one glyph's anti-aliasing) won't
  show.
- Screen sizes live in `VIEWPORTS` in `playwright.visual.config.ts`. Sections come from
  `SECTION_IDS`, plus the nav bar and footer.
