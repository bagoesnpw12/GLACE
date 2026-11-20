import React, { useMemo } from 'react';
import { EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { TablePill } from '../ui/table';

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
  // Top KPI calculations
  const totalAsset = assets.length;
  const assetSehat = assets.filter(a => a.condition === 'Baik').length;
  const perluPerhatian = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const kritis = assets.filter(a => a.condition === 'Kritis').length;

  // Categories list & average health per category (Kategori A, B, C, D sesuai screenshot)
  const categoriesHealth = [
    { name: 'Kategori A', score: 62 },
    { name: 'Kategori B', score: 84 },
    { name: 'Kategori C', score: 41 },
    { name: 'Kategori D', score: 76 },
  ];

  // Aset Perlu Tindakan list sesuai tabel screenshot
  const actionRequiredAssets = [
    { name: '(Nama aset)', score: 75, status: 'Baik' },
    { name: '(Nama aset)', score: 50, status: 'Kritis' },
    { name: '(Nama aset)', score: 90, status: 'Baik' },
    { name: '(Nama aset)', score: 45, status: 'Perhatian' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 2 Kiri */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Asset Health
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pemantauan Asset Health Index (0 - 100), grafik kondisi per kategori, dan daftar aset perlu tindakan.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 2 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total aset</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Aset sehat</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Perlu perhatian</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kritis</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Dua Bagian: Health per Kategori Kiri & Aset Perlu Tindakan Kanan Sesuai Referensi 2 Kiri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health per Kategori */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Health per Kategori
          </h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Grafik rata-rata indeks kesehatan per kategori aset.</p>

          <div className="mt-6 space-y-4">
            {categoriesHealth.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300">{cat.name}</span>
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">{cat.score}%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-4 rounded-md overflow-hidden p-0.5">
                  <div
                    className="bg-blue-600 dark:bg-white h-full rounded transition-all"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aset Perlu Tindakan Kartu dengan Tabel Sesuai Referensi 2 Kiri */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Aset Perlu Tindakan
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-[#23252c] text-zinc-500 dark:text-zinc-400 font-medium pb-2">
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3 text-center">Skor</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-[#23252c]">
                {actionRequiredAssets.map((item, idx) => {
                  const isBaik = item.status === 'Baik';
                  const isKritis = item.status === 'Kritis';
                  return (
                    <tr key={idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                      <td className="py-3 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-600 dark:text-zinc-400">
                        {item.score}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <TablePill variant={isBaik ? 'success' : isKritis ? 'warning' : 'process'}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                          <span>{item.status}</span>
                        </TablePill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
