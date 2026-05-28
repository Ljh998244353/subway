'use client';

export function InspectorSection({
  children,
  eyebrow,
  title,
  trailing
}: Readonly<{
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  trailing?: React.ReactNode;
}>) {
  return (
    <section className="border-b border-[#DFE6EF]/80 py-4 first:pt-0 last:border-b-0">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-wide text-[#667085]">{eyebrow}</p> : null}
          <h2 className="mt-0.5 truncate text-sm font-semibold text-[#172033]">{title}</h2>
        </div>
        {trailing ? <div className="shrink-0 text-xs font-semibold text-[#667085]">{trailing}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function MetricRow({
  label,
  value,
  tone = 'neutral'
}: Readonly<{
  label: string;
  value: React.ReactNode;
  tone?: 'neutral' | 'blue' | 'red' | 'amber' | 'green';
}>) {
  const toneClass =
    tone === 'red'
      ? 'text-[#B94A45]'
      : tone === 'amber'
        ? 'text-[#98620A]'
        : tone === 'green'
          ? 'text-emerald-700'
          : tone === 'blue'
            ? 'text-[#3F5FB5]'
            : 'text-[#172033]';

  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[#EDF2F7] py-2 first:border-t-0">
      <span className="text-xs font-semibold text-[#667085]">{label}</span>
      <strong className={`font-mono text-sm font-bold tabular-nums ${toneClass}`}>{value}</strong>
    </div>
  );
}

export function InspectorListRow({
  children,
  href,
  trailing
}: Readonly<{
  children: React.ReactNode;
  href?: string;
  trailing?: React.ReactNode;
}>) {
  const className = 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[#EDF2F7] py-2 text-left transition first:border-t-0 hover:bg-[#F7F9FC]';

  if (href) {
    return (
      <a className={className} href={href}>
        <span className="min-w-0">{children}</span>
        {trailing ? <span className="shrink-0">{trailing}</span> : null}
      </a>
    );
  }

  return (
    <div className={className}>
      <span className="min-w-0">{children}</span>
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </div>
  );
}

export function StatusPill({
  children,
  tone = 'neutral'
}: Readonly<{
  children: React.ReactNode;
  tone?: 'neutral' | 'blue' | 'red' | 'amber' | 'green';
}>) {
  const toneClass =
    tone === 'red'
      ? 'bg-[#FCEEEE] text-[#B94A45]'
      : tone === 'amber'
        ? 'bg-[#FBF3E3] text-[#98620A]'
        : tone === 'green'
          ? 'bg-emerald-50 text-emerald-700'
          : tone === 'blue'
            ? 'bg-[#EEF2FF] text-[#3F5FB5]'
            : 'bg-[#EDF2F7] text-[#172033]';

  return <span className={`rounded px-2 py-1 text-xs font-bold ${toneClass}`}>{children}</span>;
}
