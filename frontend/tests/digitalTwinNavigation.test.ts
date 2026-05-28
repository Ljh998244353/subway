import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), 'utf8');
}

test('digital twin level pages render drilldown content instead of null shells', () => {
  const overview = read('../src/app/digital-twin/page.tsx');
  const floor = read('../src/app/digital-twin/[floorId]/page.tsx');
  const store = read('../src/app/digital-twin/store/[storeId]/page.tsx');

  assert.doesNotMatch(overview, /return null/);
  assert.doesNotMatch(floor, /return null/);
  assert.doesNotMatch(store, /return null/);
  assert.match(overview, /DigitalTwinOverviewContent/);
  assert.match(floor, /FloorFocusContent/);
  assert.match(store, /StoreFocusContent/);
});

test('digital twin navigation exposes breadcrumbs, return paths, and quick entries', () => {
  const navigation = read('../src/components/dashboard/TwinLevelNavigation.tsx');
  const pages = read('../src/components/dashboard/TwinLevelPages.tsx');
  const commandBar = read('../src/components/dashboard/TwinCommandBar.tsx');
  const floorSidebar = read('../src/app/digital-twin/@sidebar/[floorId]/page.tsx');
  const storeSidebar = read('../src/app/digital-twin/@sidebar/store/[storeId]/page.tsx');

  assert.match(navigation, /数字孪生层级路径/);
  assert.match(navigation, /返回全局/);
  assert.match(navigation, /返回楼层/);
  assert.match(navigation, /店铺快捷入口/);
  assert.match(commandBar, /数字孪生层级路径/);
  assert.match(commandBar, /Synthetic workspace/);
  assert.match(pages, /实时客流/);
  assert.match(floorSidebar, /该楼层店铺列表/);
  assert.match(storeSidebar, /调铺建议/);
});

test('digital twin viewport overlay is an actionable navigation surface', () => {
  const viewport = read('../src/components/twin-engine/HybridViewport.tsx');
  const fallback = read('../src/components/twin-engine/SvgFallbackViewport.tsx');
  const threeViewport = read('../src/components/twin-engine/ThreeTwinViewport.tsx');
  const mallSpec = read('../src/components/twin-engine/proceduralMallSpec.ts');

  assert.match(viewport, /3D 在线 · SVG 可降级/);
  assert.match(fallback, /TwinLevelNavigation/);
  assert.match(fallback, /SVG 数字孪生 F1 平面图/);
  assert.match(threeViewport, /const positions = new Float32Array\(count \* 3\)/);
  assert.match(threeViewport, /<shaderMaterial/);
  assert.match(threeViewport, /name="Root_Mall"/);
  assert.match(threeViewport, /name="Environment"/);
  assert.match(threeViewport, /name="Skylight_Frame"/);
  assert.match(threeViewport, /name=\{`Floor_\$\{floor\.floorKey\.slice\(1\)\}`\}/);
  assert.match(threeViewport, /createSlabShape\(floor\.floorKey !== 'F1'\)/);
  assert.match(threeViewport, /FlowParticles curve=\{curve\} elevation=\{activeSceneFloor\.baseY \+ 0\.3\}/);
  assert.match(mallSpec, /coordinateSystem: 'right-handed'/);
  assert.match(mallSpec, /footprint: \{ width: 120, depth: 80 \}/);
  assert.match(mallSpec, /atrium: \{ length: 50, width: 24, innerRadius: 12, halfSpan: 13 \}/);
  assert.match(mallSpec, /targetTriangleBudget: 300000/);
  assert.doesNotMatch(threeViewport, /<rawShaderMaterial/);
});

test('digital twin shell separates overview cockpit from full-screen detail pages', () => {
  const shell = read('../src/components/dashboard/DigitalTwinShell.tsx');

  assert.match(shell, /isOverview/);
  assert.match(shell, /pathname === '\/digital-twin'/);
  assert.match(shell, /TrafficAnalyticsSidebar/);
  assert.match(shell, /MerchantGradingBoard/);
  assert.match(shell, /TwinCommandBar/);
  assert.match(shell, /ViewportStage/);
  assert.match(shell, /InspectorRail/);
  assert.match(shell, /isStoreWorkspace/);
  assert.match(shell, /lg:grid-cols-\[minmax\(0,1fr\)_384px\]/);
});

test('digital twin workspace keeps timeline and command bar out of large viewport overlays', () => {
  const shell = read('../src/components/dashboard/DigitalTwinShell.tsx');
  const stage = read('../src/components/dashboard/ViewportStage.tsx');
  const timeline = read('../src/components/dashboard/TimeScrubber.tsx');
  const appLoading = read('../src/app/loading.tsx');
  const twinLoading = read('../src/app/digital-twin/loading.tsx');
  const nextConfig = read('../next.config.mjs');

  assert.match(shell, /h-screen w-screen flex-col overflow-hidden/);
  assert.match(stage, /aria-label="数字孪生模型工作区"/);
  assert.match(stage, /pb-28/);
  assert.match(timeline, /w-\[min\(720px,calc\(100%-40px\)\)\]/);
  assert.match(appLoading, /数字孪生加载视窗/);
  assert.match(twinLoading, /数字孪生加载视窗/);
  assert.match(nextConfig, /destination: '\/digital-twin'/);
  assert.doesNotMatch(timeline, /rounded-2xl/);
  assert.doesNotMatch(appLoading, /grid-cols-\[340px_1fr_360px\]/);
  assert.doesNotMatch(twinLoading, /lg:grid-cols-\[minmax\(0,1fr\)_384px\]/);
  assert.doesNotMatch(twinLoading, /grid-cols-\[340px_minmax\(0,1fr\)_360px\]/);
  assert.doesNotMatch(twinLoading, /rounded-2xl/);
});

test('floor and store sidebars have level-specific analysis instead of one shared alert stream', () => {
  const floorSidebar = read('../src/app/digital-twin/@sidebar/[floorId]/page.tsx');
  const storeSidebar = read('../src/app/digital-twin/@sidebar/store/[storeId]/page.tsx');

  assert.match(floorSidebar, /该楼层店铺列表/);
  assert.match(floorSidebar, /拥挤点与热区说明/);
  assert.match(storeSidebar, /评分拆解与低效原因/);
  assert.match(storeSidebar, /相关告警/);
});

test('store workspace is data-first with a compact location preview', () => {
  const shell = read('../src/components/dashboard/DigitalTwinShell.tsx');
  const pages = read('../src/components/dashboard/TwinLevelPages.tsx');
  const storeFunction = pages.slice(pages.indexOf('export function StoreFocusContent'));

  assert.match(shell, /pathname\.startsWith\('\/digital-twin\/store\/'\)/);
  assert.match(pages, /Store Workspace/);
  assert.match(pages, /Location Preview/);
  assert.match(pages, /在模型中查看/);
  assert.match(pages, /返回楼层空间视图/);
  assert.doesNotMatch(storeFunction, /absolute left-5 top-5/);
});

test('inspector panels use compact sections and rows instead of repeated heavy cards', () => {
  const primitives = read('../src/components/dashboard/InspectorPrimitives.tsx');
  const overviewSidebar = read('../src/app/digital-twin/@sidebar/default.tsx');
  const floorSidebar = read('../src/app/digital-twin/@sidebar/[floorId]/page.tsx');
  const storeSidebar = read('../src/app/digital-twin/@sidebar/store/[storeId]/page.tsx');
  const alerts = read('../src/components/dashboard/ActionableAlertStream.tsx');

  assert.match(primitives, /InspectorSection/);
  assert.match(primitives, /MetricRow/);
  assert.match(primitives, /StatusPill/);
  assert.match(overviewSidebar, /InspectorSection/);
  assert.match(floorSidebar, /MetricRow/);
  assert.match(storeSidebar, /StatusPill/);
  assert.match(alerts, /border-t border-\[#EDF2F7\]/);
  assert.doesNotMatch(overviewSidebar, /shadow-\[0_8px_32px/);
  assert.doesNotMatch(floorSidebar, /rounded-2xl/);
  assert.doesNotMatch(storeSidebar, /rounded-2xl/);
  assert.doesNotMatch(alerts, /border-l-4/);
});
