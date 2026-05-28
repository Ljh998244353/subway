# Mall Vision AI Frontend

Frontend workspace for the commercial mall visual AI digital twin system.

## Scope

Current active scope is P7-R7: a clean React + Next.js App Router Digital Twin OS frontend rebuilt after rolling back the previous unsatisfactory attempt.

```text
Next.js App Router under src/app
/ redirects to /digital-twin
enterprise light Digital Twin OS layout
GlobalHeader, TrafficAnalyticsSidebar, MerchantGradingBoard, ActionableAlertStream, TimeScrubber
URL-driven state for view, floorId, storeId, mode, and flowScope
Zustand for transient client coordination only
Three/R3F hybrid viewport with SVG fallback
NavGraph + A* pathing and CatmullRom smoothing
shader scaffolds for flow particles and heatmap rendering
synthetic data only
```

It does not implement real APIs, real video, real mall maps, brand logos, backend services, AI services, or deployment infrastructure.

The older Vite/React Router product surface has been removed from the current workspace. The default demo remains mock/synthetic mode, and tests inject client/fetch or loader implementations instead of calling a live backend.

## Visual Context

The current UI follows the saved frontend specification in `../docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md`: light architectural white-model surfaces, restrained glass panels, dense but readable operating metrics, URL-driven state, and smooth Framer Motion transitions. It does not add icon packs, font files, images, videos, external design assets, or paid services.

## Mock Data

```text
src/types/domain.ts
src/mock/mockMall.ts
src/mock/mockFloors.ts
src/mock/mockStores.ts
src/mock/mockAlerts.ts
src/mock/mockOverview.ts
src/mock/mockCustomerProfile.ts
src/mock/mockData.test.ts
src/lib/twin-data.ts
src/lib/nav-graph.ts
```

All mock names, coordinates, metrics, alerts, and profile data are fictional and intended only for the demo.

## Commands

```bash
npm install
npm run lint
npm run test
npm run build
npm run dev
```

If any command asks for `sudo` or system package installation, stop and let the human execute that step.

## Demo Paths

Recommended presentation entry points:

```text
/digital-twin?view=overview&floorId=F2&mode=heatmap
/digital-twin?view=floor&floorId=F3&mode=alerts
/digital-twin?view=store&floorId=F2&storeId=S042&mode=flow&flowScope=inbound
```

For the current rebuild and model handoff, see `../docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md` and `../docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md`.
