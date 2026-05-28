# Frontend State

Updated: 2026-05-28

## Current Status

The active frontend is a React + Next.js App Router Digital Twin OS under `frontend/src/app`. The old Vite/React Router product surface has been removed from the workspace and the frontend lockfile. Mock/synthetic data remains the default.

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
URL-driven view/floor/store/mode/flowScope state
NavGraph + A* corridor routing for non-direct flow paths
Three/R3F viewport with SVG fallback boundary
synthetic data only
```

## Dependency Notes

```text
Next.js 16.2.6, Tailwind CSS 4.3.0, Framer Motion, Zustand, Three.js/R3F/Drei
next build uses --webpack because Turbopack/PostCSS attempted a sandbox-blocked internal port bind
Vite and React Router are no longer active frontend dependencies
```

## Verification

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 81 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:audit: high-severity threshold passed; 2 moderate PostCSS advisories through Next remain
```

## Pending

```text
P7-R8 model generation remains deferred until explicit approval
browser screenshot review at 1440px/1920px remains useful if Playwright/Chromium is available
```
