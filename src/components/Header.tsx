'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/start-here', label: '从这里开始' },
  { href: '/explore', label: '探索' },
  { href: '/search', label: '搜索' },
  { href: '/glossary', label: '术语表' },
  { href: '/tools', label: '实验室' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="site-header sticky top-0 z-50 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 左侧 Logo 与站名 */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group focus:outline-none"
        >
          <span className="site-logo shadow-sm group-hover:scale-105 transition-transform">
            WI
          </span>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[var(--text)] tracking-tight group-hover:text-white transition-colors">
              Windows Internals
            </span>
            <span className="text-[10px] text-[var(--muted)] font-mono tracking-widest uppercase">
              中文架构指南
            </span>
          </div>
        </Link>

        {/* 桌面端导航 */}
        <nav
          aria-label="主导航"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  active
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-semibold border border-[var(--accent)]/30'
                    : 'text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] btn-ghost'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 移动端汉堡菜单按钮 */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-[var(--text-soft)] hover:text-white hover:bg-[var(--bg-soft)] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 移动端展开菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl px-4 py-3 space-y-1 shadow-2xl">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? 'text-[var(--accent)] bg-[var(--accent)]/15 font-semibold border-l-2 border-[var(--accent)]'
                    : 'text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
