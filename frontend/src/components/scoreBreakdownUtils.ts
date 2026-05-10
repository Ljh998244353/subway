import type { StoreScoreBreakdown } from '../types/index.ts';

export const scoreParts: Array<{
  key: keyof StoreScoreBreakdown;
  label: string;
  weight: number;
}> = [
  { key: 'traffic', label: '客流得分', weight: 0.3 },
  { key: 'conversion', label: '转化得分', weight: 0.3 },
  { key: 'dwell', label: '停留得分', weight: 0.2 },
  { key: 'trend', label: '趋势得分', weight: 0.2 }
];

export function getWeightedScore(breakdown: StoreScoreBreakdown) {
  return Math.round(
    breakdown.traffic * 0.3 +
      breakdown.conversion * 0.3 +
      breakdown.dwell * 0.2 +
      breakdown.trend * 0.2
  );
}
