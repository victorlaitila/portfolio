import sys
from pathlib import Path

CV_GENERATOR = Path(__file__).parent.parent
sys.path.insert(0, str(CV_GENERATOR))

REPO_ROOT = CV_GENERATOR.parent
CAREER_YAML = REPO_ROOT / "src" / "data" / "career.yaml"
CV_PDF = REPO_ROOT / "public" / "Victor-Laitila-Software-Engineer-CV.pdf"
