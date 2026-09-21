#!/usr/bin/env bash
# Sets up (once) and runs the CV generator's Python virtualenv.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$DIR/.venv"

find_python() {
  for candidate in python3.13 python3.12 python3.11 python3.10 python3; do
    if command -v "$candidate" >/dev/null 2>&1; then
      if "$candidate" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)' 2>/dev/null; then
        command -v "$candidate"
        return 0
      fi
    fi
  done
  return 1
}

if [ ! -x "$VENV/bin/python" ]; then
  PYTHON="$(find_python)" || {
    echo "error: Python >= 3.10 is required to generate the CV." >&2
    echo "       Install one, e.g.: brew install python@3.12" >&2
    exit 1
  }
  echo "Setting up cv-generator virtualenv with $PYTHON..."
  "$PYTHON" -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip
  "$VENV/bin/pip" install --quiet -r "$DIR/requirements.txt"
fi

exec "$VENV/bin/python" "$DIR/generate.py"
