import React, { useState } from 'react';
import { EngineeringAsset } from '../../data/assetIntelligenceData';
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
  Download, 
  QrCode, 
  ChevronDown, 
  GripVertical,
  MoreVertical,
  X
} from 'lucide-react';

interface AIAssetRegisterViewProps {
  assets: EngineeringAsset[];
  onOpenCreate: () => void;
  onEditAsset: (asset: EngineeringAsset) => void;
  onDeleteAsset: (id: string) => void;
  onSelectAssetForDetail?: (asset: EngineeringAsset) => void;
}

export const AIAssetRegisterView: React.FC<AIAssetRegisterViewProps> = ({
  assets,
  onOpenCreate,
  onEditAsset,
  onDeleteAsset,
  onSelectAssetForDetail
}) => {
  const [selectedPillTab, setSelectedPillTab] = useState('Outline');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrAsset, setQrAsset] = useState<EngineeringAsset | null>(null);

  // Realistis KPI
  const totalAsset = assets.length;
  const assetSehat = assets.filter(a => a.condition === 'Baik').length;
  const perluPerhatian = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const kritis = assets.filter(a => a.condition === 'Kritis').length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(assets.map(a => a.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const headers = ['Kode Aset', 'Nama Aset', 'Kategori', 'Lokasi', 'Kondisi', 'Status Operasional', 'Health Index'];
    const rows = assets.map(a => [
      a.code,
      `"${a.name}"`,
      a.category,
      `"${a.location}"`,
      a.condition,
      a.operationalStatus,
      a.healthIndex
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Asset_Register_GLACE.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintQR = () => {
    setQrAsset(assets[0] || null);
    setShowQRModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 1 Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Asset Register
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Inventaris lengkap aset operasional, riwayat pemeliharaan, dan pemantauan kondisi real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18191f] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202129] text-xs font-medium cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={handlePrintQR}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18191f] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202129] text-xs font-medium cursor-pointer transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-zinc-400" />
            <span>Cetak QR</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 1 */}
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

      {/* 3. Toolbar: Pills Tabs Kiri & Action Buttons Kanan Sesuai Referensi 1 Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Pills Tabs: Outline, Past Performance 3, Key Personnel 2, Focus Documents */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316]">
          {[
            { id: 'Outline', label: 'Outline' },
            { id: 'Past Performance', label: 'Past Performance', badge: '3' },
            { id: 'Key Personnel', label: 'Key Personnel', badge: '2' },
            { id: 'Focus Documents', label: 'Focus Documents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPillTab(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedPillTab === tab.id
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200/80 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons Kanan: Customize Columns & + Add Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Sesuaikan kolom tabel')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18191f] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202129] text-xs font-medium cursor-pointer transition-colors"
          >
            <span>Customize Columns</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Section</span>
          </button>
        </div>
      </div>

      {/* 4. Tabel Asset Register Sesuai Standard GLACE & Referensi 1 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead className="w-8 text-center">
                <input
                  type="checkbox"
                  checked={selectedRowIds.length === assets.length && assets.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Section Type</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Target</TableHead>
              <TableHead className="text-center">Limit</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="w-10 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.slice(0, 10).map((a, idx) => {
              const isDone = a.condition === 'Baik';
              return (
                <TableRow key={a.id || idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                  <TableCell className="w-8 text-zinc-300 dark:text-zinc-600 cursor-grab">
                    <GripVertical className="w-3.5 h-3.5" />
                  </TableCell>
                  <TableCell className="w-8 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRowIds.includes(a.id)}
                      onChange={() => handleToggleRow(a.id)}
                      className="rounded border-zinc-300 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell 
                    onClick={() => onSelectAssetForDetail && onSelectAssetForDetail(a)}
                    className="font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer"
                  >
                    {a.name}
                  </TableCell>
                  <TableCell>
                    <TablePill variant="default">
                      {a.category || 'Narrative'}
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-center">
                    <TablePill variant={isDone ? 'success' : 'process'}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                      <span>{isDone ? 'Done' : 'In Process'}</span>
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-center font-mono text-zinc-600 dark:text-zinc-400 text-xs">
                    {a.healthIndex ? Math.floor(a.healthIndex / 4) : 18 + idx}
                  </TableCell>
                  <TableCell className="text-center font-mono text-zinc-600 dark:text-zinc-400 text-xs">
                    {5 + (idx * 2)}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    {'Eddie Lake'}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded transition-colors cursor-pointer">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Footer Pagination Sesuai Screenshot */}
        <div className="p-4 border-t border-zinc-100 dark:border-[#23252c] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            {selectedRowIds.length} of {assets.length} row(s) selected.
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span>Rows per page</span>
              <select className="px-2 py-0.5 rounded border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-xs">
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <span>Page 1 of 7</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-zinc-200 dark:border-[#27272a]">&lt;</button>
              <button className="p-1 rounded border border-zinc-200 dark:border-[#27272a]">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal Sederhana */}
      {showQRModal && qrAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-xl max-w-sm w-full p-5 border border-zinc-200 dark:border-[#27272a] shadow-xl text-center space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">QR Code Aset</h3>
            <p className="text-xs text-zinc-400">{qrAsset.code} - {qrAsset.name}</p>
            <div className="p-4 bg-white rounded-lg inline-block border">
              <QrCode className="w-32 h-32 text-zinc-900" />
            </div>
            <div>
              <button
                onClick={() => setShowQRModal(false)}
                className="px-4 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
