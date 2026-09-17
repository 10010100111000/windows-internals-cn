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

interface EventLog {
  id: string;
  level: string;
  time: string;
  provider: string;
  task: string;
  description: string;
}

const MOCK_EVENTS: EventLog[] = [
  {
    id: '4624',
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:01',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '登录',
    description: '账户已成功登录。目标用户: Administrator，登录类型: 2 (交互式)，工作站: WORKSTATION-01',
  },
  {
    id: '4672',
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:01',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '特权使用',
    description: '已为新登录会话分配高特权: SeSecurityPrivilege, SeBackupPrivilege, SeDebugPrivilege',
  },
  {
    id: '4688',
    level: 'AuditSuccess',
    time: '2026-09-17 14:22:05',
    provider: 'Microsoft-Windows-Security-Auditing',
    task: '进程创建',
    description: '新进程已创建。新进程名称: C:\\Windows\\System32\\cmd.exe，命令行: "cmd.exe" /c whoami',
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
  const [parsedEvents, setParsedEvents] = useState<EventLog[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseEvtxBuffer = async (arrayBuffer: ArrayBuffer) => {
    try {
      // Dynamic imports for browser compatibility
      const { Buffer } = await import('buffer');
      const { parseEvtxFile } = await import('winevtx');

      const buf = Buffer.from(arrayBuffer);
      const events: EventLog[] = [];
      
      for (const record of parseEvtxFile(buf)) {
        const evt = record.event as any;
        const sys = evt?.Event?.System || {};
        
        let eventId = sys?.EventID?.['#text'] ?? sys?.EventID ?? '-';
        if (typeof eventId === 'object' && eventId !== null && 'text' in eventId) eventId = eventId.text;
        if (typeof eventId === 'object' && eventId !== null && 'value' in eventId) eventId = eventId.value;

        let level = 'Information';
        const lvlRaw = sys?.Level?.['#text'] ?? sys?.Level ?? 4;
        if (lvlRaw == 1 || lvlRaw == 2) level = 'Error';
        else if (lvlRaw == 3) level = 'Warning';
        else if (lvlRaw == 0) level = 'Information';

        const keywords = sys?.Keywords?.['#text'] ?? sys?.Keywords;
        if (typeof keywords === 'string') {
          if (keywords.includes('Audit Failure') || keywords === '0x8020000000000000') level = 'AuditFailure';
          else if (keywords.includes('Audit Success') || keywords === '0x8010000000000000') level = 'AuditSuccess';
        }

        let timeStr = '-';
        if (record.timestamp) {
          timeStr = new Date(record.timestamp * 1000).toLocaleString('zh-CN', { hour12: false });
        }

        let provider = sys?.Provider?.Name ?? sys?.Provider?.['#text'] ?? '-';
        if (typeof provider === 'object') provider = JSON.stringify(provider);

        let task = sys?.Task?.['#text'] ?? sys?.Task ?? '-';

        const eventData = evt?.Event?.EventData || evt?.Event?.UserData || {};
        const description = Object.keys(eventData).length === 0 
          ? '无额外事件数据' 
          : JSON.stringify(eventData).substring(0, 300);

        events.push({
          id: String(eventId),
          level,
          time: timeStr,
          provider: String(provider),
          task: String(task),
          description
        });

        // Limit to 200 items for frontend performance
        if (events.length >= 200) break;
      }
      
      setParsedEvents(events);
    } catch (e: any) {
      console.error("EVTX 解析出错", e);
      setErrorMsg(`解析失败: ${e.message || '无效的 EVTX 文件格式'}`);
    }
  };

  const processFile = async (selectedFile: File) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const buffer = await selectedFile.arrayBuffer();
      setFile(selectedFile);
      setBufferLength(buffer.byteLength);
      setUseSampleData(false);
      
      // Delay slightly so UI can show loading state
      await new Promise(r => setTimeout(r, 100));
      await parseEvtxBuffer(buffer);

    } catch (err) {
      console.error('读取 EVTX 文件失败:', err);
      setErrorMsg('文件读取失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.toLowerCase().endsWith('.evtx')) {
      await processFile(droppedFile);
    } else {
      setErrorMsg('请上传有效的 .evtx 格式日志文件。');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLoadSample = () => {
    setFile(new File([''], 'Sample-Security-Log.evtx'));
    setBufferLength(8192);
    setUseSampleData(true);
    setParsedEvents(MOCK_EVENTS);
    setErrorMsg(null);
  };

  const handleReset = () => {
    setFile(null);
    setBufferLength(null);
    setUseSampleData(false);
    setParsedEvents([]);
    setErrorMsg(null);
  };

  const hasLoaded = file !== null;
  const displayEvents = useSampleData ? MOCK_EVENTS : parsedEvents;

  return (
    <div className="flex flex-col gap-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".evtx"
        onChange={handleFileSelect}
      />

      {/* 拖放区域 */}
      {!hasLoaded ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerUpload}
          className={`drop-zone rounded-3xl border-2 border-dashed border-[var(--border)] p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
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
            或点击此处从本地磁盘选择文件。本工具在浏览器本地直接解析，保护您的隐私。
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
                  已加载解析
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

      {/* 错误提示 */}
      {errorMsg && (
        <div className="surface-panel rounded-2xl p-4 sm:p-5 border border-rose-500/30 bg-rose-500/5 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
            <p className="font-bold text-rose-300 text-sm mb-1">解析出错</p>
            <p className="text-xs text-rose-200/75 leading-normal">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* 状态提示信息 */}
      {hasLoaded && !errorMsg && (
        <div className="surface-panel rounded-2xl p-4 sm:p-5 border border-[var(--accent)]/30 bg-[var(--accent)]/5 flex items-start gap-3.5">
          {isLoading ? (
            <RefreshCw className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm text-[var(--accent)]/90 leading-relaxed">
            <p className="font-bold text-[var(--accent)] text-sm mb-1">
              {isLoading ? '正在进行本地解析...' : '解析成功 (基于浏览器 JS 引擎)'}
            </p>
            <p className="text-xs text-[var(--accent)]/75 leading-normal">
              当前 EVTX 解析由纯前端 JavaScript 引擎处理。已为您成功提取底层 Chunk 和二进制 XML (BinXml) 记录。为保障渲染性能，界面目前仅显示最新的 200 条记录。
            </p>
          </div>
        </div>
      )}

      {/* 实际表格预览 */}
      {hasLoaded && !isLoading && !errorMsg && (
        <div className="surface-card rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-[var(--accent)]" />
              <h4 className="text-sm font-bold text-[var(--text)]">
                事件记录预览
              </h4>
            </div>
            <span className="text-xs text-[var(--muted)] font-mono">
              展示 {displayEvents.length} 条记录
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
                {displayEvents.map((item, idx) => {
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
                      key={idx}
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
                      <td className="p-3 leading-relaxed text-[var(--text)] font-mono text-[10px] break-all">
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
