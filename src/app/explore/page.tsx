import type { Metadata } from 'next';
import { topicTree } from '@/data/topics';
import { TopicSidebar } from '@/components/TopicSidebar';
import { TopicCard } from '@/components/TopicCard';
import { Sparkles, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: '探索 Windows 内核 - Windows Internals 中文站',
  description: '按层级与模块深度浏览 Windows 内核的所有核心知识库与主题大纲。',
};

export default function ExploreIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
      {/* 左侧主题大纲侧边栏 */}
      <div className="w-full lg:w-72 shrink-0">
        <TopicSidebar />
      </div>

      {/* 右侧主题卡片网格 */}
      <div className="flex-1 min-w-0 space-y-6">
        <div className="surface-panel rounded-2xl p-6 sm:p-8 border border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
            <Layers className="w-4 h-4" />
            <span>知识图谱</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            探索 Windows 内核
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-soft)] mt-2 leading-relaxed">
            从左侧侧边栏按层级树展开钻取具体子主题，或通过下方 16 个核心领域模块快速索引。支持按关键词与难度分级即时筛选。
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
          <span>一级核心主题</span>
          <span className="font-mono">共 {topicTree.length} 个分类</span>
        </div>

        {/* 主题卡片网格 (2 列) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topicTree.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} showDepth={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
