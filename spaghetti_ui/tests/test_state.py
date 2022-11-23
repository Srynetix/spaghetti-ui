from pathlib import Path
from typing import Any, Generator
from unittest.mock import MagicMock

import pytest
from spaghetti.models.project_dependencies import ProjectDependencies

from spaghetti_ui import state


class TestState:
    @pytest.fixture
    def dummy_parse_files_from_path(
        self, mocker: Any, temporary_state: None, dummy_dependencies: ProjectDependencies
    ) -> MagicMock:
        mock = MagicMock(return_value=dummy_dependencies)
        mocker.patch("spaghetti_ui.state.SourceParser.parse_files_from_path", mock)
        return mock

    @pytest.fixture
    def temporary_state(self) -> Generator[None, None, None]:
        state._global_dependencies_state = None
        yield
        state._global_dependencies_state = None

    @pytest.fixture
    def dummy_dependencies(self) -> ProjectDependencies:
        return ProjectDependencies(module_imports={})

    def test_get_loaded_dependencies_empty(self, temporary_state: None) -> None:
        with pytest.raises(RuntimeError):
            state.get_loaded_dependencies()

    def test_store_dependencies(
        self, temporary_state: None, dummy_dependencies: ProjectDependencies
    ) -> None:
        state.store_dependencies(dummy_dependencies)
        assert state.get_loaded_dependencies() == dummy_dependencies

    def test_read_dependencies(
        self, dummy_parse_files_from_path: MagicMock, dummy_dependencies: ProjectDependencies
    ) -> None:
        path = Path("/tmp/dummy")
        state.read_dependencies_from_source_path(path)
        dummy_parse_files_from_path.assert_called_once_with(path)
        assert state.get_loaded_dependencies() == dummy_dependencies
