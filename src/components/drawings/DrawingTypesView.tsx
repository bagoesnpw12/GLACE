import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/motionVariants';
import { ArrowLeft, Plus, Edit2, X, Check } from 'lucide-react';

interface DrawingType {
  id: string;
  name: string;
  description: string;
  default_paper: string;
  template_name: string;
}

interface DrawingTypesViewProps {
  onBack?: () => void;
}

export const DrawingTypesView: React.FC<DrawingTypesViewProps> = ({ onBack }) => {
  const [types, setTypes] = useState<DrawingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<DrawingType | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultPaper, setDefaultPaper] = useState('A1');
  const [templateName, setTemplateName] = useState('');

  const fetchTypes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3001/api/coengineer/types');
      const data = await res.json();
      if (data.success && data.types) {
        setTypes(data.types);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleOpenEdit = (t: DrawingType) => {
    setEditingType(t);
    setName(t.name);
    setDescription(t.description);
    setDefaultPaper(t.default_paper);
    setTemplateName(t.template_name);
    setShowModal(true);
  };

  const handleOpenCreate = () => {
    setEditingType(null);
    setName('');
    setDescription('');
    setDefaultPaper('A1');
    setTemplateName('Template Standar');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingType) {
        const res = await fetch(`http://localhost:3001/api/coengineer/types/${editingType.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, default_paper: defaultPaper, template_name: templateName })
        });
        const data = await res.json();
        if (data.success && data.type) {
          setTypes(prev => prev.map(item => item.id === editingType.id ? data.type : item));
        }
      } else {
        const res = await fetch('http://localhost:3001/api/coengineer/types', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, default_paper: defaultPaper, template_name: templateName })
        });
        const data = await res.json();
        if (data.success && data.type) {
          setTypes(prev => [...prev, data.type]);
        }
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
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
            Drawing Types
          </h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tipe Baru</span>
          </button>
        </div>
      </motion.div>

      {/* Types Table Matching Screenshot 4 */}
      <motion.div
        variants={staggerItem}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-4 px-6">TIPE</th>
                <th className="py-4 px-6">DESKRIPSI</th>
                <th className="py-4 px-6">KERTAS BAWAAN</th>
                <th className="py-4 px-6">TEMPLATE</th>
                <th className="py-4 px-6 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Memuat tipe gambar...</td>
                </tr>
              ) : types.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Belum ada tipe gambar yang dikonfigurasi.</td>
                </tr>
              ) : (
                types.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {t.description}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                      {t.default_paper}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                      [{t.template_name}]
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="px-3 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit / Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingType ? 'Edit Tipe Gambar' : 'Tambah Tipe Gambar Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Tipe (Disiplin)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Mekanikal, Sipil, HVAC..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi jenis dokumen..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kertas Bawaan</label>
                  <select
                    value={defaultPaper}
                    onChange={(e) => setDefaultPaper(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="A0">A0</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Template Bawaan</label>
                  <input
                    type="text"
                    required
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Nama template CAD..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

