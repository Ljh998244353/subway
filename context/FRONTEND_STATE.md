# Frontend State

Updated: 2026-06-01

## Current Status

The active frontend is a React + Next.js App Router Digital Twin OS under `frontend/src/app`. The old Vite/React Router product surface has been removed from the workspace and the frontend lockfile. Mock/synthetic data remains the default. After the P7-R8 visual rejection, the temporary BlenderKit reference preview and rejected five-floor GLB artifacts have been removed from the active workspace. The SVG fallback viewport now renders a detailed synthetic F1 floorplan (`F1Floorplan` component) with architectural mall layout, replacing the previous simplified rectangle+ellipse placeholder. The Three/R3F procedural mall shell remains the default 3D viewport. The self-authored review artifact at `frontend/public/models/mall_exploded_three_layer_prototype.glb` is now loaded only behind explicit URL state `model=prototype`; default state remains `model=procedural`.

## Active Surface

```text
/ redirects to /digital-twin
/digital-twin = spatial overview workspace
/digital-twin/[floorId] = model-first floor workspace
/digital-twin/store/[storeId] = data-first store workspace with compact location preview
```

Core implementation:

```text
frontend/src/app/
frontend/src/components/dashboard/
frontend/src/components/twin-engine/
frontend/src/hooks/use-url-state.ts
frontend/src/lib/url-state.ts
frontend/src/lib/nav-graph.ts
frontend/src/lib/twin-data.ts
frontend/src/store/twin-store.ts
frontend/tests/
```

## Design And Behavior Baseline

```text
light enterprise Digital Twin OS
command bar + model safe-area stage + inspector rail + constrained timeline
compact inspector sections, rows, status pills, and event queue pattern
calm low-saturation semantic color tokens
Chinese-friendly system font stack
URL-driven view/floor/store/mode/flowScope/viewport state with 2D/3D toggle
URL-driven model source state with `model=procedural|prototype`; prototype is review-only and not default
frontend-only synthetic scenario controls for density, replay speed, and incident intensity
URL-restorable synthetic scenario params: `density`, `speed`, and `incident`
3D scenario behavior: density scales heat emphasis, replay speed scales flow particle pacing, incident intensity scales alert emphasis, and the viewport exposes a compact synthetic scenario readout
2D SVG scenario behavior: density scales synthetic heat circles, replay speed adjusts flow stroke pacing/weight, incident intensity marks the selected-store alert point, and the fallback viewport exposes a compact readout
NavGraph + A* corridor routing for non-direct flow paths
Three/R3F viewport now uses a stricter project-owned procedural mall shell: 120m x 80m footprint, 3 above-ground floors, pill-shaped central atrium, structural column grid, storefront facade bands, skylight frame, balustrades, heatmap shader, flow particles, and OrbitControls
Hybrid viewport still keeps the SVG fallback boundary
synthetic data only
archived F1 2D floorplan prompt/spec now lives at `docs/design/P7_F1_SYNTHETIC_2D_FLOORPLAN_PROMPT.md`
```

## Dependency Notes

```text
Next.js 16.2.6, Tailwind CSS 4.3.0, Framer Motion, Zustand, Three.js/R3F/Drei
next build uses --webpack because Turbopack/PostCSS attempted a sandbox-blocked internal port bind
Vite and React Router are no longer active frontend dependencies
P7-R8 rejected artifacts removed from active workspace: `frontend/public/models/blenderkit_mall_reference.glb`, `frontend/public/models/mall_digital_twin.glb`, `assets/blender/mall_digital_twin.blend`, `frontend/public/draco-gltf/`, and related BlenderKit/five-floor export scripts
Earlier self-authored F2 baseline remains present as historical asset: `frontend/public/models/mall_floor_f2.glb`, `assets/blender/mall_floor_f2.blend`, `scripts/blender/export_mall_floor_f2.py`
Self-authored review-only prototype: `frontend/public/models/mall_exploded_three_layer_prototype.glb`, source `assets/blender/mall_exploded_three_layer_prototype.blend`, preview `assets/blender/mall_exploded_three_layer_preview0001.png`; restored to separated three-slab layout with escalator enhancement only; integrated into runtime only as explicit GLB review mode
```

## Verification

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 84 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:audit: high-severity threshold passed; 2 moderate PostCSS advisories through Next remain
P7-R8-V9: direct TypeScript check passed via local package entry; frontend tests passed 87 tests; docs/compliance/boundary/audit gates passed.
P7-R8-V10: standard `npm --prefix frontend run lint`, `npm --prefix frontend run test`, and `npm --prefix frontend run build` passed after local dependency repair. Runtime HTTP checks returned 200 for default `/digital-twin`, `/digital-twin?viewport=2d`, `/digital-twin?model=prototype&viewport=3d`, and the GLB asset.
P7-R8-V11: prototype GLB review path now has a Canvas loading state, explicit review artifact label, and synthetic/no-external-textures diagnostic footer. Standard lint/test/build and docs/compliance/boundary/audit gates passed.
P7-R8-V12: timeline now includes frontend-only synthetic scenario controls for crowd density, replay speed, and incident intensity. These are transient client controls only and do not persist to backend or MySQL.
P7-R8-V13: scenario controls now visibly affect procedural 3D heat/flow/alert emphasis and appear in both procedural and review-only GLB viewport readouts. Standard lint/test/build and docs/compliance/boundary/audit gates passed.
P7-R8-V14: SVG fallback mode now mirrors the synthetic scenario story with density-scaled heat, replay-speed flow styling, incident-intensity alert emphasis, and a compact 2D readout. Standard lint/test/build and docs/compliance/boundary/audit gates passed.
P7-R8-V15: local HTTP runtime smoke checks covered default, 2D heat/flow/alerts, procedural 3D heat/flow/alerts, explicit GLB review mode, and the self-authored GLB asset; all returned 200 after the default route warmed.
P7-R8-V16: scenario controls now round-trip through URL params (`density`, `speed`, `incident`) and hydrate the client store from URL state. Standard lint/test/build and docs/compliance/boundary/audit gates passed.
P7-R8-V17: runtime smoke checks confirmed representative URL-restorable scenario links return 200 for 2D, procedural 3D, prototype, invalid fallback, and store-level paths.
P7-R8-V18: command bar now includes a compact wide-screen scenario link affordance for copying or opening the current URL-restorable synthetic scene. Standard lint/test/build and docs/compliance/boundary/audit gates passed.
P7-R8-V19: local runtime smoke check confirmed a scenario URL response contains the copy/open affordance labels plus density/speed/incident markers.
P8-I4: merchant score board now has compact frontend-only filters for floor, category, grade, and minimum score, aligned with the P8-I3 ranking query dimensions for future API-mode wiring.
P8-I5: local runtime smoke confirmed `/digital-twin?mode=score` response includes the score-board title and all four filter labels.
P9-I1: overview cockpit now includes `AnalyticsSnapshotPanel`, a compact synthetic aggregate panel combining customer profile, heatmap, trajectory flow, and score signals.
P9-I2: local runtime smoke confirmed `/digital-twin` response includes P9 analytics snapshot and privacy markers.
P9-I3: analytics snapshot is mode-aware for heatmap, flow, score, and alerts using only existing synthetic aggregates.
P9-I4: local runtime smoke confirmed heatmap/flow/score/alerts URLs return the expected mode-specific analytics insight labels.
P9-I5: analytics snapshot now includes a replay context row driven by the current scrubber minute, scenario speed, and scenario density from the frontend twin store.
P9-I6: local runtime smoke confirmed `/digital-twin` response includes replay context markers (`鍥炴斁涓婁笅鏂嘸, `14:30`, `1x`, `peak`) plus the analytics snapshot title.
P9-I7: P9 is closed with a readiness review. The frontend analytics layer is complete for the synthetic MVP boundary, and no backend scenario API, replay API, real data source, or persistence layer was added.`nP10-I1: overview and store workspaces now include `StoreManagementAdvicePanel`, backed by deterministic `generateStoreManagementAdvice` rules over existing synthetic store, alert, URL mode, density, and incident state. The panel labels current output as rule advice and shows the LLM as not enabled.
```

## Pending

```text
browser screenshot review at 1440px/1920px remains pending because the in-app Browser plugin cache is missing its browser client script
future visual polish should continue from the current constrained procedural scene unless a new scoped self-authored model or Blender script spec is approved
review the new three-layer exploded mall prototype before deciding whether to replace or augment the procedural Three/R3F shell
prototype review mode is now explicit enough for runtime review, but should remain non-default until visual screenshot review is possible
P10 advice UI needs a runtime smoke pass; real LLM output is not shown unless backend/.env is configured and a backend/API-mode path is explicitly enabled later
F1 SVG floorplan is ready for overlay refinement: store highlight positions, heat/flow coordinates can be fine-tuned to match architectural store unit boundaries
F2/F3 floorplans can follow the same architectural drafting approach using F1Floorplan as template
```
