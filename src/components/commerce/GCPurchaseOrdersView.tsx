import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  MoreVertical, 
  Eye, 
  Trash2, 
  ShoppingCart,
  FileText
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
  const [selectedPO, setSelectedPO] = useState<PurchaseOrderItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form State
  const [formSupplier, setFormSupplier] = useState('');
  const [formTotal, setFormTotal] = useState('');
  const [formItemsCount, setFormItemsCount] = useState(12);

  const filteredList = poList.filter(item => {
    const matchesQuery = item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.rfqReference && item.rfqReference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesQuery;
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
        itemCount: Number(formItemsCount) || 12,
        date: '20 November 2026'
      });
    }

    setFormSupplier('');
    setFormTotal('');
    setFormItemsCount(12);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Purchase Orders
        </h1>
      </div>

      {/* 2. Top 4 Metric KPI Strip (Persis Referensi 3 Kanan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total PO */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total PO</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">128</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Draft */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Draft</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">14</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Disetujui */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Disetujui</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">42</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Dikirim */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Dikirim</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">72</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Action Bar (Persis Referensi 3 Kanan) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Daftar Purchase Order
          </h2>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
            5 transaksi terverifikasi terakhir ditampilkan
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari PO atau Supplier..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ BUAT PO</span>
          </button>
        </div>
      </div>

      {/* 4. Table Purchase Orders (Persis Referensi 3 Kanan) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                <th className="py-3 px-5">Nomor</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                    {item.poNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-zinc-200">
                    {item.supplier}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-900 dark:text-zinc-100">
                    {item.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Selesai' || item.status === 'Disetujui' ? 'bg-emerald-500 dark:bg-emerald-400' :
                        item.status === 'Dikirim' ? 'bg-blue-500' : 'bg-slate-400'
                      }`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-5 text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-5 mt-1 w-40 bg-white dark:bg-[#181a20] rounded-lg shadow-lg border border-slate-200 dark:border-zinc-700 py-1 z-30 text-xs">
                        <button
                          onClick={() => {
                            setSelectedPO(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Rincian</span>
                        </button>
                        {onConvertToOrder && item.status !== 'Selesai' && (
                          <button
                            onClick={() => {
                              onConvertToOrder(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Proses Pesanan</span>
                          </button>
                        )}
                        {onDeletePO && (
                          <button
                            onClick={() => {
                              onDeletePO(item.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat PO */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateSubmit}
            className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Buat Purchase Order (PO) Baru</h3>
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Nama Supplier / Vendor</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Mega Baja Presisi"
                  value={formSupplier}
                  onChange={(e) => setFormSupplier(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Total Nilai Kontrak</label>
                  <input
                    type="text"
                    placeholder="Rp 14.250.000"
                    value={formTotal}
                    onChange={(e) => setFormTotal(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Jumlah Item</label>
                  <input
                    type="number"
                    min="1"
                    value={formItemsCount}
                    onChange={(e) => setFormItemsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Terbitkan PO
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Detail PO */}
      {selectedPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">{selectedPO.poNumber}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{selectedPO.supplier}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedPO(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Total Nilai:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-zinc-100">{selectedPO.total}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Status PO:</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{selectedPO.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Tanggal Diterbitkan:</span>
                <span className="text-slate-900 dark:text-zinc-100">{selectedPO.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPO(null)}
                className="px-4 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-zinc-700"
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
