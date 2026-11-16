import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Database, 
  Layers, 
  Radio, 
  Check, 
  X,
  Server
} from 'lucide-react';

interface EnterpriseIntegrationsProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface IntegrationCardItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  isConnected: boolean;
  needsAuth: boolean;
  statusText: string;
}

export const EnterpriseIntegrationsView: React.FC<EnterpriseIntegrationsProps> = ({ onAddActivity }) => {
  const [filterTab, setFilterTab] = useState<'Semua' | 'Terhubung' | 'Perhatian'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIntegrationName, setNewIntegrationName] = useState('');
  const [newIntegrationType, setNewIntegrationType] = useState('ERP Connector');

  const [integrations, setIntegrations] = useState<IntegrationCardItem[]>([
    {
      id: '1',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    },
    {
      id: '2',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    },
    {
      id: '3',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    },
    {
      id: '4',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    },
    {
      id: '5',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    },
    {
      id: '6',
      name: 'Oracle Cloud Infrastructure',
      provider: 'Lakehouse Storage',
      category: 'Cloud Storage',
      description: 'Penyimpanan data aman dan pipeline analitik data warehousing.',
      isConnected: true,
      needsAuth: true,
      statusText: 'Hubungkan Ulang'
    }
  ]);

  const handleToggle = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isConnected;
        onAddActivity(`${nextState ? 'Mengaktifkan' : 'Menonaktifkan'} integrasi ${item.name}`, 'Enterprise Solutions');
        return { ...item, isConnected: nextState };
      }
      return item;
    }));
  };

  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntegrationName) return;
    const newEntry: IntegrationCardItem = {
      id: String(Date.now()),
      name: newIntegrationName,
      provider: newIntegrationType,
      category: 'Enterprise Middleware',
      description: 'Pipeline sinkronisasi data enterprise dua arah terenkripsi TLS 1.3.',
      isConnected: true,
      needsAuth: false,
      statusText: 'Terhubung'
    };
    setIntegrations([newEntry, ...integrations]);
    onAddActivity(`Menambahkan konektor integrasi baru: ${newIntegrationName}`, 'Enterprise Solutions');
    setShowAddModal(false);
    setNewIntegrationName('');
  };

  const filtered = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTab === 'Semua' ? true :
                          filterTab === 'Terhubung' ? item.isConnected :
                          item.needsAuth;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title, Search, Filter Tabs, Add Button (Persis Gambar 3 Kiri Atas) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Integrations
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari model atau architecture..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#161a26] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            {(['Semua', 'Terhubung', 'Perhatian'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filterTab === tab
                    ? 'bg-white dark:bg-[#131722] text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Add Integration Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Integrasi</span>
          </button>
        </div>
      </div>

      {/* 2. Top 3 Metric KPI Strip (Persis Gambar 3 Tengah Atas) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Koneksi Aktif */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Koneksi Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">5 / 6</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Latency rata-rata */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Latency rata-rata</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">23,283.5</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Perlu tindakan */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Perlu tindakan</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1 Hubungan</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Grid Kartu Konektor Integrasi (2 Baris x 3 Kolom - Persis Gambar 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Icon, Provider & Toggle Switch */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                    <Database className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {item.provider}
                    </span>
                  </div>
                </div>

                {/* Toggle Pill Switch */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    item.isConnected ? 'bg-slate-900 dark:bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      item.isConnected ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Actions: Status indicator & Hubungkan Ulang button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                • Memerlukan Auth
              </span>

              <button
                onClick={() => {
                  alert(`Memperbarui otentikasi OAuth2/API Key untuk ${item.name}`);
                  onAddActivity(`Memperbarui kredensial integrasi ${item.name}`, 'Enterprise Solutions');
                }}
                className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                Hubungkan Ulang
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Full-width Event Mesh Banner (Persis Gambar 3 Bawah) */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] flex items-center gap-4 shadow-2xs">
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
          <Radio className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Event Mesh Sync Status
          </span>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Siklus sinkronisasi terakhir: 42 detik yang lalu via Webhook Gateway #04
          </div>
        </div>
      </div>

      {/* Modal Tambah Integrasi */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleAddIntegration}
            className="bg-white dark:bg-[#131722] rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tambah Konektor Integrasi</h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Layanan / Platform</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SAP S/4HANA Cloud"
                  value={newIntegrationName}
                  onChange={(e) => setNewIntegrationName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kategori Endpoint</label>
                <select
                  value={newIntegrationType}
                  onChange={(e) => setNewIntegrationType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="ERP Connector">ERP Connector</option>
                  <option value="SCADA & Telemetry Broker">SCADA & Telemetry Broker</option>
                  <option value="Cloud Data Lake">Cloud Data Lake</option>
                  <option value="Primavera P6 API">Primavera P6 API</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Hubungkan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
