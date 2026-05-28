# TODO Next

Updated: 2026-05-28

one task only

## Task Card

```text
Increment: P7-R8-V6 F1 SVG floorplan overlay alignment or F2 floorplan
Primary role: Frontend Mode
Auxiliary reviews: Design, QA
Human command: 请进行下一步
Status: ready
```

## Goal

Refine F1 SVG floorplan overlay alignment (adjust store highlight rectangles and heatmap/flow coordinates to match the new architectural store unit positions), or begin implementing F2 floorplan using the same architectural drafting approach.

## Deliverables

```text
one task: either refine F1 overlay alignment or create F2 floorplan
no GLB/model/texture/HDRI/image download
preserve SVG fallback and synthetic data contracts
```

## Non-goals

```text
do not reintroduce BlenderKit or another external 3D model
do not create or load GLB assets without a new scoped spec
do not connect real MySQL or production data
do not use real floor plans, BIM/CAD, maps, brands/logos, video, face images, personal data, or individual trajectories
do not create deployment infrastructure
do not add dependencies, images, external services, paid services, textures, HDRIs, or model assets without a new audit
do not copy any identifiable real mall layout even if public examples are consulted for planning logic
```

## Minimum Working Set

```text
PROGRESS.md
IMPORTANT.md
context/TODO_NEXT.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
docs/design/P7_F1_SYNTHETIC_2D_FLOORPLAN_PROMPT.md
frontend/src/components/twin-engine/F1Floorplan.tsx
frontend/src/components/twin-engine/SvgFallbackViewport.tsx
frontend/src/lib/twin-data.ts
frontend/src/lib/nav-graph.ts
frontend/tests/digitalTwinNavigation.test.ts
```

## Acceptance Checks

```text
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
npm run quality:frontend
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit
```

## Human Confirmation Gates

```text
new dependencies/images/external services
external model, texture, HDRI, BlenderKit asset, real mall material, or real brand/logos
switching from procedural scene to generated/exported GLB
switching from synthetic fixture to real MySQL query
real data/material access, real AI service, or production deployment
```

## Next Handoff

```text
Recommended next command: 请进行下一步
```
