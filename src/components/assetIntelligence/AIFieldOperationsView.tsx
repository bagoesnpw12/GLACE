import React, { useState } from 'react';
import { FieldOperationTask, EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { TablePill } from '../ui/table';

interface AIFieldOperationsViewProps {
  tasks: FieldOperationTask[];
  assets: EngineeringAsset[];
  onCreateTask: (task: FieldOperationTask) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: FieldOperationTask['status']) => void;
}

export const AIFieldOperationsView: React.FC<AIFieldOperationsViewProps> = ({
  tasks,
  assets,
  onCreateTask,
  onUpdateTaskStatus
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Top KPI calculations matching Screenshot 4:
  // Total tugas, Total hari ini, Di lokasi, Selesai
  const totalTugas = tasks.length;
  const totalHariIni = tasks.length;
  const diLokasi = tasks.filter(t => t.status === 'Dikerjakan' || t.status === 'Menuju Lokasi').length;
  const selesai = tasks.filter(t => t.status === 'Selesai').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 4 */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Field Operations
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pemantauan visual sebaran aset dan personil lapangan, koordinasi GPS live, dan status penugasan aktif.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 4 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total tugas</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total hari ini</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Di lokasi</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Selesai</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Dua Panel Berdampingan: Peta Lapangan (Kiri) & Tugas Lapangan (Kanan) Sesuai Referensi 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peta Lapangan Panel */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Peta Lapangan</h2>
              <p className="text-[11px] text-zinc-400">Pemetaan visual sebaran aset dan personil.</p>
            </div>
            <TablePill variant="muted">
              <span>Live GPS</span>
            </TablePill>
          </div>

          {/* Area Kanvas Peta Sesuai Screenshot Referensi 4 */}
          <div className="w-full h-80 rounded-xl bg-zinc-100/80 dark:bg-[#18191f] border border-zinc-200/80 dark:border-[#27272a] relative overflow-hidden flex items-center justify-center select-none">
            {/* Grid Map Background */}
            <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Marker Pin 1: ALO3A-R1 */}
            <div className="absolute top-1/4 left-1/4 flex flex-col items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-[10px] font-mono shadow-xs border border-zinc-200 dark:border-zinc-700">
                ALO3A-R1
              </span>
              <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900 shadow-sm" />
            </div>

            {/* Marker Pin 2: ASSET-B-12 */}
            <div className="absolute top-1/3 right-1/4 flex flex-col items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-[10px] font-mono shadow-xs border border-zinc-200 dark:border-zinc-700">
                ASSET-B-12
              </span>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white dark:border-zinc-900 shadow-sm" />
            </div>

            {/* Marker Pin 3: Jawi C-24 */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-[10px] font-mono shadow-xs border border-zinc-200 dark:border-zinc-700">
                [Peta Lokasi Aset & Personil]
              </span>
              <span className="text-[10px] text-zinc-400">Jawi C-24</span>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
            </div>

            {/* Zoom Controls Sesuai Screenshot */}
            <div className="absolute bottom-4 right-4 flex flex-col rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xs overflow-hidden">
              <button
                onClick={() => setZoomLevel(z => Math.min(2, z + 0.2))}
                className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-700"
              >
                <ZoomIn className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              </button>
              <button
                onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.2))}
                className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700"
              >
                <ZoomOut className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Tugas Lapangan Panel dengan Tabel Sesuai Referensi 4 */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#23252c]">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tugas Lapangan</h2>
                <p className="text-[11px] text-zinc-400">Daftar penugasan operasional aktif.</p>
              </div>
              <button className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium cursor-pointer">
                Lihat Semua
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-[#23252c] text-zinc-500 dark:text-zinc-400 font-medium">
                    <th className="py-2.5 px-3 w-12">No</th>
                    <th className="py-2.5 px-3">Nama Petugas</th>
                    <th className="py-2.5 px-3">Lokasi</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-[#23252c]">
                  {[
                    { no: '01', officer: '[Nama Petugas]', loc: '[Lokasi]', status: 'Aktif' },
                    { no: '02', officer: '[Nama Petugas]', loc: '[Lokasi]', status: 'Siaga' },
                    { no: '03', officer: '[Nama Petugas]', loc: '[Lokasi]', status: 'Menunggu' },
                    { no: '04', officer: '[Nama Petugas]', loc: '[Lokasi]', status: 'Aktif' },
                    { no: '05', officer: '[Nama Petugas]', loc: '[Lokasi]', status: 'Siaga' },
                  ].map((row, idx) => {
                    const isAktif = row.status === 'Aktif';
                    const isSiaga = row.status === 'Siaga';
                    return (
                      <tr key={idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                        <td className="py-3 px-3 font-mono text-zinc-400 text-[11px]">
                          {row.no}
                        </td>
                        <td className="py-3 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                          {tasks[idx]?.officerName || row.officer}
                        </td>
                        <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400 text-xs">
                          {tasks[idx]?.location || row.loc}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <TablePill variant={isAktif ? 'success' : isSiaga ? 'process' : 'muted'}>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                            <span>{row.status}</span>
                          </TablePill>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
