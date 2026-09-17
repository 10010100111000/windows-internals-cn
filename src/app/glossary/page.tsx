import type { Metadata } from 'next';
import { glossaryEntries } from '@/data/glossary';
import { GlossaryCard } from '@/components/GlossaryCard';
import { BookOpen, Binary } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Windows 内核术语表 - Windows Internals 中文站',
  description: '收录 Windows 操作系统关键技术缩写、内核结构全称、中文释义及对应知识文档链接。',
};

export default function GlossaryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 顶部介绍面板 */}
      <section className="surface-panel rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>权威名词释义库</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Windows 内核术语表
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-2xl">
          收录 Windows 内核开发与系统逆向中常见的高频专业英文缩写（如 VAD, SSDT, IRP, ALPC 等），提供完整全称、中文技术定义以及关联文档的快速跳转链接。
        </p>
      </section>

      {/* 术语数量状态 */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
        <span>术语卡片一览</span>
        <span className="font-mono">已收录 {glossaryEntries.length} 条核心术语</span>
      </div>

      {/* 2 列术语卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {glossaryEntries.map((entry) => (
          <GlossaryCard key={entry.term} entry={entry} />
        ))}
      </div>
    </div>
  );
}
