# Data Model Current

Updated: 2026-05-26

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

P8-I2 did not change the schema. It clarified the fixture-backed store score aggregate shape that can later map into `store_score_stat.breakdown_json` or future synthetic aggregate tables after a readiness review.

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

P8-I2 did not change the data model. A later backend/data increment should decide whether store score synthetic aggregate inputs live only inside `store_score_stat.breakdown_json` or require a dedicated fake-event aggregate table before any migration is created.
