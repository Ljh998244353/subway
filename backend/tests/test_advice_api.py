import json
from pathlib import Path

from fastapi.testclient import TestClient

from app.core.config import get_llm_settings
from app.main import create_app
from app.services import store_advice

client = TestClient(create_app())


def advice_payload() -> dict:
    return {
        "mallId": "mall_demo_001",
        "mode": "score",
        "scenarioDensity": "surge",
        "incidentLevel": 2,
        "stores": [
            {
                "storeId": "S901",
                "name": "Synthetic Low Score Store",
                "floorId": "F1",
                "category": "Retail",
                "grade": "C-",
                "score": 55,
                "liveOccupancy": 16,
                "entryRate": 12,
                "avgDwellTime": 8,
                "hasWarning": True,
                "warningText": "Synthetic warning only",
            }
        ],
        "alerts": [
            {
                "alertId": "EVT-901",
                "storeId": "S901",
                "floorId": "F1",
                "level": "critical",
                "summary": "Synthetic alert",
                "isResolved": False,
            }
        ],
        "aggregates": {"source": "synthetic_fixture"},
    }


def test_store_management_advice_returns_rule_fallback_when_llm_disabled(monkeypatch) -> None:
    monkeypatch.setenv("LLM_ENABLED", "false")
    monkeypatch.delenv("LLM_API_KEY", raising=False)

    response = client.post("/api/v1/advice/store-management", json=advice_payload(), headers={"X-Request-Id": "req_advice_disabled"})

    assert response.status_code == 200
    body = response.json()
    assert body["traceId"] == "req_advice_disabled"
    data = body["data"]
    assert data["status"] == "disabled"
    assert data["source"] == "rule"
    assert data["llm"]["enabled"] is False
    assert data["items"][0]["source"] == "rule"
    assert {item["category"] for item in data["items"]} >= {"alert", "conversion", "traffic", "dwell"}
    serialized = json.dumps(data["items"]).lower()
    for blocked in ("face_id", "member_id", "phone", "person_id", "track_id", "trajectory_id", "raw_frame", "video_url", "image_url", "order_id", "payment_id"):
        assert blocked not in serialized


def test_store_management_advice_rejects_blocked_real_data_fields() -> None:
    payload = advice_payload()
    payload["aggregates"] = {"phone": "13800000000"}

    response = client.post("/api/v1/advice/store-management", json=payload, headers={"X-Request-Id": "req_advice_blocked"})

    assert response.status_code == 422
    body = response.json()
    assert body["traceId"] == "req_advice_blocked"
    assert body["error"]["code"] == "BLOCKED_ADVICE_INPUT"
    assert body["error"]["details"] == {"blockedKeys": ["phone"]}


def test_store_management_advice_uses_mocked_llm_when_configured(monkeypatch) -> None:
    monkeypatch.setenv("LLM_ENABLED", "true")
    monkeypatch.setenv("LLM_BASE_URL", "https://llm.test/v1")
    monkeypatch.setenv("LLM_API_KEY", "test-key")
    monkeypatch.setenv("LLM_MODEL", "test-model")

    def fake_post(settings, payload):
        assert settings.api_key == "test-key"
        assert payload["model"] == "test-model"
        assert "Do not invent real data sources" in payload["messages"][0]["content"]
        return json.dumps(
            {
                "items": [
                    {
                        "id": "adv_llm_S901",
                        "storeId": "S901",
                        "priority": "high",
                        "category": "conversion",
                        "title": "LLM enhanced synthetic advice",
                        "reason": "Based on synthetic aggregate score only.",
                        "actions": ["Review conversion display"],
                        "expectedImpact": "Improve synthetic conversion signal.",
                        "evidence": ["score=55"],
                        "source": "llm",
                    }
                ]
            }
        )

    monkeypatch.setattr(store_advice, "_post_chat_completion", fake_post)
    response = client.post("/api/v1/advice/store-management", json=advice_payload())

    assert response.status_code == 200
    data = response.json()["data"]
    assert data["status"] == "llm"
    assert data["source"] == "llm"
    assert data["llm"]["configured"] is True
    assert data["items"] == [
        {
            "id": "adv_llm_S901",
            "storeId": "S901",
            "priority": "high",
            "category": "conversion",
            "title": "LLM enhanced synthetic advice",
            "reason": "Based on synthetic aggregate score only.",
            "actions": ["Review conversion display"],
            "expectedImpact": "Improve synthetic conversion signal.",
            "evidence": ["score=55"],
            "source": "llm",
        }
    ]


def test_store_management_advice_falls_back_when_llm_returns_invalid_json(monkeypatch) -> None:
    monkeypatch.setenv("LLM_ENABLED", "true")
    monkeypatch.setenv("LLM_BASE_URL", "https://llm.test/v1")
    monkeypatch.setenv("LLM_API_KEY", "test-key")
    monkeypatch.setenv("LLM_MODEL", "test-model")
    monkeypatch.setattr(store_advice, "_post_chat_completion", lambda settings, payload: "not json")

    response = client.post("/api/v1/advice/store-management", json=advice_payload())

    assert response.status_code == 200
    data = response.json()["data"]
    assert data["status"] == "fallback"
    assert data["source"] == "rule"
    assert data["items"][0]["source"] == "rule"


def test_openapi_contains_store_management_advice_route() -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    assert "/api/v1/advice/store-management" in response.json()["paths"]


def test_llm_settings_can_read_local_env_file(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.delenv("LLM_ENABLED", raising=False)
    monkeypatch.delenv("LLM_BASE_URL", raising=False)
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    monkeypatch.delenv("LLM_MODEL", raising=False)
    env_file = tmp_path / ".env"
    env_file.write_text(
        "LLM_PROVIDER=openai_compatible\n"
        "LLM_BASE_URL=http://127.0.0.1:8001/v1\n"
        "LLM_API_KEY=test-key\n"
        "LLM_MODEL=local-gpt\n"
        "LLM_ENABLED=true\n",
        encoding="utf-8",
    )

    settings = get_llm_settings(env_file)

    assert settings.enabled is True
    assert settings.is_configured is True
    assert settings.base_url == "http://127.0.0.1:8001/v1"
    assert settings.model == "local-gpt"

