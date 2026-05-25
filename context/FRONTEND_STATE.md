# Frontend State

Updated: 2026-05-25

## Current Status

The frontend remains a React + TypeScript + Vite demo using mock data by default. P4 added a typed API client boundary for all implemented synthetic backend read APIs. P5-I1 added the first overview data loader contract for explicit API mode. P5-I2 wired DashboardPage to an overview state boundary while preserving mock defaults. P5-I3 added the Store Analysis data loader contract. P5-I4 wired StoreAnalysisPage to that boundary. P5-I5 added the Store Alerts data loader contract. P5-I6 wired StoreAlertsPage to that boundary. P5-I7 added the Customer Profile data loader contract. P5-I8 wired CustomerProfilePage to that boundary. P5-I9 added the Digital Twin data loader contract for heatmap and trajectory API data. P5-I10 wired DigitalTwinPage to that boundary.

Current frontend API files:

```text
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
frontend/src/api/overviewDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/api/storeAlertsDataLoader.ts
frontend/src/api/storeAlertsDataLoader.test.ts
frontend/src/api/customerProfileDataLoader.ts
frontend/src/api/customerProfileDataLoader.test.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/api/digitalTwinDataLoader.test.ts
frontend/src/pages/dashboardOverviewState.ts
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/storeAlertsState.ts
frontend/src/pages/customerProfileState.ts
frontend/src/pages/digitalTwinState.ts
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
loadStoreAnalysisData
mapApiStoreToDomain
loadStoreAlertsData
mapApiStoreAlertToDomain
loadCustomerProfileData
mapCustomerProfileDtoToDomain
loadDigitalTwinData
mapHeatmapPointDtoToDomain
mapTrajectoryFlowDtoToDomain
createInitialDashboardOverviewState
resolveDashboardOverviewState
createInitialStoreAnalysisDataState
resolveStoreAnalysisDataState
createInitialStoreAlertsDataState
resolveStoreAlertsDataState
createInitialCustomerProfileDataState
resolveCustomerProfileDataState
createInitialDigitalTwinDataState
resolveDigitalTwinDataState
```

## Test State

```text
npm --prefix frontend run test: 124 passed
npm run quality: passed in P5-I10
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

P5-I11 should review and close the CP5 frontend API-mode integration baseline. It must keep mock mode as the default and should document remaining gaps rather than adding new live backend behavior.
