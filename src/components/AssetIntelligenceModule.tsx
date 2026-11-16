import React, { useState, useEffect } from 'react';
import { 
  EngineeringAsset, 
  AssetInspection, 
  AssetMaintenanceWorkOrder, 
  FieldOperationTask,
  INITIAL_ASSETS_DUMMY,
  INITIAL_INSPECTIONS_DUMMY,
  INITIAL_WORK_ORDERS_DUMMY,
  INITIAL_FIELD_OPERATIONS_DUMMY,
  formatIDR
} from '../data/assetIntelligenceData';

import { AIDashboardView } from './assetIntelligence/AIDashboardView';
import { AIAssetRegisterView } from './assetIntelligence/AIAssetRegisterView';
import { AIAssetHealthView } from './assetIntelligence/AIAssetHealthView';
import { AIInspectionView } from './assetIntelligence/AIInspectionView';
import { AIMaintenanceView } from './assetIntelligence/AIMaintenanceView';
import { AIDigitalTwinView } from './assetIntelligence/AIDigitalTwinView';
import { AIFieldOperationsView } from './assetIntelligence/AIFieldOperationsView';
import { X } from 'lucide-react';

interface AssetIntelligenceProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const AssetIntelligenceModule: React.FC<AssetIntelligenceProps> = ({
  onAddActivity,
  selectedSubItem = '',
  onSelectSubItem
}) => {
  // Shared state: Assets (dengan localStorage demo persistence)
  const [assets, setAssets] = useState<EngineeringAsset[]>(() => {
    try {
      const saved = localStorage.getItem('glace_ai_assets_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ASSETS_DUMMY;
  });

  // Shared state: Inspections
  const [inspections, setInspections] = useState<AssetInspection[]>(() => {
    try {
      const saved = localStorage.getItem('glace_ai_inspections_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INSPECTIONS_DUMMY;
  });

  // Shared state: Work Orders
  const [workOrders, setWorkOrders] = useState<AssetMaintenanceWorkOrder[]>(() => {
    try {
      const saved = localStorage.getItem('glace_ai_workorders_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_WORK_ORDERS_DUMMY;
  });

  // Shared state: Field Operations
  const [fieldTasks, setFieldTasks] = useState<FieldOperationTask[]>(() => {
    try {
      const saved = localStorage.getItem('glace_ai_field_tasks_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_FIELD_OPERATIONS_DUMMY;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('glace_ai_assets_demo', JSON.stringify(assets));
      localStorage.setItem('glace_ai_inspections_demo', JSON.stringify(inspections));
      localStorage.setItem('glace_ai_workorders_demo', JSON.stringify(workOrders));
      localStorage.setItem('glace_ai_field_tasks_demo', JSON.stringify(fieldTasks));
    } catch (e) {
      console.error(e);
    }
  }, [assets, inspections, workOrders, fieldTasks]);

  // Modal Asset Register (Create / Edit)
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<EngineeringAsset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<EngineeringAsset | null>(null);

  // Form states for asset create/edit
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<EngineeringAsset['category']>('Transformator');
  const [formLocation, setFormLocation] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formSerial, setFormSerial] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formValue, setFormValue] = useState(1500000000);
  const [formCondition, setFormCondition] = useState<EngineeringAsset['condition']>('Baik');
  const [formOperational, setFormOperational] = useState<EngineeringAsset['operationalStatus']>('Beroperasi');
  const [formHealth, setFormHealth] = useState(90);

  const handleOpenCreateAsset = () => {
    setEditingAsset(null);
    const nextIdx = assets.length + 1;
    setFormCode(`AST-ENG-${nextIdx < 10 ? '0' + nextIdx : nextIdx}`);
    setFormName('');
    setFormCategory('Transformator');
    setFormLocation('Area Switchyard Bay 1');
    setFormBrand('ABB Energy');
    setFormModel('Industrial Heavy Duty');
    setFormSerial(`SN-${Date.now().toString(36).toUpperCase()}`);
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormValue(2500000000);
    setFormCondition('Baik');
    setFormOperational('Beroperasi');
    setFormHealth(92);
    setShowAssetModal(true);
  };

  const handleOpenEditAsset = (a: EngineeringAsset) => {
    setEditingAsset(a);
    setFormCode(a.code);
    setFormName(a.name);
    setFormCategory(a.category);
    setFormLocation(a.location);
    setFormBrand(a.brand);
    setFormModel(a.model);
    setFormSerial(a.serialNumber);
    setFormDate(a.procurementDate);
    setFormValue(a.assetValue);
    setFormCondition(a.condition);
    setFormOperational(a.operationalStatus);
    setFormHealth(a.healthIndex);
    setShowAssetModal(true);
  };

  const handleDeleteAsset = (id: string) => {
    const target = assets.find(a => a.id === id);
    setAssets(prev => prev.filter(a => a.id !== id));
    if (target) {
      onAddActivity(`Menghapus aset: ${target.name} (${target.code})`, 'Asset Intelligence');
    }
  };

  const handleSaveAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formName.trim()) return;

    if (editingAsset) {
      const updated: EngineeringAsset = {
        ...editingAsset,
        code: formCode,
        name: formName,
        category: formCategory,
        location: formLocation,
        brand: formBrand,
        model: formModel,
        serialNumber: formSerial,
        procurementDate: formDate,
        assetValue: Number(formValue),
        condition: formCondition,
        operationalStatus: formOperational,
        healthIndex: Number(formHealth)
      };
      setAssets(prev => prev.map(a => a.id === editingAsset.id ? updated : a));
      onAddActivity(`Memperbarui data aset: ${updated.name}`, 'Asset Intelligence');
    } else {
      const created: EngineeringAsset = {
        id: `ast-${Date.now().toString(36)}`,
        code: formCode,
        name: formName,
        category: formCategory,
        location: formLocation,
        brand: formBrand,
        model: formModel,
        serialNumber: formSerial,
        procurementDate: formDate,
        assetValue: Number(formValue),
        condition: formCondition,
        operationalStatus: formOperational,
        healthIndex: Number(formHealth),
        damageIndicators: ['Semua parameter uji pabrikan nominal'],
        lastInspectionDate: new Date().toISOString().slice(0, 10),
        nextMaintenanceDate: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
        specifications: { 'Tipe': formCategory, 'Merek': formBrand },
        hasDigitalTwinModel: true
      };
      setAssets(prev => [created, ...prev]);
      onAddActivity(`Mendaftarkan aset baru: ${created.name}`, 'Asset Intelligence');
    }

    setShowAssetModal(false);
  };

  // Inspections handler
  const handleCreateInspection = (ins: AssetInspection) => {
    setInspections(prev => [ins, ...prev]);
    // Synchronize health score and condition to asset
    setAssets(prev => prev.map(a => {
      if (a.id === ins.assetId) {
        const cond = ins.healthScoreResult >= 85 ? 'Baik' : ins.healthScoreResult >= 50 ? 'Perlu Perhatian' : 'Kritis';
        return {
          ...a,
          healthIndex: ins.healthScoreResult,
          condition: cond,
          lastInspectionDate: ins.inspectionDate,
          damageIndicators: [ins.findings, ...a.damageIndicators.slice(0, 2)]
        };
      }
      return a;
    }));
    onAddActivity(`Menambahkan hasil inspeksi untuk ${ins.assetName}`, 'Asset Intelligence');
  };

  // Maintenance WO handlers
  const handleCreateWorkOrder = (wo: AssetMaintenanceWorkOrder) => {
    setWorkOrders(prev => [wo, ...prev]);
    onAddActivity(`Menerbitkan Work Order ${wo.woNumber} untuk ${wo.assetName}`, 'Asset Intelligence');
  };

  const handleUpdateWOStatus = (woId: string, newStatus: AssetMaintenanceWorkOrder['status']) => {
    setWorkOrders(prev => prev.map(w => w.id === woId ? { ...w, status: newStatus } : w));
  };

  // Field tasks handlers
  const handleCreateFieldTask = (task: FieldOperationTask) => {
    setFieldTasks(prev => [task, ...prev]);
    onAddActivity(`Menugaskan aktivitas lapangan: ${task.taskTitle}`, 'Asset Intelligence');
  };

  const handleUpdateFieldTaskStatus = (taskId: string, newStatus: FieldOperationTask['status']) => {
    setFieldTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  /* =========================================================================
     ROUTING SUBMENU ASSET INTELLIGENCE:
     1. Dashboard (Default)
     2. Asset Register
     3. Asset Health
     4. Inspection
     5. Maintenance
     6. Digital Twin
     7. Field Operations
     ========================================================================= */

  let content = null;

  if (selectedSubItem === 'Asset Register') {
    content = (
      <AIAssetRegisterView
        assets={assets}
        onOpenCreate={handleOpenCreateAsset}
        onEditAsset={handleOpenEditAsset}
        onDeleteAsset={handleDeleteAsset}
        onSelectAssetForDetail={(a) => setViewingAsset(a)}
      />
    );
  } else if (selectedSubItem === 'Asset Health') {
    content = (
      <AIAssetHealthView
        assets={assets}
        onNavigateToMaintenance={() => {
          if (onSelectSubItem) onSelectSubItem('Maintenance');
        }}
      />
    );
  } else if (selectedSubItem === 'Inspection') {
    content = (
      <AIInspectionView
        inspections={inspections}
        assets={assets}
        onCreateInspection={handleCreateInspection}
      />
    );
  } else if (selectedSubItem === 'Maintenance') {
    content = (
      <AIMaintenanceView
        workOrders={workOrders}
        assets={assets}
        onCreateWorkOrder={handleCreateWorkOrder}
        onUpdateStatus={handleUpdateWOStatus}
      />
    );
  } else if (selectedSubItem === 'Digital Twin') {
    content = (
      <AIDigitalTwinView
        assets={assets}
      />
    );
  } else if (selectedSubItem === 'Field Operations') {
    content = (
      <AIFieldOperationsView
        tasks={fieldTasks}
        assets={assets}
        onCreateTask={handleCreateFieldTask}
        onUpdateTaskStatus={handleUpdateFieldTaskStatus}
      />
    );
  } else {
    // 1. Dashboard Asset Intelligence (Default)
    content = (
      <AIDashboardView
        assets={assets}
        workOrders={workOrders}
        inspections={inspections}
        onNavigateSubmenu={(sub) => {
          if (onSelectSubItem) onSelectSubItem(sub);
        }}
        onSelectAssetForDetail={(a) => setViewingAsset(a)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {content}

      {/* Modal Tambah / Edit Aset */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingAsset ? 'Edit Data Aset' : 'Registrasi Aset Teknik Baru'}
              </h3>
              <button onClick={() => setShowAssetModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAssetSubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kode Aset</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="AST-TRF-001"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Aset</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Transformator">Transformator</option>
                    <option value="Circuit Breaker">Circuit Breaker</option>
                    <option value="Panel Distribusi">Panel Distribusi</option>
                    <option value="Generator">Generator</option>
                    <option value="Motor Listrik">Motor Listrik</option>
                    <option value="Pompa Industri">Pompa Industri</option>
                    <option value="Sistem HVAC">Sistem HVAC</option>
                    <option value="Kabel Tegangan Menengah">Kabel Tegangan Menengah</option>
                    <option value="Proteksi & Instrumentasi">Proteksi & Instrumentasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Aset</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Misal: Transformator Tenaga 60 MVA Bay Weleri..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Merek / Pabrikan</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Model / Tipe</label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nomor Seri (SN)</label>
                  <input
                    type="text"
                    required
                    value={formSerial}
                    onChange={(e) => setFormSerial(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lokasi Aset</label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tanggal Pengadaan</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nilai Aset (IDR)</label>
                  <input
                    type="number"
                    step="1000000"
                    required
                    value={formValue}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kondisi</label>
                  <select
                    value={formCondition}
                    onChange={(e) => {
                      const c = e.target.value as any;
                      setFormCondition(c);
                      if (c === 'Baik') setFormHealth(92);
                      else if (c === 'Perlu Perhatian') setFormHealth(65);
                      else setFormHealth(35);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Perlu Perhatian">Perlu Perhatian</option>
                    <option value="Kritis">Kritis</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Operasional</label>
                  <select
                    value={formOperational}
                    onChange={(e) => setFormOperational(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Beroperasi">Beroperasi</option>
                    <option value="Standby">Standby</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Rusak">Rusak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Health Index ({formHealth} / 100)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formHealth}
                  onChange={(e) => setFormHealth(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAssetModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  {editingAsset ? 'Simpan Perubahan' : 'Registrasikan Aset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Aset */}
      {viewingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold block">{viewingAsset.code}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {viewingAsset.name}
                </h3>
              </div>
              <button onClick={() => setViewingAsset(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Kategori</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingAsset.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Lokasi Penempatan</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{viewingAsset.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Merek & Model</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{viewingAsset.brand} - {viewingAsset.model}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Nomor Seri</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{viewingAsset.serialNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Nilai Aset</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatIDR(viewingAsset.assetValue)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Kondisi & Health Index</span>
                <span className="font-bold text-blue-600">{viewingAsset.condition} (HI: {viewingAsset.healthIndex})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Status Operasional</span>
                <span className="font-semibold text-emerald-600">{viewingAsset.operationalStatus}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block mb-1">Indikator Kondisi:</span>
                <div className="space-y-1">
                  {viewingAsset.damageIndicators.map((d, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  const target = viewingAsset;
                  setViewingAsset(null);
                  handleOpenEditAsset(target);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                Edit Aset Ini
              </button>
              <button
                onClick={() => setViewingAsset(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

