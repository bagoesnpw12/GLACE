import React, { useState } from 'react';
import { AssetInspection, EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Search, 
  MoreVertical, 
  X, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Camera,
  Upload
} from 'lucide-react';

interface AIInspectionViewProps {
  inspections: AssetInspection[];
  assets: EngineeringAsset[];
  onCreateInspection: (inspection: AssetInspection) => void;
}

export const AIInspectionView: React.FC<AIInspectionViewProps> = ({
  inspections,
  assets,
  onCreateInspection
}) => {
  const [selectedInspection, setSelectedInspection] = useState<AssetInspection | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [formAssetId, setFormAssetId] = useState(assets[0]?.id || 'ast-01');
  const [formDate, setFormDate] = useState('20 november 2026');
  const [formInspector, setFormInspector] = useState('Budi Santoso, ST');
  const [formStatus, setFormStatus] = useState<AssetInspection['status']>('Selesai');
  const [formFindings, setFormFindings] = useState('');
  const [formRecommendations, setFormRecommendations] = useState('');
  const [formScore, setFormScore] = useState(88);
  const [photoNote, setPhotoNote] = useState('');

  // Top KPI calculations matching Screenshot:
  // Total inspeksi, Selesai pekan ini, Sedang berjalan, Menunggu tindakan
  const totalInspeksi = inspections.length;
  const selesaiPekanIni = inspections.filter(i => i.status === 'Selesai').length;
  const sedangBerjalan = inspections.filter(i => i.status === 'Dalam Proses').length;
  const menungguTindakan = inspections.filter(i => i.status === 'Dijadwalkan').length;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === formAssetId) || assets[0];
    const newIns: AssetInspection = {
      id: `insp-${Date.now().toString(36)}`,
      assetId: asset.id,
      assetCode: asset.code,
      assetName: asset.name,
      inspectionDate: formDate,
      inspectorName: formInspector,
      status: formStatus,
      checklist: [
        { item: 'Pemeriksaan kebersihan & kondisi fisik luar', passed: true },
        { item: 'Pengukuran kebocoran arus isolasi & megger', passed: formScore >= 60 },
        { item: 'Inspeksi suhu infrared thermal scan', passed: formScore >= 75 },
        { item: 'Verifikasi fungsi indikator proteksi', passed: true }
      ],
      findings: formFindings || 'Hasil pengujian telemetri dan audit fisik selesai dikerjakan.',
      recommendations: formRecommendations || 'Jadwalkan monitoring harian rutin.',
      photos: photoNote ? [photoNote] : [],
      healthScoreResult: Number(formScore)
    };

    onCreateInspection(newIns);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Inspection
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Jadwal inspeksi teknik, checklist audit berkala, dan dokumentasi foto inspektur lapangan.
        </p>
      </div>

      {/* Top 4 KPI Cards matching Screenshot 2 Left:
          Total inspeksi, Selesai pekan ini, Sedang berjalan, Menunggu tindakan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total inspeksi</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalInspeksi}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selesai pekan ini</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {selesaiPekanIni}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sedang berjalan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {sedangBerjalan}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Menunggu tindakan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {menungguTindakan}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Table Section: Header "Jadwal Inspeksi" and "+ Jadwal Baru" button matching screenshot */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Jadwal Inspeksi</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Jadwal Baru</span>
          </button>
        </div>

        {/* Table: Tanggal, Aset, Status, Inspektur, Action */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
                  <th className="py-3 px-3 w-6 text-slate-300 text-center">⋮</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Aset</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Inspektur</th>
                  <th className="py-3 px-3 w-8 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {inspections.map((ins, idx) => (
                  <tr key={ins.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-3 text-slate-300 text-center cursor-grab">
                      ⋮⋮
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {ins.inspectionDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {ins.assetName}
                        </span>
                        <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">{ins.assetCode}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            ins.status === 'Selesai'
                              ? 'bg-emerald-500'
                              : ins.status === 'Dalam Proses'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        ></span>
                        <span className={ins.status === 'Selesai' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'}>
                          {ins.status === 'Selesai' ? 'Selesai' : ins.status === 'Dalam Proses' ? 'In Process' : 'Terjadwal'}
                        </span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                      {ins.inspectorName}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedInspection(ins)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Detail Checklist & Temuan"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail & Checklist Inspeksi */}
      {selectedInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 block">{selectedInspection.assetCode}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Checklist & Hasil Inspeksi
                </h3>
              </div>
              <button onClick={() => setSelectedInspection(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">{selectedInspection.assetName}</span>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Tanggal: {selectedInspection.inspectionDate}</span>
                  <span>Inspektur: {selectedInspection.inspectorName}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-2">Form Checklist Pemeriksaan:</span>
                <div className="space-y-2">
                  {selectedInspection.checklist.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <span className="font-medium text-slate-800 dark:text-slate-200">{item.item}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.passed ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {item.passed ? 'Lolos' : 'Gagal'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Temuan Lapangan:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedInspection.findings}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Rekomendasi Tindakan:</span>
                <p className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 leading-relaxed">
                  {selectedInspection.recommendations}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedInspection(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Jadwal Inspeksi */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat Jadwal Inspeksi Baru
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pilih Target Aset</label>
                <select
                  value={formAssetId}
                  onChange={(e) => setFormAssetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      [{a.code}] {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tanggal Inspeksi</label>
                  <input
                    type="text"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="20 november 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Dijadwalkan">Dijadwalkan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Inspektur Penguji</label>
                <input
                  type="text"
                  required
                  value={formInspector}
                  onChange={(e) => setFormInspector(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Temuan Pemeriksaan</label>
                <textarea
                  rows={2}
                  value={formFindings}
                  onChange={(e) => setFormFindings(e.target.value)}
                  placeholder="Catatan hasil audit fisik lapangan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Rekomendasi Tindakan</label>
                <textarea
                  rows={2}
                  value={formRecommendations}
                  onChange={(e) => setFormRecommendations(e.target.value)}
                  placeholder="Tindakan mitigasi atau jadwal servis..."
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
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
