# Architecture Current

Updated: 2026-05-25

## Current Architecture

```text
frontend: React + TypeScript + Vite demo
backend: FastAPI app
api: /api/v1 health and synthetic read endpoints
data model: MySQL baseline in docs/DATA_MODEL.md
migration: SQLAlchemy Core metadata + Alembic offline migration
quality gate: root npm scripts + backend Pytest
CI: GitHub Actions only
```

P4-I4 through P4-I15 built the synthetic backend API and typed frontend client contract. P4-I16 added CP4 closure review and MySQL readiness planning. P5-I1 added the overview data loader contract for explicit API mode. P5-I2 wired DashboardPage to the overview loader state boundary. P5-I3 added the Store Analysis loader contract. P5-I4 wired StoreAnalysisPage to that boundary. P5-I5 added the Store Alerts loader contract. P5-I6 wired StoreAlertsPage to that boundary. P5-I7 added the Customer Profile loader contract. P5-I8 wired CustomerProfilePage to that boundary. P5-I9 added the Digital Twin loader contract. Real MySQL, Redis, AI service, external services, and Docker Compose remain out of scope unless explicitly confirmed.

## Implemented API Layer

```text
/api/v1/health
/api/v1/malls
/api/v1/malls/{mallId}/floors
/api/v1/floors/{floorId}/stores
/api/v1/stores/{storeId}
/api/v1/stores/{storeId}/score
/api/v1/stores/{storeId}/flow
/api/v1/stores/ranking?mallId=mall_demo_001
/api/v1/alerts/stores?mallId=mall_demo_001
/api/v1/customer-profile?mallId=mall_demo_001
/api/v1/heatmap?mallId=mall_demo_001
/api/v1/trajectories?mallId=mall_demo_001
/api/v1/overview?mallId=mall_demo_001
```

## Next Architecture Work

P5-I10 wires DigitalTwinPage to the Digital Twin loader state boundary. Mock mode remains the default and the API path should use the existing synthetic backend contract.
