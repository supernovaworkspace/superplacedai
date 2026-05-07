import pathlib

from superplaced-cv.schema.models.superplaced-cv_model import Superplaced AI CVModel

from .path_resolver import resolve_superplaced-cv_file_path
from .templater.templater import render_full_template


def generate_markdown(superplaced-cv_model: Superplaced AI CVModel) -> pathlib.Path | None:
    """Generate Markdown file from CV model via Jinja2 templates.

    Why:
        Markdown provides human-readable CV format for version control and
        web platforms. Acts as intermediate format for HTML generation.

    Args:
        superplaced-cv_model: Validated CV model with content.

    Returns:
        Path to generated Markdown file, or None if generation disabled.
    """
    if superplaced-cv_model.settings.render_command.dont_generate_markdown:
        return None
    markdown_path = resolve_superplaced-cv_file_path(
        superplaced-cv_model, superplaced-cv_model.settings.render_command.markdown_path
    )
    markdown_contents = render_full_template(superplaced-cv_model, "markdown")
    markdown_path.write_text(markdown_contents, encoding="utf-8")
    return markdown_path
