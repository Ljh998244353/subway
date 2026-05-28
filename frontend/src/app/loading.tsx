export default function Loading() {
  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-[#F6F8FB] text-[#172033]">
      <div className="h-14 shrink-0 animate-pulse border-b border-[#DFE6EF]/90 bg-[#FBFCFE]/78" />
      <div className="grid min-h-0 flex-1 grid-cols-1 bg-[#F0F4F8]/55 lg:grid-cols-[minmax(0,1fr)_384px]">
        <section className="relative min-h-0 p-4 pb-28" aria-label="数字孪生加载视窗">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(63,95,181,0.014)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,32,51,0.014)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative h-full min-h-[480px] animate-pulse rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/62" />
          <div className="absolute bottom-4 left-1/2 h-16 w-[min(720px,calc(100%-40px))] -translate-x-1/2 animate-pulse rounded-lg border border-[#DFE6EF]/90 bg-[#FBFCFE]/70" />
        </section>
        <aside className="hidden min-h-0 animate-pulse border-l border-[#DFE6EF]/80 bg-[#FBFCFE]/66 p-4 lg:block">
          <div className="space-y-4">
            <div className="h-24 rounded-md border border-[#DFE6EF]/80 bg-white/55" />
            <div className="h-40 rounded-md border border-[#DFE6EF]/80 bg-white/55" />
            <div className="h-32 rounded-md border border-[#DFE6EF]/80 bg-white/55" />
          </div>
        </aside>
      </div>
    </main>
  );
}
