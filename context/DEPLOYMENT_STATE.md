# Deployment State

Updated: 2026-05-25

## Current Status

There is still no `infra/`, `docker-compose.yml`, production deployment binding, or real database service. P3-I4 delivered `docs/DEPLOYMENT_PLAN.md` only, not runnable Compose. P4-I16 added `docs/MYSQL_READINESS_PLAN.md` but still did not create a real MySQL service or credentials.

P6-I2 created local `ai-services/` code and tests, but did not create production deployment or container infrastructure. P6-R1 reprioritized the next workstream to a premium synthetic 3D digital twin demo.

## Current CI Boundary

```text
GitHub Actions only
Gitee mirror does not run .github/workflows/ci.yml
npm run quality
npm run quality:audit
no secrets
no production publish
no uploaded build artifacts
```

## P7 Demo Deployment Direction

Future deployment work should eventually support a local/demo environment for the synthetic 3D twin:

```text
frontend 3D demo route
backend synthetic scenario/event APIs
MySQL-backed fake/demo data persistence
seed/reset/generate workflow for demonstration
optional local-only demo mode switch
```

This is not implemented yet and should not be created before the architecture/data/API increments define the boundary.

## Deferred Deployment Work

```text
Docker Compose
production deployment
real database service
secrets or .env management
real video stream services
external cloud or paid services
monitoring stack
backup/restore implementation
```

## Next Step

P7-I1 should not create deployment infrastructure. Before creating a Docker image, database service, Gitee Go pipeline, cloud deployment, external service, AI runtime deployment, or real monitoring, first audit license, cost, account requirements, environment variables, secrets, and sudo boundaries.
