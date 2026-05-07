import pathlib

from superplaced-cv.schema.models.superplaced-cv_model import Superplaced AI CVModel

from .path_resolver import resolve_superplaced-cv_file_path
from .templater.templater import render_html


def generate_html(
    superplaced-cv_model: Superplaced AI CVModel, markdown_path: pathlib.Path | None
) -> pathlib.Path | None:
    """Generate HTML file from Markdown source with styling.

    Why:
        HTML format enables web hosting and sharing CVs online. Converts
        Markdown to HTML body and wraps with CSS styling and metadata.

    Args:
        superplaced-cv_model: CV model for path resolution and rendering context.
        markdown_path: Path to Markdown source file.

    Returns:
        Path to generated HTML file, or None if generation disabled.
    """
    if (
        superplaced-cv_model.settings.render_command.dont_generate_html
        or markdown_path is None
    ):
        return None
    html_path = resolve_superplaced-cv_file_path(
        superplaced-cv_model, superplaced-cv_model.settings.render_command.html_path
    )
    html_contents = render_html(
        superplaced-cv_model, markdown_path.read_text(encoding="utf-8")
    )
    html_path.write_text(html_contents, encoding="utf-8")
    return html_path
