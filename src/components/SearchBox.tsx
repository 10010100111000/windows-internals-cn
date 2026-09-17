'use client';

import React, { useState } from 'react';
import type { Depth } from '@/lib/types';
import { Search, X } from 'lucide-react';

export interface SearchBoxProps {
  onSearch: (query: string, depths: Depth[]) => void;
  placeholder?: string;
  initialQuery?: string;
  initialDepths?: Depth[];
  className?: string;
}

const DEPTH_OPTIONS: { depth: Depth; label: string; activeClass: string }[] = [
  { depth: 'beginner', label: '入门', activeClass: 'chip-depth-beginner' },
  { depth: 'intermediate', label: '中级', activeClass: 'chip-depth-intermediate' },
  { depth: 'expert', label: '专家', activeClass: 'chip-depth-expert' },
];

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = '搜索架构组件、API、缩写或概念（如: VAD, IRP, SSDT, ALPC...）',
  initialQuery = '',
  initialDepths = [],
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedDepths, setSelectedDepths] = useState<Depth[]>(initialDepths);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = e.target.value;
    setQuery(nextQuery);
    onSearch(nextQuery, selectedDepths);
  };

  const handleClearQuery = () => {
    setQuery('');
    onSearch('', selectedDepths);
  };

  const handleToggleDepth = (depth: Depth) => {
    const nextDepths = selectedDepths.includes(depth)
      ? selectedDepths.filter((d) => d !== depth)
      : [...selectedDepths, depth];

    setSelectedDepths(nextDepths);
    onSearch(query, nextDepths);
  };

  const handleClearDepths = () => {
    setSelectedDepths([]);
    onSearch(query, []);
  };

  return (
    <div
      className={`surface-panel rounded-2xl p-4 sm:p-5 border border-[var(--border)] shadow-lg ${className}`}
    >
      {/* 搜索输入框 */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 absolute left-3.5 text-[var(--muted)] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder={placeholder}
          className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded-xl pl-11 pr-10 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
        />
        {query && (
          <button
            type="button"
            onClick={handleClearQuery}
            className="absolute right-3.5 p-1 rounded-md text-[var(--muted)] hover:text-white hover:bg-[var(--border)] transition-colors"
            aria-label="清空输入"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 难度筛选 Chips */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--muted)] font-medium mr-1">难度筛选:</span>
        {DEPTH_OPTIONS.map(({ depth, label, activeClass }) => {
          const isSelected = selectedDepths.includes(depth);
          return (
            <button
              key={depth}
              type="button"
              onClick={() => handleToggleDepth(depth)}
              className={`chip px-3 py-1 text-xs rounded-lg transition-all border ${
                isSelected
                  ? `${activeClass} font-semibold shadow-sm`
                  : 'chip-muted opacity-70 hover:opacity-100'
              }`}
            >
              {label}
            </button>
          );
        })}

        {selectedDepths.length > 0 && (
          <button
            type="button"
            onClick={handleClearDepths}
            className="text-[11px] text-[var(--muted)] hover:text-white underline ml-2 transition-colors"
          >
            全部难度
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
