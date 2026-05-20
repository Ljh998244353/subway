from fastapi.testclient import TestClient

from app.main import create_app


client = TestClient(create_app())


def test_health_returns_documented_envelope() -> None:
    response = client.get("/api/v1/health", headers={"X-Request-Id": "req_test_001"})

    assert response.status_code == 200
    assert response.headers["X-Request-Id"] == "req_test_001"

    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_test_001"
    assert body["data"]["status"] == "ok"
    assert body["data"]["service"] == "mall-vision-backend"
    assert body["data"]["database"] == {
        "status": "not_configured",
        "dialect": "mysql",
        "migrationVersion": None,
    }
    assert body["data"]["redis"] == {
        "status": "not_configured",
        "dialect": None,
        "migrationVersion": None,
    }


def test_health_generates_trace_id_when_absent() -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    body = response.json()
    assert body["traceId"].startswith("req_")
    assert response.headers["X-Request-Id"] == body["traceId"]


def test_not_found_uses_error_envelope() -> None:
    response = client.get("/api/v1/unknown", headers={"X-Request-Id": "req_missing_route"})

    assert response.status_code == 404
    body = response.json()
    assert set(body) == {"error", "traceId", "timestamp"}
    assert body["traceId"] == "req_missing_route"
    assert body["error"]["code"] == "NOT_FOUND"
    assert body["error"]["details"] == {}


def test_openapi_contains_health_route_and_schema() -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    schema = response.json()
    assert "/api/v1/health" in schema["paths"]
    assert schema["info"]["title"] == "Mall Vision AI Backend"
