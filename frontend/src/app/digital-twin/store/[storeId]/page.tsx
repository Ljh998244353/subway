import { StoreFocusContent } from '../../../../components/dashboard/TwinLevelPages.tsx';
import { getStore } from '../../../../lib/twin-data.ts';
import { parseTwinUrlState } from '../../../../lib/url-state.ts';

export default async function StoreFocusPage({
  params,
  searchParams
}: {
  params: Promise<{ storeId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { storeId } = await params;
  const store = getStore(storeId);
  const state = parseTwinUrlState({ ...(await searchParams), view: 'store', floorId: store.floorId, storeId });
  return <StoreFocusContent state={state} storeId={storeId} />;
}
