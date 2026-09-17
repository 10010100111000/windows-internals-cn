'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileCode,
  AlertCircle,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Table as TableIcon,
  Info,
} from 'lucide-react';

interface MockEventLog {
  id: number;
  level: 'Information' | 'Warning' | 'Error' | 'AuditSuccess' | 'AuditFailure';
  time: string;
  provider: string;
  task: string;
  description: string;
}

const MOCK_EVENTS: MockEventLog[] = [
  {
    id: 4624,
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:01',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '登录',
    description: '账户已成功登录。目标用户: Administrator，登录类型: 2 (交互式)，工作站: WORKSTATION-01',
  },
  {
    id: 4672,
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:01',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '特权使用',
    description: '已为新登录会话分配高特权: SeSecurityPrivilege, SeBackupPrivilege, SeDebugPrivilege',
  },
  {
    id: 4688,
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:05',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '进程创建',
    description: '新进程已创建。新进程名称: C:\\Windows\\System32\\cmd.exe，命令行: "cmd.exe" /c whoami',
  },
  {
    id: 7045,
    level: 'Information',
    time: '2026-09-17 14:25:30',
    provider: 'Service Control Manager',
    task: '服务系统',
    description: '系统中已安装新系统服务。服务名称: Sysmon64，服务文件名: C:\\Windows\\Sysmon64.exe',
  },
  {
    id: 4625,
    level: 'AuditFailure',
    time: '2026-09-17 14:30:12',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '登录',
    description: '账户登录失败。目标用户: guest，失败状态码: 0xC000006D (STATUS_LOGON_FAILURE)',
  },
  {
    id: 1102,
    level: 'AuditSuccess',
    time: '2026-09-17 14:32:00',
    provider: 'Microsoft-Windows-Eventlog',
    task: '日志服务',
    description: '安全审核日志已被清除。执行者标识: NT AUTHORITY\\SYSTEM (PID: 748)',
  },
];

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const EvtxLab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bufferLength, setBufferLength] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useSampleData, setUseSampleData] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (selectedFile: File) => {
    setIsLoading(true);
    try {
      const buffer = await selectedFile.arrayBuffer();
      setFile(selectedFile);
      setBufferLength(buffer.byteLength);
      setUseSampleData(false);
    } catch (err) {
      console.error('读取 EVTX 文件失败:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const dropped = droppedFiles[0];
      await processFile(dropped);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLoadSample = () => {
    setUseSampleData(true);
    setFile({
      name: 'Security-Audit-Sample.evtx',
      size: 1572864,
    } as File);
    setBufferLength(1572864);
  };

  const handleReset = () => {
    setFile(null);
    setBufferLength(null);
    setUseSampleData(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasLoaded = Boolean(file && bufferLength !== null);

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".evtx"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* 拖拽上传区域 */}
      {!hasLoaded ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerUpload}
          className={`evtx-dropzone flex flex-col items-center justify-center p-10 ${
            isDragging ? 'active' : ''
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">
            拖放 Windows 事件日志文件 (.evtx) 到此处
          </h3>
          <p className="text-sm text-[var(--text-soft)] max-w-md mb-5">
            或点击此处从本地磁盘选择文件。本工具在浏览器本地解析，文件不会上传至任何远程服务器。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerUpload();
              }}
            >
              <FileCode className="w-4 h-4" />
              选择本地 .evtx 文件
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-[var(--text-soft)] hover:text-white border border-[var(--border)] rounded-xl hover:bg-[var(--bg-soft)] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample();
              }}
            >
              加载示例事件日志
            </button>
          </div>
        </div>
      ) : (
        /* 文件信息栏 */
        <div className="surface-card rounded-2xl p-5 border border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[var(--text)] text-base">
                  {file?.name}
                </h3>
                <span className="chip chip-depth-beginner text-[10px] px-2 py-0.5">
                  已加载 ArrayBuffer
                </span>
              </div>
              <p className="text-xs text-[var(--text-soft)] mt-1 font-mono">
                文件大小: {formatBytes(file?.size || 0)} ({bufferLength?.toLocaleString()} 字节)
                {useSampleData && ' [仿真模拟数据]'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={handleTriggerUpload}
              className="px-3 py-1.5 text-xs text-[var(--text-soft)] hover:text-white border border-[var(--border)] rounded-lg hover:bg-[var(--bg-soft)] transition-colors"
            >
              更换文件
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      )}

      {/* 提示信息：Rust WASM 解析器正在开发中 */}
      <div className="surface-panel rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-amber-500/5 flex items-start gap-3.5">
        <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
          <p className="font-bold text-amber-300 text-sm mb-1">
            完整的 EVTX 解析功能即将上线（基于 Rust WASM）
          </p>
          <p className="text-xs text-amber-200/75 leading-normal">
            当前版本已完成浏览器端二进制文件流（ArrayBuffer）读取支持。底层完整的 EVTX 块头解构、Chunk 解码、二进制 XML（BinXml）还原及 XPath 过滤引擎正使用 Rust 编写，并将编译为高吞吐 WebAssembly 模块直接在前端无缝运行。
          </p>
        </div>
      </div>

      {/* 模拟表格预览 */}
      {hasLoaded && (
        <div className="surface-card rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-[var(--accent)]" />
              <h4 className="text-sm font-bold text-[var(--text)]">
                事件记录预览（仿真解析数据）
              </h4>
            </div>
            <span className="text-xs text-[var(--muted)] font-mono">
              共 {MOCK_EVENTS.length} 条记录
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text)]">
                  <th className="p-3 font-semibold">事件 ID</th>
                  <th className="p-3 font-semibold">级别</th>
                  <th className="p-3 font-semibold">生成时间</th>
                  <th className="p-3 font-semibold">来源提供者</th>
                  <th className="p-3 font-semibold">任务类别</th>
                  <th className="p-3 font-semibold min-w-[320px]">描述摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60 text-[var(--text-soft)]">
                {MOCK_EVENTS.map((item) => {
                  let badge = (
                    <span className="chip chip-muted px-2 py-0.5 text-[10px]">
                      {item.level}
                    </span>
                  );
                  if (item.level === 'AuditSuccess') {
                    badge = (
                      <span className="chip chip-depth-beginner px-2 py-0.5 text-[10px] border">
                        审核成功
                      </span>
                    );
                  } else if (item.level === 'AuditFailure' || item.level === 'Error') {
                    badge = (
                      <span className="chip chip-depth-expert px-2 py-0.5 text-[10px] border">
                        {item.level === 'AuditFailure' ? '审核失败' : '错误'}
                      </span>
                    );
                  } else if (item.level === 'Warning') {
                    badge = (
                      <span className="chip chip-depth-intermediate px-2 py-0.5 text-[10px] border">
                        警告
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={item.id + item.time}
                      className="hover:bg-[var(--bg-panel)] transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-[var(--accent)]">
                        {item.id}
                      </td>
                      <td className="p-3 whitespace-nowrap">{badge}</td>
                      <td className="p-3 font-mono whitespace-nowrap">{item.time}</td>
                      <td className="p-3 font-mono text-[11px] max-w-[180px] truncate" title={item.provider}>
                        {item.provider}
                      </td>
                      <td className="p-3 whitespace-nowrap">{item.task}</td>
                      <td className="p-3 leading-relaxed text-[var(--text)]">
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvtxLab;
