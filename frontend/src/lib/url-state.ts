import type { DataLayer, FloorId, FlowScope, ScenarioDensity, ScenarioSpeed, TwinModelMode, TwinUrlState, ViewMode, ViewportMode } from '../types/index.ts';

export const defaultTwinUrlState: TwinUrlState = {
  view: 'overview',
  floorId: 'F2',
  mode: 'heatmap',
  flowScope: 'inbound',
  viewport: '3d',
  model: 'procedural',
  scenarioDensity: 'peak',
  scenarioSpeed: 1,
  incidentLevel: 1
};

const floors = new Set<FloorId>(['B1', 'F1', 'F2', 'F3', 'F4']);
const views = new Set<ViewMode>(['overview', 'floor', 'store']);
const layers = new Set<DataLayer>(['heatmap', 'flow', 'alerts', 'score']);
const scopes = new Set<FlowScope>(['inbound', 'outbound']);
const viewports = new Set<ViewportMode>(['2d', '3d']);
const models = new Set<TwinModelMode>(['procedural', 'prototype']);
const densities = new Set<ScenarioDensity>(['baseline', 'peak', 'surge']);
const speeds = new Set(['0.5', '1', '2']);

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseTwinUrlState(searchParams: Record<string, string | string[] | undefined>): TwinUrlState {
  const view = first(searchParams.view);
  const floorId = first(searchParams.floorId);
  const storeId = first(searchParams.storeId);
  const mode = first(searchParams.mode);
  const flowScope = first(searchParams.flowScope);
  const viewport = first(searchParams.viewport);
  const model = first(searchParams.model);
  const density = first(searchParams.density);
  const speed = first(searchParams.speed);
  const incident = first(searchParams.incident);
  const svgLegacy = first(searchParams.svg);
  const parsedSpeed = speeds.has(speed ?? '') ? (Number(speed) as ScenarioSpeed) : defaultTwinUrlState.scenarioSpeed;
  const parsedIncident = Number(incident);

  return {
    view: views.has(view as ViewMode) ? (view as ViewMode) : storeId ? 'store' : floorId ? 'floor' : defaultTwinUrlState.view,
    floorId: floors.has(floorId as FloorId) ? (floorId as FloorId) : defaultTwinUrlState.floorId,
    storeId,
    mode: layers.has(mode as DataLayer) ? (mode as DataLayer) : defaultTwinUrlState.mode,
    flowScope: scopes.has(flowScope as FlowScope) ? (flowScope as FlowScope) : defaultTwinUrlState.flowScope,
    viewport: viewports.has(viewport as ViewportMode) ? (viewport as ViewportMode) : svgLegacy === '1' ? '2d' : defaultTwinUrlState.viewport,
    model: models.has(model as TwinModelMode) ? (model as TwinModelMode) : defaultTwinUrlState.model,
    scenarioDensity: densities.has(density as ScenarioDensity) ? (density as ScenarioDensity) : defaultTwinUrlState.scenarioDensity,
    scenarioSpeed: parsedSpeed,
    incidentLevel: Number.isInteger(parsedIncident) && parsedIncident >= 0 && parsedIncident <= 3 ? parsedIncident : defaultTwinUrlState.incidentLevel
  };
}

export function buildTwinHref(next: Partial<TwinUrlState> = {}) {
  const state = { ...defaultTwinUrlState, ...next };
  const params = new URLSearchParams();
  params.set('view', state.view);
  params.set('floorId', state.floorId);
  params.set('mode', state.mode);
  params.set('flowScope', state.flowScope);
  params.set('viewport', state.viewport);
  params.set('model', state.model);
  params.set('density', state.scenarioDensity);
  params.set('speed', String(state.scenarioSpeed));
  params.set('incident', String(state.incidentLevel));
  if (state.storeId) params.set('storeId', state.storeId);
  if (state.view === 'store' && state.storeId) {
    return `/digital-twin/store/${state.storeId}?${params.toString()}`;
  }
  if (state.view === 'floor') {
    return `/digital-twin/${state.floorId}?${params.toString()}`;
  }
  return `/digital-twin?${params.toString()}`;
}
