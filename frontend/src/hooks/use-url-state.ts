'use client';

import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { buildTwinHref, parseTwinUrlState } from '../lib/url-state.ts';
import { useTwinStore } from '../store/twin-store.ts';
import type { TwinUrlState } from '../types/index.ts';

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const setScenarioDensity = useTwinStore((store) => store.setScenarioDensity);
  const setScenarioSpeed = useTwinStore((store) => store.setScenarioSpeed);
  const setIncidentLevel = useTwinStore((store) => store.setIncidentLevel);
  const state = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return parseTwinUrlState(params);
  }, [searchParams]);

  useEffect(() => {
    setScenarioDensity(state.scenarioDensity);
    setScenarioSpeed(state.scenarioSpeed);
    setIncidentLevel(state.incidentLevel);
  }, [setIncidentLevel, setScenarioDensity, setScenarioSpeed, state.incidentLevel, state.scenarioDensity, state.scenarioSpeed]);

  const setState = useCallback((next: Partial<TwinUrlState>) => {
    const merged = { ...state, ...next };
    const href = buildTwinHref(merged);
    startTransition(() => {
      router.push(href);
    });
  }, [router, state]);

  return { state, setState, isPending };
}
