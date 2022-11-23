import pytest
from fastapi.testclient import TestClient

from spaghetti_ui.app import app


@pytest.fixture
def test_client() -> TestClient:
    return TestClient(app)
