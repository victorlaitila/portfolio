"""Data model for career information.

Defines the canonical structure for career data using dataclasses.
All fields are validated during parsing.
"""

from dataclasses import dataclass, field as dc_field
from typing import Any, Literal


@dataclass
class PersonalLinks:
    github: str | None = None
    linkedin: str | None = None
    website: str | None = None


@dataclass
class Personal:
    name: str
    title: str
    email: str
    location: str
    phone: str | None = None
    links: PersonalLinks = dc_field(default_factory=PersonalLinks)


@dataclass
class Experience:
    company: str
    title: str
    location: str
    start: str  # YYYY-MM format
    end: str | Literal["present"]
    highlights: list[str] = dc_field(default_factory=list)
    targets: list[str] | None = None


@dataclass
class Education:
    institution: str
    degree: str
    start: str | int
    end: str | int
    field: str | None = None
    details: list[str] = dc_field(default_factory=list)
    targets: list[str] | None = None


@dataclass
class Project:
    name: str
    description: str
    url: str | None = None
    demo: str | None = None
    cv_summary: str | None = None  # One-liner rendered on the CV - projects without one are left off
    targets: list[str] | None = None


@dataclass
class Skills:
    frontend: list[str | dict[str, Any]] = dc_field(default_factory=list)
    backend: list[str | dict[str, Any]] = dc_field(default_factory=list)
    technologies: list[str | dict[str, Any]] = dc_field(default_factory=list)
    practices: list[str | dict[str, Any]] = dc_field(default_factory=list)
    ai: list[str | dict[str, Any]] = dc_field(default_factory=list)


@dataclass
class Additional:
    languages: list[str] = dc_field(default_factory=list)
    courses: list[str] = dc_field(default_factory=list)
    honors: list[str] = dc_field(default_factory=list)


@dataclass
class CareerData:
    """Root data model for career information."""

    personal: Personal
    summary: str
    experience: list[Experience]
    education: list[Education]
    skills: Skills
    projects: list[Project] = dc_field(default_factory=list)
    additional: Additional = dc_field(default_factory=Additional)
    keywords: list[str] = dc_field(default_factory=list)
