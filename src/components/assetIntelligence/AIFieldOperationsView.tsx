import React, { useState } from 'react';
import { FieldOperationTask, EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Search, 
  MapPin, 
  Navigation, 
  Eye, 
  X,
  FileCheck2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface AIFieldOperationsViewProps {
  tasks: FieldOperationTask[];
  assets: EngineeringAsset[];
  onCreateTask: (task: FieldOperationTask) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: FieldOperationTask['status']) => void;
}

export const AIFieldOperationsView: React.FC<AIFieldOperationsViewProps> = ({
  tasks,
  assets,
  onCreateTask,
  onUpdateTaskStatus
}) => {
  const [selectedTask, setSelectedTask] = useState<FieldOperationTask | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  // Form states
  const [assetId, setAssetId] = useState(assets[0]?.id || 'ast-01');
  const [officerName, setOfficerName] = useState('Budi Santoso, ST');
  const [taskTitle, setTaskTitle] = useState('');
  const [reportNotes, setReportNotes] = useState('');

  // Top KPI calculations matching Screenshot 3 Right:
  // Total tugas, Total hari ini, Di lokasi, Selesai
  const totalTugas = tasks.length;
  const totalHariIni = tasks.length;
  const diLokasi = tasks.filter(t => t.status === 'Dikerjakan' || t.status === 'Menuju Lokasi').length;
  const selesai = tasks.filter(t => t.status === 'Selesai').length;

  // Pin points for visual map
  const mapPins = [
    { id: 'pin-1', label: 'Asset A-01', x: '28%', y: '32%', color: 'bg-blue-600', officer: 'Budi Santoso' },
    { id: 'pin-2', label: 'Asset B-12', x: '65%', y: '45%', color: 'bg-emerald-600', officer: 'Agus Riyadi' },
    { id: 'pin-3', label: 'Asset C-98 (GI Weleri)', x: '48%', y: '72%', color: 'bg-amber-500', officer: 'Ahmad Fauzi' },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === assetId) || assets[0];
    const newTask: FieldOperationTask = {
      id: `fld-${Date.now().toString(36)}`,
      assetId: asset.id,
      assetCode: asset.code,
      assetName: asset.name,
      officerName,
      location: asset.location,
      taskTitle: taskTitle || `Inspeksi & Operasi Lapangan ${asset.name}`,
      status: 'Dikerjakan',
      assignedAt: 'Hari ini, 08:30 WIB',
      documentationPhotos: [],
      reportNotes: reportNotes || 'Petugas sedang berada di lokasi untuk verifikasi peralatan.'
    };

    onCreateTask(newTask);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Field Operations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pemantauan visual sebaran aset dan personil lapangan, koordinasi GPS live, dan status penugasan aktif.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Penugasan</span>
        </button>
      </div>

      {/* Top 4 KPI Cards matching Screenshot 3 Right:
          Total tugas, Total hari ini, Di lokasi, Selesai */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total tugas</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalTugas}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total hari ini</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalHariIni}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Di lokasi</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {diLokasi}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selesai</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {selesai}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Peta Lapangan, Right: Tugas Lapangan list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peta Lapangan Card matching Screenshot */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Peta Lapangan</h3>
              <p className="text-[11px] text-slate-400">Pemantauan visual sebaran aset dan personil.</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live GPS</span>
            </div>
          </div>

          {/* Interactive Simulated Vector Map */}
          <div className="w-full h-[400px] rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 relative overflow-hidden flex items-center justify-center">
            {/* Background Map Grid & Roads graphic */}
            <svg className="absolute inset-0 w-full h-full text-slate-200 dark:text-slate-700/40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              {/* Simulated curved highway routes */}
              <path d="M -20,120 Q 200,80 400,240 T 900,320" fill="none" stroke="#cbd5e1" strokeWidth="4" />
              <path d="M 120,400 Q 300,200 650,150 T 900,80" fill="none" stroke="#cbd5e1" strokeWidth="3" />
            </svg>

            {/* Pins with pulsing radar */}
            {mapPins.map((pin) => (
              <div
                key={pin.id}
                style={{ left: pin.x, top: pin.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-blue-500/20 animate-ping"></span>
                  <div className={`w-4 h-4 rounded-full ${pin.color} border-2 border-white shadow-md flex items-center justify-center`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                </div>
                {/* Pin Tooltip */}
                <div className="mt-1 px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-md text-[10px] font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {pin.label}
                </div>
              </div>
            ))}

            {/* Bottom Right Map Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md overflow-hidden text-xs">
              <button
                onClick={() => setMapZoom(z => Math.min(2, z + 0.1))}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                +
              </button>
              <button
                onClick={() => setMapZoom(z => Math.max(0.8, z - 0.1))}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Tugas Lapangan List Table matching Screenshot */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tugas Lapangan</h3>
                <p className="text-[11px] text-slate-400">Daftar penugasan operasional aktif.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Lihat Semua
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2 px-2">No</th>
                    <th className="py-2 px-2">Nama Petugas</th>
                    <th className="py-2 px-2">Lokasi</th>
                    <th className="py-2 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {tasks.slice(0, 5).map((t, idx) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTask(t)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-2 font-mono text-[10px] text-slate-400">
                        0{idx + 1}
                      </td>
                      <td className="py-3 px-2 font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {t.officerName.split('&')[0]}
                      </td>
                      <td className="py-3 px-2 text-slate-500 max-w-[100px] truncate" title={t.location}>
                        {t.location}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          t.status === 'Selesai'
                            ? 'bg-emerald-50 text-emerald-600'
                            : t.status === 'Dikerjakan'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {t.status === 'Dikerjakan' ? 'Aktif' : t.status === 'Selesai' ? 'Selesai' : 'Siaga'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail Berita Acara */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 block">{selectedTask.assetCode}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Detail Pekerjaan Lapangan
                </h3>
              </div>
              <button onClick={() => setSelectedTask(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{selectedTask.taskTitle}</h4>
                <p className="text-slate-600 dark:text-slate-300">Target Aset: {selectedTask.assetName}</p>
                <p className="text-slate-400">Petugas: {selectedTask.officerName}</p>
                <p className="text-slate-400">Lokasi: {selectedTask.location}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Laporan Hasil Pekerjaan:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedTask.reportNotes}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Penugasan */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tugaskan Personil Lapangan
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
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Judul Penugasan</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Misal: Kalibrasi getaran bearing di lokasi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Petugas</label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Catatan Instruksi</label>
                <textarea
                  rows={2}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Petunjuk K3, APD, atau kontak pengawas..."
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
                  Kirim Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
