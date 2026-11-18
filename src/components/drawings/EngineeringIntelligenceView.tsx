import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem, cardInteractiveHover } from '../../utils/motionVariants';
import { ArrowLeft, AlertOctagon, CheckCircle2, ShieldAlert, FileText, Plus, X } from 'lucide-react';
import { DrawingItem } from '../../types/drawing';

interface EngineeringFinding {
  id: string;
  drawing_id?: string;
  title: string;
  drawing_name: string;
  category: 'Material' | 'Dimensi' | 'Standar' | 'Anotasi';
  severity: 'Tinggi' | 'Sedang' | 'Rendah';
  details?: string;
}

interface EngineeringIntelligenceViewProps {
  drawings: DrawingItem[];
  onBack?: () => void;
  onOpenDrawing?: (drawingId: string) => void;
}

export const EngineeringIntelligenceView: React.FC<EngineeringIntelligenceViewProps> = ({
  drawings,
  onBack,
  onOpenDrawing
}) => {
  const [findings, setFindings] = useState<EngineeringFinding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDrawingName, setNewDrawingName] = useState(drawings[0]?.title || 'Denah Lantai 1');
  const [newCategory, setNewCategory] = useState<'Material' | 'Dimensi' | 'Standar' | 'Anotasi'>('Dimensi');
  const [newSeverity, setNewSeverity] = useState<'Tinggi' | 'Sedang' | 'Rendah'>('Tinggi');
  const [newDetails, setNewDetails] = useState('');

  const fetchFindings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3001/api/coengineer/findings');
      const data = await res.json();
      if (data.success && data.findings) {
        setFindings(data.findings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFindings();
  }, []);

  const handleCreateFinding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('http://localhost:3001/api/coengineer/findings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          drawing_name: newDrawingName,
          category: newCategory,
          severity: newSeverity,
          details: newDetails
        })
      });
      const data = await res.json();
      if (data.success && data.finding) {
        setFindings(prev => [data.finding, ...prev]);
        setShowAddModal(false);
        setNewTitle('');
        setNewDetails('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Summary Metrics
  const materialCount = findings.filter(f => f.category === 'Material').length;
  const dimensionCount = findings.filter(f => f.category === 'Dimensi').length;
  const problemCount = findings.filter(f => f.severity === 'Tinggi').length;
  const standardCount = findings.filter(f => f.category === 'Standar').length;

  const getSeverityBadge = (severity: EngineeringFinding['severity']) => {
    switch (severity) {
      case 'Tinggi':
        return 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800';
      case 'Sedang':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
      case 'Rendah':
      default:
        return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineering Intelligence
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Audit otomatis kepatuhan standar SNI/IEC, ketidaksesuaian dimensi, dan risiko teknis
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Analisis</span>
          </button>
        </div>
      </motion.div>

      {/* Top 4 Metric Cards Matching Screenshot 3 */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Material */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Material</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            [{materialCount}] temuan material
          </p>
        </motion.div>

        {/* Dimensi */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dimensi</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            [{dimensionCount}] ketidaksesuaian
          </p>
        </motion.div>

        {/* Potensi masalah */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Potensi masalah</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            [{problemCount}] risiko terdeteksi
          </p>
        </motion.div>

        {/* Standar */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Standar</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            [{standardCount}] standar acuan
          </p>
        </motion.div>
      </motion.div>

      {/* Temuan Table Matching Screenshot 3 */}
      <motion.div
        variants={staggerItem}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs"
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Temuan
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-6">TEMUAN</th>
                <th className="py-3 px-6">GAMBAR</th>
                <th className="py-3 px-6">KATEGORI</th>
                <th className="py-3 px-6 text-right">TINGKAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">Memuat analisis intelligence...</td>
                </tr>
              ) : findings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">Tidak ada temuan rekayasa.</td>
                </tr>
              ) : (
                findings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">
                      <div>{item.title}</div>
                      {item.details && <div className="text-[11px] text-slate-400 font-normal mt-0.5">{item.details}</div>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                      [{item.drawing_name}]
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Finding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tambah Temuan Engineering</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateFinding} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Temuan</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Deskripsi temuan teknik..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Gambar Terkait</label>
                <select
                  value={newDrawingName}
                  onChange={(e) => setNewDrawingName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {drawings.map(d => (
                    <option key={d.id} value={d.title}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Dimensi">Dimensi</option>
                    <option value="Material">Material</option>
                    <option value="Standar">Standar</option>
                    <option value="Anotasi">Anotasi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tingkat Risiko</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Rekomendasi Tindakan</label>
                <textarea
                  rows={2}
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="Catatan tambahan spesifikasi atau acuan SNI..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Simpan Temuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

