import React, { useState } from 'react';
import { 
  AssetMaintenanceWorkOrder, 
  EngineeringAsset, 
  formatIDR 
} from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Search, 
  Wrench, 
  ArrowRight, 
  Trash2, 
  Edit2, 
  X,
  Calendar,
  Clock
} from 'lucide-react';

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWO, setSelectedWO] = useState<AssetMaintenanceWorkOrder | null>(null);

  // Form states
  const [assetId, setAssetId] = useState(assets[0]?.id || 'ast-01');
  const [workDescription, setWorkDescription] = useState('');
  const [technicianName, setTechnicianName] = useState('Ir. Hendra Gunawan & Tim');
  const [scheduledDate, setScheduledDate] = useState('15 Mei 2026');
  const [priority, setPriority] = useState<AssetMaintenanceWorkOrder['priority']>('Sedang');
  const [type, setType] = useState<AssetMaintenanceWorkOrder['type']>('Preventive Maintenance');
  const [cost, setCost] = useState(15000000);

  // Top KPI calculations matching Screenshot:
  // Label metrik 1 (Total WO), Status metrik 2 (Aktif), Total KPI (Selesai), Selesai bulan ini
  const totalWO = workOrders.length;
  const menungguCount = workOrders.filter(w => w.status === 'Dijadwalkan' || w.status === 'Tertunda').length;
  const dikerjakanCount = workOrders.filter(w => w.status === 'Sedang Dikerjakan').length;
  const selesaiCount = workOrders.filter(w => w.status === 'Selesai').length;

  // 3 Kanban columns: Menunggu, Dikerjakan, Selesai
  const columns: { title: string; statusMatch: Array<AssetMaintenanceWorkOrder['status']>; nextStatus?: AssetMaintenanceWorkOrder['status'] }[] = [
    { title: 'Menunggu', statusMatch: ['Dijadwalkan', 'Tertunda'], nextStatus: 'Sedang Dikerjakan' },
    { title: 'Dikerjakan', statusMatch: ['Sedang Dikerjakan'], nextStatus: 'Selesai' },
    { title: 'Selesai', statusMatch: ['Selesai'] },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === assetId) || assets[0];
    const newWO: AssetMaintenanceWorkOrder = {
      id: `wo-${Date.now().toString(36)}`,
      woNumber: `WO-${type === 'Preventive Maintenance' ? 'PREV' : 'CORR'}-2026-${Math.floor(100 + Math.random() * 900)}`,
      assetId: asset.id,
      assetCode: asset.code,
      assetName: asset.name,
      type,
      priority,
      scheduledDate,
      technicianName,
      cost: Number(cost),
      sparePartsUsed: [],
      workDescription: workDescription || `Pemeriksaan rutin dan maintenance ${asset.name}`,
      status: 'Dijadwalkan'
    };

    onCreateWorkOrder(newWO);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Maintenance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Papan Kanban Work Order, alokasi teknisi lapangan, dan riwayat pekerjaan pemeliharaan aset.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Work Order</span>
        </button>
      </div>

      {/* Top 4 KPI Cards matching Screenshot 2 Right */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Work Order</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalWO}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Menunggu Pelaksanaan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {menungguCount}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sedang Dikerjakan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {dikerjakanCount}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selesai Bulan Ini</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {selesaiCount}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Kanban Board matching Screenshot: 3 Kolom: Menunggu, Dikerjakan, Selesai */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => {
          const columnWOs = workOrders.filter(w => col.statusMatch.includes(w.status));

          return (
            <div
              key={col.title}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {col.title}
                </h3>
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-500 flex items-center justify-center">
                  {columnWOs.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {columnWOs.length === 0 ? (
                  <div className="h-40 flex items-center justify-center text-xs text-slate-400 italic">
                    Belum ada kartu pekerjaan
                  </div>
                ) : (
                  columnWOs.map((wo) => (
                    <div
                      key={wo.id}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:shadow-md transition-all space-y-2.5"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] font-bold text-blue-600 block">
                            {wo.woNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {wo.scheduledDate}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {wo.assetName}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {wo.workDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-600">
                          {wo.priority}
                        </span>
                        <span className="text-slate-400 truncate max-w-[120px]">
                          {wo.technicianName.split('&')[0]}
                        </span>
                      </div>

                      {/* Move status buttons */}
                      <div className="flex items-center justify-between pt-1 gap-1">
                        <button
                          onClick={() => setSelectedWO(wo)}
                          className="text-[10px] text-blue-600 hover:underline font-semibold"
                        >
                          Rincian
                        </button>
                        {col.nextStatus && (
                          <button
                            onClick={() => onUpdateStatus(wo.id, col.nextStatus!)}
                            className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Pindah ke {col.nextStatus}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail & Riwayat Maintenance */}
      {selectedWO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 block">{selectedWO.woNumber}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Detail Pekerjaan Maintenance
                </h3>
              </div>
              <button onClick={() => setSelectedWO(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">{selectedWO.assetName}</span>
                <span className="font-mono text-[10px] text-blue-600 block">{selectedWO.assetCode}</span>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Jadwal: {selectedWO.scheduledDate}</span>
                  <span>Teknisi: {selectedWO.technicianName}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Deskripsi Pekerjaan:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedWO.workDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Tipe Maintenance</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedWO.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Estimasi Biaya</span>
                  <span className="font-bold text-blue-600">{formatIDR(selectedWO.cost)}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedWO(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat Work Order */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat Work Order Maintenance
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Aset</label>
                <select
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      [{a.code}] {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Uraian Pekerjaan</label>
                <textarea
                  rows={2}
                  required
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  placeholder="Misal: Kalibrasi getaran bearing, ganti oli sintetis..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Jadwal Tanggal</label>
                  <input
                    type="text"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    placeholder="15 Mei 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Teknisi Penanggung Jawab</label>
                <input
                  type="text"
                  required
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Simpan Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
