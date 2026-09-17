import Link from 'next/link';
import { topicTree } from '@/data/topics';
import { TopicCard } from '@/components/TopicCard';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      
      {/* 1. 顶部 Hero 与 交互式架构图 */}
      <section className="surface-panel-strong relative mb-10 overflow-hidden">
        <div className="relative border-b border-[var(--border)] px-6 py-7 md:px-8 md:py-8">
          <p className="section-eyebrow mb-3 text-sm">Interactive reference</p>
          <h1 className="font-display mb-3 max-w-3xl text-3xl leading-tight md:text-5xl">
            从内到外理解 Windows 系统
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--text-soft)] md:text-lg">
            从下方的架构图开始——每个模块都是系统的真实组成部分。点击了解其功能，然后深入探索相关主题、实验和学习路径。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
              面向初学者的向导路径
            </span>
            <span className="chip px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
              可交互的系统架构图
            </span>
            <span className="chip px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
              动手实验 (EVTX, ACL, DNS)
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-8 bg-[#0d1117] flex justify-center overflow-x-auto">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* 2. 精选学习路径 (Curated paths) */}
      <section className="mb-16">
        <h2 className="font-display mb-4 text-xl font-semibold">精选学习路径</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Path 1 */}
          <section className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-medium">启动流程 (Boot path)</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              从平台固件一直到交互式桌面和 Winlogon 登录。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/explore/startup/secure-boot" className="chip px-3 py-1 text-xs no-underline">启动与固件</Link>
              <Link href="/explore/startup" className="chip px-3 py-1 text-xs no-underline">启动与关机</Link>
              <Link href="/explore/services" className="chip px-3 py-1 text-xs no-underline">服务 (SCM)</Link>
              <Link href="/explore/gui/window-stations" className="chip px-3 py-1 text-xs no-underline">Windows站与桌面</Link>
            </div>
          </section>

          {/* Path 2 */}
          <section className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-medium">虚拟化与隔离 (Virtualization)</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              Windows 如何利用 Hypervisor 进行 Enlightened I/O 以及基于虚拟化的安全防护。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/explore/virtualization" className="chip px-3 py-1 text-xs no-underline">虚拟化</Link>
              <Link href="/explore/virtualization/hyper-v" className="chip px-3 py-1 text-xs no-underline">Hyper-V 与分区</Link>
              <Link href="/explore/virtualization/security" className="chip px-3 py-1 text-xs no-underline">VBS, HVCI 与隔离</Link>
            </div>
          </section>

          {/* Path 3 */}
          <section className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-medium">认证路径 (Authentication)</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              从 Winlogon 经过 LSASS，再到 Kerberos/NTLM 协议及底层加密体系。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/explore/auth" className="chip px-3 py-1 text-xs no-underline">认证与登录</Link>
              <Link href="/explore/auth/logon-flow" className="chip px-3 py-1 text-xs no-underline">Winlogon 与会话登录</Link>
              <Link href="/explore/auth/lsass-sam" className="chip px-3 py-1 text-xs no-underline">LSASS, SAM 与安全策略</Link>
              <Link href="/explore/auth/kerberos-ntlm" className="chip px-3 py-1 text-xs no-underline">Kerberos, NTLM</Link>
              <Link href="/explore/security/token" className="chip px-3 py-1 text-xs no-underline">访问令牌</Link>
            </div>
          </section>

          {/* Path 4 */}
          <section className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-medium">加载器与运行时 (Loader)</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              PE 映像、DLL 加载机制以及 64 位 Windows 上的 WOW64 兼容层。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/explore/loader" className="chip px-3 py-1 text-xs no-underline">可执行文件加载</Link>
              <Link href="/explore/loader/pe" className="chip px-3 py-1 text-xs no-underline">PE 格式</Link>
              <Link href="/explore/loader/dll-loader" className="chip px-3 py-1 text-xs no-underline">DLL 加载器与 PEB</Link>
              <Link href="/explore/loader/wow64" className="chip px-3 py-1 text-xs no-underline">WOW64</Link>
              <Link href="/explore/processes/ntdll" className="chip px-3 py-1 text-xs no-underline">Ntdll 与用户/内核边界</Link>
            </div>
          </section>

          {/* Path 5 */}
          <section className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-medium">存储路径 (Storage)</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              卷 (Volumes)、NTFS、缓存管理器以及重解析点。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/explore/storage" className="chip px-3 py-1 text-xs no-underline">存储与文件系统</Link>
              <Link href="/explore/storage/volumes" className="chip px-3 py-1 text-xs no-underline">磁盘、分区与卷</Link>
              <Link href="/explore/storage/filesystems" className="chip px-3 py-1 text-xs no-underline">文件系统</Link>
              <Link href="/explore/storage/cache" className="chip px-3 py-1 text-xs no-underline">缓存管理器</Link>
              <Link href="/explore/storage/reparse-points" className="chip px-3 py-1 text-xs no-underline">重解析点与符号链接</Link>
            </div>
          </section>

        </div>
      </section>

      {/* 3. 核心主线主题 (Top-level themes) */}
      <section>
        <h2 className="font-display mb-4 text-xl font-semibold">核心主题 (Top-level themes)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {topicTree.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} showDepth={false} />
          ))}
        </div>
      </section>

    </div>
  );
}
