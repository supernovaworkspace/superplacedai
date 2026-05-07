import pathlib

from superplaced-cv.schema.models.superplaced-cv_model import Superplaced AI CVModel

from .path_resolver import resolve_superplaced-cv_file_path
from .templater.templater import render_full_template


def generate_typst(superplaced-cv_model: Superplaced AI CVModel) -> pathlib.Path | None:
    """Generate Typst source file from CV model via Jinja2 templates.

    Why:
        Typst is the intermediate format before PDF/PNG compilation. Templates
        convert validated model data to Typst markup with proper formatting,
        fonts, and styling from design options.

    Args:
        superplaced-cv_model: Validated CV model with content and design.

    Returns:
        Path to generated Typst file, or None if generation disabled.
    """
    if superplaced-cv_model.settings.render_command.dont_generate_typst:
        return None
    typst_path = resolve_superplaced-cv_file_path(
        superplaced-cv_model, superplaced-cv_model.settings.render_command.typst_path
    )
    typst_contents = render_full_template(superplaced-cv_model, "typst")
    typst_path.write_text(typst_contents, encoding="utf-8")
    return typst_path
