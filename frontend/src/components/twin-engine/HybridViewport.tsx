'use client';

import { useTwinStore } from '../../store/twin-store.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { SvgFallbackViewport } from './SvgFallbackViewport.tsx';
import { ThreeTwinViewport } from './ThreeTwinViewport.tsx';
import { WebGLErrorBoundary } from './WebGLErrorBoundary.tsx';

export function HybridViewport({ state }: { state: TwinUrlState }) {
  const webglFailed = useTwinStore((store) => store.webglFailed);
  const viewportEmphasis = state.mode === 'heatmap' || state.mode === 'flow';

  if (webglFailed) {
    return <SvgFallbackViewport state={state} reason="WebGL 不可用，已进入 2D 决策视图。" />;
  }

  return (
    <div className={`relative h-full min-h-[560px] overflow-hidden rounded-lg border bg-[#FBFCFE]/62 shadow-[0_16px_42px_-36px_rgba(15,23,42,0.42)] transition ${viewportEmphasis ? 'border-[#6EA6A6]/45 ring-2 ring-[#6EA6A6]/8' : 'border-[#DFE6EF]/80'}`}>
      <WebGLErrorBoundary state={state}>
        <ThreeTwinViewport state={state} />
      </WebGLErrorBoundary>
      <div className="absolute right-4 top-4 z-30 rounded-md border border-[#DFE6EF]/80 bg-[#FBFCFE]/76 px-2.5 py-1.5 text-xs font-bold text-[#376F72] shadow-[0_10px_24px_-22px_rgba(15,23,42,0.34)] backdrop-blur-md">
        3D 在线 · SVG 可降级 · {state.floorId}
      </div>
    </div>
  );
}
