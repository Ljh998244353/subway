'use client';

import { motion } from 'framer-motion';
import { useUrlState } from '../../hooks/use-url-state.ts';
import type { DataLayer } from '../../types/index.ts';

const tabs: Array<{ id: DataLayer; label: string }> = [
  { id: 'flow', label: '全局动线' },
  { id: 'heatmap', label: '热力分布' },
  { id: 'score', label: '招商调铺' },
  { id: 'alerts', label: '安全预警' }
];

export function GlobalHeader() {
  const { state, setState } = useUrlState();

  return (
    <header className="h-16 border-b border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] flex items-center justify-between px-5">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-10 w-10 rounded-2xl bg-[#111827] text-white grid place-items-center font-black">V</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-semibold text-[#111827] truncate">商业综合体视觉 AI 数字孪生运营系统</h1>
            <span className="rounded-full bg-[#3F5FB5]/10 px-2 py-0.5 text-xs font-semibold text-[#3F5FB5]">Enterprise OS v2.7</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI 摄像头网络在线率 98.6%</span>
          </div>
        </div>
      </div>

      <nav className="relative flex rounded-2xl border border-white/60 bg-[#F7F9FC]/80 p-1" aria-label="视窗模式">
        {tabs.map((tab) => (
          <button
            aria-label={`切换到${tab.label}`}
            className={`relative z-10 rounded-xl px-4 py-2 text-sm font-semibold transition ${state.mode === tab.id ? 'text-white' : 'text-[#6B7280] hover:text-[#111827]'}`}
            key={tab.id}
            onClick={() => setState({ mode: tab.id })}
            type="button"
          >
            {state.mode === tab.id ? <motion.span className="absolute inset-0 -z-10 rounded-xl bg-[#3F5FB5]" layoutId="activeTab" /> : null}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 text-sm text-[#6B7280]">
        <span className="font-mono text-[#111827]">2026-05-27 14:30:00</span>
        <button className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 font-semibold" type="button">中文</button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#3F5FB5] to-[#3F8F91] text-white grid place-items-center font-bold">OP</div>
      </div>
    </header>
  );
}
