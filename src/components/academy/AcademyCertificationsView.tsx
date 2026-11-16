import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Eye, 
  Filter,
  Users,
  Check,
  AlertTriangle,
  RotateCw
} from 'lucide-react';

interface CertificationsViewProps {
  onAddActivity?: (activity: string, module: string) => void;
}

interface CertificationItem {
  id: string;
  courseTitle: string;
  issuedDate: string;
  validUntil: string;
  status: 'aktif' | 'kadaluarsa' | 'dalam proses';
  certificateNo: string;
}

export const AcademyCertificationsView: React.FC<CertificationsViewProps> = ({ onAddActivity }) => {
  const [notification, setNotification] = useState<string | null>(null);

  // Stats matching the top KPI strip: [Sertifikat Dimiliki (n)], [Dalam Proses (n)], [Berlaku (n)], [Kadaluarsa (n)]
  const [stats] = useState({
    owned: 3,
    inProcess: 1,
    active: 2,
    expired: 1
  });

  // Highlight Cards matching the yellow credential cards in the reference image
  const [highlightCerts] = useState([
    {
      id: 'hl-1',
      title: 'Dasar Sistem Kelistrikan Industri',
      issuedDate: '12 Sep 2025',
      certificateNo: 'GLC-CERT-2025-0912'
    },
    {
      id: 'hl-2',
      title: 'PLC & SCADA untuk Industri',
      issuedDate: '28 Agu 2025',
      certificateNo: 'GLC-CERT-2025-0828'
    },
    {
      id: 'hl-3',
      title: 'Industrial 3D Modeling (Plant Design)',
      issuedDate: '15 Jul 2024',
      certificateNo: 'GLC-CERT-2024-0715'
    }
  ]);

  // Operational Table matching the reference layout
  const [certifications] = useState<CertificationItem[]>([
    {
      id: 'cert-1',
      courseTitle: 'Dasar Sistem Kelistrikan Industri',
      issuedDate: '12 Sep 2025',
      validUntil: '12 Sep 2028',
      status: 'aktif',
      certificateNo: 'GLC-CERT-2025-0912'
    },
    {
      id: 'cert-2',
      courseTitle: 'PLC & SCADA untuk Industri',
      issuedDate: '28 Agu 2025',
      validUntil: '28 Agu 2028',
      status: 'aktif',
      certificateNo: 'GLC-CERT-2025-0828'
    },
    {
      id: 'cert-3',
      courseTitle: 'Industrial 3D Modeling (Plant Design)',
      issuedDate: '15 Jul 2024',
      validUntil: '15 Jul 2025',
      status: 'kadaluarsa',
      certificateNo: 'GLC-CERT-2024-0715'
    }
  ]);

  const handleDownload = (cert: { title?: string; courseTitle?: string; certificateNo: string }) => {
    const certName = cert.title || cert.courseTitle || 'Sertifikat Teknik';
    setNotification(`Mengunduh berkas kredensial digital: ${cert.certificateNo}...`);
    if (onAddActivity) {
      onAddActivity(`Mengunduh sertifikat ${certName}`, 'Glace Academy');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Certifications
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pusat validasi kredensial insinyur, nomor lisensi resmi, dan kepatuhan masa berlaku kompetensi.
        </p>
      </div>

      {notification && (
        <div className="p-3 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Top KPI Summary Strip as in Reference Image */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800 gap-4 md:gap-0">
          <div className="md:px-4 space-y-1">
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Sertifikat Dimiliki</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.owned} <span className="text-xs font-normal text-slate-400">Total</span>
            </div>
          </div>

          <div className="md:px-4 space-y-1 pt-3 md:pt-0">
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Dalam Proses</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.inProcess} <span className="text-xs font-normal text-slate-400">Ujian Selesai</span>
            </div>
          </div>

          <div className="md:px-4 space-y-1 pt-3 md:pt-0">
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Berlaku</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.active} <span className="text-xs font-normal text-slate-400">Aktif</span>
            </div>
          </div>

          <div className="md:px-4 space-y-1 pt-3 md:pt-0">
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Kadaluarsa</div>
            <div className="text-2xl font-bold text-slate-400">
              {stats.expired} <span className="text-xs font-normal text-slate-400">Perlu Pembaruan</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Yellow Highlight Credential Cards as in Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {highlightCerts.map((hc) => (
          <div 
            key={hc.id}
            className="p-6 rounded-xl border border-amber-200/90 dark:border-amber-900/40 bg-amber-50/70 dark:bg-[#1e1d18] shadow-2xs flex flex-col items-center justify-center text-center space-y-2 hover:border-amber-300 dark:hover:border-amber-800 transition-colors"
          >
            <div className="text-[11px] font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
              GLACE ACADEMY
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {hc.title}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Diterbitkan: {hc.issuedDate}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              {hc.certificateNo}
            </div>
            <button
              type="button"
              onClick={() => handleDownload(hc)}
              className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              Unduh Kredensial
            </button>
          </div>
        ))}
      </div>

      {/* 3. Detailed Operational Register Table as in Reference */}
      <div className="bg-white dark:bg-[#131722] border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#181d2a]/50 text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6 font-medium">Sertifikat</th>
                <th className="py-3.5 px-4 font-medium">Diterbitkan</th>
                <th className="py-3.5 px-4 font-medium">Berlaku Sampai</th>
                <th className="py-3.5 px-4 font-medium text-center">Status</th>
                <th className="py-3.5 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {certifications.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-[#181d2a]/30 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                    {c.courseTitle}
                    <div className="text-[10px] text-slate-400 font-mono font-normal mt-0.5">
                      {c.certificateNo}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {c.issuedDate}
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {c.validUntil}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {c.status === 'aktif' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                        kadaluarsa
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownload(c)}
                      className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Buka
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
