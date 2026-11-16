import React, { useState } from 'react';
import { ProjectReportItem, INITIAL_REPORTS_DUMMY, EngineeringProject } from '../../data/projectIntelligenceData';
import { Plus, Download, X, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface PIReportsViewProps {
  reports?: ProjectReportItem[];
  projects?: EngineeringProject[];
}

export const PIReportsView: React.FC<PIReportsViewProps> = ({
  reports: initialReports,
  projects = []
}) => {
  const [reportsList, setReportsList] = useState<ProjectReportItem[]>(() => {
    return initialReports && initialReports.length > 0 ? initialReports : INITIAL_REPORTS_DUMMY;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for modal
  const [modalTitle, setModalTitle] = useState('');
  const [modalProject, setModalProject] = useState(projects[0]?.name || 'Pembangunan Gardu Induk 150 kV Weleri');
  const [modalType, setModalType] = useState<ProjectReportItem['type']>('Laporan Mingguan');
  const [modalFormat, setModalFormat] = useState<'PDF' | 'Excel'>('PDF');

  const templates = [
    {
      type: 'Laporan Mingguan' as const,
      desc: 'Kemajuan dan kendala mingguan'
    },
    {
      type: 'Laporan Bulanan' as const,
      desc: 'Ringkasan jadwal dan biaya'
    },
    {
      type: 'Status RFI' as const,
      desc: 'Rekap RFI dan submittal'
    },
    {
      type: 'Ringkasan Risiko' as const,
      desc: 'Temuan AI dan indeks risiko'
    }
  ];

  const handleOpenCreateWithTemplate = (templateType: ProjectReportItem['type']) => {
    setSelectedTemplate(templateType);
    setModalType(templateType);
    setModalTitle(`${templateType} - ${new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`);
    setShowCreateModal(true);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim()) return;

    const newReport: ProjectReportItem = {
      id: `rep-${Date.now()}`,
      projectId: 'proj-new',
      projectName: modalProject,
      title: modalTitle,
      type: modalType,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      format: modalFormat,
      fileSize: modalFormat === 'PDF' ? '3.2 MB' : '1.1 MB',
      author: 'Glace Project Intelligence'
    };

    setReportsList(prev => [newReport, ...prev]);
    setShowCreateModal(false);
  };

  const handleDownload = (rep: ProjectReportItem) => {
    // Simulated clean instant file download
    const blob = new Blob([`Laporan Glace Project Intelligence\nJudul: ${rep.title}\nProyek: ${rep.projectName}\nTanggal: ${rep.date}\nFormat: ${rep.format}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rep.title.replace(/\s+/g, '_')}.${rep.format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buat laporan dari template, lalu unduh atau bagikan.
          </p>
        </div>
        <button
          onClick={() => {
            handleOpenCreateWithTemplate('Laporan Mingguan');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Laporan</span>
        </button>
      </div>

      {/* Template Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Template
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((tpl, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenCreateWithTemplate(tpl.type)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md cursor-pointer transition-all"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {tpl.type}
              </h3>
              <p className="text-xs text-slate-400">
                {tpl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Laporan Terakhir Section */}
      <div className="space-y-3 pt-2">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Laporan terakhir
        </h2>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5 font-semibold">NAMA LAPORAN</th>
                  <th className="py-3 px-5 font-semibold">PROYEK</th>
                  <th className="py-3 px-5 font-semibold">TANGGAL</th>
                  <th className="py-3 px-5 font-semibold">FORMAT</th>
                  <th className="py-3 px-5 font-semibold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {reportsList.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white">
                      {rep.title}
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-400">
                      {rep.projectName}
                    </td>
                    <td className="py-4 px-5 text-slate-500">
                      {rep.date}
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-slate-500">
                      {rep.format}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => handleDownload(rep)}
                        className="px-3.5 py-1.5 rounded-xl border border-blue-600/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-semibold text-xs transition-colors"
                      >
                        Unduh
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Buat Laporan */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat Laporan Proyek Baru
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Template Laporan
                </label>
                <select
                  value={modalType}
                  onChange={(e) => {
                    const t = e.target.value as any;
                    setModalType(t);
                    setModalTitle(`${t} - ${new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Laporan Mingguan">Laporan Mingguan</option>
                  <option value="Laporan Bulanan">Laporan Bulanan</option>
                  <option value="Status RFI">Status RFI</option>
                  <option value="Ringkasan Risiko">Ringkasan Risiko</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Laporan
                </label>
                <input
                  type="text"
                  required
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pilih Proyek
                </label>
                <select
                  value={modalProject}
                  onChange={(e) => setModalProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Seluruh Portofolio Proyek">Seluruh Portofolio Proyek</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Format Berkas
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      checked={modalFormat === 'PDF'}
                      onChange={() => setModalFormat('PDF')}
                      className="accent-blue-600"
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">PDF (.pdf)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      checked={modalFormat === 'Excel'}
                      onChange={() => setModalFormat('Excel')}
                      className="accent-blue-600"
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">Excel (.xlsx)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Generate Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
