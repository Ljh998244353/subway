import { DigitalTwinShell } from '../../components/dashboard/DigitalTwinShell.tsx';

export default function DigitalTwinLayout({
  children,
  sidebar,
  viewport
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  viewport: React.ReactNode;
}>) {
  return <DigitalTwinShell sidebar={sidebar} viewport={viewport}>{children}</DigitalTwinShell>;
}
