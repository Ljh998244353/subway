'use client';

import { useTwinStore } from '../../store/twin-store.ts';
import type { ScenarioDensity, ScenarioSpeed } from '../../store/twin-store.ts';
import { useUrlState } from '../../hooks/use-url-state.ts';

function formatMinute(value: number) {
  const hour = Math.floor(value / 60);
  const minute = value % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
}

const densityOptions: Array<{ id: ScenarioDensity; label: string }> = [
  { id: 'baseline', label: '常态' },
  { id: 'peak', label: '高峰' },
  { id: 'surge', label: '涌入' }
];

const speedOptions: Array<{ id: ScenarioSpeed; label: string }> = [
  { id: 0.5, label: '0.5x' },
  { id: 1, label: '1x' },
  { id: 2, label: '2x' }
];

export function TimeScrubber() {
  const { setState } = useUrlState();
  const isPlaying = useTwinStore((state) => state.isPlaying);
  const minute = useTwinStore((state) => state.scrubberMinute);
  const setPlaying = useTwinStore((state) => state.setPlaying);
  const setMinute = useTwinStore((state) => state.setScrubberMinute);
  const density = useTwinStore((state) => state.scenarioDensity);
  const speed = useTwinStore((state) => state.scenarioSpeed);
  const incidentLevel = useTwinStore((state) => state.incidentLevel);
  const setDensity = useTwinStore((state) => state.setScenarioDensity);
  const setSpeed = useTwinStore((state) => state.setScenarioSpeed);
  const setIncidentLevel = useTwinStore((state) => state.setIncidentLevel);
  const min = 9 * 60;
  const max = 22 * 60;
  const progress = ((minute - min) / (max - min)) * 100;
  const updateDensity = (scenarioDensity: ScenarioDensity) => {
    setDensity(scenarioDensity);
    setState({ scenarioDensity });
  };
  const updateSpeed = (scenarioSpeed: ScenarioSpeed) => {
    setSpeed(scenarioSpeed);
    setState({ scenarioSpeed });
  };
  const updateIncidentLevel = (level: number) => {
    setIncidentLevel(level);
    setState({ incidentLevel: level });
  };

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
      <div className="mt-3 grid gap-2 border-t border-[#E5EAF1] pt-3 text-[11px] font-semibold text-[#667085] md:grid-cols-[1fr_1fr_140px]">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-[#475569]">客流场景</span>
          <div className="flex rounded-md border border-[#DFE6EF] bg-[#F7F9FC] p-0.5">
            {densityOptions.map((option) => (
              <button className={`rounded px-2 py-1 transition ${density === option.id ? 'bg-white text-[#172033] shadow-[0_3px_10px_rgba(15,23,42,0.05)]' : 'hover:text-[#172033]'}`} key={option.id} onClick={() => updateDensity(option.id)} type="button">
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-[#475569]">回放速度</span>
          <div className="flex rounded-md border border-[#DFE6EF] bg-[#F7F9FC] p-0.5">
            {speedOptions.map((option) => (
              <button className={`rounded px-2 py-1 transition ${speed === option.id ? 'bg-white text-[#172033] shadow-[0_3px_10px_rgba(15,23,42,0.05)]' : 'hover:text-[#172033]'}`} key={option.id} onClick={() => updateSpeed(option.id)} type="button">
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-[#475569]">事件强度</span>
          <input aria-label="Synthetic incident intensity" className="range-blue min-w-0 flex-1" max={3} min={0} onChange={(event) => updateIncidentLevel(Number(event.target.value))} step={1} type="range" value={incidentLevel} />
        </label>
      </div>
    </div>
  );
}
