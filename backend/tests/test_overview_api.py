from fastapi.testclient import TestClient

from app.main import create_app


client = TestClient(create_app())


def test_overview_returns_documented_envelope() -> None:
    response = client.get("/api/v1/overview?mallId=mall_demo_001", headers={"X-Request-Id": "req_overview"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_overview"
    assert body["data"]["mallId"] == "mall_demo_001"
    assert body["data"]["source"] == "synthetic_fixture"
    assert {metric["id"] for metric in body["data"]["metrics"]} == {
        "current-occupancy",
        "today-traffic",
        "crowding-index",
        "open-alerts",
    }
    assert len(body["data"]["trafficTrend"]) == 3
    assert {floor["floorId"] for floor in body["data"]["floorSummaries"]} == {"floor_demo_l1", "floor_demo_l2"}
    assert body["data"]["inefficientStoreIds"] == ["store_demo_101"]
    assert body["data"]["alertIds"] == ["alert_demo_001", "alert_demo_002"]


def test_overview_requires_mall_id_query() -> None:
    response = client.get("/api/v1/overview", headers={"X-Request-Id": "req_overview_missing_query"})

    assert response.status_code == 422
    body = response.json()
    assert body["traceId"] == "req_overview_missing_query"
    assert body["error"]["code"] == "VALIDATION_ERROR"


def test_overview_unknown_mall_uses_error_envelope() -> None:
    response = client.get("/api/v1/overview?mallId=mall_missing", headers={"X-Request-Id": "req_overview_missing"})

    assert response.status_code == 404
    body = response.json()
    assert set(body) == {"error", "traceId", "timestamp"}
    assert body["traceId"] == "req_overview_missing"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_openapi_contains_overview_route() -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    assert "/api/v1/overview" in response.json()["paths"]
