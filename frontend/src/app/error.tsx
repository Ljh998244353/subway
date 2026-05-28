'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F7F9FC] p-8">
      <section className="max-w-lg rounded-2xl border border-white/40 bg-white/80 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]">
        <p className="text-sm font-semibold text-[#B94A45]">系统渲染异常</p>
        <h1 className="mt-2 text-2xl font-bold text-[#172033]">数字孪生工作台暂时不可用</h1>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">{error.message}</p>
        <button className="mt-5 rounded-xl bg-[#3F5FB5] px-4 py-2 text-sm font-bold text-white" onClick={reset} type="button">
          重新加载
        </button>
      </section>
    </main>
  );
}
