import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Users, 
  Save, 
  CheckCircle2, 
  FileText,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface SettingsOrganizationProps {
  onAddActivity: (activity: string, module: string) => void;
}

export const SettingsOrganizationView: React.FC<SettingsOrganizationProps> = ({ onAddActivity }) => {
  const [companyName, setCompanyName] = useState('PT. Glace Kreasi Digital');
  const [legalName, setLegalName] = useState('PT Glace Kreasi Digital Indonesia');
  const [taxId, setTaxId] = useState('01.234.567.8-012.000 (NPWP)');
  const [industry, setIndustry] = useState('Industrial Digital Platform & EPC Technology');
  const [address, setAddress] = useState('Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, DKI Jakarta 12190');
  const [website, setWebsite] = useState('https://glace.kreasi.digital');
  const [contactEmail, setContactEmail] = useState('corporate@glace.kreasi.digital');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onAddActivity(`Memperbarui profil organisasi perusahaan: ${companyName}`, 'Settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Pengaturan Organisasi
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Konfigurasi profil legal entitas, data kantor pusat, identitas perusahaan, dan domain kerja terdaftar.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Informasi profil perusahaan berhasil disimpan ke registry workspace.</span>
        </div>
      )}

      {/* Profil Banner */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl border border-slate-700 shrink-0">
            GLACE
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{companyName}</h2>
            <div className="text-xs text-slate-500 mt-0.5">{industry}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Verified Enterprise Entity
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: ORG-IDN-2026-X9</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 sm:text-right">
          <div>Lisensi: <strong className="text-slate-800 dark:text-slate-200">Platinum Multi-Tenant</strong></div>
          <div>Server Enclave: <span className="font-mono text-slate-700 dark:text-slate-300">Jakarta DC-01</span></div>
        </div>
      </div>

      {/* Form Legalitas & Informasi Perusahaan */}
      <form onSubmit={handleSave} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Identitas Legalitas Perusahaan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Nama Merk / Brand Dagang</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Nama Badan Hukum Resmi</label>
            <input
              type="text"
              required
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Nomor Pokok Wajib Pajak (NPWP / Tax ID)</label>
            <input
              type="text"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Sektor Industri Utama</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          Kontak Resmi & Alamat Kantor Pusat
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Website Resmi</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Email Kontak Korporasi</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Alamat Domisili Perusahaan</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Informasi Organisasi</span>
          </button>
        </div>
      </form>
    </div>
  );
};
