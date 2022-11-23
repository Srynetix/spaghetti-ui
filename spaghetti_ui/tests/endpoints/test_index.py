from fastapi.testclient import TestClient


class TestIndex:
    async def test(self, test_client: TestClient) -> None:
        response = test_client.get("/")
        assert response.status_code == 200
