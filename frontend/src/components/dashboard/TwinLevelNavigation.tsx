'use client';

import Link from 'next/link';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { buildTwinHref } from '../../lib/url-state.ts';
import { floorOrder, getFloor, getStoresForFloor, getStore } from '../../lib/twin-data.ts';
import type { DataLayer, FloorId, TwinUrlState } from '../../types/index.ts';

const modeLabels: Record<DataLayer, string> = {
  heatmap: '热力图',
  flow: '人流动线',
  alerts: '告警',
  score: '评分'
};

const modeHints: Record<DataLayer, string> = {
  heatmap: '查看空间热区',
  flow: '查看进出动线',
  alerts: '处理现场异常',
  score: '分析调铺评分'
};

function crumbHref(target: Partial<TwinUrlState>) {
  return buildTwinHref(target);
}

interface TwinLevelNavigationProps {
  state: TwinUrlState;
  variant?: 'page' | 'compact' | 'bar';
}

export function TwinLevelNavigation({ state, variant = 'page' }: TwinLevelNavigationProps) {
  const { setState, isPending } = useUrlState();
  const floor = getFloor(state.floorId);
  const store = getStore(state.storeId);
  const floorStores = getStoresForFloor(state.floorId).slice(0, 6);
  const isCompact = variant === 'compact';
  const isBar = variant === 'bar';

  if (isBar) {
    return (
      <section className="rounded-2xl border border-white/50 bg-white/80 px-3 py-2 shadow-[0_8px_24px_rgba(31,38,135,0.05)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          <nav aria-label="数字孪生层级路径" className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <Link className="rounded-full bg-[#F7F9FC] px-3 py-1 hover:text-[#3F5FB5]" href={crumbHref({ view: 'overview', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
              全局
            </Link>
            <span>/</span>
            <Link className="max-w-[150px] truncate rounded-full bg-[#F7F9FC] px-3 py-1 hover:text-[#3F5FB5]" href={crumbHref({ view: 'floor', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
              {floor.name}
            </Link>
            {state.view === 'store' ? (
              <>
                <span>/</span>
                <span className="max-w-[150px] truncate rounded-full bg-[#3F5FB5]/10 px-3 py-1 text-[#3F5FB5]">{store.name}</span>
              </>
            ) : null}
          </nav>
          <div className="h-5 w-px bg-[#D7DEE8]" />
          <div className="flex flex-wrap gap-1.5" aria-label="模式切换">
            {(Object.keys(modeLabels) as DataLayer[]).map((mode) => (
              <button
                aria-label={modeHints[mode]}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${state.mode === mode ? 'bg-[#172033] text-white' : 'bg-[#F7F9FC] text-[#6B7280] hover:text-[#172033]'}`}
                disabled={isPending}
                key={mode}
                onClick={() => setState({ mode })}
                type="button"
              >
                {modeLabels[mode]}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-[#D7DEE8]" />
          <div className="flex flex-wrap gap-1.5" aria-label="楼层切换">
            {floorOrder.map((floorId) => (
              <Link
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${state.floorId === floorId ? 'bg-[#3F5FB5] text-white' : 'bg-[#F7F9FC] text-[#6B7280] hover:text-[#172033]'}`}
                href={crumbHref({ view: state.view === 'store' ? 'floor' : state.view, floorId, mode: state.mode, flowScope: state.flowScope })}
                key={floorId}
              >
                {floorId}
              </Link>
            ))}
          </div>
          {state.view !== 'overview' ? (
            <>
              <div className="h-5 w-px bg-[#D7DEE8]" />
              <div className="flex max-w-[360px] flex-wrap gap-1.5" aria-label="店铺快捷入口">
                {floorStores.map((item) => (
                  <Link
                    className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${state.storeId === item.id ? 'bg-[#3F8F91] text-white' : 'bg-[#F7F9FC] text-[#6B7280] hover:text-[#172033]'}`}
                    href={crumbHref({ view: 'store', floorId: item.floorId, storeId: item.id, mode: state.mode === 'heatmap' ? 'score' : state.mode, flowScope: state.flowScope })}
                    key={item.id}
                  >
                    {item.id}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className={isCompact ? 'space-y-3' : 'rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] backdrop-blur-xl'}>
      <nav aria-label="数字孪生层级路径" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6B7280]">
        <Link className="rounded-full bg-white/70 px-3 py-1 hover:text-[#3F5FB5]" href={crumbHref({ view: 'overview', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
          全局
        </Link>
        {state.view !== 'overview' ? (
          <>
            <span>/</span>
            <Link className="rounded-full bg-white/70 px-3 py-1 hover:text-[#3F5FB5]" href={crumbHref({ view: 'floor', floorId: state.floorId, mode: state.mode, flowScope: state.flowScope })}>
              {floor.name}
            </Link>
          </>
        ) : null}
        {state.view === 'store' ? (
          <>
            <span>/</span>
            <span className="rounded-full bg-[#3F5FB5]/10 px-3 py-1 text-[#3F5FB5]">{store.name}</span>
          </>
        ) : null}
        <span>/</span>
        <span className="rounded-full bg-[#172033] px-3 py-1 text-white">{modeLabels[state.mode]}</span>
      </nav>

      {!isCompact ? (
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-[#6B7280]">{state.view === 'overview' ? 'Global Overview' : state.view === 'floor' ? 'Floor Workspace' : 'Store Workspace'}</p>
            <h2 className="mt-1 text-2xl font-bold text-[#172033]">
              {state.view === 'overview' ? '全局运营总览' : state.view === 'floor' ? `${floor.name} 精细运营页` : `${store.name} 店铺管理页`}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link className="rounded-full border border-[#D7DEE8] bg-white px-3 py-2 text-xs font-bold text-[#172033] hover:border-[#3F5FB5] hover:text-[#3F5FB5]" href={crumbHref({ view: 'overview', floorId: state.floorId, mode: 'heatmap', flowScope: state.flowScope })}>
              返回全局
            </Link>
            {state.view === 'store' ? (
              <Link className="rounded-full border border-[#D7DEE8] bg-white px-3 py-2 text-xs font-bold text-[#172033] hover:border-[#3F5FB5] hover:text-[#3F5FB5]" href={crumbHref({ view: 'floor', floorId: store.floorId, mode: state.mode, flowScope: state.flowScope })}>
                返回楼层
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={isCompact ? 'grid gap-2' : 'mt-4 grid gap-3'}>
        <div className="flex flex-wrap gap-2" aria-label="楼层切换">
          {floorOrder.map((floorId) => {
            const targetView = state.view === 'store' ? 'floor' : state.view;
            return (
              <Link
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${state.floorId === floorId ? 'bg-[#3F5FB5] text-white shadow-[0_8px_20px_rgba(63,95,181,0.12)]' : 'bg-white/80 text-[#6B7280] hover:text-[#172033]'}`}
                href={crumbHref({ view: targetView, floorId, mode: state.mode, flowScope: state.flowScope })}
                key={floorId}
              >
                {floorId}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2" aria-label="模式切换">
          {(Object.keys(modeLabels) as DataLayer[]).map((mode) => (
            <button
              aria-label={modeHints[mode]}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${state.mode === mode ? 'bg-[#172033] text-white' : 'bg-white/80 text-[#6B7280] hover:text-[#172033]'}`}
              disabled={isPending}
              key={mode}
              onClick={() => setState({ mode })}
              type="button"
            >
              {modeLabels[mode]}
            </button>
          ))}
        </div>

        {state.view !== 'overview' ? (
          <div className="flex flex-wrap gap-2" aria-label="店铺快捷入口">
            {floorStores.map((item) => (
              <Link
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${state.storeId === item.id ? 'bg-[#3F8F91] text-white' : 'bg-white/80 text-[#6B7280] hover:text-[#172033]'}`}
                href={crumbHref({ view: 'store', floorId: item.floorId, storeId: item.id, mode: state.mode === 'heatmap' ? 'score' : state.mode, flowScope: state.flowScope })}
                key={item.id}
              >
                {item.id}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
