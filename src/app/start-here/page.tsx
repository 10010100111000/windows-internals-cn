import Link from 'next/link';
import type { Metadata } from 'next';
import { findTopicBySlug } from '@/data/topics';
import { DepthChip } from '@/components/DepthChip';
import { ArrowRight, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '从这里开始 - Windows Internals 中文站',
  description: '专为 Windows 内核初学者设计的结构化学习路径：从系统架构到进程调度、内存分页、事件诊断与内核安全。',
};

const STEPS = [
  {
    stepNumber: 'Step 1',
    slug: 'architecture',
    reason: '奠定全局视野，理解用户模式与内核模式分界、执行体组件、微内核与 HAL 硬件抽象层的分工协作。',
  },
  {
    stepNumber: 'Step 2',
    slug: 'processes',
    reason: '剖析 Windows 下程序执行的核心载体，掌握 EPROCESS、ETHREAD 数据结构与多级抢占式调度算法。',
  },
  {
    stepNumber: 'Step 3',
    slug: 'memory',
    reason: '理解现代操作系统的核心支柱：分页寻址、虚拟地址描述符（VAD）、工作集修剪以及内存池管理。',
  },
  {
    stepNumber: 'Step 4',
    slug: 'diagnostics',
    reason: '掌握观察与分析系统的实战利器：事件追踪（ETW）、EVTX 二进制日志机制与内核调试探针。',
  },
  {
    stepNumber: 'Step 5',
    slug: 'security',
    reason: '探索现代内核防护纵深：访问令牌（Token）、安全描述符（ACL）、完备性级别及虚拟化安全（VBS）。',
  },
];

export default function StartHerePage() {
  const stepsData = STEPS.map((step) => {
    const topic = findTopicBySlug(step.slug);
    return {
      ...step,
      topic: topic || {
        slug: step.slug,
        title: step.slug,
        summary: '主题内容加载中...',
        depth: 'beginner' as const,
      },
    };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* 顶部介绍区域 */}
      <section className="surface-panel-strong rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>推荐学习路线</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
          从这里开始学习 Windows 内核
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-2xl">
          Windows 内核体系庞大而深奥。为了帮助你系统化地建立知识模型，我们为你规划了一条从浅入深循序渐进的 5 步核心学习路径。建议按照顺序逐一攻克关键主题。
        </p>
      </section>

      {/* 编号步骤卡片列表 */}
      <section className="space-y-4">
        {stepsData.map((item, index) => (
          <Link
            key={item.slug}
            href={`/explore/${item.slug}`}
            className="interactive-card group block rounded-2xl p-6 sm:p-7 border border-[var(--border)] transition-all no-underline relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="chip px-3 py-1 text-xs font-mono font-bold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                  {item.stepNumber}
                </span>
                <DepthChip depth={item.topic.depth} size="sm" />
              </div>

              <span className="text-xs text-[var(--muted)] font-mono flex items-center gap-1 group-hover:text-[var(--link-hover)] transition-colors">
                <span>进入主题</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
              {item.topic.title}
            </h2>

            <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-3">
              {item.topic.summary}
            </p>

            <div className="pt-3 border-t border-[var(--border)]/60 text-xs text-[var(--muted)] leading-relaxed flex items-start gap-2">
              <span className="font-semibold text-[var(--accent)] shrink-0">学习重点:</span>
              <span>{item.reason}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
