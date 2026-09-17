import React from 'react';
import Link from 'next/link';
import type { GlossaryEntry } from '@/lib/types';
import { BookOpen, ExternalLink } from 'lucide-react';

export interface GlossaryCardProps {
  entry: GlossaryEntry;
  className?: string;
}

export const GlossaryCard: React.FC<GlossaryCardProps> = ({
  entry,
  className = '',
}) => {
  return (
    <div
      className={`surface-card rounded-2xl p-6 transition-all hover:border-[var(--accent)]/50 ${className}`}
    >
      {/* 头部：术语缩写与全称 */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-3 mb-3">
        <h3 className="text-2xl font-mono font-bold text-[var(--accent)] tracking-wide">
          {entry.term}
        </h3>
        <span className="text-xs font-mono text-[var(--muted)] truncate max-w-full sm:max-w-xs text-left sm:text-right">
          {entry.fullName}
        </span>
      </div>

      {/* 术语中文释义 */}
      <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-5">
        {entry.definition}
      </p>

      {/* 关联主题链接 */}
      {entry.relatedSlugs && entry.relatedSlugs.length > 0 && (
        <div className="pt-3 border-t border-[var(--border)]/60">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-2 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>关联知识主题:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {entry.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/explore/${slug}`}
                className="chip chip-muted px-2.5 py-1 text-xs hover:border-[var(--accent)] hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
              >
                <span>{slug}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossaryCard;
