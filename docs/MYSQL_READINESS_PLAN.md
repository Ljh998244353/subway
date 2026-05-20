# MySQL Readiness Plan

Updated: 2026-05-20

## Scope

This plan defines the checks required before the project may switch any synthetic fixture API to real MySQL queries. P4-I16 does not create a real database, `.env`, Docker image, Docker Compose file, cloud service, or production deployment.

## Readiness Checklist

| Area | Required Before Real Query Work | Current State |
| --- | --- | --- |
| Human approval | explicit confirmation to connect real MySQL | not granted |
| Driver/license | PyMySQL version and license recorded | recorded in P4-I3 audit |
| Configuration | typed settings for database URL, pool, timeout, environment | not implemented |
| Secrets | `.env.example` allowed, real `.env` and credentials blocked | not implemented |
| Migration execution | upgrade head on a disposable MySQL-compatible database | not tested |
| Rollback | downgrade or documented rollback policy | not implemented |
| Seed data | synthetic seed only, no real mall/video/personal data | not implemented |
| Health check | database status changes from `not_configured` to connected/degraded | health skeleton exists |
| Error handling | DB failure maps to `503 DEPENDENCY_UNAVAILABLE` | contract documented, not implemented |
| Query boundary | repository/service layer separates fixture and DB data sources | not implemented |
| Privacy regression | no face images, member IDs, phone numbers, personal trajectories | metadata tests exist |
| CI strategy | optional MySQL service job or local-only documented gate | not implemented |

## Configuration Rules

```text
do not commit real credentials
do not commit real .env files
use MySQL, not PostgreSQL
use UTC in persisted timestamps
keep business date conversion explicit
fail closed when required database config is missing in API mode
keep local synthetic fixture mode available
```

## First Allowed MySQL Increment

The first MySQL implementation increment should be configuration-only unless the human explicitly approves a real database connection. A safe first increment can add:

```text
database settings model
.env.example with placeholder values only
connection URL validation tests
health response shape for configured/not_configured states
documentation for local disposable MySQL test setup
```

It must not add real credentials, Docker images, Docker Compose, cloud services, real mall data, real video, or personal data.

## Real Query Entry Criteria

Real query work can start only after all of these are true:

```text
human confirms real MySQL connection scope
license/cost/account review is updated for any new service or image
secrets policy is documented and tested
migration upgrade succeeds on a disposable database
rollback or rebuild strategy is documented
synthetic seed data is approved
privacy regression tests pass
health check exposes database dependency state
mock/frontend fallback remains available
```
