import React, { useState } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DIAIComparisonViewProps {
  documents: EngineeringDocument[];
}

export const DIAIComparisonView: React.FC<DIAIComparisonViewProps> = ({ documents }) => {
  const [docAId, setDocAId] = useState<string>(documents[0]?.id || 'doc-01');
  const [docBId, setDocBId] = useState<string>(documents[1]?.id || documents[0]?.id || 'doc-02');
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
      title: '(Bagian yang berbeda 1)',
      subtitle: 'Penyesuaian Spesifikasi Transformator Daya & Sistem Pendinginan',
      descA: 'Dokumen A: Klausul 4.2 - Kapasitas nominal 60 MVA ONAN/ONAF, isolasi minyak Mineral Class A.',
      descB: 'Dokumen B: Klausul 4.2 - Direvisi menjadi 60/70 MVA ONAN/OFAF dengan sistem pendingin ganda.'
    },
    {
      title: '(Bagian yang berbeda 2)',
      subtitle: 'Standar Pengujian Proteksi Arc Flash & Selektivitas Relay',
      descA: 'Dokumen A: Belum mencantumkan batas insiden energi arc flash spesifik.',
      descB: 'Dokumen B: Bab 7.1 menambahkan batas insiden busbar 8.4 cal/cm² sesuai IEEE 1584-2018.'
    },
    {
      title: '(Bagian yang berbeda 3)',
      subtitle: 'Toleransi Jarak Bebas Ruang Panel Kubikel 20 kV',
      descA: 'Dokumen A: Clear space depan panel minimum 1.500 mm.',
      descB: 'Dokumen B: Clear space disesuaikan menjadi 1.800 mm sesuai standar keselamatan.'
    },
    {
      title: '(Bagian yang berbeda 4)',
      subtitle: 'Ketentuan Garansi & Periode Pemeliharaan Vendor',
      descA: 'Dokumen A: Periode defek 12 bulan paska serah terima (BAST-1).',
      descB: 'Dokumen B: Diperpanjang menjadi 24 bulan mencakup suku cadang kritis.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 3 Kanan */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          AI Comparison
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Perbandingan otomatis perbedaan klausul, toleransi, dan revisi berkas teknik.
        </p>
      </div>

      {/* 2. Dua Panel Kolom Berdampingan Sesuai Referensi 3 Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Dokumen A */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
            Dokumen A
          </label>
          <div className="relative">
            <select
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden"
            >
              <option value="" disabled>(Pilih Dokumen)</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.revision})
                </option>
              ))}
            </select>
          </div>

          {/* Pratinjau Dokumen A Canvas Sesuai Referensi */}
          <div className="w-full h-64 rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-zinc-100/60 dark:bg-[#18191f] overflow-hidden flex items-center justify-center relative select-none">
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500 z-10 font-medium">
              (Pratinjau Dokumen)
            </span>
          </div>
        </div>

        {/* Panel Dokumen B dengan Border Biru Fokus Sesuai Gambar Referensi 3 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
            Dokumen B
          </label>
          <div className="relative">
            <select
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#121316] text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden"
            >
              <option value="" disabled>(Pilih Dokumen)</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.revision})
                </option>
              ))}
            </select>
          </div>

          {/* Pratinjau Dokumen B Canvas dengan Active Blue Focus Ring Sesuai Screenshot */}
          <div className="w-full h-64 rounded-xl border-2 border-blue-500 dark:border-blue-500 bg-zinc-100/60 dark:bg-[#18191f] overflow-hidden flex items-center justify-center relative select-none">
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500 z-10 font-medium">
              (Pratinjau Dokumen)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Ringkasan Perbedaan Sesuai Referensi 3 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-[#23252c]">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Ringkasan Perbedaan
            </h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              Dibuat oleh AI
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCompared(true)}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
          >
            Bandingkan
          </button>
        </div>

        {/* Daftar Accordion Perbedaan Bagian Sesuai Referensi */}
        <div className="divide-y divide-zinc-100 dark:divide-[#23252c]">
          {diffItems.map((item, idx) => {
            const isOpen = openSections[idx];
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <span>{item.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-2.5 p-3 rounded-lg bg-zinc-50/70 dark:bg-[#18191f]/70 border border-zinc-100 dark:border-[#27272a] text-xs space-y-1.5">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.subtitle}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {item.descA}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {item.descB}
                    </p>
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
