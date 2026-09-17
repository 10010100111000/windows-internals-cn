export type Depth = 'beginner' | 'intermediate' | 'expert';

export interface Topic {
  /** URL slug, e.g. "architecture" or "memory/vad" */
  slug: string;
  /** 中文标题 */
  title: string;
  /** 中文摘要（1-2 句） */
  summary: string;
  /** 难度等级 */
  depth: Depth;
  /** 关键词/缩写，用于搜索匹配 */
  keywords?: string[];
  /** 子主题 */
  children?: Topic[];
  /** 相关主题的 slug 列表 */
  relatedSlugs?: string[];
  /** 是否有交互式架构图 */
  hasSchematic?: boolean;
  /** 是否有 Lab */
  hasLab?: boolean;
}

export interface TopicContent {
  /** 对应 Topic.slug */
  slug: string;
  /** HTML 正文内容 */
  body: string;
}

export interface GlossaryEntry {
  /** 术语缩写 */
  term: string;
  /** 全称 */
  fullName: string;
  /** 中文释义 */
  definition: string;
  /** 关联主题 slug */
  relatedSlugs: string[];
}

export interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  depth: Depth;
  score: number;
}
