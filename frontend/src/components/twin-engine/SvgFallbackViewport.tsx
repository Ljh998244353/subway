'use client';

import { useUrlState } from '../../hooks/use-url-state.ts';
import { buildFlowPath } from '../../lib/nav-graph.ts';
import { getStoresForFloor, heatPoints } from '../../lib/twin-data.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { TwinLevelNavigation } from '../dashboard/TwinLevelNavigation.tsx';

interface SvgFallbackViewportProps {
  state: TwinUrlState;
  reason?: string;
}

export function SvgFallbackViewport({ state, reason }: SvgFallbackViewportProps) {
  const { setState } = useUrlState();
  const stores = getStoresForFloor(state.floorId);
  const selected = state.storeId ?? stores[0]?.id;
  const flow = selected ? buildFlowPath(state.floorId, selected, state.flowScope) : undefined;
  const points = heatPoints.filter((point) => point.floorId === state.floorId);

  return (
    <div className="relative h-full min-h-[560px] overflow-hidden rounded-lg bg-[#F6F8FB]">
      <div className="absolute left-4 top-4 z-10 w-[min(620px,calc(100%-32px))] rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/78 px-3 py-2 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.3)] backdrop-blur-md">
        {reason ? <p className="mb-2 rounded bg-[#FBF3E3] px-2 py-1 text-xs font-bold text-[#98620A]">{reason}</p> : null}
        <TwinLevelNavigation state={state} variant="compact" />
      </div>
      <svg className="h-full w-full" viewBox="0 0 100 100" role="img" aria-label="SVG 数字孪生降级平面图">
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
        <rect x="5" y="8" width="90" height="80" rx="12" fill="#FBFCFE" stroke="#DFE6EF" />
        <ellipse cx="50" cy="48" rx="21" ry="12" fill="#F1F4F8" stroke="#CBD5E1" strokeDasharray="2 1" />
        {state.mode === 'heatmap' ? points.map((point) => <circle key={point.id} cx={point.x} cy={point.y} r={8 + point.intensity * 10} fill="url(#heat)" />) : null}
        {stores.map((store) => (
          <rect
            fill={store.id === selected ? '#E7F3F3' : '#FBFCFE'}
            height="7"
            key={store.id}
            onClick={() => setState({ view: 'store', floorId: store.floorId, storeId: store.id, mode: state.mode === 'heatmap' ? 'score' : state.mode })}
            rx="2"
            stroke={store.id === selected ? '#3F8F91' : '#D7DEE8'}
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
            strokeWidth="1.8"
          />
        ) : null}
      </svg>
    </div>
  );
}
