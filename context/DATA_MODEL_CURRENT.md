# Data Model Current

Updated: 2026-06-01

## Current Status

P4-I1 added `docs/DATA_MODEL.md` as the MySQL data-model baseline candidate. P4-I3 mapped that baseline into SQLAlchemy Core metadata and an Alembic initial migration. P4-I16 added `docs/MYSQL_READINESS_PLAN.md` to define gates before real MySQL query work.

The current baseline contains 27 tables:

```text
mall
floor
store_category
store
camera
camera_roi
camera_line
person_detection_event
store_enter_event
store_exit_event
store_visit_session
consume_event
trajectory_event
heatmap_event
store_flow_stat
store_dwell_stat
store_conversion_stat
customer_profile_stat
floor_flow_stat
node_flow_stat
store_score_stat
store_alert
user
role
permission
user_role
operation_log
```

The migration baseline is `backend/migrations/versions/20260519_0001_initial_schema.py` and imports metadata from `backend/app/db/metadata.py`. The current project still supports offline SQL generation only; it does not connect to real MySQL and does not add `.env`.

P8-I2 did not change the schema. It clarified the fixture-backed store score aggregate shape that can later map into `store_score_stat.breakdown_json` or future synthetic aggregate tables after a readiness review. P8-I3 also did not change the schema; ranking filters remain in-memory fixture filters over existing synthetic store and score DTOs. P8-I6 chooses `store_score_stat.breakdown_json` as the first future fake/demo persistence target for score inputs and formula metadata, and defers any dedicated synthetic aggregate table.

P9 did not change the schema. The analytics cockpit uses existing synthetic/mock aggregates and frontend state only; no scenario, replay, score history, analytics, or MySQL persistence table was added.

## P7 Synthetic 3D Demo Data Direction

The roadmap now prioritizes MySQL-backed fake/demo data before real production data. Future increments should decide whether the existing event tables are enough or whether additional synthetic-demo tables are needed.

Candidate synthetic demo entities:

```text
synthetic_scenario: demo preset, seed, time range, crowd density, incident level, active flag
synthetic_agent_config: anonymous virtual person/group config, behavior profile, destination rules
synthetic_visit_event: fake enter/exit/dwell/store destination event, idempotent event id
synthetic_agent_snapshot: replay frame position/velocity/floor/store/zone aggregate, no real identity
synthetic_heatmap_snapshot: aggregate heat intensity for 3D overlay and replay
synthetic_flow_snapshot: aggregate flow edges and node counts for animated paths
synthetic_demo_control: current scenario parameters for demo UI controls
```

These are synthetic/demo-only concepts. They must not be confused with real customer records.

## P8 Store Score Persistence Boundary

Current decision:

```text
no schema change in P8-I6
no migration in P8-I6
no real MySQL connection in P8-I6
future fake/demo score persistence should first use store_score_stat.breakdown_json
dedicated synthetic aggregate tables are deferred until replay windows or recalculation history require them
```

Allowed `breakdown_json` groups for future fake/demo score persistence:

```text
source
formulaVersion
weights
inputs.exposureTraffic
inputs.enterCount
inputs.conversionRate
inputs.avgDwellMinutes
inputs.trendIndex
inputs.profileFitIndex
inputs.operationalPenalty
breakdown.flow
breakdown.conversion
breakdown.dwell
breakdown.trend
breakdown.profileFit
breakdown.penalty
explanations
```

Blocked score persistence fields:

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

## Data Quality And Privacy

```text
UTC internally
stable IDs for synthetic scenarios, virtual agents, stores, events, and replay frames
event_id is idempotency key for event tables
scores and conversion rates use bounded numeric columns
synthetic virtual agents are anonymous visual/demo entities only
no face images
no phone
no id_card
no raw_frame
no video_url
no personal trajectories returned to API clients
```

## Next Step

P9 is complete without data-model changes. The next data-model decision should be part of P10 roadmap triage, and any fake/demo persistence must still pass the MySQL readiness gates before a migration is created.
