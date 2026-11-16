import React, { useState } from 'react';
import { Search, Plus, FolderKanban, Calendar, Users, ArrowLeft, Layers, X, FileText } from 'lucide-react';
import { DrawingProject, DrawingItem } from '../../types/drawing';

interface DrawingProjectsViewProps {
  projects: DrawingProject[];
  drawings: DrawingItem[];
  onOpenDrawing: (drawingId: string) => void;
  onCreateProject?: (project: Partial<DrawingProject>) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const DrawingProjectsView: React.FC<DrawingProjectsViewProps> = ({
  projects,
  drawings,
  onOpenDrawing,
  onCreateProject,
  onBack,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Berjalan' | 'Selesai' | 'Perencanaan'>('Semua');
  const [selectedProject, setSelectedProject] = useState<DrawingProject | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Berjalan' | 'Selesai' | 'Perencanaan'>('Berjalan');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' ? true : project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (projectStatus: DrawingProject['status']) => {
    switch (projectStatus) {
      case 'Berjalan':
        return 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60';
      case 'Selesai':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60';
      case 'Perencanaan':
      default:
        return 'bg-amber-50/70 text-amber-700 border border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50';
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (onCreateProject) {
      onCreateProject({
        name: name.trim(),
        team: team.trim() || 'Tim Engineering',
        description: description.trim(),
        status
      });
    }
    setShowCreateModal(false);
    setName('');
    setTeam('');
    setDescription('');
  };

  // If a project is selected, show Project Detail View with its associated drawings
  if (selectedProject) {
    const projectDrawings = drawings.filter((d) => d.project_id === selectedProject.id);

    return (
      <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6">
        <button
          onClick={() => setSelectedProject(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.name}</h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeStyle(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedProject.description || 'Tidak ada deskripsi'}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Tim: {selectedProject.team}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Total: {projectDrawings.length} gambar
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Daftar Gambar Dalam Proyek Ini ({projectDrawings.length})
          </h2>

          {projectDrawings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Belum ada gambar di proyek ini</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {projectDrawings.map((drawing) => (
                <div
                  key={drawing.id}
                  onClick={() => onOpenDrawing(drawing.id)}
                  className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 hover:shadow-lg hover:border-blue-500/40 transition-all duration-200 cursor-pointer min-h-[160px]"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {drawing.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {drawing.discipline} • {drawing.revision}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {drawing.status}
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Buka →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
      {/* Top Header Matching Screenshot 1 MainContent */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            Drawing Projects
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelompokkan gambar per proyek, tim, dan tenggat.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Proyek Baru</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek atau tim"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
          />
        </div>

        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700/60">
          {(['Semua', 'Berjalan', 'Selesai', 'Perencanaan'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Cards Grid Matching Screenshot 1 MainContent */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 animate-pulse p-6" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <FolderKanban className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-medium text-slate-900 dark:text-white">Tidak ada proyek ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">Buat proyek baru untuk mengelompokkan dokumen gambar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectDrawings = drawings.filter((d) => d.project_id === project.id);
            const count = project.drawing_count !== undefined ? project.drawing_count : projectDrawings.length;
            const dateStr = project.created_at
              ? new Date(project.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Baru saja';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 hover:shadow-lg hover:border-blue-500/40 transition-all duration-200 cursor-pointer min-h-[200px]"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    [{project.name}]
                  </h3>
                  <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <p>tim project : {project.team || '-'}</p>
                    <p>tanggal : {dateStr}</p>
                    <p>gambar : {count} gambar</p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${getStatusBadgeStyle(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Buat Proyek Gambar Baru</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Proyek
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Nama Proyek 1, Proyek Kilang Minyak..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tim Project
                </label>
                <input
                  type="text"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="Misal: Tim Mekanikal, Tim Sipil..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat mengenai proyek..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Berjalan">Berjalan</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Perencanaan">Perencanaan</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

