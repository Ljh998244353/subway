'use client';

import { usePathname } from 'next/navigation';
import { AnalyticsSnapshotPanel } from './AnalyticsSnapshotPanel.tsx';
import { InspectorRail } from './InspectorRail.tsx';
import { MerchantGradingBoard } from './MerchantGradingBoard.tsx';
import { TimeScrubber } from './TimeScrubber.tsx';
import { TrafficAnalyticsSidebar } from './TrafficAnalyticsSidebar.tsx';
import { TwinCommandBar } from './TwinCommandBar.tsx';
import { ViewportStage } from './ViewportStage.tsx';

export function DigitalTwinShell({
  children,
  sidebar,
  viewport
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  viewport: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOverview = pathname === '/digital-twin';
  const isStoreWorkspace = pathname.startsWith('/digital-twin/store/');

  if (!isOverview) {
    if (isStoreWorkspace) {
      return (
        <main className="relative z-10 flex h-screen w-screen flex-col overflow-hidden bg-[#F6F8FB] text-[#172033]">
          <TwinCommandBar />
          <section className="grid min-h-0 flex-1 grid-cols-1 bg-[#F0F4F8]/55 lg:grid-cols-[minmax(0,1fr)_384px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-h-0 overflow-y-auto px-4 py-4 [scrollbar-width:none]">
              {children}
            </div>
            <InspectorRail>{sidebar}</InspectorRail>
          </section>
        </main>
      );
    }

    return (
      <main className="relative z-10 flex h-screen w-screen flex-col overflow-hidden bg-[#F6F8FB] text-[#172033]">
        <TwinCommandBar />
        <section className="grid min-h-0 flex-1 grid-cols-1 bg-[#F0F4F8]/55 lg:grid-cols-[minmax(0,1fr)_384px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="relative min-h-0 overflow-hidden">
            <ViewportStage variant="detail">
              {viewport}
              {children}
            </ViewportStage>
            <TimeScrubber />
          </div>
          <InspectorRail>{sidebar}</InspectorRail>
        </section>
      </main>
    );
  }

  return (
    <main className="relative z-10 flex h-screen w-screen flex-col overflow-hidden bg-[#F6F8FB] text-[#172033]">
      <TwinCommandBar />
      <section className="grid min-h-0 flex-1 grid-cols-1 bg-[#F0F4F8]/55 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[292px_minmax(0,1fr)_352px]">
        <div className="order-2 hidden min-h-0 flex-col overflow-y-auto border-r border-[#DFE6EF]/80 bg-[#FBFCFE]/56 px-3 py-4 [scrollbar-width:none] xl:order-1 xl:flex">
          <TrafficAnalyticsSidebar compact />
          <AnalyticsSnapshotPanel />
          <div className="mt-4">
            <MerchantGradingBoard compact />
          </div>
        </div>
        <div className="relative order-1 min-h-0 overflow-hidden xl:order-2">
          <ViewportStage variant="overview">
            {viewport}
            {children}
          </ViewportStage>
          <TimeScrubber />
        </div>
        <InspectorRail className="order-3 xl:col-span-2 2xl:col-span-1">{sidebar}</InspectorRail>
      </section>
    </main>
  );
}
