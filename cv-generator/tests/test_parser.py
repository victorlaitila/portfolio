"""Tests for target filtering and date formatting used when rendering the CV."""

import textwrap

import pytest

from engine.parser import ParseError, parse_career_yaml
from engine.pdf import format_date

MINIMAL_YAML = """
personal: {name: A, title: B, email: a@b.c, location: X}
summary: S
experience:
  - {company: Both, title: T, location: L, start: 2024-01, end: present}
  - {company: CvOnly, title: T, location: L, start: 2023-01, end: 2023-12, targets: [cv]}
  - {company: PortfolioOnly, title: T, location: L, start: 2022-01, end: 2022-12, targets: [portfolio]}
education:
  - institution: U
    degree: D
    start: 2020-09
    end: 2023-05
    details:
      - "GPA: 5"
      - {text: "Thesis: secret", targets: [portfolio]}
skills:
  frontend: [React, {name: Hidden, targets: [portfolio]}]
"""


@pytest.fixture
def career_yaml(tmp_path):
    path = tmp_path / "career.yaml"
    path.write_text(textwrap.dedent(MINIMAL_YAML))
    return path


def test_cv_target_keeps_untargeted_and_cv_entries(career_yaml):
    career = parse_career_yaml(career_yaml, target="cv")
    assert [e.company for e in career.experience] == ["Both", "CvOnly"]
    assert career.education[0].details == ["GPA: 5"]
    assert career.skills.frontend == ["React"]


def test_missing_required_field_is_reported(tmp_path):
    path = tmp_path / "career.yaml"
    path.write_text("personal: {name: A}\n")
    with pytest.raises(ParseError, match="'title' in personal"):
        parse_career_yaml(path)


@pytest.mark.parametrize(
    "value, expected",
    [
        ("2024-09", "09/2024"),
        ("present", "Present"),
        ("2021", "2021"),
        ("expected 2026-07", "Expected 07/2026"),
    ],
)
def test_format_date(value, expected):
    assert format_date(value) == expected
