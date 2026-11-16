import React, { useState, useEffect } from 'react';
import { 
  EngineeringProject, 
  ProjectTaskItem,
  ProjectRFIItem,
  ProjectSubmittalItem,
  ProjectAIInsightItem,
  ProjectReportItem,
  INITIAL_PROJECTS_DUMMY,
  INITIAL_TASKS_DUMMY,
  INITIAL_RFI_DUMMY,
  INITIAL_SUBMITTALS_DUMMY,
  INITIAL_AI_INSIGHTS_DUMMY,
  INITIAL_REPORTS_DUMMY,
  formatIDR 
} from '../data/projectIntelligenceData';
import { PIDashboardView } from './projectIntelligence/PIDashboardView';
import { PIProjectsView } from './projectIntelligence/PIProjectsView';
import { PIProjectControlView } from './projectIntelligence/PIProjectControlView';
import { PITasksIssuesView } from './projectIntelligence/PITasksIssuesView';
import { PIRfiSubmittalsView } from './projectIntelligence/PIRfiSubmittalsView';
import { PIAIInsightsView } from './projectIntelligence/PIAIInsightsView';
import { PIReportsView } from './projectIntelligence/PIReportsView';
import { X } from 'lucide-react';

interface ProjectIntelligenceProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const ProjectIntelligenceModule: React.FC<ProjectIntelligenceProps> = ({
  onAddActivity,
  selectedSubItem = '',
  onSelectSubItem
}) => {
  // Shared state: Proyek
  const [projects, setProjects] = useState<EngineeringProject[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_projects_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS_DUMMY;
  });

  // Shared state: Tasks & Issues
  const [tasks, setTasks] = useState<ProjectTaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_tasks_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS_DUMMY;
  });

  // Shared state: RFI
  const [rfis, setRfis] = useState<ProjectRFIItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_rfis_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RFI_DUMMY;
  });

  // Shared state: Submittals
  const [submittals, setSubmittals] = useState<ProjectSubmittalItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_submittals_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SUBMITTALS_DUMMY;
  });

  // Shared state: AI Insights
  const [insights, setInsights] = useState<ProjectAIInsightItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_insights_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_AI_INSIGHTS_DUMMY;
  });

  // Shared state: Reports
  const [reports, setReports] = useState<ProjectReportItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_pi_reports_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REPORTS_DUMMY;
  });

  // Persist demo state
  useEffect(() => {
    try {
      localStorage.setItem('glace_pi_projects_demo', JSON.stringify(projects));
      localStorage.setItem('glace_pi_tasks_demo', JSON.stringify(tasks));
      localStorage.setItem('glace_pi_rfis_demo', JSON.stringify(rfis));
      localStorage.setItem('glace_pi_submittals_demo', JSON.stringify(submittals));
      localStorage.setItem('glace_pi_insights_demo', JSON.stringify(insights));
      localStorage.setItem('glace_pi_reports_demo', JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [projects, tasks, rfis, submittals, insights, reports]);

  // Modal State untuk Tambah / Edit Proyek
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<EngineeringProject | null>(null);

  // Form states
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formManager, setFormManager] = useState('');
  const [formLocation, setFormLocation] = useState('Semarang, Jawa Tengah');
  const [formProgress, setFormProgress] = useState(25);
  const [formBudget, setFormBudget] = useState(15000000000);
  const [formActualCost, setFormActualCost] = useState(3500000000);
  const [formStatus, setFormStatus] = useState<EngineeringProject['status']>('Aktif');
  const [formStartDate, setFormStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [formDeadline, setFormDeadline] = useState(new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10));
  const [formCategory, setFormCategory] = useState<EngineeringProject['category']>('Elektrikal');
  const [formDescription, setFormDescription] = useState('');

  // Modal Detail Proyek
  const [viewingProject, setViewingProject] = useState<EngineeringProject | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    const nextIdx = projects.length + 1;
    setFormCode(`PRJ-ENG-${nextIdx < 10 ? '0' + nextIdx : nextIdx}`);
    setFormName('');
    setFormClient('PT Perusahaan Rekayasa Indonesia');
    setFormManager('Ir. Hendra Gunawan, IPM');
    setFormLocation('Surabaya, Jawa Timur');
    setFormProgress(25);
    setFormBudget(15000000000);
    setFormActualCost(3500000000);
    setFormStatus('Aktif');
    setFormStartDate(new Date().toISOString().slice(0, 10));
    setFormDeadline(new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10));
    setFormCategory('Elektrikal');
    setFormDescription('');
    setShowModal(true);
  };

  const handleOpenEdit = (p: EngineeringProject) => {
    setEditingProject(p);
    setFormCode(p.code);
    setFormName(p.name);
    setFormClient(p.client);
    setFormManager(p.manager);
    setFormLocation(p.location || 'Semarang, Jawa Tengah');
    setFormProgress(p.progress);
    setFormBudget(p.budget);
    setFormActualCost(p.actualCost);
    setFormStatus(p.status);
    setFormStartDate(p.startDate);
    setFormDeadline(p.deadline);
    setFormCategory(p.category);
    setFormDescription(p.description || '');
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    const target = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    if (target) {
      onAddActivity(`Menghapus proyek: ${target.name}`, 'Project Intelligence');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) return;

    if (editingProject) {
      const updated: EngineeringProject = {
        ...editingProject,
        code: formCode,
        name: formName,
        client: formClient,
        manager: formManager,
        location: formLocation,
        progress: Number(formProgress),
        budget: Number(formBudget),
        actualCost: Number(formActualCost),
        status: formStatus,
        startDate: formStartDate,
        deadline: formDeadline,
        category: formCategory,
        description: formDescription
      };
      setProjects(prev => prev.map(p => p.id === editingProject.id ? updated : p));
      onAddActivity(`Memperbarui data proyek: ${updated.name}`, 'Project Intelligence');
    } else {
      const created: EngineeringProject = {
        id: `proj-${Date.now().toString(36)}`,
        code: formCode,
        name: formName,
        client: formClient,
        manager: formManager,
        location: formLocation,
        progress: Number(formProgress),
        budget: Number(formBudget),
        actualCost: Number(formActualCost),
        status: formStatus,
        startDate: formStartDate,
        deadline: formDeadline,
        category: formCategory,
        description: formDescription,
        scheduleLagDays: 0,
        openRisksCount: 1
      };
      setProjects(prev => [created, ...prev]);
      onAddActivity(`Menambahkan proyek baru: ${created.name}`, 'Project Intelligence');
    }

    setShowModal(false);
  };

  // Handlers for Tasks & Issues
  const handleAddTask = (newTask: ProjectTaskItem) => {
    setTasks(prev => [newTask, ...prev]);
    onAddActivity(`Menambahkan ${newTask.type}: ${newTask.title}`, 'Project Intelligence');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: ProjectTaskItem['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Handlers for RFI & Submittals
  const handleCreateRfi = (newRfi: ProjectRFIItem) => {
    setRfis(prev => [newRfi, ...prev]);
    onAddActivity(`Membuat RFI: ${newRfi.number} - ${newRfi.subject}`, 'Project Intelligence');
  };

  const handleCreateSubmittal = (newSub: ProjectSubmittalItem) => {
    setSubmittals(prev => [newSub, ...prev]);
    onAddActivity(`Membuat Submittal: ${newSub.documentNumber} - ${newSub.documentName}`, 'Project Intelligence');
  };

  /* =========================================================================
     ROUTING SUBMENU PROJECT INTELLIGENCE:
     1. Dashboard (Default)
     2. Projects
     3. Project Control
     4. Tasks & Issues
     5. RFI & Submittals
     6. AI Insights
     7. Reports
     ========================================================================= */

  let content = null;

  if (selectedSubItem === 'Projects') {
    content = (
      <PIProjectsView
        projects={projects}
        onOpenCreateProject={handleOpenCreate}
        onEditProject={handleOpenEdit}
        onDeleteProject={handleDelete}
        onSelectProject={(p) => setViewingProject(p)}
      />
    );
  } else if (selectedSubItem === 'Project Control') {
    content = (
      <PIProjectControlView
        projects={projects}
      />
    );
  } else if (selectedSubItem === 'Tasks & Issues') {
    content = (
      <PITasksIssuesView
        tasks={tasks}
        projects={projects}
        onAddTask={handleAddTask}
        onUpdateTaskStatus={handleUpdateTaskStatus}
        onDeleteTask={handleDeleteTask}
      />
    );
  } else if (selectedSubItem === 'RFI & Submittals') {
    content = (
      <PIRfiSubmittalsView
        rfis={rfis}
        submittals={submittals}
        projects={projects}
        onCreateRfi={handleCreateRfi}
        onCreateSubmittal={handleCreateSubmittal}
      />
    );
  } else if (selectedSubItem === 'AI Insights') {
    content = (
      <PIAIInsightsView
        insights={insights}
      />
    );
  } else if (selectedSubItem === 'Reports') {
    content = (
      <PIReportsView
        reports={reports}
        projects={projects}
      />
    );
  } else {
    // 1. Dashboard Utama (Default)
    content = (
      <PIDashboardView
        projects={projects}
        onOpenCreateProject={handleOpenCreate}
        onEditProject={handleOpenEdit}
        onDeleteProject={handleDelete}
        onSelectProject={(p) => setViewingProject(p)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {content}

      {/* Modal Tambah / Edit Proyek */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingProject ? 'Edit Data Proyek' : 'Tambah Proyek Engineering Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kode Proyek
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="PRJ-EL-001"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori Engineering
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Elektrikal">Elektrikal</option>
                    <option value="Sipil">Sipil</option>
                    <option value="Mekanikal & HVAC">Mekanikal & HVAC</option>
                    <option value="Instrumentasi">Instrumentasi</option>
                    <option value="Lingkungan">Lingkungan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Proyek
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Misal: Pembangunan Gardu Induk 150 kV..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Klien / Pemilik Proyek
                  </label>
                  <input
                    type="text"
                    required
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="PT PLN (Persero)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Lokasi Proyek
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Kendal, Jawa Tengah"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    required
                    value={formManager}
                    onChange={(e) => setFormManager(e.target.value)}
                    placeholder="Nama Manajer..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status Proyek
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => {
                      const st = e.target.value as any;
                      setFormStatus(st);
                      if (st === 'Selesai') setFormProgress(100);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Terlambat">Terlambat</option>
                    <option value="Perencanaan">Perencanaan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Anggaran (Budget IDR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000000"
                    required
                    value={formBudget}
                    onChange={(e) => setFormBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{formatIDR(formBudget)}</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Biaya Aktual (Actual Cost IDR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000000"
                    required
                    value={formActualCost}
                    onChange={(e) => setFormActualCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{formatIDR(formActualCost)}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Progress ({formProgress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formProgress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFormProgress(val);
                    if (val === 100) setFormStatus('Selesai');
                    else if (formStatus === 'Selesai') setFormStatus('Aktif');
                  }}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Deadline Selesai
                  </label>
                  <input
                    type="date"
                    required
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Lingkup Kerja
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ringkasan spesifikasi & lingkup pekerjaan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  {editingProject ? 'Simpan Perubahan' : 'Buat Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Proyek */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold block">{viewingProject.code}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {viewingProject.name}
                </h3>
              </div>
              <button
                onClick={() => setViewingProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Klien</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingProject.client}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Lokasi</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingProject.location}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Project Manager</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingProject.manager}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-blue-600">{viewingProject.status}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Progress Fisik</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingProject.progress}%</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Alokasi Anggaran</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatIDR(viewingProject.budget)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Realisasi Biaya Aktual</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatIDR(viewingProject.actualCost)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Jadwal Pelaksanaan</span>
                <span className="font-medium text-slate-600 dark:text-slate-400">
                  {viewingProject.startDate} s.d. {viewingProject.deadline}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block mb-1">Deskripsi & Ruang Lingkup:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {viewingProject.description || 'Pekerjaan konstruksi dan rekayasa sesuai klausul kontrak proyek.'}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const p = viewingProject;
                  setViewingProject(null);
                  handleOpenEdit(p);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
              >
                Edit Proyek Ini
              </button>
              <button
                onClick={() => setViewingProject(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
