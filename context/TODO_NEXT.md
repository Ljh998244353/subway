# TODO Next

Updated: 2026-06-09

one task only

## Task Card

```text
Increment: P10-I3 optional real LLM UI wiring review
Primary role: QA/Frontend Mode
Auxiliary reviews: Backend, Security/License, Product
Human command: 自动继续
Status: ready
```

## Goal

Decide whether LLM-generated advice should be exposed in the frontend after backend local proxy smoke testing.

## Deliverables

```text
one task: review whether to add a synthetic-safe API-mode frontend advice client for LLM-generated advice, keeping rule advice as the default fallback
```

## Non-goals

```text
do not put a real LLM key in any committed file
do not enable LLM_ENABLED=true unless backend/.env exists locally and the user explicitly asks for real LLM testing
do not connect real MySQL or production data
do not use real floor plans, BIM/CAD, maps, brands/logos, video, face images, personal data, or individual trajectories
do not create deployment infrastructure
do not add dependencies, images, external services, paid services, textures, HDRIs, or model assets without a new audit
do not persist prompts, responses, keys, or advice payloads
```

## Minimum Working Set

```text
PROGRESS.md
context/TODO_NEXT.md
context/FRONTEND_STATE.md
context/BACKEND_STATE.md
context/API_CONTRACT_CURRENT.md
context/TEST_STATE.md
docs/STORE_MANAGEMENT_ADVICE_MVP.md
backend/.env.example
backend/app/api/routes/advice.py
backend/app/core/config.py
backend/app/schemas/advice.py
backend/app/services/store_advice.py
backend/tests/test_advice_api.py
frontend/src/lib/store-management-advice.ts
frontend/src/components/dashboard/StoreManagementAdvicePanel.tsx
frontend/tests/storeManagementAdvice.test.ts
```

## Acceptance Checks

```text
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
backend\.venv\Scripts\python.exe -m pytest backend\tests\test_advice_api.py backend\tests\test_reference_api.py backend\tests\test_migrations.py
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit
```

## Human Confirmation Gates

```text
real LLM API key entry
setting LLM_ENABLED=true
real AI service call
real data/material access
production deployment
```

## Next Handoff

```text
Recommended next command: 自动继续
```
