'use client';

import { useTwinStore } from '../../store/twin-store.ts';

function formatMinute(value: number) {
  const hour = Math.floor(value / 60);
  const minute = value % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
}

export function TimeScrubber() {
  const isPlaying = useTwinStore((state) => state.isPlaying);
  const minute = useTwinStore((state) => state.scrubberMinute);
  const setPlaying = useTwinStore((state) => state.setPlaying);
  const setMinute = useTwinStore((state) => state.setScrubberMinute);
  const min = 9 * 60;
  const max = 22 * 60;
  const progress = ((minute - min) / (max - min)) * 100;

  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-30 w-[min(720px,calc(100%-40px))] -translate-x-1/2 rounded-lg border border-[#DFE6EF]/90 bg-[#FBFCFE]/76 px-4 py-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.34)] backdrop-blur-md">
      <div className="mb-2 flex items-center gap-3">
        <button aria-label={isPlaying ? '暂停回放' : '播放回放'} className="h-8 w-8 rounded-full bg-[#172033] text-[#FBFCFE] focus:outline-none focus:ring-2 focus:ring-[#172033]/25" onClick={() => setPlaying(!isPlaying)} type="button">
          {isPlaying ? 'Ⅱ' : '▶'}
        </button>
        <div className="relative flex-1">
          <div className="pointer-events-none absolute -top-9 rounded bg-[#172033] px-3 py-1 text-xs font-bold text-[#FBFCFE]" style={{ left: `calc(${progress}% - 76px)` }}>
            当前回放时段: {formatMinute(minute)} (客流高峰期)
          </div>
          <input
            aria-label="24 小时时空回放"
            className="range-blue w-full"
            max={max}
            min={min}
            onChange={(event) => setMinute(Number(event.target.value))}
            step={5}
            type="range"
            value={minute}
          />
        </div>
      </div>
      <div className="ml-11 flex justify-between text-[11px] font-semibold text-[#667085]">
        <span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span><span>21:00</span>
      </div>
    </div>
  );
}
