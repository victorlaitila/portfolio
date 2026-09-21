#!/usr/bin/env python3
"""Generate the CV PDF from src/data/career.yaml.

career.yaml is the single source of truth for both the portfolio site and
the CV. Entries can be scoped with `targets: [cv, portfolio]`; this script
renders only entries targeting "cv" (or untargeted entries, which apply to
both).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from engine.parser import ParseError, parse_career_yaml  # noqa: E402
from engine.pdf import render_and_save_pdf  # noqa: E402

REPO_ROOT = Path(__file__).parent.parent
CAREER_YAML = REPO_ROOT / "src" / "data" / "career.yaml"
TEMPLATE = Path(__file__).parent / "templates" / "cv.html"
OUTPUT = REPO_ROOT / "public" / "Victor-Laitila-Software-Engineer-CV.pdf"


def main() -> None:
    try:
        career = parse_career_yaml(CAREER_YAML, target="cv")
    except (FileNotFoundError, ParseError) as e:
        print(f"Failed to parse {CAREER_YAML}: {e}", file=sys.stderr)
        sys.exit(1)

    render_and_save_pdf(career, TEMPLATE, OUTPUT)
    print(f"Generated {OUTPUT.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
