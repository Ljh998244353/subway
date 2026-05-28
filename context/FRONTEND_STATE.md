# Frontend State

Updated: 2026-05-28

## Current Status

P7-R7 rebuilt the active frontend as a React + Next.js App Router Digital Twin OS under `frontend/src/app`. The previous Vite/React Router UI has now been removed from the current workspace and from the frontend lockfile. Mock/synthetic data remains the default, and no real mall material, real video, personal data, external model, texture, image, icon pack, paid service, or real MySQL connection is introduced.

The first human review fix improved Chinese typography clarity without adding font files or external services: `globals.css` now prioritizes local CJK fonts before Latin fonts, enables antialiasing/geometric text rendering, and the merchant ranking board reserves clearer columns/gaps for Chinese names.

P7-R7b fixed the next human review issue: `/digital-twin` now has visible multi-level drilldown and information layering. The overview page shows only coarse global status and entry points, floor routes expose detailed floor workspaces, store routes expose store management workspaces, and the viewport overlay is now an actionable navigation surface. The implementation still uses synthetic fixtures only.

After browser feedback, floor and store routes now use a dedicated full-screen detail shell rather than rendering inside the homepage three-column cockpit. This keeps a consistent header/theme but removes the homepage traffic/ranking sidebars from detail pages.

P7-R7c started the workspace optimization requested by the user. The local plan is recorded in `docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md`. Phase 1 replaced the large-overlay cockpit shell with a spatially separated workspace: `TwinCommandBar`, `ViewportStage`, and `InspectorRail` now separate command controls, the model safe area, right-side analysis, and the bottom timeline. The overview overlay was reduced to small telemetry chips so the model is no longer covered by large absolute-positioned cards.

P7-R7c-2 completed the first de-carding pass. The global, floor, and store right-side panels now use compact inspector sections, metric rows, row lists, and small status pills. `ActionableAlertStream` is now an event queue style section instead of nested rounded cards with heavy shadows. The new `InspectorPrimitives.tsx` keeps the pattern consistent without adding dependencies.

P7-R7c-3 completed the calm color system pass. `globals.css` now defines lower-saturation workspace tokens, the global and viewport grid contrast is reduced, command/status controls use calmer blue/teal accents, heatmap/flow shader colors are less neon, and red/amber are kept for semantic risk/warning states. No dependency, asset, data, or route contract changed.

P7-R7c-4 completed the context-aware store workspace. `/digital-twin/store/[storeId]` no longer defaults to a large model surface; it renders a data-first store workspace with score bars, operating metrics, decision notes, and a compact SVG location preview with links back to the floor/model view. Overview and floor routes remain spatial/model-first.

P7-R7c-5 completed the browser-review stabilization increment. Because the local environment had no installed Chromium/Playwright runtime, the review used the current Next production service at `http://127.0.0.1:3002` plus HTTP/HTML checks. `/` now returns an HTTP `307 Temporary Redirect` to `/digital-twin`; `/digital-twin`, `/digital-twin/F2?mode=flow&flowScope=inbound`, and `/digital-twin/store/S045?mode=score&flowScope=outbound` all returned the expected overview/floor/store workspace structures. The old three-column rounded loading skeletons were replaced with workspace-aligned loading states, and the `digital-twin/loading.tsx` parallel-route slot was made neutral so viewport and inspector slots do not nest a full workspace skeleton.

P7-R7c-6 froze the selected frontend direction and cleaned the obsolete frontend surface. `frontend/package-lock.json` was regenerated from the Next-only `package.json`, Vite/React Router records were removed from the active dependency/license tables, and `frontend/tsconfig.json` now type-checks the current Next component tree instead of excluding the old Vite directories.

Current active implementation:

```text
frontend/src/app/layout.tsx
frontend/src/app/page.tsx
frontend/src/app/digital-twin/layout.tsx
frontend/src/app/digital-twin/page.tsx
frontend/src/app/digital-twin/@sidebar/default.tsx
frontend/src/app/digital-twin/@viewport/default.tsx
frontend/src/app/digital-twin/[floorId]/page.tsx
frontend/src/app/digital-twin/store/[storeId]/page.tsx
frontend/src/components/dashboard/
frontend/src/components/twin-engine/
frontend/src/hooks/
frontend/src/store/
frontend/src/lib/
frontend/tests/twinUrlState.test.ts
frontend/tests/navGraph.test.ts
frontend/tests/digitalTwinTypography.test.ts
frontend/tests/digitalTwinNavigation.test.ts
```

Key features:

```text
/ redirects to /digital-twin
HTTP-level Next redirect from / to /digital-twin
enterprise light Digital Twin OS layout
workspace command bar and model safe-area stage
right-side inspector rail with independent scrolling
constrained bottom timeline safe area
workspace-aligned root loading skeleton and neutral parallel-route loading skeleton
compact inspector sections, metric rows, status pills, and event rows
calmer low-saturation semantic color tokens and reduced grid contrast
store routes use a data-first workspace with compact location preview rather than a large default model
GlobalHeader, TrafficAnalyticsSidebar, MerchantGradingBoard, ActionableAlertStream, TimeScrubber
URL-driven state for view/floorId/storeId/mode/flowScope
path-aware App Router hrefs for `/digital-twin`, `/digital-twin/[floorId]`, and `/digital-twin/store/[storeId]`
visible breadcrumbs, return paths, level titles, floor switching, mode switching, and store shortcuts
level-specific sidebars for global operations, floor analysis, and store decisions
actionable viewport overlay with 3D/SVG fallback status
responsive layout that avoids fixed three-column squeezing below wide desktop
dedicated full-screen floor/store detail layout separate from the overview cockpit
operation feedback states for alert dispatch and leasing simulation actions
Zustand only for transient client UI state
NavGraph + A* pathing with corridor/store_gate topology
Three/R3F viewport with SVG fallback boundary
shader strings for flow particles and SDF heatmap
Tailwind v4 PostCSS pipeline and Framer Motion interaction layer
Chinese typography stack and ranking-board layout regression coverage
```

## Dependency Notes

```text
next@16.2.6 retained per user decision
framer-motion installed for motion variants and interactive panels
zustand installed for lightweight client state coordination
tailwindcss@4.3.0, @tailwindcss/postcss, and postcss installed for utility styling
next build uses `--webpack` because Turbopack/PostCSS attempted an internal port bind blocked by the sandbox
```

## Verification

```text
npm --prefix frontend run lint: passed
npm --prefix frontend run test: passed, 77 tests
npm --prefix frontend run build: passed using Next webpack build
npm --prefix frontend run lint: passed after the dedicated detail-layout update
npm run quality:frontend: passed
npm run quality:audit: passed with high-severity threshold; npm reports 2 moderate PostCSS advisories through Next
npm --prefix frontend run lint: passed after P7-R7c-5
npm --prefix frontend run test: passed, 81 tests
npm --prefix frontend run build: passed using Next webpack build
npm run quality:frontend: passed after P7-R7c-5
npm run quality:audit: passed with high-severity threshold after network approval; npm reports 2 moderate PostCSS advisories through Next
npm --prefix frontend run lint: passed after P7-R7c-6 workspace cleanup
```

Pending:

```text
P7-R8 model generation remains deferred until explicit approval
manual visual screenshot review at 1440px and 1920px remains useful if a browser/Playwright runtime is available
```

## P7-R8 Gate

Do not start Blender modeling until the P7-R7 frontend is reviewed. The modeling spec is saved at `docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md`.
