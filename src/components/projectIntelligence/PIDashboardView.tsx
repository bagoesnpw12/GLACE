import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  AreaChart,
  Area,
  LabelList,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  type ChartConfig 
} from '../ui/chart';
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
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from '../ui/table';

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
        return 'text-slate-800 bg-slate-100 border-slate-300 dark:bg-slate-800/80 dark:text-[#E5E7EB] dark:border-slate-700';
      case 'Aktif':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/80';
      case 'Perencanaan':
        return 'text-slate-700 bg-slate-100 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700';
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
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
              On Schedule di Lapangan
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/60">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Proyek Selesai */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proyek Selesai</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{completedProjects}</h3>
            <p className="text-[11px] text-slate-600 dark:text-[#E5E7EB] font-semibold mt-1">
              100% Progress & Handover
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-[#E5E7EB] flex items-center justify-center border border-slate-200 dark:border-slate-700">
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
                <span className="text-[10px] text-blue-500 dark:text-blue-400 flex items-center gap-0.5 font-semibold mt-0.5">
                  KPI Baseline
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Realisasi Fisik Aktual</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{averageProgress}%</span>
                <span className="text-[10px] text-slate-700 dark:text-[#E5E7EB] flex items-center gap-0.5 font-semibold mt-0.5">
                  ↗ Capaian Lapangan
                </span>
              </div>
            </div>

            {/* Stacked Bar Chart Matching shadcn/ui Reference */}
            <div className="h-56 mt-4">
              <ChartContainer
                config={{
                  planned: {
                    label: "Target Rencana",
                    color: "#60a5fa",
                  },
                  actual: {
                    label: "Realisasi Aktual",
                    color: "#2563eb",
                  },
                }}
                className="w-full h-full aspect-auto"
              >
                <BarChart
                  accessibilityLayer
                  data={[
                    { m: 'Jan', period: '2026-01-16', planned: 35, actual: 48 },
                    { m: 'Feb', period: '2026-02-16', planned: 40, actual: 64 },
                    { m: 'Mar', period: '2026-03-16', planned: 30, actual: 42 },
                    { m: 'Apr', period: '2026-04-16', planned: 35, actual: 52 },
                    { m: 'Mei', period: '2026-05-16', planned: 55, actual: 68 },
                    { m: 'Jun', period: '2026-06-16', planned: 45, actual: 60 }
                  ]}
                  margin={{ top: 10, right: 8, left: -25, bottom: 0 }}
                  barCategoryGap={16}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.12} />
                  <XAxis 
                    dataKey="m" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8}
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                  />
                  <YAxis 
                    domain={[0, 120]} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val}%`}
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        className="bg-[#090B10] dark:bg-[#090B10] text-white border border-[#242b3d] dark:border-[#242b3d] rounded-xl px-3.5 py-2.5 shadow-2xl min-w-[170px]"
                        labelClassName="font-bold text-white text-xs mb-1"
                        formatter={(value, name) => (
                          <div className="flex w-full items-center justify-between gap-6 leading-none">
                            <span className="text-slate-300 text-xs font-normal">
                              {name === 'planned' ? 'Target Rencana' : name === 'actual' ? 'Realisasi Aktual' : name}
                            </span>
                            <span className="font-mono font-bold text-white text-xs tabular-nums">
                              {value}%
                            </span>
                          </div>
                        )}
                        labelFormatter={(_, payload) => {
                          const item = payload?.[0]?.payload;
                          return item?.period || item?.m || '';
                        }}
                      />
                    }
                  />
                  {/* Lower Stack Segment: Target Rencana (Light Blue) */}
                  <Bar 
                    dataKey="planned" 
                    name="Target Rencana"
                    stackId="progressStack"
                    fill="#60a5fa" 
                    radius={[0, 0, 0, 0]} 
                    maxBarSize={42}
                  />
                  {/* Upper Stack Segment: Realisasi Aktual (Vibrant Blue) */}
                  <Bar 
                    dataKey="actual" 
                    name="Realisasi Aktual"
                    stackId="progressStack"
                    fill="#2563eb" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={42}
                  />
                </BarChart>
              </ChartContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]"></span>
                Target Rencana
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]"></span>
                Realisasi Aktual
              </span>
            </div>
          </div>
        </div>

        {/* Widget 2: Status Proyek (Line Chart - Label Resmi shadcn/ui) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Status Proyek</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Tingkat kepatuhan jadwal & pengiriman</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {Math.round(((completedProjects + activeProjects) / totalProjects) * 100)}%
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-[#E5E7EB] flex items-center">
                ↗ Proyek Berjalan Positif
              </span>
            </div>

            {/* Line Chart - Label (Smooth Curve, Dots, Direct Top Labels & Tooltip) */}
            <div className="h-56 mt-4">
              <ChartContainer
                config={{
                  compliance: {
                    label: "Tingkat Kepatuhan",
                    color: "#60a5fa",
                  },
                }}
                className="w-full h-full aspect-auto"
              >
                <LineChart
                  accessibilityLayer
                  data={[
                    { m: 'Jan', compliance: 50 },
                    { m: 'Feb', compliance: 68 },
                    { m: 'Mar', compliance: 75 },
                    { m: 'Apr', compliance: 62 },
                    { m: 'Mei', compliance: 80 },
                    { m: 'Jun', compliance: 85 }
                  ]}
                  margin={{
                    top: 24,
                    left: 12,
                    right: 12,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.12} />
                  <XAxis
                    dataKey="m"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        className="bg-[#090B10] dark:bg-[#090B10] text-white border border-[#242b3d] dark:border-[#242b3d] rounded-xl px-3 py-2 shadow-2xl"
                        formatter={(value) => (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">Kepatuhan:</span>
                            <span className="font-mono font-bold text-white text-xs tabular-nums">{value}%</span>
                          </div>
                        )}
                        labelFormatter={(label) => `Bulan ${label}`}
                      />
                    }
                  />
                  <Line
                    dataKey="compliance"
                    type="natural"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{
                      fill: "#60a5fa",
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#93c5fd",
                      stroke: "#1e3a8a",
                      strokeWidth: 2,
                    }}
                  >
                    <LabelList
                      position="top"
                      offset={10}
                      className="fill-slate-900 dark:fill-white font-semibold"
                      fontSize={11}
                      formatter={(val: any) => `${val}%`}
                    />
                  </Line>
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Widget 3: Cost Overview (Area Chart - Gradient Sesuai Referensi Gambar 2) */}
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

            {/* Area Chart - Gradient (Recharts + shadcn/ui) */}
            <div className="h-48 mt-4">
              <ChartContainer
                config={{
                  budget: {
                    label: "Anggaran Disetujui",
                    color: "#60a5fa",
                  },
                  actual: {
                    label: "Pengeluaran Aktual",
                    color: "#2563eb",
                  },
                }}
                className="w-full h-full aspect-auto"
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    { m: 'Jan', budget: 35, actual: 24 },
                    { m: 'Feb', budget: 58, actual: 32 },
                    { m: 'Mar', budget: 38, actual: 26 },
                    { m: 'Apr', budget: 28, actual: 34 },
                    { m: 'Mei', budget: 44, actual: 28 },
                    { m: 'Jun', budget: 45, actual: 30 }
                  ]}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="costGradBudget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="costGradActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.12} />
                  <XAxis
                    dataKey="m"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        className="bg-[#090B10] dark:bg-[#090B10] text-white border border-[#242b3d] dark:border-[#242b3d] rounded-xl px-3.5 py-2.5 shadow-2xl min-w-[170px]"
                        labelClassName="font-bold text-white text-xs mb-1"
                        formatter={(value, name) => (
                          <div className="flex w-full items-center justify-between gap-4 leading-none">
                            <span className="text-slate-300 text-xs font-normal">
                              {name === 'budget' ? 'Anggaran Disetujui' : name === 'actual' ? 'Pengeluaran Aktual' : name}
                            </span>
                            <span className="font-mono font-bold text-white text-xs tabular-nums">
                              Rp {value} M
                            </span>
                          </div>
                        )}
                        labelFormatter={(label) => `Bulan ${label}`}
                      />
                    }
                  />
                  <Area
                    dataKey="budget"
                    name="Anggaran Disetujui"
                    type="natural"
                    fill="url(#costGradBudget)"
                    fillOpacity={1}
                    stroke="#60a5fa"
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="actual"
                    name="Pengeluaran Aktual"
                    type="natural"
                    fill="url(#costGradActual)"
                    fillOpacity={1}
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]"></span>
                Anggaran Disetujui
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]"></span>
                Pengeluaran Aktual
              </span>
            </div>
          </div>
        </div>

        {/* Widget 4: Risk Matrix & Severity Breakdown (Line Chart - Multiple Sesuai Referensi Gambar 3) */}
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

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 items-center">
              {/* Left Side: Line Chart - Multiple (3 Garis Berdasarkan Status Risiko) */}
              <div className="sm:col-span-6 h-48 flex flex-col justify-between">
                <ChartContainer
                  config={{
                    schedule: {
                      label: "Risiko Jadwal (Tinggi)",
                      color: "#EF4444",
                    },
                    cost: {
                      label: "Risiko Biaya (Sedang)",
                      color: "#3B82F6",
                    },
                    safety: {
                      label: "Kepatuhan K3 & Mutu (Terkendali)",
                      color: "#E5E7EB",
                    },
                  }}
                  className="w-full flex-1 aspect-auto"
                >
                  <LineChart
                    accessibilityLayer
                    data={[
                      { m: 'Jan', schedule: 32, cost: 18, safety: 12 },
                      { m: 'Feb', schedule: 55, cost: 34, safety: 22 },
                      { m: 'Mar', schedule: 40, cost: 16, safety: 28 },
                      { m: 'Apr', schedule: 12, cost: 32, safety: 40 },
                      { m: 'Mei', schedule: 38, cost: 18, safety: 35 },
                      { m: 'Jun', schedule: 40, cost: 20, safety: 15 }
                    ]}
                    margin={{ top: 10, right: 6, left: 6, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.12} />
                    <XAxis
                      dataKey="m"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={6}
                      tick={{ fontSize: 10, fill: '#64748b' }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          className="bg-[#090B10] dark:bg-[#090B10] text-white border border-[#242b3d] dark:border-[#242b3d] rounded-xl px-3 py-2 shadow-2xl min-w-[170px]"
                          formatter={(value, name) => (
                            <div className="flex w-full items-center justify-between gap-4 leading-none text-xs">
                              <span className="text-slate-300 font-normal">
                                {name === 'schedule' ? 'Risiko Jadwal' : name === 'cost' ? 'Risiko Biaya' : 'Kepatuhan K3 & Mutu'}
                              </span>
                              <span className="font-mono font-bold text-white tabular-nums">
                                {value}%
                              </span>
                            </div>
                          )}
                          labelFormatter={(label) => `Bulan ${label}`}
                        />
                      }
                    />
                    {/* Line 1: Risiko Jadwal – Merah (#EF4444) sesuai status Tinggi */}
                    <Line
                      dataKey="schedule"
                      name="Risiko Jadwal"
                      type="natural"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#EF4444' }}
                    />
                    {/* Line 2: Risiko Biaya – Biru (#3B82F6) sesuai status Sedang */}
                    <Line
                      dataKey="cost"
                      name="Risiko Biaya"
                      type="natural"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#3B82F6' }}
                    />
                    {/* Line 3: Kepatuhan K3 & Mutu – Putih (#E5E7EB) sesuai status Terkendali */}
                    <Line
                      dataKey="safety"
                      name="Kepatuhan K3 & Mutu"
                      type="natural"
                      stroke="#E5E7EB"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#E5E7EB' }}
                    />
                  </LineChart>
                </ChartContainer>

                {/* Legenda 3 Garis Sesuai Permintaan */}
                <div className="flex items-center justify-center gap-3 pt-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    Jadwal
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                    Biaya
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#E5E7EB]"></span>
                    K3 & Mutu
                  </span>
                </div>
              </div>

              {/* Right Side Category Stats */}
              <div className="sm:col-span-6 space-y-2.5 text-xs pl-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Risiko Jadwal</span>
                    <span className="text-[10px] text-slate-400">Keterlambatan Material</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">{delayedProjects} Proyek</span>
                    <span className="text-[10px] text-[#EF4444] font-semibold">Tinggi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Risiko Biaya</span>
                    <span className="text-[10px] text-slate-400">Variasi Fluktuasi Kurs</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">2 Proyek</span>
                    <span className="text-[10px] text-[#3B82F6] font-semibold">Sedang</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Kepatuhan K3 & Mutu</span>
                    <span className="text-[10px] text-slate-400">Zero Accident Rate</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">100% Lolos</span>
                    <span className="text-[10px] text-[#E5E7EB] font-semibold">Terkendali</span>
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

        {/* Standard GLACE Table 11 Kolom */}
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="cursor-pointer" onClick={() => toggleSort('code')}>
                <div className="flex items-center gap-1">
                  <span>KODE PROYEK</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>NAMA PROYEK</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>KLIEN</TableHead>
              <TableHead>PROJECT MANAGER</TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort('progress')}>
                <div className="flex items-center gap-1">
                  <span>PROGRESS</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort('budget')}>
                <div className="flex items-center gap-1">
                  <span>ANGGARAN</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort('actualCost')}>
                <div className="flex items-center gap-1">
                  <span>BIAYA AKTUAL</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>TANGGAL MULAI</TableHead>
              <TableHead>DEADLINE</TableHead>
              <TableHead className="text-right">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="py-12 text-center text-slate-400">
                  Tidak ada proyek yang sesuai dengan kata kunci atau filter pencarian.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProjects.map((proj) => (
                <TableRow key={proj.id}>
                  {/* 1. Kode Proyek */}
                  <TableCell className="font-mono font-medium text-slate-900 dark:text-zinc-100 whitespace-nowrap">
                    {proj.code}
                  </TableCell>

                  {/* 2. Nama Proyek */}
                  <TableCell className="font-medium text-slate-900 dark:text-zinc-100 min-w-[200px]">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="text-left hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {proj.name}
                    </button>
                    <div className="text-[10px] text-slate-400 font-normal">{proj.category}</div>
                  </TableCell>

                  {/* 3. Klien */}
                  <TableCell className="text-slate-600 dark:text-zinc-400 whitespace-nowrap">
                    {proj.client}
                  </TableCell>

                  {/* 4. Project Manager */}
                  <TableCell className="text-slate-800 dark:text-zinc-200 whitespace-nowrap">
                    {proj.manager}
                  </TableCell>

                  {/* 5. Progress */}
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            proj.progress === 100
                              ? 'bg-slate-400 dark:bg-white'
                              : proj.status === 'Terlambat'
                              ? 'bg-rose-500 dark:bg-zinc-500'
                              : 'bg-blue-600 dark:bg-zinc-300'
                          }`}
                          style={{ width: `${proj.progress}%` }} 
                        />
                      </div>
                      <span className="font-mono text-slate-700 dark:text-zinc-300 text-[11px]">
                        {proj.progress}%
                      </span>
                    </div>
                  </TableCell>

                  {/* 6. Anggaran */}
                  <TableCell className="font-mono font-medium text-slate-800 dark:text-zinc-200 whitespace-nowrap">
                    {formatIDR(proj.budget)}
                  </TableCell>

                  {/* 7. Biaya Aktual */}
                  <TableCell className="font-mono font-medium whitespace-nowrap">
                    <span className={proj.actualCost > proj.budget ? 'text-rose-600 dark:text-zinc-300' : 'text-slate-800 dark:text-zinc-200'}>
                      {formatIDR(proj.actualCost)}
                    </span>
                  </TableCell>

                  {/* 8. Status */}
                  <TableCell className="whitespace-nowrap">
                    <TablePill variant={proj.status === 'Selesai' ? 'success' : proj.status === 'Terlambat' ? 'warning' : 'process'}>
                      <span className={`w-1.5 h-1.5 rounded-full ${proj.status === 'Selesai' ? 'bg-emerald-500 dark:bg-white' : proj.status === 'Terlambat' ? 'bg-rose-500 dark:bg-zinc-500' : 'bg-blue-500 dark:bg-zinc-300'}`} />
                      <span>{proj.status}</span>
                    </TablePill>
                  </TableCell>

                  {/* 9. Tanggal Mulai */}
                  <TableCell className="text-slate-500 dark:text-zinc-400 whitespace-nowrap text-[11px]">
                    {new Date(proj.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>

                  {/* 10. Deadline */}
                  <TableCell className="text-slate-500 dark:text-zinc-400 whitespace-nowrap text-[11px]">
                    {new Date(proj.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>

                  {/* 11. Aksi (Detail, Edit, Hapus) */}
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onSelectProject(proj)}
                        title="Lihat Detail Proyek"
                        className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onEditProject(proj)}
                        title="Edit Proyek"
                        className="p-1 rounded text-slate-400 hover:text-blue-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
                        className="p-1 rounded text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

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
