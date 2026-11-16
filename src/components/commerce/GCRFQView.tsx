import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Inbox, 
  CheckCircle2, 
  ArrowUpRight, 
  Search, 
  FileText, 
  MoreVertical, 
  Plus, 
  X, 
  Check, 
  ChevronRight,
  Filter,
  Eye,
  Trash2
} from 'lucide-react';
import { RFQItem } from '../../data/commerceData';

interface GCRFQViewProps {
  rfqList: RFQItem[];
  onAddRFQ?: (newRFQ: Partial<RFQItem>) => void;
  onUpdateRFQStatus?: (id: string, status: RFQItem['status']) => void;
  onDeleteRFQ?: (id: string) => void;
}

export const GCRFQView: React.FC<GCRFQViewProps> = ({
  rfqList,
  onAddRFQ,
  onUpdateRFQStatus,
  onDeleteRFQ
}) => {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Menunggu' | 'Diproses' | 'Selesai' | 'Draft'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRFQ, setSelectedRFQ] = useState<RFQItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // New RFQ form state
  const [formTitle, setFormTitle] = useState('');
  const [formItemsCount, setFormItemsCount] = useState(1);
  const [formSupplier, setFormSupplier] = useState('');
  const [formEstTotal, setFormEstTotal] = useState('');

  // Counts based on rfqList
  const totalCount = rfqList.length;
  const menungguCount = rfqList.filter(item => item.status === 'Menunggu').length;
  const diprosesCount = rfqList.filter(item => item.status === 'Diproses').length;
  const selesaiCount = rfqList.filter(item => item.status === 'Selesai').length;

  const filteredItems = rfqList.filter(item => {
    const matchesTab = activeTab === 'Semua' ? true : item.status === activeTab;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.supplier && item.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesQuery;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (onAddRFQ) {
      onAddRFQ({
        title: formTitle,
        itemsCount: Number(formItemsCount) || 1,
        supplier: formSupplier || 'PT Mitra Distribusi Industri',
        totalEstimated: formEstTotal || 'Rp 12.500.000',
        status: 'Menunggu',
        date: '20 November 2026'
      });
    }

    setFormTitle('');
    setFormItemsCount(1);
    setFormSupplier('');
    setFormEstTotal('');
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: RFQItem['status']) => {
    switch (status) {
      case 'Diproses':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            Diproses
          </span>
        );
      case 'Menunggu':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
            Menunggu
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Selesai
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Template Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">RFQ</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola permintaan penawaran harga pengadaan komponen & material teknik</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all"
          >
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Lihat Template Referensi</span>
          </button>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Buat RFQ Baru</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards persis sesuai Screenshot 2 Kanan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: RFQ Aktif */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">RFQ Aktif</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalCount || 24}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Menunggu Penawaran */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Menunggu Penawaran</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{menungguCount || 7}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Penawaran Masuk */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Penawaran Masuk</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{diprosesCount || 15}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Selesai */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Selesai</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{selesaiCount || 182}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header & Filter Controls */}
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-gray-900">Daftar RFQ</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                {filteredItems.length} Terverifikasi
              </span>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari nomor atau nama RFQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs: Semua, Menunggu, Diproses, Selesai, Draft */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {(['Semua', 'Menunggu', 'Diproses', 'Selesai', 'Draft'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table View matching Screenshot 2 Right */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="py-3 px-6">NOMOR</th>
                <th className="py-3 px-6">NAMA RFQ</th>
                <th className="py-3 px-6 text-center">JUMLAH ITEM</th>
                <th className="py-3 px-6 text-center">STATUS</th>
                <th className="py-3 px-6">TANGGAL</th>
                <th className="py-3 px-6 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Tidak ada dokumen RFQ yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                      {item.rfqNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">
                      <div>
                        <span>{item.title}</span>
                        {item.supplier && (
                          <div className="text-[11px] text-gray-400 mt-0.5 font-normal">
                            Target Vendor: {item.supplier}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-gray-700 whitespace-nowrap">
                      {item.itemsCount}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap relative">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedRFQ(item)}
                          title="Lihat Detail"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setActiveActionMenuId(activeActionMenuId === item.id ? null : item.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {activeActionMenuId === item.id && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 text-left">
                              <button
                                onClick={() => {
                                  setSelectedRFQ(item);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-400" />
                                Lihat Detail
                              </button>
                              {onUpdateRFQStatus && item.status !== 'Selesai' && (
                                <button
                                  onClick={() => {
                                    onUpdateRFQStatus(item.id, 'Selesai');
                                    setActiveActionMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Tandai Selesai
                                </button>
                              )}
                              {onDeleteRFQ && (
                                <button
                                  onClick={() => {
                                    onDeleteRFQ(item.id);
                                    setActiveActionMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50 mt-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Hapus RFQ
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>Menampilkan {filteredItems.length} dari {rfqList.length} total dokumen RFQ</span>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Siklus tender IEC standard: 14 hari kerja</span>
          </div>
        </div>
      </div>

      {/* RFQ Detail Modal */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedRFQ(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                RFQ
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedRFQ.rfqNumber}</h3>
                <p className="text-xs text-gray-500">Dibuat pada {selectedRFQ.date}</p>
              </div>
            </div>

            <div className="space-y-4 py-2 border-y border-gray-100 my-4 text-xs">
              <div>
                <span className="text-gray-400 font-medium">Nama Permintaan (Title):</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedRFQ.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Jumlah Item:</span>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedRFQ.itemsCount} Unit/SKU</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Status Dokumen:</span>
                  <div className="mt-1">{getStatusBadge(selectedRFQ.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Target Rekanan Supplier:</span>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">
                    {selectedRFQ.supplier || 'Terbuka Untuk Semua Mitra Terdaftar'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Estimasi Budget:</span>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {selectedRFQ.totalEstimated || 'Rp 14.250.000'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedRFQ(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              {onUpdateRFQStatus && selectedRFQ.status !== 'Selesai' && (
                <button
                  onClick={() => {
                    onUpdateRFQStatus(selectedRFQ.id, 'Selesai');
                    setSelectedRFQ(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Setujui & Selesaikan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create RFQ Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1">Buat Dokumen RFQ Baru</h3>
            <p className="text-xs text-gray-500 mb-4">Lengkapi spesifikasi kebutuhan material industri untuk diterbitkan ke rekanan</p>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Judul / Nama Kebutuhan Pengadaan</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kabel Serat Optik Multimode Core Industri"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Jumlah Item / Unit</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formItemsCount}
                    onChange={(e) => setFormItemsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Estimasi Budget</label>
                  <input 
                    type="text" 
                    placeholder="Rp 14.250.000"
                    value={formEstTotal}
                    onChange={(e) => setFormEstTotal(e.target.value)}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Pilihan Rekanan Supplier (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: PT Mega Baja Presisi"
                  value={formSupplier}
                  onChange={(e) => setFormSupplier(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Terbitkan RFQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setShowTemplateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Template Referensi Dokumen RFQ
            </h3>
            <p className="text-xs text-gray-500 mb-4">Gunakan format standar Glace Commerce untuk percepatan respon tender</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Template Tender Elektrikal (SPLN / IEC)</h4>
                  <p className="text-[11px] text-gray-500">Standar trafo distribusi, breaker panel & kabel tegangan menengah</p>
                </div>
                <button 
                  onClick={() => {
                    setFormTitle('Pengadaan Peralatan Switchgear 20kV SPLN D3');
                    setFormItemsCount(8);
                    setShowTemplateModal(false);
                    setShowCreateModal(true);
                  }}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 text-[11px]"
                >
                  Gunakan
                </button>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Template Mekanikal & Struktur Baja</h4>
                  <p className="text-[11px] text-gray-500">Standar CNP, pipa seamless ASTM A106, katup gate valve 150#</p>
                </div>
                <button 
                  onClick={() => {
                    setFormTitle('Pengadaan Baja Ringan & Struktur Trus CNP 125');
                    setFormItemsCount(12);
                    setShowTemplateModal(false);
                    setShowCreateModal(true);
                  }}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 text-[11px]"
                >
                  Gunakan
                </button>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Template Otomasi & Instrumen Sensor</h4>
                  <p className="text-[11px] text-gray-500">Standar PLC Siemens S7-1200, linear carriage guide & sensor PT100</p>
                </div>
                <button 
                  onClick={() => {
                    setFormTitle('Peralatan Sensor Suhu & Kalibrasi Laboratorium');
                    setFormItemsCount(6);
                    setShowTemplateModal(false);
                    setShowCreateModal(true);
                  }}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 text-[11px]"
                >
                  Gunakan
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
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
