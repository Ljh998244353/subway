# AGENT.md

Compatibility entry: Claude Code reads [CLAUDE.md](CLAUDE.md) automatically. Other AI coding tools should read [AGENTS.md](AGENTS.md).

Current task card: `context/TODO_NEXT.md`.

## Lean Required Reading

```text
CLAUDE.md
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
```

Then read only the files named by the current task card or directly affected by the requested change. Read `AI_Schedule.md`, broad context files, license docs, API docs, or source files only when the current increment needs them.

## Fixed Constraints

```text
one small increment at a time
database is MySQL
current priority is premium synthetic 3D digital twin demo before real video/data integration
do not use real video, real mall material, BIM/CAD, real brands, face images, or personal trajectories
review license, cost, account, and data boundary before adding dependency, image, model, texture, font, asset, external service, or copied code
Python backend/ or ai-services/ must use project virtual environment
stop for human action when sudo is needed
update PROGRESS.md, context/*.md, and context/TODO_NEXT.md after completion
```

Current next increment: `P7-R7 Enterprise Next Digital Twin frontend rebuild review`. The active task is to stabilize the clean Next.js frontend after rollback, serve it for human review, and keep P7-R8 Blender model generation deferred until the frontend direction is approved.

Normal continuation command:

```text
请进行下一步
```
