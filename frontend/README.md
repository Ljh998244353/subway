# Mall Vision AI Frontend

Frontend workspace for the commercial mall visual AI digital twin system.

## Scope

Current P2 scope provides:

```text
React + TypeScript + Vite project skeleton
5 core routes
AppShell with Topbar, Sidebar, and content area
CSS token entry based on docs/design/DESIGN_TOKENS.md
Node built-in smoke tests for route state helpers
Shared TypeScript domain types
Synthetic mock mall, floors, stores, alerts, overview, twin, and customer profile data
Node built-in data boundary tests for mock data quality
Business pages for /dashboard, /store-analysis, /store-alerts, and /digital-twin
Customer profile page for anonymous aggregate time, floor, and category preferences
Digital twin SVG floor plan with heatmap, flow, alert, and score modes
Shared demo flow helpers and Node checks for cross-page query preservation
CP2 demo readiness checks for five core routes, presentation paths, and privacy boundaries
Responsive CSS checks for core demo layouts
CP2 visual refinement with local CSS, OKLCH tokens, self-drawn SVG, and no paid assets
Minimal premium full-site refinement with audited Motion animations
P5-I1 overview data loader contract with mock/API mode selection and offline tests
P5-I2 DashboardPage overview state wiring with mock fallback and offline tests
P5-I3 Store Analysis data loader contract with mock/API mode selection and offline tests
P5-I4 StoreAnalysisPage state wiring with mock fallback and offline tests
P5-I5 Store Alerts data loader contract with mock/API mode selection and offline tests
P5-I6 StoreAlertsPage state wiring with mock fallback and offline tests
P5-I7 Customer Profile data loader contract with mock/API mode selection and offline tests
P5-I8 CustomerProfilePage state wiring with mock fallback and offline tests
P5-I9 Digital Twin data loader contract with mock/API mode selection and offline tests
```

It does not implement real APIs, real video, real mall maps, brand logos, backend services, AI services, or deployment infrastructure.

P5-I1 added the frontend loader boundary for explicit API mode. P5-I2 wired DashboardPage to that boundary. P5-I3 added the Store Analysis loader boundary. P5-I4 wired StoreAnalysisPage to that boundary. P5-I5 added the Store Alerts loader boundary. P5-I6 wired StoreAlertsPage to that boundary. P5-I7 added the Customer Profile loader boundary. P5-I8 wired CustomerProfilePage to that boundary. P5-I9 added the Digital Twin loader boundary for heatmap and trajectory data. The default demo remains mock mode, and tests inject client/fetch or loader implementations instead of calling a live backend.

## Visual Context

The current UI has a product-workbench design context in `../PRODUCT.md` and `../DESIGN.md`. The CP2 visual refinement uses local React/CSS, system font fallbacks, OKLCH tokens, self-drawn SVG geometry, and the audited MIT `motion` package for restrained page and panel transitions. It does not add icon packs, font files, images, videos, external design assets, or paid services.

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

## CP2 Demo Paths

Recommended presentation entry points:

```text
/dashboard?mallId=M_DEMO&timeRange=today
/digital-twin?mallId=M_DEMO&timeRange=today&floorId=F2&mode=heatmap
/store-analysis?mallId=M_DEMO&timeRange=today&storeId=S008
/store-alerts?mallId=M_DEMO&timeRange=today&alertId=A0002
/customer-profile?mallId=M_DEMO&timeRange=30d
```

For the full CP2 handoff checklist, see `../docs/FRONTEND_DEMO_HANDOFF.md`.
