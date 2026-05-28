'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { alertEvents } from '../../lib/twin-data.ts';
import { useTwinStore } from '../../store/twin-store.ts';
import { containerVariants, itemVariants } from '../ui/motion-variants.ts';
import { InspectorSection, StatusPill } from './InspectorPrimitives.tsx';

interface AlertScope {
  view?: 'overview' | 'floor' | 'store';
  floorId?: string;
  storeId?: string;
}

export function ActionableAlertStream({ scope = {} }: { scope?: AlertScope }) {
  const { state: urlState, setState } = useUrlState();
  const dispatchState = useTwinStore((state) => state.dispatchStateByAlertId);
  const setDispatchState = useTwinStore((state) => state.setDispatchState);
  const completeDispatch = useTwinStore((state) => state.completeDispatch);
  const scopedEvents = alertEvents.filter((event) => {
    if (scope.view === 'store') return event.storeId === scope.storeId || event.floorId === scope.floorId;
    if (scope.view === 'floor') return event.floorId === scope.floorId;
    return true;
  });

  useEffect(() => {
    const timers = Object.entries(dispatchState)
      .filter(([, state]) => state === 'processing')
      .map(([id]) => window.setTimeout(() => completeDispatch(id), 900));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [completeDispatch, dispatchState]);

  return (
    <InspectorSection title="现场运维与低效预警" trailing={urlState.mode === 'alerts' ? <StatusPill tone="red">Actionable</StatusPill> : 'Actionable'}>
      <motion.div className="min-h-0 overflow-y-auto rounded-md border border-[#DFE6EF]/80 bg-[#FBFCFE]/60 px-3 [scrollbar-width:none]" variants={containerVariants} initial="hidden" animate="visible">
        {scopedEvents.map((event) => {
          const state = dispatchState[event.id] ?? 'idle';
          return (
            <motion.article className="border-t border-[#EDF2F7] py-3 first:border-t-0" key={event.id} variants={itemVariants} layout>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6B7280]">
                    <StatusPill tone={event.level === 'critical' ? 'red' : 'amber'}>{event.level === 'critical' ? 'Critical' : 'Warning'}</StatusPill>
                    <span>{event.timestamp}</span>
                    <span className="truncate">{event.area}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#172033]">{event.message}</p>
                </div>
                <button
                  aria-label={`定位到 ${event.area}`}
                  className="shrink-0 rounded border border-[#DFE6EF] bg-[#FBFCFE] px-2.5 py-1 text-xs font-bold text-[#3F5FB5] focus:outline-none focus:ring-2 focus:ring-[#3F5FB5]/25"
                  onClick={() => setState({ view: event.storeId ? 'store' : 'floor', floorId: event.floorId, storeId: event.storeId, mode: 'alerts' })}
                  type="button"
                >
                  定位
                </button>
              </div>
              <motion.div className="mt-2 flex justify-end" layout>
                {state === 'confirming' ? (
                  <button className="rounded bg-[#172033] px-3 py-1.5 text-xs font-bold text-[#FBFCFE] focus:outline-none focus:ring-2 focus:ring-[#172033]/25" onClick={() => setDispatchState(event.id, 'processing')} type="button">
                    确认执行 · 3s
                  </button>
                ) : (
                  <button
                    aria-label={event.action === 'dispatch' ? '一键派单调度' : '生成调铺模拟'}
                    className={`rounded px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#3F5FB5]/25 ${state === 'done' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#EEF2FF] text-[#3F5FB5] hover:bg-[#E6ECFB]'}`}
                    disabled={state === 'processing' || state === 'done'}
                    onClick={() => setDispatchState(event.id, event.action === 'dispatch' ? 'confirming' : 'processing')}
                    type="button"
                  >
                    {state === 'done' ? (event.action === 'dispatch' ? '调度已提交' : '模拟已生成') : state === 'processing' ? '处理中...' : event.action === 'dispatch' ? '一键派单调度' : '生成调铺模拟'}
                  </button>
                )}
              </motion.div>
              {state === 'done' ? <p className="mt-2 text-right text-xs font-semibold text-emerald-700">操作状态已同步到当前 synthetic 决策流。</p> : null}
            </motion.article>
          );
        })}
      </motion.div>
    </InspectorSection>
  );
}
