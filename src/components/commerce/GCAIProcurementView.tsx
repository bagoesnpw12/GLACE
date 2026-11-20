import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface GCAIProcurementViewProps {
  onCreateRFQFromProcurement: (rfqData: { title: string; supplier: string; itemsCount: number; estimatedPrice: string }) => void;
}

export const GCAIProcurementView: React.FC<GCAIProcurementViewProps> = ({
  onCreateRFQFromProcurement
}) => {
  const [inputText, setInputText] = useState('kabel 1 core 2,5 mm2 untuk panel distribusi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(true);

  // Rekomendasi AI Dummy persis sesuai Referensi 2 Kiri
  const [recommendations, setRecommendations] = useState([
    {
      id: 'rec-01',
      title: 'Kabel NYAF 1x2.5mm2 Supreme (100 meter)',
      supplier: 'PT Supreme Cable Manufacturing',
      stock: '1.458 Roll',
      unitPrice: 'Rp 185.000',
      perUnit: 'per roll (100 m)',
      eta: '1-2 hari kerja'
    },
    {
      id: 'rec-02',
      title: 'Kabel NYAF 1x2.5mm2 Supreme (100 meter)',
      supplier: 'PT Supreme Cable Manufacturing',
      stock: '1.458 Roll',
      unitPrice: 'Rp 185.000',
      perUnit: 'per roll (100 m)',
      eta: '1-2 hari kerja'
    },
    {
      id: 'rec-03',
      title: 'Kabel NYAF 1x2.5mm2 Supreme (100 meter)',
      supplier: 'PT Supreme Cable Manufacturing',
      stock: '1.458 Roll',
      unitPrice: 'Rp 185.000',
      perUnit: 'per roll (100 m)',
      eta: '1-2 hari kerja'
    },
    {
      id: 'rec-04',
      title: 'Kabel NYAF 1x2.5mm2 Supreme (100 meter)',
      supplier: 'PT Supreme Cable Manufacturing',
      stock: '1.458 Roll',
      unitPrice: 'Rp 185.000',
      perUnit: 'per roll (100 m)',
      eta: '1-2 hari kerja'
    }
  ]);

  const handleProcessRecommendation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasProcessed(true);
    }, 400);
  };

  const handleCreateRFQ = (rec: any) => {
    onCreateRFQFromProcurement({
      title: rec.title,
      supplier: rec.supplier,
      itemsCount: 5,
      estimatedPrice: rec.unitPrice
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          AI Procurement
        </h1>
      </div>

      {/* 2. Top Card: Kebutuhan Pengadaan (Persis Referensi 2 Kiri) */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
            Kebutuhan Pengadaan
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
            Jelaskan barang atau spesifikasi yang Anda cari
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
            SPESIFIKASI DETAIL / KOMPONEN ANTENA
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#181a20] text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans resize-none"
            placeholder="Ketik kebutuhan material, nomor standar, atau toleransi ukuran..."
          />
        </div>

        {/* Saran Cepat Chips & Tombol Cari Rekomendasi */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 dark:text-zinc-500">Saran cepat:</span>
            <button
              type="button"
              onClick={() => setInputText('NYAF 1X2.5mm2')}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-[11px] font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              NYAF 1X2.5mm2
            </button>
            <button
              type="button"
              onClick={() => setInputText('Busbar CU 20x2mm')}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-[11px] font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Busbar CU 20x2mm
            </button>
          </div>

          <button
            type="button"
            onClick={handleProcessRecommendation}
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? 'Memproses AI...' : 'Cari Rekomendasi'}
          </button>
        </div>
      </div>

      {/* 3. Section: Rekomendasi AI (Persis Referensi 2 Kiri) */}
      <div className="space-y-3 pt-1">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Rekomendasi AI
          </h2>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
            Hasil penyesuaian parameter berdasarkan kecocokan teknis dan harga pasar distributor resmi.
          </p>
        </div>

        {/* 4 List Item Cards */}
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700 mt-0.5">
                  <Layers className="w-5 h-5 text-slate-600 dark:text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                    {rec.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    <span>Supplier: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{rec.supplier}</strong></span>
                    <span>•</span>
                    <span className="font-mono">Stok: {rec.stock}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-zinc-800">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                    HARGA SATUAN
                  </span>
                  <div className="text-xs font-bold text-slate-900 dark:text-zinc-100 mt-0.5 font-mono">
                    {rec.unitPrice}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 block">
                    {rec.perUnit}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCreateRFQ(rec)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  + BUAT RFQ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
