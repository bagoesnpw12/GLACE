import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { staggerContainer, staggerItem, cardInteractiveHover } from '../../utils/motionVariants';
import { ArrowLeft, Plus, CheckCircle, Clock, Send, X, FileCheck } from 'lucide-react';
import { DrawingItem } from '../../types/drawing';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from '../ui/table';

interface ControlRecord {
  id: string;
  drawing_id: string;
  drawing_number: string;
  drawing_name: string;
  revision: string;
  reviewer: string;
  review_date: string;
  status: 'Draf' | 'Review' | 'Disetujui' | 'Terbit';
  notes?: string;
}

interface DrawingControlViewProps {
  drawings: DrawingItem[];
  onBack?: () => void;
  onOpenDrawing?: (drawingId: string) => void;
}

export const DrawingControlView: React.FC<DrawingControlViewProps> = ({
  drawings,
  onBack,
  onOpenDrawing
}) => {
  const [records, setRecords] = useState<ControlRecord[]>([]);
  const [activeStage, setActiveStage] = useState<'Draf' | 'Review' | 'Disetujui' | 'Terbit'>('Review');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [selectedDrawingId, setSelectedDrawingId] = useState<string>(drawings[0]?.id || 'draw_1');
  const [drawingNumber, setDrawingNumber] = useState('DWG-001');
  const [revision, setRevision] = useState('Rev B');
  const [reviewer, setReviewer] = useState('Lead Engineer');
  const [status, setStatus] = useState<'Draf' | 'Review' | 'Disetujui' | 'Terbit'>('Review');
  const [notes, setNotes] = useState('');

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3001/api/coengineer/control');
      const data = await res.json();
      if (data.success && data.records) {
        setRecords(data.records);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCreateRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    const d = drawings.find(item => item.id === selectedDrawingId) || drawings[0];

    try {
      const res = await fetch('http://localhost:3001/api/coengineer/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawing_id: d?.id,
          drawing_number: drawingNumber,
          drawing_name: d?.title || 'Gambar Baru',
          revision,
          reviewer,
          review_date: new Date().toISOString().slice(0, 10),
          status,
          notes
        })
      });
      const data = await res.json();
      if (data.success && data.record) {
        setRecords(prev => [data.record, ...prev]);
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (st: ControlRecord['status']) => {
    switch (st) {
      case 'Disetujui':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
      case 'Terbit':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800';
      case 'Review':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
      case 'Draf':
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Drawing Control
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Ajukan Revisi</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Workflow Status Stages Matching Screenshot 6 */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stage 1: Draf */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          onClick={() => setActiveStage('Draf')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStage === 'Draf'
              ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 opacity-80 hover:opacity-100'
          }`}
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">1 - Draf</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gambar sedang disusun</p>
        </motion.div>

        {/* Stage 2: Review */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          onClick={() => setActiveStage('Review')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStage === 'Review'
              ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 opacity-80 hover:opacity-100'
          }`}
        >
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">2 - Review</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Menunggu pemeriksaan</p>
        </motion.div>

        {/* Stage 3: Disetujui */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          onClick={() => setActiveStage('Disetujui')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStage === 'Disetujui'
              ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 opacity-80 hover:opacity-100'
          }`}
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">3 - Disetujui</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Siap untuk pelepasan</p>
        </motion.div>

        {/* Stage 4: Terbit */}
        <motion.div
          variants={staggerItem}
          whileHover={cardInteractiveHover.whileHover}
          whileTap={cardInteractiveHover.whileTap}
          onClick={() => setActiveStage('Terbit')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStage === 'Terbit'
              ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 opacity-80 hover:opacity-100'
          }`}
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">4 - Terbit</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rilis resmi ke lapangan</p>
        </motion.div>
      </motion.div>

      {/* Riwayat Revisi Table Matching Screenshot 6 */}
      <motion.div
        variants={staggerItem}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs"
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            RIWAYAT REVISI
          </h2>
        </div>

        {/* Standard GLACE Table Riwayat Revisi */}
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-32">NO. GAMBAR</TableHead>
              <TableHead>NAMA</TableHead>
              <TableHead className="w-24">REVISI</TableHead>
              <TableHead className="w-36">PEMERIKSA</TableHead>
              <TableHead className="w-32">TANGGAL</TableHead>
              <TableHead className="w-28 text-right">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-slate-400">Memuat riwayat kontrol gambar...</TableCell>
              </TableRow>
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-slate-400">Belum ada riwayat revisi.</TableCell>
              </TableRow>
            ) : (
              records.map((r) => {
                const isApproved = r.status === 'Disetujui' || r.status === 'Terbit';
                return (
                  <TableRow key={r.id}>
                    <TableCell className="text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                      {r.drawing_number}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900 dark:text-zinc-100">
                      {r.drawing_name}
                    </TableCell>
                    <TableCell className="font-mono text-zinc-700 dark:text-zinc-300">
                      {r.revision}
                    </TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400">
                      {r.reviewer}
                    </TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                      {new Date(r.review_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right">
                      <TablePill variant={isApproved ? 'success' : 'process'}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isApproved ? 'bg-emerald-500 dark:bg-white' : 'bg-blue-500 dark:bg-zinc-400'}`} />
                        <span>{r.status}</span>
                      </TablePill>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Ajukan Revisi Modal dengan Motion Smooth Transition */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ajukan Revisi Gambar</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateRevision} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pilih Dokumen Gambar</label>
                  <select
                    value={selectedDrawingId}
                    onChange={(e) => setSelectedDrawingId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {drawings.map(d => (
                      <option key={d.id} value={d.id}>{d.title} ({d.discipline})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nomor Dokumen</label>
                    <input
                      type="text"
                      required
                      value={drawingNumber}
                      onChange={(e) => setDrawingNumber(e.target.value)}
                      placeholder="DWG-CIP-001"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Revisi</label>
                    <input
                      type="text"
                      required
                      value={revision}
                      onChange={(e) => setRevision(e.target.value)}
                      placeholder="Rev B"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pemeriksa (Reviewer)</label>
                    <input
                      type="text"
                      required
                      value={reviewer}
                      onChange={(e) => setReviewer(e.target.value)}
                      placeholder="Ir. Hendra (Lead Engineer)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Alur</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Draf">Draf</option>
                      <option value="Review">Review</option>
                      <option value="Disetujui">Disetujui</option>
                      <option value="Terbit">Terbit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Catatan Perubahan</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan perubahan revisi teknis..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                  >
                    Simpan Revisi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

