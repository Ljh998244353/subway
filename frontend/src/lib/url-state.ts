import type { DataLayer, FloorId, FlowScope, TwinUrlState, ViewMode } from '../types/index.ts';

export const defaultTwinUrlState: TwinUrlState = {
  view: 'overview',
  floorId: 'F2',
  mode: 'heatmap',
  flowScope: 'inbound'
};

const floors = new Set<FloorId>(['B1', 'F1', 'F2', 'F3', 'F4']);
const views = new Set<ViewMode>(['overview', 'floor', 'store']);
const layers = new Set<DataLayer>(['heatmap', 'flow', 'alerts', 'score']);
const scopes = new Set<FlowScope>(['inbound', 'outbound']);

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseTwinUrlState(searchParams: Record<string, string | string[] | undefined>): TwinUrlState {
  const view = first(searchParams.view);
  const floorId = first(searchParams.floorId);
  const storeId = first(searchParams.storeId);
  const mode = first(searchParams.mode);
  const flowScope = first(searchParams.flowScope);

  return {
    view: views.has(view as ViewMode) ? (view as ViewMode) : storeId ? 'store' : floorId ? 'floor' : defaultTwinUrlState.view,
    floorId: floors.has(floorId as FloorId) ? (floorId as FloorId) : defaultTwinUrlState.floorId,
    storeId,
    mode: layers.has(mode as DataLayer) ? (mode as DataLayer) : defaultTwinUrlState.mode,
    flowScope: scopes.has(flowScope as FlowScope) ? (flowScope as FlowScope) : defaultTwinUrlState.flowScope
  };
}

export function buildTwinHref(next: Partial<TwinUrlState> = {}) {
  const state = { ...defaultTwinUrlState, ...next };
  const params = new URLSearchParams();
  params.set('view', state.view);
  params.set('floorId', state.floorId);
  params.set('mode', state.mode);
  params.set('flowScope', state.flowScope);
  if (state.storeId) params.set('storeId', state.storeId);
  if (state.view === 'store' && state.storeId) {
    return `/digital-twin/store/${state.storeId}?${params.toString()}`;
  }
  if (state.view === 'floor') {
    return `/digital-twin/${state.floorId}?${params.toString()}`;
  }
  return `/digital-twin?${params.toString()}`;
}
