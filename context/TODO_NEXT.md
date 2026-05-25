# TODO Next

Updated: 2026-05-25

## Completed

P6-I1 AI event schema and synthetic fixture boundary documentation is complete.

```text
docs/AI_EVENT_SCHEMA.md
docs/SYNTHETIC_FIXTURE_VALIDATION.md
README.md
PROGRESS.md
context/*.md
```

P6-I2 AI service implementation with synthetic fixtures is complete.

```text
ai-services/ directory structure
Python virtual environment with dependencies
OpenCV HOG person detector (Apache 2.0 license)
Synthetic video fixture generator
Person detection event output implementation
Event schema validation
20 tests passing
```

## Task Card

```text
Increment: P6-I3 (待定)
Primary role: AI Video Mode
Auxiliary reviews: Architect, QA, Security/License
Human command: 请进行下一步
Status: ready after P6-I2 AI service implementation
```

## Goal

Continue AI service development with backend integration, real video testing, performance optimization, or containerization. Specific scope depends on human priorities.

## Recommended Scope Options

```text
Option A: Backend API integration - connect AI service to backend endpoints
Option B: Real video testing - test with approved video sources
Option C: Performance optimization - tune detection parameters
Option D: Docker containerization - create Dockerfile and compose
Option E: Model enhancement - explore alternative detectors
```

## Non-goals

```text
do not use real monitoring footage without approval
do not store face images
do not display personal trajectories
do not add paid tools or external services without approval
do not connect real MySQL without readiness gates
do not create Docker Compose without deployment plan review
```

## Required Reading

```text
AGENTS.md
README.md
PROGRESS.md
docs/AI_EVENT_SCHEMA.md
docs/SYNTHETIC_FIXTURE_VALIDATION.md
docs/CP5_CLOSURE_REVIEW.md
docs/ENGINEERING_QUALITY_GATES.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/AI_ALGORITHM_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/*.md
ai-services/README.md
```

## Deliverables

```text
backend API integration or
real video testing with approved sources or
performance optimization and model tuning or
Docker containerization or
model enhancement
updated documentation and context files
quality and audit results recorded
```

## Acceptance Checks

```bash
npm run quality
npm run quality:audit
```

P6-I3 completion should include quality gate verification.

## Human Confirmation Gates

```text
before integrating with real backend endpoints
before using real video or monitoring footage
before adding new dependencies or external services
before creating Docker Compose or deployment infrastructure
before production deployment
```