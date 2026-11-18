import React, { useMemo } from 'react';
import { 
  EngineeringAsset, 
  AssetMaintenanceWorkOrder, 
  AssetInspection,
  formatIDR 
} from '../../data/assetIntelligenceData';
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  Wrench, 
  Bell, 
  Cpu, 
  Zap,
  ArrowUpRight,
  Clock,
  Sparkles
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
  // 1. KPI Metrik
  const totalAssets = assets.length;
  const goodAssets = assets.filter(a => a.condition === 'Baik').length;
  const warningAssets = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const criticalAssets = assets.filter(a => a.condition === 'Kritis').length;

  // Percentage distribution for Status Aset Donut
  const goodPct = totalAssets > 0 ? Math.round((goodAssets / totalAssets) * 100) : 0;
  const warningPct = totalAssets > 0 ? Math.round((warningAssets / totalAssets) * 100) : 0;
  const criticalPct = totalAssets > 0 ? Math.round((criticalAssets / totalAssets) * 100) : 0;

  // Average Health Index
  const avgHealth = useMemo(() => {
    if (totalAssets === 0) return 0;
    const sum = assets.reduce((acc, curr) => acc + curr.healthIndex, 0);
    return Math.round(sum / totalAssets);
  }, [assets, totalAssets]);

  // Upcoming maintenance (top 3)
  const upcomingMaintenance = useMemo(() => {
    return [...workOrders]
      .filter(w => w.status !== 'Selesai')
      .slice(0, 3);
  }, [workOrders]);

  // Notifications and warnings
  const warningsList = useMemo(() => {
    const list: Array<{ title: string; desc: string; type: 'kritis' | 'perhatian' | 'info'; date: string }> = [];
    
    // Critical assets
    assets.filter(a => a.condition === 'Kritis').forEach(a => {
      list.push({
        title: `Kondisi Kritis: ${a.code} (${a.name})`,
        desc: a.damageIndicators[0] || 'Health index berada di bawah ambang batas aman',
        type: 'kritis',
        date: a.lastInspectionDate
      });
    });

    // Warning assets
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
    <div className="space-y-6">
      {/* Header bar matching Screenshot: Title "Asset Intelligence" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Asset Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitoring kesehatan aset industri, analitik prediktif, jadwal pemeliharaan, dan inspeksi lapangan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            DEMO DATA AKTIF
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards (Industrial Minimal Enterprise) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-item stagger-1">
        {/* Total Aset */}
        <div className="glace-card-interactive p-5 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Aset</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {totalAssets} Unit
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              9 Kategori Rekayasa Industri
            </span>
          </div>
        </div>

        {/* Aset Kondisi Baik */}
        <div className="glace-card-interactive p-5 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Aset Kondisi Baik</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {goodAssets} Unit
            </div>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
              <span>{goodPct}% dari total aset</span>
            </span>
          </div>
        </div>

        {/* Aset Perlu Perhatian */}
        <div className="glace-card-interactive p-5 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Aset Perlu Perhatian</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-slate-800/80 text-amber-600 dark:text-slate-300 border border-amber-200 dark:border-slate-700/60 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {warningAssets} Unit
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-blue-400/60"></span>
              <span>{warningPct}% butuh monitoring</span>
            </span>
          </div>
        </div>

        {/* Aset Kritis */}
        <div className="glace-card-interactive p-5 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Aset Kritis</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {criticalAssets} Unit
            </div>
            <span className="text-[11px] text-red-600 dark:text-red-400/90 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>Segera lakukan perbaikan</span>
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Status Aset (Donut Diagram) & Kondisi Aset (Health Index Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item stagger-2">
        {/* Status Aset (Minimal Dark Enterprise) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Status Aset</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Distribusi status seluruh aset operasional.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            {/* SVG Donut Chart Minimalis (Biru GLACE & Abu-abu) */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-200 dark:text-[#1a1f2c]" />
                {/* Segmen Kondisi Baik (Biru GLACE) */}
                <circle
                  cx="50" cy="50" r="38"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={`${(goodPct / 100) * 238.76} 238.76`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                {/* Segmen Perlu Perhatian (Slate Muted Blue) */}
                <circle
                  cx="50" cy="50" r="38"
                  stroke="#94a3b8"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={`${(warningPct / 100) * 238.76} 238.76`}
                  strokeDashoffset={`-${(goodPct / 100) * 238.76}`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                {/* Segmen Kritis (Red Wine Gelap) */}
                <circle
                  cx="50" cy="50" r="38"
                  stroke="#dc2626"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={`${(criticalPct / 100) * 238.76} 238.76`}
                  strokeDashoffset={`-${((goodPct + warningPct) / 100) * 238.76}`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{totalAssets}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Aset</span>
              </div>
            </div>

            {/* Legend & Breakdown matching screenshot */}
            <div className="space-y-3 w-full max-w-xs text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-[#1e2433]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Kondisi Baik</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{goodAssets} unit</span>
                  <span className="text-slate-500 dark:text-slate-400">({goodPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-[#1e2433]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Perlu Perhatian</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{warningAssets} unit</span>
                  <span className="text-slate-500">({warningPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-[#1e2433]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Kondisi Kritis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600 dark:text-red-400">{criticalAssets} unit</span>
                  <span className="text-slate-500">({criticalPct}%)</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateSubmenu('Asset Register')}
                className="w-full pt-1 text-center text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Lihat semua aset di Asset Register</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Kondisi Aset (Health Index Distribution & Top Healthy vs At Risk) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Kondisi Aset</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distribusi kondisi aset berdasarkan Health Index (0 - 100).</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Rata-rata Portofolio</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{avgHealth} / 100</span>
              </div>
            </div>

            {/* Health Score Bars breakdown */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-200">Optimal (Index 85 - 100)</span>
                  <span className="text-slate-500 dark:text-slate-400">{assets.filter(a => a.healthIndex >= 85).length} Unit</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181d2a] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(assets.filter(a => a.healthIndex >= 85).length / totalAssets) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Cukup (Index 70 - 84)</span>
                  <span className="text-slate-500 dark:text-slate-400">{assets.filter(a => a.healthIndex >= 70 && a.healthIndex < 85).length} Unit</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181d2a] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600/70 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(assets.filter(a => a.healthIndex >= 70 && a.healthIndex < 85).length / totalAssets) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Perhatian (Index 50 - 69)</span>
                  <span className="text-slate-500 dark:text-slate-400">{assets.filter(a => a.healthIndex >= 50 && a.healthIndex < 70).length} Unit</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181d2a] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-400 dark:bg-slate-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(assets.filter(a => a.healthIndex >= 50 && a.healthIndex < 70).length / totalAssets) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-red-600 dark:text-red-400">Kritis (Index &lt; 50)</span>
                  <span className="text-slate-500 dark:text-slate-400">{assets.filter(a => a.healthIndex < 50).length} Unit</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181d2a] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 dark:bg-red-600/80 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(assets.filter(a => a.healthIndex < 50).length / totalAssets) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#1a1f2c] mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Analisis sensor real-time & thermography</span>
            <button
              onClick={() => onNavigateSubmenu('Asset Health')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Detail Health Monitor</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Jadwal Maintenance & Notifikasi & Peringatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item stagger-3">
        {/* Jadwal Maintenance (Minimal Dark Enterprise) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Jadwal Maintenance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Daftar jadwal pemeliharaan yang akan datang.</p>
            </div>
            <button
              onClick={() => onNavigateSubmenu('Maintenance')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Kelola WO</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingMaintenance.map((wo) => (
              <div
                key={wo.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-[#1a1f2c] bg-slate-50 dark:bg-[#161a26] flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                      {wo.woNumber}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      wo.priority === 'Tinggi' 
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400/90 border border-red-200 dark:border-red-900/40' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50'
                    }`}>
                      {wo.priority}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {wo.assetName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {wo.workDescription}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                    {wo.scheduledDate}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                    {wo.technicianName.split('&')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifikasi & Peringatan (Tenang, Dark Reducer) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Notifikasi & Peringatan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Peringatan kondisi aset, maintenance, dan potensi risiko.</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>

          <div className="space-y-3">
            {warningsList.map((warn, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  warn.type === 'kritis'
                    ? 'border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-[#171317]'
                    : 'border-slate-200 dark:border-[#22283a] bg-slate-50 dark:bg-[#161a26]'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  warn.type === 'kritis' 
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50'
                }`}>
                  {warn.type === 'kritis' ? <AlertOctagon className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {warn.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{warn.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {warn.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Tren Health Aset & Prediksi Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item stagger-4">
        {/* Tren Health Aset (Monokrom Biru GLACE Minimal) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Tren Health Aset</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Perkembangan kondisi aset dari waktu ke waktu (6 bulan terakhir).</p>
          </div>

          {/* Sparkline Wave Chart Clean */}
          <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { month: 'Des 25', score: 86 },
              { month: 'Jan 26', score: 84 },
              { month: 'Feb 26', score: 81 },
              { month: 'Mar 26', score: 83 },
              { month: 'Apr 26', score: 79 },
              { month: 'Mei 26', score: avgHealth },
            ].map((pt, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {pt.score}%
                </span>
                <div className="w-full bg-slate-100 dark:bg-[#181d2a] rounded-t-lg h-24 flex items-end">
                  <div
                    className="w-full bg-blue-600/80 hover:bg-blue-500 rounded-t-lg transition-all duration-300"
                    style={{ height: `${pt.score}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{pt.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prediksi Maintenance (Dark Enterprise Blue Accent) */}
        <div className="glace-card-interactive p-6 rounded-2xl bg-white dark:bg-[#11141d] border border-slate-200/90 dark:border-[#1a1f2c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Prediksi Maintenance</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Analisis risiko dan rekomendasi maintenance berbasis AI Machine Learning.</p>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-[#1f2535] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Rekomendasi Prediktif Minggu Ini
                </span>
                <span className="text-[10px] bg-blue-500/15 border border-blue-500/25 text-blue-600 dark:text-blue-300 font-semibold px-2 py-0.5 rounded-full">
                  Prioritas
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Unit Chiller 350 TR dan MDP 3200A terdeteksi berisiko mengalami trip dalam 72 jam jika beban puncak melampaui 80%. Direkomendasikan melakukan re-torqueing busbar dan alignment bearing segera.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#1a1f2c] mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Akurasi model prediktif: 96.4%</span>
            <button
              onClick={() => onNavigateSubmenu('Digital Twin')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Buka Digital Twin 3D</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

