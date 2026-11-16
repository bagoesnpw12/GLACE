import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ProjectRFIItem, ProjectSubmittalItem, EngineeringProject } from '../../data/projectIntelligenceData';

interface PIRfiSubmittalsViewProps {
  rfis: ProjectRFIItem[];
  submittals: ProjectSubmittalItem[];
  projects: EngineeringProject[];
  onCreateRfi: (rfi: ProjectRFIItem) => void;
  onCreateSubmittal: (sub: ProjectSubmittalItem) => void;
}

export const PIRfiSubmittalsView: React.FC<PIRfiSubmittalsViewProps> = ({
  rfis,
  submittals,
  projects,
  onCreateRfi,
  onCreateSubmittal
}) => {
  const [activeTab, setActiveTab] = useState<'RFI' | 'Submittals'>('RFI');
  const [showModal, setShowModal] = useState(false);

  // Form RFI states
  const [subject, setSubject] = useState('');
  const [submittedBy, setSubmittedBy] = useState('PT Rekadaya Elektrik');
  const [receiver, setReceiver] = useState('Lead Engineer PLN');
  const [dueDate, setDueDate] = useState('20 Mei 2026');
  const [rfiStatus, setRfiStatus] = useState<ProjectRFIItem['status']>('Menunggu jawaban');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-01');

  // Form Submittal states
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('Material Catalogue');
  const [revision, setRevision] = useState('Rev 0');

  const getRfiStatusBadge = (st: ProjectRFIItem['status']) => {
    switch (st) {
      case 'Terlambat':
        return 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40';
      case 'Menunggu jawaban':
        return 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40';
      case 'Dalam review':
        return 'bg-sky-50 text-sky-600 border border-sky-200 dark:bg-sky-950/40';
      case 'Dijawab':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40';
      case 'Draft':
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'RFI') {
      if (!subject.trim()) return;
      const nextNum = rfis.length + 1;
      const newRfi: ProjectRFIItem = {
        id: `rfi-${Date.now().toString(36)}`,
        projectId,
        number: `RFI-00${nextNum}`,
        subject: subject.trim(),
        submittedBy,
        receiver,
        dateSubmitted: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        dueDate,
        status: rfiStatus
      };
      onCreateRfi(newRfi);
    } else {
      if (!docName.trim()) return;
      const nextNum = submittals.length + 1;
      const newSub: ProjectSubmittalItem = {
        id: `sub-${Date.now().toString(36)}`,
        projectId,
        documentNumber: `SUB-DOC-0${nextNum}`,
        documentName: docName.trim(),
        documentType: docType,
        revision,
        submittedBy,
        dateSubmitted: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Submitted'
      };
      onCreateSubmittal(newSub);
    }
    setShowModal(false);
    setSubject('');
    setDocName('');
  };

  return (
    <div className="space-y-6">
      {/* Header bar matching Screenshot 2 (Kanan) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            RFI & Submittals
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Permintaan informasi dan pengajuan dokumen beserta batas jawabannya.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat {activeTab === 'RFI' ? 'RFI' : 'Submittal'}</span>
        </button>
      </div>

      {/* Tabs RFI & Submittals Matching Screenshot 2 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="flex items-center gap-6 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('RFI')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'RFI'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            RFI
          </button>
          <button
            onClick={() => setActiveTab('Submittals')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'Submittals'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Submittals
          </button>
        </div>

        {/* Content Table Matching Screenshot 2 */}
        <div className="overflow-x-auto">
          {activeTab === 'RFI' ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                  <th className="py-4 px-6 w-16">NO</th>
                  <th className="py-4 px-6">SUBJEK</th>
                  <th className="py-4 px-6">DIAJUKAN OLEH</th>
                  <th className="py-4 px-6">BATAS JAWAB</th>
                  <th className="py-4 px-6 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rfis.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      [{item.subject}]
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      [{item.submittedBy}]
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      [{item.dueDate}]
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold ${getRfiStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                  <th className="py-4 px-6">NO DOKUMEN</th>
                  <th className="py-4 px-6">NAMA DOKUMEN</th>
                  <th className="py-4 px-6">JENIS DOKUMEN</th>
                  <th className="py-4 px-6">REVISI</th>
                  <th className="py-4 px-6">DIAJUKAN OLEH</th>
                  <th className="py-4 px-6 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {submittals.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500">{sub.documentNumber}</td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">[{sub.documentName}]</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{sub.documentType}</td>
                    <td className="py-4 px-6 font-medium">{sub.revision}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">[{sub.submittedBy}]</td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Buat RFI / Submittal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat {activeTab === 'RFI' ? 'RFI Baru' : 'Submittal Baru'}
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Proyek Terkait</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
                  ))}
                </select>
              </div>

              {activeTab === 'RFI' ? (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Subjek Pertanyaan RFI</label>
                    <textarea rows={2} required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Tuliskan klausul atau spesifikasi yang diklarifikasi..." className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Diajukan Oleh</label>
                      <input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Batas Jawab</label>
                      <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Nama Dokumen / Material</label>
                    <input type="text" required value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Misal: Katalog Trafo 60 MVA..." className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Jenis Dokumen</label>
                      <input type="text" value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Revisi</label>
                      <input type="text" value={revision} onChange={(e) => setRevision(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
