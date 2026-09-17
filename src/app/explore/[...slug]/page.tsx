import { Topic } from '@/lib/types';
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { findTopicBySlug, flattenTopics, getTopicBreadcrumb, getNextPrevTopics } from '@/data/topics';
import { TopicSidebar } from '@/components/TopicSidebar';
import { TopicCard } from '@/components/TopicCard';
import { DepthChip } from '@/components/DepthChip';
import { PrevNextNav } from '@/components/PrevNextNav';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ChevronRight, Home, Layers, FlaskConical, Hash } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTopicMdx } from '@/lib/mdx';

interface PageProps {
  params: {
    slug: string[];
  };
}

export function generateStaticParams() {
  const topics = flattenTopics();
  return topics.map((topic) => ({
    slug: topic.slug.split('/'),
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.slug.join('/');
  const topic = findTopicBySlug(slug);
  if (!topic) {
    return {
      title: '主题未找到 - Windows Internals 中文站',
    };
  }
  return {
    title: `${topic.title} - Windows Internals 中文站`,
    description: topic.summary,
  };
}

export default async function TopicDetailPage({ params }: PageProps) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const topic = findTopicBySlug(slug);

  if (!topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-72 shrink-0">
          <TopicSidebar />
        </div>
        <div className="flex-1 surface-panel rounded-2xl p-10 text-center border border-[var(--border)]">
          <h1 className="text-2xl font-bold text-white mb-3">主题未找到</h1>
          <p className="text-sm text-[var(--text-soft)] mb-6">
            未找到路径为 "{slug}" 的主题知识文档。
          </p>
          <Link href="/explore" className="btn-primary">
            返回探索首页
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = getTopicBreadcrumb(slug);
  const { prev, next } = getNextPrevTopics(slug);
  const mdxData = await getTopicMdx(slug);

  const relatedTopics = topic.relatedSlugs
    ? topic.relatedSlugs
        .map((rSlug) => findTopicBySlug(rSlug))
        .filter((t): t is Topic => Boolean(t))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
      {/* 左侧主题大纲树 */}
      <div className="w-full lg:w-72 shrink-0">
        <TopicSidebar currentSlug={slug} />
      </div>

      {/* 右侧文章内容区 */}
      <article className="flex-1 min-w-0 w-full space-y-6">
        {/* 面包屑导航 */}
        <nav aria-label="面包屑导航" className="flex items-center gap-1.5 text-xs text-[var(--muted)] flex-wrap">
          <Link href="/" className="hover:text-[var(--text)] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>首页</span>
          </Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link href="/explore" className="hover:text-[var(--text)] transition-colors">
            探索
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.slug}>
                <ChevronRight className="w-3 h-3 opacity-50" />
                {isLast ? (
                  <span className="text-[var(--text)] font-semibold truncate max-w-xs">
                    {crumb.title}
                  </span>
                ) : (
                  <Link
                    href={`/explore/${crumb.slug}`}
                    className="hover:text-[var(--text)] transition-colors truncate max-w-xs"
                  >
                    {crumb.title}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* 标题 + 难度标签 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {topic.title}
          </h1>
          <DepthChip depth={topic.depth} size="md" />
        </div>

        {/* 摘要与关键词卡片 */}
        <div className="surface-card rounded-2xl p-6 sm:p-7 border border-[var(--border)]">
          <p className="text-base sm:text-lg text-[var(--text-soft)] leading-relaxed">
            {topic.summary}
          </p>
          {topic.keywords && topic.keywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]/70 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                <Hash className="w-3 h-3 text-[var(--accent)]" />
                关键词:
              </span>
              {topic.keywords.map((kw) => (
                <span key={kw} className="chip chip-muted px-2.5 py-0.5 text-xs font-mono">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MDX 正文内容渲染 */}
        {mdxData ? (
          <section className="article-body my-8 surface-panel p-6 sm:p-8 rounded-2xl border border-[var(--border)]">
            <MDXRemote source={mdxData.content} />
          </section>
        ) : (
          <div className="my-8 surface-panel p-6 sm:p-8 rounded-2xl border border-dashed border-[var(--border)]/40 text-center">
            <p className="text-[var(--muted)]">（本文正文内容尚在建设中，敬请期待...）</p>
          </div>
        )}

        {/* 交互式架构图 */}
        {topic.hasSchematic && (
          <section className="my-8">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                交互式系统架构图
              </h2>
            </div>
            <ArchitectureDiagram />
          </section>
        )}

        {/* 关联 Lab 提示 */}
        {topic.hasLab && (
          <div className="surface-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-emerald-300">
                  本主题包含交互式实验
                </h3>
                <p className="text-xs text-emerald-200/75 mt-0.5">
                  可在浏览器本地拖拽并解析真实 Windows EVTX 日志文件
                </p>
              </div>
            </div>
            <Link href="/tools/evtx-lab" className="btn-primary text-xs py-2 px-4 shrink-0">
              启动 EVTX 实验室
            </Link>
          </div>
        )}

        {/* 子主题卡片网格 */}
        {topic.children && topic.children.length > 0 && (
          <section className="mt-10 pt-8 border-t border-[var(--border)]">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xl font-bold text-white">深入探索</h2>
              <span className="text-xs text-[var(--muted)] font-mono">
                {topic.children.length} 个子领域
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.children.map((child) => (
                <TopicCard key={child.slug} topic={child} showDepth={true} />
              ))}
            </div>
          </section>
        )}

        {/* 相关主题卡片网格 */}
        {relatedTopics.length > 0 && (
          <section className="mt-10 pt-8 border-t border-[var(--border)]">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xl font-bold text-white">相关主题</h2>
              <span className="text-xs text-[var(--muted)] font-mono">
                {relatedTopics.length} 个关联主题
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTopics.map((rel) => (
                <TopicCard key={rel.slug} topic={rel} showDepth={true} />
              ))}
            </div>
          </section>
        )}

        {/* 底部 Prev/Next 导航 */}
        <PrevNextNav prev={prev} next={next} />
      </article>
    </div>
  );
}
