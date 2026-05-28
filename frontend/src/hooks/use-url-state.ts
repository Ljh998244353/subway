'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { buildTwinHref, parseTwinUrlState } from '../lib/url-state.ts';
import type { TwinUrlState } from '../types/index.ts';

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const state = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return parseTwinUrlState(params);
  }, [searchParams]);

  const setState = useCallback((next: Partial<TwinUrlState>) => {
    const merged = { ...state, ...next };
    const href = buildTwinHref(merged);
    startTransition(() => {
      router.push(href);
    });
  }, [router, state]);

  return { state, setState, isPending };
}
