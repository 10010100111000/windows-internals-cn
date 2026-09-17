import Link from 'next/link';
import { topicTree } from '@/data/topics';
import { TopicCard } from '@/components/TopicCard';
import { Compass, BookOpen, Layers, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 顶部 Hero 区域 */}
      <section className="surface-panel-strong rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>Windows 内核架构与系统底层机制探索</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Windows Internals 探索
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-soft)] leading-relaxed mb-8">
            Windows 内核原理的交互式学习指南。全面解构操作系统双模式架构、执行体组件、虚拟内存分页模型、抢占式线程调度以及现代内核安全防御体系。
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/start-here" className="btn-primary py-2.5 px-5 rounded-xl shadow-lg">
              <Compass className="w-4 h-4" />
              <span>从这里开始学习</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/explore/architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-soft)] transition-colors"
            >
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span>交互式架构图</span>
            </Link>

            <Link
              href="/tools/evtx-lab"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-soft)] hover:text-white border border-[var(--border)]/70 hover:bg-[var(--bg-soft)] transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>EVTX 实验室</span>
            </Link>
          </div>
        </div>

        {/* 装饰背景元素 */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 主题卡片网格 */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              系统核心模块大纲
            </h2>
            <p className="text-sm text-[var(--text-soft)] mt-1">
              按技术领域分类浏览 Windows 内核的核心组成部分
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--muted)]">
            共 {topicTree.length} 个核心领域
          </span>
        </div>

        {/* 2 列网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topicTree.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} showDepth={true} />
          ))}
        </div>
      </section>
    </div>
  );
}
