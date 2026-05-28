import Link from 'next/link';
import { ActionableAlertStream } from '../../../components/dashboard/ActionableAlertStream.tsx';
import { InspectorSection, MetricRow, StatusPill } from '../../../components/dashboard/InspectorPrimitives.tsx';
import { floors, stores } from '../../../lib/twin-data.ts';
import { buildTwinHref } from '../../../lib/url-state.ts';

export default function DefaultSidebar() {
  const alertCount = floors.reduce((sum, floor) => sum + floor.alertCount, 0);
  const weakStores = stores.filter((store) => store.hasWarning).length;
  const rankedFloors = [...floors].sort((a, b) => b.alertCount + b.crowdingIndex - (a.alertCount + a.crowdingIndex));

  return (
    <aside className="flex h-full min-h-0 flex-col">
      <InspectorSection eyebrow="Global Operations" title="全局运营态势">
        <div className="rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          <MetricRow label="楼层" value={floors.length} />
          <MetricRow label="店铺" value={stores.length} />
          <MetricRow label="告警" value={alertCount} tone={alertCount > 0 ? 'red' : 'neutral'} />
          <MetricRow label="低效" value={weakStores} tone={weakStores > 0 ? 'amber' : 'neutral'} />
        </div>
      </InspectorSection>
      <InspectorSection eyebrow="Drilldown" title="楼层风险排行">
        <div className="rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          {rankedFloors.map((floor) => (
            <Link
              className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border-t border-[#EDF2F7] py-2 first:border-t-0 hover:bg-[#F7F9FC]"
              href={buildTwinHref({ view: 'floor', floorId: floor.id, mode: floor.crowdingIndex > 0.9 ? 'heatmap' : 'alerts', flowScope: 'inbound' })}
              key={floor.id}
            >
              <strong className="font-mono text-sm text-[#3F5FB5]">{floor.id}</strong>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#172033]">{floor.name}</span>
                <span className="text-xs text-[#6B7280]">拥挤 {floor.crowdingIndex} · 告警 {floor.alertCount}</span>
              </span>
              <StatusPill tone={floor.alertCount > 1 ? 'red' : 'neutral'}>进入</StatusPill>
            </Link>
          ))}
        </div>
      </InspectorSection>
      <ActionableAlertStream scope={{ view: 'overview' }} />
    </aside>
  );
}
