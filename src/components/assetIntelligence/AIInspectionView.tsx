import React, { useState } from 'react';
import { AssetInspection, EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight,
  Plus, 
  GripVertical, 
  MoreVertical 
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill,
} from '../ui/table';

interface AIInspectionViewProps {
  inspections: AssetInspection[];
  assets: EngineeringAsset[];
  onCreateInspection: (inspection: AssetInspection) => void;
}

export const AIInspectionView: React.FC<AIInspectionViewProps> = ({
  inspections,
  assets,
  onCreateInspection
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Top KPI calculations matching Screenshot:
  // Total inspeksi, Selesai pekan ini, Sedang berjalan, Menunggu tindakan
  const totalInspeksi = inspections.length;
  const selesaiPekanIni = inspections.filter(i => i.status === 'Selesai').length;
  const sedangBerjalan = inspections.filter(i => i.status === 'Dalam Proses').length;
  const menungguTindakan = inspections.filter(i => i.status === 'Dijadwalkan').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 2 Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Inspection
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Jadwal inspeksi teknik, checklist audit berkala, dan dokumentasi foto inspektur lapangan.
          </p>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 2 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total inspeksi</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Selesai pekan ini</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Sedang berjalan</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Menunggu tindakan</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Jadwal Inspeksi Section Sesuai Referensi 2 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-[#23252c] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Jadwal Inspeksi</h2>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Jadwal Baru</span>
          </button>
        </div>

        {/* Standard GLACE Table Sesuai Referensi 2 Kanan */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead className="w-36">Tanggal</TableHead>
              <TableHead>Aset</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Inspektur</TableHead>
              <TableHead className="w-10 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { date: '20 november 2026', asset: 'Nama Asset', status: 'Selesai', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'Terlambat', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'Terjadwal', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'In Process', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'In Process', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'In Process', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'In Process', inspector: '(Nama inspektur)' },
              { date: '20 november 2026', asset: 'Nama Asset', status: 'In Process', inspector: '(Nama inspektur)' },
            ].map((row, idx) => {
              const isSelesai = row.status === 'Selesai';
              const isTerlambat = row.status === 'Terlambat';
              const isTerjadwal = row.status === 'Terjadwal';
              return (
                <TableRow key={idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                  <TableCell className="w-8 text-zinc-300 dark:text-zinc-600 cursor-grab">
                    <GripVertical className="w-3.5 h-3.5" />
                  </TableCell>
                  <TableCell className="font-mono text-zinc-600 dark:text-zinc-400 text-xs">
                    {row.date}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {inspections[idx]?.assetName || row.asset}
                  </TableCell>
                  <TableCell className="text-center">
                    <TablePill variant={isSelesai ? 'success' : isTerlambat ? 'warning' : isTerjadwal ? 'muted' : 'process'}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                      <span>{row.status}</span>
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    {inspections[idx]?.inspectorName || row.inspector}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded transition-colors cursor-pointer">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modal Jadwal Baru Sederhana */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-xl max-w-md w-full p-5 border border-zinc-200 dark:border-[#27272a] shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tambah Jadwal Inspeksi</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-500 mb-1">Aset</label>
                <select className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100">
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>{a.code} - {a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-zinc-500 mb-1">Tanggal</label>
                <input
                  type="text"
                  defaultValue="20 november 2026"
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-zinc-500 mb-1">Nama Inspektur</label>
                <input
                  type="text"
                  defaultValue="Budi Santoso, ST"
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] text-xs font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
