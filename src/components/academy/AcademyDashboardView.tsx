import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  Play, 
  Clock, 
  BookOpen, 
  Search, 
  FileText, 
  Download, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Compass
} from 'lucide-react';

interface AcademyDashboardProps {
  onAddActivity: (activity: string, module: string) => void;
  onNavigateSubmenu?: (subItem: string) => void;
}

export interface CourseCardItem {
  id: string;
  code: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  difficulty: 'Dasar' | 'Menengah' | 'Tingkat Lanjut';
  progress: number;
  completedLessons: number;
  totalLessons: number;
  visualType: 'electrical' | 'plc' | 'bim' | 'ai';
  status: 'In Progress' | 'Completed' | 'Not Started';
}

export const AcademyDashboardView: React.FC<AcademyDashboardProps> = ({ 
  onAddActivity,
  onNavigateSubmenu 
}) => {
  const [courses, setCourses] = useState<CourseCardItem[]>([
    {
      id: 'crs-1',
      code: 'ENG-ELE-101',
      title: 'Dasar Sistem Kelistrikan Industri',
      category: 'Teknik Elektro & Distribusi',
      instructor: 'Ir. Ahmad Zarkasih, IPU',
      duration: '16 Jam Pelatihan',
      difficulty: 'Dasar',
      progress: 25,
      completedLessons: 12,
      totalLessons: 48,
      visualType: 'electrical',
      status: 'In Progress'
    },
    {
      id: 'crs-2',
      code: 'ENG-PLC-201',
      title: 'PLC & SCADA untuk Industri',
      category: 'Otomasi & Kontrol Proses',
      instructor: 'Dr. Ir. Hendra Saputra, IPM',
      duration: '20 Jam Pelatihan',
      difficulty: 'Menengah',
      progress: 60,
      completedLessons: 18,
      totalLessons: 30,
      visualType: 'plc',
      status: 'In Progress'
    },
    {
      id: 'crs-3',
      code: 'ENG-BIM-301',
      title: 'Industrial 3D Modeling (Plant Design)',
      category: 'Piping & Struktur Mekanikal',
      instructor: 'Rian Pratama, ST, M.Eng',
      duration: '18 Jam Pelatihan',
      difficulty: 'Menengah',
      progress: 42,
      completedLessons: 10,
      totalLessons: 24,
      visualType: 'bim',
      status: 'In Progress'
    },
    {
      id: 'crs-4',
      code: 'ENG-AI-401',
      title: 'AI untuk Predictive Maintenance',
      category: 'Machine Learning Industri',
      instructor: 'Budi Santoso, MT, CSCA',
      duration: '14 Jam Pelatihan',
      difficulty: 'Tingkat Lanjut',
      progress: 15,
      completedLessons: 3,
      totalLessons: 20,
      visualType: 'ai',
      status: 'In Progress'
    }
  ]);

  const [certificates] = useState([
    {
      id: 'cert-1',
      title: 'Dasar Sistem Kelistrikan Industri',
      certificateNo: 'GLC-CERT-2025-0912',
      issuedDate: '12 Sep 2025',
      status: 'Terverifikasi'
    },
    {
      id: 'cert-2',
      title: 'PLC & SCADA untuk Industri',
      certificateNo: 'GLC-CERT-2025-0828',
      issuedDate: '28 Agu 2025',
      status: 'Terverifikasi'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleContinueCourse = (course: CourseCardItem) => {
    setCourses(prev => prev.map(c => {
      if (c.id === course.id) {
        const nextLessons = Math.min(c.completedLessons + 1, c.totalLessons);
        const nextProgress = Math.round((nextLessons / c.totalLessons) * 100);
        return {
          ...c,
          completedLessons: nextLessons,
          progress: nextProgress,
          status: nextProgress === 100 ? 'Completed' : 'In Progress'
        };
      }
      return c;
    }));
    showToast(`Melanjutkan modul: ${course.title}`);
    onAddActivity(`Melanjutkan modul pelajaran: ${course.title}`, 'Glace Academy');
  };

  const handleDownloadCert = (certTitle: string, certNo: string) => {
    showToast(`Mengunduh berkas sertifikat digital: ${certNo}...`);
    onAddActivity(`Mengunduh sertifikat kompetensi: ${certTitle} (${certNo})`, 'Glace Academy');
  };

  const totalCoursesEnrolled = courses.length;
  const completedCoursesCount = courses.filter(c => c.progress === 100).length;
  const inProgressCoursesCount = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalLearningHours = '68 Jam';
  const totalCertificatesEarned = certificates.length;

  return (
    <div className="space-y-6 max-w-7xl pb-12">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Akademi Glace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Platform pengembangan kompetensi dan pembelajaran teknik industri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateSubmenu && (
            <button
              onClick={() => onNavigateSubmenu('Learning Paths')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Eksplor Alur Belajar
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. Ringkasan KPI Relevan Industri */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Kursus Diikuti</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalCoursesEnrolled}</div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">{inProgressCoursesCount} sedang aktif</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Kursus Selesai</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{completedCoursesCount}</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 block">Lulus evaluasi ujian</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Jam Pembelajaran</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalLearningHours}</div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Total durasi materi</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Sertifikat Diperoleh</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalCertificatesEarned}</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 block">Terverifikasi digital</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900/50">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Katalog Kursus Saya */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Kursus Saya
            </h2>
          </div>
          {onNavigateSubmenu && (
            <button
              onClick={() => onNavigateSubmenu('Courses')}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              Lihat Katalog Kursus Lengkap
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="relative h-28 bg-[#181d2a] p-3 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  {course.visualType === 'electrical' && (
                    <svg className="w-full h-full text-blue-500/30" viewBox="0 0 200 80" fill="none">
                      <polygon points="20,70 60,20 100,70" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
                      <polygon points="80,70 120,30 160,70" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
                      <line x1="10" y1="50" x2="190" y2="50" stroke="#3b82f6" strokeWidth="1.5" />
                    </svg>
                  )}
                  {course.visualType === 'plc' && (
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-5 h-12 rounded border border-slate-700 bg-slate-900/80 flex flex-col items-center justify-center">
                          <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        </div>
                      ))}
                    </div>
                  )}
                  {course.visualType === 'bim' && (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-7 rounded border border-emerald-500/40 bg-emerald-950/30" />
                      <div className="w-8 h-8 rounded border border-amber-500/40 bg-amber-950/30 -ml-3 mt-3" />
                      <div className="w-12 h-6 rounded border border-cyan-500/40 bg-cyan-950/30 -ml-2" />
                    </div>
                  )}
                  {course.visualType === 'ai' && (
                    <svg className="w-full h-full text-indigo-400/40" viewBox="0 0 200 80" fill="none">
                      <polyline points="20,60 70,55 120,25 170,40" stroke="#818cf8" strokeWidth="2.5" />
                      <circle cx="20" cy="60" r="4" fill="#a5b4fc" />
                      <circle cx="70" cy="55" r="4" fill="#a5b4fc" />
                      <circle cx="120" cy="25" r="4" fill="#818cf8" />
                      <circle cx="170" cy="40" r="4" fill="#818cf8" />
                    </svg>
                  )}
                </div>

                <div className="relative flex justify-end">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs font-mono">
                    {course.progress}%
                  </span>
                </div>

                <div className="relative w-full bg-slate-700/80 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-1 bg-white rounded-full transition-all duration-300" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {course.completedLessons} dari {course.totalLessons} pelajaran
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Instruktur: {course.instructor}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleContinueCourse(course)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <span>Lanjutkan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Section Bawah: Progress Belajar & Sertifikat Saya */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Progress Belajar */}
        <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Progress Belajar
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pencapaian kurikulum & total jam latihan teknik
              </p>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              01-07 Mei
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#0d9488"
                  strokeWidth="10"
                  strokeDasharray="238.76"
                  strokeDashoffset="95.5"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#f97316"
                  strokeWidth="10"
                  strokeDasharray="238.76"
                  strokeDashoffset="191"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute text-center">
                <div className="text-xl font-bold text-slate-900 dark:text-white">1,125</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Poin Teknik</div>
              </div>
            </div>

            <div className="space-y-3 flex-1 w-full text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Materi Selesai</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">43 Sesi</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Dalam Pengerjaan</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">79 Sesi</span>
              </div>

              <div className="pt-1 flex justify-end">
                {onNavigateSubmenu && (
                  <button
                    type="button"
                    onClick={() => onNavigateSubmenu('Learning Paths')}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Lihat semua kurikulum</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Sertifikat Saya */}
        <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sertifikat Saya
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Kredensial resmi yang telah berhasil Anda selesaikan
              </p>
            </div>
            {onNavigateSubmenu && (
              <button 
                onClick={() => onNavigateSubmenu('Certifications')}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
              >
                Lihat Semua
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-[#181d2a]/60 hover:border-indigo-400 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                    <span>GLACE ACADEMY</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {cert.title}
                  </h4>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Diterbitkan: {cert.issuedDate}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                    No: {cert.certificateNo}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Terverifikasi
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadCert(cert.title, cert.certificateNo)}
                    className="p-1 rounded text-slate-500 hover:text-indigo-600 transition-colors"
                    title="Unduh PDF Sertifikat"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
