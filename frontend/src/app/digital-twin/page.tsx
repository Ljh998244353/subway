import { DigitalTwinOverviewContent } from '../../components/dashboard/TwinLevelPages.tsx';
import { parseTwinUrlState } from '../../lib/url-state.ts';

export default async function DigitalTwinOverviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const state = parseTwinUrlState({ ...(await searchParams), view: 'overview' });
  return <DigitalTwinOverviewContent state={state} />;
}
