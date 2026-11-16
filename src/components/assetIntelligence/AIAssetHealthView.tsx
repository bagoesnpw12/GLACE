import React, { useMemo, useState } from 'react';
import { EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  X
} from 'lucide-react';

interface AIAssetHealthViewProps {
  assets: EngineeringAsset[];
  onNavigateToMaintenance?: (assetId: string) => void;
  onSelectAsset?: (asset: EngineeringAsset) => void;
}

export const AIAssetHealthView: React.FC<AIAssetHealthViewProps> = ({
  assets,
  onNavigateToMaintenance,
  onSelectAsset
}) => {
  const [selectedAssetForHistory, setSelectedAssetForHistory] = useState<EngineeringAsset | null>(null);

  // Top KPI calculations
  const totalAsset = assets.length;
  const assetSehat = assets.filter(a => a.condition === 'Baik').length;
  const perluPerhatian = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const kritis = assets.filter(a => a.condition === 'Kritis').length;

  // Categories list & average health per category
  const categoriesHealth = useMemo(() => {
    const map: Record<string, { total: number; sum: number }> = {};
    assets.forEach(a => {
      if (!map[a.category]) map[a.category] = { total: 0, sum: 0 };
      map[a.category].total += 1;
      map[a.category].sum += a.healthIndex;
    });

    return Object.entries(map).map(([cat, val]) => ({
      name: cat,
      avgScore: Math.round(val.sum / val.total)
    })).slice(0, 4); // Display top 4 like screenshot: Kategori A, B, C, D
  }, [assets]);

  // Aset Perlu Tindakan list
  const actionRequiredAssets = useMemo(() => {
    return assets
      .filter(a => a.condition === 'Kritis' || a.condition === 'Perlu Perhatian' || a.healthIndex < 80)
      .slice(0, 5);
  }, [assets]);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Asset Health
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Pemantauan Asset Health Index (0 - 100), grafik kondisi per kategori, dan daftar aset perlu tindakan.
        </p>
      </div>

      {/* Top 4 KPI Cards matching Screenshot: Total aset, Aset sehat, Perlu perhatian, Kritis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total aset</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalAsset}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aset sehat</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {assetSehat}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Perlu perhatian</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {perluPerhatian}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kritis</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {kritis}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Health per Kategori (Horizontal Bar Chart) & Aset Perlu Tindakan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health per Kategori Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Health per Kategori</h3>
            <p className="text-xs text-slate-400 mt-0.5">Rata-rata indeks kesehatan peralatan industri.</p>
          </div>

          {/* Horizontal Bar Chart matching Screenshot 1 Right */}
          <div className="space-y-5 pt-2">
            {categoriesHealth.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {item.name}
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {item.avgScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-6 rounded-md overflow-hidden relative">
                  <div
                    className="bg-blue-600 h-full rounded-md transition-all duration-700 flex items-center justify-end pr-2 text-white text-[10px] font-bold"
                    style={{ width: `${item.avgScore}%` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aset Perlu Tindakan Card matching Screenshot Table: Asset, Skor, Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Aset Perlu Tindakan</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daftar unit yang memerlukan tindakan inspeksi atau servis darurat.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3 text-center">Skor</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {actionRequiredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block line-clamp-1">
                          {asset.name}
                        </span>
                        <span className="font-mono text-[10px] text-blue-600">{asset.code}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                      {asset.healthIndex}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold ${
                        asset.condition === 'Baik'
                          ? 'bg-slate-100 text-slate-700'
                          : asset.condition === 'Perlu Perhatian'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {asset.condition}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setSelectedAssetForHistory(asset)}
                        className="px-2.5 py-1 rounded-lg border border-blue-600/30 text-blue-600 hover:bg-blue-50 text-[11px] font-semibold cursor-pointer"
                      >
                        Detail Riwayat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail Riwayat Kondisi Aset */}
      {selectedAssetForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 block">{selectedAssetForHistory.code}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Detail Riwayat Kondisi Aset
                </h3>
              </div>
              <button onClick={() => setSelectedAssetForHistory(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">{selectedAssetForHistory.name}</span>
                <span className="text-slate-500 block">{selectedAssetForHistory.location}</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-blue-600">Skor Health: {selectedAssetForHistory.healthIndex} / 100</span>
                  <span>•</span>
                  <span className="text-slate-500">Kondisi: {selectedAssetForHistory.condition}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Riwayat Telemetri & Temuan:</span>
                <div className="space-y-1.5">
                  {selectedAssetForHistory.damageIndicators.map((ind, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {ind}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Inspeksi Terakhir:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedAssetForHistory.lastInspectionDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jadwal Servis:</span>
                  <span className="font-semibold text-blue-600">{selectedAssetForHistory.nextMaintenanceDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              {onNavigateToMaintenance && (
                <button
                  onClick={() => {
                    const id = selectedAssetForHistory.id;
                    setSelectedAssetForHistory(null);
                    onNavigateToMaintenance(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Buat Work Order Servis
                </button>
              )}
              <button
                onClick={() => setSelectedAssetForHistory(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
