import Link from 'next/link';
import { ActionableAlertStream } from '../../../../components/dashboard/ActionableAlertStream.tsx';
import { InspectorSection, MetricRow, StatusPill } from '../../../../components/dashboard/InspectorPrimitives.tsx';
import { alertEvents, heatPoints, getFloor, getStoresForFloor } from '../../../../lib/twin-data.ts';
import { buildTwinHref } from '../../../../lib/url-state.ts';
import type { FloorId } from '../../../../types/index.ts';

export default async function FloorSidebar({ params }: { params: Promise<{ floorId: FloorId }> }) {
  const { floorId } = await params;
  const floor = getFloor(floorId);
  const floorStores = getStoresForFloor(floorId);
  const hotPoints = heatPoints.filter((point) => point.floorId === floorId && point.intensity > 0.62);
  const weakStores = floorStores.filter((store) => store.hasWarning).slice(0, 6);
  const floorAlerts = alertEvents.filter((event) => event.floorId === floorId);

  return (
    <aside className="flex h-full min-h-0 flex-col">
      <InspectorSection eyebrow="Floor Focus" title={floor.name}>
        <div className="rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          <MetricRow label="当前人数" value={floor.liveOccupancy} />
          <MetricRow label="今日客流" value={floor.todayTraffic.toLocaleString('zh-CN')} />
          <MetricRow label="拥挤指数" value={floor.crowdingIndex} tone={floor.crowdingIndex > 0.9 ? 'red' : 'neutral'} />
          <MetricRow label="店铺数" value={floorStores.length} />
        </div>
      </InspectorSection>
      <InspectorSection eyebrow="弱项优先" title="该楼层店铺列表">
        <div className="rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          {(weakStores.length ? weakStores : floorStores.slice(0, 6)).map((store) => (
            <Link
              className="flex items-center justify-between gap-3 border-t border-[#EDF2F7] py-2 transition first:border-t-0 hover:bg-[#F7F9FC]"
              href={buildTwinHref({ view: 'store', floorId, storeId: store.id, mode: store.hasWarning ? 'alerts' : 'score', flowScope: 'inbound' })}
              key={store.id}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#172033]">{store.name}</span>
                <span className="text-xs text-[#6B7280]">{store.id} · 进店率 {store.entryRate}% · 停留 {store.avgDwellTime}m</span>
              </span>
              <StatusPill tone={store.hasWarning ? 'red' : 'blue'}>{store.grade}</StatusPill>
            </Link>
          ))}
        </div>
      </InspectorSection>
      <InspectorSection title="拥挤点与热区说明">
        <div className="rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          <MetricRow label="高热区" value={hotPoints.length} tone={hotPoints.length > 0 ? 'red' : 'neutral'} />
          <MetricRow label="相关告警" value={floorAlerts.length} tone={floorAlerts.length > 0 ? 'amber' : 'neutral'} />
        </div>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">热区集中在中庭环廊与扶梯口，建议在热力图模式下查看分布，在人流模式下核对进出方向。</p>
      </InspectorSection>
      <ActionableAlertStream scope={{ view: 'floor', floorId }} />
    </aside>
  );
}
