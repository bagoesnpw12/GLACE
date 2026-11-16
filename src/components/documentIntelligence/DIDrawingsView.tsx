import React, { useState, useMemo } from 'react';
import { TechnicalDrawingItem, INITIAL_DRAWINGS_DUMMY } from '../../data/documentIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  Clock,
  TrendingUp, 
  Plus, 
  Filter, 
  Download, 
  Eye, 
  Upload, 
  Layers, 
  X,
  FileText,
  Search,
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
  const [drawingsList, setDrawingsList] = useState<TechnicalDrawingItem[]>(() => {
    return initialDrawings && initialDrawings.length > 0 ? initialDrawings : INITIAL_DRAWINGS_DUMMY;
  });

  const [previewDrawing, setPreviewDrawing] = useState<TechnicalDrawingItem | null>(null);
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Semua');

  // Top 4 KPI calculations
  const totalGambar = drawingsList.length;
  const disetujui = drawingsList.filter(d => d.status === 'Disetujui').length;
  const dalamReview = drawingsList.filter(d => d.status === 'Review').length;
  const perluRevisi = drawingsList.filter(d => d.status === 'Draf').length;

  const disciplines = ['Semua', 'Elektrikal', 'Sipil', 'Mekanikal & HVAC', 'Instrumentasi', 'Proses'];

  const filteredDrawings = useMemo(() => {
    return drawingsList.filter(d => {
      const matchSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.drawing_number.toLowerCase().includes(search.toLowerCase()) ||
        d.author.toLowerCase().includes(search.toLowerCase());
      const matchDisc = selectedDiscipline === 'Semua' ? true : d.discipline === selectedDiscipline;
      return matchSearch && matchDisc;
    });
  }, [drawingsList, search, selectedDiscipline]);

  const handleDownload = (drw: TechnicalDrawingItem) => {
    const blob = new Blob([`GLACE ENGINEERING PLATFORM - GAMBAR TEKNIK CAD/BIM\nNomor: ${drw.drawing_number}\nJudul: ${drw.title}\nDisiplin: ${drw.discipline}\nRevisi: ${drw.revision}\nPenanggung Jawab: ${drw.author}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${drw.drawing_number}.dwg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Disetujui') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Disetujui
        </span>
      );
    }
    if (status === 'Review') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Review
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        Draf
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Drawings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Galeri visual gambar teknik CAD/BIM, skema P&ID, single line diagram, dan layout sipil.
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Unggah Gambar Teknik</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Gambar</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalGambar}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Lembar CAD terdaftar</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Disetujui</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
              {disetujui}
            </div>
            <div className="text-[11px] text-emerald-600/80 mt-0.5 font-medium">Siap fabrikasi / konstruksi</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dalam Review</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tracking-tight">
              {dalamReview}
            </div>
            <div className="text-[11px] text-amber-600/80 mt-0.5 font-medium">Pemeriksaan lead engineer</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Perlu Revisi</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {perluRevisi}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Catatan komentar terbuka</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Discipline Filter Tabs */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul gambar, nomor CAD, atau drafter..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {disciplines.map((disc) => (
            <button
              key={disc}
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedDiscipline === disc
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrawings.map((drw) => (
          <div
            key={drw.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
          >
            {/* Thumbnail Canvas Area with Real Technical CAD/BIM Image & Blueprint Fallback */}
            <div className="h-44 bg-slate-900 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
              {/* Gambar Dummy Dokumen Teknik CAD Asli */}
              {drw.thumbnail_url ? (
                <img
                  src={drw.thumbnail_url}
                  alt={drw.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback jika file gagal dimuat: sembunyikan gambar agar blueprint vector terlihat
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}

              {/* Fallback Blueprint Illustration jika gambar tidak tersedia atau gagal dimuat */}
              <div 
                className="absolute inset-0 pointer-events-none -z-10 flex flex-col items-center justify-center p-4 bg-slate-950"
                style={{
                  backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              >
                <Layers className="w-8 h-8 text-sky-500/60 mb-2 animate-pulse" />
                <span className="text-sky-400 font-mono text-xs font-semibold">
                  {drw.drawing_number}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Blueprint CAD • {drw.discipline}
                </span>
              </div>

              {/* Top Discipline & Drawing Number Tag Overlay */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-950/80 text-sky-300 border border-sky-500/30 backdrop-blur-xs">
                  {drw.drawing_number}
                </span>
              </div>

              {/* Hover Action Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                <button
                  onClick={() => setPreviewDrawing(drw)}
                  className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 hover:bg-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pratinjau CAD</span>
                </button>
                <button
                  onClick={() => handleDownload(drw)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DWG</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                    {drw.discipline}
                  </span>
                  {getStatusBadge(drw.status)}
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {drw.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>{drw.author}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{drw.revision}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview CAD Modal */}
      {previewDrawing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {previewDrawing.drawing_number}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ({previewDrawing.revision})
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {previewDrawing.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDrawing(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated CAD Canvas / Real Drawing Viewer */}
            <div className="h-96 bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
              {previewDrawing.thumbnail_url ? (
                <img
                  src={previewDrawing.thumbnail_url}
                  alt={previewDrawing.title}
                  className="w-full h-full object-contain bg-slate-950 p-2"
                />
              ) : (
                <div className="text-center z-10 space-y-2 p-6">
                  <Layers className="w-12 h-12 text-sky-400 mx-auto animate-pulse" />
                  <div className="text-sm font-bold text-white tracking-wide">
                    AUTODESK CAD / BIM VIEWER
                  </div>
                  <p className="text-xs text-sky-300/80 max-w-md mx-auto">
                    Vector layers terverifikasi: Skematik busbar 150 kV, transformator step-down, proteksi CT/PT, grounding mesh, dan dimensi struktural panel.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>Scale 1:50</span>
                    <span>•</span>
                    <span>Grid 10mm</span>
                    <span>•</span>
                    <span>Status: Ready to Build</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                Disiplin: <strong className="text-slate-800 dark:text-slate-200">{previewDrawing.discipline}</strong> · Drafter: <strong className="text-slate-800 dark:text-slate-200">{previewDrawing.author}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(previewDrawing)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh CAD (.dwg)</span>
                </button>
                <button
                  onClick={() => setPreviewDrawing(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
