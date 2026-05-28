export default function DigitalTwinLoading() {
  return (
    <div className="h-full min-h-[320px] animate-pulse p-4" aria-label="数字孪生加载视窗">
      <div className="h-full rounded-lg border border-[#DFE6EF]/80 bg-[#FBFCFE]/62 p-4">
        <div className="h-5 w-32 rounded bg-[#EDF2F7]" />
        <div className="mt-5 space-y-3">
          <div className="h-3 w-full rounded bg-[#EDF2F7]" />
          <div className="h-3 w-10/12 rounded bg-[#EDF2F7]" />
          <div className="h-3 w-7/12 rounded bg-[#EDF2F7]" />
        </div>
      </div>
    </div>
  );
}
