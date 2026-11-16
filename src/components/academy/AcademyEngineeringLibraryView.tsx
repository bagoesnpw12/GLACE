import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  ExternalLink, 
  Layers, 
  Filter, 
  CheckCircle2,
  Video,
  FileCode
} from 'lucide-react';

interface EngineeringLibraryProps {
  onAddActivity?: (activity: string, module: string) => void;
}

interface ReferenceDocItem {
  id: string;
  title: string;
  category: string;
  type: 'PDF' | 'Video' | 'CAD / DWG' | 'Interactive Code';
  updatedAt: string;
  docCode: string;
  fileSize: string;
}

export const AcademyEngineeringLibraryView: React.FC<EngineeringLibraryProps> = ({ onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [notification, setNotification] = useState<string | null>(null);

  // Categories corresponding to the pill filters in the reference image
  const categories = [
    'Semua',
    'Kelistrikan',
    'Otomasi & PLC',
    'Piping & Instrumentasi',
    'Keamanan Siber OT',
    'Standar Regulasi'
  ];

  // Document list matching the table in the reference design
  const [documents] = useState<ReferenceDocItem[]>([
    {
      id: 'doc-1',
      title: 'IEC 60076 Power Transformers Design Guide & Load Capacity Calculation',
      category: 'Kelistrikan',
      type: 'PDF',
      updatedAt: '12 Sep 2026',
      docCode: 'IEC-60076-1',
      fileSize: '4.8 MB'
    },
    {
      id: 'doc-2',
      title: 'Video Praktikum: Pemrograman PLC IEC 61131-3 & Structured Text di Wonderware',
      category: 'Otomasi & PLC',
      type: 'Video',
      updatedAt: '05 Sep 2026',
      docCode: 'VID-PLC-ST-02',
      fileSize: '128 MB (Full HD)'
    },
    {
      id: 'doc-3',
      title: 'IEEE 242 Buff Book: Industrial Protection Coordination & Relay Settings',
      category: 'Kelistrikan',
      type: 'PDF',
      updatedAt: '28 Agu 2026',
      docCode: 'IEEE-242-2001',
      fileSize: '8.2 MB'
    },
    {
      id: 'doc-4',
      title: 'ISO 19650 BIM Information Management: Mechanical Piping & Clash Matrix',
      category: 'Piping & Instrumentasi',
      type: 'PDF',
      updatedAt: '15 Agu 2026',
      docCode: 'ISO-19650-MEP',
      fileSize: '6.1 MB'
    },
    {
      id: 'doc-5',
      title: 'Video Walkthrough: Mitigasi Ancaman Siber Sistem Kontrol Industri IEC 62443',
      category: 'Keamanan Siber OT',
      type: 'Video',
      updatedAt: '01 Agu 2026',
      docCode: 'VID-CYB-62443',
      fileSize: '95 MB (Full HD)'
    }
  ]);

  const handleAccessDoc = (doc: ReferenceDocItem) => {
    setNotification(`Membuka akses dokumen referensi teknik: ${doc.docCode} — ${doc.title}...`);
    if (onAddActivity) {
      onAddActivity(`Mengakses referensi teknik: ${doc.docCode}`, 'Glace Academy');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDocs = documents.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.docCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || d.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Engineering Library
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Koleksi buku rujukan teknik industri, standar regulasi resmi, rekaman simulasi, dan panduan praktik lapangan.
        </p>
      </div>

      {notification && (
        <div className="p-3 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Search Bar & Filter Button matching the reference wireframe */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari referensi teknik, standar, atau topik..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

      {/* 2. Category Pills matching [Kategori] [Kategori] in Reference */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white dark:bg-[#131722] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Operational Reference Table matching the reference layout */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Referensi Teknis
          </h2>
          <span className="text-[11px] text-slate-400">
            Daftar pustaka berstandar industri dengan hak akses penuh
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#181d2a]/50 text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6 font-medium">Judul</th>
                <th className="py-3.5 px-4 font-medium">Kategori</th>
                <th className="py-3.5 px-4 font-medium">Tipe</th>
                <th className="py-3.5 px-4 font-medium">Update</th>
                <th className="py-3.5 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-[#181d2a]/30 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white max-w-md">
                    {doc.title}
                    <div className="text-[10px] text-slate-400 font-mono font-normal mt-0.5">
                      {doc.docCode} • {doc.fileSize}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {doc.category}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {doc.type === 'PDF' ? <FileText className="w-3 h-3 text-rose-500" /> : <Video className="w-3 h-3 text-blue-500" />}
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                    {doc.updatedAt}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleAccessDoc(doc)}
                      className="px-3.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Buka
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
