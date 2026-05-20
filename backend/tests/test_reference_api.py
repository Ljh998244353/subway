from fastapi.testclient import TestClient

from app.main import create_app


client = TestClient(create_app())


def test_list_malls_returns_fixture_contract() -> None:
    response = client.get("/api/v1/malls", headers={"X-Request-Id": "req_malls"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "page", "traceId", "timestamp"}
    assert body["traceId"] == "req_malls"
    assert body["page"] == {"page": 1, "pageSize": 1, "total": 1, "hasNext": False}
    assert body["data"][0] == {
        "mallId": "mall_demo_001",
        "name": "Demo Mall",
        "timezone": "Asia/Shanghai",
        "businessHours": {"open": "10:00", "close": "22:00"},
    }


def test_list_floors_for_mall_returns_fixture_contract() -> None:
    response = client.get("/api/v1/malls/mall_demo_001/floors", headers={"X-Request-Id": "req_floors"})

    assert response.status_code == 200
    body = response.json()
    assert body["traceId"] == "req_floors"
    assert body["page"]["total"] == 2
    assert {floor["floorId"] for floor in body["data"]} == {"floor_demo_l1", "floor_demo_l2"}
    assert all(floor["mallId"] == "mall_demo_001" for floor in body["data"])


def test_list_stores_for_floor_returns_fixture_contract() -> None:
    response = client.get("/api/v1/floors/floor_demo_l1/stores", headers={"X-Request-Id": "req_stores"})

    assert response.status_code == 200
    body = response.json()
    assert body["traceId"] == "req_stores"
    assert body["page"] == {"page": 1, "pageSize": 2, "total": 2, "hasNext": False}
    assert {store["storeId"] for store in body["data"]} == {"store_demo_001", "store_demo_002"}
    assert body["data"][0]["bbox"] == {"x": 120.0, "y": 80.0, "width": 90.0, "height": 60.0}


def test_get_store_detail_returns_fixture_contract() -> None:
    response = client.get("/api/v1/stores/store_demo_101", headers={"X-Request-Id": "req_store_detail"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_store_detail"
    assert body["data"] == {
        "storeId": "store_demo_101",
        "mallId": "mall_demo_001",
        "floorId": "floor_demo_l2",
        "categoryId": "cat_lifestyle",
        "name": "Fictional Store 101",
        "unitCode": "L2-101",
        "areaSqm": 156.0,
        "status": "renovating",
        "bbox": {"x": 160.0, "y": 120.0, "width": 120.0, "height": 70.0},
    }


def test_get_store_score_returns_fixture_contract() -> None:
    response = client.get("/api/v1/stores/store_demo_101/score", headers={"X-Request-Id": "req_store_score"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_store_score"
    assert body["data"] == {
        "storeId": "store_demo_101",
        "date": "2026-05-19",
        "score": 52.8,
        "grade": "D",
        "breakdown": {
            "flow": 58.0,
            "conversion": 45.0,
            "dwell": 49.0,
            "trend": 51.0,
            "profileFit": 56.0,
            "penalty": 8.0,
        },
        "explanations": [
            "Synthetic score: renovation status applies an operational penalty",
            "Conversion and dwell indicators are below the fixture baseline",
        ],
    }


def test_get_store_flow_returns_fixture_contract() -> None:
    response = client.get("/api/v1/stores/store_demo_101/flow", headers={"X-Request-Id": "req_store_flow"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_store_flow"
    assert body["data"] == {
        "storeId": "store_demo_101",
        "granularity": "hour",
        "points": [
            {
                "timestamp": "2026-05-19T10:00:00Z",
                "exposureTraffic": 134,
                "enterCount": 18,
                "conversionRate": 0.134,
            },
            {
                "timestamp": "2026-05-19T11:00:00Z",
                "exposureTraffic": 142,
                "enterCount": 20,
                "conversionRate": 0.141,
            },
            {
                "timestamp": "2026-05-19T12:00:00Z",
                "exposureTraffic": 156,
                "enterCount": 22,
                "conversionRate": 0.141,
            },
        ],
    }


def test_list_store_ranking_returns_fixture_contract() -> None:
    response = client.get("/api/v1/stores/ranking?mallId=mall_demo_001", headers={"X-Request-Id": "req_store_ranking"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "page", "traceId", "timestamp"}
    assert body["traceId"] == "req_store_ranking"
    assert body["page"] == {"page": 1, "pageSize": 3, "total": 3, "hasNext": False}
    assert body["data"] == [
        {
            "rank": 1,
            "storeId": "store_demo_001",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l1",
            "categoryId": "cat_fashion",
            "name": "Fictional Store 001",
            "score": 86.4,
            "grade": "A",
        },
        {
            "rank": 2,
            "storeId": "store_demo_002",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l1",
            "categoryId": "cat_food",
            "name": "Fictional Store 002",
            "score": 74.2,
            "grade": "B",
        },
        {
            "rank": 3,
            "storeId": "store_demo_101",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l2",
            "categoryId": "cat_lifestyle",
            "name": "Fictional Store 101",
            "score": 52.8,
            "grade": "D",
        },
    ]


def test_list_store_alerts_returns_fixture_contract() -> None:
    response = client.get("/api/v1/alerts/stores?mallId=mall_demo_001", headers={"X-Request-Id": "req_store_alerts"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "page", "traceId", "timestamp"}
    assert body["traceId"] == "req_store_alerts"
    assert body["page"] == {"page": 1, "pageSize": 3, "total": 3, "hasNext": False}
    assert body["data"] == [
        {
            "alertId": "alert_demo_001",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l1",
            "storeId": "store_demo_002",
            "type": "LOW_CONVERSION_HIGH_FLOW",
            "severity": "warning",
            "status": "open",
            "detectedAt": "2026-05-19T01:30:00Z",
            "summary": "Synthetic alert: high passing flow with below-median conversion",
            "evidence": {
                "flowIndex": 91.0,
                "conversionRate": 0.12,
                "categoryMedianConversionRate": 0.21,
            },
        },
        {
            "alertId": "alert_demo_002",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l2",
            "storeId": "store_demo_101",
            "type": "LOW_SCORE",
            "severity": "critical",
            "status": "in_progress",
            "detectedAt": "2026-05-19T02:00:00Z",
            "summary": "Synthetic alert: store score remains below operational threshold",
            "evidence": {
                "flowIndex": 58.0,
                "conversionRate": 0.09,
                "categoryMedianConversionRate": 0.2,
            },
        },
        {
            "alertId": "alert_demo_003",
            "mallId": "mall_demo_001",
            "floorId": "floor_demo_l1",
            "storeId": None,
            "type": "CROWDING",
            "severity": "info",
            "status": "resolved",
            "detectedAt": "2026-05-19T02:15:00Z",
            "summary": "Synthetic alert: floor-level crowding signal returned to normal range",
            "evidence": {
                "flowIndex": 76.0,
                "conversionRate": 0.0,
                "categoryMedianConversionRate": 0.0,
            },
        },
    ]


def test_get_customer_profile_returns_anonymous_aggregate_contract() -> None:
    response = client.get("/api/v1/customer-profile?mallId=mall_demo_001", headers={"X-Request-Id": "req_customer_profile"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_customer_profile"
    assert body["data"] == {
        "mallId": "mall_demo_001",
        "generatedAt": "2026-05-19T02:30:00Z",
        "source": "synthetic_fixture",
        "activeTimeRange": "14:00-17:00",
        "primaryFloorId": "floor_demo_l2",
        "topCategories": ["cat_food", "cat_fashion", "cat_lifestyle"],
        "revisitTendency": 0.62,
        "timeDistribution": [
            {"hour": 10, "traffic": 520, "share": 0.18},
            {"hour": 11, "traffic": 680, "share": 0.24},
            {"hour": 12, "traffic": 740, "share": 0.26},
            {"hour": 13, "traffic": 620, "share": 0.22},
            {"hour": 14, "traffic": 300, "share": 0.1},
        ],
        "floorPreferences": [
            {"floorId": "floor_demo_l1", "trafficShare": 0.56, "dwellShare": 0.48},
            {"floorId": "floor_demo_l2", "trafficShare": 0.44, "dwellShare": 0.52},
        ],
        "categoryPreferences": [
            {"category": "cat_food", "trafficShare": 0.34, "dwellShare": 0.31, "conversionRate": 0.27},
            {"category": "cat_fashion", "trafficShare": 0.28, "dwellShare": 0.26, "conversionRate": 0.22},
            {"category": "cat_lifestyle", "trafficShare": 0.19, "dwellShare": 0.24, "conversionRate": 0.18},
        ],
        "privacyNote": "Synthetic aggregate only. No face images, member IDs, phone numbers, or individual trajectories are included.",
    }
    serialized = str(body["data"]).lower()
    assert "member" in serialized
    assert "phone" in serialized
    assert "trajectories" in serialized
    assert "face" in serialized


def test_get_heatmap_returns_aggregate_fixture_contract() -> None:
    response = client.get("/api/v1/heatmap?mallId=mall_demo_001", headers={"X-Request-Id": "req_heatmap"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_heatmap"
    assert body["data"] == {
        "mallId": "mall_demo_001",
        "generatedAt": "2026-05-19T02:45:00Z",
        "source": "synthetic_fixture",
        "granularity": "15m",
        "points": [
            {"pointId": "heat_demo_l1_001", "floorId": "floor_demo_l1", "x": 120.0, "y": 160.0, "intensity": 0.42},
            {"pointId": "heat_demo_l1_002", "floorId": "floor_demo_l1", "x": 360.0, "y": 220.0, "intensity": 0.68},
            {"pointId": "heat_demo_l1_003", "floorId": "floor_demo_l1", "x": 780.0, "y": 520.0, "intensity": 0.57},
            {"pointId": "heat_demo_l2_001", "floorId": "floor_demo_l2", "x": 180.0, "y": 180.0, "intensity": 0.34},
            {"pointId": "heat_demo_l2_002", "floorId": "floor_demo_l2", "x": 540.0, "y": 360.0, "intensity": 0.81},
            {"pointId": "heat_demo_l2_003", "floorId": "floor_demo_l2", "x": 930.0, "y": 600.0, "intensity": 0.49},
        ],
    }
    floor_bounds = {
        "floor_demo_l1": {"width": 1200, "height": 800},
        "floor_demo_l2": {"width": 1200, "height": 800},
    }
    for point in body["data"]["points"]:
        bounds = floor_bounds[point["floorId"]]
        assert 0 <= point["x"] <= bounds["width"]
        assert 0 <= point["y"] <= bounds["height"]
        assert 0 <= point["intensity"] <= 1


def test_get_trajectories_returns_anonymous_aggregate_contract() -> None:
    response = client.get("/api/v1/trajectories?mallId=mall_demo_001", headers={"X-Request-Id": "req_trajectories"})

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"data", "traceId", "timestamp"}
    assert body["traceId"] == "req_trajectories"
    assert body["data"] == {
        "mallId": "mall_demo_001",
        "generatedAt": "2026-05-19T03:00:00Z",
        "source": "synthetic_fixture",
        "aggregation": "floor_flow_edges_15m",
        "flows": [
            {
                "flowId": "traj_demo_l1_001",
                "floorId": "floor_demo_l1",
                "fromPoint": {"x": 80.0, "y": 120.0},
                "toPoint": {"x": 420.0, "y": 260.0},
                "traffic": 360,
                "direction": "inbound",
            },
            {
                "flowId": "traj_demo_l1_002",
                "floorId": "floor_demo_l1",
                "fromPoint": {"x": 420.0, "y": 260.0},
                "toPoint": {"x": 880.0, "y": 560.0},
                "traffic": 285,
                "direction": "cross",
            },
            {
                "flowId": "traj_demo_l2_001",
                "floorId": "floor_demo_l2",
                "fromPoint": {"x": 120.0, "y": 160.0},
                "toPoint": {"x": 560.0, "y": 360.0},
                "traffic": 310,
                "direction": "inbound",
            },
            {
                "flowId": "traj_demo_l2_002",
                "floorId": "floor_demo_l2",
                "fromPoint": {"x": 560.0, "y": 360.0},
                "toPoint": {"x": 980.0, "y": 620.0},
                "traffic": 245,
                "direction": "outbound",
            },
        ],
    }
    floor_bounds = {
        "floor_demo_l1": {"width": 1200, "height": 800},
        "floor_demo_l2": {"width": 1200, "height": 800},
    }
    for flow in body["data"]["flows"]:
        bounds = floor_bounds[flow["floorId"]]
        for key in ("fromPoint", "toPoint"):
            assert 0 <= flow[key]["x"] <= bounds["width"]
            assert 0 <= flow[key]["y"] <= bounds["height"]
        assert flow["traffic"] > 0
        assert flow["direction"] in {"inbound", "outbound", "cross"}


def test_unknown_mall_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/malls/mall_missing/floors", headers={"X-Request-Id": "req_missing_mall"})

    assert response.status_code == 404
    body = response.json()
    assert set(body) == {"error", "traceId", "timestamp"}
    assert body["traceId"] == "req_missing_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_mall_ranking_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/stores/ranking?mallId=mall_missing", headers={"X-Request-Id": "req_missing_ranking_mall"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_ranking_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_mall_store_alerts_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/alerts/stores?mallId=mall_missing", headers={"X-Request-Id": "req_missing_alerts_mall"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_alerts_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_mall_customer_profile_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/customer-profile?mallId=mall_missing", headers={"X-Request-Id": "req_missing_profile_mall"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_profile_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_mall_heatmap_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/heatmap?mallId=mall_missing", headers={"X-Request-Id": "req_missing_heatmap_mall"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_heatmap_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_mall_trajectories_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/trajectories?mallId=mall_missing", headers={"X-Request-Id": "req_missing_trajectories_mall"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_trajectories_mall"
    assert body["error"] == {
        "code": "MALL_NOT_FOUND",
        "message": "Mall not found",
        "details": {"mallId": "mall_missing"},
    }


def test_unknown_floor_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/floors/floor_missing/stores", headers={"X-Request-Id": "req_missing_floor"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_floor"
    assert body["error"] == {
        "code": "FLOOR_NOT_FOUND",
        "message": "Floor not found",
        "details": {"floorId": "floor_missing"},
    }


def test_unknown_store_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/stores/store_missing", headers={"X-Request-Id": "req_missing_store"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_store"
    assert body["error"] == {
        "code": "STORE_NOT_FOUND",
        "message": "Store not found",
        "details": {"storeId": "store_missing"},
    }


def test_unknown_store_score_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/stores/store_missing/score", headers={"X-Request-Id": "req_missing_store_score"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_store_score"
    assert body["error"] == {
        "code": "STORE_NOT_FOUND",
        "message": "Store not found",
        "details": {"storeId": "store_missing"},
    }


def test_unknown_store_flow_uses_specific_error_envelope() -> None:
    response = client.get("/api/v1/stores/store_missing/flow", headers={"X-Request-Id": "req_missing_store_flow"})

    assert response.status_code == 404
    body = response.json()
    assert body["traceId"] == "req_missing_store_flow"
    assert body["error"] == {
        "code": "STORE_NOT_FOUND",
        "message": "Store not found",
        "details": {"storeId": "store_missing"},
    }


def test_openapi_contains_reference_routes() -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/api/v1/malls" in paths
    assert "/api/v1/malls/{mall_id}/floors" in paths
    assert "/api/v1/floors/{floor_id}/stores" in paths
    assert "/api/v1/alerts/stores" in paths
    assert "/api/v1/customer-profile" in paths
    assert "/api/v1/heatmap" in paths
    assert "/api/v1/trajectories" in paths
    assert "/api/v1/stores/ranking" in paths
    assert "/api/v1/stores/{store_id}" in paths
    assert "/api/v1/stores/{store_id}/score" in paths
    assert "/api/v1/stores/{store_id}/flow" in paths
