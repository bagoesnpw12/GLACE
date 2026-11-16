import React, { useState } from 'react';
import { 
  EngineeringDocument, 
  DocumentRevisionHistory 
} from '../../data/documentIntelligenceData';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  History, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DIDashboardViewProps {
  documents: EngineeringDocument[];
  revisions: DocumentRevisionHistory[];
  onNavigateSubmenu: (submenu: string) => void;
  onPreviewDocument: (doc: EngineeringDocument) => void;
  onOpenUpload: () => void;
}

export const DIDashboardView: React.FC<DIDashboardViewProps> = ({
  documents,
  revisions,
  onNavigateSubmenu,
  onPreviewDocument,
  onOpenUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // 1. KPI Statistics calculated from real document data
  const totalDocuments = documents.length;
  const pendingReview = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft').length;
  const approvedDocuments = documents.filter(d => d.status === 'Approved').length;
  const totalRevisions = revisions.length;

  // Filtered documents for Document Library table
  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Recent Documents (top 4)
  const recentDocs = [...documents].slice(0, 4);

  // Document Review (items needing review)
  const reviewDocs = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDocIds(filteredDocs.map(d => d.id));
    } else {
      setSelectedDocIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedDocIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (st: EngineeringDocument['status']) => {
    switch (st) {
      case 'Approved':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/80';
      case 'Under Review':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/80';
      case 'Draft':
        return 'text-slate-700 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
      case 'Rejected':
      default:
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/80';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title "Document Intelligence" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 stagger-item stagger-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Document Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manajemen dokumen rekayasa teknik terpusat, OCR cerdas, kontrol revisi, dan pencarian semantik AI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>+ Upload Dokumen</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards matching Figma Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-item stagger-2">
        {/* Total Documents */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Documents</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalDocuments}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Arsip Berkas Teknik</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Review */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending Review</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {pendingReview}
            </div>
            <span className="text-[11px] text-amber-600 font-medium mt-0.5 block">Menunggu Persetujuan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Approved Documents */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Approved Documents</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {approvedDocuments}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">Siap Terbit Lapangan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Total Revisions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Revisions</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalRevisions}
            </div>
            <span className="text-[11px] text-indigo-600 font-medium mt-0.5 block">Riwayat Siklus Dokumen</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Document Library Section matching Figma Screenshot */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 stagger-item stagger-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Document Library</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola, cari, dan pantau seluruh dokumen teknik Anda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dokumen..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-56 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              onClick={() => onNavigateSubmenu('Documents')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table Document Library */}
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">NAMA DOKUMEN</th>
                <th className="py-3 px-4">TIPE</th>
                <th className="py-3 px-4">KATEGORI</th>
                <th className="py-3 px-4 text-center">REVISION</th>
                <th className="py-3 px-4 text-center">STATUS</th>
                <th className="py-3 px-4">UPDATED AT</th>
                <th className="py-3 px-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <span className="font-semibold block text-slate-700 dark:text-slate-300">Belum ada dokumen</span>
                    <span className="text-xs">Mulai dengan mengunggah dokumen pertama Anda.</span>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDocIds.includes(doc.id)}
                        onChange={() => handleToggleRow(doc.id)}
                        className="rounded accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="truncate max-w-xs">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {doc.doc_type}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {doc.category}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600 dark:text-slate-300">
                      {doc.revision}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {doc.updated_at}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onPreviewDocument(doc)}
                        className="px-2.5 py-1 rounded-lg border border-blue-600/30 text-blue-600 hover:bg-blue-50 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Middle Row: Recent Documents & Document Review matching Figma Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item stagger-4">
        {/* Recent Documents Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Documents</h3>
                <p className="text-[11px] text-slate-400">Dokumen yang terakhir diunggah atau diperbarui.</p>
              </div>
              <button
                onClick={() => onNavigateSubmenu('Documents')}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 mt-2">
              {recentDocs.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  Belum ada dokumen
                </div>
              ) : (
                recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => onPreviewDocument(doc)}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {doc.discipline} • {doc.file_size}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">{doc.updated_at}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Document Review Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Document Review</h3>
                <p className="text-[11px] text-slate-400">Dokumen yang perlu ditinjau sebelum disetujui.</p>
              </div>
              <button
                onClick={() => onNavigateSubmenu('Document Control')}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 mt-2">
              {reviewDocs.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  Belum ada dokumen yang perlu ditinjau
                </div>
              ) : (
                reviewDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[220px]">
                        {doc.title}
                      </h4>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400">
                        Diajukan oleh {doc.author} ({doc.revision})
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigateSubmenu('Document Control')}
                      className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-semibold cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Revision History matching Figma Screenshot */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Revision History</h3>
            <p className="text-[11px] text-slate-400">Riwayat perubahan dokumen dan jejak audit revisi.</p>
          </div>
          <button
            onClick={() => onNavigateSubmenu('Document Control')}
            className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat semua</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-2.5 px-4">NAMA DOKUMEN</th>
                <th className="py-2.5 px-4 text-center">REVISION</th>
                <th className="py-2.5 px-4">PERUBAHAN</th>
                <th className="py-2.5 px-4">UPDATED AT</th>
                <th className="py-2.5 px-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {revisions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Belum ada riwayat revisi
                  </td>
                </tr>
              ) : (
                revisions.slice(0, 4).map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {rev.document_title || rev.document_id}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600 dark:text-slate-400">
                      {rev.revision}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 line-clamp-1 max-w-md">
                      {rev.change_summary}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {rev.created_at}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onNavigateSubmenu('AI Comparison')}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        Bandingkan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

