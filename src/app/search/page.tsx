'use client';

import React, { useState, useMemo } from 'react';
import type { Depth, Topic } from '@/lib/types';
import { searchTopics } from '@/lib/search';
import { findTopicBySlug, flattenTopics } from '@/data/topics';
import { SearchBox } from '@/components/SearchBox';
import { TopicCard } from '@/components/TopicCard';
import { Search, Sparkles, HelpCircle, FileSearch } from 'lucide-react';

const POPULAR_KEYWORDS = [
  'VAD',
  'SSDT',
  'IRQL',
  'EPROCESS',
  'ALPC',
  'ETW',
  'Token',
  'CSRSS',
  'WOW64',
  'WFP',
  'DPC',
  'PEB',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedDepths, setSelectedDepths] = useState<Depth[]>([]);

  const handleSearch = (newQuery: string, newDepths: Depth[]) => {
    setQuery(newQuery);
    setSelectedDepths(newDepths);
  };

  const handleQuickKeyword = (kw: string) => {
    setQuery(kw);
  };

  // 执行搜索
  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // 若无输入但有难度筛选，展示该难度下的所有主题
      if (selectedDepths.length > 0) {
        return flattenTopics()
          .filter((t) => selectedDepths.includes(t.depth))
          .map((t) => ({
            slug: t.slug,
            title: t.title,
            summary: t.summary,
            depth: t.depth,
            score: 0,
          }));
      }
      return [];
    }

    return searchTopics(trimmed, selectedDepths);
  }, [query, selectedDepths]);

  const hasSearched = query.trim().length > 0 || selectedDepths.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 顶部标题区 */}
      <section className="surface-panel-strong rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-4">
          <Search className="w-3.5 h-3.5" />
          <span>全文检索系统</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          搜索主题
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-2xl">
          支持针对全站 60+ 篇技术文档的标题、中文摘要、内核缩写及关键词进行全文模糊检索，并可按难度等级快速筛选。
        </p>
      </section>

      {/* 搜索框组件 */}
      <SearchBox
        initialQuery={query}
        initialDepths={selectedDepths}
        onSearch={handleSearch}
      />

      {/* 热门关键词快捷标签 */}
      {!query.trim() && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--muted)] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            常用术语推荐:
          </span>
          {POPULAR_KEYWORDS.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => handleQuickKeyword(kw)}
              className="chip chip-muted px-2.5 py-1 text-xs hover:border-[var(--accent)] hover:text-white transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      )}

      {/* 搜索结果展示区 */}
      <section className="space-y-4">
        {hasSearched && (
          <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
            <span>
              搜索结果 {query.trim() ? `"${query.trim()}"` : ''}
            </span>
            <span className="font-mono">找到 {searchResults.length} 篇相关内容</span>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((result) => {
              const fullTopic = findTopicBySlug(result.slug) ?? (result as Topic);
              return (
                <TopicCard key={result.slug} topic={fullTopic} showDepth={true} />
              );
            })}
          </div>
        ) : hasSearched ? (
          /* 无结果提示 */
          <div className="surface-card rounded-2xl p-12 text-center border border-[var(--border)] space-y-3">
            <FileSearch className="w-10 h-10 text-[var(--muted)] mx-auto opacity-70" />
            <h3 className="text-base font-bold text-white">未找到匹配的主题</h3>
            <p className="text-xs sm:text-sm text-[var(--text-soft)] max-w-md mx-auto leading-relaxed">
              未找到与当前检索词或筛选条件对应的内容。请尝试更换关键词、缩减筛选条件，或使用上方推荐的内核缩写。
            </p>
          </div>
        ) : (
          /* 初始状态提示 */
          <div className="surface-panel rounded-2xl p-10 text-center border border-[var(--border)]/70 text-xs sm:text-sm text-[var(--muted)]">
            输入技术关键词（如: VAD, IRP, 抢占调度, 安全描述符）开始搜索。
          </div>
        )}
      </section>
    </div>
  );
}
