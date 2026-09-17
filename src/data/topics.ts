import type { Topic } from '@/lib/types';

export const topicTree: Topic[] = [
  {
    slug: 'architecture',
    title: '系统架构',
    summary: '解析 Windows 双模式架构与内核核心组件协作。',
    depth: 'beginner',
    hasSchematic: true,
    keywords: ['Architecture', 'Kernel', 'User Mode', 'Kernel Mode', 'HAL', 'Executive', 'Subsystem'],
    relatedSlugs: ['processes', 'security'],
    children: [
      {
        slug: 'architecture/subsystems',
        title: '子系统与环境',
        summary: '探讨 Win32 与 POSIX 等环境子系统的运作原理。',
        depth: 'intermediate',
        keywords: ['Subsystems', 'Win32', 'CSRSS', 'Environment Subsystems', 'POSIX', 'Windows API'],
        relatedSlugs: ['gui/csrss-win32k', 'processes/ntdll'],
      },
      {
        slug: 'architecture/kernel-mechanisms',
        title: '内核机制：IRQL、DPC、中断',
        summary: '剖析 IRQL 优先级机制与 DPC/APC 调度。',
        depth: 'expert',
        keywords: ['IRQL', 'DPC', 'APC', 'Interrupts', 'HAL', 'ISR', 'Spinlock'],
        relatedSlugs: ['processes/scheduling', 'io/drivers'],
      },
    ],
  },
  {
    slug: 'processes',
    title: '进程与线程',
    summary: '介绍 Windows 进程与线程的生命周期及核心模型。',
    depth: 'beginner',
    keywords: ['Process', 'Thread', 'EPROCESS', 'ETHREAD', 'PEB', 'TEB'],
    relatedSlugs: ['architecture', 'memory'],
    children: [
      {
        slug: 'processes/objects',
        title: '内核对象与句柄',
        summary: '解析对象管理器模型、句柄表结构及引用计数。',
        depth: 'intermediate',
        keywords: ['Object Manager', 'Handle', 'Handle Table', 'Security Descriptor', 'ObReferenceObject'],
        relatedSlugs: ['security/descriptors-acls'],
      },
      {
        slug: 'processes/scheduling',
        title: '线程调度',
        summary: '解析基于优先级的抢占式调度与时间片算法。',
        depth: 'intermediate',
        keywords: ['Scheduling', 'Priority', 'Quantum', 'Context Switch', 'Affinity', 'Ready Queue'],
        relatedSlugs: ['architecture/kernel-mechanisms'],
      },
      {
        slug: 'processes/ntdll',
        title: 'Ntdll 与系统调用',
        summary: '探究用户态 API 跨越至内核态的系统调用链路。',
        depth: 'expert',
        keywords: ['NTDLL', 'Syscall', 'SSDT', 'KiSystemCall64', 'System Service', 'Transition'],
        relatedSlugs: ['architecture/kernel-mechanisms', 'loader/wow64'],
      },
    ],
  },
  {
    slug: 'memory',
    title: '内存管理',
    summary: '阐述虚拟内存体系、地址空间与物理内存管理。',
    depth: 'beginner',
    keywords: ['Memory Manager', 'Virtual Memory', 'VMM', 'Address Space', 'RAM', 'Paging'],
    relatedSlugs: ['processes', 'storage/cache'],
    children: [
      {
        slug: 'memory/vad',
        title: '虚拟地址描述符 VAD',
        summary: '剖析平衡二叉树 VAD 对用户虚拟空间的分配跟踪。',
        depth: 'intermediate',
        keywords: ['VAD', 'Virtual Address Descriptor', 'AVL Tree', 'Allocation', 'VirtualAlloc'],
        relatedSlugs: ['memory/paging'],
      },
      {
        slug: 'memory/pool',
        title: '内核池分配',
        summary: '讲解分页池、非分页池与内核堆内存分配机制。',
        depth: 'expert',
        keywords: ['Pool', 'Paged Pool', 'NonPaged Pool', 'Segment Heap', 'Quota', 'ExAllocatePool'],
        relatedSlugs: ['architecture/kernel-mechanisms'],
      },
      {
        slug: 'memory/paging',
        title: '分页机制',
        summary: '揭示多级页表转换、缺页处理及 PFN 数据库。',
        depth: 'intermediate',
        keywords: ['Paging', 'Page Table', 'Page Fault', 'PFN', 'PTE', 'CR3', 'TLB'],
        relatedSlugs: ['memory/working-set', 'memory/vad'],
      },
      {
        slug: 'memory/working-set',
        title: '工作集',
        summary: '分析进程与系统工作集的页面修剪及置换策略。',
        depth: 'intermediate',
        keywords: ['Working Set', 'Aging', 'Trimming', 'Pagefile', 'Standby List', 'WorkingSetManager'],
        relatedSlugs: ['memory/paging'],
      },
    ],
  },
  {
    slug: 'diagnostics',
    title: '诊断与日志',
    summary: '介绍 Windows 诊断追踪与内核调试日志设施。',
    depth: 'beginner',
    keywords: ['Diagnostics', 'ETW', 'Debugging', 'Event Log', 'Tracing', 'Windows Performance Recorder'],
    relatedSlugs: ['processes'],
    children: [
      {
        slug: 'diagnostics/event-log',
        title: '事件日志',
        summary: '概述系统、安全与应用程序事件日志架构体系。',
        depth: 'beginner',
        keywords: ['Event Log', 'EventViewer', 'Channels', 'Service', 'Crimson'],
        relatedSlugs: ['diagnostics/event-log/providers', 'diagnostics/event-log/evtx'],
        children: [
          {
            slug: 'diagnostics/event-log/providers',
            title: '事件提供程序',
            summary: '解析 ETW 事件提供程序注册与事件发布规范。',
            depth: 'intermediate',
            keywords: ['ETW Providers', 'Manifest', 'EventRegister', 'Trace Logging', 'EventWrite'],
            relatedSlugs: ['diagnostics/event-log/evtx'],
          },
          {
            slug: 'diagnostics/event-log/evtx',
            title: 'EVTX 文件格式',
            summary: '剖析 EVTX 二进制 XML 日志文件结构与解析。',
            depth: 'intermediate',
            hasLab: true,
            keywords: ['EVTX', 'Binary XML', 'Chunk', 'Forensics', 'Parsing', 'Header'],
            relatedSlugs: ['diagnostics/event-log/providers'],
          },
        ],
      },
    ],
  },
  {
    slug: 'security',
    title: '安全',
    summary: '详解 Windows 访问控制、凭据认证与内核安全。',
    depth: 'beginner',
    keywords: ['Security', 'Access Control', 'SRM', 'LSA', 'Authorization', 'SID'],
    relatedSlugs: ['auth', 'virtualization/security'],
    children: [
      {
        slug: 'security/token',
        title: '访问令牌',
        summary: '解析访问令牌构成、特权集合与身份模拟机制。',
        depth: 'intermediate',
        keywords: ['Token', 'Privilege', 'Impersonation', 'SID', 'Restricted Token', 'SeAssignPrimaryToken'],
        relatedSlugs: ['security/uac-mic', 'auth/logon-flow'],
      },
      {
        slug: 'security/descriptors-acls',
        title: '安全描述符与 ACL',
        summary: '剖析安全描述符、DACL 访问控制与审计模型。',
        depth: 'intermediate',
        keywords: ['Security Descriptor', 'DACL', 'SACL', 'ACE', 'Inheritance', 'SDDL'],
        relatedSlugs: ['security/access-checks-srm'],
      },
      {
        slug: 'security/access-checks-srm',
        title: '访问检查与 SRM',
        summary: '探讨安全引用监视器 SRM 内核访问权限检查。',
        depth: 'expert',
        keywords: ['SRM', 'Access Check', 'SeAccessCheck', 'Effective Rights', 'Audit'],
        relatedSlugs: ['security/descriptors-acls', 'processes/objects'],
      },
      {
        slug: 'security/uac-mic',
        title: 'UAC 与完整性级别',
        summary: '解读 UAC 原理与强制完整性控制 MIC 隔离。',
        depth: 'intermediate',
        keywords: ['UAC', 'MIC', 'Mandatory Integrity Control', 'Integrity Level', 'Elevation', 'Filtered Token'],
        relatedSlugs: ['security/token'],
      },
    ],
  },
  {
    slug: 'io',
    title: 'I/O 系统',
    summary: '探讨异步 I/O 请求包 IRP 与分层驱动架构。',
    depth: 'intermediate',
    keywords: ['I/O', 'IRP', 'Device Driver', 'I/O Stack', 'Asynchronous', 'Fast I/O'],
    relatedSlugs: ['storage', 'networking'],
    children: [
      {
        slug: 'io/manager',
        title: 'I/O 管理器',
        summary: '解析 I/O 管理器组织设备栈与派发请求流程。',
        depth: 'intermediate',
        keywords: ['I/O Manager', 'Device Object', 'Driver Object', 'Dispatch', 'IoCallDriver'],
        relatedSlugs: ['io/drivers'],
      },
      {
        slug: 'io/drivers',
        title: '驱动程序模型',
        summary: '阐述 WDM/WDF 驱动模型与分发例程机制。',
        depth: 'expert',
        keywords: ['WDM', 'WDF', 'KMDF', 'UMDF', 'Filter Driver', 'MajorFunction', 'DriverEntry'],
        relatedSlugs: ['io/manager'],
      },
      {
        slug: 'io/pnp-power',
        title: '即插即用与电源管理',
        summary: '分析即插即用设备枚举与电源状态转换流程。',
        depth: 'expert',
        keywords: ['PnP', 'Power Management', 'ACPI', 'Sleep States', 'DevNode', 'IRP_MJ_PNP'],
        relatedSlugs: ['io/drivers'],
      },
    ],
  },
  {
    slug: 'services',
    title: '服务与后台基础设施',
    summary: '阐释服务控制管理器 SCM 与后台服务生命周期。',
    depth: 'beginner',
    keywords: ['Services', 'SCM', 'Service Control Manager', 'Daemon', 'ServiceMain', 'services.exe'],
    relatedSlugs: ['processes', 'startup'],
    children: [
      {
        slug: 'services/svchost',
        title: 'Svchost 与服务分组',
        summary: '分析共享服务宿主 Svchost 隔离与 DLL 加载。',
        depth: 'intermediate',
        keywords: ['Svchost', 'Service Grouping', 'DLL Hosting', 'Isolation', 'svchost.exe'],
        relatedSlugs: ['loader/dll-loader'],
      },
    ],
  },
  {
    slug: 'registry',
    title: '注册表与配置',
    summary: '解析系统配置数据库 Hive 结构、缓存与事务。',
    depth: 'beginner',
    keywords: ['Registry', 'Hive', 'Regedit', 'Keys', 'Values', 'TxR', 'CM', 'HKEY'],
    relatedSlugs: ['startup', 'storage'],
  },
  {
    slug: 'storage',
    title: '存储与文件系统',
    summary: '介绍存储栈结构、文件系统驱动与卷管理模型。',
    depth: 'intermediate',
    keywords: ['Storage', 'File System', 'NTFS', 'Volume', 'Partition', 'Disk', 'Storport'],
    relatedSlugs: ['io'],
    children: [
      {
        slug: 'storage/volumes',
        title: '卷管理',
        summary: '探讨卷管理器、磁盘分区及装载点管理原理。',
        depth: 'intermediate',
        keywords: ['Volumes', 'GPT', 'MBR', 'Mount Point', 'Volsnap', 'BitLocker', 'Volume Manager'],
        relatedSlugs: ['storage/filesystems'],
      },
      {
        slug: 'storage/filesystems',
        title: '文件系统',
        summary: '深度拆解 NTFS 与 ReFS 核心结构及容灾。',
        depth: 'intermediate',
        keywords: ['NTFS', 'ReFS', 'MFT', 'USN Journal', 'Metadata', 'Clusters', 'File Records'],
        relatedSlugs: ['storage/cache'],
      },
      {
        slug: 'storage/cache',
        title: '缓存管理器',
        summary: '剖析系统文件缓存、预读取与内存管理协同。',
        depth: 'expert',
        keywords: ['Cache Manager', 'CcCopyRead', 'Prefetch', 'Superfetch', 'Lazy Writer', 'Read Ahead'],
        relatedSlugs: ['memory', 'storage/filesystems'],
      },
      {
        slug: 'storage/reparse-points',
        title: '重解析点',
        summary: '解析符号链接、目录联接及重解析点扩展机制。',
        depth: 'intermediate',
        keywords: ['Reparse Points', 'Symlink', 'Junction', 'Mount Points', 'Filter', 'FSCTL'],
        relatedSlugs: ['storage/filesystems'],
      },
    ],
  },
  {
    slug: 'networking',
    title: '网络',
    summary: '概述网络架构、Winsock 接口与协议驱动栈。',
    depth: 'intermediate',
    keywords: ['Networking', 'Network Stack', 'Winsock', 'TCP/IP', 'NDIS', 'WFP'],
    relatedSlugs: ['io'],
    children: [
      {
        slug: 'networking/dns-client',
        title: 'DNS 客户端',
        summary: '探讨 DNS 客户端解析服务与多归属查询缓存。',
        depth: 'beginner',
        keywords: ['DNS', 'DNS Client', 'Name Resolution', 'LLMNR', 'mDNS', 'Dnscache'],
        relatedSlugs: ['networking/tcpip'],
      },
      {
        slug: 'networking/winsock-afd',
        title: 'Winsock 与 AFD',
        summary: '剖析用户态 Winsock 与底层 AFD.sys 交互。',
        depth: 'intermediate',
        keywords: ['Winsock', 'AFD', 'AFD.sys', 'Socket', 'WSA', 'Async Select', 'mswsock.dll'],
        relatedSlugs: ['networking/tcpip'],
      },
      {
        slug: 'networking/tcpip',
        title: 'TCP/IP 协议栈',
        summary: '深度解析 tcpip.sys 传输控制与分片重组。',
        depth: 'intermediate',
        keywords: ['TCP/IP', 'tcpip.sys', 'Dual Stack', 'TCP', 'UDP', 'IPv6', 'Congestion Control'],
        relatedSlugs: ['networking/ndis', 'networking/filtering'],
      },
      {
        slug: 'networking/filtering',
        title: '网络过滤',
        summary: '介绍轻量级网络过滤、NDIS 过滤与流量监控。',
        depth: 'intermediate',
        keywords: ['Network Filtering', 'NDIS Filter', 'Packet Capture', 'Inspection', 'LWF'],
        relatedSlugs: ['networking/wfp-bfe'],
      },
      {
        slug: 'networking/wfp-bfe',
        title: 'WFP 与 BFE',
        summary: '剖析 Windows 过滤平台与 BFE 分层审计。',
        depth: 'expert',
        keywords: ['WFP', 'BFE', 'Filtering Platform', 'Callout', 'Firewall', 'Layers'],
        relatedSlugs: ['networking/filtering', 'security'],
      },
      {
        slug: 'networking/ndis',
        title: 'NDIS',
        summary: '详解 NDIS 网络驱动接口与网卡数据包处理。',
        depth: 'expert',
        keywords: ['NDIS', 'Miniport', 'NetBuffer', 'Offload', 'RSS', 'Protocol Driver'],
        relatedSlugs: ['networking/tcpip'],
      },
    ],
  },
  {
    slug: 'startup',
    title: '启动与关闭',
    summary: '揭示从固件引导到 Windows 会话初始化的全流程。',
    depth: 'beginner',
    keywords: ['Startup', 'Boot', 'UEFI', 'Bootmgr', 'Winload', 'Shutdown', 'BCD'],
    relatedSlugs: ['processes', 'architecture'],
    children: [
      {
        slug: 'startup/session-manager',
        title: '会话管理器',
        summary: '解析会话管理器 Smss.exe 初始化与会话创建。',
        depth: 'intermediate',
        keywords: ['SMSS', 'Session Manager', 'smss.exe', 'Session 0', 'Winlogon', 'Initialization'],
        relatedSlugs: ['gui/window-stations'],
      },
    ],
  },
  {
    slug: 'gui',
    title: 'GUI 与窗口系统',
    summary: '讲解 Windows 窗口管理器与用户输入图形系统。',
    depth: 'intermediate',
    keywords: ['GUI', 'Windowing', 'Win32k', 'User32', 'GDI', 'DWM', 'Desktop Window Manager'],
    relatedSlugs: ['architecture/subsystems'],
    children: [
      {
        slug: 'gui/window-stations',
        title: '窗口站与桌面',
        summary: '分析会话、窗口站与桌面的层级安全隔离架构。',
        depth: 'intermediate',
        keywords: ['Window Station', 'Desktop', 'WinSta0', 'Session Isolation', 'Message Loop', 'Input Desktop'],
        relatedSlugs: ['security', 'startup/session-manager'],
      },
      {
        slug: 'gui/user-gdi',
        title: 'USER 与 GDI 对象',
        summary: '解析窗口等 USER 对象与画笔位图 GDI 句柄。',
        depth: 'expert',
        keywords: ['USER', 'GDI', 'GDI Objects', 'USER Objects', 'HDC', 'HWND', 'Handle Quota'],
        relatedSlugs: ['processes/objects'],
      },
      {
        slug: 'gui/csrss-win32k',
        title: 'CSRSS 与 Win32k',
        summary: '深入探讨 csrss 服务与 win32k 驱动协同机制。',
        depth: 'expert',
        keywords: ['CSRSS', 'Win32k', 'win32k.sys', 'win32kbase.sys', 'Kernel GUI', 'Shadow SSDT'],
        relatedSlugs: ['architecture/subsystems', 'processes/ntdll'],
      },
    ],
  },
  {
    slug: 'ipc',
    title: 'IPC 与组件边界',
    summary: '全面解读管道、共享内存、RPC 与 ALPC 通信。',
    depth: 'intermediate',
    keywords: ['IPC', 'ALPC', 'Named Pipes', 'RPC', 'Shared Memory', 'Mailslots', 'COM'],
    relatedSlugs: ['processes', 'architecture/subsystems'],
  },
  {
    slug: 'auth',
    title: '认证与登录',
    summary: '详解安全主体认证、凭据交换与本地安全机构。',
    depth: 'intermediate',
    keywords: ['Authentication', 'Logon', 'LSA', 'LSASS', 'Credentials', 'Kerberos', 'Security Package'],
    relatedSlugs: ['security'],
    children: [
      {
        slug: 'auth/logon-flow',
        title: '登录流程',
        summary: '追踪交互式登录到用户访问令牌创建的全过程。',
        depth: 'intermediate',
        keywords: ['Logon Flow', 'Winlogon', 'LogonUI', 'Interactive Logon', 'GINA', 'Credential Provider'],
        relatedSlugs: ['auth/lsass-sam', 'security/token'],
      },
      {
        slug: 'auth/lsass-sam',
        title: 'LSASS 与 SAM',
        summary: '分析 LSASS 认证服务与 SAM 安全数据库交互。',
        depth: 'expert',
        keywords: ['LSASS', 'SAM', 'Security Accounts Manager', 'Credentials', 'Pass-the-Hash', 'lsass.exe'],
        relatedSlugs: ['auth/logon-flow'],
      },
      {
        slug: 'auth/kerberos-ntlm',
        title: 'Kerberos 与 NTLM',
        summary: '剖析域环境 Kerberos 与 NTLM 质询认证机制。',
        depth: 'expert',
        keywords: ['Kerberos', 'NTLM', 'TGT', 'TGS', 'Challenge-Response', 'SSPI', 'SPNEGO'],
        relatedSlugs: ['auth/lsass-sam'],
      },
      {
        slug: 'auth/cryptography',
        title: '密码学基础设施',
        summary: '概述 CNG/CryptoAPI 架构与内核加密服务。',
        depth: 'expert',
        keywords: ['Cryptography', 'CNG', 'CryptoAPI', 'KsecDD', 'TPM', 'BitLocker', 'BCrypt'],
        relatedSlugs: ['security'],
      },
    ],
  },
  {
    slug: 'loader',
    title: '可执行文件加载与运行时',
    summary: '讲解映像解析、动态库加载与跨架构兼容运行时。',
    depth: 'intermediate',
    keywords: ['Loader', 'PE', 'DLL', 'WOW64', 'Image Loader', 'Ldr', 'Mapping'],
    relatedSlugs: ['processes', 'memory'],
    children: [
      {
        slug: 'loader/pe',
        title: 'PE 文件格式',
        summary: '深度解析 PE 头、节表、导入导出表及重定位。',
        depth: 'intermediate',
        keywords: ['PE', 'PE32+', 'COFF', 'Import Table', 'Export Table', 'Relocations', 'Headers'],
        relatedSlugs: ['loader/dll-loader'],
      },
      {
        slug: 'loader/dll-loader',
        title: 'DLL 加载器',
        summary: '分析 Ldr 加载例程、依赖解析与 TLS 回调执行。',
        depth: 'intermediate',
        keywords: ['DLL Loader', 'LdrpInitializeProcess', 'TLS Callback', 'LoadLibrary', 'DLL Main'],
        relatedSlugs: ['loader/pe'],
      },
      {
        slug: 'loader/wow64',
        title: 'WOW64 兼容层',
        summary: '探秘 64 位系统运行 32 位程序的仿真兼容层。',
        depth: 'expert',
        keywords: ['WOW64', "Heaven's Gate", 'Thunking', 'SysWOW64', 'Registry Redirection', 'wow64.dll'],
        relatedSlugs: ['processes/ntdll'],
      },
    ],
  },
  {
    slug: 'virtualization',
    title: '虚拟化',
    summary: '探讨基于硬件的虚拟化与 Hyper-V 安全架构。',
    depth: 'intermediate',
    keywords: ['Virtualization', 'Hyper-V', 'Hypervisor', 'VBS', 'HVCI', 'SLAT'],
    relatedSlugs: ['architecture', 'security'],
    children: [
      {
        slug: 'virtualization/hyper-v',
        title: 'Hyper-V 架构',
        summary: '解析 Hyper-V 虚拟机监控程序与分区通信。',
        depth: 'expert',
        keywords: ['Hyper-V', 'Hypervisor', 'Root Partition', 'VMBus', 'Enlightenments', 'Virtual Processor'],
        relatedSlugs: ['virtualization/security'],
      },
      {
        slug: 'virtualization/security',
        title: '虚拟化安全',
        summary: '剖析基于虚拟化的安全 VBS 与 HVCI 保护。',
        depth: 'expert',
        keywords: ['VBS', 'HVCI', 'Virtual Secure Mode', 'Trustlet', 'Credential Guard', 'Secure Kernel'],
        relatedSlugs: ['virtualization/hyper-v', 'security'],
      },
    ],
  },
];

/**
 * 扁平化获取所有主题（先序遍历）
 */
export function flattenTopics(topics: Topic[] = topicTree): Topic[] {
  const result: Topic[] = [];
  function traverse(list: Topic[]) {
    for (const item of list) {
      result.push(item);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    }
  }
  traverse(topics);
  return result;
}

/**
 * 根据 slug 查询特定主题
 */
export function findTopicBySlug(slug: string): Topic | undefined {
  return flattenTopics().find((item) => item.slug === slug);
}

/**
 * 获取指定 slug 的面包屑层级路径
 */
export function getTopicBreadcrumb(slug: string, nodes: Topic[] = topicTree): Topic[] {
  for (const node of nodes) {
    if (node.slug === slug) {
      return [node];
    }
    if (node.children) {
      const childPath = getTopicBreadcrumb(slug, node.children);
      if (childPath.length > 0) {
        return [node, ...childPath];
      }
    }
  }
  return [];
}

/**
 * 获取指定 slug 的上一篇与下一篇主题（线性导航）
 */
export function getNextPrevTopics(slug: string): { prev?: Topic; next?: Topic } {
  const flat = flattenTopics();
  const index = flat.findIndex((t) => t.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}
