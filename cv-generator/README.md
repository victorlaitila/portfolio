# CV Generator

Generates `public/Victor-Laitila-Software-Engineer-CV.pdf` from `src/data/career.yaml`,
which is the single source of truth for both the portfolio site and the CV.

Entries in `career.yaml` can be scoped with `targets: [cv, portfolio]` (an entry with
no `targets` applies to both). The CV render only includes entries targeting `cv`.

## Usage

```bash
npm run generate:cv
```

This creates a local Python virtualenv under `cv-generator/.venv` on first run
(requires Python >= 3.10, e.g. `brew install python@3.12`) and regenerates the PDF,
replacing the one in `public/`. Commit the updated PDF like any other change.

## Layout

```
cv-generator/
├── generate-cv.sh      # venv bootstrap + entry point (invoked via npm run generate:cv)
├── generate.py          # reads career.yaml, writes the PDF
├── engine/
│   ├── schema.py         # data model
│   ├── parser.py         # YAML parsing + validation + target filtering
│   └── pdf.py             # Jinja2 HTML rendering + WeasyPrint PDF generation
├── templates/
│   └── cv.html           # CV layout/styling
└── requirements.txt
```
