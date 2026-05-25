# P7 Premium UI/UX Redesign Plan

Updated: 2026-05-25

## 1. Purpose

This document stores the complete local UI/UX strategy for the P7 frontend redesign. The goal is not a minor polish pass. P7 should reshape the product into a premium, grand, refined, elegant, and modern operational digital-twin interface, with visual quality treated as the top priority.

This plan is intentionally allowed to make large frontend changes. Existing layouts, page composition, card density, navigation, and visual language may be substantially rewritten if that improves the final demonstration quality.

## 2. External inspiration reviewed

Web research focused on award/high-end UI references, data visualization galleries, and 3D operations dashboard case studies. Some pages could not be fetched directly by the local fetch tool due domain verification restrictions, so this plan uses available search-result metadata plus general design synthesis rather than copying external content.

Reference categories:

| Reference | What to learn | How to apply without copying |
| --- | --- | --- |
| Awwwards dashboard examples | Premium composition, large hero surfaces, confident spacing, strong hierarchy | Use a cinematic digital-twin stage with purposeful data panels instead of equal-weight cards everywhere |
| Awwwards data-visualization examples | Data storytelling, expressive visual systems, animated focus transitions | Convert raw metrics into layered spatial stories: mall status, crowd flow, alerts, store performance |
| 2026 UI/UX awards archives | Current premium web aesthetics and polished interaction craft | Use modern typography, tonal contrast, controlled motion, and high-detail states |
| 3D city operations dashboard case studies | Command-center pattern for spatial operations | Treat the 3D mall as the main operational object, with panels orbiting the scene rather than replacing it |
| Smart-city / digital-twin references | 3D model + sensor/operation overlays | Use separate layers for occupancy, heat, flow, alerts, scores, replay, and controls |
| UX Design Awards 3D workflow references | Professional spatial tooling, precision, feedback | Make selection, measurement, focus, and layer state unambiguous in the 3D twin |

Key takeaway: the target should feel like a high-end operations command center, not a standard admin dashboard with a 3D widget.

## 3. Design north star

P7 frontend should become:

```text
premium command center
cinematic 3D spatial interface
high-density but calm operational dashboard
large-screen demo ready
self-authored synthetic mall world
clear synthetic/demo-only boundary
```

Target feeling:

```text
grand
refined
elegant
modern
precise
calm under pressure
credible for operations review
beautiful enough for live demonstration
```

Anti-target:

```text
plain admin panel
generic SaaS template
marketing landing page
noisy cyberpunk dashboard
unreadable glassmorphism
random decoration without operational meaning
real mall clone
brand-logo imitation
```

## 4. Scope of the redesign

The redesign should cover the whole frontend experience, not only `/digital-twin`.

In scope:

```text
App shell
navigation
page headers
global filters
cards and panels
metric hierarchy
status language
charts and mini visualizations
empty/loading/error states
route transitions
/digital-twin 3D scene layout
store analysis page visual hierarchy
store alerts operations workflow
customer profile aggregate page
operations overview page
large-screen and 4K presentation mode
```

Allowed large changes:

```text
replace the current shell layout
rewrite CSS architecture and tokens
change page composition substantially
merge or split panels when useful
move navigation and global filters
redesign all cards, tables, and detail panels
introduce a new premium dark visual language
make /digital-twin the flagship experience
```

Still protected:

```text
mock mode remains default until explicitly changed
no real data or real mall materials
no unauthorized assets
no paid services or paid assets
no personal trajectories
route/test coverage must be updated with changes
```

## 5. Visual direction

### 5.1 Theme

Use the approved premium light command-center theme as the P7 mainline. Dark mode may remain a later presentation variant, but the default project layout should follow the `/style-preview` direction confirmed on 2026-05-25.

Base palette direction:

```text
background: cool anti-fatigue light gray #F4F6F9
surface: white / translucent white panels with subtle blur
primary accent: corporate technology blue #2F54EB
normal / safe flow: teal
warning / high heat: amber
critical / inefficiency: rose
text: high-contrast gray-900 with gray-500 secondary text
```

Rules:

```text
Use depth, clean glass surfaces, and precise borders rather than heavy decoration.
Use blue only for active state and primary action.
Use teal/amber/rose strictly for operational meaning.
Use gradients as data atmosphere: heat, flow, focus, not decoration.
Never rely on color alone for warnings.
Keep charts readable at 1920, 2560, and 3840 widths.
```

### 5.2 Layout personality

Current equal-card dashboard style should evolve into the approved function-oriented high-density three-column operations cockpit.

Approved flagship pattern:

```text
fullscreen h-screen / w-screen / overflow-hidden
top: 64px global command header
left: 400px sticky macro flow + merchant grading panel
center: flex primary interactive 3D digital twin workspace
right: 400px sticky heat metrics + operations alert stream
bottom inside center: 24h replay timeline / time scrubber
```

This layout is now the default direction for productizing the preview. Preserve the same information density, calm premium-light visual language, and direct operational hierarchy when moving from `/style-preview` into real project routes.

Recommended reusable shell pattern:

```text
left: macro flow / ranking / selected object summary
center: primary scene or primary work surface
right: contextual intelligence / alert decisions
bottom: timeline, replay, scenario controls, or compact status strip
top: global mall/time/data-mode controls
```

For non-3D pages, use:

```text
large page title with operational summary
hero metric row with fewer but stronger metrics
main analytic canvas
right-side decision panel
secondary tables below or in tabs
```

### 5.3 Typography

Use system-safe fonts already allowed unless a new font is explicitly audited.

Direction:

```text
large numeric metrics with tabular numbers
short uppercase labels for operational state
clear Chinese readability first
avoid thin low-contrast text
use size/weight hierarchy instead of excessive boxes
```

Recommended hierarchy:

| Role | Use |
| --- | --- |
| Display metric | live occupancy, risk index, conversion summary |
| Section heading | scene layers, alerts, store performance |
| Body | explanations and table content |
| Metadata | timestamps, source mode, confidence, synthetic labels |

### 5.4 Motion

Motion should feel expensive and restrained.

Use motion for:

```text
scene focus change
panel reveal and collapse
route transition
metric update pulse
alert escalation
replay timeline scrub
floor switch
store selection
```

Avoid:

```text
constant floating cards
unnecessary bounce
slow blocking transitions
motion that hides data changes
```

Motion rule: every animation must either orient the user, show causality, or emphasize operational change.

## 5A. Approved UI/UX prompt archive

The following prompt is the archived, reusable design brief for extending the confirmed preview into future pages and iterations.

```text
Role: Expert Frontend Engineer & Senior UI/UX Designer.
Task: Build a function-oriented Web UI for a Commercial Complex Visual AI Digital Twin Operating System.

Design philosophy:
- Function-oriented, high information density, clear visual hierarchy, low cognitive load.
- Premium light enterprise dashboard, closer to a next-generation Grafana/Linear-style operations cockpit than a generic admin panel.
- The digital twin is the main operational object, not decoration.

Theme:
- Global background: cool anti-fatigue light gray #F4F6F9.
- Panel/card surface: white or white/80 with backdrop blur, border-gray-100, subtle shadow.
- Primary text: gray-900; secondary: gray-500; muted: gray-400.
- Primary/active: #2F54EB with white text.
- Safe/normal: teal.
- Warning/high heat: amber.
- Critical/inefficiency: rose.
- Numbers use tabular/monospace styling for live-update alignment.

Layout:
- Fullscreen h-screen w-screen overflow-hidden flex/grid.
- Top: 64px global header with system title, active status dot, global view tabs, time/date, AI camera network status.
- Left: 400px sticky panel for macro traffic flow, conversion funnel, selected-store drilldown, merchant grading leaderboard.
- Center: flex-1 interactive 3D digital twin workspace with layer overlays.
- Center bottom: 24h replay time scrubber from 09:00 to 22:00.
- Right: 400px sticky panel for dwell/heat metrics, operational health, low-efficiency alert stream, dispatch actions.

Digital twin requirements:
- Replace static mock with a real interactive 3D model when productizing.
- Must support hierarchical clicking: mall -> floor -> zone -> store -> selected object details.
- Store click updates side panels with selected-store metrics and shows loading/transition feedback.
- Timeline scrub changes occupancy, heat intensity, flow paths, and alert state.
- Alerts can focus the affected spatial area and trigger operational dispatch feedback.
- Use synthetic, self-authored mall geometry and fictional store names unless real authorized assets are explicitly provided.

3D layer requirements:
- Base mall architecture and floor separation.
- Store blocks / tenant units with categories and score states.
- Crowd trajectories and directional flow paths.
- Spatial heatmap overlays.
- Floating labels/billboards with shop name and live occupancy.
- Alert hotspots with severity shape/color/text.
- Camera bookmarks and floor isolate/explode view.

Interaction requirements:
- Global tabs: 全局动线 / 热力分布 / 招商调铺 / 安全预警.
- Click store: focus camera, select store, update left detail panel.
- Click floor: isolate floor and update context.
- Toggle layers: smooth overlay transitions.
- Drag time scrubber: simulate live values and heatmap intensity changes.
- Click alert action: show success toast: 已成功向该区域巡检人员发送调度指令.

Quality rules:
- No placeholder rows in demo-critical panels.
- Dense but readable data; every visual element must map to operational meaning.
- Use restrained motion that explains state change.
- Keep synthetic/demo-only boundary visible.
- Must remain readable on 1920x1080, 2560x1440, and 3840x2160.
```

## 6. Flagship /digital-twin experience

The digital twin page should be the visual center of the product.

### 6.1 Target layout

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Global command bar: mall, time, scenario, data mode, demo controls          │
├─────────────┬──────────────────────────────────────────────┬───────────────┤
│ Mode rail   │ 3D mall scene / spatial operation stage       │ Insight panel │
│ floors      │ heat / flow / people / alert / score layers   │ selected obj  │
│ layers      │ camera controls and spatial labels            │ explanations  │
├─────────────┴──────────────────────────────────────────────┴───────────────┤
│ Replay timeline + crowd/event scenario controls                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 3D scene principles

```text
The 3D mall is the main interface, not a background illustration.
Every overlay must correspond to operational meaning.
Selection should immediately explain what changed.
The scene should support demo storytelling: normal day, peak hour, incident, recovery.
Use synthetic labels and fictional store names only.
```

Scene layers:

```text
base architecture
floor separation
store categories
occupancy heat
people / crowd particles
flow paths
alert hotspots
store score overlay
replay ghost trails
camera bookmarks
```

### 6.3 Spatial interaction

Minimum interaction model:

```text
click store -> focus camera + open insight panel
click floor -> isolate / explode floor view
switch layer -> smooth overlay transition
hover hotspot -> label + compact metric tooltip
select alert -> path to affected store + recommended action
scrub timeline -> replay heat/flow changes
change scenario control -> synthetic event feedback
```

### 6.4 Demo modes

The demo should support story presets:

```text
Calm Weekday
Lunch Peak
Weekend Surge
Anchor Store Campaign
Escalator Congestion
Low Conversion Alert
Incident Recovery
```

Each preset should control:

```text
crowd count
arrival distribution
destination popularity
dwell time
conversion behavior
incident level
alert intensity
replay duration
```

## 7. Whole-app redesign strategy

### 7.1 App shell

Replace utilitarian shell with a premium command shell.

New shell components:

```text
CommandBar: mall/time/scenario/data mode/status
ModeRail: routes, floor context, quick actions
PageStage: main work canvas
InsightDock: contextual detail and explanations
ReplayControlStrip: timeline and demo controls where relevant
```

### 7.2 Operations overview

Goal: executive-grade opening screen.

Changes:

```text
fewer, larger hero metrics
mall health score / risk index summary
mini spatial preview linking to digital twin
trend strips instead of many equal cards
alerts and recommendations as a decision queue
```

### 7.3 Store analysis

Goal: premium analytical workstation.

Changes:

```text
store ranking becomes visual leaderboard
selected store gets a large performance dossier
score breakdown becomes radial or layered visual module
flow/conversion trends become compact but polished charts
links into digital twin focus mode
```

### 7.4 Store alerts

Goal: incident command workflow.

Changes:

```text
alerts grouped by urgency and operational impact
right-side action/explanation panel
alert map/twin preview
clear state labels: new, investigating, monitoring, resolved
visual severity without relying only on red
```

### 7.5 Customer profile

Goal: anonymous aggregate insight room.

Changes:

```text
segment tiles with elegant density
time/floor/category preference matrix
privacy-safe language always visible
no individual-person metaphor
links to heatmap and aggregate flow views
```

## 8. Component system direction

Create or refactor toward these component families:

```text
CommandBar
ModeRail
MetricHero
SignalCard
GlassPanel
InsightDock
LayerToggleGroup
ScenarioControl
ReplayTimeline
TwinViewportShell
SpatialTooltip
StatusPill
RiskBadge
PremiumTable
DecisionQueue
```

Quality bar:

```text
consistent spacing scale
consistent radius and elevation
single accent logic
responsive at 1920/2560/3840 first, then tablet/mobile fallback
stateful components include loading/empty/error/synthetic labels
```

## 9. Data visualization strategy

Use data visualization as a premium product language.

Rules:

```text
Every chart must answer an operational question.
Use fewer chart types, but make them refined.
Prefer small multiples, slope trends, ranked bars, radial summary, and spatial overlays.
Do not create decorative charts that cannot be read.
Provide precise labels and time context.
```

Recommended visual modules:

```text
mall health score
occupancy trend ribbon
floor density matrix
store conversion leaderboard
alert severity queue
customer segment distribution
heatmap legend and layer opacity control
replay timeline with event pins
```

## 10. Large-screen and presentation mode

P7 should assume demos on 1920x1080, 2560x1440, and 3840x2160.

Presentation mode should:

```text
reduce navigation chrome
increase 3D scene area
show synthetic/demo-only watermark
show scenario name and time
keep key metrics visible
allow one-click route through demo story
```

## 11. Accessibility and readability

Premium does not mean inaccessible.

Rules:

```text
minimum contrast must remain readable in dark theme
keyboard focus must be visible
alerts use icon/text/shape plus color
motion should respect reduced-motion preferences where practical
small text must not be required for critical decisions
large-screen mode must not become tiny text spread over huge space
```

## 12. Implementation phases

### Phase A — P7-I1 design and technical foundation

Deliver:

```text
final 3D stack decision
module boundary for frontend/src/twin/
approved premium light UI redesign rules
motion/framer dependency baseline check
license/cost/account audit for candidate dependencies
```

3D implementation is now the next intended direction, but dependency and asset choices must be audited before adopting them.

### Phase B — Visual system refactor

Deliver:

```text
new dark premium design tokens
new app shell foundation
CommandBar / ModeRail / PageStage / InsightDock
updated shared panels, pills, metrics, table styling
route layout compatibility
```

### Phase C — Digital twin flagship shell

Deliver:

```text
TwinViewportShell
3D scene placeholder / later WebGL scene
layer controls
selection insight panel
replay strip shell
scenario control shell
```

### Phase D — 3D scene and synthetic model

Deliver:

```text
Blender-authored mall model or code-generated geometry baseline
Three.js/R3F scene
floor/store blocks
lighting/camera
picking/focus
```

### Phase E — Simulation overlays

Deliver:

```text
virtual people
flow particles
heatmap overlay
alert hotspots
score overlays
replay states
```

### Phase F — Full-page premium conversion

Deliver:

```text
overview redesign
store analysis redesign
alerts redesign
customer profile redesign
cross-page story flow
presentation mode
```

### Phase G — Final polish and demo gate

Deliver:

```text
4K review
performance budget
demo script
synthetic labels
QA checklist
handoff docs
```

## 13. Acceptance criteria

P7 frontend redesign is acceptable only if:

```text
/digital-twin is clearly the flagship premium experience
whole app no longer feels like a basic admin dashboard
visual hierarchy is stronger than the current implementation
large-screen demo looks intentional
synthetic/demo-only status is visible
core routes still work
mock mode remains default unless explicitly changed
no unauthorized real materials are used
new dependencies/assets are audited
quality gate passes
```

## 14. Risks and controls

| Risk | Control |
| --- | --- |
| Visual polish reduces readability | Use operational hierarchy and readability checks as hard gates |
| Dark theme becomes decorative | Every glow/layer must map to data state or spatial focus |
| 3D scene overwhelms workflow | Keep insight panel, layer controls, and replay controls clear |
| External inspiration becomes copying | Use references only for principles; self-author all UI, geometry, names, and assets |
| Asset/license creep | No unknown models, textures, icons, fonts, or plugins without audit |
| Performance drops | Add 3D budget and large-screen checks; progressive scene complexity |

## 15. Immediate next action

Before implementation, P7-I1 should turn this strategy into concrete technical decisions:

```text
confirm Three.js / R3F / Drei adoption or rejection
define frontend/src/twin/ boundaries
confirm animation dependency baseline
list first frontend visual-system files to refactor
add tests/checks for route/layout stability
record dependency/license decisions
```
