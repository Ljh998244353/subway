# AI Algorithm State

Updated: 2026-05-25

## Current Status

`ai-services/` has been created with FastAPI application structure. OpenCV HOG person detector (Apache 2.0 license) is integrated for person detection. Synthetic video fixture generator is implemented for testing. No real video, monitoring footage, or external model weights are used.

P6-R1 changed the roadmap priority: further real video, RTSP, model tuning, backend ingestion, and containerization are no longer the default next step. The next major workstream is the premium synthetic 3D digital twin demo.

## Implemented Capabilities

```text
ai-services/ directory structure with FastAPI
OpenCV HOG person detector (Apache 2.0, no external weights)
Synthetic video fixture generator (MIT license)
Person detection event output
Store entry/exit event processing
Event schema validation
20 tests passing
```

## Planned Capabilities, Deferred

```text
video ingestion with real video - requires human approval
tracking
ROI counting
line-crossing direction detection
backend event ingestion
containerization
model optimization
```

These are deferred while P7 builds the synthetic 3D digital twin demo.

## Documented Schema

P6-I1 added:

```text
docs/AI_EVENT_SCHEMA.md - AI event output schema for anonymous aggregate mall events
docs/SYNTHETIC_FIXTURE_VALIDATION.md - synthetic fixture validation boundary and rules
```

## Model Information

```text
model name: opencv_hog_person_detector
model version: 4.13.0
license: Apache 2.0
type: Built-in HOG descriptor (no external weights required)
```

## Compliance Constraints

```text
no real monitoring footage
no face image storage
no personal trajectory display
no unknown-source model weights
no unclear-license datasets
```

## Audit Fields

```text
model name: opencv_hog_person_detector
model version: 4.13.0
license: Apache 2.0
thresholds: configurable confidence threshold (default 0.5)
input source: synthetic video fixtures (no real video)
output schema: documented in AI_EVENT_SCHEMA.md
FPS: configurable (default 30)
accuracy or validation notes: HOG detector suitable for pedestrian detection
limitations: may not detect persons in unusual poses or occluded
```

## Next Step

P7-I3 completed a minimal audited frontend WebGL/Three.js scene shell. P7-I4 should continue frontend synthetic scene adapter and interaction work. Do not resume real video integration unless a future task card explicitly changes the priority and confirms required gates.
