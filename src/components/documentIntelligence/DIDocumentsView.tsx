import React, { useState, useMemo } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  Clock,
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  FileText, 
  X,
  Trash2,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DIDocumentsViewProps {
  documents: EngineeringDocument[];
  onOpenUpload: () => void;
  onPreviewDocument: (doc: EngineeringDocument) => void;
  onDeleteDocument: (id: string) => void;
  onDownloadDocument: (doc: EngineeringDocument) => void;
}

export const DIDocumentsView: React.FC<DIDocumentsViewProps> = ({
  documents,
  onOpenUpload,
  onPreviewDocument,
  onDeleteDocument,
  onDownloadDocument
}) => {
  const [filterType, setFilterType] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Realistis KPI metrics
  const totalDokumen = documents.length;
  const disetujui = documents.filter(d => d.status === 'Approved').length;
  const menungguPersetujuan = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft').length;
  const revisi = documents.filter(d => d.revision !== 'Rev 0' && d.revision !== 'Rev A').length;

  const filteredDocs = useMemo(() => {
    return documents.filter(d => {
      const matchSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.author.toLowerCase().includes(search.toLowerCase()) ||
        d.discipline.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'Semua' ? true : d.doc_type === filterType;
      const matchStatus = filterStatus === 'Semua' ? true : d.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [documents, search, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Disetujui
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Dalam Review
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Draf
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Ditolak
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    const isPDF = type.toUpperCase() === 'PDF';
    const isDWG = type.toUpperCase() === 'DWG';
    return (
      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
        isPDF 
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40' 
          : isDWG
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40'
          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
      }`}>
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Documents
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar seluruh dokumen teknik, tipe berkas, status persetujuan, dan riwayat revisi engineering.
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Unggah Dokumen</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Dokumen</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalDokumen}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Semua tipe berkas</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Disetujui</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
              {disetujui}
            </div>
            <div className="text-[11px] text-emerald-600/80 mt-0.5 font-medium">{Math.round((disetujui / totalDokumen) * 100)}% dari total</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Menunggu Persetujuan</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tracking-tight">
              {menungguPersetujuan}
            </div>
            <div className="text-[11px] text-amber-600/80 mt-0.5 font-medium">Perlu review</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Revisi Berjalan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {revisi}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Rev B / Rev C</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Daftar Dokumen
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Menampilkan {filteredDocs.length} dokumen teknik terdaftar
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Cari nama, disiplin, atau penanggung jawab..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Filter Format */}
            <select
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <option value="Semua">Semua Tipe</option>
              <option value="PDF">PDF</option>
              <option value="DWG">DWG</option>
              <option value="DOCX">DOCX</option>
              <option value="XLSX">XLSX</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <option value="Semua">Semua Status</option>
              <option value="Approved">Disetujui</option>
              <option value="Under Review">Dalam Review</option>
              <option value="Draft">Draf</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-3">Nama Dokumen</th>
                <th className="py-3 px-3">Nomor</th>
                <th className="py-3 px-3">Tipe</th>
                <th className="py-3 px-3">Disiplin</th>
                <th className="py-3 px-3">Rev</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Tidak ada dokumen yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                paginatedDocs.map((doc, idx) => {
                  const docNum = `DOC-${String((currentPage - 1) * itemsPerPage + idx + 1).padStart(3, '0')}`;
                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3 px-3 max-w-[260px]">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {doc.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {doc.author} · {doc.file_size}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-slate-600 dark:text-slate-400">
                        {docNum}
                      </td>
                      <td className="py-3 px-3">
                        {getTypeBadge(doc.doc_type)}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        {doc.discipline}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                        {doc.revision}
                      </td>
                      <td className="py-3 px-3">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                        {doc.updated_at}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onPreviewDocument(doc)}
                            title="Pratinjau Dokumen"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDownloadDocument(doc)}
                            title="Unduh Dokumen"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteDocument(doc.id)}
                            title="Hapus Dokumen"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-slate-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div>
            Menampilkan {filteredDocs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredDocs.length)} dari {filteredDocs.length} data
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Sebelumnya
            </button>
            <span className="px-2 font-semibold text-slate-700 dark:text-slate-300">
              Hal {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
