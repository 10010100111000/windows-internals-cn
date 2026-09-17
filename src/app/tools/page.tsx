import type { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, FileCode, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: '实验室 - Windows Internals 中文站',
  description: '浏览器内的 Windows 内核交互式实验与工具，支持纯前端解析 Windows 事件日志（EVTX）等。',
};

export default function ToolsIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 顶部标题区 */}
      <section className="surface-panel-strong rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-4">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>交互式实践环境</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          实验室
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-2xl">
          利用现代 Web 技术与 WebAssembly，在浏览器内提供免安装、零服务器上传的 Windows 内核数据结构交互式分析工具与实战演练环境。
        </p>
      </section>

      {/* 实验室卡片列表 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
          <span>可用实验工具</span>
          <span className="font-mono">共 1 项实验</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* EVTX Lab 卡片 */}
          <Link
            href="/tools/evtx-lab"
            className="interactive-card group rounded-2xl p-6 sm:p-8 border border-[var(--border)] block no-underline transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                      EVTX 实验室
                    </h2>
                    <span className="chip chip-depth-beginner text-[10px] px-2 py-0.5 border">
                      WebAssembly
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-1 font-mono">
                    <span>Windows 事件日志二进制解析器</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--link)] group-hover:text-[var(--link-hover)] transition-colors self-end sm:self-auto">
                <span>进入实验</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-6">
              基于浏览器的 Windows 事件日志（.evtx）交互式解析工具。直接在前端读取二进制日志块与 Chunk 数据流，实时解构并还原系统安全、应用与系统日志事件记录，无需向远端服务器传输任何敏感隐私文件。
            </p>

            <div className="pt-4 border-t border-[var(--border)]/70 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% 浏览器本地解析</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-300">
                <Cpu className="w-4 h-4" />
                <span>支持拖拽与大文件流式读取</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
