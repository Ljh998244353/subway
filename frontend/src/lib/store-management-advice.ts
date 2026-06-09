import type { AlertEvent, ScenarioDensity, StoreManagementAdvice, StoreMetric, TwinUrlState } from '../types/index.ts';

const priorityRank = { high: 0, medium: 1, low: 2 } as const;

export type StoreAdviceInput = {
  stores: StoreMetric[];
  alerts: AlertEvent[];
  state?: Pick<TwinUrlState, 'mode' | 'scenarioDensity' | 'incidentLevel'>;
  limit?: number;
};

export function generateStoreManagementAdvice({ stores, alerts, state, limit = 12 }: StoreAdviceInput): StoreManagementAdvice[] {
  const density: ScenarioDensity = state?.scenarioDensity ?? 'peak';
  const incidentLevel = state?.incidentLevel ?? 0;
  const mode = state?.mode ?? 'score';
  const openAlertStoreIds = new Set(alerts.filter((event) => event.storeId && !event.isResolved).map((event) => event.storeId));
  const criticalAlertStoreIds = new Set(alerts.filter((event) => event.storeId && event.level === 'critical' && !event.isResolved).map((event) => event.storeId));
  const advice: StoreManagementAdvice[] = [];

  for (const store of stores) {
    if (store.hasWarning || openAlertStoreIds.has(store.id)) {
      advice.push({
        id: `adv_${store.id}_alert`,
        storeId: store.id,
        priority: criticalAlertStoreIds.has(store.id) || incidentLevel >= 2 || mode === 'alerts' ? 'high' : 'medium',
        category: 'alert',
        title: '优先处理门店告警',
        reason: store.warningText ?? '该店存在未闭环的合成运营告警。',
        actions: ['核对店前动线和导购响应', '在当日高峰前完成一次店面巡检', '将处理结论同步到值班记录'],
        expectedImpact: '降低未闭环风险，避免低效信号继续扩大。',
        evidence: [`warning=${store.hasWarning}`, `incidentLevel=${incidentLevel}`],
        source: 'rule'
      });
    }

    if (store.grade === 'C-' || store.score < 62) {
      advice.push({
        id: `adv_${store.id}_conversion`,
        storeId: store.id,
        priority: 'high',
        category: 'conversion',
        title: '启动低分店铺提升动作',
        reason: `综合评分 ${store.score}，低于合成运营阈值。`,
        actions: ['复盘近三日进店转化', '调整店前主推品和活动露出', '安排楼层运营做一次到店诊断'],
        expectedImpact: '提升进店转化和评分稳定性。',
        evidence: [`score=${store.score}`, `grade=${store.grade}`],
        source: 'rule'
      });
    }

    if (store.entryRate < 20) {
      advice.push({
        id: `adv_${store.id}_traffic`,
        storeId: store.id,
        priority: density === 'surge' || mode === 'flow' || mode === 'heatmap' ? 'high' : 'medium',
        category: 'traffic',
        title: '加强店前导流',
        reason: `进店率 ${store.entryRate}% 偏低，店前客流未充分转化。`,
        actions: ['优化入口视觉锚点', '在相邻热区布置轻量活动', '检查导视与橱窗信息是否清晰'],
        expectedImpact: '把周边客流转化为实际进店。',
        evidence: [`entryRate=${store.entryRate}%`, `density=${density}`],
        source: 'rule'
      });
    }

    if (store.avgDwellTime < 12) {
      advice.push({
        id: `adv_${store.id}_dwell`,
        storeId: store.id,
        priority: 'medium',
        category: 'dwell',
        title: '提升停留体验',
        reason: `平均停留 ${store.avgDwellTime} 分钟，体验深度不足。`,
        actions: ['增加试用/试吃/互动点', '调整高频品陈列路径', '设计两件套或组合推荐'],
        expectedImpact: '拉长有效停留时间，改善后续转化。',
        evidence: [`avgDwellTime=${store.avgDwellTime}m`],
        source: 'rule'
      });
    }

    if (store.score >= 88 && !store.hasWarning) {
      advice.push({
        id: `adv_${store.id}_category_ops`,
        storeId: store.id,
        priority: 'low',
        category: 'category_ops',
        title: '复制高表现经验',
        reason: `该店评分 ${store.score}，可作为同业态参考样本。`,
        actions: ['记录陈列和活动节奏', '提炼可复用话术', '与同楼层同业态店铺做对照'],
        expectedImpact: '形成可复用运营模板。',
        evidence: [`score=${store.score}`, `category=${store.category}`],
        source: 'rule'
      });
    }
  }

  return advice.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || a.storeId.localeCompare(b.storeId) || a.id.localeCompare(b.id)).slice(0, limit);
}

export function getAdviceForStore(storeId: string, adviceList: StoreManagementAdvice[]) {
  return adviceList.filter((item) => item.storeId === storeId);
}

export function assertNoBlockedAdviceFields(adviceList: StoreManagementAdvice[]) {
  const serialized = JSON.stringify(adviceList).toLowerCase();
  const blocked = ['face_id', 'member_id', 'phone', 'person_id', 'track_id', 'trajectory_id', 'raw_frame', 'video_url', 'image_url', 'order_id', 'payment_id'];
  return blocked.filter((field) => serialized.includes(field));
}
