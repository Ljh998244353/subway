import type { AlertLevel, AlertStatus, MetricStatus, ScoreLevel } from '../types/index.ts';

type StatusBadgeTone = MetricStatus | 'success' | 'neutral';

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

const alertLevelLabel: Record<AlertLevel, string> = {
  high: '高',
  medium: '中',
  low: '低'
};

const alertStatusLabel: Record<AlertStatus, string> = {
  open: '未处理',
  in_progress: '处理中',
  resolved: '已处理'
};

const scoreLevelLabel: Record<ScoreLevel, string> = {
  A: 'A / 优',
  B: 'B / 稳',
  C: 'C / 关注',
  D: 'D / 低效'
};

export function getAlertLevelLabel(level: AlertLevel) {
  return alertLevelLabel[level];
}

export function getAlertStatusLabel(status: AlertStatus) {
  return alertStatusLabel[status];
}

export function getScoreLevelLabel(level: ScoreLevel) {
  return scoreLevelLabel[level];
}

export function getAlertTone(level: AlertLevel): StatusBadgeTone {
  if (level === 'high') {
    return 'danger';
  }

  if (level === 'medium') {
    return 'warning';
  }

  return 'info';
}

export function getAlertStatusTone(status: AlertStatus): StatusBadgeTone {
  if (status === 'resolved') {
    return 'success';
  }

  if (status === 'in_progress') {
    return 'warning';
  }

  return 'danger';
}

export function getScoreTone(level: ScoreLevel): StatusBadgeTone {
  if (level === 'A' || level === 'B') {
    return 'success';
  }

  if (level === 'C') {
    return 'warning';
  }

  return 'danger';
}

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${tone}`}>{label}</span>;
}
