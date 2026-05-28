# P7-R7 Enterprise Next Digital Twin Frontend Specification

Updated: 2026-05-27

## Mission

Rebuild the frontend from the restored Vite baseline into an enterprise-grade React + Next.js Digital Twin OS. The implementation must preserve the approved light architectural visual direction while increasing usable data density and interaction quality. Do not reuse the previous simplified Next.js cockpit.

## Framework Decision

```text
Use Next.js as the active frontend architecture.
Keep the installed/current Next major acceptable; do not force a downgrade only to match a prompt version.
Use App Router, nested layouts, loading/error boundaries, and URL-driven state.
Use Tailwind CSS v4-style utility architecture, Framer Motion for motion, and Zustand for lightweight client coordination.
```

## Hard Boundaries

```text
No TODO comments or placeholder implementation stubs.
No real mall floor plans, BIM/CAD, maps, brands, tenant logos, shop signs, videos, face images, or personal trajectories.
No downloaded models, textures, HDRI, images, or icon packs.
No paid services or external asset APIs.
No final Blender/P7-R8 model generation in this frontend increment.
```

## Required Application Shape

Active routes must be under `frontend/src/app/`:

```text
src/app/layout.tsx
src/app/loading.tsx
src/app/error.tsx
src/app/page.tsx
src/app/digital-twin/layout.tsx
src/app/digital-twin/page.tsx
src/app/digital-twin/loading.tsx
src/app/digital-twin/@sidebar/default.tsx
src/app/digital-twin/@sidebar/[floorId]/page.tsx
src/app/digital-twin/@sidebar/store/[storeId]/page.tsx
src/app/digital-twin/@viewport/default.tsx
src/app/digital-twin/@viewport/[floorId]/page.tsx
```

Support modules:

```text
src/components/ui/
src/components/dashboard/
src/components/twin-engine/
src/hooks/use-url-state.ts
src/hooks/use-smooth-interpolator.ts
src/store/twin-store.ts
src/types/index.ts
src/lib/
```

## Visual Contract

Use a refined light theme:

```text
Global Bg: #F4F6F9
Surface Base: #FFFFFF
Surface Glass: rgba(255,255,255,0.75)
Text Primary: #111827
Text Muted: #6B7280
Brand Tech Blue: #2F54EB
Flow Cyan: #13C2C2
Alert Warning: #FAAD14
Alert Critical: #FF4D4F
```

Cards and floating panels:

```text
border border-white/40
shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]
rounded-2xl
backdrop-blur-xl for floating controls
```

Avoid empty hero-page aesthetics. The page must feel like a high-density operational console, closer to Grafana / Stripe Dashboard / Vercel Console than a marketing landing page.

## Required UX Composition

`/digital-twin` must render:

```text
GlobalHeader
TrafficAnalyticsSidebar
MerchantGradingBoard
HybridViewport
Dynamic Sidebar via parallel route
ActionableAlertStream
TimeScrubber
```

The system must provide entry and return flows without relying on the old global left nav.

## URL State

`useUrlState` is the only source of truth for:

```text
view=overview|floor|store
floorId=B1|F1|F2|F3|F4
storeId=S001..S105
mode=heatmap|flow|alerts|score
flowScope=inbound|outbound
```

All clicks that select floor/store/mode/flow scope must update URL state.

## Motion Requirements

Create and export:

```text
sidebarVariants
containerVariants
itemVariants
springTickConfig
```

Use Framer Motion for:

```text
segmented active-tab slider
sidebar enter/exit
staggered alert/feed lists
metric updates
skeleton cross-fade
dispatch confirmation layout morph
```

## Twin Engine Requirements

Implement a client-side hybrid viewport:

```text
WebGL/R3F view first
SVG fallback when WebGL fails or context is lost
URL-synced selected floor/store/mode
2D and 3D selection must stay synchronized
```

Implement:

```text
NavGraph nodes and edges
A* pathfinding
CatmullRomCurve3 smoothing with centripetal curve type
Flow particle shader material scaffold with GLSL strings
Heatmap shader material scaffold with GLSL strings
SVG fallback floor plan with heat/flow overlays
```

Paths must never be a direct start-to-end line through stores, atrium, or core walls.

## Required Business Components

```text
GlobalHeader
TrafficAnalyticsSidebar
ConversionFunnel
MerchantGradingBoard
ActionableAlertStream
TimeScrubber
```

All business components must be fully typed and use synthetic data. Do not use real brand names; use fictional merchant names.

## Acceptance

```text
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
npm run quality:frontend
npm run quality:audit
```

Manual review:

```text
1440px and 1920px no text overlap
/ redirects to /digital-twin
/digital-twin is the first useful product page
high density but not cluttered
2D/3D state sync works through URL
WebGL fallback remains useful
no unaudited external asset or real data
```

## P7-R7c Workspace Optimization Plan

Updated: 2026-05-28

The next stabilization track changes the frontend from a card-stacked dashboard into a Digital Twin workspace. The model or floor view is the primary surface, while metrics, alerts, and store analysis become contextual layers. The plan is intentionally split into reviewable checkpoints.

### Reference Direction

```text
Azure Digital Twins Explorer: graph/model view separated from properties and query panels.
Bentley iTwin Viewer: lightweight markers, decorators, and tooltips over the model instead of large permanent overlays.
Autodesk Tandem / industrial twin tools: task-specific panels, heatmaps, saved views, and properties panels instead of one dashboard layout for every detail route.
```

### Phase 1: Layout Architecture and Spatial Segregation

```text
Goal: release the model viewport from large absolute overlays and establish a professional command-bar + viewport + inspector workspace.
Implementation:
- Make DigitalTwinShell a fixed h-screen workspace with a 56px command bar.
- Add TwinCommandBar for breadcrumbs, floor switching, mode switching, and environment status.
- Add ViewportStage to own the model safe area, background grid, and timeline clearance.
- Add InspectorRail to isolate right-side analysis with its own scroll context.
- Move TimeScrubber into a bottom safe area with a constrained width.
- Keep overview, floor, and store route contracts unchanged.
Acceptance:
- At 1440px the model core is not covered by large cards.
- At 1920px the model has a stable primary canvas and inspector does not fight with viewport controls.
- No dependency, model, texture, real data, or Blender work is added.
```

### Phase 2: De-Carding and Flexible Information Surfaces

```text
Goal: reduce dashboard-card visual weight and improve data density.
Implementation:
- Replace repeated rounded-2xl shadow cards with inspector sections, row layouts, dividers, and small status chips.
- Convert global, floor, and store sidebars into compact inspector content.
- Keep cards only for actions that require a framed decision surface.
- Use inline metrics with tabular numbers instead of isolated metric blocks.
- Keep 3D model annotations lightweight; show details on hover or focus rather than as permanent panels.
Acceptance:
- Large card count and heavy shadows are visibly reduced.
- Inspector reads as a professional properties panel, not a marketing dashboard.
```

### Phase 3: Calm Color System and Semantic Coloring

```text
Goal: reduce color temperature so the model, heatmap, flow, and true alerts carry visual priority.
Implementation:
- Tune globals.css variables toward cooler low-chroma neutrals.
- Reduce grid/background contrast.
- Reserve blue for selected state and navigation, cyan for flow/WebGL status, red/yellow only for real risk levels.
- Remove excessive rings, bright fills, and decorative gradients.
Acceptance:
- Squint test: only model hot zones, selected state, and real alerts stand out.
- UI remains readable and polished but recedes behind the workspace content.
```

### Phase 4: Context-Aware Page Archetypes

```text
Goal: stop forcing every detail route to show a large model.
Implementation:
- Global overview keeps the model/fallback viewport as the main stage with minimal overlay telemetry.
- Floor workspace keeps split spatial analysis: model or 2D floor surface plus floor inspector.
- Store workspace becomes data-first: score breakdown, funnel, alerts, suggestions, and a small location preview instead of a large model by default.
- Preserve URL state and App Router paths.
Acceptance:
- Store route is clearly a business analysis workspace with lightweight spatial context.
- Floor route remains spatially oriented.
```

### Phase 5: Motion Polish and Regression Guard

```text
Goal: make motion explain hierarchy without causing layout reflow or visual noise.
Implementation:
- Use Framer Motion tween transitions under 250ms.
- Avoid bounce, elastic, width, height, top, left, margin, or padding animations.
- Use layoutId for command-bar active indicators.
- Use AnimatePresence fade + small x-offset for inspector content changes.
- Extend layout regression tests for command bar, viewport safe area, inspector, timeline, and store page archetype.
Acceptance:
- Mode and route transitions feel calm and do not cause visible layout jumping.
- lint, test, build, quality:frontend, and quality:audit pass.
```

### Optional Visual Regression Gate

```text
Only add Playwright or similar tools after human confirmation.
If approved, cover 1440x900, 1920x1080, and 390x844 screenshots for overview, floor, and store routes.
Any new dependency must be recorded in license and third-party notices before use.
```
