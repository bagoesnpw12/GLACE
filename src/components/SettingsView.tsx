import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Sliders, 
  Bell, 
  CheckCircle2, 
  Layers,
  Database
} from 'lucide-react';

interface SettingsProps {
  userName: string;
  userEmail: string;
  onUpdateUser: (name: string, email: string) => void;
  onAddActivity: (activity: string, module: string) => void;
}

export const SettingsView: React.FC<SettingsProps> = ({
  userName,
  userEmail,
  onUpdateUser,
  onAddActivity
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(name, email);
    onAddActivity(`Pengaturan akun diperbarui: ${name}`, 'Settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <SettingsIcon className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Workspace Settings</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Kelola profil pengguna, preferensi tema, hak akses workspace, dan keamanan data isolasi.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan profil workspace berhasil diperbarui!</span>
        </div>
      )}

      {/* Account Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" /> Profil Pengguna
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Tampilan</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email SSO / Workspace</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-2xs"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Security & Data Isolation Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" /> Data Isolation & Compliance
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Data engineering Anda diisolasi per workspace organisasi dan dienkripsi saat istirahat (AES-256) serta dalam transmisi (TLS 1.3).
        </p>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-semibold text-slate-800">Workspace Isolation Mode</p>
              <p className="text-[11px] text-slate-500">Tenant-level row security aktif (Glace Workspace)</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-semibold text-slate-800">Tema Default Sistem</p>
              <p className="text-[11px] text-slate-500">Light Mode (Konsisten di semua monitor workstation engineering)</p>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">Light Default</span>
          </div>
        </div>
      </div>
    </div>
  );
};

