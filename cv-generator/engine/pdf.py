"""HTML rendering and PDF generation for the CV."""

import logging
import re
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup, escape

from engine.schema import CareerData

logger = logging.getLogger(__name__)

TECH_KEYWORDS = [
    "TypeScript",
    "JavaScript",
    "Vue.js",
    "Vue",
    "React",
    "AngularJS",
    "Angular",
    "Node.js",
    "Python",
    "C#/.NET",
    "Java",
    "Kotlin",
    "Scala",
    "SQL",
    "NoSQL",
    "Git",
    "GitLab",
    "Azure DevOps",
    "Docker",
    "Scrum",
]


def bold_tech(value: str | None) -> Markup:
    """Bold known technology names in a sentence for better scanability."""
    if not value:
        return Markup("")

    text = escape(str(value))
    for keyword in sorted(TECH_KEYWORDS, key=len, reverse=True):
        pattern = re.compile(rf"(?<!\\w){re.escape(keyword)}(?!\\w)")
        text = Markup(pattern.sub(lambda m: f"<strong>{m.group(0)}</strong>", str(text)))
    return Markup(text)


def format_date(value: str | int | None) -> str:
    """Format date values for CV output.

    Supported inputs:
    - YYYY-MM -> MM/YYYY
    - YYYY -> YYYY
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
        pass

    if raw.isdigit() and len(raw) == 4:
        return raw

    return raw


def render_cv_html(data: CareerData, template_path: Path) -> str:
    """Render career data to HTML using Jinja2 template."""
    template_dir = template_path.parent
    template_name = template_path.name

    env = Environment(loader=FileSystemLoader(template_dir), autoescape=True)
    env.filters["format_date"] = format_date
    env.filters["bold_tech"] = bold_tech
    template = env.get_template(template_name)

    return template.render(data=data)


def generate_pdf(html_content: str, output_path: Path) -> None:
    """Generate PDF from HTML content using WeasyPrint."""
    try:
        from weasyprint import HTML
    except ImportError:
        raise ImportError(
            "WeasyPrint is required for PDF generation. "
            "Install with: pip install weasyprint"
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)

    logger.info(f"Generating PDF: {output_path}")
    HTML(string=html_content).write_pdf(output_path)


def render_and_save_pdf(
    data: CareerData,
    template_path: Path,
    output_path: Path,
) -> Path:
    """Render career data to PDF.

    Args:
        data: Career data to render
        template_path: Path to HTML template
        output_path: Where to save the PDF

    Returns:
        Path to generated PDF
    """
    html = render_cv_html(data, template_path)
    generate_pdf(html, output_path)
    return output_path
