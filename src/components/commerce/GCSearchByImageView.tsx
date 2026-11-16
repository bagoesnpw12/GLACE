import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Plus, 
  FileImage,
  Send,
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

  // Produk mirip persis sesuai Screenshot 2 Kiri:
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
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Search by Image
        </h1>
      </div>

      {/* Top 2 Panels: Cari dengan gambar & TAMPILAN REFERENSI SEARCH UI persis Screenshot 2 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel Kiri: Cari dengan gambar (Upload Area) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white">
              Cari dengan gambar
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Unggah foto komponen untuk mencocokkan produk yang mirip
            </p>
          </div>

          {/* Upload Canvas Box */}
          <div className="h-44 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
            <img
              src="/assets/commerce/prd_linear_guide.svg"
              alt="Uploaded Component"
              className="w-48 h-28 object-contain opacity-90 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-500 font-mono bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded shadow-2xs">
                Mendukung file: DWG, PDF, PNG, JPG, STEP, IGES (Maks. 25MB)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 truncate max-w-xs">
              File aktif: <strong>{selectedFileName}</strong>
            </span>
            <button
              type="button"
              onClick={handleSimulateSearch}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isSearching ? 'Menganalisis Visual...' : 'Pilih file komponen'}</span>
            </button>
          </div>
        </div>

        {/* Panel Kanan: TAMPILAN REFERENSI SEARCH UI persis Screenshot */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              TAMPILAN REFERENSI SEARCH UI
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="h-28 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center p-2">
                <img
                  src="/assets/commerce/prd_linear_guide.svg"
                  alt="Reference 1"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-28 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center p-2">
                <img
                  src="/assets/commerce/prd_mcb_1p.svg"
                  alt="Reference 2"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ACTIVE MESH VIEWPORT
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Toleransi kecocokan: ± 0.025mm</span>
            <span className="text-emerald-600 font-bold">98.6% Akurasi</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Produk Mirip (4 Kandidat Terbaik) persis Screenshot 2 Kiri */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Produk Mirip
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            4 Kandidat Terbaik
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {similarProducts.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    {p.brand}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {p.matchScore}
                  </span>
                </div>

                <div className="h-40 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-3 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {p.title}
                  </h3>
                  <div className="text-[10px] text-slate-400">
                    Sumber: {p.supplier}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Harga Estimasi:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{p.price}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onCreateRFQFromImageSearch({
                    title: p.title,
                    supplier: p.supplier,
                    price: p.price
                  })}
                  className="w-full py-2 px-3 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
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
