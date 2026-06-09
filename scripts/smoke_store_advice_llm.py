from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from fastapi.testclient import TestClient

from app.main import create_app


def main() -> None:
    client = TestClient(create_app())
    payload = {
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
    response = client.post("/api/v1/advice/store-management", json=payload, headers={"X-Request-Id": "smoke_store_advice_llm"})
    body = response.json()
    data = body.get("data", {})
    llm = data.get("llm", {})
    summary = {
        "httpStatus": response.status_code,
        "traceId": body.get("traceId"),
        "status": data.get("status"),
        "source": data.get("source"),
        "llmEnabled": llm.get("enabled"),
        "llmConfigured": llm.get("configured"),
        "llmProvider": llm.get("provider"),
        "llmModel": llm.get("model"),
        "itemCount": len(data.get("items", [])),
        "firstAdviceTitle": (data.get("items") or [{}])[0].get("title"),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
