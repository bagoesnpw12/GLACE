import React, { useState, useMemo } from 'react';
import { EngineeringAsset, formatIDR } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Download, 
  QrCode, 
  Plus, 
  ChevronDown, 
  MoreVertical, 
  Search,
  Filter,
  Check,
  X,
  Printer
} from 'lucide-react';

interface AIAssetRegisterViewProps {
  assets: EngineeringAsset[];
  onOpenCreate: () => void;
  onEditAsset: (asset: EngineeringAsset) => void;
  onDeleteAsset: (id: string) => void;
  onSelectAssetForDetail: (asset: EngineeringAsset) => void;
}

export const AIAssetRegisterView: React.FC<AIAssetRegisterViewProps> = ({
  assets,
  onOpenCreate,
  onEditAsset,
  onDeleteAsset,
  onSelectAssetForDetail
}) => {
  // Tabs: Outline, Past Performance [3], Key Personnel [2], Facility Documents
  const [activeTab, setActiveTab] = useState<'Outline' | 'Past Performance' | 'Key Personnel' | 'Facility Documents'>('Outline');

  // Checkbox row selection
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  // Column visibility state for "Customize Columns"
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    code: true,
    name: true,
    category: true,
    status: true,
    location: true,
    brand: true,
    health: true,
    reviewer: true
  });

  // Modal QR Code Print
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrAsset, setQrAsset] = useState<EngineeringAsset | null>(null);

  // Section Add Modal
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  // Reviewer mapping for engineering assets
  const reviewers = ['Eddie Lake', 'Jamik Tashpulatov', 'Budi Santoso, ST', 'Ir. Hendra Gunawan', 'Agus Riyadi'];

  // Top KPI calculations
  const totalAsset = assets.length;
  const assetSehat = assets.filter(a => a.condition === 'Baik').length;
  const perluPerhatian = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const kritis = assets.filter(a => a.condition === 'Kritis').length;

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return assets.filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.brand.toLowerCase().includes(search.toLowerCase()) ||
      a.serialNumber.toLowerCase().includes(search.toLowerCase())
    );
  }, [assets, search]);

  const totalPages = Math.ceil(filteredAssets.length / rowsPerPage) || 1;
  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAssets.slice(start, start + rowsPerPage);
  }, [filteredAssets, currentPage, rowsPerPage]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(filteredAssets.map(a => a.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedRowIds(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const targetAssets = selectedRowIds.length > 0 
      ? assets.filter(a => selectedRowIds.includes(a.id))
      : filteredAssets;

    const headers = ['Kode Aset', 'Nama Aset', 'Kategori', 'Lokasi', 'Merek', 'Serial Number', 'Kondisi', 'Status Operasional', 'Health Index', 'Nilai Aset (IDR)'];
    const rows = targetAssets.map(a => [
      a.code,
      `"${a.name}"`,
      a.category,
      `"${a.location}"`,
      a.brand,
      a.serialNumber,
      a.condition,
      a.operationalStatus,
      a.healthIndex,
      a.assetValue
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Asset_Register_GLACE_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintQR = (asset?: EngineeringAsset) => {
    const target = asset || (selectedRowIds.length > 0 ? assets.find(a => a.id === selectedRowIds[0]) : assets[0]);
    if (target) {
      setQrAsset(target);
      setShowQRModal(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar matching Screenshot 1 Left */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Asset Register
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Inventaris lengkap aset operasional, riwayat pemeliharaan, dan pemantauan kondisi real-time.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => handlePrintQR()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak QR</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards matching Screenshot: Total aset, Aset sehat, Perlu perhatian, Kritis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total aset</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalAsset}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aset sehat</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {assetSehat}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Perlu perhatian</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {perluPerhatian}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kritis</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {kritis}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tabs and Controls Bar matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Pills Tabs: Outline, Past Performance 3, Key Personnel 2, Focus Documents */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 w-fit">
          <button
            onClick={() => setActiveTab('Outline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'Outline'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Outline
          </button>
          <button
            onClick={() => setActiveTab('Past Performance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'Past Performance'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Past Performance</span>
            <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Key Personnel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'Key Personnel'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Key Personnel</span>
            <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] flex items-center justify-center">
              2
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Facility Documents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'Facility Documents'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Facility Documents
          </button>
        </div>

        {/* Right buttons: Customize Columns, + Add Section, + Registrasi Aset */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <span>Customize Columns</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showColMenu && (
              <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-30 text-xs space-y-1">
                {Object.entries(visibleCols).map(([col, isVis]) => (
                  <label key={col} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer capitalize">
                    <input
                      type="checkbox"
                      checked={isVis}
                      onChange={() => setVisibleCols(prev => ({ ...prev, [col]: !isVis }))}
                      className="rounded accent-blue-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{col}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAddSectionModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section</span>
          </button>

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrasi Aset</span>
          </button>
        </div>
      </div>

      {/* Main Table matching Screenshot Columns: Header, Section Type, Status, Target, Limit, Reviewer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRowIds.length === filteredAssets.length && filteredAssets.length > 0}
                    onChange={handleSelectAll}
                    className="rounded accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-2 w-6 text-slate-300 text-center">⋮</th>
                {visibleCols.name && <th className="py-3 px-4">Header / Nama Aset</th>}
                {visibleCols.category && <th className="py-3 px-4">Section Type / Kategori</th>}
                {visibleCols.status && <th className="py-3 px-4">Status</th>}
                {visibleCols.health && <th className="py-3 px-4 text-center">Target (HI)</th>}
                <th className="py-3 px-4 text-center">Limit</th>
                {visibleCols.reviewer && <th className="py-3 px-4">Reviewer</th>}
                <th className="py-3 px-3 w-8 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {paginatedAssets.map((asset, idx) => {
                const isSelected = selectedRowIds.includes(asset.id);
                const assignedReviewer = reviewers[idx % reviewers.length];
                const isDone = asset.condition === 'Baik';

                return (
                  <tr
                    key={asset.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                      isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectRow(asset.id)}
                        className="rounded accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-2 text-slate-300 text-center cursor-grab">
                      ⋮⋮
                    </td>
                    {visibleCols.name && (
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">[{asset.code}]</span>
                          <span>{asset.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleCols.category && (
                      <td className="py-3 px-4 text-slate-500 font-medium">
                        {asset.category}
                      </td>
                    )}
                    {visibleCols.status && (
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isDone ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span className={isDone ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'}>
                            {isDone ? 'Done' : 'In Process'}
                          </span>
                        </span>
                      </td>
                    )}
                    {visibleCols.health && (
                      <td className="py-3 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                        {asset.healthIndex}
                      </td>
                    )}
                    <td className="py-3 px-4 text-center text-slate-500 font-mono">
                      {(idx * 3 + 5) % 30}
                    </td>
                    {visibleCols.reviewer && (
                      <td className="py-3 px-4">
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          {assignedReviewer}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handlePrintQR(asset)}
                          title="Cetak QR"
                          className="p-1 rounded-md text-slate-400 hover:text-blue-600"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectAssetForDetail(asset)}
                          title="Menu Aset"
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar matching Screenshot */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            {selectedRowIds.length} of {filteredAssets.length} row(s) selected.
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30"
                >
                  «
                </button>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30"
                >
                  ‹
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30"
                >
                  ›
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cetak QR Code */}
      {showQRModal && qrAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">QR Code Tagging Aset</h3>
              <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Generated QR Card */}
            <div className="my-5 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex flex-col items-center">
              {/* Scalable SVG QR code representation */}
              <div className="w-36 h-36 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex items-center justify-center">
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M50,40 h20 v10 h-20 z M40,60 h10 v30 h-10 z M70,70 h30 v10 h-30 z M80,90 h20 v10 h-20 z M60,80 h10 v20 h-10 z" />
                </svg>
              </div>
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mt-3">{qrAsset.code}</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-1">{qrAsset.name}</span>
              <span className="text-[10px] text-slate-400">SN: {qrAsset.serialNumber}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Label QR</span>
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Section */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Tambah Section Inventaris Baru</h3>
            <input
              type="text"
              placeholder="Nama section (misal: Substation Unit B)..."
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs mb-4"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert(`Section "${newSectionName}" berhasil ditambahkan.`);
                  setShowAddSectionModal(false);
                  setNewSectionName('');
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
