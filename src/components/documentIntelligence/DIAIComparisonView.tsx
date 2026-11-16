import React, { useState } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import { 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layers,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  Sparkles
} from 'lucide-react';

interface DIAIComparisonViewProps {
  documents: EngineeringDocument[];
}

export const DIAIComparisonView: React.FC<DIAIComparisonViewProps> = ({ documents }) => {
  const [docAId, setDocAId] = useState<string>(documents[0]?.id || 'doc-01');
  const [docBId, setDocBId] = useState<string>(documents[2]?.id || 'doc-03');
  const [compared, setCompared] = useState<boolean>(true);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  const toggleSection = (idx: number) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const docA = documents.find(d => d.id === docAId) || documents[0];
  const docB = documents.find(d => d.id === docBId) || documents[1] || documents[0];

  const diffItems = [
    {
      title: 'Bagian yang berbeda 1',
      subtitle: 'Penyesuaian Spesifikasi Transformator Daya & Sistem Pendinginan',
      type: 'MODIFIED',
      descA: 'Dokumen A: Klausul 4.2 - Kapasitas nominal 60 MVA ONAN/ONAF, isolasi minyak Mineral Class A, toleransi impedansi 12.5%.',
      descB: 'Dokumen B: Klausul 4.2 - Direvisi menjadi 60/70 MVA ONAN/OFAF dengan sistem pendingin ganda dan monitor gas DGA otomatis.',
      detail: 'Terdapat perubahan kapasitas pendinginan darurat (OFAF) dan penambahan klausul sensor gas dissolved gas analysis (DGA).'
    },
    {
      title: 'Bagian yang berbeda 2',
      subtitle: 'Standar Pengujian Proteksi Arc Flash & Selektivitas Relay',
      type: 'ADDED',
      descA: 'Dokumen A: Belum mencantumkan batas insiden energi arc flash spesifik.',
      descB: 'Dokumen B: Bab 7.1 menambahkan batas insiden busbar 8.4 cal/cm² dan kurva koordinasi trip overcurrent relay sesuai IEEE 1584-2018.',
      detail: 'Tambahan klausul keselamatan kerja K3 ketenagalistrikan sesuai regulasi terkini.'
    },
    {
      title: 'Bagian yang berbeda 3',
      subtitle: 'Toleransi Jarak Bebas Ruang Panel Kubikel 20 kV',
      type: 'CHANGED',
      descA: 'Dokumen A: Clear space depan panel minimum 1.500 mm, ventilasi natural louvre.',
      descB: 'Dokumen B: Clear space dinaikkan menjadi 1.800 mm dengan sistem ventilasi mekanis tekanan positif.',
      detail: 'Perubahan tata ruang sipil gedung gardu induk untuk ruang gerak rak penarikan breaker.'
    },
    {
      title: 'Bagian yang berbeda 4',
      subtitle: 'Sertifikasi Vendor Material & Garansi Fabrikasi',
      type: 'MODIFIED',
      descA: 'Dokumen A: Garansi manufaktur 12 bulan setelah tanggal serah terima pekerjaan (BAST-1).',
      descB: 'Dokumen B: Masa garansi diperpanjang menjadi 24 bulan dan mewajibkan sertifikat type-test laboratorium independen KEMA/CESI.',
      detail: 'Pengetatan syarat garansi dan verifikasi uji jenis demi keandalan sistem jangka panjang.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header: AI Comparison */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          AI Comparison
        </h1>
      </div>

      {/* Selectors Dokumen A & Dokumen B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dokumen A */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Dokumen A
            </label>
            <div className="relative">
              <select
                value={docAId}
                onChange={(e) => setDocAId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>[Pilih Dokumen]</option>
                {documents.map((d, i) => (
                  <option key={d.id} value={d.id}>
                    DOC-00{i + 1} - {d.title} ({d.revision})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Diagonal Hatched Preview Box: [Pratinjau Dokumen] */}
          <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* SVG Diagonal Hatching Pattern persis Figma */}
            <svg className="absolute inset-0 w-full h-full opacity-35 dark:opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalHatchA" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalHatchA)" />
            </svg>

            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 mb-2 shadow-xs">
                <FileText className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                [Pratinjau Dokumen]
              </span>
              {docA && (
                <div className="mt-2 text-[11px] text-slate-400 max-w-xs truncate">
                  {docA.title} · Rev {docA.revision}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dokumen B */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Dokumen B
            </label>
            <div className="relative">
              <select
                value={docBId}
                onChange={(e) => setDocBId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>[Pilih Dokumen]</option>
                {documents.map((d, i) => (
                  <option key={d.id} value={d.id}>
                    DOC-00{i + 1} - {d.title} ({d.revision})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Diagonal Hatched Preview Box: [Pratinjau Dokumen] */}
          <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* SVG Diagonal Hatching Pattern persis Figma */}
            <svg className="absolute inset-0 w-full h-full opacity-35 dark:opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalHatchB" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalHatchB)" />
            </svg>

            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 mb-2 shadow-xs">
                <FileText className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                [Pratinjau Dokumen]
              </span>
              {docB && (
                <div className="mt-2 text-[11px] text-slate-400 max-w-xs truncate">
                  {docB.title} · Rev {docB.revision}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ringkasan Perbedaan Card persis Figma */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ringkasan Perbedaan
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              [draf v1 / v2]
            </p>
          </div>

          <button
            onClick={() => setCompared(true)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs shadow-sm transition-all cursor-pointer"
          >
            Bandingkan
          </button>
        </div>

        {/* Diff Accordion / Items List persis Figma: [Bagian yang berbeda 1]..[Bagian yang berbeda 4] */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 border-t border-slate-100 dark:border-slate-800/80">
          {diffItems.map((item, idx) => {
            const isOpen = openSections[idx];
            return (
              <div key={idx} className="py-3.5 transition-colors">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      [{item.title}] — {item.subtitle}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-3.5 pl-5 pr-2 py-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 mt-0.5">
                        Dokumen A
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.descA}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Dokumen B
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.descB}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 italic">
                      💡 <strong>Catatan Perbedaan:</strong> {item.detail}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
