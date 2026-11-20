import React, { useState } from 'react';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TablePill } from '../ui/table';

interface AcademyDashboardProps {
  onAddActivity: (activity: string, module: string) => void;
  onNavigateSubmenu?: (subItem: string) => void;
}

export const AcademyDashboardView: React.FC<AcademyDashboardProps> = ({ 
  onAddActivity,
  onNavigateSubmenu 
}) => {
  const [courses] = useState([
    {
      id: 'crs-1',
      title: 'Dasar Sistem Kelistrikan Industri',
      lessons: '12 dari 48 pelajaran',
      progress: 25,
      graphicType: 'wave'
    },
    {
      id: 'crs-2',
      title: 'PLC & SCADA untuk Industri',
      lessons: '18 dari 30 pelajaran',
      progress: 60,
      graphicType: 'dots'
    },
    {
      id: 'crs-3',
      title: 'Industrial 3D Modeling (Plant Design)',
      lessons: '10 dari 24 pelajaran',
      progress: 42,
      graphicType: 'boxes'
    },
    {
      id: 'crs-4',
      title: 'AI untuk Predictive Maintenance',
      lessons: '3 dari 20 pelajaran',
      progress: 15,
      graphicType: 'line'
    }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner Sesuai Referensi 1 Kiri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-lg leading-snug">
            Tingkatkan Skill Engineering untuk Masa Depan Industri
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Platform pembelajaran teknis terstruktur dengan sertifikasi industri berstandar global.
          </p>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 1 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total products</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Refunded</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Kursus Saya Section Sesuai Referensi 1 Kiri */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-xs" />
          <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Kursus Saya
          </h2>
        </div>

        {/* Grid 4 Kartu Kursus Aktif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((crs) => (
            <div
              key={crs.id}
              className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-4 flex flex-col justify-between space-y-3 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
            >
              {/* Graphic Card Viewport */}
              <div className="w-full h-28 rounded-lg bg-zinc-900 dark:bg-[#18191f] text-white p-3 relative flex flex-col justify-between overflow-hidden select-none">
                <div className="flex justify-end">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {crs.progress}%
                  </span>
                </div>
                
                {/* Visual Graphic Schematic Placeholder */}
                <div className="flex items-center justify-center h-12 opacity-80">
                  {crs.graphicType === 'wave' && (
                    <div className="flex items-end gap-1.5 h-8">
                      <span className="w-2 h-4 bg-teal-400 rounded-xs" />
                      <span className="w-2 h-8 bg-blue-400 rounded-xs" />
                      <span className="w-2 h-6 bg-teal-300 rounded-xs" />
                      <span className="w-2 h-3 bg-blue-500 rounded-xs" />
                    </div>
                  )}
                  {crs.graphicType === 'dots' && (
                    <div className="grid grid-cols-4 gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                    </div>
                  )}
                  {crs.graphicType === 'boxes' && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-teal-500/80 rounded-xs" />
                      <span className="w-6 h-6 bg-blue-600/90 rounded-xs" />
                    </div>
                  )}
                  {crs.graphicType === 'line' && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-10 h-0.5 bg-amber-300 -rotate-12" />
                      <span className="w-3 h-3 rounded-full bg-purple-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Info */}
              <div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {crs.title}
                </h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {crs.lessons}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onNavigateSubmenu) onNavigateSubmenu('Courses');
                }}
                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Lanjutkan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Row Bawah: Progress Belajar (Kiri) & Sertifikat Saya (Kanan) Sesuai Referensi 1 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Belajar */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#23252c]">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Progress Belajar</h3>
              <span className="text-[11px] font-mono text-zinc-400">01-07 May</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Donut Progress Ring */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-zinc-100 dark:text-[#18191f]"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#0d9488"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                    className="dark:stroke-zinc-300"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f97316"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="180"
                    strokeLinecap="round"
                    className="dark:stroke-zinc-600"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1 125</span>
                  <span className="text-[10px] text-zinc-400">Visitors</span>
                </div>
              </div>

              {/* Legend List Sesuai Screenshot */}
              <div className="space-y-3 text-xs w-full max-w-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-zinc-300" />
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">Sudah</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-zinc-900 dark:text-zinc-100 font-semibold">
                    <span>$183.96</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-zinc-600" />
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">Belum</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-zinc-900 dark:text-zinc-100 font-semibold">
                    <span>$22.31</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-[#23252c] mt-4 text-center">
            <button
              onClick={() => {
                if (onNavigateSubmenu) onNavigateSubmenu('Courses');
              }}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all payments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sertifikat Saya */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#23252c]">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Sertifikat Saya</h3>
              <button
                onClick={() => {
                  if (onNavigateSubmenu) onNavigateSubmenu('Certifications');
                }}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium cursor-pointer"
              >
                Lihat semua &gt;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Certificate Card 1 */}
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#27272a] bg-zinc-50/70 dark:bg-[#18191f]/60 text-center space-y-2">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                  &gt; GLACE ACADEMY
                </span>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Dasar Sistem Kelistrikan Industri
                </h4>
                <p className="text-[10px] text-zinc-400">
                  Diterbitkan: 12 Sep 2025
                </p>
              </div>

              {/* Certificate Card 2 */}
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#27272a] bg-zinc-50/70 dark:bg-[#18191f]/60 text-center space-y-2">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                  &gt; GLACE ACADEMY
                </span>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  PLC & SCADA untuk Industri
                </h4>
                <p className="text-[10px] text-zinc-400">
                  Diterbitkan: 28 Agu 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
