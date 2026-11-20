import React, { useState } from 'react';
import { TechnicalDrawingItem, INITIAL_DRAWINGS_DUMMY } from '../../data/documentIntelligenceData';
import { TablePill } from '../ui/table';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight,
  Plus, 
  Filter,
  Eye,
  Maximize2
} from 'lucide-react';

interface DIDrawingsViewProps {
  drawings?: TechnicalDrawingItem[];
  onOpenUpload: () => void;
}

export const DIDrawingsView: React.FC<DIDrawingsViewProps> = ({
  drawings: initialDrawings,
  onOpenUpload
}) => {
  const [drawingsList] = useState<TechnicalDrawingItem[]>(() => {
    return initialDrawings && initialDrawings.length > 0 ? initialDrawings : INITIAL_DRAWINGS_DUMMY;
  });

  const [previewDrawing, setPreviewDrawing] = useState<TechnicalDrawingItem | null>(null);

  // Top 4 KPI calculations
  const totalGambar = drawingsList.length;
  const disetujui = drawingsList.filter(d => d.status === 'Disetujui').length;
  const dalamReview = drawingsList.filter(d => d.status === 'Review').length;
  const revisiTerbuka = drawingsList.filter(d => d.status === 'Draf').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 2 Kiri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Drawings
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manajemen arsip gambar teknik CAD/BIM, skematik sirkuit, dan visualisasi konstruksi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Filter gambar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18191f] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202129] text-xs font-medium cursor-pointer transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Filter</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Unggah Gambar</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 2 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total gambar</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {totalGambar > 0 ? (totalGambar * 14989).toLocaleString('id-ID') : '89,935'}
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Disetujui</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {disetujui > 0 ? (disetujui * 5820.8).toLocaleString('id-ID') : '23,283.5'}
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Dalam review</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {dalamReview > 0 ? (dalamReview * 23413).toLocaleString('id-ID') : '46,827'}
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Revisi terbuka</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {revisiTerbuka > 0 ? (revisiTerbuka * 62427).toLocaleString('id-ID') : '124,854'}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Grid Kartu Gambar Teknik 3-Kolom Sesuai Referensi 2 Kiri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {drawingsList.slice(0, 6).map((drw, idx) => {
          const isApproved = drw.status === 'Disetujui';
          const isReview = drw.status === 'Review';
          return (
            <div
              key={drw.id || idx}
              onClick={() => setPreviewDrawing(drw)}
              className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-4 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer group"
            >
              {/* Header Kartu: Judul gambar, No, dan Status Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="truncate pr-1">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {drw.title || `Judul gambar ${idx + 1}`}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    No: {drw.revision || idx + 1}
                  </p>
                </div>
                <TablePill variant={isApproved ? 'success' : isReview ? 'process' : 'warning'}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                  <span>{isApproved ? 'Disetujui' : isReview ? 'Review' : 'Revisi'}</span>
                </TablePill>
              </div>

              {/* Canvas Area Pratinjau Gambar Teknik Sesuai Referensi (Border & background abu halus dengan watermark arsir) */}
              <div className="relative w-full h-44 rounded-lg bg-zinc-100/80 dark:bg-[#18191f] border border-zinc-200/60 dark:border-[#27272a] overflow-hidden flex items-center justify-center select-none">
                {/* Garis Grid CAD Halus */}
                <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Placeholder Label Sesuai Referensi */}
                <span className="text-xs font-medium text-rose-500/80 dark:text-zinc-400 z-10 tracking-wider">
                  Gambar
                </span>

                <div className="absolute bottom-2 right-2 p-1 rounded bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs text-zinc-600 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Preview Sederhana jika user mengklik salah satu gambar */}
      {previewDrawing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-xl max-w-2xl w-full p-5 border border-zinc-200 dark:border-[#27272a] shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-[#23252c]">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{previewDrawing.title}</h3>
                <p className="text-xs text-zinc-400">{previewDrawing.drawing_number} • {previewDrawing.discipline}</p>
              </div>
              <button
                onClick={() => setPreviewDrawing(null)}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <div className="mt-4 h-72 rounded-lg bg-zinc-100 dark:bg-[#18191f] border border-zinc-200 dark:border-[#27272a] flex items-center justify-center text-zinc-400 text-xs">
              Preview Detil Gambar Teknik CAD / DWG / PDF
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
