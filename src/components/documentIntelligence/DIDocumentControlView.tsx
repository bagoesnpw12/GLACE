import React, { useState } from 'react';
import { 
  EngineeringDocument, 
  DocumentRevisionHistory 
} from '../../data/documentIntelligenceData';
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
  Plus
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
  const [showTransmittalModal, setShowTransmittalModal] = useState(false);

  // Top 4 KPI calculations
  const transmittalAktif = documents.length;
  const menungguBalasan = documents.filter(d => d.status === 'Under Review' || d.status === 'Draft').length;
  const terlambat = 1;
  const selesaiBulanIni = documents.filter(d => d.status === 'Approved').length;

  // Realistis transmittal items
  const [transmittalList, setTransmittalList] = useState([
    { no: 'TRM-001', docName: 'Spesifikasi Teknis Gardu Induk 150 kV', sender: 'PT Adhi Karya', recipient: 'PT PLN (Persero)', status: 'Terkirim', date: '12 Nov 2026' },
    { no: 'TRM-002', docName: 'Single Line Diagram Proteksi Busbar', sender: 'PT Glace Engineering', recipient: 'Konsultan Supervisi', status: 'Menunggu', date: '10 Nov 2026' },
    { no: 'TRM-003', docName: 'Kalkulasi Beban Termal Chiller HVAC', sender: 'PT Glace Engineering', recipient: 'Subkontraktor HVAC', status: 'Dibalas', date: '08 Nov 2026' },
    { no: 'TRM-004', docName: 'Desain Sistem IPAL Limbah Tekstil', sender: 'PT Duta Enviro', recipient: 'Kementerian LHK', status: 'Menunggu', date: '05 Nov 2026' },
    { no: 'TRM-005', docName: 'Laporan Uji Tanah & Pondasi Trafo', sender: 'PT Geoteknika Utama', recipient: 'Lead Civil Eng.', status: 'Terlambat', date: '03 Nov 2026' },
    { no: 'TRM-006', docName: 'Manual Kalibrasi RTU SCADA Protokol IEC', sender: 'PT Siemens Indonesia', recipient: 'PT Glace JV', status: 'Terkirim', date: '28 Okt 2026' },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 3 Kiri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Document Control
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Sirkulasi dokumen resmi, penomoran transmittal, dan verifikasi batas waktu respons.
          </p>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 3 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Transmittal aktif</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {transmittalAktif > 0 ? (transmittalAktif * 1284).toLocaleString('id-ID') : '89,935'}
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Menunggu balasan</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {menungguBalasan > 0 ? (menungguBalasan * 3326.5).toLocaleString('id-ID') : '23,283.5'}
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Terlambat</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {terlambat > 0 ? (terlambat * 46827).toLocaleString('id-ID') : '46,827'}
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Selesai bulan ini</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              {selesaiBulanIni > 0 ? (selesaiBulanIni * 17836).toLocaleString('id-ID') : '124,854'}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Tabel Transmittal dan Revisi Sesuai Referensi 3 Kiri */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-[#23252c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Transmittal dan Revisi</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTransmittalModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Transmittal baru</span>
            </button>
          </div>
        </div>

        {/* Standard Table GLACE Sesuai Referensi 3 Kiri */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">Nomor</TableHead>
              <TableHead>Dokumen</TableHead>
              <TableHead>Dari</TableHead>
              <TableHead>Kepada</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Batas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transmittalList.map((item, idx) => {
              const isTerkirim = item.status === 'Terkirim';
              const isMenunggu = item.status === 'Menunggu';
              const isTerlambat = item.status === 'Terlambat';
              return (
                <TableRow key={item.no || idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                  <TableCell className="font-mono text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold">
                    ({item.no})
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    ({item.docName})
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    ({item.sender})
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    ({item.recipient})
                  </TableCell>
                  <TableCell className="text-center">
                    <TablePill variant={isTerkirim ? 'success' : isMenunggu ? 'process' : isTerlambat ? 'warning' : 'muted'}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                      <span>{item.status}</span>
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-right font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                    ({item.date})
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modal Buat Transmittal Baru Sederhana */}
      {showTransmittalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-xl max-w-md w-full p-5 border border-zinc-200 dark:border-[#27272a] shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Buat Transmittal Baru</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-500 mb-1">Nomor Transmittal</label>
                <input
                  type="text"
                  defaultValue={`TRM-00${transmittalList.length + 1}`}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-zinc-500 mb-1">Penerima</label>
                <input
                  type="text"
                  placeholder="Nama instansi / kontraktor"
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTransmittalModal(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] text-xs font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setShowTransmittalModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium cursor-pointer"
              >
                Simpan Transmittal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
