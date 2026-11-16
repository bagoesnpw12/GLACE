import React, { useState } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import { 
  Search, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  Tag,
  BookOpen,
  Eye,
  SlidersHorizontal,
  Bot
} from 'lucide-react';

interface DIAISearchViewProps {
  documents: EngineeringDocument[];
  onPreviewDocument: (doc: EngineeringDocument) => void;
}

export const DIAISearchView: React.FC<DIAISearchViewProps> = ({
  documents,
  onPreviewDocument
}) => {
  const [query, setQuery] = useState('');
  const [filterFormat, setFilterFormat] = useState('Semua');
  const [minScore, setMinScore] = useState<number>(70);

  const sampleChips = [
    { label: 'Sistem Pendingin Chiller', text: 'chiller refrigerasi HVAC' },
    { label: 'Gardu Induk 150 kV', text: 'gardu induk 150 kV trafo' },
    { label: 'Proteksi Relai & Arc-Flash', text: 'Berapa kapasitas beban trafo dan regulasi arc-flash?' }
  ];

  // Enhanced search results with computed similarity score, highlight snippets, and source sections
  const results = documents
    .map(d => {
      let score = 92;
      let matchedSnippet = d.content_text || 'Dokumen spesifikasi teknis mencakup ketentuan desain, toleransi fabrikasi, dan pengujian lapangan.';

      if (query.trim()) {
        const q = query.toLowerCase();
        const terms = q.split(' ').filter(Boolean);
        let hits = 0;
        
        terms.forEach(term => {
          if (d.title.toLowerCase().includes(term)) hits += 3;
          if (d.category.toLowerCase().includes(term)) hits += 2;
          if (d.discipline.toLowerCase().includes(term)) hits += 2;
          if (d.content_text && d.content_text.toLowerCase().includes(term)) hits += 2;
        });

        score = Math.min(99, 68 + hits * 7);
      }

      return {
        ...d,
        relevanceScore: score,
        snippet: matchedSnippet,
        sourceSection: d.category === 'Electrical SLD' ? 'Bab 3.4 Skema Single Line' : d.category === 'Technical Specification' ? 'Klausul 5.1 Spesifikasi Material' : 'Seksi 2.0 Gambar Teknis'
      };
    })
    .filter(d => {
      const matchFormat = filterFormat === 'Semua' ? true : d.doc_type === filterFormat;
      if (!query.trim()) return matchFormat;

      const q = query.toLowerCase();
      const matchText =
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.discipline.toLowerCase().includes(q) ||
        (d.content_text && d.content_text.toLowerCase().includes(q));

      return matchText && matchFormat;
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI Search
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pencarian semantik berteknologi Natural Language Processing (NLP) untuk menemukan klausul teknik, toleransi desain, dan standar proyek secara akurat.
          </p>
        </div>
      </div>

      {/* Hero Intelligent Search Bar Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tanyakan atau cari: misal 'spesifikasi trafo 60 MVA', 'standar baku mutu IPAL', atau 'kapasitas chiller'..."
            className="w-full pl-11 pr-28 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => {}}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cari AI</span>
            </button>
          </div>
        </div>

        {/* Format Filter Chips & Quick Suggestions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Filter Tipe:</span>
            {['Semua', 'PDF', 'DWG', 'DOCX'].map(fmt => (
              <button
                key={fmt}
                onClick={() => setFilterFormat(fmt)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterFormat === fmt
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {fmt === 'Semua' ? 'Semua Format' : fmt}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400">Saran:</span>
            {sampleChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(chip.text)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-600 dark:text-slate-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Summary & Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Hasil Pencarian AI
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Ditemukan {results.length} berkas yang relevan dengan kueri semantik
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Diurutkan berdasarkan <strong>Tingkat Relevansi AI</strong>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-2">
            <Bot className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Tidak Ada Dokumen yang Cocok
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba gunakan kata kunci umum seperti "trafo", "chiller", "IPAL", atau kosongkan kotak pencarian.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {results.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group"
              >
                <div className="space-y-2.5 flex-1">
                  {/* Metadata Chips Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50">
                      {item.doc_type}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {item.discipline}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-slate-500 font-mono">
                      {item.revision}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-[11px] text-slate-400">
                      Sumber: <strong className="text-slate-600 dark:text-slate-300">{item.sourceSection}</strong>
                    </span>
                  </div>

                  {/* Document Title */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Highlighted AI Snippet */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p className="line-clamp-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Kutipan Klausul: </span>
                      "{item.snippet}"
                    </p>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span>Penulis: <strong className="text-slate-600 dark:text-slate-300">{item.author}</strong></span>
                    <span>Diperbarui: {item.updated_at}</span>
                    <span>Ukuran: {item.file_size}</span>
                  </div>
                </div>

                {/* Right Relevancy Box & Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Relevansi AI
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {item.relevanceScore}%
                    </div>
                  </div>

                  <button
                    onClick={() => onPreviewDocument(item)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Klausul</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
