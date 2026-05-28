# Project State

Updated: 2026-05-28

## Current Stage

Completed P0/P1/P2/P3, P4-I1 through P4-I16, P5-I1 through P5-I11, P6-I1, P6-I2, P6-R1, the P7 premium UI/UX preview checkpoint, P7-I1 through P7-I8, P8-I1, P8-I2, and the P7-R7 frontend repair track through workspace cleanup. The selected active frontend is now the clean Next.js Digital Twin OS.

The current project priority is now:

```text
build a polished, modern, demo-ready synthetic 3D mall digital twin before real video/data integrations
```

## Current Repository Baseline

```text
frontend/                              React + TypeScript + Next.js App Router frontend, mock/synthetic mode default
frontend/src/app/                      Active app routes, nested layout, loading/error boundaries, and digital-twin route tree
frontend/src/components/dashboard/     Enterprise operation panels for header, traffic, merchant grading, alerts, and time scrubber
frontend/src/components/twin-engine/   Hybrid WebGL/SVG digital twin viewport, WebGL fallback, shader scaffolds
frontend/src/lib/nav-graph.ts          NavGraph and A* pathing for non-direct flow routes
frontend/tests/                        URL state and NavGraph tests
frontend/src/api/                      Typed API client and mock/API-mode data loaders
backend/                               FastAPI synthetic API baseline
backend/app/fixtures/reference.py      P8-I2 deterministic synthetic store score formula and aggregate inputs
backend/app/db/metadata.py             SQLAlchemy Core MySQL metadata baseline
backend/migrations/                    Alembic offline migration baseline
ai-services/                           P6-I2 local AI service with synthetic fixtures
context/                               AI recovery package
```

## Implemented Baseline

```text
P4 backend synthetic /api/v1 read endpoints
P5 frontend API-mode loaders and state adapters, mock mode remains default
P6-I1 anonymous aggregate AI event schema and synthetic fixture boundary docs
P6-I2 ai-services/ with FastAPI, OpenCV HOG detector, synthetic video fixtures, event output, and 20 tests
P6-R1 roadmap/context reprioritization to premium synthetic 3D digital twin demo-first track
P7 premium UI/UX preview checkpoint: confirmed `/style-preview` premium light three-column cockpit and archived prompt/design rules
P7-I1 3D stack audit: documented BlenderMCP as a controlled local automation candidate and `three`/R3F/Drei as Web 3D candidates without installing them
P7-I2 premium `/digital-twin` cockpit productization: migrated the real route into the approved premium light shell while preserving SVG/2.5D FloorPlan and mock/API boundaries
P7-I3 minimal audited WebGL scene shell: installed `three@0.184.0`, `@react-three/fiber@9.6.1`, and `@types/three@0.184.1`; added a local synthetic floor/store block scene and kept SVG fallback/reference
P7-I4 through P7-I8: added typed scene adapter, GLB loading through approved Drei, labels, lighting, camera animation, hover/alert effects, OrbitControls, heatmap animation, score coloring, floor transition controls, and demo polish
P7-R2: inserted a GLB recovery increment after user feedback; verified Windows Blender 5.1.1 at `L:\\Software\\blender`, verified local blender-mcp 1.5.5 at `L:\\Software\\blender-mcp`, made GLB mode URL-preserved/default-diagnostic, and generated a richer self-authored F2 GLB with reproducible Blender source/export script
P8-I1 production preparation: added route-level lazy loading, React route error/loading fallback, historical Vite manual chunks, and reduced per-frame React state churn in the earlier 3D scene
P8-I2 store score MVP contract: refined the score response with synthetic aggregate inputs, formulaVersion, weights, deterministic score calculation, and frontend DTO coverage
P7-R7 frontend rebuild repair: saved `docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md` and `docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md`, removed the old Vite active UI path, and rebuilt the active frontend as a Next.js App Router Digital Twin OS with URL state, 2D/3D hybrid viewport, A* pathing tests, light architectural visual system, Framer Motion, Tailwind CSS, and Zustand
P7-R7c-6 workspace cleanup: froze the selected Next.js frontend, removed obsolete Vite/React Router files and lockfile records, removed active license-table entries for dependencies no longer present, and restored full type-check coverage for the current component tree
```

## New Product Priority

The next major deliverable is a high-quality 3D digital twin demo:

```text
self-authored synthetic mall model
modern 3D/WebGL presentation
virtual people and crowd-flow simulation
controls for people count, time, destination stores, dwell, entry/exit, congestion, and incidents
synthetic event seed/reset/append/generate workflow
MySQL-backed fake/demo data persistence
replay and presentation-ready demo controls
future real-data adapter boundary preserved but not implemented now
```

## Current Gaps

```text
full BlenderMCP server startup is not complete yet because WSL lacks `uv`/`uvx` and `mcp`/`supabase` Python dependencies for the local blender-mcp package
browser-level 3D rendering/performance tests are not implemented yet
the new P7-R8 five-floor GLB has not been generated yet; model work is intentionally deferred until explicit approval
SVG fallback remains available and should not be removed
backend uses synthetic fixtures, not persisted synthetic scenario/event generation
no real MySQL connection or migration execution
no browser E2E
no production deployment or Docker Compose startup
real video/data/material integration is deferred
```

## Boundaries

```text
MySQL remains the database direction
mock/synthetic mode remains default until explicitly changed
real mall floor plans, BIM/CAD, maps, brand logos, store logos, shop signs, monitoring footage, face images, personal data, and individual trajectories remain blocked
future 3D dependencies, assets, models, textures, fonts, icons, copied code, or external services require license/cost/account review before adoption
P7-R7 audited and recorded Next.js, Tailwind CSS, PostCSS, Framer Motion, and direct Zustand usage
```

## Next Target

Current next target is either explicit approval to start P7-R8 model generation or a narrow frontend/browser correction before modeling. P8-I3 backend score-readiness work remains deferred until the P7-R7/P7-R8 repair path is complete or explicitly reprioritized.
