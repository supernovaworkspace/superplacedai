import rich
import rich.panel
from rich import print

from superplaced-cv import __version__


def print_welcome() -> None:
    """Display welcome banner with version and useful links.

    Why:
        New users need guidance on where to find documentation and support.
    """
    print(f"\nWelcome to [dodger_blue3]Superplaced AI CV v{__version__}[/dodger_blue3]!\n")
    links = {
        "Superplaced AI CV App": "https://superplaced-cv.com",
        "Documentation": "https://docs.superplaced-cv.com",
        "Source code": "https://github.com/superplaced-cv/superplaced-cv/",
        "Bug reports": "https://github.com/superplaced-cv/superplaced-cv/issues/",
    }
    link_strings = [
        f"[bold cyan]{title + ':':<15}[/bold cyan] [link={link}]{link}[/link]"
        for title, link in links.items()
    ]
    link_panel = rich.panel.Panel(
        "\n".join(link_strings),
        title="Useful Links",
        title_align="left",
        border_style="bright_black",
    )

    print(link_panel)
