import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem, cardInteractiveHover } from '../../utils/motionVariants';
import { ArrowLeft, Upload, Download, FileText, Check, Clock } from 'lucide-react';
import { DrawingItem } from '../../types/drawing';

interface ImportExportViewProps {
  drawings: DrawingItem[];
  onBack?: () => void;
  onImportSuccess?: () => void;
}

interface TransferItem {
  id: string;
  type: 'import' | 'export';
  file_name: string;
  format: string;
  time_label: string;
}

export const ImportExportView: React.FC<ImportExportViewProps> = ({
  drawings,
  onBack,
  onImportSuccess
}) => {
  const [selectedDrawingId, setSelectedDrawingId] = useState<string>(drawings[0]?.id || 'draw_1');
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'DWG' | 'DXF' | 'PNG'>('PDF');
  const [transfers, setTransfers] = useState<TransferItem[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchTransfers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/coengineer/transfers');
      const data = await res.json();
      if (data.success && data.transfers) {
        setTransfers(data.transfers);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleExport = async () => {
    const d = drawings.find(item => item.id === selectedDrawingId) || drawings[0];
    const fileName = `${(d?.title || 'drawing').toLowerCase().replace(/\s+/g, '_')}.${selectedFormat.toLowerCase()}`;

    setIsExporting(true);
    try {
      await fetch('http://localhost:3001/api/coengineer/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'export',
          file_name: fileName,
          format: selectedFormat,
          drawing_id: d?.id
        })
      });

      // Dummy browser download trigger
      const blob = new Blob([`Simulasi file export ${selectedFormat} untuk ${d?.title}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);

      setFeedbackMsg(`Berhasil mengekspor ${fileName}`);
      setTimeout(() => setFeedbackMsg(''), 3000);
      fetchTransfers();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const ext = file.name.split('.').pop()?.toUpperCase() || 'DWG';

    // Validasi format file
    if (!['DWG', 'DXF', 'PDF', 'PNG'].includes(ext)) {
      alert('Format berkas tidak didukung! Pilih format DWG, DXF, PDF, atau PNG.');
      return;
    }

    setIsImporting(true);
    try {
      await fetch('http://localhost:3001/api/coengineer/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import',
          file_name: file.name,
          format: ext
        })
      });

      setFeedbackMsg(`Berkas ${file.name} berhasil diimpor ke sistem.`);
      setTimeout(() => setFeedbackMsg(''), 3000);
      fetchTransfers();
      if (onImportSuccess) onImportSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  };

  const recentImports = transfers.filter(t => t.type === 'import');

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 transition-colors cursor-pointer"
          >
            <span>← Kembali ke Co Engineer</span>
          </button>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Import & Export
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pertukaran format berkas CAD DWG, DXF, PDF, dan citra teknik raster
        </p>
      </motion.div>

      {feedbackMsg && (
        <motion.div variants={staggerItem} className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedbackMsg}</span>
        </motion.div>
      )}

      {/* 2 Column Box Matching Screenshot 5 */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Impor */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Impor
          </h2>

          {/* Drag & Drop Upload Zone */}
          <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 hover:border-blue-400 transition-colors cursor-pointer">
            <span className="text-xs text-slate-500 dark:text-slate-400 mb-3 text-center">
              Tarik file ke sini atau pilih dari komputer
            </span>
            <span className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs">
              {isImporting ? 'Mengimpor...' : 'Pilih File'}
            </span>
            <input
              type="file"
              accept=".dwg,.dxf,.pdf,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Format Badges */}
          <div className="flex items-center gap-3">
            {['DWG', 'DXF', 'PDF'].map((fmt) => (
              <span
                key={fmt}
                className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300"
              >
                {fmt}
              </span>
            ))}
          </div>

          {/* Impor Terakhir */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
              Impor terakhir
            </h3>
            <div className="space-y-2">
              {recentImports.length === 0 ? (
                <p className="text-xs text-slate-400">Belum ada riwayat impor berkas.</p>
              ) : (
                recentImports.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      [{t.file_name}]
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {t.time_label || '10:46 AM'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Ekspor */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Ekspor
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Pilih gambar
              </label>
              <select
                value={selectedDrawingId}
                onChange={(e) => setSelectedDrawingId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {drawings.map((d) => (
                  <option key={d.id} value={d.id}>
                    [{d.title}] • {d.discipline} ({d.revision})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Format
              </label>
              <div className="flex items-center gap-2">
                {(['PDF', 'DWG', 'DXF', 'PNG'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedFormat === fmt
                        ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              {isExporting ? 'Memproses Ekspor...' : 'Ekspor'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

