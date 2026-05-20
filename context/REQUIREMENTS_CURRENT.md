# Requirements Current

Updated: 2026-05-20

## Current Scope

The first delivery remains an auditable course-project demo and engineering baseline:

```text
operations overview
digital twin view
store analysis
customer profile aggregates
store alerts
backend synthetic API contract
typed frontend API client
MySQL data-model baseline
quality and handoff gates
```

## Current Non-Goals

```text
real mall production launch
real monitoring stream access
face recognition or identity recognition
individual trajectory display
high-precision BIM
complex leasing recommendation
multi-tenant SaaS
paid cloud services or paid APIs
real brand logos, merchant logos, real mall floor plans, real maps, or real BIM
```

## Compliance Red Lines

```text
no real monitoring footage
no face image storage
no personal trajectory display
no unauthorized mall floor plan
no real brands or merchant logos
no unknown-source model, dataset, image, video, font, or copied code
no paid development tool or paid cloud service without review
all assets, models, and dependencies must have traceable license records
```

## Current Handoff

P4-I16 closes CP4 as a synthetic backend/API/client contract baseline. P5-I1 added the API mode overview data loader while keeping mock mode as the default. P5-I2 should wire dashboard state to that loader without changing the default. Real MySQL, credentials, Docker Compose, real video, real mall material, real brands, face images, and personal trajectories remain blocked.
