# Frontend State

Updated: 2026-05-28

## Current Status

The active frontend is a React + Next.js App Router Digital Twin OS under `frontend/src/app`. The old Vite/React Router product surface has been removed from the workspace and the frontend lockfile. Mock/synthetic data remains the default. After the P7-R8 visual rejection, the temporary BlenderKit reference preview and rejected five-floor GLB artifacts have been removed from the active workspace. The SVG fallback viewport now renders a detailed synthetic F1 floorplan (`F1Floorplan` component) with architectural mall layout, replacing the previous simplified rectangle+ellipse placeholder. The Three/R3F procedural mall shell remains the primary 3D viewport.

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
```

## Verification

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 84 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:audit: high-severity threshold passed; 2 moderate PostCSS advisories through Next remain
```

## Pending

```text
browser screenshot review at 1440px/1920px remains useful if Playwright/Chromium is available
future visual polish should continue from the current constrained procedural scene unless a new scoped self-authored model or Blender script spec is approved
F1 SVG floorplan is ready for overlay refinement: store highlight positions, heat/flow coordinates can be fine-tuned to match architectural store unit boundaries
F2/F3 floorplans can follow the same architectural drafting approach using F1Floorplan as template
```
