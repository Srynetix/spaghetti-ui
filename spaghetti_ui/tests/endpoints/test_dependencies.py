import pytest
from fastapi.testclient import TestClient
from spaghetti.models.module import Module
from spaghetti.models.project_dependencies import ProjectDependencies

from spaghetti_ui.state import store_dependencies


class TestDependencies:
    @pytest.fixture
    def prepare_dependencies(self) -> None:
        dependencies = ProjectDependencies(
            module_imports={Module("module.a"): {Module("module.b")}, Module("module.b"): set()}
        )
        store_dependencies(dependencies)

    async def test(self, prepare_dependencies: None, test_client: TestClient) -> None:
        response = test_client.get("/dependencies")
        assert response.json() == {"module.a": ["module.b"]}
