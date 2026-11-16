import React, { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  Edit2,
  Trash2,
  Eye,
  X,
  Check
} from 'lucide-react';
import { EngineeringProject, formatIDR } from '../../data/projectIntelligenceData';

interface PIDashboardViewProps {
  projects: EngineeringProject[];
  onOpenCreateProject: () => void;
  onEditProject: (project: EngineeringProject) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectProject: (project: EngineeringProject) => void;
}

export const PIDashboardView: React.FC<PIDashboardViewProps> = ({
  projects,
  onOpenCreateProject,
  onEditProject,
  onDeleteProject,
  onSelectProject
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Aktif' | 'Selesai' | 'Terlambat' | 'Perencanaan'>('Semua');
  const [filterPeriod, setFilterPeriod] = useState('6 bulan terakhir');
  const [filterYear, setFilterYear] = useState('Tahun 2026');

  // Sorting
  const [sortField, setSortField] = useState<keyof EngineeringProject>('progress');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. KPI Metrik Akurat & Logis dari Dataset
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Aktif').length;
  const completedProjects = projects.filter(p => p.status === 'Selesai').length;
  const delayedProjects = projects.filter(p => p.status === 'Terlambat').length;

  const totalBudget = useMemo(() => projects.reduce((acc, curr) => acc + curr.budget, 0), [projects]);
  const totalActualCost = useMemo(() => projects.reduce((acc, curr) => acc + curr.actualCost, 0), [projects]);
  const averageProgress = useMemo(() => {
    if (projects.length === 0) return 0;
    return Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length);
  }, [projects]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.manager.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'Semua' ? true : p.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [projects, searchQuery, statusFilter, sortField, sortAsc]);

  // Pagination slices
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const toggleSort = (field: keyof EngineeringProject) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusBadge = (status: EngineeringProject['status']) => {
    switch (status) {
      case 'Selesai':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/80';
      case 'Aktif':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/80';
      case 'Perencanaan':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/80';
      case 'Terlambat':
      default:
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/80';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 stagger-item stagger-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Project Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manajemen portofolio proyek konstruksi, audit anggaran, kendali mutu, dan mitigasi risiko
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateProject}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Proyek</span>
          </button>
          <button
            onClick={() => alert('Fitur impor berkas proyek (.XLSX / .MS-Project) siap digunakan.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards (Sesuai Permintaan Spesifik User) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-item stagger-2">
        {/* KPI 1: Total Proyek */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Proyek</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalProjects}</h3>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
              Rata-rata Progress: {averageProgress}%
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/60">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Proyek Aktif */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proyek Aktif</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{activeProjects}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              On Schedule di Lapangan
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/60">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Proyek Selesai */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proyek Selesai</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{completedProjects}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              100% Progress & Handover
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Proyek Terlambat */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proyek Terlambat</p>
            <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{delayedProjects}</h3>
            <p className="text-[11px] text-rose-500 font-semibold mt-1">
              Melewati Target Deadline
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-100 dark:border-rose-900/60">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Middle 4 Charts & Visual Widgets (2x2 Grid Konsisten dengan Data Dummy) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 stagger-item stagger-3">
        {/* Widget 1: Progress Proyek (Bar Chart Rencana vs Realisasi) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Progress Proyek</h2>
                <p className="text-[11px] text-slate-400">Realisasi rata-rata kumulatif bulanan</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1">
                <span>{filterPeriod}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Target Rencana Rata-rata</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">74.5%</span>
                <span className="text-[10px] text-amber-500 flex items-center gap-0.5 font-semibold mt-0.5">
                  KPI Baseline
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Realisasi Fisik Aktual</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{averageProgress}%</span>
                <span className="text-[10px] text-emerald-500 flex items-center gap-0.5 font-semibold mt-0.5">
                  ↗ Capaian Lapangan
                </span>
              </div>
            </div>

            {/* Dual Bar Chart */}
            <div className="h-44 mt-6 flex items-end justify-between px-3 pt-4 border-b border-slate-100 dark:border-slate-800">
              {[
                { m: 'Jan', planned: 45, actual: 48 },
                { m: 'Feb', planned: 60, actual: 64 },
                { m: 'Mar', planned: 70, actual: 72 },
                { m: 'Apr', planned: 80, actual: 78 },
                { m: 'Mei', planned: 85, actual: averageProgress },
                { m: 'Jun', planned: 95, actual: 92 }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="flex items-end gap-1.5 h-32">
                    <div 
                      className="w-3.5 rounded-t-sm bg-teal-500 transition-all duration-300"
                      style={{ height: `${item.actual}%` }}
                      title={`Realisasi: ${item.actual}%`}
                    />
                    <div 
                      className="w-3.5 rounded-t-sm bg-orange-400 transition-all duration-300"
                      style={{ height: `${item.planned}%` }}
                      title={`Rencana: ${item.planned}%`}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{item.m}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-400"></span>
                Target Rencana
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-teal-500"></span>
                Realisasi Aktual
              </span>
            </div>
          </div>
        </div>

        {/* Widget 2: Status Proyek (Step Area Chart Tingkat Ketuntasan) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Status Proyek</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Tingkat kepatuhan jadwal & delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {Math.round(((completedProjects + activeProjects) / totalProjects) * 100)}%
              </span>
              <span className="text-xs font-semibold text-emerald-500 flex items-center">
                ↗ Proyek Berjalan Positif
              </span>
            </div>

            {/* Step Area Chart */}
            <div className="h-44 mt-6 relative">
              <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradPI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10,75 L 50,75 L 50,45 L 110,45 L 110,35 L 170,35 L 170,55 L 230,55 L 230,30 L 290,30"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="2.5"
                />
                <path
                  d="M 10,75 L 50,75 L 50,45 L 110,45 L 110,35 L 170,35 L 170,55 L 230,55 L 230,30 L 290,30 L 290,115 L 10,115 Z"
                  fill="url(#areaGradPI)"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mt-2 border-t border-slate-100 dark:border-slate-800 pt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Cost Overview (Anggaran vs Realisasi Biaya IDR) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Cost Overview</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Perbandingan anggaran dan realisasi biaya proyek.</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1">
                <span>{filterYear}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Total Anggaran (Budget)</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{formatIDR(totalBudget)}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Realisasi Biaya (Actual Cost)</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{formatIDR(totalActualCost)}</span>
              </div>
            </div>

            {/* Smooth Wave Area Chart */}
            <div className="h-36 mt-4 relative">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path
                  d="M 0,75 Q 75,55 150,70 T 300,60 L 300,100 L 0,100 Z"
                  fill="#fb923c"
                  fillOpacity="0.35"
                />
                <path
                  d="M 0,60 Q 75,45 150,55 T 300,45 L 300,100 L 0,100 Z"
                  fill="#2dd4bf"
                  fillOpacity="0.4"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mt-1 border-t border-slate-100 dark:border-slate-800 pt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-400"></span>
                Anggaran Disetujui
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-teal-500"></span>
                Pengeluaran Aktual
              </span>
            </div>
          </div>
        </div>

        {/* Widget 4: Risk Matrix & Severity Breakdown */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Risk Matrix</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Peta risiko teknis dari seluruh proyek.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {Math.round((delayedProjects / totalProjects) * 100)}%
              </span>
              <span className="text-xs font-semibold text-rose-500 flex items-center">
                ● {delayedProjects} Proyek Memerlukan Mitigasi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
              {/* Left Line Curve */}
              <div className="sm:col-span-6 h-36 flex items-center">
                <svg className="w-full h-24" viewBox="0 0 160 80">
                  <path
                    d="M 5,60 L 40,68 L 85,38 L 125,20 L 155,42"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Right Side Category Stats */}
              <div className="sm:col-span-6 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Risiko Jadwal</span>
                    <span className="text-[10px] text-slate-400">Keterlambatan Material</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">{delayedProjects} Proyek</span>
                    <span className="text-[10px] text-rose-500 font-semibold">Tinggi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Risiko Biaya</span>
                    <span className="text-[10px] text-slate-400">Variasi Fluktuasi Kurs</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">2 Proyek</span>
                    <span className="text-[10px] text-amber-500 font-semibold">Sedang</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Kepatuhan K3 & Mutu</span>
                    <span className="text-[10px] text-slate-400">Zero Accident Rate</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">100% Lolos</span>
                    <span className="text-[10px] text-emerald-500 font-semibold">Terkendali</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Table: Daftar Proyek (Lengkap 11 Kolom Sesuai Permintaan Spesifik) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden stagger-item stagger-4">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Daftar Proyek</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Menampilkan {filteredProjects.length} dari total {projects.length} proyek engineering aktif
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari nama, kode, klien, PM..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 w-56 sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Filter Status Pills */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              {(['Semua', 'Aktif', 'Selesai', 'Terlambat', 'Perencanaan'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setStatusFilter(st);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    statusFilter === st
                      ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabel 11 Kolom */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-4 px-4 cursor-pointer" onClick={() => toggleSort('code')}>
                  <div className="flex items-center gap-1">
                    <span>KODE PROYEK</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4 cursor-pointer" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">
                    <span>NAMA PROYEK</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4">KLIEN</th>
                <th className="py-4 px-4">PROJECT MANAGER</th>
                <th className="py-4 px-4 cursor-pointer" onClick={() => toggleSort('progress')}>
                  <div className="flex items-center gap-1">
                    <span>PROGRESS</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4 cursor-pointer" onClick={() => toggleSort('budget')}>
                  <div className="flex items-center gap-1">
                    <span>ANGGARAN</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4 cursor-pointer" onClick={() => toggleSort('actualCost')}>
                  <div className="flex items-center gap-1">
                    <span>BIAYA AKTUAL</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4">STATUS</th>
                <th className="py-4 px-4">TANGGAL MULAI</th>
                <th className="py-4 px-4">DEADLINE</th>
                <th className="py-4 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    Tidak ada proyek yang sesuai dengan kata kunci atau filter pencarian.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    {/* 1. Kode Proyek */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {proj.code}
                    </td>

                    {/* 2. Nama Proyek */}
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white min-w-[200px]">
                      <button
                        onClick={() => onSelectProject(proj)}
                        className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {proj.name}
                      </button>
                      <div className="text-[10px] text-slate-400 font-normal">{proj.category}</div>
                    </td>

                    {/* 3. Klien */}
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                      {proj.client}
                    </td>

                    {/* 4. Project Manager */}
                    <td className="py-4 px-4 text-slate-800 dark:text-slate-200 font-medium whitespace-nowrap">
                      {proj.manager}
                    </td>

                    {/* 5. Progress */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              proj.progress === 100
                                ? 'bg-emerald-500'
                                : proj.status === 'Terlambat'
                                ? 'bg-rose-500'
                                : 'bg-blue-600'
                            }`}
                            style={{ width: `${proj.progress}%` }} 
                          />
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                          {proj.progress}%
                        </span>
                      </div>
                    </td>

                    {/* 6. Anggaran */}
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {formatIDR(proj.budget)}
                    </td>

                    {/* 7. Biaya Aktual */}
                    <td className="py-4 px-4 font-semibold whitespace-nowrap">
                      <span className={proj.actualCost > proj.budget ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}>
                        {formatIDR(proj.actualCost)}
                      </span>
                    </td>

                    {/* 8. Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(proj.status)}`}>
                        {proj.status}
                      </span>
                    </td>

                    {/* 9. Tanggal Mulai */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap font-medium">
                      {new Date(proj.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    {/* 10. Deadline */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap font-medium">
                      {new Date(proj.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    {/* 11. Aksi (Detail, Edit, Hapus) */}
                    <td className="py-4 px-4 text-right whitespace-nowrap relative">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectProject(proj)}
                          title="Lihat Detail Proyek"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditProject(proj)}
                          title="Edit Proyek"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus proyek "${proj.name}"?`)) {
                              onDeleteProject(proj.id);
                            }
                          }}
                          title="Hapus Proyek"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>
            Halaman {currentPage} dari {totalPages} ({filteredProjects.length} data proyek)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 font-medium hover:bg-slate-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 font-medium hover:bg-slate-50"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
