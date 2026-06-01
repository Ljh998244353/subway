# TODO Next

Updated: 2026-06-01

one task only

## Task Card

```text
Increment: P10-I1 post-P9 roadmap and hardening triage
Primary role: Product/Architecture Mode
Auxiliary reviews: Frontend, Backend, Data, Security/License, QA
Human command: 自动继续
Status: parked until post-P9 direction
```

## Goal

Define the first post-P9 direction only after the completed P9 synthetic analytics boundary is accepted.

## Deliverables

```text
one task: choose and document the P10 roadmap slice before implementing new runtime, backend, data-model, deployment, or asset work
```

## Non-goals

```text
do not reintroduce BlenderKit or another external 3D model
do not download any model/texture/HDRI/image or call external generation APIs
do not connect real MySQL or production data
do not use real floor plans, BIM/CAD, maps, brands/logos, video, face images, personal data, or individual trajectories
do not create deployment infrastructure
do not add dependencies, images, external services, paid services, textures, HDRIs, or model assets without a new audit
do not copy any identifiable real mall layout even if public examples are consulted for planning logic
do not create backend scenario APIs
do not create MySQL tables, migrations, or persistence yet
do not make the GLB the default active viewport
```

## Minimum Working Set

```text
PROGRESS.md
IMPORTANT.md
context/TODO_NEXT.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
docs/BLENDER_MCP_WSL_SETUP.md
docs/STORE_SCORE_MVP.md
context/API_CONTRACT_CURRENT.md
context/BACKEND_STATE.md
context/DATA_MODEL_CURRENT.md
frontend/src/components/dashboard/
frontend/src/lib/twin-data.ts
frontend/src/mock/
frontend/tests/
frontend/src/components/dashboard/MerchantGradingBoard.tsx
docs/SYNTHETIC_FIXTURE_VALIDATION.md
backend/app/db/metadata.py
backend/app/fixtures/reference.py
backend/tests/
docs/STORE_SCORE_MVP.md
context/API_CONTRACT_CURRENT.md
context/BACKEND_STATE.md
context/DATA_MODEL_CURRENT.md
```

## Acceptance Checks

```text
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit
```

## BlenderMCP Preconditions

```text
not required unless the review identifies Blender model changes
```

## Human Confirmation Gates

```text
new dependencies/images/external services
external model, texture, HDRI, BlenderKit asset, real mall material, or real brand/logos
switching from synthetic fixture to real MySQL query
real data/material access, real AI service, or production deployment
```

## Next Handoff

```text
Recommended next command: choose P10-I1 direction after P9 completion
```
