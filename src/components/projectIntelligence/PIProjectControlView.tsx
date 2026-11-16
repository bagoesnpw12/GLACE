import React, { useState } from 'react';
import { EngineeringProject, formatIDR } from '../../data/projectIntelligenceData';

interface PIProjectControlViewProps {
  projects: EngineeringProject[];
}

export const PIProjectControlView: React.FC<PIProjectControlViewProps> = ({ projects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-01');
  const selected = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const lagDays = selected?.scheduleLagDays || 0;
  const isDelayed = selected?.status === 'Terlambat' || lagDays > 0;
  const openRisks = selected?.openRisksCount || (selected?.status === 'Terlambat' ? 3 : 1);

  // Jadwal Pekerjaan (Gantt Simpel) matching Screenshot 1 (Kanan)
  const tasksSchedule = [
    { name: '[Pekerjaan 1] Survei Topografi & Desain Rinci', startPct: 0, widthPct: 35, status: 'Sesuai jadwal' },
    { name: '[Pekerjaan 2] Pengadaan Komponen & Fabrikasi', startPct: 25, widthPct: 40, status: 'Sesuai jadwal' },
    { name: '[Pekerjaan 3] Instalasi Struktur & Sipil Lapangan', startPct: 55, widthPct: 30, status: isDelayed ? 'Perlu perhatian' : 'Sesuai jadwal' },
    { name: '[Pekerjaan 4] Pengujian, Komisioning & Energize', startPct: 80, widthPct: 18, status: 'Sesuai jadwal' },
  ];

  return (
    <div className="space-y-6">
      {/* Header bar matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Project Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pantau jadwal, biaya, dan kemajuan [{selected?.name}].
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Pilih Proyek:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.code}] {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 KPI Cards Matching Screenshot 1 (Kanan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Kemajuan */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400">Kemajuan</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            [{selected?.progress}%]
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">[+4%] minggu ini</p>
        </div>

        {/* Card 2: Biaya terpakai */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400">Biaya terpakai</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 truncate">
            [{formatIDR(selected?.actualCost || 0)}]
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {selected && selected.actualCost > selected.budget ? 'Deviasi anggaran' : 'Sesuai anggaran'}
          </p>
        </div>

        {/* Card 3: Selisih jadwal */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400">Selisih jadwal</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            [{lagDays}] hari
          </h3>
          <p className={`text-[11px] font-medium mt-1 ${isDelayed ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isDelayed ? 'Terlambat' : 'Tepat Waktu'}
          </p>
        </div>

        {/* Card 4: Risiko terbuka */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400">Risiko terbuka</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            [{openRisks}]
          </h3>
          <p className="text-[11px] text-rose-500 font-medium mt-1">[{openRisks > 0 ? 1 : 0}] kritis</p>
        </div>
      </div>

      {/* Jadwal Pekerjaan Gantt Matching Screenshot 1 (Kanan) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Jadwal pekerjaan
        </h2>

        {/* Timeline Rows */}
        <div className="space-y-4">
          {tasksSchedule.map((t, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-64 shrink-0 truncate">
                {t.name}
              </span>

              {/* Progress Gantt Track */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-3 rounded-full relative overflow-hidden">
                <div
                  className={`h-full rounded-full absolute ${
                    t.status === 'Perlu perhatian'
                      ? 'bg-amber-500'
                      : 'bg-blue-600'
                  }`}
                  style={{
                    left: `${t.startPct}%`,
                    width: `${t.widthPct}%`
                  }}
                  title={`${t.name} (${t.status})`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend matching Screenshot 1 */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-600">
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span>
            Sesuai jadwal
          </span>
          <span className="flex items-center gap-1.5 text-amber-500">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
            Perlu perhatian
          </span>
        </div>
      </div>
    </div>
  );
};
