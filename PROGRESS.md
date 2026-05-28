# Progress

Updated: 2026-05-28

## Current Snapshot

The selected frontend direction is the React + Next.js App Router Digital Twin OS on `main`. The temporary BlenderKit Mall Interior reference preview and the rejected five-floor GLB modeling attempt have been removed from the active frontend. `/digital-twin` now uses a stricter project-owned procedural Three/R3F mall shell with a 120m x 80m footprint, three above-ground floors, a pill-shaped central atrium, storefront facade bands, skylight framing, balustrades, and scene-graph naming that stays compatible with the existing SVG fallback and synthetic data overlays. The SVG fallback viewport now renders a detailed synthetic F1 floorplan with architectural mall layout: outer walls, capsule atrium, ring corridor, perimeter corridors, anchor stores at corners, inline stores along corridors, atrium-facing stores, escalators, elevators, restrooms, fire stairs, service rooms, entrances, and zone labels. The project remains synthetic/mock-only; real mall material, real video, personal data, real MySQL, deployment infrastructure, external 3D assets, and unapproved external asset APIs remain blocked.

The command bar now includes a 2D/3D viewport toggle. Clicking "2D" switches to the SVG floorplan view; clicking "3D" returns to the Three/R3F procedural shell. The viewport state is persisted in the URL (`viewport=2d|3d`) and the legacy `?svg=1` param is still supported as a fallback.

Current next decision: remap synthetic store/heat/flow overlays precisely onto the new F1 SVG floorplan base, or begin F2 floorplan work.

## Recent Increments

| Increment | Result | Verification |
| --- | --- | --- |
| P7-R8-V6 2D/3D viewport toggle | Added a `viewport` field (`'2d' | '3d'`) to `TwinUrlState` and a 2D/3D toggle button in the command bar. Clicking "2D" switches the viewport to the SVG floorplan; clicking "3D" returns to the Three/R3F shell. The viewport state is persisted in the URL query string. Legacy `?svg=1` is still parsed as `viewport=2d` for backward compatibility. Removed the `useSearchParams` hack from `HybridViewport`. | `npm --prefix frontend run lint`, `npm --prefix frontend run test` (86), `npm --prefix frontend run build` |
| P7-R8-V5 F1 synthetic SVG floorplan base | Replaced the simplified SVG fallback floor plate (rectangle + ellipse) with a detailed synthetic F1 SVG floorplan. The new `F1Floorplan` component renders an architectural mall leasing plan: outer walls with entrance gaps, capsule-shaped atrium with balustrade, ring corridor, perimeter corridors, cross-corridors, 21 store units (anchors at corners, inline along corridors, atrium-facing with curved facades, F&B at corridor junctions), escalator pairs, elevator core, restrooms, fire stairs, BOH/MEP service rooms, info desk, seating nodes, zone labels, scale bar, and north arrow. Store overlay and heatmap/flow overlays remain compatible in the same 0-100 coordinate system. | `npm --prefix frontend run lint`, `npm --prefix frontend run test` (84), `npm --prefix frontend run build`, `npm run quality:frontend`, `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, `npm run quality:audit` |
| P7-R8-V4 F1 synthetic 2D floorplan prompt archive | Added a reusable design-spec document for a large, detailed, vector-first, synthetic F1 mall floorplan prompt aimed at code/SVG generation rather than text-to-image posters. The prompt locks building archetype, atrium/circulation logic, facilities, store-shape variety, overlay compatibility, and legal boundaries against copying real mall plans. | `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary` |
| P7-R8-V3 constrained procedural mall shell polish | Replaced the flat placeholder Three scene with a project-owned parameterized mall shell driven by explicit physical constraints: 120m x 80m footprint, three above-ground floors, pill-shaped atrium void, structural columns, skylight frame, storefront facade strips, balustrades, escalator massing, and floor-mapped heat/flow overlays. Added a reusable procedural spec module and dedicated tests for floor mapping, atrium clearance, and storefront projection. | `npm --prefix frontend run lint`, `npm --prefix frontend run test`, `npm --prefix frontend run build`, `npm run quality:frontend`, `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary` |
| P7-R8-V2 external model removal and procedural rollback | Deleted the temporary BlenderKit reference GLB and related export/inspection scripts, removed the rejected five-floor GLB artifacts from the active workspace, and restored `ThreeTwinViewport` to the pre-modeling procedural scene without GLB/Draco loading. | Frontend checks to be rerun after this documentation update. |

## Milestone Summary

| Phase | Summary |
| --- | --- |
| P0-P3 | Requirements, design, quality-gate, CI/deployment planning, compliance baselines, and recovery context established. |
| P4-P5 | Synthetic FastAPI `/api/v1` read endpoints and explicit frontend API-mode loaders added while mock mode remains default. |
| P6 | Anonymous aggregate AI event schema and local synthetic OpenCV fixture service added; real video remains blocked. |
| P7 pre-rebuild | Earlier premium 3D demo path added audited Three/R3F/Drei and self-authored F2 GLB baseline. |
| P7-R7 | Rebuilt the active frontend as a clean Next.js Digital Twin OS with URL state, overview/floor/store workspaces, compact inspector panels, calm color system, and synthetic 2D/3D hybrid viewport. |
| P7-R8 | First self-authored five-floor ring mall GLB generated, then temporary BlenderKit Mall Interior reference preview integrated for visual review. Both were later removed after visual rejection; the active viewport is now a stricter project-owned procedural mall shell. V5 implemented the first detailed synthetic F1 SVG floorplan base with 21 store units, escalators, elevators, restrooms, fire stairs, and entrance markers, ready for overlay systems. |
| P8 | Store score MVP contract refined with deterministic synthetic aggregate inputs; backend score-readiness work is deferred. |

## Verification Snapshot

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 84 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit: high-severity threshold passed; 2 known moderate PostCSS advisories through Next remain
Active `/digital-twin` viewport: constrained procedural Three/R3F mall shell, no GLB/Draco/external model loading
SVG fallback viewport: detailed synthetic F1 floorplan with 21 store units, escalators, elevators, restrooms, fire stairs, service rooms, entrances
Archived F1 2D prompt/spec: `docs/design/P7_F1_SYNTHETIC_2D_FLOORPLAN_PROMPT.md`
```

Known blocker:

```text
npm run quality was attempted with a 180s timeout after P7-R7c-6; docs/compliance/boundary/frontend passed, then backend pytest stopped producing output at backend/tests/test_health.py until timeout exited with code 124.
```

## Next Handoff

Next recommended increment is to refine the F1 SVG floorplan store-overlay alignment (adjust store highlight positions and heat/flow coordinates to match the new architectural store unit boundaries), or begin implementing the F2 floorplan using the same architectural drafting approach.
