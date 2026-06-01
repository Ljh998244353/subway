'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { floorOrder, stores } from '../../lib/twin-data.ts';
import type { EnterpriseStoreCategory, FloorId, StoreGrade } from '../../types/index.ts';
import { itemVariants } from '../ui/motion-variants.ts';

const categoryOptions: Array<'all' | EnterpriseStoreCategory> = ['all', 'Retail', 'Food', 'Entertainment', 'Public'];
const gradeOptions: Array<'all' | StoreGrade> = ['all', 'A+', 'A', 'B', 'C-'];

export function MerchantGradingBoard({ compact = false }: { compact?: boolean }) {
  const { state, setState } = useUrlState();
  const [floorFilter, setFloorFilter] = useState<'all' | FloorId>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | EnterpriseStoreCategory>('all');
  const [gradeFilter, setGradeFilter] = useState<'all' | StoreGrade>('all');
  const [minimumScore, setMinimumScore] = useState(0);
  const ranked = useMemo(
    () =>
      stores
        .filter((store) => floorFilter === 'all' || store.floorId === floorFilter)
        .filter((store) => categoryFilter === 'all' || store.category === categoryFilter)
        .filter((store) => gradeFilter === 'all' || store.grade === gradeFilter)
        .filter((store) => store.score >= minimumScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12),
    [categoryFilter, floorFilter, gradeFilter, minimumScore]
  );
  const emphasized = state.mode === 'score';
  const visibleRanked = compact ? ranked.slice(0, 8) : ranked;

  return (
    <motion.section className={`min-h-0 border-b border-[#DFE6EF]/80 pb-4 transition ${emphasized ? 'opacity-100' : 'opacity-85'}`} variants={itemVariants}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-[#172033]">资产店铺评分天梯榜</h2>
        <span className="text-xs font-semibold text-[#6B7280]">Top {visibleRanked.length}</span>
      </div>
      <div className={`mb-3 grid gap-2 text-[11px] font-semibold text-[#667085] ${compact ? 'grid-cols-2' : 'xl:grid-cols-[1fr_1fr_1fr_150px]'}`}>
          <label className="flex min-w-0 items-center gap-2">
            <span className="shrink-0">楼层</span>
            <select aria-label="评分榜楼层筛选" className="min-w-0 flex-1 rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-2 py-1 text-[#172033]" onChange={(event) => setFloorFilter(event.target.value as 'all' | FloorId)} value={floorFilter}>
              <option value="all">全部</option>
              {floorOrder.map((floorId) => (
                <option key={floorId} value={floorId}>
                  {floorId}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 items-center gap-2">
            <span className="shrink-0">业态</span>
            <select aria-label="评分榜业态筛选" className="min-w-0 flex-1 rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-2 py-1 text-[#172033]" onChange={(event) => setCategoryFilter(event.target.value as 'all' | EnterpriseStoreCategory)} value={categoryFilter}>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? '全部' : category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 items-center gap-2">
            <span className="shrink-0">评级</span>
            <select aria-label="评分榜评级筛选" className="min-w-0 flex-1 rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-2 py-1 text-[#172033]" onChange={(event) => setGradeFilter(event.target.value as 'all' | StoreGrade)} value={gradeFilter}>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade === 'all' ? '全部' : grade}
                </option>
              ))}
            </select>
          </label>
          <label className={`flex min-w-0 items-center gap-2 ${compact ? 'col-span-2' : ''}`}>
            <span className="shrink-0">最低分 {minimumScore}</span>
            <input aria-label="评分榜最低分筛选" className="range-blue min-w-0 flex-1" max={90} min={0} onChange={(event) => setMinimumScore(Number(event.target.value))} step={5} type="range" value={minimumScore} />
          </label>
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
          {visibleRanked.map((store, index) => (
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
          {visibleRanked.length === 0 ? <div className="border-t border-[#EDF2F7] bg-[#FBFCFE] px-3 py-6 text-center text-xs font-semibold text-[#667085]">暂无符合筛选的合成店铺</div> : null}
        </div>
      </div>
    </motion.section>
  );
}
