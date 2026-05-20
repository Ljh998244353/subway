# MySQL Data Model Baseline

更新时间：2026-05-19

## Increment

```text
Increment: P4-I1 backend API contract and data model baseline
Primary role: Backend Mode
Auxiliary reviews: Architect, QA, Security/License
Status: baseline candidate, pending human freeze confirmation
```

## Scope

本文定义后端 MySQL 数据模型基线。P4-I1 只固化实体、表边界、关键字段、索引、幂等键、UTC 时间和数据保留策略；不创建数据库、不创建 Alembic 迁移、不接真实数据、不存储个人身份信息或人脸图像。

## Global Database Rules

```text
database: MySQL 8.x target
charset: utf8mb4
collation: utf8mb4_0900_ai_ci, or deployment-approved utf8mb4 alternative
primary key: varchar stable ids for business entities, bigint auto increment allowed only for internal logs
time fields: UTC datetime with explicit suffix naming where useful
business date: separate date column when daily aggregation is needed
soft delete: deleted_at for configuration/reference tables
idempotency: event_id or source_event_id unique keys on event tables
source of truth: raw events and configuration tables
derived data: stat tables can be recalculated from events
```

## Entity Groups

| Group | Tables | Purpose |
| --- | --- | --- |
| Reference | `mall`, `floor`, `store_category`, `store` | stable business structure and geometry |
| Camera config | `camera`, `camera_roi`, `camera_line` | audited video input and counting configuration |
| Raw events | `person_detection_event`, `store_enter_event`, `store_exit_event`, `store_visit_session`, `consume_event`, `trajectory_event`, `heatmap_event` | append-only facts emitted by AI/services |
| Aggregates | `store_flow_stat`, `store_dwell_stat`, `store_conversion_stat`, `customer_profile_stat`, `floor_flow_stat`, `node_flow_stat`, `store_score_stat` | query-optimized statistics |
| Alerts | `store_alert` | low-efficiency, congestion, trend, and data-quality warnings |
| Security/audit | `user`, `role`, `permission`, `user_role`, `operation_log` | RBAC and operation history |

## Table Baseline

### `mall`

| Column | Type | Rule |
| --- | --- | --- |
| `mall_id` | varchar(64) PK | stable id |
| `name` | varchar(128) | fictional or authorized name only |
| `timezone` | varchar(64) | e.g. `Asia/Shanghai` |
| `business_open_time` | time | local business time |
| `business_close_time` | time | local business time |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: unique `mall_id`; index `deleted_at`.

### `floor`

| Column | Type | Rule |
| --- | --- | --- |
| `floor_id` | varchar(64) PK | stable id |
| `mall_id` | varchar(64) FK | references `mall` |
| `name` | varchar(64) | display name |
| `level_no` | int | floor order |
| `width`, `height` | decimal(10,2) | normalized floor coordinate range |
| `crowd_warning_threshold` | int | optional threshold |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: unique `(mall_id, level_no)`; index `(mall_id, deleted_at)`.

### `store_category`

| Column | Type | Rule |
| --- | --- | --- |
| `category_id` | varchar(64) PK | stable id |
| `name` | varchar(64) | fictional or generic category |
| `parent_category_id` | varchar(64) nullable | self reference |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: unique `category_id`; index `parent_category_id`.

### `store`

| Column | Type | Rule |
| --- | --- | --- |
| `store_id` | varchar(64) PK | stable id |
| `mall_id` | varchar(64) FK | denormalized for query |
| `floor_id` | varchar(64) FK | floor |
| `category_id` | varchar(64) FK | category |
| `name` | varchar(128) | fictional or authorized store name only |
| `unit_code` | varchar(64) | display unit |
| `area_sqm` | decimal(10,2) | positive |
| `status` | enum/string | `open`, `closed`, `renovating`, `vacant` |
| `x`, `y`, `width`, `height` | decimal(10,2) | floor geometry bbox |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: unique `(floor_id, unit_code)`; index `(mall_id, category_id, status)`; index `(floor_id, status)`.

### `camera`

| Column | Type | Rule |
| --- | --- | --- |
| `camera_id` | varchar(64) PK | stable id |
| `mall_id`, `floor_id` | varchar(64) FK | scope |
| `name` | varchar(128) | display name |
| `input_mode` | varchar(32) | `synthetic`, `local_file`, `rtsp_authorized` |
| `input_ref` | varchar(255) nullable | never commit real RTSP URL |
| `status` | varchar(32) | `active`, `inactive`, `maintenance` |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: index `(mall_id, floor_id, status)`.

### `camera_roi`

| Column | Type | Rule |
| --- | --- | --- |
| `roi_id` | varchar(64) PK | stable id |
| `camera_id` | varchar(64) FK | camera |
| `store_id` | varchar(64) nullable FK | linked store when applicable |
| `name` | varchar(128) | ROI label |
| `polygon_json` | json | normalized polygon points |
| `purpose` | varchar(32) | `store_entry`, `dwell`, `heatmap`, `crowd` |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: index `(camera_id, purpose)`; index `store_id`.

### `camera_line`

| Column | Type | Rule |
| --- | --- | --- |
| `line_id` | varchar(64) PK | stable id |
| `camera_id` | varchar(64) FK | camera |
| `store_id` | varchar(64) nullable FK | linked store |
| `name` | varchar(128) | line label |
| `start_x`, `start_y`, `end_x`, `end_y` | decimal(10,4) | normalized coordinates |
| `enter_direction` | varchar(32) | `left_to_right`, `right_to_left`, `top_to_bottom`, `bottom_to_top`, `custom` |
| `created_at`, `updated_at`, `deleted_at` | datetime | UTC |

Indexes: index `(camera_id, store_id)`.

## Event Tables

### `person_detection_event`

| Column | Type | Rule |
| --- | --- | --- |
| `event_id` | varchar(96) PK | idempotency key from AI service |
| `camera_id` | varchar(64) | source camera |
| `track_id` | varchar(96) | anonymized per-camera track id |
| `detected_at` | datetime | UTC |
| `bbox_x`, `bbox_y`, `bbox_w`, `bbox_h` | decimal(10,4) | frame coordinates |
| `confidence` | decimal(5,4) | 0 to 1 |
| `model_name`, `model_version`, `model_license` | varchar | audit fields |
| `created_at` | datetime | UTC |

Indexes: unique `event_id`; index `(camera_id, detected_at)`; index `(track_id, detected_at)`.

Privacy rule: no face image, no raw frame, no biometric identity.

### `store_enter_event` / `store_exit_event`

| Column | Type | Rule |
| --- | --- | --- |
| `event_id` | varchar(96) PK | idempotency key |
| `camera_id`, `line_id`, `store_id` | varchar(64) | source config |
| `track_id` | varchar(96) | anonymized temporary track |
| `occurred_at` | datetime | UTC |
| `confidence` | decimal(5,4) | 0 to 1 |
| `source_detection_event_id` | varchar(96) nullable | traceability |
| `created_at` | datetime | UTC |

Indexes: unique `event_id`; index `(store_id, occurred_at)`; index `(track_id, occurred_at)`.

### `store_visit_session`

| Column | Type | Rule |
| --- | --- | --- |
| `session_id` | varchar(96) PK | deterministic from enter/exit pair when possible |
| `store_id` | varchar(64) | store |
| `track_id_hash` | varchar(128) | salted/rotating hash, not persistent identity |
| `enter_event_id`, `exit_event_id` | varchar(96) nullable | event links |
| `entered_at`, `exited_at` | datetime nullable | UTC |
| `dwell_seconds` | int nullable | non-negative |
| `quality_flag` | varchar(32) | `complete`, `missing_exit`, `estimated`, `invalid` |
| `created_at`, `updated_at` | datetime | UTC |

Indexes: unique `session_id`; index `(store_id, entered_at)`; index `quality_flag`.

### `consume_event`

P4 baseline keeps this optional because POS integration is outside current scope.

| Column | Type | Rule |
| --- | --- | --- |
| `event_id` | varchar(96) PK | idempotency key |
| `store_id` | varchar(64) | store |
| `occurred_at` | datetime | UTC |
| `amount_bucket` | varchar(32) nullable | bucketed only, no raw personal payment identity |
| `source` | varchar(32) | `mock`, `synthetic`, `authorized_import` |
| `created_at` | datetime | UTC |

Indexes: unique `event_id`; index `(store_id, occurred_at)`.

### `trajectory_event`

| Column | Type | Rule |
| --- | --- | --- |
| `event_id` | varchar(96) PK | idempotency key |
| `mall_id`, `floor_id` | varchar(64) | scope |
| `track_id_hash` | varchar(128) | short-retention anonymized hash |
| `occurred_at` | datetime | UTC |
| `node_from`, `node_to` | varchar(64) nullable | aggregate graph nodes |
| `x`, `y` | decimal(10,4) nullable | only for temporary aggregation; not exposed as personal path |
| `retention_expires_at` | datetime | UTC |
| `created_at` | datetime | UTC |

Indexes: unique `event_id`; index `(floor_id, occurred_at)`; index `retention_expires_at`.

Privacy rule: APIs expose aggregate flows only, not individual trajectories.

### `heatmap_event`

| Column | Type | Rule |
| --- | --- | --- |
| `event_id` | varchar(96) PK | idempotency key |
| `mall_id`, `floor_id` | varchar(64) | scope |
| `cell_x`, `cell_y` | int | grid cell |
| `intensity` | decimal(10,4) | non-negative |
| `occurred_at` | datetime | UTC |
| `created_at` | datetime | UTC |

Indexes: unique `event_id`; index `(floor_id, occurred_at, cell_x, cell_y)`.

## Aggregate Tables

All aggregate tables include `stat_id`, scope ids, `window_start`, `window_end`, `business_date`, metric fields, `source_version`, `created_at`, and `updated_at`. Unique keys must prevent duplicate windows.

| Table | Unique key | Main metrics |
| --- | --- | --- |
| `store_flow_stat` | `(store_id, window_start, window_end)` | enter_count, exit_count, inside_estimate |
| `store_dwell_stat` | `(store_id, window_start, window_end)` | avg_dwell_seconds, median_dwell_seconds, sample_count |
| `store_conversion_stat` | `(store_id, window_start, window_end)` | enter_count, consume_count, conversion_rate |
| `customer_profile_stat` | `(mall_id, floor_id, business_date, segment_type, segment_value)` | visitor_count, ratio |
| `floor_flow_stat` | `(floor_id, window_start, window_end)` | current_people, enter_count, exit_count, crowd_level |
| `node_flow_stat` | `(floor_id, node_from, node_to, window_start, window_end)` | flow_count |
| `store_score_stat` | `(store_id, business_date, score_version)` | score, grade, breakdown_json |

Data quality constraints:

```text
counts >= 0
conversion_rate between 0 and 1
score between 0 and 100
window_end > window_start
business_date matches mall timezone interpretation
duplicate raw events must not double-count aggregates
```

## Alert Table

### `store_alert`

| Column | Type | Rule |
| --- | --- | --- |
| `alert_id` | varchar(96) PK | stable id |
| `mall_id`, `floor_id`, `store_id` | varchar(64) | scope |
| `type` | varchar(64) | `CD_GRADE`, `LOW_CONVERSION_HIGH_FLOW`, `LOW_FLOW_LOW_CONVERSION`, `HIGH_RENT_LOW_FLOW`, `CONTINUOUS_DECLINE`, `DATA_ANOMALY` |
| `severity` | varchar(32) | `info`, `warning`, `critical` |
| `status` | varchar(32) | `open`, `acknowledged`, `resolved`, `dismissed` |
| `detected_at`, `resolved_at` | datetime nullable | UTC |
| `summary` | varchar(255) | sanitized text |
| `evidence_json` | json | aggregate evidence only |
| `created_at`, `updated_at` | datetime | UTC |

Indexes: index `(mall_id, status, severity, detected_at)`; index `(store_id, detected_at)`; index `type`.

## RBAC And Audit Tables

| Table | Key fields | Rules |
| --- | --- | --- |
| `user` | `user_id`, `username`, `password_hash`, `status` | no plain text password |
| `role` | `role_id`, `code`, `name` | seed roles: admin, operator, leasing, security, readonly |
| `permission` | `permission_id`, `code`, `resource`, `action` | endpoint-aligned permissions |
| `user_role` | `user_id`, `role_id` | unique pair |
| `operation_log` | `log_id`, `user_id`, `action`, `resource_type`, `resource_id`, `trace_id`, `created_at` | no secrets, no face images, no personal trajectory |

## Retention Policy Baseline

| Data | Retention baseline | Reason |
| --- | --- | --- |
| Reference/config tables | keep while active, soft delete | auditability |
| Detection events | short-term configurable retention | AI validation and replay without raw images |
| Enter/exit/session events | medium-term operational retention | statistics recalculation |
| Trajectory events | shortest retention; aggregate then expire | privacy risk |
| Heatmap events | aggregate retention preferred | dashboard analysis |
| Aggregate stats | longer retention | trend analysis |
| Operation logs | project-defined retention | security audit |

Exact retention days must be confirmed before production-like deployment.

## Migration And Test Plan

Executable migration tests start in the next backend increment. Required checks:

```text
Alembic upgrade head succeeds on empty MySQL-compatible database
Alembic downgrade for the latest revision is documented or explicitly blocked with reason
all foreign keys, unique keys, and indexes match this baseline
UTC datetime defaults are explicit
event idempotency unique keys reject duplicates
data quality fixtures reject negative counts, invalid scores, invalid conversion rates, and invalid windows
privacy regression checks confirm no table stores face image, phone number, ID card, member ID, or raw personal trajectory for API display
```

## Freeze Gate

This P4-I1 document is a baseline candidate. Before migrations or ORM models treat it as frozen, a human must confirm:

```text
MySQL 核心表结构冻结确认
事件保留周期确认
RBAC 种子角色确认
是否允许创建 backend/ FastAPI 工程和 Python 虚拟环境
```
