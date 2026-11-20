import React from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  Layers,
  Users,
  Package,
  RotateCcw
} from 'lucide-react';

interface EnterpriseOverviewProps {
  onAddActivity: (activity: string, module: string) => void;
  onSelectSubItem?: (item: string) => void;
}

interface ProjectItem {
  id: string;
  name: string;
  client: string;
  sector: string;
  contractValue: string;
  status: 'Berjalan' | 'Selesai' | 'Perencanaan' | 'Tertunda';
  startDate: string;
}

export const EnterpriseSolutionsOverviewView: React.FC<EnterpriseOverviewProps> = ({
  onAddActivity,
  onSelectSubItem
}) => {
  const projects: ProjectItem[] = [
    {
      id: '1',
      name: 'PLTS Industri 50 MW',
      client: 'PT Surya Energi',
      sector: 'Energi',
      contractValue: 'Rp 45.000.000.000',
      status: 'Berjalan',
      startDate: '12 Sep 2026'
    },
    {
      id: '2',
      name: 'Jaringan Distribusi 150 kV',
      client: 'PLN Nusantara',
      sector: 'Utilities',
      contractValue: 'Rp 32.500.000.000',
      status: 'Berjalan',
      startDate: '3 Sep 2026'
    },
    {
      id: '3',
      name: 'Pabrik Manufaktur Otomotif',
      client: 'PT Maju Jaya',
      sector: 'Manufaktur',
      contractValue: 'Rp 28.750.000.000',
      status: 'Perencanaan',
      startDate: '1 Okt 2026'
    },
    {
      id: '4',
      name: 'Smart Grid Monitoring',
      client: 'PT Listrik Digital',
      sector: 'Energi',
      contractValue: 'Rp 18.250.000.000',
      status: 'Selesai',
      startDate: '15 Jul 2026'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Enterprise Solutions
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
          Solusi digital untuk perusahaan industri, energi, dan infrastruktur.
        </p>
      </div>

      {/* 2. Top 4 Metric KPI Cards (Persis Referensi 1 Kiri) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total users */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total users</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">89,935</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Total products */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total products</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">23,283.5</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Total users */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total users</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">46,827</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Refunded */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Refunded</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">124,854</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Middle 2 Visual Cards: Status Proyek (Donut) & Nilai Proyek per Sektor (Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Status Proyek */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
            Status Proyek
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
            {/* Donut Graphic */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="11" fill="transparent" className="text-slate-100 dark:text-zinc-800" />
                {/* Berjalan (blue) */}
                <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="11" fill="transparent" strokeDasharray="238.76" strokeDashoffset="105" strokeLinecap="round" />
                {/* Selesai (emerald) */}
                <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="11" fill="transparent" strokeDasharray="238.76" strokeDashoffset="180" strokeLinecap="round" />
                {/* Perencanaan (amber) */}
                <circle cx="50" cy="50" r="38" stroke="#f59e0b" strokeWidth="11" fill="transparent" strokeDasharray="238.76" strokeDashoffset="216" strokeLinecap="round" />
                {/* Tertunda (rose) */}
                <circle cx="50" cy="50" r="38" stroke="#f43f5e" strokeWidth="11" fill="transparent" strokeDasharray="238.76" strokeDashoffset="228" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-900 dark:text-zinc-100">342</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Proyek</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 dark:text-zinc-400 w-24">Berjalan</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-200">188 (55%)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 dark:text-zinc-400 w-24">Selesai</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-200">86 (25%)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 dark:text-zinc-400 w-24">Perencanaan</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-200">32 (9%)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-600 dark:text-zinc-400 w-24">Tertunda</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-200">36 (11%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Nilai Proyek per Sektor */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
            Nilai Proyek per Sektor
          </h3>

          {/* Bar Chart Container */}
          <div className="h-44 flex items-end justify-around gap-4 pt-6 px-4">
            {/* Bar 1: Energi */}
            <div className="flex flex-col items-center gap-1.5 w-14">
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">12 M</span>
              <div className="w-7 bg-blue-500 rounded-t-sm h-28" />
              <span className="text-[10px] text-slate-500 dark:text-zinc-400">Energi</span>
            </div>

            {/* Bar 2: Manufaktur */}
            <div className="flex flex-col items-center gap-1.5 w-14">
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">8 M</span>
              <div className="w-7 bg-blue-400 rounded-t-sm h-20" />
              <span className="text-[10px] text-slate-500 dark:text-zinc-400">Manufaktur</span>
            </div>

            {/* Bar 3: Infrastruktur */}
            <div className="flex flex-col items-center gap-1.5 w-14">
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">10 M</span>
              <div className="w-7 bg-blue-500 rounded-t-sm h-24" />
              <span className="text-[10px] text-slate-500 dark:text-zinc-400">Infrastruktur</span>
            </div>

            {/* Bar 4: Utilities */}
            <div className="flex flex-col items-center gap-1.5 w-14">
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">18 M</span>
              <div className="w-7 bg-blue-600 rounded-t-sm h-36" />
              <span className="text-[10px] text-slate-500 dark:text-zinc-400">Utilities</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Table: Proyek Terbaru */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Proyek Terbaru
          </h2>
          <button 
            onClick={() => onSelectSubItem && onSelectSubItem('Organization')}
            className="text-xs text-blue-600 dark:text-zinc-300 hover:underline font-medium"
          >
            Lihat Semua +
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                  <th className="py-3 px-4 w-12">No</th>
                  <th className="py-3 px-5">Nama Proyek</th>
                  <th className="py-3 px-4">Klien</th>
                  <th className="py-3 px-4">Sektor</th>
                  <th className="py-3 px-4">Nilai Kontrak</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tanggal Mulai</th>
                  <th className="py-3 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                {projects.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 dark:text-zinc-500">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900 dark:text-zinc-100">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">
                      {p.client}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">
                      {p.sector}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-zinc-300">
                      {p.contractValue}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          p.status === 'Berjalan' ? 'bg-blue-500' :
                          p.status === 'Selesai' ? 'bg-emerald-500' :
                          p.status === 'Perencanaan' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400">
                      {p.startDate}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => alert(`Membuka rincian proyek: ${p.name}`)}
                        className="px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
