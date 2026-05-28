'use client';

export function ViewportStage({
  children,
  variant
}: Readonly<{
  children: React.ReactNode;
  variant: 'overview' | 'detail';
}>) {
  const safeInset = variant === 'overview' ? '2xl:pr-8' : 'lg:pr-5';

  return (
    <section className={`relative h-full min-h-0 overflow-hidden ${safeInset}`} aria-label="数字孪生模型工作区">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(63,95,181,0.014)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,32,51,0.014)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 h-full min-h-0 p-3 pb-28 lg:p-4 lg:pb-28">
        {children}
      </div>
    </section>
  );
}
