import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '商业综合体视觉 AI 数字孪生运营系统',
  description: 'Enterprise synthetic digital twin operations OS.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
