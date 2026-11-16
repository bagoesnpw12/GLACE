import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileCheck, 
  Clock, 
  ArrowUpRight, 
  Eye, 
  KeyRound, 
  Sliders, 
  X,
  FileText
} from 'lucide-react';

interface EnterpriseGovernanceProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface CompliancePolicyItem {
  id: string;
  name: string;
  standard: string;
  scope: string;
  lastAudit: string;
  status: 'Compliant' | 'Review Required';
  enforcement: string;
}

export const EnterpriseGovernanceView: React.FC<EnterpriseGovernanceProps> = ({ onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newStandard, setNewStandard] = useState('ISO 27001');

  const [policies, setPolicies] = useState<CompliancePolicyItem[]>([
    {
      id: '1',
      name: 'Enkripsi Data Residen & Enclave',
      standard: 'ISO 27001:2022',
      scope: 'Seluruh Database & Storage',
      lastAudit: '12 Nov 2026',
      status: 'Compliant',
      enforcement: 'Automated Lock'
    },
    {
      id: '2',
      name: 'Otentikasi Multifaktor (MFA 100%)',
      standard: 'SOC2 Type II',
      scope: 'Seluruh Akun Organisasi',
      lastAudit: '14 Nov 2026',
      status: 'Compliant',
      enforcement: 'Strict Enforced'
    },
    {
      id: '3',
      name: 'Retensi Audit Trail & Log Transaksi',
      standard: 'SNI / Regulasi BUMN',
      scope: 'Audit Log 7 Tahun',
      lastAudit: '10 Nov 2026',
      status: 'Compliant',
      enforcement: 'WORM Compliant'
    },
    {
      id: '4',
      name: 'AI Model Safety & Hallucination Guard',
      standard: 'IEEE AI Safety',
      scope: 'Seluruh Model Inference',
      lastAudit: '08 Nov 2026',
      status: 'Compliant',
      enforcement: 'Strict Guardrails'
    }
  ]);

  const handleAddPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPolicyName) return;
    const item: CompliancePolicyItem = {
      id: String(Date.now()),
      name: newPolicyName,
      standard: newStandard,
      scope: 'Tingkat Enterprise',
      lastAudit: 'Baru saja',
      status: 'Compliant',
      enforcement: 'Automated Policy'
    };
    setPolicies([item, ...policies]);
    onAddActivity(`Menambahkan kebijakan tata kelola baru: ${newPolicyName}`, 'Enterprise Solutions');
    setShowAddModal(false);
    setNewPolicyName('');
  };

  const filtered = policies.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.standard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Governance
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              alert('Mengekspor Laporan Audit Compliance Tahunan (.PDF)');
              onAddActivity('Ekspor laporan compliance audit', 'Enterprise Solutions');
            }}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            Unduh Laporan Audit
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat Kebijakan Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Status Compliance</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">100% Valid</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Kebijakan Aktif</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">18 Kebijakan</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Audit Log Terakhir</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">2 Menit Lalu</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Sertifikasi Standar</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">ISO & SOC2</div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Section Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Matriks Kebijakan Kepatuhan & Keamanan Data
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pusat kendali regulasi privasi data, enkripsi, batasan AI, dan integritas audit perusahaan
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kebijakan atau standar..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Table Kebijakan Governance */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-[#10131d]">
                <th className="py-3 px-5">Nama Kebijakan</th>
                <th className="py-3 px-4">Standar Rujukan</th>
                <th className="py-3 px-4">Cakupan (Scope)</th>
                <th className="py-3 px-4">Audit Terakhir</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Penegakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {p.standard}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {p.scope}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    {p.lastAudit}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Compliant
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      {p.enforcement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Kebijakan Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleAddPolicy}
            className="bg-white dark:bg-[#131722] rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tambah Kebijakan Tata Kelola</h3>
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
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Aturan / Kebijakan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Enkripsi Kunci HSM KMS FIPS 140-3"
                  value={newPolicyName}
                  onChange={(e) => setNewPolicyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Standar Kepatuhan</label>
                <select
                  value={newStandard}
                  onChange={(e) => setNewStandard(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="ISO 27001:2022">ISO 27001:2022</option>
                  <option value="SOC2 Type II">SOC2 Type II</option>
                  <option value="GDPR / UU PDP No. 27">GDPR / UU PDP No. 27</option>
                  <option value="NIST Cybersecurity Framework">NIST Cybersecurity Framework</option>
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
                Simpan Kebijakan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
