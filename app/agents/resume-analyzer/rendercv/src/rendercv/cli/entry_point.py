"""Entry point for the Superplaced AI CV CLI.

Why:
    Users might install Superplaced AI CV with `pip install superplaced-cv` instead of
    `pip install superplaced-cv[full]`. This module catches that case and shows a helpful
    error message instead of a confusing `ImportError`.
"""

import sys


def entry_point() -> None:
    """Entry point for the Superplaced AI CV CLI."""
    try:
        from .app import app as cli_app  # NOQA: PLC0415
    except ImportError:
        error_message = """
It looks like you installed Superplaced AI CV with:

    pip install superplaced-cv

But Superplaced AI CV needs to be installed with:

    pip install "superplaced-cv[full]"

Please reinstall with the correct command above.
"""
        sys.stderr.write(error_message)
        raise SystemExit(1) from None

    cli_app()
