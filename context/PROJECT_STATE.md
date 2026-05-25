# Project State

Updated: 2026-05-25

## Current Stage

Completed P0/P1/P2/P3, P4-I1 through P4-I16, and P5-I1 through P5-I11.

The repository currently has:

```text
frontend/
frontend/src/api/
frontend/src/api/overviewDataLoader.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAlertsDataLoader.ts
frontend/src/api/customerProfileDataLoader.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/pages/dashboardOverviewState.ts
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/storeAlertsState.ts
frontend/src/pages/customerProfileState.ts
frontend/src/pages/digitalTwinState.ts
backend/
backend/app/api/routes/reference.py
backend/app/api/routes/overview.py
backend/app/fixtures/reference.py
backend/app/db/metadata.py
backend/migrations/
backend/tests/
docs/API_CONTRACT.md
docs/DATA_MODEL.md
docs/CP4_CLOSURE_REVIEW.md
docs/CP5_CLOSURE_REVIEW.md
docs/MYSQL_READINESS_PLAN.md
scripts/quality-gate.mjs
.github/workflows/ci.yml
```

## CP4/P5 Conclusion

P4 has a synthetic backend/API/client contract baseline that is ready for P5 frontend API-mode integration. Real MySQL, credentials, Docker Compose, AI services, real video, and real mall data remain out of scope.

P5-I1 added the overview data loader contract. P5-I2 wired DashboardPage to the loader state boundary. P5-I3 added the Store Analysis data loader contract. P5-I4 wired StoreAnalysisPage to that loader state boundary. P5-I5 added the Store Alerts data loader contract. P5-I6 wired StoreAlertsPage to that loader state boundary. P5-I7 added the Customer Profile data loader contract. P5-I8 wired CustomerProfilePage to that loader state boundary. P5-I9 added the Digital Twin data loader contract. P5-I10 wired DigitalTwinPage to that loader state boundary. P5-I11 closed CP5 with a coverage review, go/no-go result, remaining gaps, and P6 handoff. Mock mode remains the frontend default; API mode is available only through explicit query/options.

## Not Started

```text
ai-services/
infra/
docker-compose.yml
real MySQL connection
real video ingestion
browser E2E
coverage report
production deployment
```

## Next Target

P6-I1 AI event schema and synthetic fixture boundary. Do not create `ai-services/`, choose models, download datasets, ingest real video, add dependencies, or connect real MySQL.
