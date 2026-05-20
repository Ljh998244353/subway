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

P4-I4 added core read API contract tests to backend Pytest. P4-I5 added frontend API/client integration checks. P4-I6 added overview API contract tests. P4-I7 added frontend overview client tests. P4-I8 added store detail API/client contract tests. P4-I9 added store score API/client contract tests. P4-I10 added store flow API/client contract tests. P4-I11 added store ranking API/client contract tests. P4-I12 added store alerts list API/client contract tests. P4-I13 added customer profile API/client contract tests. P4-I14 added heatmap API/client contract tests. P4-I15 added trajectories API/client contract tests. P4-I16 added CP4 closure review and MySQL readiness planning. P5-I1 added frontend API-mode overview loader tests without live backend dependency. P5-I2 added dashboard API-mode state wiring tests while keeping mock mode default. P5-I3 should add Store Analysis API-mode loader tests without live backend dependency.

Before entering real MySQL query work, add database service strategy, environment variable validation, secrets policy, and migration execution checks. Any external service, paid tool, Docker image, or real monitoring integration must be audited first.
