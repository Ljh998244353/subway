# AI Algorithm State

Updated: 2026-05-25

## Current Status

`ai-services/` has not been created. No model weights, datasets, video ingestion, tracking pipeline, or AI validation fixture has been selected. P5-I11 closed CP5 frontend API-mode integration and prepared P6-I1 for documentation-only AI event schema and synthetic fixture boundary planning.

## Planned Capabilities

```text
video ingestion
person detection
tracking
ROI counting
line-crossing direction detection
event output
synthetic fixture validation
```

## Compliance Constraints

```text
no real monitoring footage
no face image storage
no personal trajectory display
no unknown-source model weights
no unclear-license datasets
```

## Audit Fields Required Later

```text
model name
model version
license
thresholds
input source
output schema
FPS
accuracy or validation notes
limitations
```

## Next Step

P6-I1 should define AI event schema and synthetic fixture validation boundaries only. It must not create `ai-services/`, select or download models/datasets, ingest real video, add dependencies, or call external AI services.
