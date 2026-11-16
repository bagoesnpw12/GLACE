export interface EngineeringProject {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  progress: number;
  budget: number;        // Nilai nominal IDR murni
  actualCost: number;    // Nilai nominal IDR murni
  status: 'Aktif' | 'Selesai' | 'Terlambat' | 'Perencanaan';
  startDate: string;     // YYYY-MM-DD
  deadline: string;      // YYYY-MM-DD
  description?: string;
  category: 'Elektrikal' | 'Sipil' | 'Mekanikal & HVAC' | 'Instrumentasi' | 'Lingkungan';
  scheduleLagDays?: number; // Selisih jadwal (hari)
  openRisksCount?: number;  // Jumlah risiko terbuka
}

export interface ProjectTaskItem {
  id: string;
  projectId: string;
  type: 'Tugas' | 'Kendala';
  title: string;
  assignee: string;
  deadline: string;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  status: 'Belum dimulai' | 'Dikerjakan' | 'Selesai';
}

export interface ProjectRFIItem {
  id: string;
  projectId: string;
  number: string;
  subject: string;
  submittedBy: string;
  receiver: string;
  dateSubmitted: string;
  dueDate: string;
  status: 'Draft' | 'Menunggu jawaban' | 'Dalam review' | 'Dijawab' | 'Terlambat';
}

export interface ProjectSubmittalItem {
  id: string;
  projectId: string;
  documentNumber: string;
  documentName: string;
  documentType: string;
  revision: string;
  submittedBy: string;
  dateSubmitted: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
}

export interface ProjectAIInsightItem {
  id: string;
  projectId: string;
  title: string;
  category: 'Risiko tinggi' | 'Perlu perhatian' | 'Peluang';
  summary: string;
  recommendation: string;
  details: string;
}

export interface ProjectReportItem {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  type: 'Laporan Mingguan' | 'Laporan Bulanan' | 'Status RFI' | 'Ringkasan Risiko';
  date: string;
  format: 'PDF' | 'Excel';
  fileSize: string;
  author: string;
}

export const formatIDR = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};

export const INITIAL_PROJECTS_DUMMY: EngineeringProject[] = [
  {
    id: 'proj-01',
    code: 'PRJ-EL-001',
    name: 'Pembangunan Gardu Induk 150 kV Weleri',
    client: 'PT PLN (Persero) UIP JBT',
    location: 'Kendal, Jawa Tengah',
    manager: 'Ir. Hendra Gunawan, IPM',
    progress: 72,
    budget: 45000000000,
    actualCost: 32800000000,
    status: 'Aktif',
    startDate: '2026-01-10',
    deadline: '2026-09-30',
    description: 'Pekerjaan sipil pondasi trafo 60 MVA, erection tower gantry, dan instalasi bay line 150 kV.',
    category: 'Elektrikal',
    scheduleLagDays: 0,
    openRisksCount: 2
  },
  {
    id: 'proj-02',
    code: 'PRJ-EL-002',
    name: 'Instalasi Panel Distribusi & MCC Pabrik Semen',
    client: 'PT Semen Nusantara Tbk',
    location: 'Tuban, Jawa Timur',
    manager: 'Bambang Sutrisno, ST',
    progress: 100,
    budget: 8500000000,
    actualCost: 8150000000,
    status: 'Selesai',
    startDate: '2025-10-15',
    deadline: '2026-03-20',
    description: 'Pemasangan cubicle 20 kV, switchgear tegangan rendah, dan panel capacitor bank terintegrasi.',
    category: 'Elektrikal',
    scheduleLagDays: 0,
    openRisksCount: 0
  },
  {
    id: 'proj-03',
    code: 'PRJ-EL-003',
    name: 'Upgrade Jaringan Listrik & Rekonfigurasi Penyulang',
    client: 'PT Kawasan Industri Kendal',
    location: 'Kendal, Jawa Tengah',
    manager: 'Dian Permana, MT',
    progress: 58,
    budget: 12400000000,
    actualCost: 7900000000,
    status: 'Aktif',
    startDate: '2026-02-01',
    deadline: '2026-08-15',
    description: 'Penggantian konduktor A3CS menjadi kabel MVTIC 20 kV serta pemasangan 8 unit Recloser otomatis.',
    category: 'Elektrikal',
    scheduleLagDays: 3,
    openRisksCount: 1
  },
  {
    id: 'proj-04',
    code: 'PRJ-ME-001',
    name: 'Sistem HVAC & Tata Udara Cleanroom Rumah Sakit',
    client: 'RSUD Merdeka Sehat',
    location: 'Semarang, Jawa Tengah',
    manager: 'Dr. Eng. Suryo Prasetyo',
    progress: 64,
    budget: 14200000000,
    actualCost: 15600000000,
    status: 'Terlambat',
    startDate: '2025-11-01',
    deadline: '2026-04-15',
    description: 'Sistem tata udara bertekanan positif ruang operasi dengan filter HEPA 99.99% dan chiller 350 TR.',
    category: 'Mekanikal & HVAC',
    scheduleLagDays: 28,
    openRisksCount: 4
  },
  {
    id: 'proj-05',
    code: 'PRJ-ENV-001',
    name: 'Pengolahan Limbah Industri (IPAL Terpadu) Kawasan',
    client: 'PT Riau Perkasa Pulp & Paper',
    location: 'Siak, Riau',
    manager: 'Ratna Kusuma, ST, M.Sc',
    progress: 100,
    budget: 28000000000,
    actualCost: 26800000000,
    status: 'Selesai',
    startDate: '2025-08-10',
    deadline: '2026-02-28',
    description: 'Instalasi bioreaktor anaerobik, clarifier sekunder, dan sistem monitoring limbah online SPARING.',
    category: 'Lingkungan',
    scheduleLagDays: 0,
    openRisksCount: 0
  },
  {
    id: 'proj-06',
    code: 'PRJ-INS-001',
    name: 'Instalasi Instrumentasi & SCADA Tangki Bahan Bakar',
    client: 'PT Pertamina Patra Niaga',
    location: 'Balongan, Indramayu',
    manager: 'Agus Kurniawan, ST',
    progress: 45,
    budget: 9600000000,
    actualCost: 4800000000,
    status: 'Aktif',
    startDate: '2026-02-15',
    deadline: '2026-10-10',
    description: 'Pemasangan radar tank gauging (RTG), servo flow meter level custody transfer, dan integrasi DCS.',
    category: 'Instrumentasi',
    scheduleLagDays: 0,
    openRisksCount: 1
  },
  {
    id: 'proj-07',
    code: 'PRJ-CIV-001',
    name: 'Pembangunan Infrastruktur Drainase & Jalan Akses Jetty',
    client: 'PT Pelabuhan Petro Nusantara',
    location: 'Gresik, Jawa Timur',
    manager: 'Ir. Ahmad Fadillah, MT',
    progress: 88,
    budget: 34500000000,
    actualCost: 36200000000,
    status: 'Terlambat',
    startDate: '2025-09-01',
    deadline: '2026-04-30',
    description: 'Struktur sheet pile beton prategang, perkerasan rigid pavement mutu K-400, dan culvert box crossing.',
    category: 'Sipil',
    scheduleLagDays: 14,
    openRisksCount: 3
  },
  {
    id: 'proj-08',
    code: 'PRJ-EL-004',
    name: 'Sistem Proteksi & Kontrol Substation Digital PLTS 50 MWp',
    client: 'PT Medco Solar Power',
    location: 'Sumbawa, NTB',
    manager: 'Rian Hidayat, ST',
    progress: 80,
    budget: 18500000000,
    actualCost: 14700000000,
    status: 'Aktif',
    startDate: '2026-01-05',
    deadline: '2026-07-20',
    description: 'Implementasi protokol IEC 61850 GOOSE/MMS, digital IED relay SEL, dan RTU gateway redundan.',
    category: 'Elektrikal',
    scheduleLagDays: 0,
    openRisksCount: 1
  },
  {
    id: 'proj-09',
    code: 'PRJ-ME-002',
    name: 'Retrofit Chiller Sentral & Pompa Sirkulasi Gedung Menara',
    client: 'PT Surya Graha Properti',
    location: 'Jakarta Selatan, DKI',
    manager: 'Bambang Sutrisno, ST',
    progress: 100,
    budget: 6800000000,
    actualCost: 6500000000,
    status: 'Selesai',
    startDate: '2025-12-01',
    deadline: '2026-03-15',
    description: 'Penggantian 2 unit water cooled chiller magnetik R-134a dan VFD inverter pompa sirkulasi primer.',
    category: 'Mekanikal & HVAC',
    scheduleLagDays: 0,
    openRisksCount: 0
  },
  {
    id: 'proj-10',
    code: 'PRJ-INS-002',
    name: 'Modernisasi Fire & Gas Detection System Kilang',
    client: 'PT Energi Mandiri Refinery',
    location: 'Cilacap, Jawa Tengah',
    manager: 'Agus Kurniawan, ST',
    progress: 30,
    budget: 11200000000,
    actualCost: 3500000000,
    status: 'Aktif',
    startDate: '2026-03-01',
    deadline: '2026-11-30',
    description: 'Pemasangan optical flame detector UV/IR, sensor gas H2S elektrokimia, dan panel SIL-3 bersertifikat.',
    category: 'Instrumentasi',
    scheduleLagDays: 0,
    openRisksCount: 2
  },
  {
    id: 'proj-11',
    code: 'PRJ-CIV-002',
    name: 'Pondasi Struktur Baja Gudang Logistik E-Commerce',
    client: 'PT Mega Tirta Logistik',
    location: 'Cikarang, Jawa Barat',
    manager: 'Ir. Ahmad Fadillah, MT',
    progress: 10,
    budget: 22000000000,
    actualCost: 1200000000,
    status: 'Perencanaan',
    startDate: '2026-06-01',
    deadline: '2026-12-31',
    description: 'Pekerjaan spun pile diameter 500mm kedalaman 24 meter, pile cap monolitik, dan sloof penahan gempa.',
    category: 'Sipil',
    scheduleLagDays: 0,
    openRisksCount: 0
  },
  {
    id: 'proj-12',
    code: 'PRJ-ENV-002',
    name: 'Sistem Daur Ulang Air Kondensat Turbin Pembangkit',
    client: 'PT Cikarang Power Generation',
    location: 'Bekasi, Jawa Barat',
    manager: 'Ratna Kusuma, ST, M.Sc',
    progress: 44,
    budget: 15800000000,
    actualCost: 17100000000,
    status: 'Terlambat',
    startDate: '2025-10-20',
    deadline: '2026-04-10',
    description: 'Unit ultrafiltrasi (UF) dan reverse osmosis (RO) kapasitas 120 m3/jam untuk sirkulasi boiler makeup.',
    category: 'Lingkungan',
    scheduleLagDays: 32,
    openRisksCount: 3
  }
];

export const INITIAL_TASKS_DUMMY: ProjectTaskItem[] = [
  { id: 'task-1', projectId: 'proj-01', type: 'Tugas', title: 'Pondasi trafo daya 60 MVA bay Weleri', assignee: 'Ir. Hendra Gunawan', deadline: '20 Mei 2026', priority: 'Tinggi', status: 'Belum dimulai' },
  { id: 'task-2', projectId: 'proj-04', type: 'Kendala', title: 'Chiller 350 TR tertahan di pelabuhan bea cukai', assignee: 'Dr. Eng. Suryo Prasetyo', deadline: '15 Mei 2026', priority: 'Tinggi', status: 'Belum dimulai' },
  { id: 'task-3', projectId: 'proj-01', type: 'Tugas', title: 'Erection tower gantry 150 kV jalur transmisi', assignee: 'Bambang Sutrisno', deadline: '28 Mei 2026', priority: 'Sedang', status: 'Dikerjakan' },
  { id: 'task-4', projectId: 'proj-03', type: 'Tugas', title: 'Pemasangan kabel MVTIC 20 kV feeder utama', assignee: 'Dian Permana', deadline: '05 Juni 2026', priority: 'Sedang', status: 'Dikerjakan' },
  { id: 'task-5', projectId: 'proj-07', type: 'Kendala', title: 'Remang pasang air laut menghambat cor beton jetty', assignee: 'Ir. Ahmad Fadillah', deadline: '22 Mei 2026', priority: 'Tinggi', status: 'Dikerjakan' },
  { id: 'task-6', projectId: 'proj-02', type: 'Tugas', title: 'FAT cubicle 20 kV di workshop Schneider', assignee: 'Bambang Sutrisno', deadline: '10 Maret 2026', priority: 'Rendah', status: 'Selesai' },
  { id: 'task-7', projectId: 'proj-05', type: 'Kendala', title: 'Kalibrasi sensor pH SPARING limbah cair tuntas', assignee: 'Ratna Kusuma', deadline: '25 Feb 2026', priority: 'Sedang', status: 'Selesai' }
];

export const INITIAL_RFI_DUMMY: ProjectRFIItem[] = [
  { id: 'rfi-1', projectId: 'proj-04', number: 'RFI-001', subject: 'Klarifikasi elevasi ducting HEPA filter lantai 3', submittedBy: 'PT Adhi Megah', receiver: 'Konsultan MK Sehat', dateSubmitted: '10 Apr 2026', dueDate: '18 Apr 2026', status: 'Terlambat' },
  { id: 'rfi-2', projectId: 'proj-01', number: 'RFI-002', subject: 'Spesifikasi grounding mat copper tape 50x3 mm', submittedBy: 'PT Rekadaya Elektrik', receiver: 'Lead Engineer PLN', dateSubmitted: '02 Mei 2026', dueDate: '15 Mei 2026', status: 'Menunggu jawaban' },
  { id: 'rfi-3', projectId: 'proj-07', number: 'RFI-003', subject: 'Detail sambungan sheet pile beton jetty segmen 4', submittedBy: 'PT Petro Jetty', receiver: 'Konsultan Struktur', dateSubmitted: '05 Mei 2026', dueDate: '19 Mei 2026', status: 'Menunggu jawaban' },
  { id: 'rfi-4', projectId: 'proj-08', number: 'RFI-004', subject: 'Protokol mapping GOOSE relay proteksi bay bus tie', submittedBy: 'Tim Komisioning', receiver: 'Engineering Lead', dateSubmitted: '20 Apr 2026', dueDate: '28 Apr 2026', status: 'Dijawab' },
  { id: 'rfi-5', projectId: 'proj-03', number: 'RFI-005', subject: 'Rute kabel bawah tanah crossing pipa gas PGN', submittedBy: 'PT Sarana Prima', receiver: 'Dian Permana, MT', dateSubmitted: '12 Mei 2026', dueDate: '25 Mei 2026', status: 'Draft' }
];

export const INITIAL_SUBMITTALS_DUMMY: ProjectSubmittalItem[] = [
  { id: 'sub-1', projectId: 'proj-01', documentNumber: 'SUB-PLN-01', documentName: 'Katalog Trafo Tenaga 60 MVA Trafindo', documentType: 'Material Catalogue', revision: 'Rev 1', submittedBy: 'PT Rekadaya Elektrik', dateSubmitted: '01 Mei 2026', status: 'Approved' },
  { id: 'sub-2', projectId: 'proj-04', documentNumber: 'SUB-HVAC-04', documentName: 'Perhitungan Cooling Load Chiller Ruang Operasi', documentType: 'Calculation Sheet', revision: 'Rev 2', submittedBy: 'PT Adhi Megah', dateSubmitted: '28 Apr 2026', status: 'Under Review' },
  { id: 'sub-3', projectId: 'proj-07', documentNumber: 'SUB-CIV-08', documentName: 'Mix Design Beton Ready Mix Mutu K-400', documentType: 'Test Report', revision: 'Rev 0', submittedBy: 'PT Petro Jetty', dateSubmitted: '10 Mei 2026', status: 'Submitted' },
  { id: 'sub-4', projectId: 'proj-06', documentNumber: 'SUB-INS-02', documentName: 'Sertifikat Kalibrasi Radar Tank Gauge Enraf', documentType: 'Calibration Certificate', revision: 'Rev 1', submittedBy: 'PT Patra Mandiri', dateSubmitted: '15 Apr 2026', status: 'Approved' }
];

export const INITIAL_AI_INSIGHTS_DUMMY: ProjectAIInsightItem[] = [
  {
    id: 'ins-1',
    projectId: 'proj-04',
    title: 'Keterlambatan Pengadaan Chiller Ruang Operasi',
    category: 'Risiko tinggi',
    summary: 'Proyek HVAC RSUD Merdeka mengalami deviasi 28 hari akibat unit pendingin tertahan perizinan impor.',
    recommendation: 'Lakukan eskalasi koordinasi ke pihak ekspedisi atau sewa unit chiller portable sementara agar pengujian ducting dapat berlangsung.',
    details: 'Analisis jadwal menunjukkan jalur kritis (CPM) terhenti pada pekerjaan commissioning HVAC. Potensi denda penalti keterlambatan kontrak Rp 140.000.000 jika lewat Mei.'
  },
  {
    id: 'ins-2',
    projectId: 'proj-07',
    title: 'Pasang Air Laut Mempengaruhi Pengecoran Jetty',
    category: 'Perlu perhatian',
    summary: 'Pengecoran pier head jetty segmen 4 rawan segregasi beton jika dilakukan saat pasang tinggi malam hari.',
    recommendation: 'Sesuaikan jadwal shift cor beton dengan tabel pasang surut BMKG pada jendela surut pukul 08:00 - 14:00 WIB.',
    details: 'Dibutuhkan aditif waterproofing integral dan pemantauan slump beton K-400 secara ketat di batching plant.'
  },
  {
    id: 'ins-3',
    projectId: 'proj-01',
    title: 'Efisiensi Anggaran Galian Tanah Gardu Induk Weleri',
    category: 'Peluang',
    summary: 'Penggunaan model kontur 3D CAD Glace memangkas 8.4% volume timbunan tanah.',
    recommendation: 'Terapkan teknik cut & fill yang sama pada paket proyek gardu induk Kendal berikutnya.',
    details: 'Terjadi penghematan biaya aktual sebesar Rp 420.000.000 dari pos pekerjaan tanah dan stabilitas lereng.'
  }
];

export const INITIAL_REPORTS_DUMMY: ProjectReportItem[] = [
  { id: 'rep-1', projectId: 'proj-01', projectName: 'Pembangunan Gardu Induk 150 kV Weleri', title: 'Laporan Progres Bulanan Gardu Induk Weleri - April 2026', type: 'Laporan Bulanan', date: '30 Apr 2026', format: 'PDF', fileSize: '4.6 MB', author: 'Ir. Hendra Gunawan' },
  { id: 'rep-2', projectId: 'proj-04', projectName: 'Sistem HVAC Cleanroom RSUD', title: 'Laporan Mingguan Keterlambatan Pengadaan Chiller W18', type: 'Laporan Mingguan', date: '08 Mei 2026', format: 'PDF', fileSize: '2.1 MB', author: 'Dr. Eng. Suryo Prasetyo' },
  { id: 'rep-3', projectId: 'proj-01', projectName: 'Pembangunan Gardu Induk 150 kV Weleri', title: 'Rekapitulasi Status RFI & Submittal Proyek 150 kV', type: 'Status RFI', date: '05 Mei 2026', format: 'Excel', fileSize: '1.4 MB', author: 'Project Controls Team' },
  { id: 'rep-4', projectId: 'proj-07', projectName: 'Infrastruktur Drainase & Jetty', title: 'Audit Mitigasi Risiko K3 & Pasang Laut Dermaga', type: 'Ringkasan Risiko', date: '02 Mei 2026', format: 'PDF', fileSize: '3.8 MB', author: 'HSE Department' }
];
