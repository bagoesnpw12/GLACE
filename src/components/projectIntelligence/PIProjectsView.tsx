import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye } from 'lucide-react';
import { EngineeringProject } from '../../data/projectIntelligenceData';

interface PIProjectsViewProps {
  projects: EngineeringProject[];
  onOpenCreateProject: () => void;
  onEditProject: (project: EngineeringProject) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectProject: (project: EngineeringProject) => void;
}

export const PIProjectsView: React.FC<PIProjectsViewProps> = ({
  projects,
  onOpenCreateProject,
  onEditProject,
  onDeleteProject,
  onSelectProject
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Berjalan' | 'Tertunda' | 'Selesai'>('Semua');

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === 'Semua') return matchSearch;
    if (statusFilter === 'Berjalan') return matchSearch && (p.status === 'Aktif' || p.status === 'Perencanaan');
    if (statusFilter === 'Tertunda') return matchSearch && p.status === 'Terlambat';
    if (statusFilter === 'Selesai') return matchSearch && p.status === 'Selesai';
    return matchSearch;
  });

  const getStatusBadge = (p: EngineeringProject) => {
    if (p.status === 'Selesai') {
      return (
        <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
          Selesai
        </span>
      );
    }
    if (p.status === 'Terlambat') {
      return (
        <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800">
          Tertunda
        </span>
      );
    }
    if (p.status === 'Perencanaan') {
      return (
        <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300">
          Perencanaan
        </span>
      );
    }
    return (
      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
        Berjalan
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header bar matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Semua proyek beserta kemajuan, tim, dan tenggatnya.
          </p>
        </div>
        <button
          onClick={onOpenCreateProject}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Proyek Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar Matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau kode proyek"
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filter Pills: Semua, Berjalan, Tertunda, Selesai */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {(['Semua', 'Berjalan', 'Tertunda', 'Selesai'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid Matching Screenshot 1 Layout (3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => {
          const dateLabel = p.status === 'Selesai'
            ? `Selesai [${p.deadline}]`
            : p.status === 'Perencanaan'
            ? `Mulai [${p.startDate}]`
            : `Tenggat [${p.deadline}]`;

          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-xs flex flex-col justify-between min-h-[190px] group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    [{p.name}]
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  [{p.code}] • [{p.location}]
                </p>

                {/* Progress Blue Bar Matching Screenshot 1 */}
                <div className="mt-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    Kemajuan {p.progress}% — {dateLabel}
                  </p>
                </div>
              </div>

              {/* Status Pill & Action Tools */}
              <div className="pt-4 flex items-center justify-between">
                <div>{getStatusBadge(p)}</div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProject(p);
                    }}
                    title="Edit Proyek"
                    className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Hapus proyek ${p.name}?`)) {
                        onDeleteProject(p.id);
                      }
                    }}
                    title="Hapus Proyek"
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
