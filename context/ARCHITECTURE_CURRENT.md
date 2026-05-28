# Architecture Current

Updated: 2026-05-27

## Current Architecture

```text
frontend: React + TypeScript + Next.js App Router Digital Twin OS
frontend data mode: mock by default, explicit API mode only
current digital twin: premium light /digital-twin workspace with hybrid Three/R3F viewport, SVG fallback, URL-driven state, and NavGraph/A* flow pathing
backend: FastAPI app
api: /api/v1 health and synthetic read endpoints
data model: MySQL baseline in docs/DATA_MODEL.md
migration: SQLAlchemy Core metadata + Alembic offline migration
ai-services: FastAPI local service with OpenCV HOG detector and synthetic fixtures
quality gate: root npm scripts + frontend tests + backend Pytest + ai-services Pytest
CI: GitHub Actions only
```

P4 built the synthetic backend API and typed frontend client contract. P5 wired explicit API mode across frontend pages while keeping mock mode as the default. P6-I1 documented anonymous aggregate AI events and synthetic fixture boundaries. P6-I2 created the local AI service baseline with synthetic fixtures. P6-R1 reprioritized the next architecture work toward a premium synthetic 3D digital twin demo. P7 completed the earlier premium `/digital-twin` WebGL demo path. P7-R7 then rolled back the unsatisfactory frontend attempt and rebuilt the active frontend as a clean Next.js App Router Digital Twin OS. P8-I2 refined the backend store score contract with deterministic synthetic aggregate scoring metadata while keeping the same endpoint and synthetic fixtures.

## Implemented API Layer

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

## Target Architecture For P7 Synthetic 3D Twin

```text
3D modeling pipeline uses free Blender as the confirmed mainline modeling tool, exporting project-authored GLB/GLTF assets when needed
frontend /digital-twin now uses the approved premium light Digital Twin OS layout under `frontend/src/app/digital-twin`
frontend production build uses Next.js with webpack because Turbopack/PostCSS attempted a sandbox-blocked internal port bind
3D boundary now starts under `frontend/src/components/twin-engine/`
URL search parameters are the durable source of truth for view, floor, store, mode, and flow scope
backend adds synthetic scenario/event generator APIs before real data adapters
MySQL stores synthetic demo scenarios, generated fake events, agent configs, heatmap snapshots, and replay frames
/api/v1 remains the API namespace for scenario controls and read models
real-data adapters stay behind a later boundary and must not replace synthetic demo mode by default
```

## Candidate 3D Module Boundary

P7-I1 should confirm the exact boundary before code is written. The expected direction is:

```text
frontend/src/types/index.ts                 domain and twin contracts
frontend/src/app/digital-twin/              nested layout, parallel viewport/sidebar slots, floor/store routes
frontend/src/components/twin-engine/        hybrid viewport, WebGL fallback, R3F scene, SVG fallback, shader scaffolds
frontend/src/components/dashboard/          enterprise operating panels
frontend/src/lib/twin-data.ts               synthetic floor/store/alert/heat data
frontend/src/lib/nav-graph.ts               corridor/store_gate NavGraph, A* pathing, CatmullRom smoothing
frontend/src/lib/url-state.ts               URL state parsing/serialization
frontend/src/hooks/use-url-state.ts         client URL mutation hook
frontend/src/store/twin-store.ts            transient client coordination only
```

## Deferred Architecture Work

```text
real RTSP/video ingestion
real monitoring footage processing
real MySQL production query path
real mall/BIM/CAD/floor-plan ingestion
real brand or tenant asset ingestion
production data adapters
Docker Compose and deployment infrastructure
```

## Next Architecture Work

Next architecture work is P7-R8 only after frontend approval: generate the self-authored five-floor ring mall GLB and integrate it through the existing hybrid viewport/fallback contract. P8-I3 backend score-readiness work remains deferred.
