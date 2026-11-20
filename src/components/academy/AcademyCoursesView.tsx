import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bell, 
  BookOpen, 
  ShoppingCart, 
  Layers 
} from 'lucide-react';
import { TablePill } from '../ui/table';

interface CoursesViewProps {
  onAddActivity?: (activity: string, module: string) => void;
  onSelectSubItem?: (item: string) => void;
}

export const AcademyCoursesView: React.FC<CoursesViewProps> = ({ 
  onAddActivity,
  onSelectSubItem 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 6 Kursus Sesuai Referensi 1 Kanan (HUAWEI, SAMSUNG, APPLE, VIVO, OPPO, INFINIX)
  const courses = [
    { title: 'HUAWEI FUSION', brand: '[Huawei]', lessons: '[R] dari [M] pelajaran' },
    { title: 'SAMSUNG FUSION', brand: '[Samsung]', lessons: '[R] dari [M] pelajaran' },
    { title: 'APPLE FUSION', brand: '[Apple]', lessons: '[R] dari [M] pelajaran' },
    { title: 'VIVO FUSION', brand: '[Vivo]', lessons: '[R] dari [M] pelajaran' },
    { title: 'OPPO FUSION', brand: '[Oppo]', lessons: '[R] dari [M] pelajaran' },
    { title: 'INFINIX FUSION', brand: '[Infinix]', lessons: '[R] dari [M] pelajaran' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Top Bar: Title "Courses" + Learning Hub Pill Kiri + Link Kanan Sesuai Referensi 1 Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Courses
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="p-1 rounded bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Learning Hub</span>
            <span className="text-[10px] text-zinc-400">Internal Portal</span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            Courses: [Deskripsi singkat menu]
          </p>
        </div>

        {/* Tab Links Kanan Sesuai Screenshot */}
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <button className="text-zinc-900 dark:text-zinc-100 font-semibold cursor-pointer">
            Courses
          </button>
          <button 
            onClick={() => onSelectSubItem && onSelectSubItem('Learning Paths')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            Learning Paths
          </button>
          <button className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Search Input & Filter Button Sesuai Referensi 1 Kanan */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
          />
        </div>

        <button
          onClick={() => alert('Filter kursus')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-[#18191f] cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <span>Filter</span>
        </button>
      </div>

      {/* 3. Grid 3-Kolom Kartu Kursus Sesuai Referensi 1 Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((crs, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-4 flex flex-col justify-between space-y-3 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                {crs.title}
              </h3>

              {/* Area Canvas Pratinjau Gambar Berarsir Merah Bertuliskan "Gambar" Sesuai Screenshot */}
              <div className="mt-2.5 w-full h-36 rounded-lg bg-zinc-100/70 dark:bg-[#18191f] border border-zinc-200/60 dark:border-[#27272a] relative overflow-hidden flex items-center justify-center select-none">
                <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <span className="text-xs font-medium text-rose-500/80 dark:text-zinc-400 z-10">
                  Gambar
                </span>
              </div>

              {/* Sub-info brand dan pelajaran */}
              <div className="mt-3 text-xs">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">{crs.brand}</span>
                <span className="text-[11px] text-zinc-400">{crs.lessons}</span>
              </div>
            </div>

            {/* Tombol + RFQ Sesuai Screenshot */}
            <button
              onClick={() => {
                if (onAddActivity) onAddActivity(`Mengikuti kursus ${crs.title}`, 'Glace Academy');
                alert(`Membuka pendaftaran: ${crs.title}`);
              }}
              className="w-full py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#18191f] text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-zinc-500" />
              <span>+ RFQ</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
