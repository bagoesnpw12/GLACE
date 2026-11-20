import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Download, 
  Layers, 
  X
} from 'lucide-react';

interface EnterpriseDataProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface DatasetPipelineItem {
  id: string;
  name: string;
  sourceType: string;
  syncFreq: string;
  status: 'Synced' | 'Pending';
  size: string;
}

export const EnterpriseDataView: React.FC<EnterpriseDataProps> = ({ onAddActivity }) => {
  const [filterType, setFilterType] = useState<'Semua Tipe' | 'Stream' | 'Batch'>('Semua Tipe');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState('');
  const [newSource, setNewSource] = useState('Google BigQuery');

  const [datasets, setDatasets] = useState<DatasetPipelineItem[]>([
    {
      id: '1',
      name: 'enterprise_procurement_logs',
      sourceType: 'Google BigQuery',
      syncFreq: 'Real-time Stream',
      status: 'Synced',
      size: '8.4 TB'
    },
    {
      id: '2',
      name: 'enterprise_procurement_logs',
      sourceType: 'Google BigQuery',
      syncFreq: 'Setiap 15 Menit',
      status: 'Synced',
      size: '8.4 TB'
    },
    {
      id: '3',
      name: 'enterprise_procurement_logs',
      sourceType: 'Google BigQuery',
      syncFreq: 'Real-time Stream',
      status: 'Pending',
      size: '8.4 TB'
    },
    {
      id: '4',
      name: 'enterprise_procurement_logs',
      sourceType: 'Google BigQuery',
      syncFreq: 'Harian (02:00 WIB)',
      status: 'Synced',
      size: '8.4 TB'
    }
  ]);

  const handleCreatePipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPipelineName) return;
    const newItem: DatasetPipelineItem = {
      id: String(Date.now()),
      name: newPipelineName,
      sourceType: newSource,
      syncFreq: 'Real-time Stream',
      status: 'Synced',
      size: '0.1 TB'
    };
    setDatasets([newItem, ...datasets]);
    onAddActivity(`Membuat pipeline data baru: ${newPipelineName}`, 'Enterprise Solutions');
    setShowAddModal(false);
    setNewPipelineName('');
  };

  const filtered = datasets.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.sourceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'Semua Tipe' ? true :
                          filterType === 'Stream' ? d.syncFreq.toLowerCase().includes('stream') :
                          !d.syncFreq.toLowerCase().includes('stream');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Title & Action Buttons (Persis Referensi 3 Kiri) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Data
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('Mengekspor Metrik Volume & Latency Pipeline (.CSV)');
              onAddActivity('Ekspor metrik data volume', 'Enterprise Solutions');
            }}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            Export Metrik
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat Pipeline Data</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Strip (Persis Referensi 3 Kiri) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Volume Data */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total Volume Data</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">24.6 TB</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Database className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Dataset Aktif */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Dataset Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">48 Dataset</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Pipeline Streaming */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Pipeline Streaming</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">16 Active</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Download className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Health Rate */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Health Rate</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">99.95%</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Database className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Katalog Dataset & Pipeline Data
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Manajemen data repository, latensi sinkronisasi, dan integrasi upstream enterprise
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
              placeholder="Cari dataset atau pipeline..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/60 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
            {(['Semua Tipe', 'Stream', 'Batch'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  filterType === tab
                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-2xs font-semibold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Table Dataset & Pipeline Data (Persis Referensi 3 Kiri) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                <th className="py-3 px-5">Nama Dataset</th>
                <th className="py-3 px-4">Tipe Sumber</th>
                <th className="py-3 px-4">Frekuensi Sync</th>
                <th className="py-3 px-4">Status Sync</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-5 text-right">Ukuran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-slate-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500" />
                      <span>{d.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-300">
                    {d.sourceType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">
                    {d.syncFreq}
                  </td>
                  <td className="py-3.5 px-4">
                    {d.status === 'Synced' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        Synced
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => alert(`Mengelola konfigurasi ETL & skema untuk ${d.name}`)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
                    >
                      Kelola
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-right font-mono text-slate-600 dark:text-zinc-400">
                    {d.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Pipeline Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleCreatePipeline}
            className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Buat Pipeline Data Baru</h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Nama Dataset / Pipeline</label>
                <input
                  type="text"
                  required
                  placeholder="enterprise_scada_stream"
                  value={newPipelineName}
                  onChange={(e) => setNewPipelineName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Sumber Data (Upstream)</label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Google BigQuery">Google BigQuery</option>
                  <option value="Snowflake Data Cloud">Snowflake Data Cloud</option>
                  <option value="Apache Kafka Topic">Apache Kafka Topic</option>
                  <option value="AWS Redshift">AWS Redshift</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Inisialisasi Pipeline
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
