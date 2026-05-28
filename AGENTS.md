# AGENTS.md

Standard entry for AI coding tools. Current task card: `context/TODO_NEXT.md`. Long roadmap: `AI_Schedule.md`.

## Context Recovery

Read only the authority set first:

```text
AGENTS.md
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
```

Then open the minimum working set named by the task card or directly affected by the requested change. Do not front-load all `context/`, `docs/`, frontend, backend, or roadmap files unless the task or a failing check requires them.

## Hard Rules

1. Complete one small increment at a time.
2. Restore context before editing files.
3. Use MySQL for database planning, migrations, connection strings, and future containers.
4. Add tests or executable checks with every API, data model, business logic, frontend state, or rendering contract change.
5. Review license, cost, account, and data boundary before adding any dependency, image, model, texture, font, asset, external service, or copied code.
6. Do not use unapproved real video, real mall material, BIM/CAD, real brands/logos, face images, personal trajectories, external asset APIs, downloaded models/textures, or production data.
7. Python `backend/` and future `ai-services/` work must use a project virtual environment.
8. If `sudo`, system package installation, service management, or privilege escalation is needed, stop and ask the human to run it.
9. GitHub Actions runs only on GitHub. A Gitee mirror does not run `.github/workflows/ci.yml` automatically.
10. After every increment, update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.

## Human Workflow

- Normal continuation: user enters `请进行下一步`; AI completes one increment from `context/TODO_NEXT.md`.
- Human confirmation gates: API contract freeze, MySQL core schema freeze, new dependencies/images/external services, P7-R8 Blender model generation, switching to real MySQL, real data/material access, real AI service, or production deployment.
- quality gate: run the relevant subset, and prefer `npm run quality` plus `npm run quality:audit` when feasible.

## Cleanup Rule

Keep current context lean:

```text
TODO_NEXT.md = one next task only
PROGRESS.md = current snapshot + last 3 increments + milestone summary
context/* = current facts, not full history
```
