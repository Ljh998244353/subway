# AI Event Schema

Updated: 2026-05-25

Increment: P6-I1 AI event schema and synthetic fixture boundary

## Scope

This document defines the AI event output schema for the future AI video MVP. It documents the contract between the AI service and the backend ingestion layer. This is documentation-only; no AI service, model, dataset, video ingestion, or runtime implementation is created.

## Design Principles

```text
anonymous aggregate events only
no face images, raw frames, or biometric identity
no personal trajectories exposed to API clients
no phone numbers, member IDs, or identifiable personal data
UTC timestamps internally
event_id as idempotency key
confidence scores bounded 0-1
model audit fields required
```

## Event Categories

| Category | Database Table | Purpose | AI Source |
| --- | --- | --- | --- |
| Person Detection | `person_detection_event` | Anonymous person bounding box detection | Video frame detection |
| Store Entry/Exit | `store_enter_event` / `store_exit_event` | Line-crossing direction events | ROI line analysis |
| Store Visit Session | `store_visit_session` | Aggregated enter/exit pair with dwell time | Event correlation |
| Trajectory | `trajectory_event` | Anonymous aggregate movement flow | Multi-camera tracking |
| Heatmap | `heatmap_event` | Spatial density aggregation | ROI grid counting |

## Common Event Fields

All AI events share these base fields:

```json
{
  "event_id": "string (varchar(96))",
  "source_event_id": "string nullable (varchar(96))",
  "confidence": "number (0-1, decimal(5,4))",
  "model_name": "string (varchar)",
  "model_version": "string (varchar)",
  "model_license": "string (varchar)",
  "created_at": "datetime (UTC)"
}
```

## Person Detection Event Schema

Source: `person_detection_event` table

```json
{
  "event_id": "det_cam01_20260525_001",
  "camera_id": "cam_001",
  "track_id": "track_anon_001",
  "detected_at": "2026-05-25T10:30:00Z",
  "bbox": {
    "x": 120.5,
    "y": 80.3,
    "w": 45.2,
    "h": 90.1
  },
  "confidence": 0.95,
  "model_name": "person_detector_v1",
  "model_version": "1.0.0",
  "model_license": "MIT",
  "created_at": "2026-05-25T10:30:00Z"
}
```

Validation rules:
- `event_id` must be unique (idempotency key)
- `camera_id` must reference existing camera configuration
- `track_id` is anonymized per-camera, not persistent identity
- `bbox` coordinates normalized to camera frame dimensions
- `confidence` between 0 and 1
- No face image, raw frame, or biometric data

## Store Entry/Exit Event Schema

Source: `store_enter_event` / `store_exit_event` tables

```json
{
  "event_id": "enter_store001_20260525_001",
  "camera_id": "cam_001",
  "line_id": "line_001",
  "store_id": "store_001",
  "track_id": "track_anon_001",
  "occurred_at": "2026-05-25T10:30:05Z",
  "confidence": 0.92,
  "source_detection_event_id": "det_cam01_20260525_001",
  "model_name": "line_crossing_v1",
  "model_version": "1.0.0",
  "model_license": "MIT",
  "created_at": "2026-05-25T10:30:05Z"
}
```

Validation rules:
- `event_id` must be unique
- `camera_id`, `line_id`, `store_id` must reference existing configurations
- `track_id` matches the person detection track
- `occurred_at` must be after corresponding detection event
- `confidence` between 0 and 1
- Direction determined by `camera_line.enter_direction` configuration

## Store Visit Session Schema

Source: `store_visit_session` table

```json
{
  "session_id": "session_store001_track001_20260525",
  "store_id": "store_001",
  "track_id_hash": "hash_salt_track001",
  "enter_event_id": "enter_store001_20260525_001",
  "exit_event_id": "exit_store001_20260525_001",
  "entered_at": "2026-05-25T10:30:05Z",
  "exited_at": "2026-05-25T10:35:20Z",
  "dwell_seconds": 315,
  "quality_flag": "complete",
  "created_at": "2026-05-25T10:35:20Z",
  "updated_at": "2026-05-25T10:35:20Z"
}
```

Validation rules:
- `session_id` deterministic from enter/exit pair when possible
- `track_id_hash` is salted/rotating hash, not persistent identity
- `dwell_seconds` non-negative, calculated from enter/exit times
- `quality_flag`: `complete`, `missing_exit`, `estimated`, `invalid`
- No personal identity or persistent tracking

## Trajectory Event Schema

Source: `trajectory_event` table

```json
{
  "event_id": "traj_floor01_20260525_001",
  "mall_id": "mall_demo_001",
  "floor_id": "floor_01",
  "track_id_hash": "hash_salt_track001",
  "occurred_at": "2026-05-25T10:30:10Z",
  "node_from": "node_entrance_a",
  "node_to": "node_store_001",
  "x": 0.45,
  "y": 0.32,
  "retention_expires_at": "2026-06-01T10:30:10Z",
  "created_at": "2026-05-25T10:30:10Z"
}
```

Validation rules:
- `event_id` must be unique
- `mall_id`, `floor_id` must reference existing configurations
- `track_id_hash` is short-retention anonymized hash
- `x`, `y` normalized coordinates (0-1) for temporary aggregation only
- `retention_expires_at` must be set for privacy compliance
- APIs expose aggregate flows only, not individual trajectories

## Heatmap Event Schema

Source: `heatmap_event` table

```json
{
  "event_id": "heat_floor01_20260525_1030_001",
  "mall_id": "mall_demo_001",
  "floor_id": "floor_01",
  "cell_x": 5,
  "cell_y": 3,
  "intensity": 12.5,
  "occurred_at": "2026-05-25T10:30:00Z",
  "created_at": "2026-05-25T10:30:00Z"
}
```

Validation rules:
- `event_id` must be unique
- `mall_id`, `floor_id` must reference existing configurations
- `cell_x`, `cell_y` are grid cell indices
- `intensity` non-negative numeric value
- Used for spatial density aggregation only

## AI Service Output Contract

The AI service must emit events in this order:

```text
1. person_detection_event (per frame)
2. store_enter_event / store_exit_event (line crossing)
3. trajectory_event (multi-camera correlation)
4. heatmap_event (grid aggregation)
5. store_visit_session (enter/exit correlation)
```

Each event must include:
- Unique `event_id` for idempotency
- Model audit fields (`model_name`, `model_version`, `model_license`)
- Confidence score bounded 0-1
- UTC timestamp
- No personal identifiable information

## Validation Rules Summary

| Rule | Enforcement |
| --- | --- |
| No face images | Schema excludes raw frame fields |
| No personal identity | Only anonymized track IDs and hashes |
| No phone/member IDs | Schema excludes personal identifier fields |
| UTC timestamps | All datetime fields in UTC |
| Idempotency | Unique `event_id` prevents duplicate processing |
| Confidence bounds | Decimal 0-1 validation |
| Model audit | Required model name, version, license fields |
| Retention expiry | Trajectory events require `retention_expires_at` |

## Integration Points

Future AI service integration requires:

```text
event schema validation before database insertion
model audit field population from AI service configuration
confidence threshold filtering per event type
track ID anonymization per camera session
retention policy enforcement for trajectory events
aggregate statistics recalculation after event ingestion
```

## Privacy And Compliance

```text
no raw video frames stored
no face images or biometric data
no persistent person tracking across sessions
no personal identifiers in API responses
aggregate statistics only exposed to clients
trajectory data shortest retention and anonymized
```

## Next Step

P6-I1 continues with synthetic fixture validation boundary documentation. The AI event schema must not be implemented until AI service, model, dataset, and video fixture boundaries are reviewed and confirmed.