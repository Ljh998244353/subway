# Data Model Current

Updated: 2026-05-25

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

The migration baseline is `backend/migrations/versions/20260519_0001_initial_schema.py` and imports metadata from `backend/app/db/metadata.py`. P4 supports offline SQL generation only; it does not connect to real MySQL and does not add `.env`.

## Data Quality And Privacy

```text
UTC internally
event_id is idempotency key for event tables
scores and conversion rates use bounded numeric columns
no face images
no phone
no id_card
no raw_frame
no video_url
no personal trajectories returned to API clients
```

## Next Step

P5-I10 should not change the data model. Real MySQL configuration or query work requires the readiness gates in `docs/MYSQL_READINESS_PLAN.md`.
