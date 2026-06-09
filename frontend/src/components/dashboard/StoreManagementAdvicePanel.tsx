'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useUrlState } from '../../hooks/use-url-state.ts';
import { alertEvents, getStore, stores } from '../../lib/twin-data.ts';
import { buildTwinHref } from '../../lib/url-state.ts';
import { generateStoreManagementAdvice, getAdviceForStore } from '../../lib/store-management-advice.ts';
import type { StoreManagementAdvice } from '../../types/index.ts';
import { InspectorSection, StatusPill } from './InspectorPrimitives.tsx';

const priorityTone: Record<StoreManagementAdvice['priority'], 'red' | 'amber' | 'green'> = {
  high: 'red',
  medium: 'amber',
  low: 'green'
};

const priorityLabel: Record<StoreManagementAdvice['priority'], string> = {
  high: '高优先级',
  medium: '中优先级',
  low: '观察项'
};

const categoryLabel: Record<StoreManagementAdvice['category'], string> = {
  traffic: '导流',
  conversion: '转化',
  dwell: '停留',
  alert: '告警',
  category_ops: '业态运营'
};

export function StoreManagementAdvicePanel({ compact = false, storeId }: { compact?: boolean; storeId?: string }) {
  const { state } = useUrlState();
  const advice = useMemo(() => generateStoreManagementAdvice({ stores, alerts: alertEvents, state, limit: compact ? 5 : 12 }), [state]);
  const visibleAdvice = storeId ? getAdviceForStore(storeId, advice) : advice;
  const displayAdvice = compact ? visibleAdvice.slice(0, 5) : visibleAdvice.slice(0, 6);
  const title = storeId ? `${getStore(storeId).name} 管理建议` : '店铺管理建议';

  return (
    <InspectorSection eyebrow="P10 Store Advice" title={title} trailing={<StatusPill tone="amber">大模型未启用</StatusPill>}>
      <div className="space-y-2">
        {displayAdvice.map((item) => {
          const store = getStore(item.storeId);
          return (
            <article className="rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-3 py-2" key={item.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#667085]">{categoryLabel[item.category]} · {store.floorId} · {store.name}</p>
                  <h3 className="mt-1 text-sm font-semibold leading-5 text-[#172033]">{item.title}</h3>
                </div>
                <StatusPill tone={priorityTone[item.priority]}>{priorityLabel[item.priority]}</StatusPill>
              </div>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#667085]">{item.reason}</p>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-[#475569]">
                {item.actions.slice(0, compact ? 1 : 2).map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#667085]">
                <span className="rounded bg-[#EDF2F7] px-2 py-1">规则建议</span>
                <span>{item.evidence[0]}</span>
                {!storeId ? (
                  <Link className="ml-auto text-[#3F5FB5] hover:underline" href={buildTwinHref({ view: 'store', floorId: store.floorId, storeId: store.id, mode: item.category === 'alert' ? 'alerts' : 'score', flowScope: state.flowScope })}>
                    查看店铺
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
        {displayAdvice.length === 0 ? <p className="rounded-md border border-[#DFE6EF] bg-[#FBFCFE] px-3 py-4 text-center text-xs font-semibold text-[#667085]">当前合成店铺暂无高优先级管理建议。</p> : null}
      </div>
      <p className="mt-3 border-t border-[#EDF2F7] pt-2 text-[11px] font-semibold leading-5 text-[#667085]">
        合成聚合建议：不含真实视频、人脸、会员、手机号、订单支付或个人轨迹。真实大模型 key 仅允许放在后端 .env。
      </p>
    </InspectorSection>
  );
}
