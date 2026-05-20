# Project State

Updated: 2026-05-20

## Current Stage

Completed P0/P1/P2/P3 and P4-I1 through P4-I16.

The repository currently has:

```text
frontend/
frontend/src/api/
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
docs/MYSQL_READINESS_PLAN.md
scripts/quality-gate.mjs
.github/workflows/ci.yml
```

## CP4 Conclusion

P4 has a synthetic backend/API/client contract baseline that is ready for P5 frontend API-mode integration. Real MySQL, credentials, Docker Compose, AI services, real video, and real mall data remain out of scope.

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

P5-I1 API mode overview data loader contract. Keep mock mode as the default and use the existing synthetic backend contract only.
