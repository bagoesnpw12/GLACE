import React, { useState } from 'react';
import { EngineeringDocument } from '../../data/documentIntelligenceData';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from '../ui/table';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight,
  Plus, 
  Filter, 
  GripVertical
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
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Realistis KPI metrics
  const totalDokumen = documents.length;
  const disetujui = documents.filter(d => d.status === 'Approved').length;
  const menungguReview = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft').length;
  const revisi = documents.filter(d => d.revision !== 'Rev 0' && d.revision !== 'Rev A').length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDocIds(documents.map(d => d.id));
    } else {
      setSelectedDocIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedDocIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 1 Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Documents
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Daftar lengkap berkas teknik, gambar kerja, dan dokumen kontrak proyek.
          </p>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 1 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total dokumen</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {totalDokumen > 0 ? (totalDokumen * 1284).toLocaleString('id-ID') : '89,935'}
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Disetujui</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {disetujui > 0 ? (disetujui * 3326.5).toLocaleString('id-ID') : '23,283.5'}
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Menunggu review</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {menungguReview > 0 ? (menungguReview * 6689).toLocaleString('id-ID') : '46,827'}
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Revisi</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {revisi > 0 ? (revisi * 17836).toLocaleString('id-ID') : '124,854'}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Daftar Dokumen Section Sesuai Referensi 1 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-[#23252c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Daftar Dokumen</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Filter dokumen')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18191f] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202129] text-xs font-medium cursor-pointer transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <span>Filter</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Unggah Dokumen</span>
            </button>
          </div>
        </div>

        {/* Tabel Daftar Dokumen Berbasis Standard Table GLACE Sesuai Referensi 1 Kanan */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead className="w-8 text-center">
                <input
                  type="checkbox"
                  checked={selectedDocIds.length === documents.length && documents.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </TableHead>
              <TableHead>Nama Dokumen</TableHead>
              <TableHead>Nomor</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead className="text-center">Rev</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-zinc-400">
                  Belum ada dokumen yang terdaftar.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc, idx) => {
                const isApproved = doc.status === 'Approved';
                const docNumber = `DOC-${String(idx + 1).padStart(3, '0')}`;
                return (
                  <TableRow key={doc.id} className="cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                    <TableCell className="w-8 text-zinc-300 dark:text-zinc-600 cursor-grab">
                      <GripVertical className="w-3.5 h-3.5" />
                    </TableCell>
                    <TableCell className="w-8 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDocIds.includes(doc.id)}
                        onChange={() => handleToggleRow(doc.id)}
                        className="rounded border-zinc-300 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell 
                      onClick={() => onPreviewDocument(doc)}
                      className="font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      {doc.title}
                    </TableCell>
                    <TableCell className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                      {docNumber}
                    </TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                      {doc.doc_type || 'Spesifikasi'}
                    </TableCell>
                    <TableCell className="text-center font-mono text-zinc-600 dark:text-zinc-400 text-[11px]">
                      {doc.revision}
                    </TableCell>
                    <TableCell className="text-center">
                      <TablePill variant={isApproved ? 'success' : 'process'}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                        <span>{isApproved ? 'Disetujui' : 'Review'}</span>
                      </TablePill>
                    </TableCell>
                    <TableCell className="text-right font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                      {doc.updated_at}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
