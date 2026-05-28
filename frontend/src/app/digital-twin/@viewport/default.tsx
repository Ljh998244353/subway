import { HybridViewport } from '../../../components/twin-engine/HybridViewport.tsx';
import { parseTwinUrlState } from '../../../lib/url-state.ts';

export default async function DefaultViewport({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const state = parseTwinUrlState(await searchParams);
  return <HybridViewport state={state} />;
}
