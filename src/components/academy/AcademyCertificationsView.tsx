import React, { useState } from 'react';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePill
} from '../ui/table';

interface CertificationsViewProps {
  onAddActivity?: (activity: string, module: string) => void;
}

export const AcademyCertificationsView: React.FC<CertificationsViewProps> = ({ onAddActivity }) => {
  // Highlight Cards Kuning Sesuai Referensi 2 Kanan
  const highlightCerts = [
    { title: '[Nama Kursus]', issued: '(tanggal)' },
    { title: '[Nama Kursus]', issued: '(tanggal)' },
    { title: '[Nama Kursus]', issued: '(tanggal)' },
  ];

  // Tabel Daftar Sertifikat Sesuai Referensi 2 Kanan
  const certsList = [
    { title: '[Nama Kursus]', issued: '(tanggal)', validUntil: '(tanggal)', status: 'Aktif' },
    { title: '[Nama Kursus]', issued: '(tanggal)', validUntil: '(tanggal)', status: 'Aktif' },
    { title: '[Nama Kursus]', issued: '(tanggal)', validUntil: '(tanggal)', status: 'Kadaluarsa' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 2 Kanan */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Certifications
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Kredensial kelulusan, sertifikat kompetensi rekayasa, dan masa berlaku verifikasi audit.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 2 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Sertifikat Dimiliki</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              (n)
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Dalam Proses</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              (n)
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Berlaku</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              (n)
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kadaluarsa</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              (n)
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Tiga Kartu Kredensial Kuning Sesuai Referensi 2 Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {highlightCerts.map((crt, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-amber-200 dark:border-[#27272a] bg-amber-50/70 dark:bg-[#18191f] p-6 text-center space-y-2 hover:border-amber-300 dark:hover:border-zinc-700 transition-colors"
          >
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold block">
              GLACE ACADEMY
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {crt.title}
            </h3>
            <p className="text-[11px] text-zinc-400">
              Diterbitkan: {crt.issued}
            </p>
          </div>
        ))}
      </div>

      {/* 4. Tabel Daftar Sertifikasi Sesuai Standard GLACE & Referensi 2 Kanan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sertifikat</TableHead>
              <TableHead>Diterbitkan</TableHead>
              <TableHead>Berlaku Sampai</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certsList.map((item, idx) => {
              const isAktif = item.status === 'Aktif';
              return (
                <TableRow key={idx} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50">
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    {item.issued}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                    {item.validUntil}
                  </TableCell>
                  <TableCell className="text-center">
                    <TablePill variant={isAktif ? 'success' : 'muted'}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                      <span>{item.status}</span>
                    </TablePill>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
