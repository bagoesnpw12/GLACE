import React, { useState } from 'react';
import { 
  Package, 
  RotateCw, 
  Truck, 
  CheckCircle2, 
  Search, 
  MoreVertical, 
  Eye, 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { OrderItem } from '../../data/commerceData';

interface GCOrdersViewProps {
  orderList: OrderItem[];
  onUpdateOrderStatus?: (id: string, status: OrderItem['status']) => void;
  onTrackOrder?: (order: OrderItem) => void;
}

export const GCOrdersView: React.FC<GCOrdersViewProps> = ({
  orderList,
  onUpdateOrderStatus,
  onTrackOrder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredOrders = orderList.filter(item => {
    const matchesQuery = item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Orders
        </h1>
      </div>

      {/* 2. Top 4 Metric KPI Cards (Persis Referensi 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Pesanan */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total Pesanan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">128</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Diproses */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Diproses</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">23</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <RotateCw className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Dikirim */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Dikirim</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">15</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Diterima */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Diterima</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">89</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Action Bar (Persis Referensi 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Daftar Pesanan
          </h2>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
            Menampilkan dokumen PO aktif dan pengiriman terjadwal
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Dropdown Semua Kategori */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option>Semua Kategori</option>
            <option>Baja & Struktur</option>
            <option>Katup & Pemipaan</option>
            <option>Kabel & Elektrikal</option>
          </select>

          <button
            onClick={() => alert('Membuka modul pelacakan logistik live tracking')}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            Lacak pesanan
          </button>
        </div>
      </div>

      {/* 4. Table Orders (Persis Referensi 4) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                <th className="py-3 px-5">Nomor</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Perkiraan Tiba</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filteredOrders.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                    {item.orderNumber}
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
                    {item.etaDate || '20 November 2026'}
                  </td>
                  <td className="py-3.5 px-5 text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-5 mt-1 w-36 bg-white dark:bg-[#181a20] rounded-lg shadow-lg border border-slate-200 dark:border-zinc-700 py-1 z-30 text-xs">
                        <button
                          onClick={() => {
                            setSelectedOrder(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail Status</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">{selectedOrder.orderNumber}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{selectedOrder.supplier}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Total Nilai:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-zinc-100">{selectedOrder.total}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Status Pesanan:</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Nomor Resi Cargo:</span>
                <span className="font-mono text-slate-900 dark:text-zinc-100">{selectedOrder.trackingNumber}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
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
