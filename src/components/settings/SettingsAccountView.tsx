import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Globe, 
  Briefcase, 
  Building2,
  Calendar,
  Save
} from 'lucide-react';

interface SettingsAccountProps {
  userName: string;
  userEmail: string;
  onUpdateUser: (name: string, email: string) => void;
  onAddActivity: (activity: string, module: string) => void;
}

export const SettingsAccountView: React.FC<SettingsAccountProps> = ({
  userName,
  userEmail,
  onUpdateUser,
  onAddActivity
}) => {
  const [name, setName] = useState(userName || 'Bagoes Nugraha pw');
  const [email, setEmail] = useState(userEmail || 'bagoesnugrahapw@gmail.com');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [title, setTitle] = useState('Chief Technology Architect');
  const [department, setDepartment] = useState('Enterprise Technology & AI');
  const [timezone, setTimezone] = useState('Asia/Jakarta (WIB - GMT+7)');
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(name, email);
    onAddActivity(`Memperbarui profil akun: ${name}`, 'Settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Akun Saya
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Kelola profil pengguna, identitas personal, preferensi bahasa, dan informasi kontak kerja Anda.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Informasi profil dan preferensi akun berhasil disimpan.</span>
        </div>
      )}

      {/* Profil Header & Avatar */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-xs">
              {name.charAt(0)}
            </div>
            <button 
              type="button"
              onClick={() => alert('Fitur unggah foto avatar profil perusahaan (.JPG / .PNG maks 2MB).')}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-xs cursor-pointer"
              title="Ubah Foto Profil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{email}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {title}
              </span>
              <span className="text-[11px] text-slate-400">• {department}</span>
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>Status Akun: <strong className="text-emerald-600 dark:text-emerald-400">Terverifikasi</strong></div>
          <div className="mt-1">ID Pengguna: <span className="font-mono">GLC-USR-8910</span></div>
        </div>
      </div>

      {/* Form Personal & Preferensi */}
      <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Informasi Personal & Kontak
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Email Akun (SSO)</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Jabatan / Posisi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          Preferensi Regional & Sistem
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Zona Waktu Operasional</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Asia/Jakarta (WIB - GMT+7)">Asia/Jakarta (WIB - GMT+7)</option>
              <option value="Asia/Makassar (WITA - GMT+8)">Asia/Makassar (WITA - GMT+8)</option>
              <option value="Asia/Jayapura (WIT - GMT+9)">Asia/Jayapura (WIT - GMT+9)</option>
              <option value="UTC (Coordinated Universal Time)">UTC (Coordinated Universal Time)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Bahasa Antarmuka</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="English (United States)">English (United States)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan Akun</span>
          </button>
        </div>
      </form>
    </div>
  );
};
