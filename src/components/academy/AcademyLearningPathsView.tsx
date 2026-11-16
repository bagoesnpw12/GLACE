import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Award, 
  Layers, 
  Bell,
  Box,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface LearningPathsViewProps {
  onAddActivity?: (activity: string, module: string) => void;
  onSelectSubItem?: (item: string) => void;
}

interface LearningPathCard {
  id: string;
  moduleLevel: string;
  title: string;
  totalCourses: number;
  totalHours: number;
  progress: number;
  statusText: string;
  phaseLabel: string;
}

export const AcademyLearningPathsView: React.FC<LearningPathsViewProps> = ({ 
  onAddActivity,
  onSelectSubItem 
}) => {
  const [notification, setNotification] = useState<string | null>(null);

  // 4 Core Learning Paths matching Reference Layout (2x2 Grid)
  const [paths, setPaths] = useState<LearningPathCard[]>([
    {
      id: 'lp-1',
      moduleLevel: 'MODUL DASAR KEAHLIAN',
      title: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      totalCourses: 6,
      totalHours: 18,
      progress: 40,
      statusText: 'Terakhir diakses kemarin',
      phaseLabel: 'Lanjutkan'
    },
    {
      id: 'lp-2',
      moduleLevel: 'MODUL DASAR KEAHLIAN',
      title: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      totalCourses: 6,
      totalHours: 18,
      progress: 70,
      statusText: 'Hampir Selesai',
      phaseLabel: 'Lanjutkan'
    },
    {
      id: 'lp-3',
      moduleLevel: 'MODUL DASAR KEAHLIAN',
      title: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      totalCourses: 6,
      totalHours: 18,
      progress: 10,
      statusText: 'Bab 1: Pengenalan AI Pipeline',
      phaseLabel: 'Lanjutkan'
    },
    {
      id: 'lp-4',
      moduleLevel: 'MODUL DASAR KEAHLIAN',
      title: 'Arsitektur Cloud & Keamanan Data Perusahaan',
      totalCourses: 6,
      totalHours: 18,
      progress: 0,
      statusText: 'Belum Dimulai',
      phaseLabel: 'Lanjutkan'
    }
  ]);

  const handleContinue = (path: LearningPathCard) => {
    setPaths(prev => prev.map(p => {
      if (p.id === path.id) {
        const nextProgress = Math.min(p.progress + 15, 100);
        return {
          ...p,
          progress: nextProgress,
          statusText: nextProgress === 100 ? 'Selesai & Lulus' : 'Aktif dipelajari'
        };
      }
      return p;
    }));
    setNotification(`Melanjutkan alur belajar: ${path.title}`);
    if (onAddActivity) {
      onAddActivity(`Melanjutkan Learning Path: ${path.title}`, 'Glace Academy');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProposeCustomPath = () => {
    setNotification('Permintaan pengajuan alur kurikulum kustom telah diteruskan ke Head of Technical Training.');
    if (onAddActivity) {
      onAddActivity('Mengajukan kurikulum kustom tim', 'Glace Academy');
    }
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* 1. Header Bar: Sub-Brand Learning Hub & Quick Nav */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Learning Hub
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Internal Portal
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <button 
            type="button" 
            onClick={() => onSelectSubItem && onSelectSubItem('Courses')}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors pb-1"
          >
            Courses
          </button>
          <button 
            type="button" 
            className="font-semibold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1"
          >
            Learning Paths
          </button>
          <button 
            type="button" 
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Pemberitahuan Akademik"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Metadata Strip as in Reference */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Learning Paths
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Kurikulum Terstruktur</span>
          <span className="text-slate-400">•</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">4 Jalur Aktif</span>
        </div>
      </div>

      {/* Description Strip & Average Completion Rate */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-bold text-slate-900 dark:text-white">
            Learning Paths
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            Jelajahi alur kompetensi terpadu untuk mengakselerasi kapabilitas teknis dan kepatuhan regulasi secara sistematis.
          </p>
        </div>
        <div className="shrink-0 text-slate-600 dark:text-slate-300 font-medium">
          Rata-rata penyelesaian: <strong className="text-blue-600 dark:text-blue-400">30%</strong>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. 2x2 Grid Layout for Learning Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {paths.map((p) => (
          <div 
            key={p.id}
            className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {p.moduleLevel}
                  </div>
                  <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {p.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <Box className="w-4 h-4" />
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {p.totalCourses} Kursus • {p.totalHours} Jam
              </div>
            </div>

            {/* Progress Percentage Display */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <span>Progres</span>
                <span>{p.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full ${p.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Row: Action & Status */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
              <button
                type="button"
                onClick={() => handleContinue(p)}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{p.phaseLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-slate-400 font-medium">
                {p.statusText}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Banner: Kebutuhan Kurikulum Khusus? */}
      <div className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">
            Kebutuhan Kurikulum Khusus?
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Pimpinan unit kerja dapat mengusulkan alur belajar kustom untuk sertifikasi tim atau kepatuhan audit internal.
          </p>
        </div>
        <button
          type="button"
          onClick={handleProposeCustomPath}
          className="px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
        >
          Ajukan Jalur Pembelajaran
        </button>
      </div>
    </div>
  );
};
