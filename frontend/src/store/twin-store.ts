'use client';

import { create } from 'zustand';
import type { ScenarioDensity, ScenarioSpeed } from '../types/index.ts';

type DispatchState = 'idle' | 'confirming' | 'processing' | 'done';
export type { ScenarioDensity, ScenarioSpeed };

interface TwinClientState {
  hoveredStoreId?: string;
  webglFailed: boolean;
  isPlaying: boolean;
  scrubberMinute: number;
  scenarioDensity: ScenarioDensity;
  scenarioSpeed: ScenarioSpeed;
  incidentLevel: number;
  dispatchStateByAlertId: Record<string, DispatchState>;
  setHoveredStoreId: (storeId?: string) => void;
  setWebglFailed: (failed: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setScrubberMinute: (minute: number) => void;
  setScenarioDensity: (density: ScenarioDensity) => void;
  setScenarioSpeed: (speed: ScenarioSpeed) => void;
  setIncidentLevel: (level: number) => void;
  setDispatchState: (alertId: string, state: DispatchState) => void;
  completeDispatch: (alertId: string) => void;
}

export const useTwinStore = create<TwinClientState>((set) => ({
  webglFailed: false,
  isPlaying: false,
  scrubberMinute: 14 * 60 + 30,
  scenarioDensity: 'peak',
  scenarioSpeed: 1,
  incidentLevel: 1,
  dispatchStateByAlertId: {},
  setHoveredStoreId: (storeId) => set({ hoveredStoreId: storeId }),
  setWebglFailed: (webglFailed) => set({ webglFailed }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setScrubberMinute: (scrubberMinute) => set({ scrubberMinute }),
  setScenarioDensity: (scenarioDensity) => set({ scenarioDensity }),
  setScenarioSpeed: (scenarioSpeed) => set({ scenarioSpeed }),
  setIncidentLevel: (incidentLevel) => set({ incidentLevel }),
  setDispatchState: (alertId, state) =>
    set((current) => ({
      dispatchStateByAlertId: { ...current.dispatchStateByAlertId, [alertId]: state }
    })),
  completeDispatch: (alertId) =>
    set((current) => ({
      dispatchStateByAlertId: { ...current.dispatchStateByAlertId, [alertId]: 'done' }
    }))
}));
