import type { StoreScoreBreakdown } from '../types/index.ts';
import { scoreParts } from './scoreBreakdownUtils.ts';

type ScoreBreakdownProps = {
  breakdown: StoreScoreBreakdown;
};

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  return (
    <div className="score-breakdown" aria-label="评分拆解">
      {scoreParts.map((part) => {
        const value = breakdown[part.key];
        const contribution = Math.round(value * part.weight);

        return (
          <div className="score-breakdown__item" key={part.key}>
            <div className="score-breakdown__label">
              <span>{part.label}</span>
              <strong>{value} 分</strong>
            </div>
            <div className="score-breakdown__bar" aria-hidden="true">
              <span style={{ width: `${value}%` }} />
            </div>
            <span className="score-breakdown__meta">
              权重 {Math.round(part.weight * 100)}% · 贡献 {contribution} 分
            </span>
          </div>
        );
      })}
    </div>
  );
}
