'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { buildTwinHref } from '../../lib/url-state.ts';
import { alertEvents, floors, getFloor, getStore } from '../../lib/twin-data.ts';
import type { FloorId, TwinUrlState } from '../../types/index.ts';
import { containerVariants } from '../ui/motion-variants.ts';
import { StatusPill } from './InspectorPrimitives.tsx';

export function DigitalTwinOverviewContent({ state }: { state: TwinUrlState }) {
  const totalLive = floors.reduce((sum, floor) => sum + floor.liveOccupancy, 0);
  const crowded = floors.filter((floor) => floor.crowdingIndex > 0.9).length;
  const alertCount = alertEvents.length;

  return (
    <motion.div className="pointer-events-none absolute left-5 top-5 z-20 flex max-w-[min(760px,calc(100%-40px))] flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
      <div className="pointer-events-auto rounded-md border border-[#DFE6EF]/80 bg-white/76 px-3 py-2 text-xs font-semibold text-[#667085] shadow-[0_10px_28px_-24px_rgba(15,23,42,0.36)] backdrop-blur-md">
        <span className="mr-2 text-[#172033]">实时客流</span>
        <strong className="font-mono text-[#3F5FB5]">{totalLive.toLocaleString('zh-CN')}</strong>
      </div>
      <div className="pointer-events-auto rounded-md border border-[#DFE6EF]/80 bg-white/76 px-3 py-2 text-xs font-semibold text-[#667085] backdrop-blur-md">
        高拥挤楼层 <strong className="font-mono text-[#B94A45]">{crowded}</strong>
      </div>
      <div className="pointer-events-auto rounded-md border border-[#DFE6EF]/80 bg-white/76 px-3 py-2 text-xs font-semibold text-[#667085] backdrop-blur-md">
        未处理告警 <strong className="font-mono text-[#B94A45]">{alertCount}</strong>
      </div>
    </motion.div>
  );
}

export function FloorFocusContent({ state, floorId }: { state: TwinUrlState; floorId: FloorId }) {
  return (
    <motion.div className="pointer-events-none absolute left-5 top-5 z-20 max-w-[calc(100%-40px)]" variants={containerVariants} initial="hidden" animate="visible">
      <div className="pointer-events-auto rounded-md border border-[#DFE6EF]/80 bg-white/76 px-3 py-2 text-xs font-semibold text-[#667085] backdrop-blur-md">
        楼层工作台 <strong className="ml-2 text-[#172033]">{floorId}</strong>
      </div>
    </motion.div>
  );
}

export function StoreFocusContent({ state, storeId }: { state: TwinUrlState; storeId: string }) {
  const store = getStore(storeId);
  const floor = getFloor(store.floorId);
  const captureScore = Math.round(store.entryRate);
  const dwellScore = Math.round(store.avgDwellTime * 2);
  const capacityScore = Math.max(35, 94 - store.liveOccupancy);
  const scoreParts = [
    { label: '客流捕获', value: captureScore },
    { label: '停留质量', value: dwellScore },
    { label: '承载效率', value: capacityScore }
  ];

  return (
    <motion.div className="mx-auto grid max-w-[1180px] gap-4 xl:grid-cols-[minmax(0,1fr)_300px]" variants={containerVariants} initial="hidden" animate="visible">
      <section className="min-w-0 rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/72 p-5 shadow-[0_16px_42px_-36px_rgba(15,23,42,0.32)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DFE6EF]/80 pb-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#667085]">Store Workspace</p>
            <h2 className="mt-1 truncate text-2xl font-semibold text-[#172033]">{store.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">{store.warningText ?? '综合资产表现稳定，当前重点观察进店转化、停留质量和临近业态协同。'}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill tone={store.hasWarning ? 'red' : 'blue'}>{store.grade}</StatusPill>
            <Link className="rounded border border-[#DFE6EF] bg-[#FBFCFE] px-3 py-1.5 text-xs font-bold text-[#3F5FB5] hover:bg-[#EEF2FF]" href={buildTwinHref({ view: 'floor', floorId: store.floorId, mode: 'score', flowScope: state.flowScope })}>
              在模型中查看
            </Link>
          </div>
        </div>

        <div className="grid gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-4">
            {scoreParts.map((part) => (
              <div className="grid grid-cols-[96px_minmax(0,1fr)_42px] items-center gap-3" key={part.label}>
                <span className="text-sm font-semibold text-[#667085]">{part.label}</span>
                <div className="h-2 overflow-hidden rounded bg-[#EDF2F7]">
                  <div className="h-full rounded bg-[#3F5FB5]" style={{ width: `${Math.min(100, part.value)}%` }} />
                </div>
                <strong className="text-right font-mono text-sm text-[#172033]">{part.value}</strong>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-[#DFE6EF]/80 bg-[#F7F9FC] px-3 py-2">
            <div className="flex justify-between border-b border-[#DFE6EF]/80 py-2 text-xs">
              <span className="font-semibold text-[#667085]">店内人数</span><strong className="font-mono text-[#172033]">{store.liveOccupancy}</strong>
            </div>
            <div className="flex justify-between border-b border-[#DFE6EF]/80 py-2 text-xs">
              <span className="font-semibold text-[#667085]">进店率</span><strong className="font-mono text-[#172033]">{store.entryRate}%</strong>
            </div>
            <div className="flex justify-between border-b border-[#DFE6EF]/80 py-2 text-xs">
              <span className="font-semibold text-[#667085]">平均停留</span><strong className="font-mono text-[#172033]">{store.avgDwellTime}m</strong>
            </div>
            <div className="flex justify-between py-2 text-xs">
              <span className="font-semibold text-[#667085]">所在楼层</span><strong className="font-mono text-[#172033]">{floor.id}</strong>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[#DFE6EF]/80 pt-4 md:grid-cols-3">
          <StoreWorkspaceNote title="经营判断" body={store.hasWarning ? '该店铺低效信号需要优先进入调铺模拟，并核对店前动线。' : '当前经营表现稳定，适合持续观察邻近业态与客群结构。'} />
          <StoreWorkspaceNote title="动线关注" body="优先查看入口扶梯到店前的路径密度，避免仅凭店内人数判断表现。" />
          <StoreWorkspaceNote title="下一动作" body="在右侧 inspector 中处理相关告警，或切回楼层模型检查空间位置。" />
        </div>
      </section>

      <StoreLocationPreview state={state} storeId={storeId} />
    </motion.div>
  );
}

function StoreWorkspaceNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-[#DFE6EF]/80 bg-[#F7F9FC] p-3">
      <h3 className="text-sm font-semibold text-[#172033]">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#667085]">{body}</p>
    </div>
  );
}

function StoreLocationPreview({ state, storeId }: { state: TwinUrlState; storeId: string }) {
  const store = getStore(storeId);
  const floor = getFloor(store.floorId);
  const viewBoxSize = 100;
  const markerX = Math.max(8, Math.min(92, store.x));
  const markerY = Math.max(10, Math.min(88, store.y));

  return (
    <aside className="rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/72 p-4 shadow-[0_16px_42px_-36px_rgba(15,23,42,0.28)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#667085]">Location Preview</p>
          <h3 className="mt-1 text-sm font-semibold text-[#172033]">{floor.name}</h3>
        </div>
        <StatusPill tone="neutral">{store.id}</StatusPill>
      </div>
      <svg className="aspect-square w-full rounded-md border border-[#DFE6EF]/80 bg-[#F7F9FC]" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} role="img" aria-label={`${store.name} 位置预览`}>
        <rect x="7" y="10" width="86" height="78" rx="10" fill="#FBFCFE" stroke="#D7DEE8" />
        <ellipse cx="50" cy="49" rx="20" ry="12" fill="#EDF2F7" stroke="#CBD5E1" strokeDasharray="2 1" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="#D7DEE8" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx={markerX} cy={markerY} r="4.5" fill="#3F5FB5" opacity="0.9" />
        <circle cx={markerX} cy={markerY} r="9" fill="#3F5FB5" opacity="0.12" />
      </svg>
      <Link className="mt-3 block rounded border border-[#DFE6EF] bg-[#FBFCFE] px-3 py-2 text-center text-xs font-bold text-[#3F5FB5] hover:bg-[#EEF2FF]" href={buildTwinHref({ view: 'floor', floorId: store.floorId, mode: state.mode, flowScope: state.flowScope })}>
        返回楼层空间视图
      </Link>
    </aside>
  );
}
