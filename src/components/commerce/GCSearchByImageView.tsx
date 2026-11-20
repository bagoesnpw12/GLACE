import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  Eye, 
  Layers, 
  Plus, 
  CheckCircle2,
  X
} from 'lucide-react';

interface GCSearchByImageViewProps {
  onCreateRFQFromImageSearch: (prodData: { title: string; supplier: string; price: string }) => void;
}

export const GCSearchByImageView: React.FC<GCSearchByImageViewProps> = ({
  onCreateRFQFromImageSearch
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('linear_guide_sample.jpg');

  // Produk mirip persis sesuai Referensi 2 Kanan:
  // 3 Kartu Linear Guide Carriage Block BGH25CA Heavy Duty (MISUMI CORP • 98.6% cocok)
  const similarProducts = [
    {
      id: 'sim-01',
      brand: 'MISUMI CORP',
      matchScore: '98.6% cocok',
      title: 'Linear Guide Carriage Block BGH25CA Heavy Duty',
      supplier: 'PT Sentosa Presisi Mandiri',
      price: 'Rp 412.000',
      imageUrl: '/assets/commerce/prd_linear_guide.svg'
    },
    {
      id: 'sim-02',
      brand: 'MISUMI CORP',
      matchScore: '98.6% cocok',
      title: 'Linear Guide Carriage Block BGH25CA Heavy Duty',
      supplier: 'PT Sentosa Presisi Mandiri',
      price: 'Rp 412.000',
      imageUrl: '/assets/commerce/prd_linear_guide.svg'
    },
    {
      id: 'sim-03',
      brand: 'MISUMI CORP',
      matchScore: '98.6% cocok',
      title: 'Linear Guide Carriage Block BGH25CA Heavy Duty',
      supplier: 'PT Sentosa Presisi Mandiri',
      price: 'Rp 412.000',
      imageUrl: '/assets/commerce/prd_linear_guide.svg'
    }
  ];

  const handleSimulateSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Search by Image
        </h1>
      </div>

      {/* 2. Top 2 Panels: Cari dengan gambar & TAMPILAN REFERENSI SEARCH UI (Persis Referensi 2 Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Panel Kiri: Cari dengan gambar (Upload Area) (7 Kolom) */}
        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
              Cari dengan gambar
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
              Unggah foto komponen untuk menemukan produk yang mirip
            </p>

            {/* Dropzone Box */}
            <div className="mt-3 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-[#181a20]">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Gambar
              </p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-mono">
                Maksimal 10MB, JPG, JPEG, PNG, TIFF, HEIC (Maks 2048px)
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSimulateSearch}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Pilih file komponen
            </button>
          </div>
        </div>

        {/* Panel Kanan: Tampilan Referensi Search UI (5 Kolom) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
              TAMPILAN REFERENSI SEARCH UI
            </span>

            {/* Visual Viewport Placeholders */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="h-28 rounded-lg bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Preview 1</span>
              </div>
              <div className="h-28 rounded-lg bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Preview 2</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-300 block text-center uppercase tracking-wider">
                ACTIVE MATCH VIEWPORT
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
            <div>
              Toleransi kecocokan: <strong className="text-slate-700 dark:text-zinc-300">± 0.025mm</strong>
            </div>
            <div>
              Fitur embedding: <strong className="text-slate-700 dark:text-zinc-300 font-mono">98.6% identik</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section: Produk Mirip (Persis Referensi 2 Kanan) */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Produk Mirip
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-300">
            4 Kandidat Terbaik
          </span>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {similarProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-200">
                    {prod.brand}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {prod.matchScore}
                  </span>
                </div>

                <div className="h-40 rounded-lg bg-slate-50 dark:bg-[#181a20] border border-slate-100 dark:border-zinc-800/80 flex items-center justify-center p-3 mb-3">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  {prod.title}
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
                  Sumber: {prod.supplier}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 dark:text-zinc-500 text-[11px]">Harga Satuan:</span>
                  <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{prod.price}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => onCreateRFQFromImageSearch({
                    title: prod.title,
                    supplier: prod.supplier,
                    price: prod.price
                  })}
                  className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Minta penawaran</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
