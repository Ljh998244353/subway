# P7 F1 Synthetic 2D Floorplan Prompt

Updated: 2026-05-28

## 1. Purpose

This document archives the approved prompt for generating a large, detailed, synthetic F1 shopping-mall floorplan that can later carry heatmaps, flow lines, alerts, store scoring, and operational overlays.

This prompt is for a code/SVG/CAD-style generation agent, not a text-to-image poster workflow.

## 2. Boundary

Use this prompt only under these constraints:

```text
single floor only: F1
synthetic/original plan only
strongly reference real mall planning logic, but do not copy any real project plan
no real mall floor plans, BIM/CAD, maps, brands, logos, or tenant names
vector-first, overlay-friendly, architecture-plan style
```

## 3. Approved Master Prompt

```text
[ROLE]
You are an Architectural Drafting Specialist, Mall Leasing Plan Designer, and SVG Floorplan Generator.
Your task is to generate a highly detailed, fully synthetic, vector-first F1 shopping mall floorplan for a digital twin system.

[PRIMARY_GOAL]
Create one large, clean, editable, high-detail F1 floor plan of a modern urban box-type shopping mall.
The output must feel like a professional mall leasing plan / architectural floor plan rather than a decorative illustration.
The plan must be suitable as a base layer for future overlays such as:
- pedestrian flow lines
- heatmaps
- alert markers
- store score highlights
- operational annotations

[LEGAL_AND_REFERENCE_BOUNDARY]
Important:
- The floor plan must be fully original and synthetic.
- You may strongly reference the spatial logic of publicly seen real shopping malls, but do not replicate any identifiable real project.
- Do not use any real mall name, real tenant name, real brand logo, real project geometry, or exact copied plan structure.
- Use fictional store names or anonymous unit IDs only.

[BUILDING_ARCHETYPE]
- Building type: large urban enclosed shopping mall
- Floor: F1 main arrival level
- Overall planning logic: city-box shopping center
- Spatial character: modern, high-circulation, commercially realistic, premium but practical
- Base massing: mostly rectangular outer shell with a few controlled chamfers or rounded corners
- Interior core: one central atrium
- Atrium shape: rounded rectangle / capsule / soft oval, architecturally clean
- Circulation pattern: atrium ring corridor plus perimeter retail band plus several cross-connections
- Entry logic: at least 2 major public entrances and 1-2 secondary entrances

[PLAN_SCALE_AND_OUTPUT_STYLE]
- Vector-first drafting style
- Think in terms of SVG / CAD / leasing-plan output
- Large canvas with high zoom tolerance
- Prioritize clean line hierarchy and editability over decorative rendering
- White or very light gray background
- Minimal, restrained color fills only where needed for zoning clarity
- Keep large clear public-space zones readable for later overlay systems

[SPATIAL_PROGRAM]
The plan must include all major first-floor mall elements that a real commercial complex would contain:

1. Public circulation
- central atrium
- ring corridor around atrium
- perimeter public corridor sections
- widened entrance lobby zones
- several decision nodes / junctions

2. Vertical transportation
- at least 2 pairs/groups of escalators
- customer elevator core
- at least 1 service / freight elevator or back-of-house lift zone
- escalators placed near the atrium or key traffic nodes

3. Public facilities
- male restroom
- female restroom
- accessible restroom
- mother-and-baby room or family room
- information/service desk
- seating/rest nodes
- wayfinding/guide point

4. Safety and support
- fire stairs / egress stairs
- service corridor or BOH links in reasonable locations
- electrical / equipment / janitor / utility rooms in simplified plan form
- back-of-house doors where appropriate

5. Retail structure
- anchor stores at corners or endcaps
- mid-size inline stores along main corridors
- smaller boutique stores near entrances and atrium fronts
- a few food/beverage or cafe units at corners and high-visibility nodes

[STORE_GEOMETRY_RULES]
Store shapes must not be monotonous.
Use a realistic mix of:
- rectangular shops
- shallow trapezoid shops
- corner units
- curved-edge units facing atrium
- larger anchor boxes

However:
- all units must remain architecturally plausible
- no chaotic fragmentation
- no random polygon collage
- every store should clearly face a public corridor
- avoid dead-end units with no commercial frontage

[F1_BUSINESS_LOGIC]
Because this is F1, arrange the program with realistic first-floor logic:
- primary entrances connect to wider lobby-like retail frontage
- high-visibility branded flagship-like units near major entrances
- atrium-facing stores are premium display positions
- cafes / dessert / convenience / service units can sit at corners and traffic pauses
- anchors stabilize corners or terminal ends
- corridors must feel commercially legible and easy to route through

[DRAWING_LANGUAGE]
Render the plan like a professional leasing or architectural diagram:
- outer wall lines = strongest
- public-space boundary lines = medium-strong
- tenant split lines = medium/fine
- facility internal partitions = fine
- doors, openings, restroom fixture hints, stair cores, escalator outlines, elevator shafts must be clear
- atrium edge / balustrade line must be readable
- entrances must be obvious

[LABELING_STRATEGY]
Structure-first, low-label-density output:
- include a few key labels only
- include zone names or anonymous unit IDs where useful
- do not flood the drawing with dense text
- do not place full merchandising or branding content
- preserve clean space for later digital twin overlays

[OVERLAY_COMPATIBILITY_REQUIREMENTS]
The drawing must be intentionally prepared for future spatial analytics overlays:
- corridors must remain visually continuous
- atrium void and ring circulation must be unmistakable
- transport nodes must be easy to locate
- stores must have clear boundaries for selection/highlight states
- leave enough open visual room for future flow curves, heat zones, alerts, and labels
- do not over-texture or over-shade the base layer

[VISUAL_TONE]
Style keywords:
- professional mall leasing plan
- clean architectural vector floorplan
- high-detail synthetic shopping mall layout
- premium commercial complex drafting
- restrained, realistic, plan-view only

[NEGATIVE_CONSTRAINTS]
Do not generate:
- any copied real mall plan
- any real project name or brand
- 3D perspective or axonometric view
- cartoon guide-map style
- overly colorful poster style
- fantasy geometry
- maze-like tiny fragmented shops everywhere
- missing toilets / missing escalators / missing stairs / fake mall logic
- excessive text labels
- unrealistic circulation bottlenecks

[SUCCESS_CRITERIA]
The final floor plan should:
- immediately read as a realistic F1 shopping mall plan
- clearly show atrium, corridors, stores, escalators, elevators, toilets, stairs, and service spaces
- feel detailed enough for later human-flow and heatmap overlays
- remain clean, scalable, and editable
- be original, synthetic, and legally safe for this project
```

## 4. Optional Short Adapter For Image Models

Only use this shortened adapter if a visual model preview is needed before vector implementation. The code/SVG master prompt above remains authoritative.

```text
Top-down professional architectural floor plan of a large modern enclosed shopping mall F1 level, synthetic original layout, central capsule-shaped atrium, ring corridor, anchor stores, varied shop shapes, escalators, elevators, toilets, service desk, fire stairs, back-of-house rooms, clean leasing-plan style, white background, fine line hierarchy, sparse labels, vector-like precision, realistic commercial circulation, no real brands, no copied real mall plan, no 3D perspective, no cartoon map style
```

## 5. Acceptance Checklist

The generated result is acceptable only if:

```text
it reads as F1 of a realistic shopping mall
the plan is original rather than an obvious copy of a real mall
atrium, corridors, escalators, elevators, restrooms, stairs, and service rooms are all present
storefronts face circulation and are not all the same shape
the drawing stays sparse enough for future overlays
no real brands, project names, or unauthorized floorplan features appear
```

## 6. Recommended Next Use

The next implementation increment should convert this prompt into one project-owned large SVG floorplan for `F1`, then remap the current synthetic store, heat, and flow coordinates onto that new base layer.
