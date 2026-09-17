import Fuse from 'fuse.js';
import { flattenTopics } from '@/data/topics';
import type { Depth, SearchResult } from './types';

/**
 * 封装基于 Fuse.js 的主题搜索功能
 * 搜索字段权重：title (2), keywords (1.5), summary (1)
 */
export function searchTopics(query: string, depthFilter?: Depth[]): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  let topics = flattenTopics();
  if (depthFilter && depthFilter.length > 0) {
    topics = topics.filter((topic) => depthFilter.includes(topic.depth));
  }

  const fuse = new Fuse(topics, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'keywords', weight: 1.5 },
      { name: 'summary', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
  });

  const results = fuse.search(trimmed);

  return results.map((result) => ({
    slug: result.item.slug,
    title: result.item.title,
    summary: result.item.summary,
    depth: result.item.depth,
    score: result.score ?? 0,
  }));
}
