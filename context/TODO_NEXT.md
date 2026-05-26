# TODO Next

Updated: 2026-05-26

## Task Card

```text
Increment: P8-I3 Store score ranking filters and synthetic score readiness
Primary role: Backend Mode
Auxiliary reviews: Design, Architect, QA, Security/License; P7-I1 was Architect Mode for the original 3D license/synthetic quality gate baseline
Human command: 请进行下一步
Status: ready; P7-R2 GLB recovery is closed and quality gates passed
```

## Goal

Extend the existing synthetic `GET /api/v1/stores/ranking` contract with narrow store score readiness filters if still needed, keep ranking derived from the P8-I2 deterministic score formula, add fixture-backed backend tests, and document persistence readiness without connecting real MySQL.

## Non-goals

```text
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, external asset APIs, downloaded models, external textures, or HDRIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, real shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not create deployment infrastructure
do not add dependencies unless separately audited and approved
keep mock/synthetic fixture mode; do not switch to real persistence
```

## Deliverables

```text
ranking filter contract decision for `GET /api/v1/stores/ranking`
backend implementation for approved narrow synthetic filters
fixture-backed backend tests for filtering, sorting, empty results, and boundary behavior
updated API/context/progress/test records for synthetic score readiness
root quality and audit results recorded
```

## Required Reading

```text
AGENTS.md
AGENT.md
README.md
AI_Schedule.md
PROGRESS.md
IMPORTANT.md
docs/API_CONTRACT.md
docs/DATA_MODEL.md
docs/MYSQL_READINESS_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/BACKEND_STATE.md
context/API_CONTRACT_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
backend/app/fixtures/reference.py
backend/app/routes/reference.py
backend/app/schemas/reference.py
backend/tests/test_reference_api.py
frontend/src/api/referenceClient.ts
```

## Why This Increment Exists

P8-I2 refined individual store score responses with deterministic synthetic aggregate inputs. P8-I3 should make the ranking endpoint ready for score-oriented analysis by adding only narrow synthetic filters and tests, while keeping real MySQL and production persistence deferred.

## P7-R2 Closure Baseline

```text
P7-R2 closed before this task card: verified `/mnt/l/Software/blender/blender.exe` as Blender 5.1.1, inspected local `/mnt/l/Software/blender-mcp` as blender-mcp 1.5.5, made `/digital-twin` GLB/procedural mode URL-preserved and diagnostic, generated a richer self-authored F2 GLB with `Store_S021` through `Store_S040`, and updated risk/license/context records.
P7-R2 verification passed: frontend lint, frontend tests 134 passed, frontend build passed, quality:docs/compliance/boundary passed, quality:audit found 0 vulnerabilities, and full `npm run quality` passed with backend pytest 35 passed.
Remaining P7-R2 gaps: manual browser/network verification was not run in this environment, and full BlenderMCP server startup still needs future local dependency setup because WSL lacks `uv`/`uvx` and Python `mcp`/`supabase`.
```

## Acceptance Checks

```text
ranking endpoint supports only approved narrow synthetic filters
ranking remains derived from deterministic P8-I2 score formula and fixture inputs
backend tests cover filter combinations, sorting stability, empty result shape, and invalid/boundary query values
OpenAPI/API docs stay consistent with implemented query params
no real MySQL, production data, real mall material, or external service is introduced
root quality and audit gates pass or blockers are recorded
```

## Human Confirmation Gates

```text
adding or changing database migrations
connecting real MySQL, credentials, production data, or live services
adding dependencies or external services
changing the score formula weights beyond the P8-I2 contract
using real mall material, real brands, real video, personal data, or individual trajectories
```

## Implementation Direction

```text
inspect existing P8-I2 store score formula fields and ranking endpoint behavior
prefer query filters that are already derivable from synthetic fixture fields, such as score level/category/floor/minScore/maxScore if compatible with current schema
avoid speculative filters that require new data sources or persistence
keep response envelope/list shape stable unless tests and docs are updated narrowly
update frontend API client types/tests only if query parameters need typed coverage
```

## Checks To Run

```bash
backend/.venv/bin/python -m pytest backend/tests
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

## Boundaries

```text
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, external asset APIs, downloaded models, external textures, or HDRIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, real shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not create deployment infrastructure
do not add dependencies unless separately audited and approved
keep mock/synthetic fixture mode; do not switch to real persistence
```

## After P8-I3 Passes

Recommend the next narrow increment from the updated roadmap/context, likely continuing synthetic score readiness or moving to the next documented P8/P9 task while preserving the real-data and licensing boundaries.
