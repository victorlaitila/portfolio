"""YAML parser and validator for career data."""

from pathlib import Path
from typing import Any

import yaml

from engine.schema import (
    Additional,
    CareerData,
    Education,
    Experience,
    Personal,
    PersonalLinks,
    Project,
    Skills,
)


class ParseError(Exception):
    """Raised when career data fails validation."""

    pass


def _has_target(entry: dict, target: str | None) -> bool:
    """Check if an entry should be included for a given target.

    If no target is provided, include all entries.
    If entry has no targets, include by default.
    """
    if target is None:
        return True

    targets = entry.get("targets")
    if targets is None:
        return True

    return isinstance(targets, list) and target in targets


def _require(data: dict, key: str, context: str = "") -> Any:
    """Extract required key or raise ParseError."""
    if key not in data:
        location = f" in {context}" if context else ""
        raise ParseError(f"Missing required field '{key}'{location}")
    return data[key]


def _parse_personal(data: dict) -> Personal:
    """Parse personal information section."""
    links_data = data.get("links", {})
    links = PersonalLinks(
        github=links_data.get("github"),
        linkedin=links_data.get("linkedin"),
        website=links_data.get("website"),
    )
    return Personal(
        name=_require(data, "name", "personal"),
        title=_require(data, "title", "personal"),
        email=_require(data, "email", "personal"),
        phone=data.get("phone"),
        location=_require(data, "location", "personal"),
        links=links,
    )


def _parse_experience(data: dict, index: int) -> Experience:
    """Parse a single experience entry."""
    ctx = f"experience[{index}]"
    return Experience(
        company=_require(data, "company", ctx),
        title=_require(data, "title", ctx),
        location=_require(data, "location", ctx),
        start=str(_require(data, "start", ctx)),
        end=str(_require(data, "end", ctx)),
        highlights=data.get("highlights", []),
        targets=data.get("targets"),
    )


def _filter_detail_items(items: list, target: str | None) -> list[str]:
    """Filter a details list where items may be a string or {text, targets}."""
    filtered = []
    for item in items:
        if isinstance(item, dict):
            if _has_target(item, target):
                filtered.append(item.get("text", ""))
            continue
        filtered.append(item)
    return filtered


def _parse_education(data: dict, index: int, target: str | None = None) -> Education:
    """Parse a single education entry."""
    ctx = f"education[{index}]"
    return Education(
        institution=_require(data, "institution", ctx),
        degree=_require(data, "degree", ctx),
        start=_require(data, "start", ctx),
        end=_require(data, "end", ctx),
        field=data.get("field"),
        details=_filter_detail_items(data.get("details", []), target),
        targets=data.get("targets"),
    )


def _parse_project(data: dict, index: int) -> Project:
    """Parse a single project entry."""
    ctx = f"projects[{index}]"
    return Project(
        name=_require(data, "name", ctx),
        description=_require(data, "description", ctx),
        url=data.get("url"),
        highlights=data.get("highlights", []),
        targets=data.get("targets"),
    )


def _filter_targeted_list(items: list, target: str | None) -> list:
    """Filter a list where items may have an optional `targets` key."""
    filtered = []
    for item in items:
        if isinstance(item, dict):
            if _has_target(item, target):
                filtered.append(item)
            continue
        filtered.append(item)
    return filtered


def _parse_skills(data: dict, target: str | None = None) -> Skills:
    """Parse skills section."""
    frontend = _filter_targeted_list(data.get("frontend", []), target)
    backend = _filter_targeted_list(data.get("backend", []), target)
    technologies = _filter_targeted_list(data.get("technologies", []), target)
    practices = _filter_targeted_list(data.get("practices", []), target)
    ai = _filter_targeted_list(data.get("ai", []), target)

    return Skills(
        frontend=frontend,
        backend=backend,
        technologies=technologies,
        practices=practices,
        ai=ai,
    )


def _parse_additional(data: dict) -> Additional:
    """Parse optional additional information section."""
    return Additional(
        languages=data.get("languages", []),
        courses=data.get("courses", []),
        honors=data.get("honors", []),
        references=data.get("references"),
    )


def parse_career_yaml(path: Path, target: str | None = None) -> CareerData:
    """Parse and validate career.yaml file.

    Args:
        path: Path to career.yaml file
        target: If given, filter entries by their `targets` field (e.g. "cv")

    Returns:
        Validated CareerData instance

    Raises:
        ParseError: If validation fails
        FileNotFoundError: If file doesn't exist
    """
    if not path.exists():
        raise FileNotFoundError(f"Career data file not found: {path}")

    with open(path) as f:
        raw = yaml.safe_load(f)

    if not isinstance(raw, dict):
        raise ParseError("Career data must be a YAML mapping")

    personal = _parse_personal(_require(raw, "personal"))
    summary = _require(raw, "summary")

    experience_data = _require(raw, "experience")
    if not isinstance(experience_data, list):
        raise ParseError("'experience' must be a list")
    experience_data = [item for item in experience_data if _has_target(item, target)]
    experience = [_parse_experience(exp, i) for i, exp in enumerate(experience_data)]

    education_data = _require(raw, "education")
    if not isinstance(education_data, list):
        raise ParseError("'education' must be a list")
    education_data = [item for item in education_data if _has_target(item, target)]
    education = [_parse_education(edu, i, target) for i, edu in enumerate(education_data)]

    skills = _parse_skills(raw.get("skills", {}), target)

    projects_data = raw.get("projects", [])
    projects_data = [item for item in projects_data if _has_target(item, target)]
    projects = [_parse_project(proj, i) for i, proj in enumerate(projects_data)]

    additional = _parse_additional(raw.get("additional", {}))

    return CareerData(
        personal=personal,
        summary=summary,
        experience=experience,
        education=education,
        skills=skills,
        projects=projects,
        additional=additional,
    )
