import { HybridViewport } from '../../../../components/twin-engine/HybridViewport.tsx';
import { parseTwinUrlState } from '../../../../lib/url-state.ts';
import type { FloorId } from '../../../../types/index.ts';

export default async function FloorViewport({
  params,
  searchParams
}: {
  params: Promise<{ floorId: FloorId }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const route = await params;
  const state = parseTwinUrlState({ ...(await searchParams), floorId: route.floorId, view: 'floor' });
  return <HybridViewport state={state} />;
}
