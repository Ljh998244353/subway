import Link from 'next/link';
import { ActionableAlertStream } from '../../../../../components/dashboard/ActionableAlertStream.tsx';
import { InspectorSection, MetricRow, StatusPill } from '../../../../../components/dashboard/InspectorPrimitives.tsx';
import { alertEvents, getFloor, getStoresForFloor, getStore } from '../../../../../lib/twin-data.ts';
import { buildTwinHref } from '../../../../../lib/url-state.ts';

export default async function StoreSidebar({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  const store = getStore(storeId);
  const floor = getFloor(store.floorId);
  const siblingStores = getStoresForFloor(store.floorId).filter((item) => item.id !== store.id).slice(0, 5);
  const relatedAlerts = alertEvents.filter((event) => event.storeId === store.id || event.floorId === store.floorId).slice(0, 4);
  const scoreParts = [
    { label: '客流捕获', value: Math.round(store.entryRate) },
    { label: '停留质量', value: Math.round(store.avgDwellTime * 2) },
    { label: '拥挤承载', value: Math.max(35, 94 - store.liveOccupancy) }
  ];

  return (
    <aside className="flex h-full min-h-0 flex-col">
      <InspectorSection eyebrow="Store Drilldown" title={store.name} trailing={<StatusPill tone={store.hasWarning ? 'red' : 'blue'}>{store.grade}</StatusPill>}>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">{store.warningText ?? '综合资产表现稳定，建议继续观察客流路径与停留质量。'}</p>
        <div className="mt-3 rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          <MetricRow label="店内人数" value={store.liveOccupancy} />
          <MetricRow label="进店率" value={`${store.entryRate}%`} tone={store.entryRate < 20 ? 'amber' : 'neutral'} />
          <MetricRow label="平均停留" value={`${store.avgDwellTime}m`} />
          <MetricRow label="所在楼层" value={floor.name} />
        </div>
      </InspectorSection>
      <InspectorSection title="评分拆解与低效原因">
        <div className="mt-3 space-y-3">
          {scoreParts.map((part) => (
            <div key={part.label}>
              <div className="mb-1 flex justify-between text-xs font-semibold text-[#6B7280]">
                <span>{part.label}</span><span>{part.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-[#EDF2F7]">
                <div className="h-full rounded bg-[#3F5FB5]" style={{ width: `${Math.min(100, part.value)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">{store.warningText ?? '评分稳定，建议继续观察客流路径和停留质量。'}</p>
      </InspectorSection>
      <InspectorSection title="调铺建议" trailing={floor.name}>
        <p className="text-sm leading-6 text-[#6B7280]">
          建议优先模拟与高停留业态相邻的替换方案，并对比入口动线、热区边缘和店前过客转化。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {siblingStores.map((item) => (
            <Link className="rounded-full bg-[#F7F9FC] px-3 py-1.5 text-xs font-bold text-[#6B7280] hover:text-[#3F5FB5]" href={buildTwinHref({ view: 'store', floorId: item.floorId, storeId: item.id, mode: 'score', flowScope: 'inbound' })} key={item.id}>
              {item.id}
            </Link>
          ))}
        </div>
      </InspectorSection>
      <InspectorSection title="相关告警">
        <div className="mt-3 rounded-md border border-[#DFE6EF]/80 bg-white/60 px-3">
          {relatedAlerts.map((event) => (
            <div className="border-t border-[#EDF2F7] py-2 text-xs text-[#6B7280] first:border-t-0" key={event.id}>
              <strong className={event.level === 'critical' ? 'text-[#B94A45]' : 'text-[#B7791F]'}>{event.id}</strong> · {event.message}
            </div>
          ))}
        </div>
      </InspectorSection>
      <ActionableAlertStream scope={{ view: 'store', floorId: store.floorId, storeId: store.id }} />
    </aside>
  );
}
