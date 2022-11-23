from pathlib import Path
from typing import Optional

from spaghetti.models.project_dependencies import ProjectDependencies
from spaghetti.parsing.source_parser import SourceParser

from .log import logger

_global_dependencies_state: Optional[ProjectDependencies] = None


def get_loaded_dependencies() -> ProjectDependencies:
    if _global_dependencies_state is None:
        raise RuntimeError("Dependencies are not stored.")

    return _global_dependencies_state


def store_dependencies(dependencies: ProjectDependencies) -> None:
    global _global_dependencies_state

    _global_dependencies_state = dependencies


def read_dependencies_from_source_path(source_path: Path) -> None:
    global _global_dependencies_state

    parser = SourceParser()
    loaded_dependencies = parser.parse_files_from_path(source_path)
    logger.info("source_parsed")

    store_dependencies(loaded_dependencies)
