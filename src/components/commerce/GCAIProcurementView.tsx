import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Box, 
  Clock, 
  TrendingUp, 
  Building2, 
  Plus, 
  Check, 
  Layers 
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

  // Rekomendasi AI Dummy persis sesuai Screenshot 1 Kanan
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
    }, 600);
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
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          AI Procurement
        </h1>
      </div>

      {/* Input Kebutuhan Pengadaan Box persis Screenshot 1 Kanan */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Kebutuhan Pengadaan
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Jelaskan barang atau spesifikasi yang Anda cari
          </p>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">
            SPESIFIKASI DETAIL / KOMPONEN MATERIAL
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tuliskan spesifikasi kebutuhan material, rating daya, atau standar IEC/SNI..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Suggestion Chips & Tombol Cari Rekomendasi persis Screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Saran cepat:</span>
            <button
              type="button"
              onClick={() => setInputText('NYAF 1X2.5mm2')}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              NYAF 1X2.5mm2
            </button>
            <button
              type="button"
              onClick={() => setInputText('Busbar CU 20x3mm')}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              Busbar CU 20x3mm
            </button>
          </div>

          <button
            type="button"
            onClick={handleProcessRecommendation}
            disabled={isProcessing}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Memproses...' : 'Cari Rekomendasi'}</span>
          </button>
        </div>
      </div>

      {/* Area Rekomendasi AI persis Screenshot 1 Kanan */}
      {hasProcessed && (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Rekomendasi AI
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Hasil penyesuaian parameter berdasarkan kecocokan teknis dan harga pasar distributor resmi.
            </p>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {rec.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span>Supplier: <strong className="text-slate-600 dark:text-slate-300">{rec.supplier}</strong></span>
                      <span>•</span>
                      <span>Stok: {rec.stock}</span>
                      <span>•</span>
                      <span>Estimasi: {rec.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      HARGA SATUAN
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {rec.unitPrice}
                    </div>
                    <div className="text-[10px] text-slate-400">{rec.perUnit}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCreateRFQ(rec)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ BUAT RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
