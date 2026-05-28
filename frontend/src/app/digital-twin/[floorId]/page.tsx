import { FloorFocusContent } from '../../../components/dashboard/TwinLevelPages.tsx';
import { parseTwinUrlState } from '../../../lib/url-state.ts';
import type { FloorId } from '../../../types/index.ts';

export default async function FloorFocusPage({
  params,
  searchParams
}: {
  params: Promise<{ floorId: FloorId }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { floorId } = await params;
  const state = parseTwinUrlState({ ...(await searchParams), view: 'floor', floorId });
  return <FloorFocusContent floorId={floorId} state={state} />;
}
