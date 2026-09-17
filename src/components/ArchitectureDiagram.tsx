'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, ArrowRight, Info, ExternalLink } from 'lucide-react';

interface DiagramBlock {
  id: string;
  name: string;
  sub: string;
  description: string;
  layer: string;
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorScheme: 'indigo' | 'purple' | 'rose' | 'amber' | 'slate';
}

const BLOCKS: DiagramBlock[] = [
  // ── 用户模式 ──
  {
    id: 'applications',
    name: '应用程序与系统服务',
    sub: 'Win32, UWP, svchost.exe, lsass.exe',
    description: '运行在 Ring 3 用户模式下的各类桌面应用、UWP 程序以及核心系统服务后台进程。',
    layer: '用户模式 (Ring 3)',
    href: '/explore/architecture',
    x: 40,
    y: 55,
    width: 800,
    height: 38,
    colorScheme: 'indigo',
  },
  {
    id: 'subsystem-kernel32',
    name: 'kernel32.dll',
    sub: '基础 Win32 API 存根',
    description: '提供进程创建、内存申请、文件操作等经典 Win32 基础 API 的封装接口。',
    layer: '子系统 DLL (Ring 3)',
    href: '/explore/architecture/subsystems',
    x: 40,
    y: 102,
    width: 260,
    height: 38,
    colorScheme: 'indigo',
  },
  {
    id: 'subsystem-user32',
    name: 'user32.dll / gdi32.dll',
    sub: 'GUI 与窗口管理系统',
    description: '负责桌面窗口、消息循环分发、菜单以及 2D 图形设备接口调用。',
    layer: '子系统 DLL (Ring 3)',
    href: '/explore/architecture/subsystems',
    x: 310,
    y: 102,
    width: 260,
    height: 38,
    colorScheme: 'indigo',
  },
  {
    id: 'subsystem-advapi32',
    name: 'advapi32.dll',
    sub: '安全与注册表高级 API',
    description: '提供 Windows 注册表读写、安全访问控制、服务控制管理器（SCM）交互接口。',
    layer: '子系统 DLL (Ring 3)',
    href: '/explore/architecture/subsystems',
    x: 580,
    y: 102,
    width: 260,
    height: 38,
    colorScheme: 'indigo',
  },
  {
    id: 'ntdll',
    name: 'ntdll.dll',
    sub: '原生 API (Nt*/Zw*) 与系统调用存根',
    description: '用户模式的最底层入口，实现系统服务分发指令（syscall/sysenter）及核心堆分配器。',
    layer: '用户态底层 (Ring 3)',
    href: '/explore/processes/ntdll',
    x: 40,
    y: 148,
    width: 800,
    height: 38,
    colorScheme: 'indigo',
  },

  // ── 内核模式 执行体 (Executive) ──
  {
    id: 'exec-io',
    name: 'I/O 管理器',
    sub: 'I/O Manager (IRP)',
    description: '构建并路由 I/O 请求包（IRP），维护异步 I/O 完成队列与分层设备驱动栈。',
    layer: '执行体 (Ring 0)',
    href: '/explore/io/manager',
    x: 45,
    y: 295,
    width: 154,
    height: 55,
    colorScheme: 'purple',
  },
  {
    id: 'exec-memory',
    name: '内存管理器',
    sub: 'Memory Manager (VMM)',
    description: '管理分页与非分页内核池、虚拟地址空间描述符（VAD 树）、页表及工作集修剪。',
    layer: '执行体 (Ring 0)',
    href: '/explore/memory',
    x: 207,
    y: 295,
    width: 154,
    height: 55,
    colorScheme: 'purple',
  },
  {
    id: 'exec-process',
    name: '进程管理器',
    sub: 'Process / Thread Mgr',
    description: '负责 EPROCESS 与 ETHREAD 内核数据结构的创建、终止及生命周期跟踪。',
    layer: '执行体 (Ring 0)',
    href: '/explore/processes',
    x: 369,
    y: 295,
    width: 154,
    height: 55,
    colorScheme: 'purple',
  },
  {
    id: 'exec-security',
    name: '安全引用监视器',
    sub: 'Security RM (SRM)',
    description: '执行内核对象访问权限检查、特权审核判定并生成安全审计事件日志。',
    layer: '执行体 (Ring 0)',
    href: '/explore/security/access-checks-srm',
    x: 531,
    y: 295,
    width: 154,
    height: 55,
    colorScheme: 'purple',
  },
  {
    id: 'exec-cache',
    name: '缓存管理器',
    sub: 'Cache Manager',
    description: '与内存管理器协同工作，为文件系统提供系统全局虚拟文件缓存与预读机制。',
    layer: '执行体 (Ring 0)',
    href: '/explore/storage/cache',
    x: 693,
    y: 295,
    width: 142,
    height: 55,
    colorScheme: 'purple',
  },

  // ── 内核模式 微内核与驱动 ──
  {
    id: 'kernel-core',
    name: '微内核核心 (Kernel)',
    sub: '线程调度 · 中断异常 · IRQL 控制 · DPC/APC · 同步原语',
    description: 'ntoskrnl.exe 底层核心，提供抢占式线程调度、中断分发、自旋锁与硬件陷阱处理。',
    layer: '微内核 (Ring 0)',
    href: '/explore/architecture/kernel-mechanisms',
    x: 45,
    y: 370,
    width: 445,
    height: 70,
    colorScheme: 'rose',
  },
  {
    id: 'drivers',
    name: '设备驱动程序 (Device Drivers)',
    sub: '文件系统驱动 · 过滤驱动 · WDF/WDM · Miniport',
    description: '分层驱动程序栈，直接或间接与外设硬件交互，处理 I/O 管理器派发的 IRP 请求。',
    layer: '驱动栈 (Ring 0)',
    href: '/explore/io/drivers',
    x: 500,
    y: 370,
    width: 335,
    height: 70,
    colorScheme: 'rose',
  },

  // ── HAL 硬件抽象层 ──
  {
    id: 'hal',
    name: '硬件抽象层 (HAL - hal.dll)',
    sub: 'APIC 中断控制器 · 系统时钟定时器 · 主板总线抽象',
    description: '屏蔽不同芯片组与主板硬件差异，向内核提供一致的硬件操作低级抽象接口。',
    layer: 'HAL 抽象层',
    href: '/explore/architecture',
    x: 20,
    y: 475,
    width: 840,
    height: 50,
    colorScheme: 'amber',
  },

  // ── 物理硬件层 ──
  {
    id: 'hardware',
    name: '物理硬件平台 (Hardware)',
    sub: 'CPU (x86_64 / ARM64) · MMU 内存管理单元 · 物理 RAM · PCIe / 外设控制器',
    description: '承载操作系统的物理底层硅基芯片与外围物理设备。',
    layer: '物理硬件',
    href: '/explore/architecture',
    x: 20,
    y: 545,
    width: 840,
    height: 50,
    colorScheme: 'slate',
  },
];

const COLOR_STYLES = {
  indigo: {
    bg: '#6366f1',
    border: '#818cf8',
    text: '#c7d2fe',
    badge: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
  },
  purple: {
    bg: '#a855f7',
    border: '#c084fc',
    text: '#e9d5ff',
    badge: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  },
  rose: {
    bg: '#f43f5e',
    border: '#fb7185',
    text: '#fecdd3',
    badge: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
  },
  amber: {
    bg: '#f59e0b',
    border: '#fbbf24',
    text: '#fde68a',
    badge: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
  slate: {
    bg: '#64748b',
    border: '#94a3b8',
    text: '#e2e8f0',
    badge: 'border-slate-500/40 text-slate-300 bg-slate-500/10',
  },
};

export const ArchitectureDiagram: React.FC = () => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeBlock = BLOCKS.find((b) => b.id === hoveredId) || null;

  const handleBlockClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="surface-card rounded-2xl p-4 sm:p-6 border border-[var(--border)] shadow-xl flex flex-col gap-5">
      {/* 头部导航与图例 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text)]">
              Windows 分层系统体系架构
            </h3>
            <p className="text-xs text-[var(--text-soft)]">
              悬停查看组件职能，点击任一模块跳转至深度解析页面
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            用户模式 (Ring 3)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-purple-500/30 text-purple-300 bg-purple-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            内核模式 (Ring 0)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-amber-500/30 text-amber-300 bg-amber-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            HAL / 硬件
          </span>
        </div>
      </div>

      {/* 交互式 SVG 架构图 */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[680px]">
          <svg
            viewBox="0 0 880 615"
            className="w-full h-auto select-none font-sans"
            role="img"
            aria-label="Windows 架构分层交互图"
          >
            <defs>
              <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="kernelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2e1065" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ── 1. 用户模式外层容器 ── */}
            <rect
              x="20"
              y="20"
              width="840"
              height="175"
              rx="12"
              fill="url(#userGrad)"
              stroke="#3730a3"
              strokeWidth="1.2"
            />
            <text
              x="40"
              y="42"
              fill="#818cf8"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              用户模式 (USER MODE / RING 3)
            </text>

            {/* ── 2. 用户态 / 内核态分界隔离带 ── */}
            <line
              x1="20"
              y1="212"
              x2="860"
              y2="212"
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.6"
            />
            <rect
              x="300"
              y="202"
              width="280"
              height="20"
              rx="6"
              fill="#1e1b4b"
              stroke="#6366f1"
              strokeWidth="1"
            />
            <text
              x="440"
              y="216"
              textAnchor="middle"
              fill="#a5b4fc"
              fontSize="11"
              fontWeight="600"
            >
              ▼ 系统调用切换分派 (Syscall / SSDT) ▼
            </text>

            {/* ── 3. 内核模式外层容器 ── */}
            <rect
              x="20"
              y="235"
              width="840"
              height="225"
              rx="12"
              fill="url(#kernelGrad)"
              stroke="#581c87"
              strokeWidth="1.2"
            />
            <text
              x="40"
              y="257"
              fill="#c084fc"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              内核模式 (KERNEL MODE / RING 0 - NTOSKRNL.EXE)
            </text>

            {/* 执行体 (Executive) 虚线分组框 */}
            <rect
              x="35"
              y="270"
              width="810"
              height="88"
              rx="8"
              fill="rgba(88, 28, 135, 0.18)"
              stroke="#a855f7"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x="50"
              y="287"
              fill="#e9d5ff"
              fontSize="11"
              fontWeight="600"
            >
              执行体服务 (Executive Services)
            </text>

            {/* ── 4. 循环渲染各个可点击交互块 ── */}
            {BLOCKS.map((block) => {
              const isHovered = hoveredId === block.id;
              const isOtherHovered = hoveredId !== null && !isHovered;
              const style = COLOR_STYLES[block.colorScheme];

              const fillOpacity = isHovered ? 0.35 : isOtherHovered ? 0.1 : 0.2;
              const strokeColor = isHovered ? '#ffffff' : style.border;
              const strokeWidth = isHovered ? 2 : 1.2;

              return (
                <g
                  key={block.id}
                  onClick={() => handleBlockClick(block.href)}
                  onMouseEnter={() => setHoveredId(block.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer transition-all duration-200"
                  tabIndex={0}
                  role="button"
                  aria-label={block.name}
                  filter={isHovered ? 'url(#glow)' : undefined}
                >
                  {/* 背景色块 */}
                  <rect
                    x={block.x}
                    y={block.y}
                    width={block.width}
                    height={block.height}
                    rx="8"
                    fill={style.bg}
                    fillOpacity={fillOpacity}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-all duration-200"
                  />

                  {/* 标题 */}
                  <text
                    x={block.x + block.width / 2}
                    y={block.y + (block.height > 50 ? 22 : 18)}
                    textAnchor="middle"
                    fill={isHovered ? '#ffffff' : '#f8fafc'}
                    fontSize={block.height > 60 ? '13' : '12'}
                    fontWeight="700"
                  >
                    {block.name}
                  </text>

                  {/* 副标题/描述缩写 */}
                  <text
                    x={block.x + block.width / 2}
                    y={block.y + (block.height > 50 ? 40 : 31)}
                    textAnchor="middle"
                    fill={isHovered ? '#e2e8f0' : style.text}
                    fontSize="10"
                    fontFamily="monospace"
                    opacity={isOtherHovered ? 0.6 : 0.9}
                  >
                    {block.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 底部交互状态信息条 */}
      <div className="surface-panel rounded-xl p-4 border border-[var(--border)] min-h-[82px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all">
        {activeBlock ? (
          <>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`chip text-[10px] px-2 py-0.5 border ${COLOR_STYLES[activeBlock.colorScheme].badge}`}>
                  {activeBlock.layer}
                </span>
                <span className="font-bold text-sm text-[var(--text)]">
                  {activeBlock.name}
                </span>
                <span className="text-xs text-[var(--muted)] font-mono">
                  ({activeBlock.sub})
                </span>
              </div>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                {activeBlock.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleBlockClick(activeBlock.href)}
              className="btn-primary text-xs shrink-0 self-end md:self-auto py-2 px-3.5"
            >
              <span>阅读该层解析</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2.5 text-xs text-[var(--muted)] w-full py-1">
            <Info className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              鼠标悬停在上方任意层级（应用程序、子系统 DLL、NTDLL、执行体管理器、微内核、HAL 等）可查看核心职能，点击可直接进入对应文档。
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
