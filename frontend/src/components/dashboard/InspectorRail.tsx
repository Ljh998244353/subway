'use client';

export function InspectorRail({
  children,
  className = ''
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <aside
      className={`min-h-0 overflow-y-auto border-l border-[#DFE6EF]/80 bg-[#FBFCFE]/66 px-3 py-4 shadow-[-12px_0_34px_-30px_rgba(15,23,42,0.24)] backdrop-blur-md [scrollbar-width:none] ${className}`}
    >
      {children}
    </aside>
  );
}
