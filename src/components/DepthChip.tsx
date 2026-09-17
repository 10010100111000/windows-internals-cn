import React from 'react';
import type { Depth } from '@/lib/types';

export interface DepthChipProps {
  depth: Depth;
  size?: 'sm' | 'md';
  className?: string;
}

const DEPTH_LABELS: Record<Depth, string> = {
  beginner: '入门',
  intermediate: '中级',
  expert: '专家',
};

const DEPTH_CLASSES: Record<Depth, string> = {
  beginner: 'chip-depth-beginner',
  intermediate: 'chip-depth-intermediate',
  expert: 'chip-depth-expert',
};

export const DepthChip: React.FC<DepthChipProps> = ({
  depth,
  size = 'sm',
  className = '',
}) => {
  const label = DEPTH_LABELS[depth] || depth;
  const depthClass = DEPTH_CLASSES[depth] || '';
  const sizeClass = size === 'md' ? 'text-xs px-2.5 py-1' : 'text-[11px] px-2 py-0.5';

  return (
    <span
      className={`chip border font-medium uppercase tracking-wider ${depthClass} ${sizeClass} ${className}`.trim()}
    >
      {label}
    </span>
  );
};

export default DepthChip;
