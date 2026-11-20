import React, { useState } from 'react';
import { 
  BookOpen, 
  Bell, 
  ChevronRight, 
  Box 
} from 'lucide-react';

interface LearningPathsViewProps {
  onAddActivity?: (activity: string, module: string) => void;
  onSelectSubItem?: (item: string) => void;
}

export const AcademyLearningPathsView: React.FC<LearningPathsViewProps> = ({ 
  onAddActivity,
  onSelectSubItem 
}) => {
  // 4 Kartu Modul Dasar Keahlian Sesuai Referensi 2 Kiri
  const paths = [
    {
      title: 'MODUL DASAR KEAHLIAN',
      sub: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      duration: '6 Kursus • 18 jam',
      progress: 40,
      statusText: 'Terakhir diakses kemarin',
    },
    {
      title: 'MODUL DASAR KEAHLIAN',
      sub: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      duration: '6 Kursus • 18 jam',
      progress: 70,
      statusText: 'Hampir Selesai',
    },
    {
      title: 'MODUL DASAR KEAHLIAN',
      sub: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      duration: '6 Kursus • 18 jam',
      progress: 10,
      statusText: 'Bab 1: Pengenalan AI Pipeline',
    },
    {
      title: 'MODUL DASAR KEAHLIAN',
      sub: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      duration: '6 Kursus • 18 jam',
      progress: 0,
      statusText: 'Belum Dimulai',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Bar: Title "Learning Paths" + Learning Hub Pill Kiri + Link Kanan Sesuai Referensi 2 Kiri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Learning Paths
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="p-1 rounded bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Learning Hub</span>
            <span className="text-[10px] text-zinc-400">Internal Portal</span>
          </div>
        </div>

        {/* Tab Links Kanan */}
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <button 
            onClick={() => onSelectSubItem && onSelectSubItem('Courses')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            Courses
          </button>
          <button className="text-zinc-900 dark:text-zinc-100 font-semibold cursor-pointer">
            Learning Paths
          </button>
          <button className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Banner Kurikulum Terstruktur Sesuai Referensi 2 Kiri */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-[#23252c]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Kurikulum Terstruktur</span>
            <span className="text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">4 Jalur Aktif</span>
          </div>
          <span className="text-xs text-zinc-500">Rata-rata penyelesaian: 30%</span>
        </div>

        <div className="pt-3">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Learning Paths</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Jelajahi alur kompetensi terpadu untuk mengekselerasi kapabilitas teknik dan kepatuhan regulasi secara sistematik.
          </p>
        </div>
      </div>

      {/* 3. Grid 2x2 Kartu Modul Sesuai Referensi 2 Kiri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {paths.map((p, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between space-y-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                  {p.title}
                </span>
                <Box className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {p.sub}
              </h3>
              <p className="text-xs text-zinc-400">
                {p.duration}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Progres</span>
                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{p.progress}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 dark:bg-white h-full rounded-full transition-all"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            {/* Action & Status */}
            <div className="pt-2 border-t border-zinc-100 dark:border-[#23252c] flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  if (onAddActivity) onAddActivity(`Melanjutkan modul ${p.sub}`, 'Glace Academy');
                  alert(`Melanjutkan alur belajar: ${p.sub}`);
                }}
                className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer"
              >
                Lanjutkan
              </button>
              <span className="text-zinc-400 text-[11px]">{p.statusText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Banner Bawah: Kebutuhan Kurikulum Khusus Sesuai Referensi 2 Kiri */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Kebutuhan Kurikulum Khusus?
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Pimpinan unit kerja dapat mengusulkan alur belajar kustom untuk sertifikasi tim atau kepatuhan audit internal.
          </p>
        </div>
        <button
          onClick={() => alert('Formulir pengajuan alur belajar')}
          className="text-xs font-semibold text-blue-600 dark:text-zinc-200 hover:underline shrink-0 cursor-pointer"
        >
          Ajukan Jalur Pembelajaran
        </button>
      </div>
    </div>
  );
};
