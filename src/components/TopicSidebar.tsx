'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { Topic, Depth } from '@/lib/types';
import { topicTree } from '@/data/topics';
import { Search, ChevronDown, ChevronRight, X, Sparkles } from 'lucide-react';

export interface TopicSidebarProps {
  currentSlug?: string;
  className?: string;
}

const DEPTH_CONFIG: { depth: Depth; label: string; activeClass: string }[] = [
  { depth: 'beginner', label: '入门', activeClass: 'chip-depth-beginner' },
  { depth: 'intermediate', label: '中级', activeClass: 'chip-depth-intermediate' },
  { depth: 'expert', label: '专家', activeClass: 'chip-depth-expert' },
];

/**
 * 递归查找当前 slug 的所有父级 slug 列表
 */
function getAncestorSlugs(nodes: Topic[], targetSlug: string, currentPath: string[] = []): string[] {
  for (const node of nodes) {
    if (node.slug === targetSlug) {
      return currentPath;
    }
    if (node.children && node.children.length > 0) {
      const found = getAncestorSlugs(node.children, targetSlug, [...currentPath, node.slug]);
      if (found.length > 0) return found;
    }
  }
  return [];
}

/**
 * 递归过滤主题树
 */
function filterTopicTree(nodes: Topic[], query: string, depths: Depth[]): Topic[] {
  const q = query.trim().toLowerCase();
  const hasQuery = q.length > 0;
  const hasDepths = depths.length > 0;

  if (!hasQuery && !hasDepths) {
    return nodes;
  }

  function matchNode(node: Topic): Topic | null {
    const filteredChildren = node.children
      ? node.children.map(matchNode).filter((child): child is Topic => child !== null)
      : [];

    const matchesQuery = !hasQuery || (
      node.title.toLowerCase().includes(q) ||
      node.summary.toLowerCase().includes(q) ||
      node.slug.toLowerCase().includes(q) ||
      (node.keywords && node.keywords.some((k) => k.toLowerCase().includes(q)))
    );

    const matchesDepth = !hasDepths || depths.includes(node.depth);
    const selfMatches = matchesQuery && matchesDepth;

    if (selfMatches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : node.children,
      };
    }

    return null;
  }

  return nodes.map(matchNode).filter((node): node is Topic => node !== null);
}

/**
 * 统计树节点数量
 */
function countTopics(nodes: Topic[]): number {
  let count = 0;
  for (const node of nodes) {
    count += 1;
    if (node.children) {
      count += countTopics(node.children);
    }
  }
  return count;
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({
  currentSlug,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [selectedDepths, setSelectedDepths] = useState<Depth[]>([]);
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({});

  // 当 currentSlug 变化时，默认展开其所有父级分支
  useEffect(() => {
    if (!currentSlug) return;
    const ancestors = getAncestorSlugs(topicTree, currentSlug);
    if (ancestors.length > 0) {
      setExpandedSlugs((prev) => {
        const next = { ...prev };
        ancestors.forEach((s) => {
          next[s] = true;
        });
        return next;
      });
    }
  }, [currentSlug]);

  // 过滤后的主题树
  const filteredTree = useMemo(() => {
    return filterTopicTree(topicTree, query, selectedDepths);
  }, [query, selectedDepths]);

  const visibleCount = useMemo(() => {
    return countTopics(filteredTree);
  }, [filteredTree]);

  const isFiltering = query.trim().length > 0 || selectedDepths.length > 0;

  // 切换展开/收起
  const toggleExpand = (slug: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // 切换难度过滤
  const toggleDepth = (depth: Depth) => {
    setSelectedDepths((prev) =>
      prev.includes(depth) ? prev.filter((d) => d !== depth) : [...prev, depth]
    );
  };

  const renderTreeNodes = (nodes: Topic[], level = 0) => {
    return (
      <ul className={`space-y-1 ${level > 0 ? 'ml-3 border-l border-[var(--border)] pl-2' : ''}`}>
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children && node.children.length > 0);
          const isExpanded = isFiltering ? true : (expandedSlugs[node.slug] ?? false);
          const isCurrent = node.slug === currentSlug;

          const depthDotColor =
            node.depth === 'beginner'
              ? 'bg-emerald-400'
              : node.depth === 'intermediate'
              ? 'bg-amber-400'
              : 'bg-rose-400';

          return (
            <li key={node.slug} className="text-xs">
              <div
                className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                  isCurrent
                    ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-semibold border-l-2 border-[var(--accent)]'
                    : 'text-[var(--text-soft)] hover:text-white hover:bg-[var(--bg-soft)]'
                }`}
              >
                <Link
                  href={`/explore/${node.slug}`}
                  className="flex-1 flex items-center gap-2 truncate no-underline text-inherit"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${depthDotColor}`}
                    title={`难度: ${node.depth}`}
                  />
                  <span className="truncate">{node.title}</span>
                </Link>

                {hasChildren && (
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(node.slug, e)}
                    className="p-1 rounded text-[var(--muted)] hover:text-white hover:bg-[var(--border)] transition-colors focus:outline-none"
                    aria-label={isExpanded ? '收起子主题' : '展开子主题'}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* 渲染子节点 */}
              {hasChildren && isExpanded && node.children && (
                <div className="mt-1">
                  {renderTreeNodes(node.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      className={`topic-tree-sidebar surface-card rounded-2xl p-4 flex flex-col gap-3 ${className}`}
      aria-label="主题导航目录"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          知识主题大纲
        </h2>
        <span className="text-[11px] text-[var(--muted)]">
          {visibleCount} 篇
        </span>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索主题或关键词..."
          className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white"
            aria-label="清除搜索"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 难度过滤 Chip 按钮 */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-[var(--border)]">
        {DEPTH_CONFIG.map(({ depth, label, activeClass }) => {
          const isSelected = selectedDepths.includes(depth);
          return (
            <button
              key={depth}
              type="button"
              onClick={() => toggleDepth(depth)}
              className={`chip text-[11px] px-2 py-0.5 rounded transition-all border ${
                isSelected
                  ? `${activeClass} font-semibold shadow-sm`
                  : 'chip-muted hover:border-zinc-500 opacity-70 hover:opacity-100'
              }`}
            >
              {label}
            </button>
          );
        })}
        {selectedDepths.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedDepths([])}
            className="text-[10px] text-[var(--muted)] hover:text-white underline ml-auto"
          >
            重置
          </button>
        )}
      </div>

      {/* 递归树展示 */}
      <nav className="flex-1 overflow-y-auto pr-1">
        {filteredTree.length > 0 ? (
          renderTreeNodes(filteredTree)
        ) : (
          <div className="py-8 text-center text-xs text-[var(--muted)]">
            未找到与筛选条件匹配的主题
          </div>
        )}
      </nav>
    </aside>
  );
};

export default TopicSidebar;
