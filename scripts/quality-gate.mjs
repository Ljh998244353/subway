#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();

const modes = new Set(["all", "docs", "compliance", "boundary", "frontend", "audit"]);
const mode = process.argv[2] ?? "all";

if (!modes.has(mode)) {
  fail(`Unknown quality gate mode: ${mode}`);
}

const requiredFiles = [
  "AGENT.md",
  "README.md",
  "AI_Schedule.md",
  "IMPORTANT.md",
  "PROGRESS.md",
  "PRODUCT.md",
  "DESIGN.md",
  "package.json",
  "scripts/quality-gate.mjs",
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
  "skills/mall-vision-ai-delivery/SKILL.md",
  "skills/mall-vision-ai-delivery/agents/openai.yaml",
  "frontend/package.json",
  "frontend/package-lock.json",
  "frontend/src/App.tsx",
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
  "frontend/src/pages/StoreAnalysisPage.tsx",
  "frontend/src/pages/StoreAnalysisPage.test.ts",
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
    pattern: "P3-I2|P3-I3|quality gate|质量门禁|CI|MySQL|sudo|虚拟环境|请进行下一步",
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
  if (mode === "audit") {
    runAuditGate();
    return;
  }

  runDocsCheck();
  runComplianceCheck();
  runBoundaryCheck();
  runFrontendGate();
}

function runDocsCheck() {
  heading("docs");
  const missing = requiredFiles.filter((file) => !existsSync(join(rootDir, file)));
  if (missing.length > 0) {
    fail(`Missing required files:\n${missing.map((file) => `  - ${file}`).join("\n")}`);
  }
  ok(`checked ${requiredFiles.length} required files`);
}

function runComplianceCheck() {
  heading("compliance");
  ensureRg();
  for (const check of complianceChecks) {
    runCommand("rg", ["--quiet", "-n", check.pattern, ...check.targets], {
      label: check.name
    });
  }
}

function runBoundaryCheck() {
  heading("boundary");
  const blockedDirs = ["backend", "ai-services", "infra"];
  const found = blockedDirs.filter((dir) => existsSync(join(rootDir, dir)));
  if (found.length > 0) {
    fail(`Current increment must not create these root directories yet: ${found.join(", ")}`);
  }
  ok("no backend/, ai-services/, or infra/ directory at the repository root");
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

function ensureRg() {
  const result = spawnSync("rg", ["--version"], {
    cwd: rootDir,
    encoding: "utf8",
    stdio: "pipe"
  });
  if (result.status !== 0) {
    fail("ripgrep (`rg`) is required for compliance checks. Install it or update this script with a reviewed replacement.");
  }
}

function runCommand(command, args, options = {}) {
  const label = options.label ?? [command, ...args].join(" ");
  console.log(`\n> ${label}`);
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    fail(`${label} failed with exit code ${result.status ?? "unknown"}`);
  }
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

main();
