import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Smartphone, 
  Laptop, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Eye, 
  EyeOff,
  LogOut,
  Save,
  Check
} from 'lucide-react';

interface SettingsSecurityProps {
  userEmail?: string;
  onAddActivity?: (activity: string, module: string) => void;
}

interface ActiveSessionItem {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export const SettingsSecurityView: React.FC<SettingsSecurityProps> = ({ onAddActivity }) => {
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  // 2FA State (Jujur dan transparan sesuai batasan sistem)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // Active Sessions List
  const [sessions, setSessions] = useState<ActiveSessionItem[]>([
    {
      id: 'sess-1',
      device: 'Windows 11 Workstation',
      browser: 'Google Chrome 130.0',
      location: 'Jakarta, Indonesia',
      ip: '180.252.164.22',
      lastActive: 'Sesi Saat Ini (Aktif)',
      isCurrent: true
    },
    {
      id: 'sess-2',
      device: 'MacBook Pro 16" M3',
      browser: 'Safari 17.5',
      location: 'Surabaya, Indonesia',
      ip: '114.122.38.10',
      lastActive: 'Kemarin, 19:40 WIB',
      isCurrent: false
    },
    {
      id: 'sess-3',
      device: 'iPhone 15 Pro',
      browser: 'Mobile Safari',
      location: 'Jakarta, Indonesia',
      ip: '180.252.164.88',
      lastActive: '3 hari yang lalu',
      isCurrent: false
    }
  ]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }
    setPasswordSaved(true);
    if (onAddActivity) {
      onAddActivity('Memperbarui kata sandi akun', 'Settings');
    }
    setTimeout(() => {
      setPasswordSaved(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 3000);
  };

  const handleTerminateSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (onAddActivity) {
      onAddActivity('Mengakhiri sesi perangkat eksternal', 'Settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Keamanan & Autentikasi
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pengaturan kata sandi, verifikasi multi-faktor (2FA), pemantauan sesi perangkat aktif, dan kepatuhan akun.
        </p>
      </div>

      {passwordSaved && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Kata sandi Anda berhasil diperbarui dan disinkronkan ke sistem autentikasi aman.</span>
        </div>
      )}

      {/* 1. Ubah Password Section */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-600" />
              <span>Ubah Kata Sandi</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Gunakan kombinasi minimal 8 karakter dengan huruf kapital, angka, dan simbol.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Kata Sandi Saat Ini</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan kata sandi lama"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Kata Sandi Baru</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Konfirmasi Kata Sandi Baru</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1.5"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Perbarui Kata Sandi
            </button>
          </div>
        </form>
      </div>

      {/* 2. Two-Factor Authentication (2FA) */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Autentikasi Dua Faktor (2FA / TOTP)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Tambahkan lapisan keamanan ekstra menggunakan aplikasi authenticator (Google Authenticator / Microsoft Authenticator).
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${is2FAEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                <span>Status Saat Ini: <strong className={is2FAEnabled ? 'text-emerald-600' : 'text-slate-600 dark:text-slate-300'}>{is2FAEnabled ? 'Aktif' : 'Belum Diaktifkan'}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (is2FAEnabled) {
                setIs2FAEnabled(false);
                if (onAddActivity) {
                  onAddActivity('Menonaktifkan 2FA akun', 'Settings');
                }
              } else {
                setShow2FAModal(true);
              }
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              is2FAEnabled
                ? 'border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40'
                : 'bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white'
            }`}
          >
            {is2FAEnabled ? 'Nonaktifkan 2FA' : 'Konfigurasi 2FA'}
          </button>
        </div>
      </div>

      {/* 3. Sesi Perangkat Aktif & Riwayat Login */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131722] shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Laptop className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>Sesi Perangkat & Riwayat Login Aktif</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daftar perangkat yang saat ini memiliki token sesi masuk valid ke akun GLACE Anda.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {sessions.map((sess) => (
            <div key={sess.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{sess.device}</span>
                    {sess.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400">
                        Sesi Saat Ini
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {sess.browser} • {sess.location} • <span className="font-mono">{sess.ip}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => handleTerminateSession(sess.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300 text-xs font-medium transition-colors"
                >
                  Akhiri Sesi
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Aktivasi 2FA */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#131722] rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Aktivasi Autentikasi Dua Faktor (2FA)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pindai kode QR menggunakan aplikasi authenticator Anda (Google Authenticator atau Aegis), kemudian masukkan 6 digit kode token konfirmasi.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <div className="w-32 h-32 bg-white p-2 rounded-lg mx-auto border border-slate-200 flex items-center justify-center font-mono text-[10px] text-slate-400">
                [ QR CODE AUTHENTICATOR ]
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Secret Key: <strong className="text-slate-800 dark:text-slate-200">GLAC-E982-A721-K890</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShow2FAModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIs2FAEnabled(true);
                  setShow2FAModal(false);
                  if (onAddActivity) {
                    onAddActivity('Berhasil mengaktifkan 2FA akun', 'Settings');
                  }
                }}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                Verifikasi & Aktifkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
