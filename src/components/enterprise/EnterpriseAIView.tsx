import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Search, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Clock, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronDown,
  X
} from 'lucide-react';

interface EnterpriseAIProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface AIModelItem {
  id: string;
  name: string;
  architecture: string;
  type: string;
  latency: string;
  status: 'aktif' | 'siaga' | 'pelatihan';
  tokens: string;
}

export const EnterpriseAIView: React.FC<EnterpriseAIProps> = ({ onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newModelType, setNewModelType] = useState('classifier');

  const [models, setModels] = useState<AIModelItem[]>([
    {
      id: '1',
      name: 'GLACE LLM-Domain Rekayasa',
      architecture: 'Fine-tuned 70B',
      type: 'classifier',
      latency: '34ms',
      status: 'aktif',
      tokens: '90m token'
    },
    {
      id: '2',
      name: 'OCR Diagram CAD & P&ID Vision',
      architecture: 'Vision Transformer',
      type: 'Computer Vision',
      latency: '58ms',
      status: 'aktif',
      tokens: '90m token'
    },
    {
      id: '3',
      name: 'Predictive Asset Maintenance',
      architecture: 'Time-Series Ensemble',
      type: 'classifier',
      latency: '26ms',
      status: 'aktif',
      tokens: '90m token'
    },
    {
      id: '4',
      name: 'SNI / IEC Compliance Validator',
      architecture: 'Hybrid RAG',
      type: 'classifier',
      latency: '42ms',
      status: 'aktif',
      tokens: '90m token'
    }
  ]);

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName) return;
    const item: AIModelItem = {
      id: String(Date.now()),
      name: newModelName,
      architecture: 'Enterprise Private Pod',
      type: newModelType,
      latency: '35ms',
      status: 'aktif',
      tokens: '0 token'
    };
    setModels([item, ...models]);
    onAddActivity(`Deploy model AI baru: ${newModelName}`, 'Enterprise Solutions');
    setShowDeployModal(false);
    setNewModelName('');
  };

  const filteredModels = models.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Semua Status' ? true : m.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Enterprise AI
        </h1>
      </div>

      {/* 2. Top 4 Metric KPI Strip (Persis Gambar Referensi 2 Kiri) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Models */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Active Models</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">24</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Bot className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Monthly Tokens */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Monthly Tokens</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">142.8M</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Avg Inference Latency */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Avg Inference Latency</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">48ms</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Endpoints Healthy */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Endpoints Healthy</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">98.89%</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Model AI & Infrastruktur Inference
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari model atau arsitektur..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none"
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Siaga</option>
          </select>

          <button
            onClick={() => setShowDeployModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Deploy Model Baru</span>
          </button>
        </div>
      </div>

      {/* 4. Table Model AI & Infrastruktur (Persis Referensi 2 Kiri) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/70 dark:bg-[#090a0d]">
                <th className="py-3 px-5">Nama Model</th>
                <th className="py-3 px-4">Tipe</th>
                <th className="py-3 px-4">Latensi</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Konsumsi Token</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filteredModels.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-blue-500 dark:text-zinc-400" />
                      <span>{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-300">
                    {m.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-zinc-400">
                    {m.latency}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => alert(`Mengelola konfigurasi endpoint & throughput untuk ${m.name}`)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
                    >
                      Kelola
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-mono text-slate-600 dark:text-zinc-400">
                    {m.tokens}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Bottom 3 Control Cards (Persis Gambar Referensi 2 Kiri) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* Card 1: AI Governance & Guardrails */}
        <div 
          onClick={() => alert('Membuka modul AI Governance & Safety Guardrails')}
          className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] hover:border-slate-300 dark:hover:border-zinc-700 transition-colors flex items-center gap-3.5 shadow-2xs cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700">
            <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-zinc-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-zinc-100">
              AI Governance & Guardrails
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Filter halusinasi dan batasan PII aktif
            </div>
          </div>
        </div>

        {/* Card 2: Auto-Scaling Elastic Pool */}
        <div 
          onClick={() => alert('Membuka konfigurasi Auto-Scaling Elastic GPU/TPU Pool')}
          className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] hover:border-slate-300 dark:hover:border-zinc-700 transition-colors flex items-center gap-3.5 shadow-2xs cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700">
            <Zap className="w-5 h-5 text-slate-600 dark:text-zinc-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-zinc-100">
              Auto-Scaling Elastic Pool
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              2x GPU A100 siap untuk beban puncak
            </div>
          </div>
        </div>

        {/* Card 3: Token Budget Limits */}
        <div 
          onClick={() => alert('Membuka pengaturan kuota & batas limit token organisasi')}
          className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] hover:border-slate-300 dark:hover:border-zinc-700 transition-colors flex items-center gap-3.5 shadow-2xs cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700">
            <Sliders className="w-5 h-5 text-slate-600 dark:text-zinc-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-zinc-100">
              Token Budget Limits
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Alokasi per divisi & pencegahan over-billing
            </div>
          </div>
        </div>
      </div>

      {/* Modal Deploy Model Baru */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleDeploy}
            className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Deploy Model AI Enterprise</h3>
              <button 
                type="button" 
                onClick={() => setShowDeployModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Nama Model AI</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Turbine Anomaly Detector v3"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">Tipe Model</label>
                <select
                  value={newModelType}
                  onChange={(e) => setNewModelType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181a20] border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="classifier">Classifier</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="LLM & NLP">LLM & NLP</option>
                  <option value="Time-Series Forecasting">Time-Series Forecasting</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeployModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Deploy Sekarang
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
