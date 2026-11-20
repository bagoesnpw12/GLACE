import React, { useState } from 'react';
import { KnowledgeBaseItem, INITIAL_KNOWLEDGE_DUMMY } from '../../data/documentIntelligenceData';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '../ui/table';

interface DIKnowledgeBaseViewProps {
  items?: KnowledgeBaseItem[];
}

export const DIKnowledgeBaseView: React.FC<DIKnowledgeBaseViewProps> = ({
  items: initialItems
}) => {
  const [itemsList] = useState<KnowledgeBaseItem[]>(() => {
    return initialItems && initialItems.length > 0 ? initialItems : INITIAL_KNOWLEDGE_DUMMY;
  });

  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseItem | null>(null);

  // Kategori Cards Sesuai Referensi 4 (6 Kotak: (Kategori), (n) artikel)
  const categoryCards = [
    { name: '(Kategori)', count: '(n) artikel' },
    { name: '(Kategori)', count: '(n) artikel' },
    { name: '(Kategori)', count: '(n) artikel' },
    { name: '(Kategori)', count: '(n) artikel' },
    { name: '(Kategori)', count: '(n) artikel' },
    { name: '(Kategori)', count: '(n) artikel' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 4 */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Knowledge Base
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pusat repositori standar teknik, pedoman keselamatan kerja, dan panduan regulasi.
        </p>
      </div>

      {/* 2. Grid 3-Kolom Kartu Kategori Sesuai Referensi 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryCards.map((cat, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-4 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer select-none"
          >
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {cat.name}
            </h3>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
              {cat.count}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Tabel Artikel Terbaru Sesuai Referensi 4 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-[#23252c]">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Artikel Terbaru
          </h2>
        </div>

        {/* Standard GLACE Table Sesuai Referensi 4 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead className="text-right">Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsList.slice(0, 6).map((art, idx) => (
              <TableRow 
                key={art.id || idx}
                onClick={() => setSelectedArticle(art)}
                className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50 cursor-pointer"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                  (Judul artikel: {art.title})
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                  (Kategori: {art.category || 'Standar Rekayasa'})
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                  (Nama penulis: {art.author || 'Tim Ahli GLACE'})
                </TableCell>
                <TableCell className="text-right font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                  ({art.updated_at || 'Tanggal'})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Baca Artikel */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-xl max-w-xl w-full p-5 border border-zinc-200 dark:border-[#27272a] shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-[#23252c]">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{selectedArticle.title}</h3>
                <p className="text-xs text-zinc-400">{selectedArticle.category} • {selectedArticle.author}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed max-h-72 overflow-y-auto space-y-2">
              <p>{selectedArticle.summary || selectedArticle.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
