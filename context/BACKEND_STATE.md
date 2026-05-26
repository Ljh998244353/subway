# Backend State

Updated: 2026-05-26

## Current Status

Implemented backend endpoints:

```text
GET /api/v1/health
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/ranking?mallId=mall_demo_001
GET /api/v1/alerts/stores?mallId=mall_demo_001
GET /api/v1/customer-profile?mallId=mall_demo_001
GET /api/v1/heatmap?mallId=mall_demo_001
GET /api/v1/trajectories?mallId=mall_demo_001
GET /api/v1/overview?mallId=mall_demo_001
```

The backend is currently a synthetic contract baseline. P5 frontend API-mode work used these contracts without backend changes. P6-I2 added a separate `ai-services/` synthetic AI service baseline, but backend ingestion from that service is not implemented. P8-I2 refined `GET /api/v1/stores/{storeId}/score` so the response is calculated from deterministic synthetic aggregate inputs and includes `source`, `formulaVersion`, `weights`, and `inputs`.

## P8 Store Score Direction

The current backend priority is the store score MVP track, starting with fixture-backed synthetic aggregate scoring before real persistence.

Future backend work should support:

```text
store score formulas with explicit versions
synthetic aggregate inputs that can later be produced from fake events
score/ranking consistency checks
future MySQL-backed fake/demo score persistence after schema/API approval
preserve later real-data adapter boundary
```

## Constraints

```text
MySQL is source of truth later
current read APIs use synthetic fixtures only
no real MySQL connection yet
no production credentials or .env
no real video
no real mall material
no face images
no personal trajectories
no sudo
```

## Deferred Backend Work

```text
real MySQL production query path
real AI event ingestion into backend
real video/camera adapter
real mall/BIM/floor-plan data ingestion
production deployment or Docker Compose
```

## Next Step

P8-I2 now has a deterministic synthetic score formula contract. The next backend increment should either extend score/ranking filters or define persistence/readiness for synthetic score aggregates, without connecting real MySQL until the readiness gate is approved.
