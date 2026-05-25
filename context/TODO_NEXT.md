# TODO Next

Updated: 2026-05-25

## Task Card

```text
Increment: P6-I1 AI event schema and synthetic fixture boundary
Primary role: AI Video Mode
Auxiliary reviews: Architect, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I11 CP5 frontend API-mode integration closure review
```

## Goal

Define the AI event output schema and synthetic fixture validation boundary for the future AI video MVP. This is a documentation and contract-planning increment only. It prepares P6 without creating an AI service, selecting a model, downloading data, or using real video.

## Recommended Scope

```text
review CP5 closure and current API/data-model boundaries
document the future AI event output schema for anonymous aggregate mall events
document synthetic fixture rules for event validation
define privacy, license, model, dataset, and quality gates before any P6 runtime implementation
update README, PROGRESS.md, context/*.md, and engineering quality docs
```

## Non-goals

```text
do not create ai-services/
do not select model weights, datasets, video sources, tracking libraries, or external AI services
do not ingest real video or monitoring footage
do not add dependencies, Docker images, cloud services, paid tools, or account-bound services
do not connect real MySQL
do not create .env with credentials
do not create infra/ or docker-compose.yml
do not add real mall material, real floor plans, real brands, face images, member IDs, phone numbers, individual profiles, or personal trajectories
do not execute sudo
```

## Required Reading

```text
AGENTS.md
README.md
PROGRESS.md
docs/CP5_CLOSURE_REVIEW.md
docs/API_CONTRACT.md
docs/DATA_MODEL.md
docs/TEST_STRATEGY.md
docs/ENGINEERING_QUALITY_GATES.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/API_CONTRACT_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/AI_ALGORITHM_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/*.md
```

## Deliverables

```text
AI event schema documentation
synthetic fixture validation boundary documentation
updated README, PROGRESS.md, context/*.md, and context/TODO_NEXT.md
no runtime AI service, dependency, model, dataset, real video, or external service
quality and audit results recorded
```

## Acceptance Checks

```bash
npm run quality
npm run quality:audit
```

P6-I1 completion should be searchable with:

```bash
rg -n "P6-I1|AI event schema|synthetic fixture|AI Video Mode|model weights|real video|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/AI_ALGORITHM_STATE.md docs
```

## Human Confirmation Gates

```text
before creating ai-services/
before selecting or downloading model weights, datasets, video fixtures, tracking libraries, or external AI services
before adding dependencies, Docker images, paid tools, cloud services, or account-bound capability
before using real video, real monitoring, real mall material, real brands, face images, or personal information
before switching from synthetic fixtures to real MySQL query
before creating or committing credentials, .env, Docker Compose, or deployment infrastructure
before production deployment
```

## Next Handoff

After P6-I1, continue only with a narrow approved P6 increment that stays synthetic and license-reviewed. Runtime AI implementation, model selection, real video, and service creation remain blocked until their own human-confirmed gates.
