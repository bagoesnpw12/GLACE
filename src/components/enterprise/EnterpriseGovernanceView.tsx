import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Download,
  Lock, 
  CheckCircle2, 
  Clock, 
  Sliders,
  FileCheck
} from 'lucide-react';

interface EnterpriseGovernanceProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  event: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Sukses' | 'Blocked';
}

export const EnterpriseGovernanceView: React.FC<EnterpriseGovernanceProps> = ({ onAddActivity }) => {
  const [filterLevel, setFilterLevel] = useState('Semua Level');

  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: '1',
      timestamp: '10:42:15 WIB Hari ini',
      user: 'bagoes@enterprise.com',
      event: 'Automated Key Rotation',
      riskLevel: 'Low',
      status: 'Sukses'
    },
    {
      id: '2',
      timestamp: '10:42:15 WIB Hari ini',
      user: 'bagoes@enterprise.com',
      event: 'Automated Key Rotation',
      riskLevel: 'Medium',
      status: 'Sukses'
    },
    {
      id: '3',
      timestamp: 'Kemarin 18:20',
      user: 'bagoes@enterprise.com',
      event: 'Automated Key Rotation',
      riskLevel: 'High',
      status: 'Sukses'
    },
    {
      id: '4',
      timestamp: 'Kemarin 18:20',
      user: 'bagoes@enterprise.com',
      event: 'Automated Key Rotation',
      riskLevel: 'Low',
      status: 'Blocked'
    }
  ]);

  const filteredLogs = auditLogs.filter(log => {
    if (filterLevel === 'Semua Level') return true;
    return log.riskLevel.toLowerCase() === filterLevel.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title, Enclave Sync indicator, Download Audit Report button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Governance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Enclave Sync: <strong className="text-slate-700 dark:text-zinc-200 font-semibold">Real-Time</strong></span>
          </div>

          <button
            onClick={() => {
              alert('Mengekspor Laporan Audit Lengkap Tahunan (.PDF & .JSON)');
              onAddActivity('Unduh laporan audit lengkap', 'Enterprise Solutions');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            Unduh Laporan Audit Lengkap
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Strip (Persis Referensi 3 Kanan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Security Compliance Score */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Security Compliance Score</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">98.4%</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Kebijakan Aktif */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Kebijakan Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">34 Policy Rules</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Pelanggaran Akses */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Pelanggaran Akses</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">0 Insiden</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Audit Status */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Audit Status</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">Verified</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. 2-Column Split: Alokasi Resources & Distribusi Policy (Kiri) + Log & Jejak Audit (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Alokasi Resources & Distribusi Policy (5 Kolom) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-5">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                Alokasi Resources & Distribusi Policy
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
                Evaluasi ambang batas implementasi modul
              </p>
            </div>

            {/* 5 Progress Bars: Service RBAC Policy 75% */}
            <div className="space-y-4 pt-1">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">
                      Service RBAC Policy
                    </span>
                    <span className="text-slate-400 dark:text-zinc-500 font-mono">
                      75%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 dark:bg-zinc-300 rounded-full" 
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Inner Card: Data Sovereignty Engine v2.2 */}
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80">
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#181a20] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                      Data Sovereignty Engine v2.2
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">
                      Lihat Detail Mandat Lengkap
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Membuka konfigurasi Data Sovereignty Engine v2.2')}
                  className="px-2.5 py-1 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
                >
                  Konfigurasi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Log & Jejak Audit (Audit Trail) (7 Kolom) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                  Log & Jejak Audit (Audit Trail)
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
                  Aktivitas autentikasi, konfigurasi, dan penegakan tata kelola
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">Filter:</span>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="text-xs bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 rounded-md px-2 py-1 text-slate-700 dark:text-zinc-300 focus:outline-none"
                >
                  <option>Semua Level</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* Audit Trail Table */}
            <div className="overflow-x-auto border-t border-slate-100 dark:border-zinc-800/80 pt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Pengguna</th>
                    <th className="py-2.5 px-3">Event / Aktivitas</th>
                    <th className="py-2.5 px-3">Level Risiko</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="py-3 px-3 text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-zinc-300 font-sans">
                        {log.user}
                      </td>
                      <td className="py-3 px-3 text-slate-800 dark:text-zinc-200 font-sans font-medium">
                        {log.event}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          log.riskLevel === 'High' 
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400' 
                            : log.riskLevel === 'Medium'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}>
                          {log.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                          log.status === 'Sukses'
                            ? 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
