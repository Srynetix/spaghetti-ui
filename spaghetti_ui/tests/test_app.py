from pathlib import Path
from typing import Any, cast
from unittest.mock import MagicMock

import pytest

from spaghetti_ui import state
from spaghetti_ui.app import startup_event


class TestApp:
    @pytest.fixture
    def environ(self, mocker: Any) -> None:
        env_vars = {"SPAGHETTI_SOURCE_PATH": "/tmp/dummy"}
        mocker.patch("os.environ", env_vars)

    @pytest.fixture
    def dummy_read_dependencies(self, mocker: Any) -> MagicMock:
        state_mock = MagicMock(spec=state)
        mocker.patch("spaghetti_ui.app.state", state_mock)
        return cast(MagicMock, state_mock.read_dependencies_from_source_path)

    async def test(self, environ: None, dummy_read_dependencies: MagicMock) -> None:
        await startup_event()

        dummy_read_dependencies.assert_called_with(Path("/tmp/dummy"))

    async def test_no_path(self) -> None:
        with pytest.raises(RuntimeError):
            await startup_event()
