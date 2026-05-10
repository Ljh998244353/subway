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
Responsive CSS checks for core demo layouts
```

It does not implement real APIs, real video, real mall maps, brand logos, backend services, AI services, or deployment infrastructure.

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
