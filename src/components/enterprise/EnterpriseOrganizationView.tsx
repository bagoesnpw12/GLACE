import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  KeyRound,
  MoreHorizontal,
  X
} from 'lucide-react';

interface OrganizationViewProps {
  onAddActivity: (activity: string, module: string) => void;
}

interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'aktif' | 'pending';
}

export const EnterpriseOrganizationView: React.FC<OrganizationViewProps> = ({ onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Senior Engineer');
  const [inviteDept, setInviteDept] = useState('IT & Security');

  const [members, setMembers] = useState<OrgMember[]>([
    {
      id: '1',
      name: 'Bagoes Nugraha',
      email: 'bagoes@enterprise.com',
      role: 'Super Admin',
      department: 'IT & Security',
      status: 'aktif'
    },
    {
      id: '2',
      name: 'Bagoes Nugraha',
      email: 'bagoes@enterprise.com',
      role: 'Compliance Officer',
      department: 'Legal & Governance',
      status: 'aktif'
    },
    {
      id: '3',
      name: 'Bagoes Nugraha',
      email: 'bagoes@enterprise.com',
      role: 'Data Engineer',
      department: 'Infrastructure',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Bagoes Nugraha',
      email: 'bagoes@enterprise.com',
      role: 'Auditor',
      department: 'Internal Audit',
      status: 'aktif'
    }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember: OrgMember = {
      id: String(Date.now()),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      status: 'aktif'
    };
    setMembers([...members, newMember]);
    onAddActivity(`Mengundang anggota baru: ${inviteEmail} ke ${inviteDept}`, 'Enterprise Solutions');
    setShowInviteModal(false);
    setInviteEmail('');
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Organization
        </h1>
      </div>

      {/* 2. Top Info Box: Enterprise Details Banner */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Col 1: Nama Perusahaan */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              NAMA PERUSAHAAN
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              PT Global Digital Nusantara Tbk
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Holding Multinational • Tech & Logistics
            </div>
          </div>

          {/* Col 2: Tier / Lisensi */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              TIER / LISENSI
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              Platinum Enterprise
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              250 Seats Terdaftar • Masa Aktif Des 2028
            </div>
          </div>

          {/* Col 3: Status Entitas */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              STATUS ENTITAS
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktif / Verified
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Kepatuhan ISO 27001 & SOC2 Valid
            </div>
          </div>

          {/* Col 4: Penanggung Jawab */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              PENANGGUNG JAWAB
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              Ir. Hendra Gunawan, M.T.
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              VP Governance, Risk & Compliance
            </div>
          </div>
        </div>

        {/* Footer Meta Strip */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Data Residency: <strong className="text-slate-700 dark:text-slate-300 font-semibold">Region AP-Southeast-3 (Jakarta)</strong>
          </div>
          <div>
            Enclave: <strong className="text-slate-700 dark:text-slate-300 font-semibold font-mono">Dedicated Instance #EN-992</strong>
          </div>
        </div>
      </div>

      {/* 3. Section Title & Action Bar: Anggota Tim */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Anggota Tim</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              {members.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola izin dan akses pengguna di organisasi Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, surel, role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => alert('Filter kustom: Status & Departemen')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Filter className="w-3 h-3 text-slate-400" />
            <span>Filter</span>
          </button>

          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Undang Anggota</span>
          </button>
        </div>
      </div>

      {/* 4. Table Anggota Tim */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-[#10131d]">
                <th className="py-3 px-5">Nama</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Departemen</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-slate-900 dark:text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {m.role}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {m.department}
                  </td>
                  <td className="py-3.5 px-4">
                    {m.status === 'aktif' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        pending
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => alert(`Kelola akses & perizinan untuk ${m.name}`)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
                    >
                      Kelola
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Bottom 3 Identical Cards: MFA ENFORCED */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {[1, 2, 3].map((idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] flex items-center gap-4 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
              <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                MFA ENFORCED
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                100% Organisasi
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Undang Anggota */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleInvite}
            className="bg-white dark:bg-[#131722] rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Undang Anggota Organisasi</h3>
              <button 
                type="button" 
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Perusahaan</label>
                <input
                  type="email"
                  required
                  placeholder="nama@enterprise.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Role / Peran</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="Auditor">Auditor</option>
                  <option value="Lead Engineer">Lead Engineer</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Departemen</label>
                <select
                  value={inviteDept}
                  onChange={(e) => setInviteDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="IT & Security">IT & Security</option>
                  <option value="Legal & Governance">Legal & Governance</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Internal Audit">Internal Audit</option>
                  <option value="Engineering & Design">Engineering & Design</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Kirim Undangan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
