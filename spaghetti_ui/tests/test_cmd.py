from typing import Any
from unittest.mock import MagicMock

import pytest
from click.testing import CliRunner

from spaghetti_ui.cmd import run


class TestCmd:
    @pytest.fixture
    def run_patch(self, mocker: Any) -> MagicMock:
        run_patch = MagicMock()
        mocker.patch("uvicorn.run", run_patch)
        return run_patch

    def test_run(self, run_patch: MagicMock) -> None:
        runner = CliRunner()
        result = runner.invoke(run, ["/tmp/dummy"])
        assert result.exit_code == 0
        run_patch.assert_called()
