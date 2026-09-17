import type { Metadata } from 'next';
import Link from 'next/link';
import { EvtxLab } from '@/components/EvtxLab';
import { ShieldAlert, ChevronRight, Home, FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EVTX 实验室 - Windows Internals 中文站',
  description: '在浏览器端解析并审查 Windows 事件日志（.evtx 文件），无需向后端传输任何私密日志数据。',
};

export default function EvtxLabPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 面包屑导航 */}
      <nav
        aria-label="面包屑导航"
        className="flex items-center gap-1.5 text-xs text-[var(--muted)]"
      >
        <Link href="/" className="hover:text-[var(--text)] transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>首页</span>
        </Link>
        <ChevronRight className="w-3 h-3 opacity-50" />
        <Link href="/tools" className="hover:text-[var(--text)] transition-colors flex items-center gap-1">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>实验室</span>
        </Link>
        <ChevronRight className="w-3 h-3 opacity-50" />
        <span className="text-[var(--text)] font-semibold">EVTX 实验室</span>
      </nav>

      {/* 顶部标题区域 */}
      <section className="surface-panel-strong rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>安全与日志分析实验</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          EVTX 实验室
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
          Windows 事件日志（EVTX）是系统诊断、蓝屏崩溃排查与蓝队安全取证的核心日志载体。本实验室允许你将本地的 <code>.evtx</code> 文件直接拖放到浏览器中，纯客户端本地读取二进制数据流，无需上传至服务器即可完成解析与记录审查。
        </p>
      </section>

      {/* 引入核心 EvtxLab 组件 */}
      <section className="pt-2">
        <EvtxLab />
      </section>
    </div>
  );
}
