import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  BarChart3, 
  Activity, 
  FileText, 
  ShoppingCart, 
  GraduationCap, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ActivityItem } from '../types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from './ui/table';

interface DashboardViewProps {
  userName: string;
  onNavigateModule: (moduleId: string) => void;
  activities: ActivityItem[];
}

type PeriodType = '3m' | '30d' | '7d';

interface VisitorPoint {
  date: string;
  label: string;
  desktop: number;
  mobile: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  onNavigateModule,
  activities,
}) => {
  const { isDarkMode } = useTheme();
  // Tanggal format resmi sesuai screenshot: "SELASA, 16 SEPTEMBER 2025"
  const formattedDate = "SELASA, 16 SEPTEMBER 2025";

  // State Periode Grafik Total Pengunjung (3 bulan, 30 hari, 7 hari)
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('3m');

  // Generator data dummy realistis yang siap dihubungkan ke backend API
  const visitorData: Record<PeriodType, VisitorPoint[]> = useMemo(() => {
    // 1. Data 3 Bulan Terakhir (Apr 1 - Jun 30, ~90 titik data) persis ritme gelombang screenshot
    const threeMonths: VisitorPoint[] = [
      { date: '2025-04-01', label: 'Apr 1', desktop: 120, mobile: 70 },
      { date: '2025-04-03', label: 'Apr 3', desktop: 150, mobile: 90 },
      { date: '2025-04-05', label: 'Apr 5', desktop: 210, mobile: 110 },
      { date: '2025-04-07', label: 'Apr 7', desktop: 280, mobile: 140 },
      { date: '2025-04-09', label: 'Apr 9', desktop: 160, mobile: 85 },
      { date: '2025-04-11', label: 'Apr 11', desktop: 310, mobile: 155 },
      { date: '2025-04-13', label: 'Apr 13', desktop: 180, mobile: 95 },
      { date: '2025-04-15', label: 'Apr 15', desktop: 290, mobile: 145 },
      { date: '2025-04-17', label: 'Apr 17', desktop: 220, mobile: 115 },
      { date: '2025-04-19', label: 'Apr 19', desktop: 390, mobile: 190 },
      { date: '2025-04-21', label: 'Apr 21', desktop: 230, mobile: 120 },
      { date: '2025-04-23', label: 'Apr 23', desktop: 170, mobile: 90 },
      { date: '2025-04-25', label: 'Apr 25', desktop: 250, mobile: 130 },
      { date: '2025-04-26', label: 'Apr 26', desktop: 340, mobile: 175 },
      { date: '2025-04-28', label: 'Apr 28', desktop: 190, mobile: 100 },
      { date: '2025-04-30', label: 'Apr 30', desktop: 360, mobile: 185 },
      { date: '2025-05-02', label: 'May 2', desktop: 210, mobile: 110 },
      { date: '2025-05-04', label: 'May 4', desktop: 375, mobile: 195 },
      { date: '2025-05-06', label: 'May 6', desktop: 430, mobile: 220 },
      { date: '2025-05-08', label: 'May 8', desktop: 270, mobile: 140 },
      { date: '2025-05-10', label: 'May 10', desktop: 350, mobile: 180 },
      { date: '2025-05-12', label: 'May 12', desktop: 420, mobile: 215 },
      { date: '2025-05-14', label: 'May 14', desktop: 390, mobile: 200 },
      { date: '2025-05-16', label: 'May 16', desktop: 260, mobile: 135 },
      { date: '2025-05-18', label: 'May 18', desktop: 310, mobile: 160 },
      { date: '2025-05-21', label: 'May 21', desktop: 190, mobile: 105 },
      { date: '2025-05-23', label: 'May 23', desktop: 280, mobile: 145 },
      { date: '2025-05-25', label: 'May 25', desktop: 395, mobile: 200 },
      { date: '2025-05-28', label: 'May 28', desktop: 240, mobile: 125 },
      { date: '2025-05-30', label: 'May 30', desktop: 380, mobile: 195 },
      { date: '2025-06-01', label: 'Jun 1', desktop: 310, mobile: 160 },
      { date: '2025-06-03', label: 'Jun 3', desktop: 220, mobile: 115 },
      { date: '2025-06-05', label: 'Jun 5', desktop: 370, mobile: 190 },
      { date: '2025-06-07', label: 'Jun 7', desktop: 390, mobile: 205 },
      { date: '2025-06-09', label: 'Jun 9', desktop: 180, mobile: 95 },
      { date: '2025-06-11', label: 'Jun 11', desktop: 395, mobile: 205 },
      { date: '2025-06-13', label: 'Jun 13', desktop: 350, mobile: 180 },
      { date: '2025-06-15', label: 'Jun 15', desktop: 440, mobile: 230 },
      { date: '2025-06-17', label: 'Jun 17', desktop: 260, mobile: 135 },
      { date: '2025-06-19', label: 'Jun 19', desktop: 380, mobile: 195 },
      { date: '2025-06-22', label: 'Jun 22', desktop: 450, mobile: 235 },
      { date: '2025-06-25', label: 'Jun 25', desktop: 280, mobile: 145 },
      { date: '2025-06-27', label: 'Jun 27', desktop: 420, mobile: 215 },
      { date: '2025-06-29', label: 'Jun 29', desktop: 190, mobile: 100 },
      { date: '2025-06-30', label: 'Jun 30', desktop: 360, mobile: 185 },
    ];

    // 2. Data 30 Hari Terakhir
    const thirtyDays: VisitorPoint[] = [
      { date: '2025-06-01', label: 'Jun 1', desktop: 310, mobile: 160 },
      { date: '2025-06-03', label: 'Jun 3', desktop: 240, mobile: 125 },
      { date: '2025-06-05', label: 'Jun 5', desktop: 370, mobile: 190 },
      { date: '2025-06-07', label: 'Jun 7', desktop: 390, mobile: 205 },
      { date: '2025-06-09', label: 'Jun 9', desktop: 180, mobile: 95 },
      { date: '2025-06-11', label: 'Jun 11', desktop: 410, mobile: 210 },
      { date: '2025-06-13', label: 'Jun 13', desktop: 350, mobile: 180 },
      { date: '2025-06-15', label: 'Jun 15', desktop: 440, mobile: 230 },
      { date: '2025-06-17', label: 'Jun 17', desktop: 260, mobile: 135 },
      { date: '2025-06-19', label: 'Jun 19', desktop: 380, mobile: 195 },
      { date: '2025-06-21', label: 'Jun 21', desktop: 330, mobile: 170 },
      { date: '2025-06-23', label: 'Jun 23', desktop: 450, mobile: 235 },
      { date: '2025-06-25', label: 'Jun 25', desktop: 290, mobile: 150 },
      { date: '2025-06-27', label: 'Jun 27', desktop: 420, mobile: 215 },
      { date: '2025-06-29', label: 'Jun 29', desktop: 220, mobile: 110 },
      { date: '2025-06-30', label: 'Jun 30', desktop: 380, mobile: 195 },
    ];

    // 3. Data 7 Hari Terakhir
    const sevenDays: VisitorPoint[] = [
      { date: '2025-06-24', label: 'Jun 24', desktop: 320, mobile: 165 },
      { date: '2025-06-25', label: 'Jun 25', desktop: 290, mobile: 150 },
      { date: '2025-06-26', label: 'Jun 26', desktop: 380, mobile: 195 },
      { date: '2025-06-27', label: 'Jun 27', desktop: 430, mobile: 220 },
      { date: '2025-06-28', label: 'Jun 28', desktop: 360, mobile: 185 },
      { date: '2025-06-29', label: 'Jun 29', desktop: 240, mobile: 120 },
      { date: '2025-06-30', label: 'Jun 30', desktop: 410, mobile: 210 },
    ];

    return {
      '3m': threeMonths,
      '30d': thirtyDays,
      '7d': sevenDays,
    };
  }, []);

  const currentChartData = visitorData[selectedPeriod];

  const periodSubtitle = useMemo(() => {
    switch (selectedPeriod) {
      case '3m':
        return 'Total untuk 3 bulan terakhir';
      case '30d':
        return 'Total untuk 30 hari terakhir';
      case '7d':
        return 'Total untuk 7 hari terakhir';
    }
  }, [selectedPeriod]);

  // Data bulanan grafik proyek persis sesuai screenshot:
  // Jan: 186, Feb: 305, Mar: 237, Apr: 73, Mei: 209, Jun: 214
  const monthlyData = [
    { month: 'Jan', count: 186 },
    { month: 'Februari', count: 305 },
    { month: 'Mar', count: 237 },
    { month: 'April', count: 73 },
    { month: 'Mei', count: 209 },
    { month: 'Jun', count: 214 },
  ];
  const maxProjectCount = 350;

  // 6 Modul Utama persis sesuai Screenshot referensi
  const modules = [
    {
      id: 'co-engineer',
      title: 'Co Engineer',
      desc: 'Asisten AI di setiap disiplin ilmu teknik: sipil, listrik, mekanik, instrumentasi & kontrol, proses, HVAC.',
      icon: Bot,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20',
    },
    {
      id: 'project-intelligence',
      title: 'Kecerdasan Proyek',
      desc: 'Perencanaan berbasis AI melalui pemantauan: WBS, CPM, biaya, dan risiko.',
      icon: BarChart3,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20',
    },
    {
      id: 'asset-intelligence',
      title: 'Intelijen Aset',
      desc: 'Aset industri: dari registrasi hingga pemeliharaan prediktif. Dalam pengembangan.',
      icon: Activity,
      iconColor: 'text-teal-400',
      iconBg: 'bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20',
      badge: 'Dalam pengembangan',
    },
    {
      id: 'document-intelligence',
      title: 'Kecerdasan Dokumen',
      desc: 'Manajemen dokumen teknis berbasis AI: OCR, gambar, revisi, dan tinjauan. Dalam pengembangan.',
      icon: FileText,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20',
      badge: 'Dalam pengembangan',
    },
    {
      id: 'glace-commerce',
      title: 'Glace Commerce',
      desc: 'Energi terbarukan, kelistrikan, otomatisasi, dan perangkat keras jaringan, dengan harga korporat dan permintaan penawaran.',
      icon: ShoppingCart,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20',
    },
    {
      id: 'glace-academy',
      title: 'Akademi Glace',
      desc: 'AI untuk insinyur, SCADA, PLC, BIM, dan sertifikasi profesional dll.',
      icon: GraduationCap,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/20',
    },
  ];

  // Variants untuk smooth stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* 1. Header Ucapan Selamat Datang */}
      <motion.div variants={itemVariants}>
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
          {formattedDate}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Selamat datang kembali, <span className="text-blue-600 dark:text-blue-400">{userName || 'Bagoes Nugraha pw'} .</span>
        </h1>
      </motion.div>

      {/* 2. Empat Kartu KPI Statistik (Padding, Alignment, dan Spacing Seragam) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total pengguna', 
            value: '12.450', 
            sub: '+ 12% dari bulan lalu' 
          },
          { 
            label: 'Total produk', 
            value: '840', 
            sub: 'Katalog perusahaan tersedia' 
          },
          { 
            label: 'Proyek Aktif', 
            value: '1.228', 
            sub: '98% sesuai jadwal' 
          },
          { 
            label: 'Dikembalikan Dananya / Menunggu Permintaan Penawaran (RFQ)', 
            value: '14', 
            sub: 'Membutuhkan peninjauan' 
          },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.985 }}
            className="glace-card-interactive bg-white dark:bg-[#11141d] rounded-2xl border border-slate-200/90 dark:border-[#1a1f2c] p-5 shadow-2xs transition-colors flex flex-col justify-between min-h-[142px] cursor-pointer"
          >
            <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
              {stat.label}
            </p>
            <div className="my-2">
              <span className="text-2xl sm:text-[26px] font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 font-normal">
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. Section Grafik Analisis: Total Pengunjung (Area Chart Monokrom) */}
      <motion.div variants={itemVariants}>
        <div className="w-full bg-white dark:bg-[#111318] rounded-2xl border border-slate-200/90 dark:border-[#1e222d] p-6 shadow-sm flex flex-col justify-between transition-colors">
          {/* Header Grafik & Segmented Button Periode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Total Pengunjung
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {periodSubtitle}
              </p>
            </div>

            {/* Segmented Period Tabs persis sesuai screenshot */}
            <div className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-[#181b24] p-1 border border-slate-200 dark:border-[#262b3a] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedPeriod('3m')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedPeriod === '3m'
                    ? 'bg-white dark:bg-[#292f3f] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                3 bulan terakhir
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('30d')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedPeriod === '30d'
                    ? 'bg-white dark:bg-[#292f3f] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                30 hari terakhir
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('7d')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedPeriod === '7d'
                    ? 'bg-white dark:bg-[#292f3f] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                7 hari terakhir
              </button>
            </div>
          </div>

          {/* Smooth Area Chart dengan Dua Garis Halus & Gradasi Monokrom Abu-Abu */}
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Gradasi Fill Monokrom Abu-abu / Putih ke Transparan untuk Garis Atas */}
                  <linearGradient id="glaceFillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDarkMode ? "#d1d5db" : "#3b82f6"} stopOpacity={isDarkMode ? 0.35 : 0.25} />
                    <stop offset="50%" stopColor={isDarkMode ? "#9ca3af" : "#60a5fa"} stopOpacity={isDarkMode ? 0.15 : 0.1} />
                    <stop offset="95%" stopColor={isDarkMode ? "#6b7280" : "#93c5fd"} stopOpacity={0.0} />
                  </linearGradient>
                  {/* Gradasi Fill Monokrom untuk Garis Bawah */}
                  <linearGradient id="glaceFillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDarkMode ? "#9ca3af" : "#94a3b8"} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={isDarkMode ? "#4b5563" : "#cbd5e1"} stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                {/* Garis Grid Horizontal Sangat Tipis */}
                <CartesianGrid
                  strokeDasharray="0"
                  stroke={isDarkMode ? "#1f2430" : "#e2e8f0"}
                  vertical={false}
                />

                {/* Sumbu X dengan Label Tanggal Responsif */}
                <XAxis
                  dataKey="label"
                  stroke={isDarkMode ? "#64748b" : "#94a3b8"}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDarkMode ? '#64748b' : '#64748b', fontSize: 11 }}
                  dy={10}
                  interval={selectedPeriod === '3m' ? 4 : selectedPeriod === '30d' ? 2 : 0}
                />

                {/* Sumbu Y (Hidden Axis Line, Tipis) */}
                <YAxis
                  stroke={isDarkMode ? "#64748b" : "#94a3b8"}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDarkMode ? '#64748b' : '#64748b', fontSize: 11 }}
                  dx={-5}
                />

                {/* Custom Tooltip Monokrom yang Menampilkan Angka Pengunjung */}
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const total = (payload[0]?.value as number || 0) + (payload[1]?.value as number || 0);
                      return (
                        <div className="bg-white dark:bg-[#181b24] border border-slate-200 dark:border-[#2a3040] rounded-xl px-3.5 py-2.5 shadow-xl text-xs space-y-1.5 animate-in fade-in duration-150">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-[#262c3a] pb-1">
                            {label}
                          </p>
                          <div className="flex items-center justify-between gap-4 text-slate-600 dark:text-slate-300">
                            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-white inline-block" />
                              Pengunjung Utama:
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {payload[0]?.value}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-600 dark:text-slate-300">
                            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[#94a3b8] inline-block" />
                              Pengunjung Sekunder:
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {payload[1]?.value}
                            </span>
                          </div>
                          <div className="border-t border-slate-100 dark:border-[#262c3a] pt-1 flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
                            <span>Total Pengunjung:</span>
                            <span className="font-extrabold text-slate-900 dark:text-white">
                              {total}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Dua Garis Halus & Bergelombang (Smooth Natural Curve) Monokrom */}
                <Area
                  type="natural"
                  dataKey="desktop"
                  stroke={isDarkMode ? "#e2e8f0" : "#2563eb"}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#glaceFillDesktop)"
                  activeDot={{ r: 4, fill: isDarkMode ? '#ffffff' : '#2563eb', stroke: isDarkMode ? '#111318' : '#ffffff', strokeWidth: 2 }}
                />
                <Area
                  type="natural"
                  dataKey="mobile"
                  stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#glaceFillMobile)"
                  activeDot={{ r: 3, fill: isDarkMode ? '#94a3b8' : '#64748b', stroke: isDarkMode ? '#111318' : '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* 4. Section Enam Kartu Modul: Rekayasa AI */}
      <motion.div variants={itemVariants}>
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mb-3.5">
          Rekayasa AI
        </h2>
        
        {/* Grid 6 Modul dengan Efek Floating Interaktif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.id}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onNavigateModule(m.id)}
                className="glace-card-interactive bg-white dark:bg-[#11141d] rounded-2xl border border-slate-200/90 dark:border-[#1a1f2c] p-5 shadow-2xs transition-colors cursor-pointer group flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  {/* Top Bar: Icon Container & Arrow Right */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl ${m.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${m.iconColor}`} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  {/* Title & Badge */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">
                      {m.title}
                    </h3>
                    {m.badge && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-[#161a26] dark:text-slate-400 border border-slate-200 dark:border-[#222838] shrink-0">
                        {m.badge}
                      </span>
                    )}
                  </div>

                  {/* Description: 12-13px readable */}
                  <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. Section Aktivitas Terbaru (Standard GLACE Table Design) */}
      <div className="bg-white dark:bg-[#11141d] rounded-xl border border-slate-200/90 dark:border-zinc-800/80 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
            Aktivitas Terbaru
          </h2>
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Sinkronisasi otomatis
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-36">WAKTU</TableHead>
              <TableHead>AKTIVITAS</TableHead>
              <TableHead className="w-48">MODUL</TableHead>
              <TableHead className="w-32">STATUS</TableHead>
              <TableHead className="w-16 text-right">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((act) => {
              const isSukses = act.status === 'Success';
              return (
                <TableRow key={act.id}>
                  <TableCell className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                    {act.time}
                  </TableCell>
                  <TableCell className="font-medium text-slate-800 dark:text-zinc-100">
                    <div className="flex items-center gap-2">
                      <span>{act.activity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-zinc-300">
                    <TablePill variant="default">
                      {act.module}
                    </TablePill>
                  </TableCell>
                  <TableCell>
                    <TablePill variant={isSukses ? 'default' : 'default'}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isSukses ? 'bg-zinc-400 dark:bg-zinc-300' : 'bg-zinc-400 dark:bg-zinc-400'}`} />
                      <span>{isSukses ? 'Selesai' : 'Proses'}</span>
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer">
                      <MoreHorizontal className="w-4 h-4 inline-block" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
