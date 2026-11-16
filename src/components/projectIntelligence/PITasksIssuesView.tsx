import React, { useState } from 'react';
import { Plus, X, ArrowRight, Trash2 } from 'lucide-react';
import { ProjectTaskItem, EngineeringProject } from '../../data/projectIntelligenceData';

interface PITasksIssuesViewProps {
  tasks: ProjectTaskItem[];
  projects: EngineeringProject[];
  onAddTask: (task: ProjectTaskItem) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: ProjectTaskItem['status']) => void;
  onDeleteTask: (taskId: string) => void;
}

export const PITasksIssuesView: React.FC<PITasksIssuesViewProps> = ({
  tasks,
  projects,
  onAddTask,
  onUpdateTaskStatus,
  onDeleteTask
}) => {
  const [filterType, setFilterType] = useState<'Semua' | 'Tugas' | 'Kendala'>('Semua');
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Tugas' | 'Kendala'>('Tugas');
  const [assignee, setAssignee] = useState('Ir. Hendra Gunawan');
  const [deadline, setDeadline] = useState('30 Mei 2026');
  const [priority, setPriority] = useState<'Tinggi' | 'Sedang' | 'Rendah'>('Sedang');
  const [status, setStatus] = useState<ProjectTaskItem['status']>('Belum dimulai');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-01');

  const filtered = tasks.filter((t) => {
    if (filterType === 'Semua') return true;
    return t.type === filterType;
  });

  const columns: { title: string; status: ProjectTaskItem['status'] }[] = [
    { title: 'Belum dimulai', status: 'Belum dimulai' },
    { title: 'Dikerjakan', status: 'Dikerjakan' },
    { title: 'Selesai', status: 'Selesai' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: ProjectTaskItem = {
      id: `task-${Date.now().toString(36)}`,
      projectId,
      type,
      title: title.trim(),
      assignee,
      deadline,
      priority,
      status
    };
    onAddTask(newTask);
    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar matching Screenshot 2 (Kiri) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Task & Issues
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tugas dan kendala proyek dalam satu papan.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah</span>
        </button>
      </div>

      {/* Filter Pills matching Screenshot 2 */}
      <div className="flex items-center justify-end gap-2 text-xs font-semibold">
        {(['Semua', 'Tugas', 'Kendala'] as const).map((ft) => (
          <button
            key={ft}
            onClick={() => setFilterType(ft)}
            className={`px-4 py-1.5 rounded-full transition-all ${
              filterType === ft
                ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {ft}
          </button>
        ))}
      </div>

      {/* Kanban 3 Kolom Matching Screenshot 2 (Kiri) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col.status);

          return (
            <div
              key={col.status}
              className="bg-slate-50/70 dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 min-h-[500px] flex flex-col justify-between"
            >
              <div>
                {/* Column Header matching Screenshot */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {col.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold font-mono">
                    [{colTasks.length}]
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3">
                  {colTasks.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between group"
                    >
                      <div>
                        {/* Type Badge: Tugas (Biru) / Kendala (Pink/Merah) */}
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              item.type === 'Kendala'
                                ? 'bg-rose-50 text-rose-500 border border-rose-200 dark:bg-rose-950/40'
                                : 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40'
                            }`}
                          >
                            {item.type}
                          </span>
                          <button
                            onClick={() => onDeleteTask(item.id)}
                            className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                          [{item.title}]
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-2 font-medium">
                          [{item.assignee}] • [{item.deadline}]
                        </p>
                      </div>

                      {/* Move status buttons */}
                      <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Pindah:</span>
                        <div className="flex items-center gap-1">
                          {col.status !== 'Belum dimulai' && (
                            <button
                              onClick={() => onUpdateTaskStatus(item.id, 'Belum dimulai')}
                              className="hover:text-blue-600 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                            >
                              ← Belum
                            </button>
                          )}
                          {col.status !== 'Dikerjakan' && (
                            <button
                              onClick={() => onUpdateTaskStatus(item.id, 'Dikerjakan')}
                              className="hover:text-blue-600 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                            >
                              Dikerjakan
                            </button>
                          )}
                          {col.status !== 'Selesai' && (
                            <button
                              onClick={() => onUpdateTaskStatus(item.id, 'Selesai')}
                              className="hover:text-emerald-600 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                            >
                              Selesai →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah Task / Issue */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Tambah Task / Issue</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tipe</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" checked={type === 'Tugas'} onChange={() => setType('Tugas')} />
                    <span>Tugas</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" checked={type === 'Kendala'} onChange={() => setType('Kendala')} />
                    <span className="text-rose-500 font-semibold">Kendala</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Judul</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Deskripsi tugas atau kendala..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Proyek Terkait</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Penanggung Jawab</label>
                  <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Deadline / Tanggal</label>
                  <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
