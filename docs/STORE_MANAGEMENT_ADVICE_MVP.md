# Store Management Advice MVP

Updated: 2026-06-09

## Scope

P10 adds synthetic store management advice on top of the current Digital Twin OS. The first delivered behavior is deterministic rule advice in the frontend plus a backend OpenAI-compatible LLM proxy placeholder.

The feature remains synthetic/mock-first. Real LLM use is disabled by default and requires local backend environment variables only.

## Local LLM Key Placeholder

Copy `backend/.env.example` to `backend/.env` and fill values locally when real LLM testing is approved:

```text
LLM_PROVIDER=openai_compatible
LLM_BASE_URL=
LLM_API_KEY=
LLM_MODEL=
LLM_ENABLED=false
```

Rules:

```text
never commit backend/.env
never expose LLM_API_KEY to frontend code
default LLM_ENABLED=false
when key or config is missing, return deterministic rule advice
when the LLM call fails or returns invalid JSON, fall back to deterministic rule advice
```

## Advice Inputs

Allowed inputs are synthetic aggregate fields only:

```text
store score and grade
entry rate
average dwell time
store warning flag and synthetic warning text
floor and category
synthetic alert level/status
URL mode, density, and incident intensity
```

Blocked fields:

```text
face_id
member_id
phone
person_id
track_id
trajectory_id
raw_frame
video_url
image_url
order_id
payment_id
```

## Current Outputs

Advice item shape:

```text
id
storeId
priority = high | medium | low
category = traffic | conversion | dwell | alert | category_ops
title
reason
actions
expectedImpact
evidence
source = rule | llm
```

Frontend panels show `规则建议` for current rule output and `大模型未启用` until backend LLM config is enabled.

## Backend API Placeholder

Implemented endpoint:

```text
POST /api/v1/advice/store-management
```

The endpoint validates blocked keys, reads LLM settings from environment variables or ignored local `backend/.env`, and returns either disabled rule advice, LLM advice, or fallback rule advice. It does not persist prompts, responses, keys, or request payloads.

Local smoke helper:

```text
python -B scripts/smoke_store_advice_llm.py
```

## Verification

Required checks for this increment:

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
