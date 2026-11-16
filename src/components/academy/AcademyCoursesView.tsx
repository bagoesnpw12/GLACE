import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  ChevronRight,
  Bell,
  Sparkles,
  Info
} from 'lucide-react';

interface CoursesViewProps {
  onAddActivity?: (activity: string, module: string) => void;
  onSelectSubItem?: (item: string) => void;
}

interface CourseItem {
  id: string;
  code: string;
  title: string;
  category: string;
  provider: string;
  completedLessons: number;
  totalLessons: number;
  duration: string;
  difficulty: 'Dasar' | 'Menengah' | 'Lanjutan';
  progress: number;
  description: string;
  tag: string;
}

export const AcademyCoursesView: React.FC<CoursesViewProps> = ({ 
  onAddActivity,
  onSelectSubItem 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [notification, setNotification] = useState<string | null>(null);

  // Realistic course catalog matching the Wide Grid reference layout
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: 'crs-1',
      code: 'HW-FUS-101',
      title: 'HUAWEI FUSION INDUSTRIAL CLOUD',
      provider: 'Huawei Enterprise',
      category: 'Cloud & Komputasi Industri',
      completedLessons: 12,
      totalLessons: 48,
      duration: '16 Jam Pelatihan',
      difficulty: 'Dasar',
      progress: 25,
      description: 'Arsitektur komputasi awan industri Huawei Fusion, orkestrasi kontainer pabrik pintar, dan manajemen telemetri data IoT edge.',
      tag: 'Huawei'
    },
    {
      id: 'crs-2',
      code: 'SS-FUS-201',
      title: 'SAMSUNG FUSION SMART MANUFACTURING',
      provider: 'Samsung SDS',
      category: 'Otomasi Manufaktur',
      completedLessons: 18,
      totalLessons: 30,
      duration: '20 Jam Pelatihan',
      difficulty: 'Menengah',
      progress: 60,
      description: 'Integrasi lini produksi semikonduktor, pemantauan otomatisasi jalur perakitan, dan standar efisiensi operasional MES.',
      tag: 'Samsung'
    },
    {
      id: 'crs-3',
      code: 'AP-FUS-301',
      title: 'APPLE FUSION HARDWARE & SECURITY',
      provider: 'Apple Industrial Tech',
      category: 'Keamanan Perangkat Keras',
      completedLessons: 10,
      totalLessons: 24,
      duration: '18 Jam Pelatihan',
      difficulty: 'Lanjutan',
      progress: 42,
      description: 'Implementasi hardware security module (HSM), enkripsi chip silikon industri, dan standardisasi keamanan data endpoint.',
      tag: 'Apple'
    },
    {
      id: 'crs-4',
      code: 'VV-FUS-401',
      title: 'VIVO FUSION OPTICAL SENSING',
      provider: 'Vivo R&D Industrial',
      category: 'Sensor & Optik Presisi',
      completedLessons: 6,
      totalLessons: 28,
      duration: '15 Jam Pelatihan',
      difficulty: 'Dasar',
      progress: 21,
      description: 'Kalibrasi sensor citra optik presisi tinggi, inspeksi cacat permukaan berbasis computer vision, dan integrasi kendali mutu.',
      tag: 'Vivo'
    },
    {
      id: 'crs-5',
      code: 'OP-FUS-501',
      title: 'OPPO FUSION FAST CHARGING & BATTERY',
      provider: 'Oppo Industrial Labs',
      category: 'Teknik Energi & Baterai',
      completedLessons: 14,
      totalLessons: 25,
      duration: '17 Jam Pelatihan',
      difficulty: 'Menengah',
      progress: 56,
      description: 'Manajemen siklus termal baterai berdaya besar, manajemen Battery Management System (BMS), dan efisiensi pengisian cepat industri.',
      tag: 'Oppo'
    },
    {
      id: 'crs-6',
      code: 'IN-FUS-601',
      title: 'INFINIX FUSION EMBEDDED TELEMETRY',
      provider: 'Infinix Hardware Labs',
      category: 'Sistem Tertanam (Embedded)',
      completedLessons: 4,
      totalLessons: 20,
      duration: '14 Jam Pelatihan',
      difficulty: 'Dasar',
      progress: 20,
      description: 'Protokol komunikasi berdaya rendah LPWAN, pemantauan status mikrokontroler sensor industri, dan debugging firmware RTOS.',
      tag: 'Infinix'
    }
  ]);

  const handleStartCourse = (course: CourseItem) => {
    setCourses(prev => prev.map(c => {
      if (c.id === course.id) {
        const next = Math.min(c.completedLessons + 1, c.totalLessons);
        return {
          ...c,
          completedLessons: next,
          progress: Math.round((next / c.totalLessons) * 100)
        };
      }
      return c;
    }));
    setNotification(`Melanjutkan sesi belajar: ${course.title} (${course.code})`);
    if (onAddActivity) {
      onAddActivity(`Melanjutkan kursus: ${course.title}`, 'Glace Academy');
    }
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredCourses = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

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
            className="font-semibold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1"
          >
            Courses
          </button>
          <button 
            type="button" 
            onClick={() => onSelectSubItem && onSelectSubItem('Learning Paths')}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors pb-1"
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

      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Courses
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Katalog lengkap modul pelatihan teknik industri, arsitektur cloud pabrik, dan sertifikasi komputasi.
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kursus, platform, atau teknologi industri..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button 
          type="button" 
          className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          Filter
        </button>
      </div>

      {/* 3. 3-Column Wide Grid Layout as in Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => (
          <div 
            key={c.id}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {/* Header Title */}
            <div>
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {c.title}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {c.provider} • {c.category}
              </div>
            </div>

            {/* Thumbnail Canvas Area as in Wireframe/Reference */}
            <div className="h-32 w-full rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/70 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold text-rose-500/80 dark:text-rose-400/80 uppercase tracking-widest block">
                  Gambar
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Modul Praktik Terverifikasi
                </span>
              </div>
              <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">
                {c.progress}%
              </span>
            </div>

            {/* Course Meta Info */}
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                [{c.tag}]
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                [{c.completedLessons}] dari [{c.totalLessons}] pelajaran • {c.duration}
              </div>
            </div>

            {/* Action Button: RFQ / Belajar */}
            <button
              type="button"
              onClick={() => handleStartCourse(c)}
              className="w-full py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400 dark:hover:border-blue-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>+ Mulai / Lanjutkan Belajar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
