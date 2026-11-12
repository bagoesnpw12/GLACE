import React, { useState } from 'react';
import { 
  Activity, 
  FileText, 
  Upload, 
  Cpu, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  RefreshCw,
  Plus
} from 'lucide-react';

interface AssetDocProps {
  type: 'asset' | 'document';
  onAddActivity: (activity: string, module: string) => void;
}

export const AssetAndDocIntelligenceModule: React.FC<AssetDocProps> = ({ type, onAddActivity }) => {
  const isAsset = type === 'asset';

  const [assets, setAssets] = useState([
    { id: 'AST-001', name: 'Transformer #TR-001 (Step-up 150kV)', location: 'Substation Bay 4', health: 94, status: 'Normal', prediction: 'Maintenance needed in 142 days' },
    { id: 'AST-002', name: 'Centrifugal Pump Feed Water B', location: 'Boiler Plant Unit 2', health: 68, status: 'Warning', prediction: 'Vibration anomaly detected. Recommend bearing check' },
    { id: 'AST-003', name: 'Inverter Central 2.5MW', location: 'PV Field Section C', health: 99, status: 'Optimal', prediction: 'All thermal sensors nominal' },
  ]);

  const [docs, setDocs] = useState([
    { id: 'DOC-882', title: 'P&ID_RevA.pdf', type: 'Piping & Instrumentation', ocr: 'Verified 100%', revisi: 'Rev A (Approved)', size: '4.2 MB' },
    { id: 'DOC-883', title: 'Single_Line_Diagram_Substation.dwg', type: 'Electrical Layout', ocr: 'Symbols Tagged', revisi: 'Rev C (Under Review)', size: '12.8 MB' },
    { id: 'DOC-884', title: 'HVAC_Ducting_Isometric_Level2.pdf', type: 'HVAC Mechanical', ocr: 'Verified 98%', revisi: 'Rev B (Approved)', size: '2.1 MB' },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (isAsset) {
      const newAst = {
        id: `AST-00${assets.length + 1}`,
        name: inputVal,
        location: 'Factory Floor Block A',
        health: 98,
        status: 'Optimal',
        prediction: 'AI predictive baseline calibrated'
      };
      setAssets([newAst, ...assets]);
      onAddActivity(`Added new asset: ${inputVal}`, 'Asset Intelligence');
    } else {
      const newD = {
        id: `DOC-88${docs.length + 5}`,
        title: inputVal.endsWith('.pdf') ? inputVal : `${inputVal}.pdf`,
        type: 'Technical Specification',
        ocr: 'AI OCR Parsed',
        revisi: 'Rev A (Approved)',
        size: '3.6 MB'
      };
      setDocs([newD, ...docs]);
      onAddActivity(`New document uploaded: ${newD.title}`, 'Document Intelligence');
    }
    setInputVal('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isAsset ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
            }`}>
              {isAsset ? <Activity className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {isAsset ? 'Asset Intelligence' : 'Document Intelligence'}
            </h1>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              In development
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isAsset
              ? 'Industrial assets from registry to predictive maintenance berbasis machine learning sensor telemetry.'
              : 'AI technical document management: OCR teks & diagram, deteksi revisi, dan review gambar P&ID otomatis.'}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAdd} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={isAsset ? "Registrasikan nama aset baru..." : "Unggah nama berkas teknik (PDF/DWG)..."}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`px-3.5 py-2 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-2xs shrink-0 ${
              isAsset ? 'bg-teal-600 hover:bg-teal-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {isAsset ? <Plus className="w-3.5 h-3.5" /> : <Upload className="w-3.5 h-3.5" />}
            <span>{isAsset ? 'Tambah Aset' : 'Upload Berkas'}</span>
          </button>
        </form>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            {isAsset ? 'Industrial Equipment Registry & Health Index' : 'Technical Drawing & Specification Repository'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">Real-time status</span>
        </div>

        {isAsset ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-semibold text-[10px]">
                <th className="py-3 px-5">Tag / ID</th>
                <th className="py-3 px-5">Asset Name</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Health Score</th>
                <th className="py-3 px-5">AI Predictive Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-5 font-mono text-slate-500">{ast.id}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{ast.name}</td>
                  <td className="py-3 px-5 text-slate-600">{ast.location}</td>
                  <td className="py-3 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      ast.health > 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {ast.health}% Health
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-600 font-medium">
                    {ast.prediction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-semibold text-[10px]">
                <th className="py-3 px-5">Doc ID</th>
                <th className="py-3 px-5">Document Title</th>
                <th className="py-3 px-5">Discipline</th>
                <th className="py-3 px-5">AI OCR & Review</th>
                <th className="py-3 px-5">Version Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-5 font-mono text-slate-500">{doc.id}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>{doc.title}</span>
                  </td>
                  <td className="py-3 px-5 text-slate-600">{doc.type}</td>
                  <td className="py-3 px-5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600">
                      {doc.ocr}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-700 font-medium">
                    {doc.revisi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

