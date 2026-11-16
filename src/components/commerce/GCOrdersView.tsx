import React, { useState } from 'react';
import { 
  Package, 
  RotateCw, 
  Truck, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Navigation, 
  X, 
  Check, 
  MapPin, 
  Calendar,
  Building2,
  ChevronDown,
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
  const [trackingOrder, setTrackingOrder] = useState<OrderItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // KPIs calculation
  const totalPesanan = orderList.length;
  const diprosesCount = orderList.filter(o => o.status === 'Diproses').length;
  const dikirimCount = orderList.filter(o => o.status === 'Dikirim').length;
  const diterimaCount = orderList.filter(o => o.status === 'Selesai' || o.status === 'Disetujui').length;

  const categories = [
    'Semua Kategori',
    'Baja & Struktur',
    'Katup & Pemipaan',
    'Kabel & Elektrikal',
    'Sensor & Lab',
    'Pelumas & Kimia'
  ];

  const filteredOrders = orderList.filter(item => {
    const matchesQuery = item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Draft
          </span>
        );
      case 'Diproses':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Diproses
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

  const openTracker = (order: OrderItem) => {
    setTrackingOrder(order);
    if (onTrackOrder) {
      onTrackOrder(order);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">Pemantauan progres logistik, pengiriman barang, dan verifikasi penerimaan</p>
      </div>

      {/* 4 KPI Cards persis sesuai Screenshot 3 Kanan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pesanan */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Pesanan</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalPesanan || 128}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* Diproses */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Diproses</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{diprosesCount || 23}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <RotateCw className="w-5 h-5" />
          </div>
        </div>

        {/* Dikirim */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Dikirim</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{dikirimCount || 15}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Diterima */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Diterima</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{diterimaCount || 89}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Top Controls persis sesuai Screenshot 3 Kanan */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Daftar Pesanan</h2>
            <p className="text-xs text-gray-400 mt-0.5">Menampilkan dokumen PO aktif dan pengiriman terjadwal</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Dropdown 'Semua Kategori' */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Lacak Pesanan Button */}
            <button
              onClick={() => {
                if (orderList.length > 0) {
                  openTracker(orderList[1] || orderList[0]);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Lacak pesanan</span>
            </button>
          </div>
        </div>

        {/* Search bar row */}
        <div className="px-5 py-3 bg-gray-50/40 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nomor pesanan atau resi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Status pengiriman diperbarui otomatis tiap 30 menit
          </span>
        </div>

        {/* Table View matching Screenshot 3 Right */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="py-3 px-6">NOMOR</th>
                <th className="py-3 px-6">SUPPLIER</th>
                <th className="py-3 px-6">TOTAL</th>
                <th className="py-3 px-6 text-center">STATUS</th>
                <th className="py-3 px-6">PERKIRAAN TIBA</th>
                <th className="py-3 px-6 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Tidak ada pesanan pengadaan yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                      {item.orderNumber}
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
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.etaDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap relative">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openTracker(item)}
                          title="Lacak Ekspedisi"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Menu Dropdown */}
                          {activeMenuId === item.id && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 text-left">
                              <button
                                onClick={() => {
                                  setSelectedOrder(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-400" />
                                Rincian Pesanan
                              </button>
                              <button
                                onClick={() => {
                                  openTracker(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Lacak Logistik
                              </button>
                              {onUpdateOrderStatus && item.status !== 'Selesai' && (
                                <button
                                  onClick={() => {
                                    onUpdateOrderStatus(item.id, 'Selesai');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 border-t border-gray-50 mt-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Konfirmasi Penerimaan
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
          <span>Menampilkan {filteredOrders.length} dari {orderList.length} pesanan aktif</span>
          <span className="text-[11px] text-gray-400">Garansi pengiriman industri dengan asuransi all-risk</span>
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Lacak Pengiriman Pesanan</h3>
                <p className="text-xs text-gray-500">{trackingOrder.orderNumber} • Resi: {trackingOrder.trackingNumber}</p>
              </div>
            </div>

            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 flex items-center justify-between text-xs mb-5">
              <div>
                <span className="text-gray-500">Estimasi Tiba:</span>
                <p className="font-bold text-gray-900">{trackingOrder.etaDate}</p>
              </div>
              <div>
                <span className="text-gray-500">Kurir Pengiriman:</span>
                <p className="font-bold text-blue-600">Glace Heavy Cargo Express</p>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                <h4 className="text-xs font-bold text-gray-900">Dalam Pengiriman ke Lokasi Proyek</h4>
                <p className="text-[11px] text-gray-500">Armada Truk Logistik telah melintasi Gerbang Tol Cikampek Utama</p>
                <span className="text-[10px] text-gray-400">Hari ini, 09:30 WIB</span>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow"></div>
                <h4 className="text-xs font-semibold text-gray-800">Pemberangkatan dari Hub Logistik Pusat</h4>
                <p className="text-[11px] text-gray-500">Pusat Distribusi Glace Industri Cakung, Jakarta Timur</p>
                <span className="text-[10px] text-gray-400">Kemarin, 21:15 WIB</span>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                <h4 className="text-xs font-semibold text-gray-700">Inspeksi Quality Control & Packing Pallet</h4>
                <p className="text-[11px] text-gray-500">Pemeriksaan segel sertifikasi IEC dan packing anti karat</p>
                <span className="text-[10px] text-gray-400">18 November 2026, 14:00 WIB</span>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                <h4 className="text-xs font-semibold text-gray-700">Purchase Order Diterbitkan</h4>
                <p className="text-[11px] text-gray-500">Penerbitan PO oleh PT. Glace Kreasi Digital kepada {trackingOrder.supplier}</p>
                <span className="text-[10px] text-gray-400">17 November 2026, 10:00 WIB</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setTrackingOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                ORD
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-gray-500">Estimasi Kedatangan: {selectedOrder.etaDate}</p>
              </div>
            </div>

            <div className="space-y-4 py-3 border-y border-gray-100 my-4 text-xs">
              <div>
                <span className="text-gray-400 font-medium">Vendor Pengirim:</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedOrder.supplier}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Total Nilai Tagihan:</span>
                  <p className="text-base font-bold text-blue-600 mt-0.5">{selectedOrder.total}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Status Pengiriman:</span>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-medium">Nomor Resi / AWB:</span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedOrder.trackingNumber}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Total Komponen:</span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedOrder.itemsCount} Koli / Package</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const target = selectedOrder;
                  setSelectedOrder(null);
                  openTracker(target);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                Lacak Logistik
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
