# Frontend State

Updated: 2026-05-20

## Current Status

The frontend remains a React + TypeScript + Vite demo using mock data by default. P4 added a typed API client boundary for all implemented synthetic backend read APIs. P5-I1 added the first overview data loader contract for explicit API mode.

Current frontend API files:

```text
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
frontend/src/api/overviewDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
```

Implemented frontend API boundary:

```text
resolveFrontendDataMode: defaults to mock unless explicitly api
resolveApiBaseUrl: configurable base URL normalization
createReferenceApiClient: typed wrapper for P4 reference APIs
getOverview
getStore
getStoreScore
getStoreFlow
getStoreRanking
listStoreAlerts
getCustomerProfile
getHeatmap
getTrajectories
ApiClientError
loadOverviewData
mapOverviewDtoToSnapshot
```

## Test State

```text
npm --prefix frontend run test: 84 passed
npm run quality: passed in P5-I1
```

## Constraints

```text
mock mode remains default
no real API call in tests
no real MySQL
no real video
no real mall material
no face images
no personal trajectories
no new dependency
```

## Next Step

P5-I2 should wire the dashboard page to the overview loader state boundary. It must keep mock mode as the default and should use mocked loader/fetch tests rather than live backend calls.
