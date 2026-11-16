import React from 'react';
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
import { ActivityItem } from '../types';

interface DashboardViewProps {
  userName: string;
  onNavigateModule: (moduleId: string) => void;
  activities: ActivityItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  onNavigateModule,
  activities,
}) => {
  // Tanggal format resmi sesuai screenshot: "SELASA, 16 SEPTEMBER 2025"
  const formattedDate = "SELASA, 16 SEPTEMBER 2025";

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

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Header Ucapan Selamat Datang */}
      <div className="stagger-item stagger-1">
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
          {formattedDate}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Selamat datang kembali, <span className="text-blue-600 dark:text-blue-400">{userName || 'Bagoes Nugraha pw'} .</span>
        </h1>
      </div>

      {/* 2. Empat Kartu KPI Statistik (Padding, Alignment, dan Spacing Seragam) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-item stagger-2">
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
          <div 
            key={i} 
            className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between min-h-[142px]"
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
          </div>
        ))}
      </div>

      {/* 3. Section Grafik Analisis: Grafik Proyek & Status Proyek */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 stagger-item stagger-3">
        
        {/* Grafik Proyek Bar Chart (8 Kolom) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Grafik proyek
            </h2>
            <div className="relative">
              <select className="text-[12px] font-medium bg-slate-50 dark:bg-[#191d29] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors">
                <option>30 hari terakhir</option>
                <option>6 bulan terakhir</option>
                <option>Tahun ini</option>
              </select>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-60 w-full flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 pt-2 border-b border-slate-100 dark:border-slate-800/80">
            {monthlyData.map((d, index) => {
              const heightPercent = Math.round((d.count / maxProjectCount) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Angka di atas Bar */}
                  <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {d.count}
                  </span>
                  
                  {/* Tiang Bar Chart */}
                  <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800/60 rounded-t-lg relative flex items-end h-44 overflow-hidden">
                    <div 
                      className="w-full bg-[#1b887a] rounded-t-md group-hover:bg-[#156e62] transition-all duration-300" 
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  
                  {/* Label Nama Bulan */}
                  <span className="text-[12px] font-medium text-slate-600 dark:text-slate-400 mt-1 mb-1">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Proyek Donut Chart (4 Kolom) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Status Proyek
            </h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-3">
            {/* Donut Chart SVG */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" stroke="#f1f5f9" className="dark:stroke-slate-800" strokeWidth="12" fill="transparent" />
                {/* Teal Segment: Selesai */}
                <circle cx="50" cy="50" r="38" stroke="#1b887a" strokeWidth="12" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="128" strokeLinecap="round" />
                {/* Dark Blue/Slate Segment: Sedang Berprogress */}
                <circle cx="50" cy="50" r="38" stroke="#264653" strokeWidth="12" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="166" strokeLinecap="round" transform="rotate(165 50 50)" />
                {/* Amber/Orange Segment: Ulasan */}
                <circle cx="50" cy="50" r="38" stroke="#f4a261" strokeWidth="12" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="180" strokeLinecap="round" transform="rotate(275 50 50)" />
              </svg>
              {/* Inner Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                  1 125
                </span>
                <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Pengunjung
                </span>
              </div>
            </div>

            {/* Legend Labels */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-[12px] text-slate-600 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1b887a]"></span> Selesai
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#264653]"></span> Sedang Berprogress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></span> Ulasan
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Section Enam Kartu Modul: Rekayasa AI */}
      <div className="stagger-item stagger-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mb-3.5">
          Rekayasa AI
        </h2>
        
        {/* Grid 6 Modul dengan Tinggi, Padding, dan Spacing Konsisten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigateModule(m.id)}
                className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  {/* Top Bar: Icon Container & Arrow Right */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${m.iconColor}`} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Title & Badge */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {m.title}
                    </h3>
                    {m.badge && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 shrink-0">
                        {m.badge}
                      </span>
                    )}
                  </div>

                  {/* Description: 12-13px readable */}
                  <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Section Aktivitas Terbaru (Border Halus, Tipografi Jelas) */}
      <div className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs overflow-hidden stagger-item stagger-5">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Aktivitas Terbaru
          </h2>
          <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">
            Sinkronisasi otomatis
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/20">
                <th className="py-3 px-6">WAKTU</th>
                <th className="py-3 px-6">AKTIVITAS</th>
                <th className="py-3 px-6">MODUL</th>
                <th className="py-3 px-6">STATUS</th>
                <th className="py-3 px-6 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-[12px] sm:text-[13px]">
              {activities.map((act) => {
                const isSukses = act.status === 'Success';
                return (
                  <tr key={act.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {act.time}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-2.5">
                        {act.iconType === 'wbs' && <FileText className="w-4 h-4 text-blue-500 shrink-0" />}
                        {act.iconType === 'document' && <FileText className="w-4 h-4 text-amber-500 shrink-0" />}
                        {act.iconType === 'asset' && <Activity className="w-4 h-4 text-teal-400 shrink-0" />}
                        {act.iconType === 'rfq' && <ShoppingCart className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {act.iconType === 'academy' && <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />}
                        <span>{act.activity}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {act.module}
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${
                        isSukses ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isSukses ? 'bg-emerald-500' : 'bg-amber-400'
                        }`} />
                        {isSukses ? 'Sukses' : 'Tertunda'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors">
                        <MoreHorizontal className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
