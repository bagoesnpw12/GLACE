import React, { useState, useEffect } from 'react';
import { 
  EngineeringDocument, 
  DocumentRevisionHistory, 
  TechnicalDrawingItem, 
  KnowledgeBaseItem,
  INITIAL_DOCUMENTS_DUMMY,
  INITIAL_REVISIONS_DUMMY,
  INITIAL_DRAWINGS_DUMMY,
  INITIAL_KNOWLEDGE_DUMMY
} from '../data/documentIntelligenceData';

import { DIDashboardView } from './documentIntelligence/DIDashboardView';
import { DIDocumentsView } from './documentIntelligence/DIDocumentsView';
import { DIDrawingsView } from './documentIntelligence/DIDrawingsView';
import { DIDocumentControlView } from './documentIntelligence/DIDocumentControlView';
import { DIAISearchView } from './documentIntelligence/DIAISearchView';
import { DIAIComparisonView } from './documentIntelligence/DIAIComparisonView';
import { DIKnowledgeBaseView } from './documentIntelligence/DIKnowledgeBaseView';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface DocumentIntelligenceModuleProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const DocumentIntelligenceModule: React.FC<DocumentIntelligenceModuleProps> = ({
  onAddActivity,
  selectedSubItem = '',
  onSelectSubItem
}) => {
  // Shared state: Documents
  const [documents, setDocuments] = useState<EngineeringDocument[]>(() => {
    try {
      const saved = localStorage.getItem('glace_di_documents_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DOCUMENTS_DUMMY;
  });

  // Shared state: Revisions
  const [revisions, setRevisions] = useState<DocumentRevisionHistory[]>(() => {
    try {
      const saved = localStorage.getItem('glace_di_revisions_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVISIONS_DUMMY;
  });

  // Shared state: Drawings
  const [drawings, setDrawings] = useState<TechnicalDrawingItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_di_drawings_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DRAWINGS_DUMMY;
  });

  // Shared state: Knowledge Base
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeBaseItem[]>(() => {
    try {
      const saved = localStorage.getItem('glace_di_kb_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_KNOWLEDGE_DUMMY;
  });

  // LocalStorage persistence
  useEffect(() => {
    try {
      localStorage.setItem('glace_di_documents_demo', JSON.stringify(documents));
      localStorage.setItem('glace_di_revisions_demo', JSON.stringify(revisions));
      localStorage.setItem('glace_di_drawings_demo', JSON.stringify(drawings));
      localStorage.setItem('glace_di_kb_demo', JSON.stringify(knowledgeItems));
    } catch (e) {
      console.error(e);
    }
  }, [documents, revisions, drawings, knowledgeItems]);

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Technical Specification');
  const [uploadDiscipline, setUploadDiscipline] = useState('Elektrikal');
  const [uploadRevision, setUploadRevision] = useState('Rev A');
  const [uploadAuthor, setUploadAuthor] = useState('Lead Engineer');
  const [uploadContent, setUploadContent] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('3.5 MB');

  // Preview Modal State
  const [previewDoc, setPreviewDoc] = useState<EngineeringDocument | null>(null);

  const handleOpenUpload = () => {
    setUploadTitle('');
    setUploadCategory('Technical Specification');
    setUploadDiscipline('Elektrikal');
    setUploadRevision('Rev A');
    setUploadAuthor('Lead Engineer');
    setUploadContent('');
    setShowUploadModal(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newDoc: EngineeringDocument = {
      id: `doc-${Date.now().toString(36)}`,
      title: uploadTitle.endsWith('.pdf') || uploadTitle.endsWith('.dwg') || uploadTitle.endsWith('.docx') ? uploadTitle : `${uploadTitle}.pdf`,
      doc_type: uploadTitle.endsWith('.dwg') ? 'DWG' : uploadTitle.endsWith('.xlsx') ? 'XLSX' : uploadTitle.endsWith('.docx') ? 'DOCX' : 'PDF',
      category: uploadCategory,
      discipline: uploadDiscipline,
      revision: uploadRevision,
      status: 'Under Review',
      ocr_status: 'Verified 100%',
      file_size: uploadFileSize,
      author: uploadAuthor,
      created_at: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString().slice(0, 10),
      content_text: uploadContent || `DOKUMEN SPESIFIKASI TEKNIK ${uploadTitle.toUpperCase()}.\nDisusun oleh ${uploadAuthor}.`
    };

    setDocuments(prev => [newDoc, ...prev]);
    onAddActivity(`Mengunggah berkas dokumen: ${newDoc.title}`, 'Document Intelligence');
    setShowUploadModal(false);
  };

  const handleDeleteDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (doc) {
      onAddActivity(`Menghapus dokumen: ${doc.title}`, 'Document Intelligence');
    }
  };

  const handleDownloadDocument = (doc: EngineeringDocument) => {
    const blob = new Blob([doc.content_text || `BERKAS DOKUMEN GLACE\nJudul: ${doc.title}\nKategori: ${doc.category}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApproveDocument = (docId: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'Approved' } : d));
    const target = documents.find(d => d.id === docId);
    if (target) {
      onAddActivity(`Menyetujui (Approve) dokumen: ${target.title}`, 'Document Intelligence');
    }
  };

  const handleRejectDocument = (docId: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'Rejected' } : d));
    const target = documents.find(d => d.id === docId);
    if (target) {
      onAddActivity(`Menolak (Reject) dokumen: ${target.title}`, 'Document Intelligence');
    }
  };

  const handleCreateRevision = (newRev: DocumentRevisionHistory) => {
    setRevisions(prev => [newRev, ...prev]);
    // update revision label on document
    setDocuments(prev => prev.map(d => d.id === newRev.document_id ? { ...d, revision: newRev.revision, updated_at: new Date().toISOString().slice(0, 10) } : d));
    onAddActivity(`Mencatat revisi ${newRev.revision} untuk ${newRev.document_title || newRev.document_id}`, 'Document Intelligence');
  };

  /* =========================================================================
     ROUTING SUBMENU DOCUMENT INTELLIGENCE:
     1. Dashboard (Default)
     2. Documents
     3. Drawings
     4. Document Control
     5. AI Search
     6. AI Comparison
     7. Knowledge Base
     ========================================================================= */

  let content = null;

  if (selectedSubItem === 'Documents') {
    content = (
      <DIDocumentsView
        documents={documents}
        onOpenUpload={handleOpenUpload}
        onPreviewDocument={(d) => setPreviewDoc(d)}
        onDeleteDocument={handleDeleteDocument}
        onDownloadDocument={handleDownloadDocument}
      />
    );
  } else if (selectedSubItem === 'Drawings') {
    content = (
      <DIDrawingsView
        drawings={drawings}
        onOpenUpload={handleOpenUpload}
      />
    );
  } else if (selectedSubItem === 'Document Control') {
    content = (
      <DIDocumentControlView
        documents={documents}
        revisions={revisions}
        onApproveDocument={handleApproveDocument}
        onRejectDocument={handleRejectDocument}
        onCreateRevision={handleCreateRevision}
      />
    );
  } else if (selectedSubItem === 'AI Search') {
    content = (
      <DIAISearchView
        documents={documents}
        onPreviewDocument={(d) => setPreviewDoc(d)}
      />
    );
  } else if (selectedSubItem === 'AI Comparison') {
    content = (
      <DIAIComparisonView
        documents={documents}
      />
    );
  } else if (selectedSubItem === 'Knowledge Base') {
    content = (
      <DIKnowledgeBaseView
        items={knowledgeItems}
      />
    );
  } else {
    // 1. Dashboard Utama Document Intelligence (Default)
    content = (
      <DIDashboardView
        documents={documents}
        revisions={revisions}
        onNavigateSubmenu={(sub) => {
          if (onSelectSubItem) onSelectSubItem(sub);
        }}
        onPreviewDocument={(d) => setPreviewDoc(d)}
        onOpenUpload={handleOpenUpload}
      />
    );
  }

  return (
    <div className="space-y-6">
      {content}

      {/* Modal Upload Dokumen */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload Dokumen Teknik Baru
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama / Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Misal: Spesifikasi_Teknis_Pompa_Boiler.pdf"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Disiplin Teknik</label>
                  <select
                    value={uploadDiscipline}
                    onChange={(e) => setUploadDiscipline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Elektrikal">Elektrikal</option>
                    <option value="Sipil">Sipil</option>
                    <option value="Mekanikal & HVAC">Mekanikal & HVAC</option>
                    <option value="Instrumentasi">Instrumentasi</option>
                    <option value="Proses">Proses</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Dokumen</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Technical Specification">Technical Specification</option>
                    <option value="Piping & Instrumentation">Piping & Instrumentation</option>
                    <option value="Electrical SLD">Electrical SLD</option>
                    <option value="Calculation Sheet">Calculation Sheet</option>
                    <option value="Design Manual">Design Manual</option>
                    <option value="Environmental Study">Environmental Study</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tag Revisi</label>
                  <input
                    type="text"
                    required
                    value={uploadRevision}
                    onChange={(e) => setUploadRevision(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Penyusun / Insinyur</label>
                  <input
                    type="text"
                    required
                    value={uploadAuthor}
                    onChange={(e) => setUploadAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Isi Teks Dokumen / Klausul Teknik (untuk AI OCR & Search)</label>
                <textarea
                  rows={3}
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  placeholder="Ketik atau tempel ringkasan isi klausul teknis, spesifikasi, dan standar yang berlaku..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                <Upload className="w-5 h-5 text-blue-500 mb-1" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Tarik berkas PDF/DWG ke sini</span>
                <span className="text-[10px] text-slate-400">Ukuran berkas disimulasikan: {uploadFileSize}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Upload & Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview Dokumen */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{previewDoc.title}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{previewDoc.doc_type} • {previewDoc.revision} • {previewDoc.file_size}</span>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 max-h-96 overflow-y-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Teks Hasil OCR Terverifikasi:</span>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {previewDoc.content_text || 'Tidak ada teks OCR terlampir.'}
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Penyusun: {previewDoc.author}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadDocument(previewDoc)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Download Berkas
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

