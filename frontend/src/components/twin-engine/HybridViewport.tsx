'use client';

import { useTwinStore } from '../../store/twin-store.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { PrototypeGlbViewport } from './PrototypeGlbViewport.tsx';
import { SvgFallbackViewport } from './SvgFallbackViewport.tsx';
import { ThreeTwinViewport } from './ThreeTwinViewport.tsx';
import { WebGLErrorBoundary } from './WebGLErrorBoundary.tsx';

const SCENARIO_DENSITY_LABEL = {
  baseline: '常态',
  peak: '高峰',
  surge: '涌入'
} as const;

export function HybridViewport({ state }: { state: TwinUrlState }) {
  const webglFailed = useTwinStore((store) => store.webglFailed);
  const scenarioDensity = useTwinStore((store) => store.scenarioDensity);
  const scenarioSpeed = useTwinStore((store) => store.scenarioSpeed);
  const incidentLevel = useTwinStore((store) => store.incidentLevel);
  const viewportEmphasis = state.mode === 'heatmap' || state.mode === 'flow';

  if (webglFailed || state.viewport === '2d') {
    return <SvgFallbackViewport state={state} reason={state.viewport === '2d' ? 'SVG 2D 平面图模式。' : 'WebGL 不可用，已进入 2D 决策视图。'} />;
  }

  return (
    <div className={`relative h-full min-h-[560px] overflow-hidden rounded-lg border bg-[#FBFCFE]/62 shadow-[0_16px_42px_-36px_rgba(15,23,42,0.42)] transition ${viewportEmphasis ? 'border-[#6EA6A6]/45 ring-2 ring-[#6EA6A6]/8' : 'border-[#DFE6EF]/80'}`}>
      <WebGLErrorBoundary state={state}>
        {state.model === 'prototype' ? <PrototypeGlbViewport state={state} /> : <ThreeTwinViewport state={state} />}
      </WebGLErrorBoundary>
      <div className="absolute right-4 top-4 z-30 rounded-md border border-[#DFE6EF]/80 bg-[#FBFCFE]/76 px-2.5 py-1.5 text-xs font-bold text-[#376F72] shadow-[0_10px_24px_-22px_rgba(15,23,42,0.34)] backdrop-blur-md">
        3D 在线 · {state.model === 'prototype' ? 'GLB 原型预览' : '程序化主视图'} · SVG 可降级 · {state.floorId}
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-30 rounded-md border border-[#DFE6EF]/80 bg-[#FBFCFE]/82 px-3 py-2 text-[11px] font-semibold text-[#475569] shadow-[0_10px_24px_-22px_rgba(15,23,42,0.34)] backdrop-blur-md">
        <span className="text-[#172033]">合成场景读数</span> · 场景密度 {SCENARIO_DENSITY_LABEL[scenarioDensity]} · 速度 {scenarioSpeed}x · 事件强度 {incidentLevel}
      </div>
    </div>
  );
}
