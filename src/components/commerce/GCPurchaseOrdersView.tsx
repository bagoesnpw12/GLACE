import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Send, 
  Search, 
  Plus, 
  X, 
  Check, 
  MoreVertical, 
  Eye, 
  Trash2, 
  ShoppingCart,
  Download,
  Building2,
  ExternalLink
} from 'lucide-react';
import { PurchaseOrderItem } from '../../data/commerceData';

interface GCPurchaseOrdersViewProps {
  poList: PurchaseOrderItem[];
  onCreatePO?: (newPO: Partial<PurchaseOrderItem>) => void;
  onUpdatePOStatus?: (id: string, status: PurchaseOrderItem['status']) => void;
  onDeletePO?: (id: string) => void;
  onConvertToOrder?: (po: PurchaseOrderItem) => void;
}

export const GCPurchaseOrdersView: React.FC<GCPurchaseOrdersViewProps> = ({
  poList,
  onCreatePO,
  onUpdatePOStatus,
  onDeletePO,
  onConvertToOrder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrderItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form State
  const [formSupplier, setFormSupplier] = useState('');
  const [formTotal, setFormTotal] = useState('');
  const [formItemsCount, setFormItemsCount] = useState(12);
  const [formRfqRef, setFormRfqRef] = useState('RFQ-001');

  // KPI Calculations
  const totalPOCount = poList.length;
  const draftCount = poList.filter(item => item.status === 'Draft').length;
  const disetujuiCount = poList.filter(item => item.status === 'Disetujui').length;
  const dikirimCount = poList.filter(item => item.status === 'Dikirim').length;

  const filteredList = poList.filter(item => {
    const matchesFilter = statusFilter === 'All' ? true : item.status === statusFilter;
    const matchesQuery = item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.rfqReference && item.rfqReference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSupplier.trim()) return;

    if (onCreatePO) {
      onCreatePO({
        supplier: formSupplier,
        total: formTotal || 'Rp 14.250.000',
        numericTotal: 14250000,
        status: 'Draft',
        date: '20 November 2026',
        rfqReference: formRfqRef || 'RFQ-001',
        itemCount: Number(formItemsCount) || 12
      });
    }

    setFormSupplier('');
    setFormTotal('');
    setFormItemsCount(12);
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: PurchaseOrderItem['status']) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Draft
          </span>
        );
      case 'Dikirim':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Dikirim
          </span>
        );
      case 'Disetujui':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Disetujui
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Selesai
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Purchase Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">Penerbitan surat pesanan resmi dan monitoring otorisasi pengadaan barang</p>
      </div>

      {/* 4 KPI Cards persis sesuai Screenshot 3 Kiri */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total PO */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total PO</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalPOCount || 128}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Draft */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Draft</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{draftCount || 14}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Disetujui */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Disetujui</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{disetujuiCount || 42}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Dikirim */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Dikirim</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{dikirimCount || 72}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Send className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Top Controls matching Screenshot 3 Left */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Daftar Purchase Order</h2>
            <p className="text-xs text-gray-400 mt-0.5">5 transaksi terverifikasi terakhir ditampilkan</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari PO atau Supplier"
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

            {/* + BUAT PO Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>+ BUAT PO</span>
            </button>
          </div>
        </div>

        {/* Table View matching Screenshot 3 Left */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="py-3 px-6">NOMOR</th>
                <th className="py-3 px-6">SUPPLIER</th>
                <th className="py-3 px-6">TOTAL</th>
                <th className="py-3 px-6 text-center">STATUS</th>
                <th className="py-3 px-6">TANGGAL</th>
                <th className="py-3 px-6 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Tidak ada purchase order yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                      {item.poNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{item.supplier}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                      {item.total}
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
                          onClick={() => setSelectedPO(item)}
                          title="Lihat Detail PO"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Menu dropdown */}
                          {activeMenuId === item.id && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 text-left">
                              <button
                                onClick={() => {
                                  setSelectedPO(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-400" />
                                Lihat Detail
                              </button>
                              {item.status !== 'Disetujui' && onUpdatePOStatus && (
                                <button
                                  onClick={() => {
                                    onUpdatePOStatus(item.id, 'Disetujui');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Setujui PO
                                </button>
                              )}
                              {item.status === 'Disetujui' && onConvertToOrder && (
                                <button
                                  onClick={() => {
                                    onConvertToOrder(item);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  Proses ke Pesanan
                                </button>
                              )}
                              {onDeletePO && (
                                <button
                                  onClick={() => {
                                    onDeletePO(item.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50 mt-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Batalkan PO
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
          <span>Menampilkan {filteredList.length} dari {poList.length} purchase orders</span>
          <span className="text-[11px] text-gray-400">Standar Faktur Pajak e-Faktur terintegrasi</span>
        </div>
      </div>

      {/* PO Detail Modal */}
      {selectedPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedPO(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                PO
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedPO.poNumber}</h3>
                <p className="text-xs text-gray-500">Tanggal Terbit: {selectedPO.date}</p>
              </div>
            </div>

            <div className="space-y-4 py-3 border-y border-gray-100 my-4 text-xs">
              <div>
                <span className="text-gray-400 font-medium">Mitra Supplier Resmi:</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedPO.supplier}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Nilai Total Tagihan:</span>
                  <p className="text-base font-bold text-blue-600 mt-0.5">{selectedPO.total}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Status Pengadaan:</span>
                  <div className="mt-1">{getStatusBadge(selectedPO.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Referensi RFQ:</span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedPO.rfqReference || 'RFQ-001'}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Jumlah Item/Komponen:</span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedPO.itemCount} Unit</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal Barang:</span>
                  <span className="font-medium text-gray-700">Rp 12.837.838</span>
                </div>
                <div className="flex justify-between">
                  <span>PPN 11%:</span>
                  <span className="font-medium text-gray-700">Rp 1.412.162</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 font-bold text-gray-900 text-xs">
                  <span>Total Transaksi:</span>
                  <span className="text-blue-600">{selectedPO.total}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  alert(`Mengunduh dokumen PDF Purchase Order resmi: ${selectedPO.poNumber}.pdf`);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh PDF
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPO(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                {selectedPO.status === 'Disetujui' && onConvertToOrder && (
                  <button
                    onClick={() => {
                      onConvertToOrder(selectedPO);
                      setSelectedPO(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Buat Pesanan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create PO Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1">Terbitkan Purchase Order Baru</h3>
            <p className="text-xs text-gray-500 mb-4">Input data PO berdasarkan tender RFQ yang telah disetujui</p>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Nama Mitra Supplier</label>
                <input 
                  type="text" 
                  placeholder="Contoh: PT Mega Baja Presisi"
                  value={formSupplier}
                  onChange={(e) => setFormSupplier(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Referensi Dokumen RFQ</label>
                  <input 
                    type="text" 
                    placeholder="RFQ-001"
                    value={formRfqRef}
                    onChange={(e) => setFormRfqRef(e.target.value)}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Jumlah Item</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formItemsCount}
                    onChange={(e) => setFormItemsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Total Nilai Transaksi (Rp)</label>
                <input 
                  type="text" 
                  placeholder="Rp 14.250.000"
                  value={formTotal}
                  onChange={(e) => setFormTotal(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                  Simpan Draft PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
