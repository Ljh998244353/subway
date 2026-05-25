# CI Plan

更新时间：2026-05-19

## Current Status

`.github/workflows/ci.yml` is a GitHub Actions configuration that reuses the local quality gate. A Gitee mirror does not run this workflow automatically.

Current CI coverage:

```text
checkout
setup-node
npm ci --prefix frontend
setup-python
python -m venv backend/.venv
pip install -r backend/requirements.txt
npm run quality
npm run quality:audit
```

## Jobs

| Job | Command | Description |
| --- | --- | --- |
| quality-gate | `npm run quality` | docs/compliance/boundary/frontend/backend |
| dependency-audit | `npm run quality:audit` | frontend high-severity npm audit |

## Current Non-Coverage

```text
real MySQL service
real migration execution
Docker Compose startup
browser E2E
coverage report
AI validation
production deployment
Gitee Go
```

## Later Extensions

P4-I4 added core read API contract tests to backend Pytest. P4-I5 added frontend API/client integration checks. P4-I6 added overview API contract tests. P4-I7 added frontend overview client tests. P4-I8 added store detail API/client contract tests. P4-I9 added store score API/client contract tests. P4-I10 added store flow API/client contract tests. P4-I11 added store ranking API/client contract tests. P4-I12 added store alerts list API/client contract tests. P4-I13 added customer profile API/client contract tests. P4-I14 added heatmap API/client contract tests. P4-I15 added trajectories API/client contract tests. P4-I16 added CP4 closure review and MySQL readiness planning. P5-I1 added frontend API-mode overview loader tests without live backend dependency. P5-I2 added dashboard API-mode state wiring tests while keeping mock mode default. P5-I3 added Store Analysis API-mode loader tests without live backend dependency. P5-I4 added StoreAnalysisPage API-mode state wiring tests while keeping mock mode default. P5-I5 added Store Alerts API-mode loader tests without live backend dependency. P5-I6 added StoreAlertsPage API-mode state wiring tests while keeping mock mode default. P5-I7 added Customer Profile API-mode loader tests without live backend dependency. P5-I8 added CustomerProfilePage API-mode state wiring tests while keeping mock mode default. P5-I9 added Digital Twin API-mode loader tests without live backend dependency. P5-I10 added DigitalTwinPage API-mode state wiring tests while keeping mock mode default. P5-I11 should review CP5 frontend API-mode integration coverage and remaining gaps.

Before entering real MySQL query work, add database service strategy, environment variable validation, secrets policy, and migration execution checks. Any external service, paid tool, Docker image, or real monitoring integration must be audited first.
