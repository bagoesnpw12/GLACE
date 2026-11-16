import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, GitCompare, Eye } from 'lucide-react';
import { DrawingItem } from '../../types/drawing';

interface DrawingComparisonViewProps {
  drawings: DrawingItem[];
  onBack?: () => void;
  onOpenDrawing?: (drawingId: string) => void;
}

export const DrawingComparisonView: React.FC<DrawingComparisonViewProps> = ({
  drawings,
  onBack,
  onOpenDrawing
}) => {
  const [revAId, setRevAId] = useState<string>(drawings[0]?.id || 'draw_1');
  const [revBId, setRevBId] = useState<string>(drawings[1]?.id || 'draw_2');

  const revA = drawings.find(d => d.id === revAId) || drawings[0];
  const revB = drawings.find(d => d.id === revBId) || drawings[1] || drawings[0];

  const changesList = [
    { id: '1', title: '[Revisi 1] Lubang baut kolom C-4 digeser 20mm ke arah timur', status: 'DITAMBAH', badgeClass: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    { id: '2', title: '[Revisi 2] Dimensi ketebalan pelat sambungan diubah dari 10mm ke 12mm', status: 'DIUBAH', badgeClass: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    { id: '3', title: '[Revisi 3] Garis batas drainase lama di area basement ditiadakan', status: 'DIHAPUS', badgeClass: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
    { id: '4', title: '[Revisi 4] Ketinggian balok girder elevated diperbarui menyesuaikan elevasi tanah', status: 'DIUBAH', badgeClass: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 transition-colors cursor-pointer"
          >
            <span>← Kembali ke Co Engineer</span>
          </button>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Drawing Comparison
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Bandingkan:</span>
              <select
                value={revAId}
                onChange={(e) => setRevAId(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 font-semibold"
              >
                {drawings.map(d => (
                  <option key={d.id} value={d.id}>{d.title} ({d.revision})</option>
                ))}
              </select>
              <span className="text-slate-400 font-bold">vs</span>
              <select
                value={revBId}
                onChange={(e) => setRevBId(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 font-semibold"
              >
                {drawings.map(d => (
                  <option key={d.id} value={d.id}>{d.title} ({d.revision})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparison Canvas & Changes List Matching Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rev A Canvas */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Rev A
              </span>
              <span className="text-[11px] text-slate-400">{revA?.title}</span>
            </div>
            {/* Drawing SVG Box */}
            <div className="mt-8 relative aspect-[4/3] bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 240 180">
                <rect x="30" y="30" width="180" height="120" fill="none" stroke="#2563eb" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-4">Versi Baseline</p>
        </div>

        {/* Rev B Canvas (With Orange Diff Highlight Box) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Rev B
              </span>
              <span className="text-[11px] text-slate-400">{revB?.title}</span>
            </div>
            {/* Drawing SVG Box with Modified Shape */}
            <div className="mt-8 relative aspect-[4/3] bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 240 180">
                {/* Original shape */}
                <rect x="30" y="30" width="180" height="120" fill="none" stroke="#2563eb" strokeWidth="2" />
                {/* Added/Modified Diff shape (Orange highlight matching screenshot) */}
                <rect x="130" y="60" width="60" height="60" fill="#fef3c7" stroke="#ea580c" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold text-center mt-4">
            ● 1 elemen tambahan terdeteksi
          </p>
        </div>

        {/* Right Side: Daftar Perubahan Matching Screenshot 2 */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs min-h-[460px] flex flex-col">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Daftar perubahan
          </h2>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {changesList.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate flex-1">
                  {item.title}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wider shrink-0 ${item.badgeClass}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Total 4 Perbedaan</span>
            <button
              onClick={() => onOpenDrawing && onOpenDrawing(revBId)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Buka di Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

