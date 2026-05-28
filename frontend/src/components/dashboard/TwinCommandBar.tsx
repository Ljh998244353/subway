'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { buildTwinHref } from '../../lib/url-state.ts';
import { floorOrder, getFloor, getStore } from '../../lib/twin-data.ts';
import type { DataLayer } from '../../types/index.ts';

const modeLabels: Record<DataLayer, string> = {
  heatmap: '热力',
  flow: '动线',
  alerts: '告警',
  score: '评分'
};

const modeOrder: DataLayer[] = ['heatmap', 'flow', 'alerts', 'score'];

export function TwinCommandBar() {
  const { state, setState, isPending } = useUrlState();
  const floor = getFloor(state.floorId);
  const store = getStore(state.storeId);
  const title = state.view === 'store' ? store.name : state.view === 'floor' ? floor.name : '全局态势';

  return (
    <header className="relative z-50 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[#DFE6EF]/90 bg-[#FBFCFE]/78 px-4 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#172033] text-sm font-black text-[#FBFCFE]">V</div>
        <nav className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#667085]" aria-label="数字孪生层级路径">
          <Link className="shrink-0 hover:text-[#3F5FB5]" href={buildTwinHref({ view: 'overview', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
            Digital Twin
          </Link>
          <span className="text-[#B8C2D0]">/</span>
          <Link className="shrink-0 hover:text-[#3F5FB5]" href={buildTwinHref({ view: 'floor', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
            {floor.id}
          </Link>
          {state.view === 'store' ? (
            <>
              <span className="text-[#B8C2D0]">/</span>
              <span className="truncate text-[#172033]">{store.id}</span>
            </>
          ) : null}
        </nav>
        <div className="hidden min-w-0 items-baseline gap-2 border-l border-[#DFE6EF] pl-3 md:flex">
          <strong className="truncate text-sm font-semibold text-[#172033]">{title}</strong>
          <span className="text-[11px] font-semibold text-[#667085]">Synthetic workspace</span>
        </div>
      </div>

      <div className="hidden min-w-0 items-center gap-2 lg:flex">
        <div className="flex rounded-md border border-[#DFE6EF] bg-[#F7F9FC] p-0.5" aria-label="楼层切换">
          {floorOrder.map((floorId) => (
            <Link
              className={`rounded px-2.5 py-1 text-xs font-bold transition ${state.floorId === floorId ? 'bg-[#FBFCFE] text-[#3F5FB5] shadow-[0_3px_12px_rgba(15,23,42,0.045)]' : 'text-[#667085] hover:text-[#172033]'}`}
              href={buildTwinHref({ view: state.view === 'store' ? 'floor' : state.view, floorId, mode: state.mode, flowScope: state.flowScope })}
              key={floorId}
            >
              {floorId}
            </Link>
          ))}
        </div>
        <div className="relative flex rounded-md border border-[#DFE6EF] bg-[#F7F9FC] p-0.5" aria-label="视图模式">
          {modeOrder.map((mode) => (
            <button
              className={`relative z-10 rounded px-3 py-1 text-xs font-bold transition ${state.mode === mode ? 'text-[#172033]' : 'text-[#667085] hover:text-[#172033]'}`}
              disabled={isPending}
              key={mode}
              onClick={() => setState({ mode })}
              type="button"
            >
              {state.mode === mode ? <motion.span className="absolute inset-0 -z-10 rounded bg-[#FBFCFE] shadow-[0_3px_12px_rgba(15,23,42,0.045)]" layoutId="commandMode" transition={{ duration: 0.2, ease: 'easeInOut' }} /> : null}
              {modeLabels[mode]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-xs font-semibold text-[#667085]">
        <span className="hidden font-mono text-[#172033] md:inline">2026-05-27 14:30</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#DFE6EF] bg-[#F7F9FC] px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          在线 98.6%
        </span>
      </div>
    </header>
  );
}
