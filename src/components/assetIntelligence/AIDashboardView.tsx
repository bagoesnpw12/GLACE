import React, { useMemo } from 'react';
import { 
  EngineeringAsset, 
  AssetMaintenanceWorkOrder, 
  AssetInspection,
  formatIDR 
} from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  AlertOctagon
} from 'lucide-react';

interface AIDashboardViewProps {
  assets: EngineeringAsset[];
  workOrders: AssetMaintenanceWorkOrder[];
  inspections: AssetInspection[];
  onNavigateSubmenu: (submenu: string) => void;
  onSelectAssetForDetail?: (asset: EngineeringAsset) => void;
}

export const AIDashboardView: React.FC<AIDashboardViewProps> = ({
  assets,
  workOrders,
  inspections,
  onNavigateSubmenu,
  onSelectAssetForDetail
}) => {
  // Metrik riil
  const totalAssets = assets.length;
  const goodAssets = assets.filter(a => a.condition === 'Baik').length;
  const warningAssets = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const criticalAssets = assets.filter(a => a.condition === 'Kritis').length;

  const avgHealth = useMemo(() => {
    if (totalAssets === 0) return 0;
    const sum = assets.reduce((acc, curr) => acc + curr.healthIndex, 0);
    return Math.round(sum / totalAssets);
  }, [assets, totalAssets]);

  const upcomingMaintenance = useMemo(() => {
    return [...workOrders].filter(w => w.status !== 'Selesai').slice(0, 3);
  }, [workOrders]);

  const warningsList = useMemo(() => {
    const list: Array<{ title: string; desc: string; type: 'kritis' | 'perhatian'; date: string }> = [];
    assets.filter(a => a.condition === 'Kritis').forEach(a => {
      list.push({
        title: `Kondisi Kritis: ${a.code} (${a.name})`,
        desc: a.damageIndicators[0] || 'Health index di bawah ambang batas aman',
        type: 'kritis',
        date: a.lastInspectionDate
      });
    });
    assets.filter(a => a.condition === 'Perlu Perhatian').slice(0, 2).forEach(a => {
      list.push({
        title: `Perhatian Khusus: ${a.code}`,
        desc: a.damageIndicators[0] || 'Gejala keausan dini terdeteksi',
        type: 'perhatian',
        date: a.lastInspectionDate
      });
    });
    return list;
  }, [assets]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Bar Sesuai Referensi 1 Kiri */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Asset Intelligence
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pemantauan kesehatan aset industri, analitik prediktif, jadwal pemeliharaan, dan inspeksi lapangan.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 1 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total products</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Refunded</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Row 2: Status Aset & Kondisi Aset Sesuai Referensi 1 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Aset Kartu dengan Donut Minimalis */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Status Aset</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Distribusi status seluruh aset.</p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Donut Ring Visual */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-zinc-100 dark:text-[#18191f]"
                  />
                  {/* Teal/Dark slice */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#0d9488"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                    className="dark:stroke-zinc-300"
                  />
                  {/* Amber/Grey slice */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f97316"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="180"
                    strokeLinecap="round"
                    className="dark:stroke-zinc-600"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1 125</span>
                  <span className="text-[10px] text-zinc-400">Visitors</span>
                </div>
              </div>

              {/* Legend List Sesuai Screenshot */}
              <div className="space-y-3 text-xs w-full max-w-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-zinc-300" />
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">Sudah</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-zinc-900 dark:text-zinc-100 font-semibold">
                    <span>$183.96</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-zinc-600" />
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">Belum</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-zinc-900 dark:text-zinc-100 font-semibold">
                    <span>$22.31</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-[#23252c] mt-4 text-center">
            <button
              onClick={() => onNavigateSubmenu('Asset Register')}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all payments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kondisi Aset Kartu Sesuai Referensi 1 Kiri */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Kondisi Aset</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Distribusi kondisi aset berdasarkan health index.</p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-700 dark:text-zinc-300">Optimal (Indeks 85 - 100)</span>
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">{goodAssets} Unit</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 dark:bg-white h-full rounded-full" style={{ width: `${totalAssets > 0 ? (goodAssets / totalAssets) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-700 dark:text-zinc-300">Cukup (Indeks 70 - 84)</span>
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">{warningAssets} Unit</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 dark:bg-zinc-400 h-full rounded-full" style={{ width: `${totalAssets > 0 ? (warningAssets / totalAssets) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-700 dark:text-zinc-300">Kritis (Indeks &lt; 70)</span>
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">{criticalAssets} Unit</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 dark:bg-zinc-600 h-full rounded-full" style={{ width: `${totalAssets > 0 ? (criticalAssets / totalAssets) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-[#23252c] mt-4 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Rata-rata Portofolio: {avgHealth} / 100</span>
            <button
              onClick={() => onNavigateSubmenu('Asset Health')}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Monitor Kesehatan Detail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Row 3: Jadwal Maintenance & Notifikasi & Peringatan Sesuai Referensi 1 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jadwal Maintenance */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#23252c]">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Jadwal Maintenance</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Daftar jadwal maintenance yang akan datang.</p>
            </div>
            <button
              onClick={() => onNavigateSubmenu('Maintenance')}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium cursor-pointer"
            >
              Kelola WO &gt;
            </button>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-[#23252c] mt-1">
            {upcomingMaintenance.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-400">
                Belum ada data kondisi aset
              </div>
            ) : (
              upcomingMaintenance.map((wo) => (
                <div key={wo.id} className="py-3 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block truncate">
                      {wo.assetName}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {wo.woNumber} • {wo.type}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                    {wo.scheduledDate}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notifikasi & Peringatan */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#23252c]">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Notifikasi & Peringatan</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Peringatan kondisi aset, maintenance, dan potensi risiko.</p>
            </div>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-[#23252c] mt-1">
            {warningsList.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-400">
                Belum ada data kondisi aset
              </div>
            ) : (
              warningsList.slice(0, 3).map((w, idx) => (
                <div key={idx} className="py-3 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 dark:bg-white mt-1.5 shrink-0" />
                  <div className="flex-1 truncate">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block truncate">
                      {w.title}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate block">
                      {w.desc}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                    {w.date}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 5. Row 4: Tren Health Aset & Prediksi Maintenance Sesuai Referensi 1 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tren Health Aset */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tren Health Aset</h3>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Perkembangan kondisi aset dari waktu ke waktu.</p>

          <div className="h-28 flex items-end justify-between gap-3 pt-6 px-1">
            {[
              { month: 'Des', score: 86 },
              { month: 'Jan', score: 84 },
              { month: 'Feb', score: 81 },
              { month: 'Mar', score: 83 },
              { month: 'Apr', score: 79 },
              { month: 'Mei', score: avgHealth },
            ].map((pt, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-zinc-100 dark:bg-[#18191f] rounded-t h-20 flex items-end">
                  <div
                    className="w-full bg-blue-600 dark:bg-white rounded-t transition-all"
                    style={{ height: `${pt.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-zinc-400">{pt.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prediksi Maintenance */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Prediksi Maintenance</h3>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Analisis risiko dan rekomendasi maintenance.</p>

            <div className="mt-4 p-3 rounded-lg border border-zinc-100 dark:border-[#23252c] bg-zinc-50/60 dark:bg-[#18191f]/60 text-xs space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                Rekomendasi Prediktif Minggu Ini
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Unit Chiller 350 TR dan MDP 3200A terdeteksi berisiko mengalami trip dalam 72 jam jika beban puncak melampaui 80%.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-[#23252c] mt-3 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Prediktif akurasi 96.4%</span>
            <button
              onClick={() => onNavigateSubmenu('Digital Twin')}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Digital Twin 3D &gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
