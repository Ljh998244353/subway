# AI Algorithm State

Updated: 2026-05-25

## Current Status

`ai-services/` has been created with FastAPI application structure. OpenCV HOG person detector (Apache 2.0 license) is integrated for person detection. Synthetic video fixture generator is implemented for testing. No real video, monitoring footage, or external model weights are used.

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

## Planned Capabilities

```text
video ingestion (real video - requires human approval)
person detection (already implemented with OpenCV HOG)
tracking
ROI counting
line-crossing direction detection
event output (already implemented)
synthetic fixture validation (already implemented)
```

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

P6-I2 is complete. Next P6 increments could include:
- Integration with backend API endpoints
- Real video fixture testing (with approved sources)
- Performance optimization and model tuning
- Docker containerization

Real video integration, model optimization, and production deployment require their own human-confirmed gates.
