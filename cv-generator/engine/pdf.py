"""HTML rendering and PDF generation for the CV."""

import logging
import re
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup, escape

from engine.schema import CareerData

logger = logging.getLogger(__name__)

def make_keyword_bolder(keywords: list[str]):
    """Build a Jinja filter that bolds whole-word occurrences of `keywords`.

    Longer keywords are tried first, so "Vue.js" wins over "Vue".
    """
    if not keywords:
        return lambda value: Markup(escape(value or ""))

    alternatives = "|".join(re.escape(k) for k in sorted(keywords, key=len, reverse=True))
    pattern = re.compile(rf"(?<!\w)({alternatives})(?!\w)")

    def bold_keywords(value: str | None) -> Markup:
        if not value:
            return Markup("")
        return Markup(pattern.sub(lambda m: f"<strong>{m.group(0)}</strong>", str(escape(value))))

    return bold_keywords


def format_date(value: str | int | None) -> str:
    """Format date values for CV output.

    Supported inputs:
    - YYYY-MM -> MM/YYYY
    - present -> Present
    - expected YYYY-MM -> Expected MM/YYYY
    """
    if value is None:
        return ""

    raw = str(value).strip()
    if not raw:
        return ""

    lower = raw.lower()
    if lower == "present":
        return "Present"

    if lower.startswith("expected "):
        expected_value = raw[len("expected ") :].strip()
        return f"Expected {format_date(expected_value)}"

    try:
        return datetime.strptime(raw, "%Y-%m").strftime("%m/%Y")
    except ValueError:
        return raw


def render_cv_html(data: CareerData, template_path: Path) -> str:
    """Render career data to HTML using Jinja2 template."""
    template_dir = template_path.parent
    template_name = template_path.name

    env = Environment(loader=FileSystemLoader(template_dir), autoescape=True)
    env.filters["format_date"] = format_date
    env.filters["bold_keywords"] = make_keyword_bolder(data.keywords)
    template = env.get_template(template_name)

    return template.render(data=data)


def generate_pdf(html_content: str, output_path: Path) -> None:
    """Generate PDF from HTML content using WeasyPrint."""
    from weasyprint import HTML  # Imported here so tests that only render HTML don't load it.

    output_path.parent.mkdir(parents=True, exist_ok=True)

    logger.info(f"Generating PDF: {output_path}")
    HTML(string=html_content).write_pdf(output_path)
