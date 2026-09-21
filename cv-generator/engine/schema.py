"""Data model for career information.

Defines the canonical structure for career data using dataclasses.
All fields are validated during parsing.
"""

from dataclasses import dataclass, field as dc_field
from datetime import date
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

    @property
    def is_current(self) -> bool:
        return self.end == "present"

    @property
    def duration(self) -> str:
        """Human-readable duration string."""
        start_parts = self.start.split("-")
        start_year, start_month = int(start_parts[0]), int(start_parts[1])

        if self.is_current:
            end_date = date.today()
            end_year, end_month = end_date.year, end_date.month
        else:
            end_parts = self.end.split("-")
            end_year, end_month = int(end_parts[0]), int(end_parts[1])

        months = (end_year - start_year) * 12 + (end_month - start_month)
        years, remaining_months = divmod(months, 12)

        if years and remaining_months:
            return f"{years}y {remaining_months}m"
        elif years:
            return f"{years}y"
        else:
            return f"{remaining_months}m"


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
    highlights: list[str] = dc_field(default_factory=list)
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
    references: str | None = None


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

    @property
    def current_position(self) -> Experience | None:
        """Returns current job position if any."""
        for exp in self.experience:
            if exp.is_current:
                return exp
        return None
