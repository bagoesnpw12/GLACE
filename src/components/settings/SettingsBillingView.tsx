import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  AlertCircle,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  Lock,
  RefreshCw,
  Eye,
  KeyRound
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from '../ui/table';

interface BillingViewProps {
  userEmail?: string;
  onAddActivity?: (activity: string, module: string) => void;
}

interface InvoiceItem {
  id: string;
  invoice_no: string;
  invoice_date: string;
  description: string;
  subtotal: number | string;
  tax_amount: number | string;
  total_amount: number | string;
  status: 'paid' | 'pending' | 'canceled';
  payment_method_summary: string;
}

interface BillingOverviewData {
  userRole: string;
  userEmail: string;
  organizationId: string;
  permissions: {
    canViewPlan: boolean;
    canViewQuota: boolean;
    canManageRenewal: boolean;
    canViewFinancials: boolean;
    canManagePaymentMethods: boolean;
    canViewInvoices: boolean;
    canManageTaxInfo: boolean;
  };
  subscription: {
    planName: string;
    tierCode: string;
    status: string;
    seatsTotal: number;
    seatsUsed: number;
    seatsRemaining: number;
    billingCycle: string;
    renewalDate: string;
    slaUptime: string;
    supportTier: string;
  };
  paymentMethod?: {
    id: string;
    provider: string;
    method_type: string;
    masked_account: string;
    is_default: number;
    status: string;
  } | null;
  organizationInfo?: {
    legalName: string;
    taxId: string;
    billingEmail: string;
    billingAddress: string;
    fakturPajakRequired: boolean;
  };
  invoices?: InvoiceItem[];
}

export const SettingsBillingView: React.FC<BillingViewProps> = ({ 
  userEmail = 'bagoesnugrahapw@gmail.com',
  onAddActivity 
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BillingOverviewData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Modals & Notifications
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayProvider, setSelectedPayProvider] = useState('BCA');
  const [selectedPayMasked, setSelectedPayMasked] = useState('**** **** **** 8821');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warn' | 'info' } | null>(null);

  // Form State (Tax & Billing Contact)
  const [contactEmail, setContactEmail] = useState('');
  const [contactTaxId, setContactTaxId] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [fakturRequired, setFakturRequired] = useState(true);
  const [savingTax, setSavingTax] = useState(false);

  // Development Role Switcher State
  const [switchingRole, setSwitchingRole] = useState(false);

  const showToast = (message: string, type: 'success' | 'warn' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch Billing Data from Backend with RBAC
  const fetchBillingOverview = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = localStorage.getItem('glace_jwt_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('http://localhost:3001/api/billing/overview', {
        headers
      });

      if (!res.ok) {
        throw new Error(`Gagal memuat data penagihan (HTTP ${res.status})`);
      }

      const result: BillingOverviewData = await res.json();
      setData(result);

      if (result.organizationInfo) {
        setContactEmail(result.organizationInfo.billingEmail || '');
        setContactTaxId(result.organizationInfo.taxId || '');
        setContactAddress(result.organizationInfo.billingAddress || '');
        setFakturRequired(Boolean(result.organizationInfo.fakturPajakRequired));
      }
    } catch (err: any) {
      setFetchError(err.message || 'Terjadi kesalahan saat memuat data penagihan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingOverview();
  }, [userEmail]);

  // Handle Save Billing & Tax Information
  const handleSaveTaxInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.permissions.canManageTaxInfo) {
      showToast('Akses ditolak: Anda tidak memiliki izin untuk mengubah data penagihan.', 'warn');
      return;
    }

    setSavingTax(true);
    try {
      const token = localStorage.getItem('glace_jwt_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('http://localhost:3001/api/billing/tax-info', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          billingEmail: contactEmail,
          taxId: contactTaxId,
          billingAddress: contactAddress,
          fakturPajakRequired: fakturRequired
        })
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || 'Gagal menyimpan informasi perpajakan.');
      }

      showToast('Informasi kontak penagihan dan e-Faktur berhasil disimpan ke backend.', 'success');
      if (onAddActivity) {
        onAddActivity('Memperbarui informasi perpajakan & kontak penagihan perusahaan', 'Billing');
      }
      fetchBillingOverview();
    } catch (err: any) {
      showToast(err.message, 'warn');
    } finally {
      setSavingTax(false);
    }
  };

  // Handle Update Payment Method
  const handleUpdatePaymentMethod = async () => {
    if (!data?.permissions.canManagePaymentMethods) {
      showToast('Akses ditolak: Anda tidak memiliki wewenang untuk mengubah metode pembayaran.', 'warn');
      setShowPaymentModal(false);
      return;
    }

    try {
      const token = localStorage.getItem('glace_jwt_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('http://localhost:3001/api/billing/payment-method', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          provider: selectedPayProvider,
          methodType: `${selectedPayProvider} Corporate Channel`,
          maskedAccount: selectedPayMasked
        })
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || 'Gagal mengubah metode pembayaran.');
      }

      showToast('Metode pembayaran berhasil diperbarui dan diaudit di backend.', 'success');
      if (onAddActivity) {
        onAddActivity(`Memperbarui metode pembayaran ke ${selectedPayProvider}`, 'Billing');
      }
      setShowPaymentModal(false);
      fetchBillingOverview();
    } catch (err: any) {
      showToast(err.message, 'warn');
    }
  };

  // Handle Dev Switch Role for Security Testing
  const handleDevSwitchRole = async (targetRole: string) => {
    setSwitchingRole(true);
    try {
      const token = localStorage.getItem('glace_jwt_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('http://localhost:3001/api/billing/dev-switch-role', {
        method: 'POST',
        headers,
        body: JSON.stringify({ targetRole })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Gagal beralih role');

      showToast(`Role berhasil dialihkan ke: ${targetRole}. Memvalidasi izin backend...`, 'info');
      await fetchBillingOverview();
    } catch (err: any) {
      showToast(err.message, 'warn');
    } finally {
      setSwitchingRole(false);
    }
  };

  const handleDownloadInvoice = (invNo: string) => {
    if (!data?.permissions.canViewInvoices) {
      showToast('Akses ditolak: Anda tidak memiliki izin untuk mengunduh invoice.', 'warn');
      return;
    }
    showToast(`Mengunduh dokumen faktur pajak & invoice ${invNo}...`, 'info');
    if (onAddActivity) {
      onAddActivity(`Mengunduh faktur invoice ${invNo}`, 'Billing');
    }
  };

  const formatRupiah = (val: number | string) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  if (loading && !data) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
        <p>Memverifikasi hak akses & memuat data penagihan terverifikasi...</p>
      </div>
    );
  }

  const permissions = data?.permissions || {
    canViewPlan: true,
    canViewQuota: true,
    canManageRenewal: false,
    canViewFinancials: false,
    canManagePaymentMethods: false,
    canViewInvoices: false,
    canManageTaxInfo: false
  };

  const roleName = data?.userRole || 'User';

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Penagihan & Langganan (Billing)
            </h1>
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
              roleName === 'Super Admin'
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400'
                : roleName === 'Finance / Billing Admin'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400'
                : roleName === 'Admin Organisasi'
                ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400'
                : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              Role: {roleName}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pusat manajemen lisensi paket, kuota pemakaian akun, informasi faktur pajak, dan riwayat transaksi resmi.
          </p>
        </div>

        {/* Role Switcher Toolbar for Verification */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Uji Akses Role:</span>
          <div className="inline-flex rounded-lg border border-slate-200/80 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-[#181d2a]">
            {[
              { label: 'User Biasa', val: 'User' },
              { label: 'Admin Org', val: 'Admin Organisasi' },
              { label: 'Finance', val: 'Finance / Billing Admin' },
              { label: 'Super Admin', val: 'Super Admin' }
            ].map(r => (
              <button
                key={r.val}
                type="button"
                disabled={switchingRole}
                onClick={() => handleDevSwitchRole(r.val)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  roleName === r.val
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {permissions.canManageRenewal && (
            <button 
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Kelola Paket
            </button>
          )}
        </div>
      </div>

      {/* Role Notice & Authorization Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
        !permissions.canViewFinancials 
          ? 'bg-slate-50 dark:bg-[#181d2a] border-slate-200/80 dark:border-slate-800'
          : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
      }`}>
        <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${!permissions.canViewFinancials ? 'text-slate-500' : 'text-emerald-600'}`} />
        <div className="space-y-0.5">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Otorisasi Hak Akses: {roleName}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            {!permissions.canViewFinancials 
              ? 'Sebagai User / Admin Operasional, Anda hanya diizinkan melihat spesifikasi lisensi dan kuota kursi aktif. Rincian faktur pajak, rekening penagihan, dan transaksi keuangan perusahaan diamankan secara ketat oleh backend.'
              : 'Anda memiliki kewenangan resmi untuk mengelola metode pembayaran korporat, memperbarui faktur pajak DJP elektronik, dan mengunduh seluruh invoice transaksi perusahaan.'}
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
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* 1. Subscription & Quota Card (Visible to All Roles) */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  Paket Aktif: {data?.subscription.planName || 'Platinum Enterprise Tier'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Masa Berlaku: {data?.subscription.renewalDate || '01 Nov 2027'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {data?.subscription.planName || 'Platinum Enterprise Tier'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                Akses menyeluruh ke seluruh modul GLACE (Co-Engineer, Project Intelligence, Asset Intelligence, Document AI, Commerce) serta infrastruktur Dedicated Enclave AI.
              </p>
            </div>

            {/* Quota Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/70 dark:border-slate-800/80">
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Kuota Kursi</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {data?.subscription.seatsTotal || 250} Kursi
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                  {data?.subscription.seatsUsed || 182} kursi aktif terpakai ({data?.subscription.seatsRemaining || 68} tersisa)
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/70 dark:border-slate-800/80">
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Siklus Penagihan</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 capitalize">
                  {data?.subscription.billingCycle || 'Tahunan'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Diskon Kontrak Multi-Tahun
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181d2a] border border-slate-200/70 dark:border-slate-800/80">
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Tingkat Layanan (SLA)</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {data?.subscription.slaUptime || '99.9%'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {data?.subscription.supportTier || 'Dedicated Account Mgr'}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Summary Card (Conditional on Permissions) */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#181d2a]/70 border border-slate-200/70 dark:border-slate-800/80 flex flex-col justify-between">
            {permissions.canManagePaymentMethods && data?.paymentMethod ? (
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span>Metode Pembayaran Korporat</span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Terverifikasi
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                    {data.paymentMethod.provider}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {data.paymentMethod.method_type}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {data.paymentMethod.masked_account}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Debit otomatis diproses setiap siklus perpanjangan dengan konfirmasi ke email penagihan.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-slate-400" />
                  Metode Pembayaran Organisasi
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Informasi nomor rekening pembayaran korporat hanya dapat dilihat dan dikelola oleh Admin Organisasi, Finance, atau Super Admin.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-[11px] text-slate-500 font-mono text-center">
                  [ KREDENSIAL TERLINDUNGI ]
                </div>
              </div>
            )}

            {permissions.canManagePaymentMethods && (
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setShowPaymentModal(true)}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
                >
                  Ubah Metode
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400">ID: {data?.paymentMethod?.id || 'PAY-CORP'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Billing Contact & Tax Info (Restricted to Finance & Super Admin) */}
      {permissions.canManageTaxInfo ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  Informasi Penagihan & e-Faktur Pajak Perusahaan
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Data legal yang tercantum pada kuitansi resmi dan pelaporan perpajakan DJP elektronik.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveTaxInfo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Kontak Penagihan
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    NPWP Badan Usaha (16 Digit)
                  </label>
                  <input
                    type="text"
                    required
                    value={contactTaxId}
                    onChange={(e) => setContactTaxId(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Legal Penagihan
                </label>
                <textarea
                  rows={2}
                  required
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-[#181d2a] border border-slate-200/80 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#181d2a] rounded-lg border border-slate-200/70 dark:border-slate-800">
                <input 
                  type="checkbox"
                  id="fakturRequiredCheck"
                  checked={fakturRequired}
                  onChange={(e) => setFakturRequired(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="fakturRequiredCheck" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <span className="font-semibold">Terbitkan e-Faktur Pajak Otomatis (PPN 11%)</span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Faktur pajak XML/PDF dikirimkan otomatis setelah transaksi diverifikasi.
                  </span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingTax}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {savingTax ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  Simpan Informasi Penagihan
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Audit Keuangan & Kepatuhan
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Faktur pajak berstandar DJP elektronik (e-Faktur).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Setiap perubahan metode pembayaran dicatat dalam audit trail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Kerahasiaan data transaksi terisolasi per organisasi.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* 3. Invoice & Transaction History Table (Restricted to Finance & Super Admin) */}
      {permissions.canViewInvoices ? (
        <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                Riwayat Transaksi & Dokumen Faktur Pajak
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daftar transaksi pembayaran lisensi dan berkas faktur pajak resmi GLACE.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total {data?.invoices?.length || 0} transaksi tercatat
            </span>
          </div>

          {/* Standard GLACE Table Riwayat Faktur */}
          <Table>
            <TableHeader>
              <TableRow className="h-10">
                <TableHead className="w-32">NO. INVOICE</TableHead>
                <TableHead className="w-28">TANGGAL</TableHead>
                <TableHead>RINCIAN PAKET</TableHead>
                <TableHead className="w-32">METODE</TableHead>
                <TableHead className="w-32">TOTAL</TableHead>
                <TableHead className="w-24 text-center">STATUS</TableHead>
                <TableHead className="w-24 text-right">AKSI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data?.invoices || []).map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono font-medium text-slate-900 dark:text-zinc-100">
                    {inv.invoice_no}
                  </TableCell>
                  <TableCell className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                    {inv.invoice_date}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-slate-800 dark:text-zinc-100 font-medium truncate">{inv.description}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      DPP: {formatRupiah(inv.subtotal)} • PPN: {formatRupiah(inv.tax_amount)}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">
                    {inv.payment_method_summary}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-slate-900 dark:text-zinc-100">
                    {formatRupiah(inv.total_amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <TablePill variant="success">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{inv.status === 'paid' ? 'Done' : inv.status}</span>
                    </TablePill>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(inv.invoice_no)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                      title="Unduh Invoice & e-Faktur PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* Notice for users without invoice access */
        <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#181d2a]/30 text-center space-y-1">
          <FileText className="w-6 h-6 mx-auto text-slate-400 opacity-60" />
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Riwayat Invoice & Tagihan Terproteksi
          </h4>
          <p className="text-[11px] text-slate-500 max-w-md mx-auto">
            Hanya role Finance / Billing Admin dan Super Admin yang berhak mengakses arsip kuitansi dan transaksi pembayaran organisasi.
          </p>
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-xl animate-in fade-in duration-150">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Opsi Peningkatan Lisensi & Paket GLACE
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Pilih kapasitas kursi dan daya komputasi AI sesuai skala operasional perusahaan.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-xl border-2 border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 relative">
                <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  Saat ini
                </span>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Platinum Enterprise
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Rp 144 Jt <span className="text-xs font-normal text-slate-500">/ tahun</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ 250 Kursi Anggota</li>
                  <li>✓ 6 Dasbor Utama Terbuka</li>
                  <li>✓ Multi-Model AI Hub & Private Enclave</li>
                  <li>✓ SLA 99.9% + Dedicated Support</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#181d2a]">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Custom Sovereign Enclave
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Hubungi Tim <span className="text-xs font-normal text-slate-500">B2B</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Unlimited Seats</li>
                  <li>✓ On-Premise Air-Gapped Deployment</li>
                  <li>✓ Custom Finetuning Model Industri</li>
                  <li>✓ Custom Security & SOC2 Type II</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUpgradeModal(false);
                  showToast('Permintaan penyesuaian kuota telah dikirimkan ke Account Executive GLACE.', 'info');
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Hubungi Account Executive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in duration-150 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Ubah Metode Pembayaran Korporat
              </h3>
              <button 
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4">
              <label 
                onClick={() => { setSelectedPayProvider('BCA'); setSelectedPayMasked('**** **** **** 8821'); }}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayProvider === 'BCA' 
                    ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymethod" 
                  checked={selectedPayProvider === 'BCA'} 
                  onChange={() => {}} 
                  className="text-indigo-600 focus:ring-indigo-500" 
                />
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">BCA Corporate Virtual Account</div>
                  <div className="text-[11px] text-slate-500 font-mono">**** 8821 (Utama)</div>
                </div>
              </label>

              <label 
                onClick={() => { setSelectedPayProvider('Bank Mandiri'); setSelectedPayMasked('**** **** **** 4519'); }}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayProvider === 'Bank Mandiri' 
                    ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymethod" 
                  checked={selectedPayProvider === 'Bank Mandiri'} 
                  onChange={() => {}} 
                  className="text-indigo-600 focus:ring-indigo-500" 
                />
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Mandiri Virtual Account / MCM</div>
                  <div className="text-[11px] text-slate-500 font-mono">**** 4519 (Auto-Debit Giro)</div>
                </div>
              </label>

              <label 
                onClick={() => { setSelectedPayProvider('Corporate Card'); setSelectedPayMasked('**** **** **** 7102'); }}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayProvider === 'Corporate Card' 
                    ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymethod" 
                  checked={selectedPayProvider === 'Corporate Card'} 
                  onChange={() => {}} 
                  className="text-indigo-600 focus:ring-indigo-500" 
                />
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Corporate Credit Card (Visa B2B)</div>
                  <div className="text-[11px] text-slate-500 font-mono">**** 7102</div>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleUpdatePaymentMethod}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Simpan & Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
