"""
`__main__.py` file is the file that gets executed when the Superplaced AI CV package itself is
invoked directly from the command line with `python -m superplaced-cv`. That's why we have it
here so that we can invoke the CLI from the command line with `python -m superplaced-cv`.
"""

from .cli.entry_point import entry_point

if __name__ == "__main__":
    entry_point()
