# Store Score MVP Contract

Updated: 2026-06-01

## Scope

P8-I2 defines the first store score MVP contract on top of existing synthetic fixtures. It does not connect real MySQL, consume real video, or process real mall/customer data.

The current endpoint remains:

```text
GET /api/v1/stores/{storeId}/score
```

P8-I3 also extends the existing ranking endpoint with fixture-backed filters:

```text
GET /api/v1/stores/ranking?mallId=mall_demo_001&floorId=floor_demo_l1&categoryId=cat_food&grade=B&minScore=70&maxScore=80&limit=10
```

## Synthetic Inputs

The score response exposes synthetic aggregate inputs so later fake-event persistence can replace fixtures without changing the frontend contract:

```text
exposureTraffic
enterCount
conversionRate
avgDwellMinutes
trendIndex
profileFitIndex
operationalPenalty
```

These inputs are anonymous aggregates only. They must not contain face IDs, member IDs, phone numbers, individual trajectory IDs, person IDs, raw frame references, or real monitoring footage.

## Formula

Formula version: `synthetic-score-v1`

```text
score =
  flow * 0.25
  + conversion * 0.25
  + dwell * 0.15
  + trend * 0.20
  + profileFit * 0.15
  - penalty
```

The score is rounded to one decimal and bounded to `0..100`.

Grade bands:

```text
A: score >= 85
B: score >= 70
C: score >= 60
D: score < 60
```

## Current Boundary

The current implementation is fixture-backed and deterministic. Future increments may persist synthetic/demo aggregate inputs in MySQL after schema and readiness gates, but P8-I2 deliberately avoids migrations, production data adapters, deployment infrastructure, and real database connections.

## Ranking Filter Readiness

P8-I3 keeps ranking data synthetic and read-only. Supported filters are:

```text
floorId
categoryId
grade = A|B|C|D
minScore = 0..100
maxScore = 0..100
limit = 1..100
```

Filtered rankings are re-ranked from `1` after filtering. Invalid score ranges are rejected with `INVALID_SCORE_RANGE`. These filters are readiness work for the frontend score board and future synthetic aggregate persistence; they do not imply real MySQL access or production data.

## Synthetic Persistence Boundary

P8-I6 selects the first persistence boundary as the existing `store_score_stat.breakdown_json` candidate, not a new table. If a future increment enables fake/demo persistence, the JSON payload should hold only the existing synthetic aggregate contract:

```json
{
  "source": "synthetic_event_aggregate",
  "formulaVersion": "synthetic-score-v1",
  "weights": {
    "flow": 0.25,
    "conversion": 0.25,
    "dwell": 0.15,
    "trend": 0.2,
    "profileFit": 0.15
  },
  "inputs": {
    "exposureTraffic": 747,
    "enterCount": 202,
    "conversionRate": 0.27,
    "avgDwellMinutes": 14.2,
    "trendIndex": 90,
    "profileFitIndex": 81,
    "operationalPenalty": 0
  },
  "breakdown": {
    "flow": 88,
    "conversion": 84,
    "dwell": 82,
    "trend": 90,
    "profileFit": 81,
    "penalty": 0
  },
  "explanations": ["Synthetic score explanation"]
}
```

Blocked fields:

```text
face_id
member_id
phone
person_id
track_id
track_id_hash
trajectory_id
camera_id
raw_frame
video_url
image_url
real_order_id
payment_id
```

A dedicated synthetic aggregate table is deferred until there is a documented need for replayable aggregate windows, idempotent fake-event ingestion, or score recalculation history beyond `store_score_stat`. Any such migration must pass docs, compliance, data-model, backend, and audit gates before implementation.

## P8 Readiness Review

Completed:

```text
deterministic synthetic-score-v1 formula
fixture-backed score endpoint with source, weights, inputs, breakdown, grade, and explanations
fixture-backed ranking endpoint with floor/category/grade/score/limit filters
frontend mock-mode score board filters aligned with ranking dimensions
future breakdown_json payload boundary for fake/demo persistence
pure mapping test from StoreScoreDto to breakdown_json payload
blocked real-data fields documented
```

Deferred:

```text
real MySQL query path
new score persistence migration
dedicated synthetic aggregate table
score recalculation job
real AI/video ingestion into score inputs
RBAC/audit-log mutation workflow
```

P9 can start because the analytics layer can consume deterministic synthetic aggregate scores, ranking filters, customer profile aggregates, heatmap aggregates, and trajectory aggregates without needing production data or real persistence. Any later MySQL work must remain behind the readiness gates in `docs/MYSQL_READINESS_PLAN.md`.
