'use client';

import { useUrlState } from '../../hooks/use-url-state.ts';
import { buildFlowPath } from '../../lib/nav-graph.ts';
import { getStoresForFloor, heatPoints } from '../../lib/twin-data.ts';
import { useTwinStore, type ScenarioDensity } from '../../store/twin-store.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { TwinLevelNavigation } from '../dashboard/TwinLevelNavigation.tsx';
import { F1Floorplan } from './F1Floorplan.tsx';

const SCENARIO_DENSITY_LABEL: Record<ScenarioDensity, string> = {
  baseline: '常态',
  peak: '高峰',
  surge: '涌入'
};

const DENSITY_MULTIPLIER: Record<ScenarioDensity, number> = {
  baseline: 0.72,
  peak: 1,
  surge: 1.35
};

interface SvgFallbackViewportProps {
  state: TwinUrlState;
  reason?: string;
}

export function SvgFallbackViewport({ state, reason }: SvgFallbackViewportProps) {
  const { setState } = useUrlState();
  const stores = getStoresForFloor(state.floorId);
  const selected = state.storeId ?? stores[0]?.id;
  const selectedStore = stores.find((store) => store.id === selected);
  const flow = selected ? buildFlowPath(state.floorId, selected, state.flowScope) : undefined;
  const points = heatPoints.filter((point) => point.floorId === state.floorId);
  const scenarioDensity = useTwinStore((store) => store.scenarioDensity);
  const scenarioSpeed = useTwinStore((store) => store.scenarioSpeed);
  const incidentLevel = useTwinStore((store) => store.incidentLevel);
  const densityMultiplier = DENSITY_MULTIPLIER[scenarioDensity];
  const incidentScale = Math.max(0, Math.min(3, incidentLevel));

  return (
    <div className="relative h-full min-h-[560px] overflow-hidden rounded-lg bg-[#F6F8FB]">
      <div className="absolute left-4 top-4 z-10 w-[min(620px,calc(100%-32px))] rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/78 px-3 py-2 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.3)] backdrop-blur-md">
        {reason ? <p className="mb-2 rounded bg-[#FBF3E3] px-2 py-1 text-xs font-bold text-[#98620A]">{reason}</p> : null}
        <TwinLevelNavigation state={state} variant="compact" />
      </div>
      <svg className="h-full w-full" viewBox="0 0 100 100" role="img" aria-label="SVG 数字孪生 F1 平面图">
        <defs>
          <radialGradient id="heat">
            <stop offset="0%" stopColor="#C2413A" stopOpacity="0.44" />
            <stop offset="52%" stopColor="#B7791F" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#3F8F91" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0%" stopColor="#3F8F91" stopOpacity="0" />
            <stop offset="50%" stopColor="#3F8F91" stopOpacity="0.76" />
            <stop offset="100%" stopColor="#3F5FB5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <F1Floorplan floorId={state.floorId} />
        {state.mode === 'heatmap'
          ? points.map((point) => (
              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                fill="url(#heat)"
                opacity={Math.min(0.95, 0.55 + densityMultiplier * 0.24)}
                r={(8 + point.intensity * 10) * densityMultiplier}
              />
            ))
          : null}
        {stores.map((store) => (
          <rect
            fill={store.id === selected ? '#E7F3F3' : 'transparent'}
            height="7"
            key={store.id}
            onClick={() => setState({ view: 'store', floorId: store.floorId, storeId: store.id, mode: state.mode === 'heatmap' ? 'score' : state.mode })}
            rx="2"
            stroke={store.id === selected ? '#3F8F91' : 'transparent'}
            strokeWidth={store.id === selected ? 0.6 : 0}
            width="9"
            x={store.x - 4.5}
            y={store.y - 3.5}
          />
        ))}
        {state.mode === 'flow' && flow ? (
          <polyline
            fill="none"
            points={flow.nodes.map((node) => `${node.x},${node.y}`).join(' ')}
            stroke="url(#flow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${2.2 * scenarioSpeed} ${1.1 / scenarioSpeed}`}
            strokeWidth={1.4 + scenarioSpeed * 0.55}
          />
        ) : null}
        {state.mode === 'alerts' && selectedStore ? (
          <g aria-label="Synthetic SVG incident emphasis">
            <circle
              cx={selectedStore.x}
              cy={selectedStore.y}
              fill={incidentScale >= 2 ? '#EF4444' : '#F59E0B'}
              fillOpacity={0.12 + incidentScale * 0.06}
              r={5.2 + incidentScale * 1.6}
              stroke={incidentScale >= 2 ? '#B91C1C' : '#B7791F'}
              strokeDasharray="1.4 0.9"
              strokeWidth={0.5 + incidentScale * 0.16}
            />
            <circle cx={selectedStore.x} cy={selectedStore.y} fill={incidentScale >= 2 ? '#DC2626' : '#D97706'} r={1.2 + incidentScale * 0.22} />
          </g>
        ) : null}
      </svg>
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-md border border-[#DFE6EF]/80 bg-[#FBFCFE]/84 px-3 py-2 text-[11px] font-semibold text-[#475569] shadow-[0_10px_24px_-22px_rgba(15,23,42,0.34)] backdrop-blur-md">
        <span className="text-[#172033]">2D 合成场景</span> · 场景密度 {SCENARIO_DENSITY_LABEL[scenarioDensity]} · 速度 {scenarioSpeed}x · 事件强度 {incidentLevel}
      </div>
    </div>
  );
}
