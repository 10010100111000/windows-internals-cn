import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Windows Internals 中文站',
  description: 'Windows 内核原理交互式学习指南：全面解析系统架构、进程线程调度、虚拟内存管理及安全防护机制。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
