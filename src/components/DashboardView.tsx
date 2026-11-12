import React from 'react';
import { 
  Bot, 
  BarChart3, 
  Activity, 
  FileText, 
  ShoppingCart, 
  GraduationCap, 
  ChevronRight,
  Clock,
  MoreHorizontal,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ActivityItem } from '../types';

interface DashboardViewProps {
  userName: string;
  onNavigateModule: (moduleId: string) => void;
  activities: ActivityItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  onNavigateModule,
  activities,
}) => {
  // Today's formatted date string matching reference: "Tuesday, 16 Sep 2025"
  const formattedDate = "Tuesday, 16 Sep 2025";

  // Bar chart monthly project data from screenshot
  const monthlyData = [
    { month: 'Jan', count: 186 },
    { month: 'Feb', count: 305 },
    { month: 'Mar', count: 237 },
    { month: 'Apr', count: 73 },
    { month: 'May', count: 209 },
    { month: 'Jun', count: 214 },
  ];
  const maxProjectCount = 350;

  // 6 Core AI Engineering Modules matching screenshot
  const modules = [
    {
      id: 'co-engineer',
      title: 'Co Engineer',
      desc: 'An AI copilot across every engineering discipline: civil, electrical, mechanical, I&C, process, HVAC.',
      icon: Bot,
      colorBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'project-intelligence',
      title: 'Project Intelligence',
      desc: 'AI-driven planning through monitoring: WBS, CPM, cost, and risk.',
      icon: BarChart3,
      colorBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 'asset-intelligence',
      title: 'Asset Intelligence',
      desc: 'Industrial assets from registry to predictive maintenance. In development.',
      icon: Activity,
      colorBg: 'bg-teal-50 text-teal-600',
      badge: 'In development',
    },
    {
      id: 'document-intelligence',
      title: 'Document Intelligence',
      desc: 'AI technical document management: OCR, drawings, revisions, and review. In development.',
      icon: FileText,
      colorBg: 'bg-amber-50 text-amber-600',
      badge: 'In development',
    },
    {
      id: 'glace-commerce',
      title: 'Glace Commerce',
      desc: 'Renewable energy, electrical, automation, and network hardware, with corporate pricing and requests for quotation.',
      icon: ShoppingCart,
      colorBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'glace-academy',
      title: 'Glace Academy',
      desc: 'AI for engineers, SCADA, PLC, BIM, and professional certification etc.',
      icon: GraduationCap,
      colorBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div>
        <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {formattedDate}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
          Welcome back, <span className="text-blue-600">{userName}.</span>
        </h1>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total users', value: '12,450', sub: '+12% from last month' },
          { label: 'Total products', value: '840', sub: 'Corp catalog available' },
          { label: 'Active Projects', value: '1,228', sub: '98% on schedule' },
          { label: 'Refunded / Pending RFQ', value: '14', sub: 'Requires review' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <p className="text-xs font-medium text-slate-400">{stat.label}</p>
            <div className="mt-3">
              <span className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Grafik Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-900">Project grafik</h2>
            <div className="relative">
              <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer">
                <option>Last 30 days</option>
                <option>Last 6 months</option>
                <option>This year</option>
              </select>
            </div>
          </div>

          {/* Bar Chart Representation matching screenshot teal color (#0d9488 or #14b8a6) */}
          <div className="h-56 w-full flex items-end justify-between gap-3 px-4 pt-4 border-b border-slate-100">
            {monthlyData.map((d, index) => {
              const heightPercent = Math.round((d.count / maxProjectCount) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-medium text-slate-600 group-hover:text-teal-700 transition-colors">
                    {d.count}
                  </span>
                  <div className="w-full max-w-[54px] bg-slate-100 rounded-t-md relative flex items-end h-44 overflow-hidden">
                    <div 
                      className="w-full bg-[#1b887a] rounded-t-sm group-hover:bg-[#156e62] transition-all duration-300" 
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400 mt-1">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Status Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">Project Status</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-4">
            {/* Donut graphic representation */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="14" fill="transparent" />
                {/* Teal Segment (45%) */}
                <circle cx="50" cy="50" r="38" stroke="#1b887a" strokeWidth="14" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="131" strokeLinecap="round" />
                {/* Dark Slate Segment (30%) */}
                <circle cx="50" cy="50" r="38" stroke="#264653" strokeWidth="14" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="167" strokeLinecap="round" transform="rotate(160 50 50)" />
                {/* Amber/Orange Segment (25%) */}
                <circle cx="50" cy="50" r="38" stroke="#f4a261" strokeWidth="14" fill="transparent" 
                  strokeDasharray="238.7" strokeDashoffset="179" strokeLinecap="round" transform="rotate(270 50 50)" />
              </svg>
              {/* Inner Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">1 125</span>
                <span className="text-[11px] font-medium text-slate-400">Visitors</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1b887a]"></span> Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#264653]"></span> In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></span> Review
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Engineering Section Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight mb-4">
          AI Engineering
        </h2>
        {/* 6 AI Engineering Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigateModule(m.id)}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-9 h-9 rounded-lg ${m.colorBg} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    {m.title}
                    {m.badge && (
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        {m.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Activity
          </h2>
          <span className="text-xs text-slate-400 font-medium">Auto-synced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6">Activity</th>
                <th className="py-3 px-6">Module</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {activities.map((act) => {
                const isSuccess = act.status === 'Success';
                return (
                  <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-500 whitespace-nowrap">
                      {act.time}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-800 flex items-center gap-2.5">
                      {act.iconType === 'wbs' && <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                      {act.iconType === 'document' && <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      {act.iconType === 'asset' && <Activity className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
                      {act.iconType === 'rfq' && <ShoppingCart className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      {act.iconType === 'academy' && <GraduationCap className="w-3.5 h-3.5 text-purple-500 shrink-0" />}
                      <span>{act.activity}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 whitespace-nowrap">
                      {act.module}
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${
                        isSuccess ? 'text-emerald-600' : 'text-amber-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isSuccess ? 'bg-emerald-500' : 'bg-amber-400'
                        }`} />
                        {act.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors">
                        <MoreHorizontal className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

