# Synthetic Fixture Validation Boundary

Updated: 2026-06-01

Increment: P6-I1 AI event schema and synthetic fixture boundary

## Scope

This document defines the synthetic fixture validation boundary for the future AI video MVP. It documents the rules, constraints, and validation requirements for synthetic test data used to validate AI event processing. This is documentation-only; no AI service, model, dataset, video ingestion, or runtime implementation is created.

## Purpose

Synthetic fixtures enable:
- Offline AI event schema validation
- Backend ingestion pipeline testing
- Privacy compliance verification
- Model audit field validation
- Idempotency and data quality checks
- Aggregate statistics calculation testing

## Fixture Categories

| Category | Source | Purpose | Validation Focus |
| --- | --- | --- | --- |
| Person Detection Fixtures | Project-authored synthetic data | Validate detection event schema | Bounding box format, confidence bounds, track ID anonymization |
| Store Entry/Exit Fixtures | Project-authored synthetic data | Validate line-crossing events | Direction logic, store association, timing relationships |
| Visit Session Fixtures | Project-authored synthetic data | Validate session aggregation | Dwell time calculation, quality flags, enter/exit correlation |
| Trajectory Fixtures | Project-authored synthetic data | Validate movement flow | Node transitions, aggregate exposure, retention expiry |
| Heatmap Fixtures | Project-authored synthetic data | Validate spatial density | Grid cell format, intensity bounds, temporal aggregation |
| Store Score Aggregate Fixtures | Project-authored synthetic data | Validate store score formulas and ranking filters | Aggregate inputs, formula version, bounded score, blocked real-data fields |

## Fixture Generation Rules

### General Rules

```text
all fixtures must be project-authored
no real video, monitoring footage, or surveillance data
no real mall material, floor plans, or brand logos
no face images, biometric data, or personal identifiers
no phone numbers, member IDs, or identifiable information
UTC timestamps for all datetime fields
event_id must be unique within fixture set
confidence values bounded 0-1
model audit fields required
```

### Person Detection Fixtures

```json
{
  "event_id": "synth_det_cam01_001",
  "camera_id": "cam_demo_001",
  "track_id": "synth_track_001",
  "detected_at": "2026-05-25T10:00:00Z",
  "bbox": {
    "x": 100.0,
    "y": 80.0,
    "w": 50.0,
    "h": 100.0
  },
  "confidence": 0.95,
  "model_name": "synthetic_detector",
  "model_version": "1.0.0",
  "model_license": "MIT",
  "created_at": "2026-05-25T10:00:00Z"
}
```

Validation:
- `bbox` coordinates within camera frame bounds
- `confidence` between 0 and 1
- `track_id` anonymized, no persistent identity
- No face image or raw frame fields

### Store Entry/Exit Fixtures

```json
{
  "event_id": "synth_enter_store001_001",
  "camera_id": "cam_demo_001",
  "line_id": "line_demo_001",
  "store_id": "store_001",
  "track_id": "synth_track_001",
  "occurred_at": "2026-05-25T10:00:05Z",
  "confidence": 0.92,
  "source_detection_event_id": "synth_det_cam01_001",
  "model_name": "synthetic_line_crossing",
  "model_version": "1.0.0",
  "model_license": "MIT",
  "created_at": "2026-05-25T10:00:05Z"
}
```

Validation:
- `occurred_at` after corresponding detection event
- `store_id` references existing store configuration
- `line_id` references existing camera line configuration
- Direction matches `camera_line.enter_direction`

### Visit Session Fixtures

```json
{
  "session_id": "synth_session_store001_001",
  "store_id": "store_001",
  "track_id_hash": "synth_hash_track001",
  "enter_event_id": "synth_enter_store001_001",
  "exit_event_id": "synth_exit_store001_001",
  "entered_at": "2026-05-25T10:00:05Z",
  "exited_at": "2026-05-25T10:05:20Z",
  "dwell_seconds": 315,
  "quality_flag": "complete",
  "created_at": "2026-05-25T10:05:20Z",
  "updated_at": "2026-05-25T10:05:20Z"
}
```

Validation:
- `dwell_seconds` = `exited_at` - `entered_at`
- `quality_flag` valid enum value
- `track_id_hash` anonymized, not persistent identity
- Enter/exit event IDs reference valid events

### Trajectory Fixtures

```json
{
  "event_id": "synth_traj_floor01_001",
  "mall_id": "mall_demo_001",
  "floor_id": "floor_01",
  "track_id_hash": "synth_hash_track001",
  "occurred_at": "2026-05-25T10:00:10Z",
  "node_from": "node_entrance_a",
  "node_to": "node_store_001",
  "x": 0.45,
  "y": 0.32,
  "retention_expires_at": "2026-06-01T10:00:10Z",
  "created_at": "2026-05-25T10:00:10Z"
}
```

Validation:
- `x`, `y` between 0 and 1 (normalized coordinates)
- `retention_expires_at` set for privacy compliance
- `node_from`, `node_to` reference valid floor nodes
- No individual trajectory exposed to API clients

### Heatmap Fixtures

```json
{
  "event_id": "synth_heat_floor01_1000_001",
  "mall_id": "mall_demo_001",
  "floor_id": "floor_01",
  "cell_x": 5,
  "cell_y": 3,
  "intensity": 12.5,
  "occurred_at": "2026-05-25T10:00:00Z",
  "created_at": "2026-05-25T10:00:00Z"
}
```

Validation:
- `cell_x`, `cell_y` non-negative integers
- `intensity` non-negative number
- Grid dimensions match floor configuration
- Used for aggregate density visualization only

### Store Score Aggregate Fixtures

```json
{
  "store_id": "store_demo_001",
  "business_date": "2026-05-19",
  "score_version": "synthetic-score-v1",
  "score": 85.5,
  "grade": "A",
  "breakdown_json": {
    "source": "synthetic_event_aggregate",
    "formulaVersion": "synthetic-score-v1",
    "inputs": {
      "exposureTraffic": 747,
      "enterCount": 202,
      "conversionRate": 0.27,
      "avgDwellMinutes": 14.2,
      "trendIndex": 90,
      "profileFitIndex": 81,
      "operationalPenalty": 0
    }
  },
  "source_version": "synthetic-score-fixture-v1"
}
```

Validation:
- `score` bounded 0-100
- `conversionRate` bounded 0-1
- aggregate counts non-negative
- `score_version` matches documented formula
- no real identity, camera, image, video, order, or payment fields

## Validation Test Cases

### Schema Validation Tests

```text
required fields present
field types correct
string length limits respected
numeric bounds enforced
datetime format ISO 8601 UTC
enum values valid
unique constraints enforced
```

### Privacy Compliance Tests

```text
no face image fields present
no raw frame fields present
no personal identifier fields present
no phone number fields present
no member ID fields present
track IDs anonymized per session
trajectory data not exposed individually
retention expiry set for trajectory events
store score aggregate JSON contains no track, camera, image, video, order, payment, or identity fields
```

### Data Quality Tests

```text
confidence between 0 and 1
counts non-negative
conversion rates between 0 and 1
scores between 0 and 100
store score aggregate inputs non-negative and formula-bounded
window_end > window_start
dwell_seconds non-negative
bbox coordinates within frame bounds
grid cell indices non-negative
```

### Idempotency Tests

```text
duplicate event_id rejected
re-processing same event produces same result
aggregate statistics not double-counted
session correlation idempotent
```

### Model Audit Tests

```text
model_name present
model_version present
model_license present
license type recorded
thresholds documented
accuracy notes included
```

## Fixture Scenarios

### Normal Flow Scenario

```text
1. Person detected at camera (person_detection_event)
2. Person crosses store entry line (store_enter_event)
3. Person dwells in store (store_visit_session)
4. Person crosses store exit line (store_exit_event)
5. Movement recorded (trajectory_event)
6. Density updated (heatmap_event)
```

### Missing Exit Scenario

```text
1. Person detected at camera
2. Person crosses store entry line
3. No exit detected within timeout
4. Session marked as `missing_exit`
5. Dwell time estimated
```

### Low Confidence Scenario

```text
1. Person detected with low confidence (0.3)
2. Line crossing with low confidence (0.4)
3. Events processed but flagged
4. Aggregate statistics weighted by confidence
```

### High Density Scenario

```text
1. Multiple persons detected simultaneously
2. Multiple store entries/exits
3. High heatmap intensity values
4. Aggregate statistics reflect crowd level
```

## Validation Tools

Future validation tools should:

```text
validate fixture schema against AI_EVENT_SCHEMA.md
check privacy compliance (no personal data)
verify data quality constraints
test idempotency with duplicate events
validate aggregate statistics calculation
check retention policy enforcement
verify model audit field presence
```

## Integration With Existing Tests

Synthetic fixtures integrate with:

```text
backend API contract tests (P4)
frontend data loader tests (P5)
aggregate statistics validation
privacy compliance checks
model audit verification
```

## Boundary Constraints

### What Synthetic Fixtures Can Validate

```text
event schema compliance
data type and format validation
privacy rule enforcement
idempotency behavior
aggregate calculation logic
model audit field presence
retention policy configuration
```

### What Synthetic Fixtures Cannot Validate

```text
real video ingestion performance
model accuracy or detection quality
real-time processing latency
multi-camera synchronization
actual crowd behavior patterns
real mall layout geometry
production deployment behavior
```

## Privacy And Compliance

```text
fixtures contain no real personal data
no real video or monitoring footage
no real mall material or brand logos
no face images or biometric data
all data project-authored and synthetic
compliance with IMPORTANT.md rules
```

## Next Step

P6-I1 continues with updating README, PROGRESS.md, and context files. The synthetic fixture validation boundary must not be implemented until AI service, model, dataset, and video fixture boundaries are reviewed and confirmed.
