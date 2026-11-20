import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Inbox, 
  CheckCircle2, 
  ArrowUpRight, 
  Search, 
  MoreVertical, 
  Plus, 
  X, 
  Eye, 
  Trash2,
  FileText
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
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // New RFQ form state
  const [formTitle, setFormTitle] = useState('');
  const [formItemsCount, setFormItemsCount] = useState(1);
  const [formSupplier, setFormSupplier] = useState('');
  const [formEstTotal, setFormEstTotal] = useState('');

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

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title & Lihat Template Referensi button (Persis Referensi 3 Kiri) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            RFQ
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Membuka Template Referensi Dokumen RFQ (.PDF & .XLSX)')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            Lihat Template Referensi
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat RFQ</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards (Persis Referensi 3 Kiri) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: RFQ Aktif */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">RFQ Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">24</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Menunggu Penawaran */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Menunggu Penawaran</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">7</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Penawaran Masuk */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Penawaran Masuk</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">15</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Selesai */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Selesai</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">182</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Filter Tabs (Persis Referensi 3 Kiri) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Daftar RFQ
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-300">
            5 Menampilkan
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-zinc-500">Filter:</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/60 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
              {(['Semua', 'Menunggu', 'Diproses', 'Selesai', 'Draft'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-2xs font-semibold'
                      : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor atau judul RFQ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Table RFQ (Clean Standard Monokrom Persis Referensi 3 Kiri) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                <th className="py-3 px-5">Nomor</th>
                <th className="py-3 px-4">Nama RFQ</th>
                <th className="py-3 px-4 text-center">Jumlah Item</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 dark:text-zinc-100">
                    {item.rfqNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-zinc-200 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-600 dark:text-zinc-400">
                    {item.itemsCount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Selesai' ? 'bg-emerald-500 dark:bg-emerald-400' :
                        item.status === 'Diproses' ? 'bg-blue-500' :
                        item.status === 'Menunggu' ? 'bg-amber-400' : 'bg-slate-400'
                      }`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-5 text-right relative">
                    <button
                      onClick={() => setActiveActionMenuId(activeActionMenuId === item.id ? null : item.id)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeActionMenuId === item.id && (
                      <div className="absolute right-5 mt-1 w-36 bg-white dark:bg-[#181a20] rounded-lg shadow-lg border border-slate-200 dark:border-zinc-700 py-1 z-30 text-xs">
                        <button
                          onClick={() => {
                            setSelectedRFQ(item);
                            setActiveActionMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Detail</span>
                        </button>
                        {onDeleteRFQ && (
                          <button
                            onClick={() => {
                              onDeleteRFQ(item.id);
                              setActiveActionMenuId(null);
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

      {/* Modal Buat RFQ Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateSubmit}
            className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Buat Permintaan Penawaran (RFQ)</h3>
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
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Judul RFQ</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengadaan Baja Ringan & Struktur Trus CNP 125"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Estimasi Nilai</label>
                  <input
                    type="text"
                    placeholder="Rp 14.250.000"
                    value={formEstTotal}
                    onChange={(e) => setFormEstTotal(e.target.value)}
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
                Terbitkan RFQ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Detail RFQ */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">{selectedRFQ.rfqNumber}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{selectedRFQ.title}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedRFQ(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Status:</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{selectedRFQ.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Jumlah Item:</span>
                <span className="text-slate-900 dark:text-zinc-100">{selectedRFQ.itemsCount} Unit</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Tanggal:</span>
                <span className="text-slate-900 dark:text-zinc-100">{selectedRFQ.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRFQ(null)}
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
