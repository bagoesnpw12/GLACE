import React, { useState } from 'react';
import { 
  BarChart3, 
  Plus, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Sparkles 
} from 'lucide-react';

interface ProjectIntelligenceProps {
  onAddActivity: (activity: string, module: string) => void;
}

export const ProjectIntelligenceModule: React.FC<ProjectIntelligenceProps> = ({ onAddActivity }) => {
  const [tasks, setTasks] = useState([
    { id: 'WBS-1.1', title: 'Site Survey & Soil Investigation (PLN Solar)', cpm: 'Critical', cost: '$12,400', progress: 100, risk: 'Low', status: 'Completed' },
    { id: 'WBS-1.2', title: 'Civil Foundation & PV Mounting Structural Plan', cpm: 'Critical', cost: '$45,000', progress: 85, risk: 'Medium', status: 'In Progress' },
    { id: 'WBS-1.3', title: 'Inverter & Step-Up Transformer Procurement', cpm: 'Non-Critical', cost: '$120,000', progress: 60, risk: 'High', status: 'In Progress' },
    { id: 'WBS-1.4', title: 'Grid Interconnection & Relay Protection Testing', cpm: 'Critical', cost: '$30,500', progress: 20, risk: 'Medium', status: 'Pending' },
  ]);

  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask = {
      id: `WBS-1.${tasks.length + 1}`,
      title: newTaskName,
      cpm: 'Critical',
      cost: '$25,000',
      progress: 0,
      risk: 'Low',
      status: 'In Progress'
    };

    setTasks([newTask, ...tasks]);
    onAddActivity(`WBS updated for: ${newTaskName}`, 'Project Intelligence');
    setNewTaskName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Project Intelligence</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Perencanaan proyek berbasis AI melalui monitoring WBS, CPM (Critical Path Method), biaya, dan risiko.
          </p>
        </div>

        <form onSubmit={handleAddTask} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tambah Work Breakdown Structure (WBS)..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah WBS</span>
          </button>
        </form>
      </div>

      {/* Overview Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Critical Path (CPM)</p>
          <p className="text-xl font-bold text-slate-800 mt-1">14 Weeks</p>
          <p className="text-[11px] text-emerald-600 mt-1">Optimal schedule AI</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Total Cost Variance</p>
          <p className="text-xl font-bold text-slate-800 mt-1">-3.4%</p>
          <p className="text-[11px] text-emerald-600 mt-1">Under allocated budget</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Overall Progress</p>
          <p className="text-xl font-bold text-slate-800 mt-1">66.2%</p>
          <p className="text-[11px] text-blue-600 mt-1">On target milestone</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">High Risk Nodes</p>
          <p className="text-xl font-bold text-amber-600 mt-1">1 Node</p>
          <p className="text-[11px] text-amber-500 mt-1">Inverter supply chain</p>
        </div>
      </div>

      {/* WBS Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Work Breakdown Structure (WBS) & CPM Matrix</h2>
          <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Optimized
          </span>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-semibold text-[10px]">
              <th className="py-3 px-5">WBS Code</th>
              <th className="py-3 px-5">Activity Title</th>
              <th className="py-3 px-5">Path Status</th>
              <th className="py-3 px-5">Estimated Cost</th>
              <th className="py-3 px-5">Progress</th>
              <th className="py-3 px-5">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50/60">
                <td className="py-3 px-5 font-mono text-slate-500">{task.id}</td>
                <td className="py-3 px-5 font-semibold text-slate-800">{task.title}</td>
                <td className="py-3 px-5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    task.cpm === 'Critical' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {task.cpm}
                  </span>
                </td>
                <td className="py-3 px-5 font-medium text-slate-700">{task.cost}</td>
                <td className="py-3 px-5">
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">{task.progress}%</span>
                </td>
                <td className="py-3 px-5">
                  <span className={`text-[11px] font-medium ${
                    task.risk === 'High' ? 'text-rose-600' : task.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-600'
                  }`}>
                    {task.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

