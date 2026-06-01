'use client';

import { mockCustomerProfile } from '../../mock/mockCustomerProfile.ts';
import { mockFlowEdges, mockHeatmapPoints } from '../../mock/mockOverview.ts';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { alertEvents, stores } from '../../lib/twin-data.ts';
import { useTwinStore } from '../../store/twin-store.ts';
import type { DataLayer } from '../../types/index.ts';
import { InspectorSection, MetricRow, StatusPill } from './InspectorPrimitives.tsx';

const modeInsightLabel: Record<DataLayer, string> = {
  heatmap: '热区解释',
  flow: '动线解释',
  score: '评分解释',
  alerts: '告警解释'
};

function formatMinute(value: number) {
  const hour = Math.floor(value / 60);
  const minute = value % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function AnalyticsSnapshotPanel() {
  const { state } = useUrlState();
  const scrubberMinute = useTwinStore((store) => store.scrubberMinute);
  const scenarioSpeed = useTwinStore((store) => store.scenarioSpeed);
  const scenarioDensity = useTwinStore((store) => store.scenarioDensity);
  const strongestHeat = [...mockHeatmapPoints].sort((a, b) => b.intensity - a.intensity)[0];
  const busiestFlow = [...mockFlowEdges].sort((a, b) => b.traffic - a.traffic)[0];
  const lowScoreCount = stores.filter((store) => store.grade === 'C-').length;
  const avgScore = Math.round(stores.reduce((total, store) => total + store.score, 0) / stores.length);
  const topCategory = mockCustomerProfile.categoryPreferences.reduce((best, item) => (item.trafficShare > best.trafficShare ? item : best));
  const peakHour = mockCustomerProfile.timeDistribution.reduce((best, item) => (item.traffic > best.traffic ? item : best));
  const openAlertCount = alertEvents.filter((event) => !event.isResolved).length;
  const modeInsight =
    state.mode === 'heatmap'
      ? `当前热力模式聚焦 ${strongestHeat?.floorId ?? 'N/A'}，最高强度 ${strongestHeat?.intensity ?? 'N/A'}。`
      : state.mode === 'flow'
        ? `当前动线模式聚焦 ${busiestFlow?.floorId ?? 'N/A'}，最高边流量 ${busiestFlow?.traffic ?? 'N/A'}。`
        : state.mode === 'score'
          ? `当前评分模式聚焦 ${lowScoreCount} 个低分合成店铺，均分 ${avgScore}。`
          : `当前告警模式聚焦 ${openAlertCount} 条未闭环合成事件。`;

  return (
    <InspectorSection eyebrow="P9 Synthetic Analytics" title="综合体分析快照" trailing={<StatusPill tone="blue">Mock</StatusPill>}>
      <div className="space-y-1">
        <div className="mb-2 rounded-md border border-[#DFE6EF] bg-[#F7F9FC] px-2 py-2 text-xs font-semibold leading-5 text-[#475569]">
          <span className="mr-2 font-bold text-[#172033]">{modeInsightLabel[state.mode]}</span>
          {modeInsight}
        </div>
        <div className="mb-2 rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-2 py-2 text-xs font-semibold leading-5 text-[#475569]">
          <span className="mr-2 font-bold text-[#172033]">回放上下文</span>
          {formatMinute(scrubberMinute)} · {scenarioSpeed}x · {scenarioDensity}
        </div>
        <MetricRow label="主力客群时段" value={`${mockCustomerProfile.activeTimeRange}`} tone="blue" />
        <MetricRow label="峰值小时" value={`${peakHour.hour}:00`} />
        <MetricRow label="首选业态" value={topCategory.category} tone="green" />
        <MetricRow label="复访倾向" value={`${mockCustomerProfile.revisitTendency}%`} />
        <MetricRow label="最强热区" value={strongestHeat ? `${strongestHeat.floorId} / ${strongestHeat.intensity}` : 'N/A'} tone="amber" />
        <MetricRow label="最忙动线" value={busiestFlow ? `${busiestFlow.floorId} / ${busiestFlow.traffic}` : 'N/A'} tone="blue" />
        <MetricRow label="均分 / 低分店" value={`${avgScore} / ${lowScoreCount}`} tone={lowScoreCount > 0 ? 'red' : 'green'} />
      </div>
      <p className="mt-3 border-t border-[#EDF2F7] pt-2 text-[11px] font-semibold leading-5 text-[#667085]">
        匿名聚合快照：不含人脸、会员、手机号、真实视频或个人轨迹。
      </p>
    </InspectorSection>
  );
}
