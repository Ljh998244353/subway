'use client';

import { create } from 'zustand';

type DispatchState = 'idle' | 'confirming' | 'processing' | 'done';

interface TwinClientState {
  hoveredStoreId?: string;
  webglFailed: boolean;
  isPlaying: boolean;
  scrubberMinute: number;
  dispatchStateByAlertId: Record<string, DispatchState>;
  setHoveredStoreId: (storeId?: string) => void;
  setWebglFailed: (failed: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setScrubberMinute: (minute: number) => void;
  setDispatchState: (alertId: string, state: DispatchState) => void;
  completeDispatch: (alertId: string) => void;
}

export const useTwinStore = create<TwinClientState>((set) => ({
  webglFailed: false,
  isPlaying: false,
  scrubberMinute: 14 * 60 + 30,
  dispatchStateByAlertId: {},
  setHoveredStoreId: (storeId) => set({ hoveredStoreId: storeId }),
  setWebglFailed: (webglFailed) => set({ webglFailed }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setScrubberMinute: (scrubberMinute) => set({ scrubberMinute }),
  setDispatchState: (alertId, state) =>
    set((current) => ({
      dispatchStateByAlertId: { ...current.dispatchStateByAlertId, [alertId]: state }
    })),
  completeDispatch: (alertId) =>
    set((current) => ({
      dispatchStateByAlertId: { ...current.dispatchStateByAlertId, [alertId]: 'done' }
    }))
}));
