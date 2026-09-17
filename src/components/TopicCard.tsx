import React from 'react';
import Link from 'next/link';
import type { Topic } from '@/lib/types';
import DepthChip from './DepthChip';
import { ChevronRight, Layers, FlaskConical } from 'lucide-react';

export interface TopicCardProps {
  topic: Topic;
  showDepth?: boolean;
  compact?: boolean;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  showDepth = true,
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <Link
        href={`/explore/${topic.slug}`}
        className={`interactive-card block rounded-xl p-4 transition-all no-underline ${className}`}
      >
        <h4 className="text-base font-semibold text-[var(--text)] line-clamp-1">
          {topic.title}
        </h4>
        <p className="mt-1.5 text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
          {topic.summary}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/explore/${topic.slug}`}
      className={`interactive-card group flex flex-col justify-between rounded-2xl p-5 transition-all no-underline ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            {topic.title}
          </h3>
          {showDepth && <DepthChip depth={topic.depth} size="sm" />}
        </div>
        <p className="text-sm text-[var(--text-soft)] line-clamp-3 leading-relaxed mb-4">
          {topic.summary}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-3 border-t border-[var(--border)] mt-auto">
        <div className="flex items-center gap-2">
          {topic.hasSchematic && (
            <span className="inline-flex items-center gap-1 text-[var(--accent)] font-medium">
              <Layers className="w-3.5 h-3.5" />
              架构图
            </span>
          )}
          {topic.hasLab && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <FlaskConical className="w-3.5 h-3.5" />
              实验
            </span>
          )}
        </div>
        <span className="inline-flex items-center text-[var(--link)] group-hover:text-[var(--link-hover)] font-medium transition-colors">
          查看详情
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default TopicCard;
