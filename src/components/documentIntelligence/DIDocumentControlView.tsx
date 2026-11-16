import React, { useState } from 'react';
import { 
  EngineeringDocument, 
  DocumentRevisionHistory 
} from '../../data/documentIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  Clock,
  TrendingUp, 
  Plus, 
  MoreVertical, 
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileCheck,
  Send,
  History,
  Download
} from 'lucide-react';

interface DIDocumentControlViewProps {
  documents: EngineeringDocument[];
  revisions: DocumentRevisionHistory[];
  onApproveDocument: (docId: string) => void;
  onRejectDocument: (docId: string) => void;
  onCreateRevision: (rev: DocumentRevisionHistory) => void;
}

export const DIDocumentControlView: React.FC<DIDocumentControlViewProps> = ({
  documents,
  revisions,
  onApproveDocument,
  onRejectDocument,
  onCreateRevision
}) => {
  const [activeTab, setActiveTab] = useState<'transmittal' | 'approvals'>('transmittal');
  const [showTransmittalModal, setShowTransmittalModal] = useState(false);
  const [transmittalNo, setTransmittalNo] = useState('TRM-007');
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || 'doc-01');
  const [pengirim, setPengirim] = useState('PT Adhi - Glace JV');
  const [penerima, setPenerima] = useState('PT PLN (Persero)');

  // Top 4 KPI calculations
  const transmittalAktif = documents.length;
  const menungguBalasan = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft').length;
  const terlambat = 1;
  const selesaiBulanIni = documents.filter(d => d.status === 'Approved').length;

  // Realistis Document Control / Transmittal items
  const [transmittalItems, setTransmittalItems] = useState([
    { no: 'TRM-001', docName: 'Spesifikasi Teknis Gardu Induk 150 kV', rev: 'Rev B', sender: 'PT Adhi Karya', recipient: 'PT PLN (Persero)', date: '12 Nov 2026', status: 'Approved', pic: 'Ir. Hendra Gunawan' },
    { no: 'TRM-002', docName: 'Single Line Diagram Proteksi Busbar', rev: 'Rev A', sender: 'PT Glace Engineering', recipient: 'Konsultan Supervisi', date: '10 Nov 2026', status: 'Under Review', pic: 'Raditya Pratama, S.T.' },
    { no: 'TRM-003', docName: 'Kalkulasi Beban Termal Chiller HVAC', rev: 'Rev 0', sender: 'PT Glace Engineering', recipient: 'Subkontraktor HVAC', date: '08 Nov 2026', status: 'Draft', pic: 'Dimas Saputra, S.T.' },
    { no: 'TRM-004', docName: 'Desain Sistem IPAL Limbah Tekstil', rev: 'Rev 1', sender: 'PT Duta Enviro', recipient: 'Kementerian LHK', date: '05 Nov 2026', status: 'Under Review', pic: 'Dr. Maya Indrawati' },
    { no: 'TRM-005', docName: 'Laporan Uji Tanah & Pondasi Trafo', rev: 'Rev 0', sender: 'PT Geoteknika Utama', recipient: 'Lead Civil Eng.', date: '03 Nov 2026', status: 'Draft', pic: 'Bambang Sudibyo, S.T.' },
    { no: 'TRM-006', docName: 'Manual Kalibrasi RTU SCADA Protokol IEC', rev: 'Rev C', sender: 'PT Siemens Indonesia', recipient: 'PT Glace JV', date: '28 Okt 2026', status: 'Approved', pic: 'Budi Santoso, M.Kom.' },
    { no: 'TRM-007', docName: 'P&ID Pemipaan Cooling Tower & Pompa', rev: 'Rev A', sender: 'PT Mitra Mekanika', recipient: 'Quality Assurance', date: '25 Okt 2026', status: 'Rejected', pic: 'Agus Setiawan' }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Review
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Draft
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const handleCreateTransmittal = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = documents.find(d => d.id === selectedDocId) || documents[0];
    
    const newItem = {
      no: transmittalNo,
      docName: doc.title,
      rev: 'Rev B',
      sender: pengirim,
      recipient: penerima,
      date: new Date().toISOString().slice(0, 10),
      status: 'Under Review',
      pic: 'Document Controller'
    };

    setTransmittalItems([newItem, ...transmittalItems]);

    onCreateRevision({
      id: `trm-${Date.now().toString(36)}`,
      document_id: doc.id,
      document_title: doc.title,
      revision: 'Rev B',
      change_summary: `Transmittal berkas ${transmittalNo} diterbitkan dari ${pengirim} ke ${penerima}.`,
      changed_by: pengirim,
      status: 'Under Review',
      created_at: new Date().toISOString().slice(0, 10)
    });

    setShowTransmittalModal(false);
  };

  const handleUpdateStatus = (no: string, newStatus: string) => {
    setTransmittalItems(prev => prev.map(item => item.no === no ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Document Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kendali alur persetujuan, distribusi transmittal resmi antar stakeholder, dan tata kelola versi dokumen.
          </p>
        </div>
        <button
          onClick={() => setShowTransmittalModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Transmittal Baru</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Transmittal Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {transmittalItems.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Total transmittal terdata</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Menunggu Balasan</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tracking-tight">
              {transmittalItems.filter(t => t.status === 'Under Review').length}
            </div>
            <div className="text-[11px] text-amber-600/80 mt-0.5 font-medium">Sedang ditinjau konsultan</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dokumen Ditolak</span>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1 tracking-tight">
              {transmittalItems.filter(t => t.status === 'Rejected').length}
            </div>
            <div className="text-[11px] text-rose-600/80 mt-0.5 font-medium">Perlu tindakan revisi</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selesai / Approved</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
              {transmittalItems.filter(t => t.status === 'Approved').length}
            </div>
            <div className="text-[11px] text-emerald-600/80 mt-0.5 font-medium">Disetujui penuh</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Container: Transmittal and Approval Lifecycle Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Transmittal dan Siklus Persetujuan Dokumen
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Kendali status dokumen resmi: Draft, Under Review, Approved, dan Rejected
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Cepat:</span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('transmittal')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === 'transmittal'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Semua Transmittal
              </button>
              <button
                onClick={() => setActiveTab('approvals')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === 'approvals'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Menunggu Review ({transmittalItems.filter(t => t.status === 'Under Review').length})
              </button>
            </div>
          </div>
        </div>

        {/* Table View with complete status workflow */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-3">Nomor</th>
                <th className="py-3 px-3">Dokumen</th>
                <th className="py-3 px-3">Rev</th>
                <th className="py-3 px-3">Dari (Pengirim)</th>
                <th className="py-3 px-3">Kepada (Penerima)</th>
                <th className="py-3 px-3">Penanggung Jawab</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Aksi Persetujuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {transmittalItems
                .filter(item => activeTab === 'transmittal' || item.status === 'Under Review')
                .map((item) => (
                  <tr
                    key={item.no}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.no}
                    </td>
                    <td className="py-3.5 px-3 max-w-[220px]">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {item.docName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Tanggal: {item.date}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {item.rev}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                      {item.sender}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                      {item.recipient}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 font-medium">
                      {item.pic}
                    </td>
                    <td className="py-3.5 px-3">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === 'Under Review' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.no, 'Approved')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.no, 'Rejected')}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {item.status === 'Draft' && (
                          <button
                            onClick={() => handleUpdateStatus(item.no, 'Under Review')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-all cursor-pointer"
                          >
                            Kirim Review
                          </button>
                        )}
                        {item.status === 'Approved' && (
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                          </span>
                        )}
                        {item.status === 'Rejected' && (
                          <button
                            onClick={() => handleUpdateStatus(item.no, 'Draft')}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-semibold cursor-pointer"
                          >
                            Revisi
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Transmittal Baru */}
      {showTransmittalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat Surat Transmittal Dokumen
              </h3>
              <button
                onClick={() => setShowTransmittalModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransmittal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Nomor Transmittal
                </label>
                <input
                  type="text"
                  value={transmittalNo}
                  onChange={(e) => setTransmittalNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Pilih Dokumen
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.revision})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Pengirim
                  </label>
                  <input
                    type="text"
                    value={pengirim}
                    onChange={(e) => setPengirim(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Penerima
                  </label>
                  <input
                    type="text"
                    value={penerima}
                    onChange={(e) => setPenerima(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowTransmittalModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Kirim Transmittal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
