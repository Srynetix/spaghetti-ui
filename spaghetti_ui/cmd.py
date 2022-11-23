import os
from pathlib import Path

import click
import uvicorn

from . import app


@click.command()
@click.argument("path", type=click.Path(path_type=Path))
def run(path: Path) -> None:
    os.environ["SPAGHETTI_SOURCE_PATH"] = str(path)
    uvicorn.run(f"{app.__name__}:app", reload=True)
