#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();

const modes = new Set(["all", "docs", "compliance", "boundary", "frontend", "backend", "audit"]);
const mode = process.argv[2] ?? "all";

if (!modes.has(mode)) {
  fail(`Unknown quality gate mode: ${mode}`);
}

const requiredFiles = [
  "AGENTS.md",
  "AGENT.md",
  "README.md",
  "AI_Schedule.md",
  "IMPORTANT.md",
  "PROGRESS.md",
  "PRODUCT.md",
  "DESIGN.md",
  "package.json",
  "scripts/quality-gate.mjs",
  "pyproject.toml",
  ".github/workflows/ci.yml",
  "docs/THIRD_PARTY_NOTICES.md",
  "docs/LICENSE_AUDIT.md",
  "docs/PRD_v1.md",
  "docs/REQUIREMENTS_ANALYSIS.md",
  "docs/SYSTEM_DESIGN.md",
  "docs/TEST_STRATEGY.md",
  "docs/QUALITY_GATE.md",
  "docs/FRONTEND_DEMO_HANDOFF.md",
  "docs/ENGINEERING_QUALITY_GATES.md",
  "docs/CI_PLAN.md",
  "docs/DEPLOYMENT_PLAN.md",
  "docs/CP4_CLOSURE_REVIEW.md",
  "docs/MYSQL_READINESS_PLAN.md",
  "docs/API_CONTRACT.md",
  "docs/DATA_MODEL.md",
  "docs/design/SCREEN_LAYOUTS.md",
  "docs/design/DESIGN_TOKENS.md",
  "docs/design/UI_SPEC.md",
  "docs/design/COMPONENT_SPEC.md",
  "docs/design/CHART_SPEC.md",
  "docs/design/INTERACTION_SPEC.md",
  "docs/design/DESIGN_REVIEW_CHECKLIST.md",
  "context/PROJECT_STATE.md",
  "context/REQUIREMENTS_CURRENT.md",
  "context/ARCHITECTURE_CURRENT.md",
  "context/DATA_MODEL_CURRENT.md",
  "context/API_CONTRACT_CURRENT.md",
  "context/FRONTEND_STATE.md",
  "context/BACKEND_STATE.md",
  "context/AI_ALGORITHM_STATE.md",
  "context/TEST_STATE.md",
  "context/DEPLOYMENT_STATE.md",
  "context/DECISIONS_LOG.md",
  "context/RISKS_AND_ASSUMPTIONS.md",
  "context/TODO_NEXT.md",
  "backend/README.md",
  "backend/requirements.txt",
  "backend/requirements.lock.txt",
  "backend/app/main.py",
  "backend/app/api/routes/health.py",
  "backend/app/api/routes/overview.py",
  "backend/app/api/routes/reference.py",
  "backend/app/core/config.py",
  "backend/app/core/errors.py",
  "backend/app/core/trace.py",
  "backend/app/fixtures/overview.py",
  "backend/app/fixtures/reference.py",
  "backend/app/db/metadata.py",
  "backend/app/schemas/common.py",
  "backend/app/schemas/health.py",
  "backend/app/schemas/overview.py",
  "backend/app/schemas/reference.py",
  "backend/alembic.ini",
  "backend/migrations/README.md",
  "backend/migrations/env.py",
  "backend/migrations/script.py.mako",
  "backend/migrations/versions/20260519_0001_initial_schema.py",
  "backend/tests/test_health.py",
  "backend/tests/test_migrations.py",
  "backend/tests/test_overview_api.py",
  "backend/tests/test_reference_api.py",
  "skills/mall-vision-ai-delivery/SKILL.md",
  "skills/mall-vision-ai-delivery/agents/openai.yaml",
  "frontend/package.json",
  "frontend/package-lock.json",
  "frontend/src/App.tsx",
  "frontend/src/api/apiMode.ts",
  "frontend/src/api/overviewDataLoader.ts",
  "frontend/src/api/overviewDataLoader.test.ts",
  "frontend/src/api/storeAnalysisDataLoader.ts",
  "frontend/src/api/storeAnalysisDataLoader.test.ts",
  "frontend/src/api/referenceClient.ts",
  "frontend/src/api/referenceClient.test.ts",
  "frontend/src/components/AppShell.tsx",
  "frontend/src/components/MotionSurface.tsx",
  "frontend/src/components/FloorPlan.tsx",
  "frontend/src/components/TwinInspector.tsx",
  "frontend/src/routes/demoFlow.ts",
  "frontend/src/routes/demoFlow.test.ts",
  "frontend/src/routes/demoReadiness.test.ts",
  "frontend/src/routes/routeConfig.test.ts",
  "frontend/src/mock/mockOverview.ts",
  "frontend/src/mock/mockData.test.ts",
  "frontend/src/types/domain.ts",
  "frontend/src/pages/DashboardPage.tsx",
  "frontend/src/pages/DashboardPage.test.ts",
  "frontend/src/pages/dashboardOverviewState.ts",
  "frontend/src/pages/StoreAnalysisPage.tsx",
  "frontend/src/pages/StoreAnalysisPage.test.ts",
  "frontend/src/pages/storeAnalysisState.ts",
  "frontend/src/pages/StoreAlertsPage.tsx",
  "frontend/src/pages/StoreAlertsPage.test.ts",
  "frontend/src/pages/DigitalTwinPage.tsx",
  "frontend/src/pages/DigitalTwinPage.test.ts",
  "frontend/src/pages/CustomerProfilePage.tsx",
  "frontend/src/pages/CustomerProfilePage.test.ts",
  "frontend/src/styles/responsiveChecks.test.ts",
  "slides/project-intro.typ",
  "slides/slide.pdf"
];

const complianceChecks = [
  {
    name: "privacy and material red lines",
    pattern:
      "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费",
    targets: ["docs", "context", "IMPORTANT.md", "README.md"]
  },
  {
    name: "engineering and handoff rules",
    pattern:
      "P3-I2|P3-I3|P3-I4|P4-I1|quality gate|质量门禁|CI|GitHub Actions|Gitee|Docker Compose|部署文档|健康检查|环境变量|MySQL|sudo|虚拟环境|请进行下一步",
    targets: [
      "AGENT.md",
      "README.md",
      "PROGRESS.md",
      "context/TODO_NEXT.md",
      "docs/ENGINEERING_QUALITY_GATES.md",
      "docs/CI_PLAN.md"
    ]
  },
  {
    name: "license and cost tracking",
    pattern: "THIRD_PARTY_NOTICES|LICENSE_AUDIT|付费工具|许可证|真实商场资料|外部服务",
    targets: ["AGENT.md", "README.md", "IMPORTANT.md", "docs", "context"]
  }
];

const stableComplianceChecks = [
  {
    name: "privacy and material red lines",
    pattern: "real monitoring|real video|real mall|face images|personal trajectories|paid",
    targets: ["docs", "context", "IMPORTANT.md", "README.md"]
  },
  {
    name: "engineering and handoff rules",
    pattern:
      "P3-I2|P3-I3|P3-I4|P4-I1|P4-I2|P4-I3|P4-I4|quality gate|CI|GitHub Actions|Gitee|Docker Compose|deployment documentation|health check|environment variables|MySQL|sudo|virtual environment|请进行下一步",
    targets: [
      "AGENT.md",
      "README.md",
      "PROGRESS.md",
      "context/TODO_NEXT.md",
      "docs/ENGINEERING_QUALITY_GATES.md",
      "docs/CI_PLAN.md"
    ]
  },
  {
    name: "license and cost tracking",
    pattern: "THIRD_PARTY_NOTICES|LICENSE_AUDIT|license|paid tool|real mall material|external service",
    targets: ["AGENT.md", "README.md", "IMPORTANT.md", "docs", "context"]
  }
];

function main() {
  if (mode === "docs") {
    runDocsCheck();
    return;
  }
  if (mode === "compliance") {
    runComplianceCheck();
    return;
  }
  if (mode === "boundary") {
    runBoundaryCheck();
    return;
  }
  if (mode === "frontend") {
    runFrontendGate();
    return;
  }
  if (mode === "backend") {
    runBackendGate();
    return;
  }
  if (mode === "audit") {
    runAuditGate();
    return;
  }

  runDocsCheck();
  runComplianceCheck();
  runBoundaryCheck();
  runFrontendGate();
  runBackendGate();
}

function runDocsCheck() {
  heading("docs");
  const missing = requiredFiles.filter((file) => !existsSync(join(rootDir, file)));
  if (missing.length > 0) {
    fail(`Missing required files:\n${missing.map((file) => `  - ${file}`).join("\n")}`);
  }
  ok(`checked ${requiredFiles.length} required files`);
  runAgentsEntryCheck();
  runTaskCardCheck();
  runDeploymentPlanCheck();
  runP4BaselineCheck();
}

function runComplianceCheck() {
  heading("compliance");
  for (const check of stableComplianceChecks) {
    assertPatternExists(check);
  }
}

function runBoundaryCheck() {
  heading("boundary");
  const blockedDirs = ["ai-services", "infra"];
  const found = blockedDirs.filter((dir) => existsSync(join(rootDir, dir)));
  if (found.length > 0) {
    fail(`Current increment must not create these root directories yet: ${found.join(", ")}`);
  }
  ok("backend/ and backend/migrations/ are allowed for P4; no ai-services/ or infra/ directory at the repository root");
}

function runFrontendGate() {
  heading("frontend");
  runCommand("npm", ["--prefix", "frontend", "run", "lint"], {
    label: "frontend lint"
  });
  runCommand("npm", ["--prefix", "frontend", "run", "test"], {
    label: "frontend tests"
  });
  runCommand("npm", ["--prefix", "frontend", "run", "build"], {
    label: "frontend production build"
  });
}

function runAuditGate() {
  heading("audit");
  runCommand("npm", ["--prefix", "frontend", "audit", "--audit-level=high"], {
    label: "frontend high-severity npm audit"
  });
}

function runCommand(command, args, options = {}) {
  const label = options.label ?? [command, ...args].join(" ");
  console.log(`\n> ${label}`);
  const result =
    process.platform === "win32"
      ? spawnSync([command, ...args].join(" "), {
          cwd: rootDir,
          stdio: "inherit",
          shell: true
        })
      : spawnSync(command, args, {
          cwd: rootDir,
          stdio: "inherit"
        });
  if (result.status !== 0) {
    fail(`${label} failed with exit code ${result.status ?? "unknown"}`);
  }
}

function runBackendGate() {
  heading("backend");
  const python = process.platform === "win32" ? "backend\\.venv\\Scripts\\python.exe" : "backend/.venv/bin/python";
  if (!existsSync(join(rootDir, python))) {
    fail(`Missing backend virtual environment Python: ${python}`);
  }
  runCommand(python, ["-m", "pytest", "backend/tests"], {
    label: "backend pytest"
  });
}

function heading(name) {
  console.log(`\n== ${name} ==`);
}

function ok(message) {
  console.log(`ok: ${message}`);
}

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function assertPatternExists(check) {
  const files = collectTargetFiles(check.targets);
  const matcher = new RegExp(check.pattern, "u");
  const matchedFile = files.find((file) => matcher.test(readTextFile(file)));

  if (!matchedFile) {
    fail(`Compliance check failed: ${check.name}`);
  }

  ok(`${check.name} found in ${relativePath(matchedFile)}`);
}

function runDeploymentPlanCheck() {
  const file = "docs/DEPLOYMENT_PLAN.md";
  const text = readTextFile(join(rootDir, file));
  const stableRequirements = [
    {
      name: "P3-I4 increment metadata",
      patterns: ["P3-I4", "DevOps Mode", "Docker Compose"]
    },
    {
      name: "future service boundaries",
      patterns: ["frontend", "backend", "mysql", "redis", "ai-services", "worker"]
    },
    {
      name: "configuration and health boundaries",
      patterns: ["environment variables", "secrets", "health checks", "/api/v1/health"]
    },
    {
      name: "compliance and platform boundaries",
      patterns: ["MySQL", "sudo", "GitHub Actions", "Gitee", "real monitoring", "personal trajectories"]
    },
    {
      name: "documentation-first decision",
      patterns: ["do not create `docker-compose.yml`", "not a runnable Compose", "THIRD_PARTY_NOTICES"]
    }
  ];

  assertTextRequirements("Deployment plan check", stableRequirements, text);
  ok("deployment plan records service boundaries, health checks, compliance, and handoff");
  return;

  const requirements = [
    {
      name: "P3-I4 increment metadata",
      patterns: ["P3-I4", "DevOps Mode", "Docker Compose"]
    },
    {
      name: "future service boundaries",
      patterns: ["frontend", "backend", "mysql", "redis", "ai-services", "worker"]
    },
    {
      name: "configuration and health boundaries",
      patterns: ["环境变量", "secrets", "健康检查", "/api/v1/health"]
    },
    {
      name: "compliance and platform boundaries",
      patterns: ["MySQL", "sudo", "GitHub Actions", "Gitee", "真实监控", "个人轨迹"]
    },
    {
      name: "documentation-first decision",
      patterns: ["不创建 `docker-compose.yml`", "尚未创建真实 Compose", "无需更新 `docs/THIRD_PARTY_NOTICES.md`"]
    }
  ];

  for (const requirement of requirements) {
    const missing = requirement.patterns.filter((pattern) => !text.includes(pattern));
    if (missing.length > 0) {
      fail(
        `Deployment plan check failed: ${requirement.name}; missing ${missing
          .map((pattern) => `"${pattern}"`)
          .join(", ")}`
      );
    }
  }

  ok("deployment plan records service boundaries, health checks, compliance, and handoff");
}

function runP4BaselineCheck() {
  const apiText = readTextFile(join(rootDir, "docs/API_CONTRACT.md"));
  const dataText = readTextFile(join(rootDir, "docs/DATA_MODEL.md"));

  const apiRequirements = [
    {
      name: "P4-I1 metadata",
      patterns: ["P4-I1", "Backend Mode", "baseline candidate"]
    },
    {
      name: "API contract basics",
      patterns: ["/api/v1", "/api/v1/health", "traceId", "Response Envelope", "Error Codes"]
    },
    {
      name: "security and privacy boundaries",
      patterns: ["RBAC", "admin", "operator", "leasing", "security", "readonly", "No endpoint may return face images"]
    },
    {
      name: "contract test plan",
      patterns: ["OpenAPI", "Pydantic", "contract tests", "Freeze Gate"]
    }
  ];

  const dataRequirements = [
    {
      name: "P4-I1 data metadata",
      patterns: ["P4-I1", "MySQL", "baseline candidate"]
    },
    {
      name: "core tables",
      patterns: ["mall", "floor", "store", "camera", "store_alert", "operation_log"]
    },
    {
      name: "event and idempotency rules",
      patterns: ["person_detection_event", "store_enter_event", "store_exit_event", "event_id", "idempotency"]
    },
    {
      name: "data quality and privacy",
      patterns: ["UTC", "Retention Policy", "no face images", "Migration And Test Plan", "Freeze Gate"]
    }
  ];

  assertTextRequirements("P4 API baseline check", apiRequirements, apiText);
  assertTextRequirements("P4 data model baseline check", dataRequirements, dataText);
  ok("P4 baseline records API contract, MySQL data model, RBAC, privacy, and test gates");
}

function runAgentsEntryCheck() {
  const text = readTextFile(join(rootDir, "AGENTS.md"));
  const stableRequirements = [
    {
      name: "standard agent entry",
      patterns: ["AI coding", "context/TODO_NEXT.md", "P5-I5"]
    },
    {
      name: "hard rules",
      patterns: ["MySQL", "sudo", "license", "real video", "After every increment"]
    },
    {
      name: "human workflow",
      patterns: ["请进行下一步", "Human confirmation gates", "quality gate"]
    }
  ];

  assertTextRequirements("AGENTS.md check", stableRequirements, text);
  ok("AGENTS.md records standard entry rules, human workflow, and quality gates");
  return;

  const requirements = [
    {
      name: "standard agent entry",
      patterns: ["AI coding", "context/TODO_NEXT.md", "P4-I3"]
    },
    {
      name: "hard rules",
      patterns: ["MySQL", "sudo", "许可证", "真实视频", "完成增量后"]
    },
    {
      name: "human workflow",
      patterns: ["请进行下一步", "关键节点", "质量门禁"]
    }
  ];

  assertTextRequirements("AGENTS.md check", requirements, text);
  ok("AGENTS.md records standard entry rules, human workflow, and quality gates");
}

function runTaskCardCheck() {
  const text = readTextFile(join(rootDir, "context/TODO_NEXT.md"));
  const stableRequirements = [
    {
      name: "task card metadata",
      patterns: ["Task Card", "Increment:", "Primary role:", "Human command:"]
    },
    {
      name: "scope boundaries",
      patterns: ["Goal", "Non-goals", "Required Reading", "Deliverables"]
    },
    {
      name: "acceptance and confirmation",
      patterns: ["Acceptance Checks", "Human Confirmation Gates", "npm run quality", "npm run quality:audit"]
    },
    {
      name: "P5-I5 store alerts API mode focus",
      patterns: ["P5-I5", "API mode", "mock mode", "StoreAlertsPage", "listStoreAlerts", "quality gate"]
    }
  ];

  assertTextRequirements("TODO task card check", stableRequirements, text);
  ok("context/TODO_NEXT.md records a complete executable task card");
  return;

  const requirements = [
    {
      name: "task card metadata",
      patterns: ["Task Card", "Increment:", "Primary role:", "Human command:"]
    },
    {
      name: "scope boundaries",
      patterns: ["Goal", "Non-goals", "Required Reading", "Deliverables"]
    },
    {
      name: "acceptance and confirmation",
      patterns: ["Acceptance Checks", "Human Confirmation Gates", "npm run quality", "npm run quality:audit"]
    },
    {
      name: "P4-I3 backend migration focus",
      patterns: ["P4-I3", "MySQL", "Alembic", "SQLAlchemy", "质量门禁"]
    }
  ];

  assertTextRequirements("TODO task card check", requirements, text);
  ok("context/TODO_NEXT.md records a complete executable task card");
}

function assertTextRequirements(label, requirements, text) {
  for (const requirement of requirements) {
    const missing = requirement.patterns.filter((pattern) => !text.includes(pattern));
    if (missing.length > 0) {
      fail(
        `${label} failed: ${requirement.name}; missing ${missing
          .map((pattern) => `"${pattern}"`)
          .join(", ")}`
      );
    }
  }
}

function collectTargetFiles(targets) {
  const files = [];

  for (const target of targets) {
    const absoluteTarget = join(rootDir, target);
    if (!existsSync(absoluteTarget)) {
      fail(`Compliance target does not exist: ${target}`);
    }
    files.push(...walkTextFiles(absoluteTarget));
  }

  return files;
}

function walkTextFiles(path) {
  const stat = statSync(path);
  if (stat.isFile()) {
    return [path];
  }
  if (!stat.isDirectory()) {
    return [];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const childPath = join(path, entry.name);
    if (entry.isDirectory() && shouldSkipDirectory(entry.name)) {
      return [];
    }
    if (entry.isDirectory()) {
      return walkTextFiles(childPath);
    }
    if (entry.isFile() && isTextLikeFile(entry.name)) {
      return [childPath];
    }
    return [];
  });
}

function shouldSkipDirectory(name) {
  return new Set([".git", "node_modules", "dist", "build", "coverage"]).has(name);
}

function isTextLikeFile(name) {
  return /\.(cjs|css|html|js|json|md|mjs|ts|tsx|txt|vue|ya?ml)$/u.test(name);
}

function readTextFile(file) {
  return readFileSync(file, "utf8");
}

function relativePath(file) {
  return file.replace(`${rootDir}/`, "");
}

main();
