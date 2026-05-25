# Backend State

Updated: 2026-05-25

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

The backend is currently a synthetic contract baseline. P5 frontend API-mode work used these contracts without backend changes. P6-I2 added a separate `ai-services/` synthetic AI service baseline, but backend ingestion from that service is not implemented.

## P7 Backend Direction

The next backend-related priority is no longer generic AI service expansion. It is synthetic demo data persistence and scenario generation for the premium 3D digital twin.

Future backend work should support:

```text
synthetic scenario seed/reset/generate
append fake events for demo scenarios
read synthetic 3D scene layout data
read replay frames, heatmap snapshots, flow snapshots, and agent-count aggregates
persist fake/demo data to MySQL after schema/API design is approved
keep demo controls clearly synthetic and disable-able
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

P7-I1 is architecture/dependency planning and should not require backend code changes. P7-I3 should later define the synthetic scenario/event persistence contract before migrations or API implementation.
