import React from 'react';
import Link from 'next/link';
import type { Topic } from '@/lib/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface PrevNextNavProps {
  prev?: Topic;
  next?: Topic;
  className?: string;
}

export const PrevNextNav: React.FC<PrevNextNavProps> = ({
  prev,
  next,
  className = '',
}) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="前序与后序导航"
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-6 border-t border-[var(--border)] ${className}`}
    >
      {/* 上一篇 (左侧) */}
      {prev ? (
        <Link
          href={`/explore/${prev.slug}`}
          className="interactive-card group rounded-2xl p-5 flex flex-col justify-between text-left no-underline transition-all"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>上一篇</span>
            </div>
            <h4 className="text-base font-bold text-[var(--text)] group-hover:text-white transition-colors line-clamp-1">
              {prev.title}
            </h4>
            <p className="mt-1.5 text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
              {prev.summary}
            </p>
          </div>
        </Link>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}

      {/* 下一篇 (右侧) */}
      {next ? (
        <Link
          href={`/explore/${next.slug}`}
          className="interactive-card group rounded-2xl p-5 flex flex-col justify-between text-right no-underline transition-all md:col-start-2"
        >
          <div>
            <div className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors mb-2">
              <span>下一篇</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="text-base font-bold text-[var(--text)] group-hover:text-white transition-colors line-clamp-1">
              {next.title}
            </h4>
            <p className="mt-1.5 text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
              {next.summary}
            </p>
          </div>
        </Link>
      ) : null}
    </nav>
  );
};

export default PrevNextNav;
