import React from 'react';
import { 
  AssetMaintenanceWorkOrder, 
  EngineeringAsset 
} from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { TablePill } from '../ui/table';

interface AIMaintenanceViewProps {
  workOrders: AssetMaintenanceWorkOrder[];
  assets: EngineeringAsset[];
  onCreateWorkOrder: (wo: AssetMaintenanceWorkOrder) => void;
  onUpdateStatus: (woId: string, newStatus: AssetMaintenanceWorkOrder['status']) => void;
  onDeleteWorkOrder?: (woId: string) => void;
}

export const AIMaintenanceView: React.FC<AIMaintenanceViewProps> = ({
  workOrders,
  assets,
  onCreateWorkOrder,
  onUpdateStatus,
  onDeleteWorkOrder
}) => {
  // 3 Kolom Sesuai Referensi 3 Kiri: Menunggu, Dikerjakan, Selesai
  const columns = [
    { title: 'Menunggu', items: [
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
    ]},
    { title: 'Dikerjakan', items: [
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
    ]},
    { title: 'Selesai', items: [
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
      { name: '(Nama aset)', sub: '(Nama aset)', date: '(Tanggal)', priority: '(Prioritas)' },
    ]},
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 3 Kiri */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Maintenance
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Papan alur kerja pemeliharaan aset, jadwal preventif, dan perbaikan terencana.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 3 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Label metrik 1</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Status metrik 2</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total KPI</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Selesai bulan ini</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Papan Maintenance 3-Kolom Sesuai Referensi 3 Kiri */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <div className="pb-2 border-b border-zinc-100 dark:border-[#23252c]">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {col.title}
                </h3>
              </div>

              <div className="space-y-3">
                {col.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-4 rounded-xl border border-zinc-100 dark:border-[#23252c] bg-zinc-50/60 dark:bg-[#18191f]/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors space-y-2"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {item.sub}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <TablePill variant="muted">
                        <span>{item.priority}</span>
                      </TablePill>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
