import React, { useState } from 'react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem, cardInteractiveHover } from '../../utils/motionVariants';
import { Search, Plus, Upload, Filter, Calendar, Layers, CheckCircle2, Clock, FileEdit, X } from 'lucide-react';
import { DrawingItem, DrawingProject } from '../../types/drawing';

interface MyDrawingsViewProps {
  drawings: DrawingItem[];
  projects: DrawingProject[];
  onOpenDrawing: (drawingId: string) => void;
  onImportDrawing?: (file: File) => void;
  onNewDrawing?: (drawing: Partial<DrawingItem>) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const MyDrawingsView: React.FC<MyDrawingsViewProps> = ({
  drawings,
  projects,
  onOpenDrawing,
  onImportDrawing,
  onNewDrawing,
  onBack,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Draf' | 'Review' | 'Disetujui'>('Semua');
  const [sortBy, setSortBy] = useState<'terbaru' | 'terlama' | 'judul'>('terbaru');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // New Drawing Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('Sipil');
  const [newRevision, setNewRevision] = useState('Rev A');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || 'proj-1');

  const filteredDrawings = drawings.filter(drawing => {
    const matchesSearch = drawing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drawing.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drawing.revision.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (drawing.project_name && drawing.project_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'Semua' ? true : drawing.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'terbaru') {
      return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    }
    if (sortBy === 'terlama') {
      return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const getStatusBadgeStyle = (status: DrawingItem['status']) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60';
      case 'Review':
        return 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60';
      case 'Draf':
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (onNewDrawing) {
      onNewDrawing({
        title: newTitle.trim(),
        discipline: newDiscipline,
        revision: newRevision,
        project_id: newProjectId,
        status: 'Draf'
      });
    }
    setShowNewModal(false);
    setNewTitle('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onImportDrawing) {
        onImportDrawing(e.target.files[0]);
      }
      setShowImportModal(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-8"
    >
      {/* Top Header */}
      <motion.div
        variants={staggerItem}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 transition-colors cursor-pointer"
            >
              <span>← Kembali ke Co Engineer</span>
            </button>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Drawings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola dan tinjau seluruh dokumen gambar teknik Anda
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Impor Gambar</span>
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Gambar Baru</span>
          </button>
        </div>
      </motion.div>

      {/* Filter and Search Bar */}
      <motion.div
        variants={staggerItem}
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
      >
        {/* Search input with rounded outline matching mockup */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau nomor gambar"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
          />
        </div>

        {/* Status Pills and Sort Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700/60">
            {(['Semua', 'Draf', 'Review', 'Disetujui'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
            >
              <option value="terbaru">Urutkan: Terbaru</option>
              <option value="terlama">Urutkan: Terlama</option>
              <option value="judul">Urutkan: Judul (A-Z)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid Matching Screenshot */}
      {isLoading ? (
        <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 animate-pulse p-5" />
          ))}
        </motion.div>
      ) : filteredDrawings.length === 0 ? (
        <motion.div variants={staggerItem} className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-medium text-slate-900 dark:text-white">Tidak ada gambar ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba sesuaikan kata kunci pencarian atau buat dokumen gambar baru.
          </p>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredDrawings.map((drawing) => {
            const dateStr = drawing.created_at
              ? new Date(drawing.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Baru saja';

            return (
              <motion.div
                key={drawing.id}
                variants={staggerItem}
                whileHover={cardInteractiveHover.whileHover}
                whileTap={cardInteractiveHover.whileTap}
                onClick={() => onOpenDrawing(drawing.id)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 hover:shadow-lg hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 cursor-pointer min-h-[175px]"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {drawing.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {drawing.discipline} • {drawing.revision} • [{dateStr}]
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getStatusBadgeStyle(drawing.status)}`}>
                    {drawing.status}
                  </span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Buka Editor →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Create New Drawing Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tambah Gambar Baru</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateNew} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama / Judul Gambar
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Misal: Denah Lantai 2, Rangka Mesin B..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Disiplin
                  </label>
                  <select
                    value={newDiscipline}
                    onChange={(e) => setNewDiscipline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Sipil">Sipil</option>
                    <option value="Mekanikal">Mekanikal</option>
                    <option value="Listrik">Listrik</option>
                    <option value="Proses">Proses</option>
                    <option value="Arsitektur">Arsitektur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Revisi
                  </label>
                  <input
                    type="text"
                    value={newRevision}
                    onChange={(e) => setNewRevision(e.target.value)}
                    placeholder="Rev A"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pilih Proyek
                </label>
                <select
                  value={newProjectId}
                  onChange={(e) => setNewProjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Buat Gambar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Drawing Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Impor Berkas Gambar</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 hover:border-blue-500 cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
                <Upload className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Pilih file gambar teknik (DWG, DXF, PNG, SVG)
                </span>
                <span className="text-xs text-slate-400 mt-1">Ukuran maksimal 50MB</span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.pdf,.dxf,.dwg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

