import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '../ui/table';

interface EngineeringLibraryProps {
  onAddActivity?: (activity: string, module: string) => void;
}

export const AcademyEngineeringLibraryView: React.FC<EngineeringLibraryProps> = ({ onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Pill filter kategori sesuai Referensi 3: [Kategori] 5 kali
  const categories = [
    '[Kategori]',
    '[Kategori]',
    '[Kategori]',
    '[Kategori]',
    '[Kategori]'
  ];

  // Dokumen referensi sesuai tabel Referensi 3
  const documents = [
    { title: '[Judul Referensi]', category: '[Kategori]', type: '[PDF / Video]', update: '[tanggal]' },
    { title: '[Judul Referensi]', category: '[Kategori]', type: '[PDF / Video]', update: '[tanggal]' },
    { title: '[Judul Referensi]', category: '[Kategori]', type: '[PDF / Video]', update: '[tanggal]' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 3 */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Engineering Library
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Repositori literatur teknis, handbook rekayasa, standar internasional, dan video praktikum.
        </p>
      </div>

      {/* 2. Search Input & Filter Button Sesuai Referensi 3 */}
      <div className="space-y-3">
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
            onClick={() => alert('Filter dokumen')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-[#18191f] cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Filter</span>
          </button>
        </div>

        {/* Row Pill Kategori: [Kategori] [Kategori] [Kategori] Sesuai Screenshot */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-xs font-medium cursor-pointer transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Tabel Referensi Teknis Sesuai Referensi 3 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-[#23252c]">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Referensi Teknis
          </h2>
        </div>

        {/* Standard GLACE Table Sesuai Referensi 3 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Update</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, idx) => (
              <TableRow key={idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                  {doc.title}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                  {doc.category}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs font-mono">
                  {doc.type}
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                  {doc.update}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => {
                      if (onAddActivity) onAddActivity(`Membuka berkas ${doc.title}`, 'Glace Academy');
                      alert(`Membuka berkas: ${doc.title}`);
                    }}
                    className="px-3 py-1 rounded-full border border-zinc-200 dark:border-[#27272a] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#18191f] text-xs font-medium cursor-pointer"
                  >
                    Buka
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
