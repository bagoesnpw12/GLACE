import React, { useState } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import { Search } from 'lucide-react';

interface DIAISearchViewProps {
  documents: EngineeringDocument[];
  onPreviewDocument: (doc: EngineeringDocument) => void;
}

export const DIAISearchView: React.FC<DIAISearchViewProps> = ({
  documents,
  onPreviewDocument
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Cari');

  const sampleChips = [
    { label: '[Contoh pertanyaan]', text: 'spesifikasi trafo daya 60 MVA' },
    { label: '[Contoh pertanyaan]', text: 'kalkulasi beban chiller HVAC' },
    { label: '[Contoh pertanyaan]', text: 'SOP pengujian arc-flash' }
  ];

  const results = documents.filter(d => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.discipline.toLowerCase().includes(q) ||
      (d.content_text && d.content_text.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 2 Kanan */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          AI Search
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pencarian semantik dan ekstraksi cerdas berbasis Large Language Model.
        </p>
      </div>

      {/* 2. Search Bar dan Chips Cepat Sesuai Referensi 2 Kanan */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search holdings or tickers..."
            className="w-full pl-10 pr-28 py-2 text-xs rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
          <div className="absolute right-2 flex items-center gap-1.5 text-[11px]">
            {['Cari', 'ETFs', 'REITs'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedTag === tag 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' 
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Chips Contoh Pertanyaan Sesuai Referensi 2 */}
        <div className="flex flex-wrap items-center gap-2">
          {sampleChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(chip.text)}
              className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Container Hasil Pencarian Berulang Sesuai Referensi 2 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Hasil Pencarian
        </h2>

        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400">
              Tidak ditemukan dokumen yang cocok dengan kata kunci pencarian.
            </div>
          ) : (
            results.slice(0, 4).map((doc, idx) => (
              <div
                key={doc.id || idx}
                onClick={() => onPreviewDocument(doc)}
                className="p-4 rounded-xl border border-zinc-100 dark:border-[#23252c] bg-zinc-50/50 dark:bg-[#18191f]/60 hover:bg-zinc-100/60 dark:hover:bg-[#1c1d25] transition-colors cursor-pointer space-y-1.5"
              >
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  [{doc.title}]
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  (Kutipan teks hasil pencarian: {doc.content_text ? doc.content_text.slice(0, 160) : 'Klausul spesifikasi teknis dan standar uji kelayakan rekayasa sistem terverifikasi.'}...)
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  (Sumber: {doc.doc_type || 'Spesifikasi Teknis'}, Hal. {idx + 4})
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
