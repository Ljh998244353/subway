# Store Score MVP Contract

Updated: 2026-05-26

## Scope

P8-I2 defines the first store score MVP contract on top of existing synthetic fixtures. It does not connect real MySQL, consume real video, or process real mall/customer data.

The current endpoint remains:

```text
GET /api/v1/stores/{storeId}/score
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
