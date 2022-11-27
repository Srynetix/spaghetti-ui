import os
from pathlib import Path

import click
import uvicorn

from spaghetti_ui import app


@click.command(no_args_is_help=True)
@click.version_option()
@click.argument("path", type=click.Path(path_type=Path))
@click.option("--port", "-p", default=8000, type=int, help="Target port.")
@click.option("--debug", "-d", is_flag=True, help="Enable debug mode.")
def run(path: Path, port: int, debug: bool) -> None:
    """
    Run the Spaghetti UI server.
    """
    print(f"Running Spaghetti UI on port {port} ...")

    os.environ["SPAGHETTI_SOURCE_PATH"] = str(path)
    uvicorn.run(f"{app.__name__}:app", port=port, reload=debug)
