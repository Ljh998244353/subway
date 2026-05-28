'use client';

import { motion } from 'framer-motion';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { useSmoothInterpolator } from '../../hooks/use-smooth-interpolator.ts';
import { floors } from '../../lib/twin-data.ts';
import { containerVariants, itemVariants } from '../ui/motion-variants.ts';

const funnel = [
  { label: '外部客流', value: 100, delta: '+6.2%' },
  { label: '店前过客', value: 42, delta: '+2.4%' },
  { label: '实际进店', value: 18, delta: '-1.1%' },
  { label: '触发收银', value: 4.5, delta: '+0.8%' }
];

export function TrafficAnalyticsSidebar({ compact = false }: { compact?: boolean }) {
  const { state } = useUrlState();
  const live = floors.reduce((sum, floor) => sum + floor.liveOccupancy, 0);
  const smoothLive = useSmoothInterpolator(live);
  const muted = state.mode === 'score' || state.mode === 'alerts';

  return (
    <motion.aside className={`flex h-full flex-col gap-4 overflow-hidden transition-opacity ${muted ? 'opacity-70' : 'opacity-100'}`} variants={containerVariants} initial="hidden" animate="visible">
      <motion.section className="border-b border-[#DFE6EF]/80 pb-4" variants={itemVariants}>
        <p className="text-xs font-semibold uppercase text-[#6B7280]">Realtime Footfall</p>
        <strong className={`${compact ? 'text-3xl' : 'text-5xl'} mt-2 block font-mono tracking-tight text-[#111827]`}>{Math.round(smoothLive).toLocaleString('zh-CN')}</strong>
        <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">+4.2% vs 昨日同期</span>
      </motion.section>

      <motion.section className="border-b border-[#DFE6EF]/80 pb-4" variants={itemVariants}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[#172033]">进出店转化漏斗</h2>
          <span className="text-xs text-[#6B7280]">24h aggregate</span>
        </div>
        <div className="space-y-3">
          {funnel.map((item, index) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#6B7280]">{item.label}</span>
                <span className={item.delta.startsWith('+') ? 'text-emerald-700' : 'text-[#B94A45]'}>{item.delta}</span>
              </div>
              <div className={`${compact ? 'h-2.5' : 'h-8'} overflow-hidden rounded bg-[#EDF2F7]`}>
                <div
                  className="flex h-full items-center justify-end rounded pr-3 text-sm font-bold text-white"
                  style={{ width: `${Math.max(item.value, 10)}%`, background: index > 1 ? '#3F5FB5' : '#3F8F91' }}
                >
                  {compact ? null : `${item.value}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.aside>
  );
}
