"""Checks that the committed CV PDF matches career.yaml.

The PDF in public/ is generated locally (npm run generate:cv) and committed,
so it can drift from career.yaml when someone edits the YAML and forgets to
regenerate. These tests read the text back out of the PDF and fail in that
case.
"""

import re

import pytest
import yaml
from pypdf import PdfReader

from engine.parser import parse_career_yaml
from engine.pdf import format_date
from generate import CAREER_YAML, OUTPUT as CV_PDF

REGENERATE_HINT = "CV PDF is out of date with career.yaml - run `npm run generate:cv` and commit the PDF"


def normalize(text: str) -> str:
    # The template uppercases some headings and wraps long lines, so compare
    # case-insensitively with all whitespace collapsed.
    return re.sub(r"\s+", " ", text).strip().lower()


@pytest.fixture(scope="module")
def reader() -> PdfReader:
    return PdfReader(CV_PDF)


@pytest.fixture(scope="module")
def pdf_text(reader: PdfReader) -> str:
    return normalize(" ".join(page.extract_text() for page in reader.pages))


@pytest.fixture(scope="module")
def raw_yaml() -> dict:
    with open(CAREER_YAML) as f:
        return yaml.safe_load(f)


def skill_name(skill) -> str:
    return skill["name"] if isinstance(skill, dict) else skill


def expected_cv_strings() -> list[str]:
    """Every piece of text career.yaml says should appear on the CV."""
    cv = parse_career_yaml(CAREER_YAML, target="cv")
    p = cv.personal
    strings = [p.name, p.title, p.email, p.location, cv.summary]
    if p.phone:
        strings.append(p.phone)
    for link in (p.links.linkedin, p.links.github, p.links.website):
        if link:
            strings.append(link.replace("https://", ""))

    for exp in cv.experience:
        strings += [
            f"{exp.title} - {exp.company}",
            f"{format_date(exp.start)} - {format_date(exp.end)}",
            *exp.highlights,
        ]
    for edu in cv.education:
        strings += [
            f"{edu.degree} - {edu.institution}",
            f"{format_date(edu.start)} - {format_date(edu.end)}",
            *edu.details,
        ]

    for project in cv.projects:
        if project.cv_summary:
            strings += [project.name, project.cv_summary]

    skills = cv.skills
    for group in (skills.frontend, skills.backend, skills.technologies, skills.practices, skills.ai):
        strings += [skill_name(s) for s in group]

    extra = cv.additional
    # Courses and honors are stored in career.yaml but not rendered on the CV.
    strings += extra.languages
    return strings


@pytest.mark.parametrize("expected", expected_cv_strings())
def test_cv_contains_current_career_data(pdf_text: str, expected: str):
    assert normalize(expected) in pdf_text, f"{REGENERATE_HINT}\nMissing: {expected!r}"


def test_cv_excludes_portfolio_only_entries(pdf_text: str, raw_yaml: dict):
    def portfolio_only(item) -> bool:
        return isinstance(item, dict) and item.get("targets") == ["portfolio"]

    excluded = []
    for exp in filter(portfolio_only, raw_yaml["experience"]):
        excluded += exp.get("highlights", [])
    for edu in raw_yaml["education"]:
        excluded += [d["text"] for d in edu.get("details", []) if portfolio_only(d)]
    for group in raw_yaml.get("skills", {}).values():
        excluded += [s["name"] for s in group if portfolio_only(s)]
    # Stored for later, but the CV doesn't render them.
    extra = raw_yaml.get("additional", {})
    excluded += [*extra.get("courses", []), *extra.get("honors", [])]
    # The CV only shows projects with a one-line `cv_summary`.
    excluded += [p["name"] for p in raw_yaml.get("projects", []) if portfolio_only(p) or not p.get("cv_summary")]

    leaked = [text for text in excluded if normalize(text) in pdf_text]
    assert not leaked, f"{REGENERATE_HINT}\nPortfolio-only content found on CV: {leaked}"


def test_cv_links_point_to_current_urls(reader: PdfReader):
    # The text check above only sees the printed link text, so also check where each link goes.
    cv = parse_career_yaml(CAREER_YAML, target="cv")
    links = cv.personal.links
    project_links = [p.demo or p.url for p in cv.projects if p.cv_summary]
    expected = sorted(url for url in (links.linkedin, links.github, links.website, *project_links) if url)
    actual = sorted(
        annot.get_object()["/A"]["/URI"]
        for page in reader.pages
        for annot in page.get("/Annots") or []
        if "/URI" in annot.get_object().get("/A", {})
    )
    assert actual == expected, f"{REGENERATE_HINT}\nCV links {actual} != career.yaml {expected}"


def test_cv_fits_on_one_page(reader: PdfReader):
    assert len(reader.pages) == 1, f"CV is {len(reader.pages)} pages, keep it to one"
