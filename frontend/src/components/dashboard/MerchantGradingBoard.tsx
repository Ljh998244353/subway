'use client';

import { motion } from 'framer-motion';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { stores } from '../../lib/twin-data.ts';
import { itemVariants } from '../ui/motion-variants.ts';

export function MerchantGradingBoard({ compact = false }: { compact?: boolean }) {
  const { state, setState } = useUrlState();
  const ranked = [...stores].sort((a, b) => b.score - a.score).slice(0, 12);
  const emphasized = state.mode === 'score';

  return (
    <motion.section className={`min-h-0 border-b border-[#DFE6EF]/80 pb-4 transition ${emphasized ? 'opacity-100' : 'opacity-85'}`} variants={itemVariants}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-[#172033]">资产店铺评分天梯榜</h2>
        <span className="text-xs font-semibold text-[#6B7280]">Top 12</span>
      </div>
      <div className="overflow-hidden rounded-md border border-[#DFE6EF]">
        <div className={`${compact ? 'grid-cols-[32px_minmax(78px,1fr)_48px]' : 'grid-cols-[40px_64px_minmax(78px,1fr)_88px_58px]'} grid gap-x-3 bg-[#F7F9FC] px-3 py-2 text-xs font-bold text-[#6B7280]`}>
          {compact ? (
            <><span>#</span><span>商户</span><span>评级</span></>
          ) : (
            <><span>Rank</span><span>ID</span><span>商户</span><span>分类</span><span>评级</span></>
          )}
        </div>
        <div className={`${compact ? 'max-h-[250px]' : 'max-h-[310px]'} overflow-y-auto`}>
          {(compact ? ranked.slice(0, 8) : ranked).map((store, index) => (
            <button
              className={`${compact ? 'grid-cols-[32px_minmax(78px,1fr)_48px]' : 'grid-cols-[40px_64px_minmax(78px,1fr)_88px_58px]'} grid w-full items-center gap-x-3 border-t border-[#EDF2F7] bg-[#FBFCFE] px-3 py-2 text-left text-sm transition hover:bg-[#F7F9FC] ${store.hasWarning ? 'text-[#B94A45]' : ''}`}
              key={store.id}
              onClick={() => setState({ view: 'store', floorId: store.floorId, storeId: store.id, mode: store.hasWarning ? 'alerts' : 'score' })}
              type="button"
            >
              <span className="font-mono text-[#6B7280]">{index + 1}</span>
              {compact ? (
                <span className="truncate font-semibold text-[#172033]">{store.hasWarning ? '!' : ''} {store.name}</span>
              ) : (
                <>
                  <span className="font-mono text-xs text-[#6B7280]">{store.id}</span>
                  <span className="truncate font-semibold text-[#172033]">{store.hasWarning ? '!' : ''} {store.name}</span>
                  <span className="text-xs text-[#6B7280]">{store.category}</span>
                </>
              )}
              <span className={`rounded px-1.5 py-0.5 text-center text-xs font-black ${store.grade === 'A+' ? 'bg-[#EEF2FF] text-[#3F5FB5]' : store.grade === 'C-' ? 'bg-[#FCEEEE] text-[#B94A45]' : 'bg-[#EDF2F7] text-[#172033]'}`}>{store.grade}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
