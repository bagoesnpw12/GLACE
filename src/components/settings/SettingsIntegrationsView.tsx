import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal, 
  X, 
  Link2, 
  Unlink, 
  Activity, 
  Info, 
  Check, 
  AlertCircle,
  FolderSync,
  Calendar,
  Mail,
  MessageSquare,
  User,
  Sliders,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SettingsIntegrationsProps {
  userEmail?: string;
  userName?: string;
  onAddActivity?: (activity: string, module: string) => void;
}

export type PersonalAppCategory = 'Semua' | 'Penyimpanan & Dokumen' | 'Kalender & Jadwal' | 'Email & Komunikasi' | 'Kolaborasi Tim';
export type PersonalConnectionStatus = 'Semua' | 'Terhubung' | 'Belum Terhubung' | 'Perlu Verifikasi';

export interface PersonalAppIntegration {
  id: string;
  name: string;
  serviceKey: 'google_drive' | 'google_calendar' | 'microsoft_outlook' | 'slack';
  category: 'Penyimpanan & Dokumen' | 'Kalender & Jadwal' | 'Email & Komunikasi' | 'Kolaborasi Tim';
  description: string;
  iconType: 'drive' | 'calendar' | 'outlook' | 'slack';
  connectedAccount: string | null;
  status: 'Terhubung' | 'Belum Terhubung' | 'Perlu Verifikasi';
  authMethod: string;
  permissionsScope: string[];
  lastSync: string;
  syncFrequency: string;
  autoSyncEnabled: boolean;
  notes: string;
  logs: {
    timestamp: string;
    event: string;
    level: 'success' | 'info' | 'warn';
    detail: string;
  }[];
}

export const SettingsIntegrationsView: React.FC<SettingsIntegrationsProps> = ({ 
  userEmail = 'bagoesnugrahapw@gmail.com',
  userName = 'Bagoes Nugraha',
  onAddActivity 
}) => {
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PersonalAppCategory>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<PersonalConnectionStatus>('Semua');

  // Modals & Notifications
  const [selectedAppForDetail, setSelectedAppForDetail] = useState<PersonalAppIntegration | null>(null);
  const [selectedAppForSync, setSelectedAppForSync] = useState<PersonalAppIntegration | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // Modal connect confirmation (for apps without backend mock auth)
  const [connectingApp, setConnectingApp] = useState<PersonalAppIntegration | null>(null);
  const [authInputAccount, setAuthInputAccount] = useState('');

  // Personal Integrations State
  // Jujur & Transparan:
  // Google Drive: Terhubung karena user masuk via Google OAuth dengan akun userEmail.
  // Google Calendar: Terhubung via scope akun Google user yang sama.
  // Microsoft Outlook & Slack: Belum terhubung (user dapat menghubungkan atau mengonfigurasi).
  const [apps, setApps] = useState<PersonalAppIntegration[]>([
    {
      id: 'app-gdrive',
      name: 'Google Drive',
      serviceKey: 'google_drive',
      category: 'Penyimpanan & Dokumen',
      description: 'Akses langsung berkas dokumen teknik, kalkulasi trafo, lembar spek, dan backup otomatis ke penyimpanan Google Drive pribadi Anda.',
      iconType: 'drive',
      connectedAccount: userEmail,
      status: 'Terhubung',
      authMethod: 'Google OAuth 2.0 (Akun Masuk)',
      permissionsScope: [
        'Membaca dokumen yang diunggah ke GLACE',
        'Menyimpan salinan laporan rekayasa & export PDF',
        'Sinkronisasi folder Glace Workspace'
      ],
      lastSync: 'Real-time (Tersinkronisasi)',
      syncFrequency: 'Otomatis saat ada perubahan berkas',
      autoSyncEnabled: true,
      notes: 'Terotorisasi langsung melalui sesi akun Google Anda saat login.',
      logs: [
        {
          timestamp: '16 Nov 2026 12:00 WIB',
          event: 'Verifikasi Token Google Drive Berhasil',
          level: 'success',
          detail: `Token OAuth 2.0 terhubung dengan akun ${userEmail}.`
        },
        {
          timestamp: '16 Nov 2026 10:15 WIB',
          event: 'Sinkronisasi Folder Berkas Selesai',
          level: 'success',
          detail: '4 berkas kalkulasi berhasil dicadangkan ke Google Drive.'
        }
      ]
    },
    {
      id: 'app-gcal',
      name: 'Google Calendar',
      serviceKey: 'google_calendar',
      category: 'Kalender & Jadwal',
      description: 'Sinkronisasi jadwal pemeliharaan aset (*maintenance*), agenda inspeksi gardu, dan tenggat waktu proyek (*WBS milestones*) ke kalender pribadi.',
      iconType: 'calendar',
      connectedAccount: userEmail,
      status: 'Terhubung',
      authMethod: 'Google Calendar API via OAuth 2.0',
      permissionsScope: [
        'Melihat agenda dan jadwal kerja teknik',
        'Menambahkan pengingat jadwal pemeliharaan aset preventif',
        'Sinkronisasi event milestone proyek'
      ],
      lastSync: '10 menit yang lalu',
      syncFrequency: 'Setiap 30 Menit',
      autoSyncEnabled: true,
      notes: 'Sinkronisasi jadwal aktif ke kalender utama akun Anda.',
      logs: [
        {
          timestamp: '16 Nov 2026 11:50 WIB',
          event: 'Sinkronisasi Jadwal Rutin',
          level: 'success',
          detail: '3 agenda inspeksi preventif disinkronkan ke kalender.'
        },
        {
          timestamp: '15 Nov 2026 16:30 WIB',
          event: 'Penambahan Pengingat Pemeliharaan',
          level: 'info',
          detail: 'Jadwal pemeliharaan Trafo Unit 2 (PLTU Labuan) ditambahkan.'
        }
      ]
    },
    {
      id: 'app-outlook',
      name: 'Microsoft Outlook (365 / Personal)',
      serviceKey: 'microsoft_outlook',
      category: 'Email & Komunikasi',
      description: 'Sinkronisasi pemberitahuan notifikasi operasional, laporan status proyek mingguan, dan pengingat approval via kotak masuk Microsoft Outlook Anda.',
      iconType: 'outlook',
      connectedAccount: null,
      status: 'Belum Terhubung',
      authMethod: 'Microsoft Identity Platform (OAuth 2.0)',
      permissionsScope: [
        'Kirim ringkasan notifikasi persetujuan ke email pribadi',
        'Sinkronisasi kalender Outlook dengan jadwal pekerjaan'
      ],
      lastSync: 'Belum pernah disinkronkan',
      syncFrequency: 'Manual / On-Demand',
      autoSyncEnabled: false,
      notes: 'Akun Microsoft belum diotorisasi. Hubungkan akun Microsoft Anda untuk mengaktifkan notifikasi email.',
      logs: [
        {
          timestamp: '16 Nov 2026 09:00 WIB',
          event: 'Layanan Siap Dihubungkan',
          level: 'info',
          detail: 'Konektor Microsoft Outlook tersedia untuk otorisasi akun pengguna.'
        }
      ]
    },
    {
      id: 'app-slack',
      name: 'Slack Personal Workspace',
      serviceKey: 'slack',
      category: 'Kolaborasi Tim',
      description: 'Terima direct message (DM) instan jika ada anomali sensor SCADA, status RFQ Commerce yang disetujui, atau update dokumen proyek kritis.',
      iconType: 'slack',
      connectedAccount: null,
      status: 'Belum Terhubung',
      authMethod: 'Slack Bot & User Token (OAuth 2.0)',
      permissionsScope: [
        'Kirim pesan notifikasi privat (Direct Message) ke akun Slack Anda',
        'Terima alert peringatan ambang batas sensor darurat'
      ],
      lastSync: 'Belum pernah disinkronkan',
      syncFrequency: 'Real-time via Slack Incoming Webhook',
      autoSyncEnabled: false,
      notes: 'Hubungkan ruang kerja Slack Anda untuk mendapatkan direct alert.',
      logs: [
        {
          timestamp: '16 Nov 2026 09:00 WIB',
          event: 'Layanan Siap Dihubungkan',
          level: 'info',
          detail: 'Integrasi Slack bot bot webhook siap menerima otorisasi pengguna.'
        }
      ]
    }
  ]);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Connect Handler
  const handleStartConnect = (app: PersonalAppIntegration) => {
    if (app.status === 'Terhubung') {
      showToast(`${app.name} sudah terhubung dengan akun Anda.`, 'info');
      return;
    }
    setConnectingApp(app);
    setAuthInputAccount(userEmail || '');
  };

  const handleConfirmConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectingApp) return;

    const accountToConnect = authInputAccount.trim() || userEmail;

    setApps(prev => prev.map(item => {
      if (item.id === connectingApp.id) {
        const newLog = {
          timestamp: 'Baru saja',
          event: 'Akun Pribadi Berhasil Dihubungkan',
          level: 'success' as const,
          detail: `Otorisasi OAuth untuk ${item.name} berhasil dibuat pada akun ${accountToConnect}.`
        };
        return {
          ...item,
          status: 'Terhubung',
          connectedAccount: accountToConnect,
          lastSync: 'Baru saja terhubung',
          autoSyncEnabled: true,
          logs: [newLog, ...item.logs]
        };
      }
      return item;
    }));

    showToast(`Akun ${accountToConnect} berhasil dihubungkan ke ${connectingApp.name}.`, 'success');
    if (onAddActivity) {
      onAddActivity(`Menghubungkan integrasi pribadi: ${connectingApp.name}`, 'Settings');
    }
    setConnectingApp(null);
  };

  // Disconnect Handler
  const handleDisconnect = (app: PersonalAppIntegration) => {
    if (app.id === 'app-gdrive' || app.id === 'app-gcal') {
      const confirmGoogle = window.confirm(
        `Aplikasi ${app.name} terhubung melalui sesi Google akun Anda (${userEmail}). Apakah Anda yakin ingin menonaktifkan sinkronisasi pribadi untuk ${app.name}?`
      );
      if (!confirmGoogle) return;
    } else {
      const confirmOther = window.confirm(
        `Apakah Anda yakin ingin memutuskan integrasi ${app.name} dari akun Anda? Notifikasi dan sinkronisasi akan dihentikan.`
      );
      if (!confirmOther) return;
    }

    setApps(prev => prev.map(item => {
      if (item.id === app.id) {
        const newLog = {
          timestamp: 'Baru saja',
          event: 'Integrasi Pribadi Diputuskan',
          level: 'warn' as const,
          detail: `Koneksi akun ${item.connectedAccount || ''} diputuskan secara manual.`
        };
        return {
          ...item,
          status: 'Belum Terhubung',
          connectedAccount: null,
          lastSync: 'Terputus',
          autoSyncEnabled: false,
          logs: [newLog, ...item.logs]
        };
      }
      return item;
    }));

    showToast(`Koneksi ${app.name} telah diputuskan dari akun Anda.`, 'info');
    if (onAddActivity) {
      onAddActivity(`Memutuskan koneksi integrasi pribadi: ${app.name}`, 'Settings');
    }
  };

  // Save Sync Settings
  const handleSaveSyncSettings = (appId: string, frequency: string, autoSync: boolean) => {
    setApps(prev => prev.map(item => {
      if (item.id === appId) {
        const newLog = {
          timestamp: 'Baru saja',
          event: 'Pengaturan Sinkronisasi Disimpan',
          level: 'info' as const,
          detail: `Frekuensi disetel ke: "${frequency}", Sinkronisasi Otomatis: ${autoSync ? 'Aktif' : 'Nonaktif'}.`
        };
        return {
          ...item,
          syncFrequency: frequency,
          autoSyncEnabled: autoSync,
          logs: [newLog, ...item.logs]
        };
      }
      return item;
    }));

    setSelectedAppForSync(null);
    showToast('Pengaturan sinkronisasi akun Anda berhasil disimpan.', 'success');
    if (onAddActivity) {
      onAddActivity(`Memperbarui pengaturan sinkronisasi integrasi pribadi`, 'Settings');
    }
  };

  // Filtered list
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (app.connectedAccount && app.connectedAccount.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory = selectedCategory === 'Semua' || app.category === selectedCategory;
      const matchStatus = selectedStatus === 'Semua' || app.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [apps, searchQuery, selectedCategory, selectedStatus]);

  const connectedCount = apps.filter(a => a.status === 'Terhubung').length;

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Integrasi Aplikasi Pribadi
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Akun Pengguna
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hubungkan akun dan aplikasi produktivitas pribadi Anda (Google Drive, Calendar, Outlook, Slack) untuk sinkronisasi dokumen, jadwal, dan alert.
          </p>
        </div>

        {/* Current User Context Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-800 text-xs">
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-600 dark:text-slate-300 font-medium">{userName}</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{connectedCount} Terhubung</span>
        </div>
      </div>

      {/* Security Scope Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#181d2a]/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-slate-600 dark:text-slate-400 space-y-0.5">
          <span className="font-semibold text-slate-900 dark:text-white block">
            Isolasi Hak Akses Akun Pribadi
          </span>
          <p className="text-[11px] leading-relaxed">
            Integrasi pada halaman ini hanya berlaku untuk akun Anda sendiri. Anda tidak memiliki akses untuk mengubah konektor skala organisasi (seperti ERP perusahaan atau SCADA gateway). Kredensial dan data token disimpan terenkripsi dengan aman.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className={`p-3 rounded-lg text-xs flex items-center gap-2 border animate-in fade-in duration-200 ${
          notification.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            : notification.type === 'warn'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : notification.type === 'warn' ? (
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Control Bar: Search & Category Filter */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari aplikasi atau akun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as PersonalConnectionStatus)}
              className="text-xs px-2.5 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Terhubung">Terhubung</option>
              <option value="Belum Terhubung">Belum Terhubung</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100 dark:border-slate-800/80">
          {(['Semua', 'Penyimpanan & Dokumen', 'Kalender & Jadwal', 'Email & Komunikasi', 'Kolaborasi Tim'] as PersonalAppCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List of Applications */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Aplikasi Produktivitas Pribadi ({filteredApps.length})
          </h2>
          <span className="text-[11px] text-slate-400">
            Dikelola per akun pengguna
          </span>
        </div>

        {filteredApps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <Globe className="w-8 h-8 mx-auto text-slate-400 opacity-60" />
            <p className="font-medium text-slate-700 dark:text-slate-300">Tidak ada aplikasi yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedStatus('Semua');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredApps.map((app) => (
              <div 
                key={app.id} 
                className="p-5 hover:bg-slate-50/60 dark:hover:bg-[#181d2a]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs ${
                    app.iconType === 'drive'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800'
                      : app.iconType === 'calendar'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-800'
                      : app.iconType === 'outlook'
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 border-sky-200 dark:border-sky-800'
                      : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 border-purple-200 dark:border-purple-800'
                  }`}>
                    {app.iconType === 'drive' && <FolderSync className="w-5 h-5" />}
                    {app.iconType === 'calendar' && <Calendar className="w-5 h-5" />}
                    {app.iconType === 'outlook' && <Mail className="w-5 h-5" />}
                    {app.iconType === 'slack' && <MessageSquare className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {app.name}
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {app.category}
                      </span>
                      {app.status === 'Terhubung' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          <Check className="w-2.5 h-2.5" />
                          Terhubung
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                          Belum Terhubung
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {app.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <div>
                        Akun: <strong className="font-mono text-slate-700 dark:text-slate-300">{app.connectedAccount || 'Belum ditautkan'}</strong>
                      </div>
                      <div>
                        Sinkronisasi: <span className="text-slate-700 dark:text-slate-300">{app.lastSync}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                  {/* Detail Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedAppForDetail(app)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Detail & Log
                  </button>

                  {/* Sync Settings Button (only when connected) */}
                  {app.status === 'Terhubung' && (
                    <button
                      type="button"
                      onClick={() => setSelectedAppForSync(app)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Pengaturan
                    </button>
                  )}

                  {/* Connect / Disconnect Action */}
                  {app.status === 'Terhubung' ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnect(app)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200/80 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1"
                    >
                      <Unlink className="w-3.5 h-3.5" />
                      Putuskan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartConnect(app)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      Hubungkan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Connect App Authentication */}
      {connectingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleConfirmConnect}
            className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in duration-150 space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Hubungkan {connectingApp.name}
                </h3>
                <span className="text-xs text-slate-500">Otorisasi Akun Pribadi</span>
              </div>
              <button 
                type="button"
                onClick={() => setConnectingApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Anda akan mengaitkan akun {connectingApp.name} dengan profil GLACE Anda. Pastikan akun yang dimasukkan adalah akun pribadi kerja Anda.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Akun yang Ditautkan
                </label>
                <input
                  type="email"
                  required
                  value={authInputAccount}
                  onChange={(e) => setAuthInputAccount(e.target.value)}
                  placeholder="nama.anda@perusahaan.co.id"
                  className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[11px] space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">Izin yang Diminta:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {connectingApp.permissionsScope.map((scope, idx) => (
                    <li key={idx}>{scope}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setConnectingApp(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Otorisasi & Tautkan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Detail & Activity History */}
      {selectedAppForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl animate-in fade-in duration-150 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedAppForDetail.name}</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedAppForDetail.category} • Metode: {selectedAppForDetail.authMethod}
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedAppForDetail(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Akun:</span>
                  <strong className={selectedAppForDetail.status === 'Terhubung' ? 'text-emerald-600' : 'text-slate-500'}>
                    {selectedAppForDetail.status}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Akun Tertaut:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{selectedAppForDetail.connectedAccount || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sinkronisasi Terakhir:</span>
                  <span className="text-slate-800 dark:text-slate-200">{selectedAppForDetail.lastSync}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Frekuensi:</span>
                  <span className="text-slate-800 dark:text-slate-200">{selectedAppForDetail.syncFrequency}</span>
                </div>
              </div>

              {/* Scope */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                  Cakupan Izin (Permission Scopes):
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400 pl-1">
                  {selectedAppForDetail.permissionsScope.map((scope, idx) => (
                    <li key={idx}>{scope}</li>
                  ))}
                </ul>
              </div>

              {/* Activity History Logs */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-500" />
                  Riwayat Aktivitas & Sinkronisasi
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedAppForDetail.logs.map((log, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded-lg border text-[11px] ${
                        log.level === 'success' 
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/60'
                          : log.level === 'warn'
                          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/60'
                          : 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200/60 dark:border-indigo-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-slate-800 dark:text-slate-200">{log.event}</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">{log.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedAppForDetail(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Sync Settings */}
      {selectedAppForSync && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in duration-150 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Pengaturan Sinkronisasi
                </h3>
                <span className="text-xs text-slate-500">{selectedAppForSync.name}</span>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedAppForSync(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Interval Sinkronisasi
                </label>
                <select 
                  id="personal-sync-interval"
                  defaultValue={selectedAppForSync.syncFrequency}
                  className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Real-time (Otomatis)">Real-time (Otomatis saat ada berkas baru)</option>
                  <option value="Setiap 15 Menit">Setiap 15 Menit</option>
                  <option value="Setiap 30 Menit">Setiap 30 Menit</option>
                  <option value="Setiap 1 Jam">Setiap 1 Jam</option>
                  <option value="Manual / On-Demand">Manual / On-Demand</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Sinkronisasi Otomatis di Latar Belakang</div>
                  <div className="text-[11px] text-slate-500">Pembaruan berkas dan jadwal terjadi tanpa perlu trigger manual</div>
                </div>
                <input
                  type="checkbox"
                  id="personal-auto-sync"
                  defaultChecked={selectedAppForSync.autoSyncEnabled}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedAppForSync(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const freq = (document.getElementById('personal-sync-interval') as HTMLSelectElement).value;
                  const autoSync = (document.getElementById('personal-auto-sync') as HTMLInputElement).checked;
                  handleSaveSyncSettings(selectedAppForSync.id, freq, autoSync);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
