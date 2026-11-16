export interface EngineeringAsset {
  id: string;
  code: string;
  name: string;
  category: 'Transformator' | 'Circuit Breaker' | 'Panel Distribusi' | 'Generator' | 'Motor Listrik' | 'Pompa Industri' | 'Sistem HVAC' | 'Kabel Tegangan Menengah' | 'Proteksi & Instrumentasi';
  location: string;
  brand: string;
  model: string;
  serialNumber: string;
  procurementDate: string; // YYYY-MM-DD
  assetValue: number; // IDR
  condition: 'Baik' | 'Perlu Perhatian' | 'Kritis';
  operationalStatus: 'Beroperasi' | 'Standby' | 'Maintenance' | 'Rusak';
  healthIndex: number; // 0 - 100
  damageIndicators: string[];
  lastInspectionDate: string;
  nextMaintenanceDate: string;
  specifications: Record<string, string>;
  hasDigitalTwinModel?: boolean;
}

export interface AssetHealthHistory {
  date: string;
  healthIndex: number;
  note: string;
}

export interface AssetInspection {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  inspectionDate: string;
  inspectorName: string;
  status: 'Selesai' | 'Dijadwalkan' | 'Dalam Proses';
  checklist: { item: string; passed: boolean; note?: string }[];
  findings: string;
  recommendations: string;
  photos: string[];
  healthScoreResult: number;
}

export interface AssetMaintenanceWorkOrder {
  id: string;
  woNumber: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  type: 'Preventive Maintenance' | 'Corrective Maintenance';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  scheduledDate: string;
  technicianName: string;
  cost: number; // IDR
  sparePartsUsed: { name: string; quantity: number; cost: number }[];
  workDescription: string;
  status: 'Dijadwalkan' | 'Sedang Dikerjakan' | 'Selesai' | 'Tertunda';
  completionDate?: string;
}

export interface FieldOperationTask {
  id: string;
  woId?: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  officerName: string;
  location: string;
  taskTitle: string;
  status: 'Ditugaskan' | 'Menuju Lokasi' | 'Dikerjakan' | 'Selesai';
  assignedAt: string;
  documentationPhotos: string[];
  reportNotes: string;
}

export const formatIDR = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};

export const INITIAL_ASSETS_DUMMY: EngineeringAsset[] = [
  {
    id: 'ast-01',
    code: 'AST-TRF-001',
    name: 'Transformator Tenaga 60 MVA Bay Weleri',
    category: 'Transformator',
    location: 'GI 150 kV Weleri - Switchyard Bay 1',
    brand: 'Trafindo Prima Murni',
    model: 'ONAN/ONAF 150/20 kV',
    serialNumber: 'TRF-2022-60M-0941',
    procurementDate: '2022-03-15',
    assetValue: 14500000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 94,
    damageIndicators: ['DGA Gas Hidrogen: Normal (8 ppm)', 'Kadar Air Minyak: 12 ppm', 'Suhu Belitan: 58°C'],
    lastInspectionDate: '2026-05-02',
    nextMaintenanceDate: '2026-08-15',
    specifications: {
      'Kapasitas': '60 MVA',
      'Tegangan Primer': '150 kV',
      'Tegangan Sekunder': '20 kV',
      'Frekuensi': '50 Hz',
      'Tipe Pendingin': 'ONAN / ONAF'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-02',
    code: 'AST-CB-002',
    name: 'Circuit Breaker SF6 150 kV Bay Line 1',
    category: 'Circuit Breaker',
    location: 'GI 150 kV Weleri - Bay Penghantar Batang',
    brand: 'ABB / Hitachi Energy',
    model: 'LTB 170D1/B',
    serialNumber: 'CB-SF6-150-8810',
    procurementDate: '2021-08-20',
    assetValue: 2800000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 89,
    damageIndicators: ['Tekanan Gas SF6: 6.2 bar (Normal)', 'Waktu Kontak Buka: 28 ms'],
    lastInspectionDate: '2026-04-20',
    nextMaintenanceDate: '2026-07-10',
    specifications: {
      'Tegangan Pengenal': '170 kV',
      'Arus Kontinu': '3150 A',
      'Arus Pemutus Hubung Singkat': '40 kA',
      'Media Pemadam': 'Gas SF6'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-03',
    code: 'AST-CHL-003',
    name: 'Chiller Sentrifugal Ruang Operasi 350 TR',
    category: 'Sistem HVAC',
    location: 'Central Plant Gedung RSUD Merdeka Lantai Basemen',
    brand: 'Trane Technologies',
    model: 'CTV Water-Cooled CenTraVac',
    serialNumber: 'TRN-CHL-350-019',
    procurementDate: '2020-05-12',
    assetValue: 3400000000,
    condition: 'Kritis',
    operationalStatus: 'Rusak',
    healthIndex: 38,
    damageIndicators: ['Vibrasi Kompresor Bearing: 9.8 mm/s (Bahaya)', 'Kavitasi refrigerant stage 2', 'Tekanan discharge melonjak'],
    lastInspectionDate: '2026-05-08',
    nextMaintenanceDate: '2026-05-15',
    specifications: {
      'Kapasitas Pendinginan': '350 TR (1230 kW)',
      'Refrigerant': 'R-1336mzz(E)',
      'Daya Listrik Motor': '265 kW',
      'COP': '6.4'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-04',
    code: 'AST-PMP-004',
    name: 'Pompa Boiler Feed Water Pompa Sentrifugal Multistage',
    category: 'Pompa Industri',
    location: 'Boiler House PLTU Paiton Unit 3',
    brand: 'Sulzer Pumps',
    model: 'HPT 100-300 6 Stage',
    serialNumber: 'SLZ-PMP-9941-ID',
    procurementDate: '2019-11-04',
    assetValue: 1950000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 64,
    damageIndicators: ['Suhu Bearing DE: 76°C (Batas 75°C)', 'Tetesan Mechanical Seal 45 tetes/menit'],
    lastInspectionDate: '2026-05-05',
    nextMaintenanceDate: '2026-05-22',
    specifications: {
      'Debit Aliran': '240 m³/jam',
      'Head Pompa': '980 m',
      'Kecepatan Putar': '2950 RPM',
      'Daya Motor Penggerak': '450 kW'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-05',
    code: 'AST-GEN-005',
    name: 'Emergency Diesel Generator 1250 kVA Standby',
    category: 'Generator',
    location: 'Power House Gedung Pusat Data Cyber 2',
    brand: 'Cummins Power Generation',
    model: 'QSK50-G4 Soundproof',
    serialNumber: 'CUM-DGN-1250-771',
    procurementDate: '2023-01-10',
    assetValue: 2450000000,
    condition: 'Baik',
    operationalStatus: 'Standby',
    healthIndex: 96,
    damageIndicators: ['Tegangan Baterai Starter: 26.8 V', 'Level Oli Mesin: Penuh', 'Heater Blok Silinder: 45°C'],
    lastInspectionDate: '2026-05-01',
    nextMaintenanceDate: '2026-06-01',
    specifications: {
      'Output Daya': '1250 kVA / 1000 kW',
      'Tegangan Output': '400 / 230 V, 3 Phase',
      'Governor': 'Elektronik ECM',
      'Kapasitas Tangki Harian': '1000 Liter'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-06',
    code: 'AST-MTR-006',
    name: 'Motor Induksi Penggerak Primary Fan 6 kV',
    category: 'Motor Listrik',
    location: 'Area Crusher & Raw Mill Semen Gresik',
    brand: 'Siemens Simotics',
    model: '1RN4 High Voltage Induction',
    serialNumber: 'SIE-HV-MTR-6KV-112',
    procurementDate: '2018-09-14',
    assetValue: 1650000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 59,
    damageIndicators: ['Nilai Isolasi Belitan: 12 MΩ (Mendekati batas minimal)', 'Ketidakseimbangan arus antar phasa 3.8%'],
    lastInspectionDate: '2026-04-28',
    nextMaintenanceDate: '2026-05-18',
    specifications: {
      'Daya Nominal': '630 kW',
      'Tegangan Kerja': '6000 V',
      'Kecepatan': '990 RPM (6 Pole)',
      'Kelas Isolasi': 'Class F (IP55)'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-07',
    code: 'AST-PNL-007',
    name: 'Panel Switchgear Distribusi Tegangan Menengah 20 kV',
    category: 'Panel Distribusi',
    location: 'Gardu Hubung KBN Cakung Jakarta',
    brand: 'Schneider Electric',
    model: 'Premset 24 kV Solid Shielded',
    serialNumber: 'SCH-SWG-20KV-041',
    procurementDate: '2022-07-25',
    assetValue: 4200000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 91,
    damageIndicators: ['Indikator Lampu VPIS: Menyala Normal', 'Partial Discharge: < 5 pC'],
    lastInspectionDate: '2026-04-14',
    nextMaintenanceDate: '2026-10-14',
    specifications: {
      'Jumlah Feeder': '6 Unit Outgoing, 2 Incomer',
      'Tegangan Maksimal': '24 kV',
      'Busbar Arus': '1250 A',
      'Relay Proteksi': 'Sepam Series 40'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-08',
    code: 'AST-KBL-008',
    name: 'Feeder Kabel Tanah XLPE 20 kV Feeder Industri',
    category: 'Kabel Tegangan Menengah',
    location: 'Jalur Kabel Bawah Tanah Tray Kawasan Industri PIER',
    brand: 'Kabelindo Murni',
    model: 'N2XSEBY 3x300 mm² 12/20 kV Cu',
    serialNumber: 'KBL-20KV-3X300-88',
    procurementDate: '2021-02-18',
    assetValue: 3100000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 88,
    damageIndicators: ['Pengujian VLF Tan Delta: 1.2 x 10^-3', 'Resistansi Sheath Jacket: > 50 MΩ'],
    lastInspectionDate: '2026-03-30',
    nextMaintenanceDate: '2026-09-30',
    specifications: {
      'Panjang Kabel': '4.2 Kilometer',
      'Penampang Konduktor': '3x300 mm² Tembaga',
      'Bahan Isolasi': 'Cross-linked Polyethylene (XLPE)',
      'Pelindung Mekanis': 'Steel Tape Armoured'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-09',
    code: 'AST-RLY-009',
    name: 'Numerical Protection Relay Differensial Trafo',
    category: 'Proteksi & Instrumentasi',
    location: 'Ruang Kontrol GI 150 kV Weleri Panel Proteksi',
    brand: 'GE Grid Solutions',
    model: 'MiCOM P643 Transformer Protection',
    serialNumber: 'GE-MIC-P643-0881',
    procurementDate: '2022-03-15',
    assetValue: 480000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 98,
    damageIndicators: ['Self-Supervision Watchdog: Healthy', 'DC Aux Voltage: 110.2 VDC'],
    lastInspectionDate: '2026-05-02',
    nextMaintenanceDate: '2026-11-02',
    specifications: {
      'Protokol Komunikasi': 'IEC 61850 Edition 2',
      'Fungsi Proteksi': '87T, 50/51, 50N/51N, 49, 24 Overfluxing',
      'Sampling Rate': '128 samples/cycle'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-10',
    code: 'AST-PMP-010',
    name: 'Pompa Sludge Effluent IPAL Industri Sentral',
    category: 'Pompa Industri',
    location: 'Unit Pengolahan Limbah Cair Industri Karawang',
    brand: 'Grundfos Pumps',
    model: 'SL1.100.150 Submersible Waste',
    serialNumber: 'GRN-SUB-SL1-409',
    procurementDate: '2020-10-11',
    assetValue: 620000000,
    condition: 'Kritis',
    operationalStatus: 'Maintenance',
    healthIndex: 32,
    damageIndicators: ['Impeller aus tergerus sedimen silika', 'Motor overload trip 3x dalam 48 jam', 'Insulation resistance motor drop ke 0.8 MΩ'],
    lastInspectionDate: '2026-05-09',
    nextMaintenanceDate: '2026-05-13',
    specifications: {
      'Kapasitas Aliran': '180 m³/jam',
      'Total Dynamic Head': '22 m',
      'Free Passage Solid': '100 mm',
      'Daya Motor': '37 kW'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-11',
    code: 'AST-TRF-011',
    name: 'Transformator Distribusi Hermetically Sealed 2500 kVA',
    category: 'Transformator',
    location: 'Substation Pabrik Petrokimia Cilegon',
    brand: 'Schneider Electric',
    model: 'Minera EcoDesign Tier 2',
    serialNumber: 'SCH-MNR-2500-11',
    procurementDate: '2023-04-19',
    assetValue: 1150000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 93,
    damageIndicators: ['Tekanan internal tangki: 0.15 bar', 'Suhu minyak atas: 52°C'],
    lastInspectionDate: '2026-04-12',
    nextMaintenanceDate: '2026-10-12',
    specifications: {
      'Kapasitas': '2500 kVA',
      'Rasio Tegangan': '20 kV / 400 V',
      'Vector Group': 'Dyn11',
      'Loss Level': 'EcoDesign Tier 2 Low Loss'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-12',
    code: 'AST-CB-012',
    name: 'Vacuum Circuit Breaker 24 kV Outgoing Feeder B1',
    category: 'Circuit Breaker',
    location: 'Gardu Distribusi Bandara Internasional YIA',
    brand: 'Eaton Cutler-Hammer',
    model: 'W-VACi 24kV 1250A',
    serialNumber: 'EAT-WVAC-24-339',
    procurementDate: '2021-06-08',
    assetValue: 780000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 71,
    damageIndicators: ['Jumlah switching counter mendekati 8500 kali', 'Mekanisme pegas charging agak lambat (0.8 detik terlambat)'],
    lastInspectionDate: '2026-04-25',
    nextMaintenanceDate: '2026-05-28',
    specifications: {
      'Tegangan Rated': '24 kV',
      'Breaking Capacity': '25 kA / 3s',
      'Mekanisme': 'Spring Motor Operated'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-13',
    code: 'AST-HVAC-013',
    name: 'Air Handling Unit AHU Cleanroom Farmasi Kelas B',
    category: 'Sistem HVAC',
    location: 'Gedung Produksi Steril PT Bio Farma',
    brand: 'Daikin Applied',
    model: 'AHU Modular D-AHU Professional',
    serialNumber: 'DKN-AHU-CLB-201',
    procurementDate: '2022-11-30',
    assetValue: 1250000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 92,
    damageIndicators: ['Differential Pressure HEPA: 180 Pa (Masih dalam rentang aman < 250 Pa)'],
    lastInspectionDate: '2026-05-04',
    nextMaintenanceDate: '2026-08-04',
    specifications: {
      'Volume Aliran Udara': '18.000 CFM',
      'Filtrasi': 'Pre-Filter G4 + Medium F8 + HEPA H14',
      'Static Pressure': '1200 Pa'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-14',
    code: 'AST-GEN-014',
    name: 'Gas Turbine Generator Turbin Gas 15 MW Cogeneration',
    category: 'Generator',
    location: 'Pembangkit Cogeneration Pabrik Kertas Riau',
    brand: 'Solar Turbines (Caterpillar)',
    model: 'Titan 130 Gas Turbine Generator',
    serialNumber: 'SLR-TTN-130-908',
    procurementDate: '2017-05-18',
    assetValue: 58000000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 68,
    damageIndicators: ['Temperatur exhaust T5 sedikit deviasi +14°C', 'Efisiensi termal turun 1.8%'],
    lastInspectionDate: '2026-04-18',
    nextMaintenanceDate: '2026-05-25',
    specifications: {
      'Daya Listrik Kontinu': '15.300 kWe',
      'Bahan Bakar': 'Natural Gas Pipeline',
      'Emisi NOx': '< 15 ppm (SoLoNOx)'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-15',
    code: 'AST-MTR-015',
    name: 'Motor Listrik Pompa Sirkulasi Cooling Tower 110 kW',
    category: 'Motor Listrik',
    location: 'Utility Plant Kawasan Industri Surya Cipta',
    brand: 'ABB Motors',
    model: 'M3BP 315 SMA 4 Top Industrial',
    serialNumber: 'ABB-M3BP-110-44',
    procurementDate: '2021-12-05',
    assetValue: 390000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 87,
    damageIndicators: ['Vibrasi aksial 1.8 mm/s', 'Suhu belitan 64°C normal'],
    lastInspectionDate: '2026-04-02',
    nextMaintenanceDate: '2026-07-02',
    specifications: {
      'Daya Output': '110 kW (150 HP)',
      'Tegangan': '380/660 V, 50 Hz',
      'Efisiensi': 'IE4 Super Premium Efficiency'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-16',
    code: 'AST-PNL-016',
    name: 'Main Distribution Panel MDP 3200A Pabrik Baja',
    category: 'Panel Distribusi',
    location: 'Gedung Gardu Trafo PT Krakatau Posco',
    brand: 'Siemens Sivacon',
    model: 'S8 Low Voltage Power Board',
    serialNumber: 'SIE-S8-MDP-3200',
    procurementDate: '2019-03-22',
    assetValue: 2750000000,
    condition: 'Kritis',
    operationalStatus: 'Beroperasi',
    healthIndex: 42,
    damageIndicators: ['Thermal imaging mendeteksi hot spot sambungan busbar R-Phase 98°C', 'Baut sambungan tembaga kendur'],
    lastInspectionDate: '2026-05-07',
    nextMaintenanceDate: '2026-05-14',
    specifications: {
      'Arus Utama': '3200 A',
      'ACB': 'Siemens 3WL 3200A Draw-out',
      'Short Circuit Withstand': '65 kA / 1s'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-17',
    code: 'AST-PMP-017',
    name: 'Pompa Pemadam Kebakaran Utama Diesel Fire Pump',
    category: 'Pompa Industri',
    location: 'Rumah Pompa Hydrant Kilang Minyak Balongan',
    brand: 'Clarke Fire Protection / Aurora',
    model: 'JU6H-UFAD88 UL/FM Certified',
    serialNumber: 'CLK-FIRE-PMP-701',
    procurementDate: '2022-01-14',
    assetValue: 1850000000,
    condition: 'Baik',
    operationalStatus: 'Standby',
    healthIndex: 97,
    damageIndicators: ['Weekly Auto Start Test: Lolos dalam 4.2 detik', 'Tekanan discharge 12 bar stabil'],
    lastInspectionDate: '2026-05-06',
    nextMaintenanceDate: '2026-06-06',
    specifications: {
      'Kapasitas Aliran': '2000 GPM',
      'Tekanan Head': '150 PSI',
      'Penggerak': 'Diesel Engine Turbocharged 240 HP',
      'Sertifikasi': 'NFPA 20, UL Listed, FM Approved'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-18',
    code: 'AST-RLY-018',
    name: 'RTU Remote Terminal Unit SCADA Substation',
    category: 'Proteksi & Instrumentasi',
    location: 'Ruang Telekomunikasi GI 150 kV Weleri',
    brand: 'Schneider Electric',
    model: 'SCADAPack 575 E Series',
    serialNumber: 'SCH-RTU-575-0182',
    procurementDate: '2022-03-15',
    assetValue: 320000000,
    condition: 'Baik',
    operationalStatus: 'Beroperasi',
    healthIndex: 95,
    damageIndicators: ['Latensi komunikasi DNP3/IEC 104 ke DCC < 15 ms', 'CPU Load: 24%'],
    lastInspectionDate: '2026-05-02',
    nextMaintenanceDate: '2026-11-02',
    specifications: {
      'Port I/O': '64 Digital Input, 16 Digital Output, 16 Analog Input',
      'Komunikasi': 'Dual Ethernet Fiber Optic, RS-485',
      'Protokol': 'IEC 60870-5-104, DNP3 IP'
    },
    hasDigitalTwinModel: true
  },
  {
    id: 'ast-19',
    code: 'AST-KBL-019',
    name: 'Jaringan Kabel Udara A3CS 20 kV Penyulang Krapyak',
    category: 'Kabel Tegangan Menengah',
    location: 'Jalur Transmisi Distribusi Kota Semarang Barat',
    brand: 'Supreme Cable (Sucaco)',
    model: 'A3CS 150 mm² Insulated Conductor',
    serialNumber: 'SUC-A3CS-150-55',
    procurementDate: '2020-08-10',
    assetValue: 1400000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 73,
    damageIndicators: ['Dahan pohon menyentuh kabel pada span tiang #42-#45', 'Isolator tumpu retak halus di tiang sudut #38'],
    lastInspectionDate: '2026-04-29',
    nextMaintenanceDate: '2026-05-20',
    specifications: {
      'Panjang Jalur': '8.5 Kilometer Sirkit',
      'Konduktor': 'Aluminium Alloy Conductor Crosslinked Shielded',
      'Tegangan Sistem': '20 kV'
    },
    hasDigitalTwinModel: false
  },
  {
    id: 'ast-20',
    code: 'AST-TRF-020',
    name: 'Transformator Step-up Generator 20/150 kV 30 MVA',
    category: 'Transformator',
    location: 'PLTA Saguling Unit 2 Jawa Barat',
    brand: 'Siemens Energy',
    model: 'Trafostar GSU 30 MVA',
    serialNumber: 'SIE-GSU-30M-440',
    procurementDate: '2016-04-20',
    assetValue: 18200000000,
    condition: 'Perlu Perhatian',
    operationalStatus: 'Beroperasi',
    healthIndex: 69,
    damageIndicators: ['Kenaikan konsentrasi gas CO & CO2 pada pengujian DGA triwulan I', 'Seal bushing tersier rembesan halus minyak'],
    lastInspectionDate: '2026-04-10',
    nextMaintenanceDate: '2026-05-30',
    specifications: {
      'Kapasitas': '30 MVA',
      'Rasio': '11 kV / 150 kV',
      'Tipe Isolasi': 'Minyak Mineral Diala S4 ZX-I'
    },
    hasDigitalTwinModel: true
  }
];

export const INITIAL_INSPECTIONS_DUMMY: AssetInspection[] = [
  {
    id: 'insp-01',
    assetId: 'ast-03',
    assetCode: 'AST-CHL-003',
    assetName: 'Chiller Sentrifugal Ruang Operasi 350 TR',
    inspectionDate: '2026-05-08',
    inspectorName: 'Budi Santoso, ST (Lead Inspector HVAC)',
    status: 'Selesai',
    checklist: [
      { item: 'Pemeriksaan getaran kompresor (Vibration spectrum check)', passed: false, note: 'Level getaran 9.8 mm/s melampaui batas ISO 10816' },
      { item: 'Pengukuran tekanan discharge & suction freon', passed: false, note: 'Tekanan discharge melonjak 22% dari baseline' },
      { item: 'Uji kebocoran sistem perpipaan evaporator', passed: true, note: 'Tidak ditemukan kebocoran pada tube bundle' },
      { item: 'Inspeksi panel kontrol elektrikal & starter star-delta', passed: true }
    ],
    findings: 'Kompresor stage 2 mengalami mechanical unbalance dan degradasi bearing akibat kotoran pelumas oli.',
    recommendations: 'Segera lakukan overhauling kompresor dan penggantian bearing set serta kuras pelumas sintetis.',
    photos: ['/assets/inspection_chiller_vibe.jpg'],
    healthScoreResult: 38
  },
  {
    id: 'insp-02',
    assetId: 'ast-01',
    assetCode: 'AST-TRF-001',
    assetName: 'Transformator Tenaga 60 MVA Bay Weleri',
    inspectionDate: '2026-05-02',
    inspectorName: 'Ir. Hendra Gunawan (Senior Electrical Auditor)',
    status: 'Selesai',
    checklist: [
      { item: 'Pengujian DGA Dissolved Gas Analysis minyak isolasi', passed: true, note: 'Total Combustible Gases < 100 ppm (Kondisi 1 Normal)' },
      { item: 'Pengukuran tahanan isolasi Megger & Tangen Delta', passed: true, note: 'Tan delta 0.35% (Sangat Baik)' },
      { item: 'Thermography Infrared pada klem Bushing 150 kV & 20 kV', passed: true, note: 'Suhu koneksi merata 38°C' },
      { item: 'Pemeriksaan fungsi kipas pendingin ONAF stage 1 & 2', passed: true }
    ],
    findings: 'Seluruh parameter kelistrikan, minyak trafo, dan sistem pendingin berada dalam batas toleransi standar SPLN & IEC 60076.',
    recommendations: 'Lanjutkan pengujian DGA rutin 6 bulan sekali.',
    photos: ['/assets/inspection_trf_ir.jpg'],
    healthScoreResult: 94
  },
  {
    id: 'insp-03',
    assetId: 'ast-16',
    assetCode: 'AST-PNL-016',
    assetName: 'Main Distribution Panel MDP 3200A Pabrik Baja',
    inspectionDate: '2026-05-07',
    inspectorName: 'Agus Riyadi (Teknisi Proteksi & Termografi)',
    status: 'Selesai',
    checklist: [
      { item: 'Inspeksi Termal Busbar Sambungan Tembaga', passed: false, note: 'Hotspot 98°C pada sambungan phasa R busbar incoming' },
      { item: 'Pengujian ketahanan kontak Air Circuit Breaker 3200A', passed: true, note: 'Resistansi kontak 24 µΩ normal' },
      { item: 'Pembersihan debu konduktif partikel baja di dalam kompartemen', passed: false, note: 'Lapisan debu tebal di ruang busbar' },
      { item: 'Pemeriksaan relay proteksi & trip mechanism', passed: true }
    ],
    findings: 'Baut penyambung busbar incoming phasa R kendor (torsi hanya 35 Nm dari standar 75 Nm) menyebabkan titik panas tinggi yang memicu bahaya busbar flashover.',
    recommendations: 'Jadwalkan shutdown parsial 2 jam untuk re-torqueing dengan kunci torsi terkalibrasi dan pembersihan kompartemen dengan vacuum ESD.',
    photos: ['/assets/inspection_busbar_hotspot.jpg'],
    healthScoreResult: 42
  },
  {
    id: 'insp-04',
    assetId: 'ast-10',
    assetCode: 'AST-PMP-010',
    assetName: 'Pompa Sludge Effluent IPAL Industri Sentral',
    inspectionDate: '2026-05-09',
    inspectorName: 'Dian Permana, MT',
    status: 'Dalam Proses',
    checklist: [
      { item: 'Inspeksi kelonggaran mekanik impeller pompa celup', passed: false, note: 'Blade impeller terkikis silika lumpur' },
      { item: 'Megger belitan motor submersible 37 kW', passed: false, note: 'Isolasi belitan bocor ke ground 0.8 MΩ' },
      { item: 'Pemeriksaan kabel power submersible & gland seal', passed: true }
    ],
    findings: 'Motor kemasukan air akibat seal mechanical rusak tergores pasir abrasif.',
    recommendations: 'Ganti mechanical seal silikon karbida dan re-winding stator motor.',
    photos: ['/assets/inspection_sludge_pump.jpg'],
    healthScoreResult: 32
  }
];

export const INITIAL_WORK_ORDERS_DUMMY: AssetMaintenanceWorkOrder[] = [
  {
    id: 'wo-01',
    woNumber: 'WO-CORR-2026-089',
    assetId: 'ast-03',
    assetCode: 'AST-CHL-003',
    assetName: 'Chiller Sentrifugal Ruang Operasi 350 TR',
    type: 'Corrective Maintenance',
    priority: 'Tinggi',
    scheduledDate: '2026-05-15',
    technicianName: 'Suryo Prasetyo & Tim HVAC Specialist',
    cost: 45000000,
    sparePartsUsed: [
      { name: 'Angular Contact Bearing SKF 7318 BECBM', quantity: 2, cost: 18000000 },
      { name: 'Oli Pelumas Sintetis Polyolester Oil Emkarate RL68H (Drum 20L)', quantity: 2, cost: 9500000 },
      { name: 'Gasket O-Ring Seal Kit Compressor Trane OEM', quantity: 1, cost: 4500000 }
    ],
    workDescription: 'Overhaul unit kompresor chiller sentrifugal stage 2, penggantian bearing set, flushing sistem oli pelumas, dan uji running komisioning beban pendinginan ruang operasi.',
    status: 'Dijadwalkan'
  },
  {
    id: 'wo-02',
    woNumber: 'WO-PREV-2026-092',
    assetId: 'ast-16',
    assetCode: 'AST-PNL-016',
    assetName: 'Main Distribution Panel MDP 3200A Pabrik Baja',
    type: 'Corrective Maintenance',
    priority: 'Tinggi',
    scheduledDate: '2026-05-14',
    technicianName: 'Agus Riyadi (Lead Teknisi Elektrikal)',
    cost: 12500000,
    sparePartsUsed: [
      { name: 'Baut Torsi Tembaga M12 High Tensile + Belleville Washer', quantity: 24, cost: 1800000 },
      { name: 'Thermal Conductive Paste Copper Busbar Joint', quantity: 2, cost: 950000 },
      { name: 'Pembersih Kontak Elektrikal Quick Drying ESD Safe', quantity: 6, cost: 750000 }
    ],
    workDescription: 'Shutdown terencana: re-torque seluruh koneksi baut busbar 3200A dengan torsi 75 Nm, aplikasi pasta konduktif anti korosi, dan verifikasi ulang termal infra merah setelah energize.',
    status: 'Sedang Dikerjakan'
  },
  {
    id: 'wo-03',
    woNumber: 'WO-PREV-2026-061',
    assetId: 'ast-01',
    assetCode: 'AST-TRF-001',
    assetName: 'Transformator Tenaga 60 MVA Bay Weleri',
    type: 'Preventive Maintenance',
    priority: 'Sedang',
    scheduledDate: '2026-08-15',
    technicianName: 'Bambang Sutrisno (PLN Specialist Trafo)',
    cost: 28000000,
    sparePartsUsed: [
      { name: 'Silica Gel Breather Orange Non-Toxic 25 Kg', quantity: 1, cost: 3500000 },
      { name: 'Gasket Bushing 20 kV Nitrile Rubber', quantity: 3, cost: 2400000 }
    ],
    workDescription: 'Pemeliharaan tahunan terencana: penggantian silika gel dehidrator, pengujian tripping proteksi Buchholz dan Sudden Pressure Relay, serta pengujian minyak dielektrik.',
    status: 'Dijadwalkan'
  },
  {
    id: 'wo-04',
    woNumber: 'WO-CORR-2026-095',
    assetId: 'ast-10',
    assetCode: 'AST-PMP-010',
    assetName: 'Pompa Sludge Effluent IPAL Industri Sentral',
    type: 'Corrective Maintenance',
    priority: 'Tinggi',
    scheduledDate: '2026-05-13',
    technicianName: 'Dian Permana (Teknisi Mekanikal & Pompa)',
    cost: 18500000,
    sparePartsUsed: [
      { name: 'Mechanical Seal Silicon Carbide vs Tungsten Carbide 45mm', quantity: 1, cost: 6200000 },
      { name: 'Impeller Cast Iron Hardened Vortex Type', quantity: 1, cost: 7800000 }
    ],
    workDescription: 'Pengangkatan pompa dari wet well, penggantian mechanical seal ganda, kalibrasi impeller clearance, dan pengeringan ruang motor stator.',
    status: 'Sedang Dikerjakan'
  }
];

export const INITIAL_FIELD_OPERATIONS_DUMMY: FieldOperationTask[] = [
  {
    id: 'fld-01',
    woId: 'wo-02',
    assetId: 'ast-16',
    assetCode: 'AST-PNL-016',
    assetName: 'Main Distribution Panel MDP 3200A Pabrik Baja',
    officerName: 'Agus Riyadi & Ahmad Fauzi',
    location: 'Gedung Gardu Trafo PT Krakatau Posco',
    taskTitle: 'Eksekusi Re-torque Busbar 3200A & Eliminasi Hotspot Termal',
    status: 'Dikerjakan',
    assignedAt: '12 Mei 2026, 08:30 WIB',
    documentationPhotos: ['/assets/field_torque_check.jpg'],
    reportNotes: 'Izin kerja (LOTO) telah terpasang. Torsi busbar telah disesuaikan ke 75 Nm pada baut phasa R. Pengujian suhu isolasi menunjukkan penurunan dari 98°C ke 42°C.'
  },
  {
    id: 'fld-02',
    woId: 'wo-01',
    assetId: 'ast-03',
    assetCode: 'AST-CHL-003',
    assetName: 'Chiller Sentrifugal Ruang Operasi 350 TR',
    officerName: 'Suryo Prasetyo (Spesialis Chiller)',
    location: 'Basemen Gedung RSUD Merdeka',
    taskTitle: 'Persiapan Tools Rigging & Penggantian Bearing Kompresor Trane',
    status: 'Ditugaskan',
    assignedAt: '12 Mei 2026, 10:15 WIB',
    documentationPhotos: [],
    reportNotes: 'Menunggu unit crane portable masuk ke area basemen teknis. Suku cadang bearing SKF sudah diserahterimakan dari gudang.'
  },
  {
    id: 'fld-03',
    woId: 'wo-04',
    assetId: 'ast-10',
    assetCode: 'AST-PMP-010',
    assetName: 'Pompa Sludge Effluent IPAL Industri Sentral',
    officerName: 'Dian Permana',
    location: 'Bak Ekualisasi IPAL Industri Karawang',
    taskTitle: 'Hoisting Pompa Submersible & Uji Megger Motor 37 kW',
    status: 'Dikerjakan',
    assignedAt: '12 Mei 2026, 09:00 WIB',
    documentationPhotos: ['/assets/field_pump_hoisting.jpg'],
    reportNotes: 'Pompa berhasil diangkat ke permukaan. Penggantian mechanical seal baru sedang dipasang oleh tim bengkel bubut.'
  },
  {
    id: 'fld-04',
    assetId: 'ast-01',
    assetCode: 'AST-TRF-001',
    assetName: 'Transformator Tenaga 60 MVA Bay Weleri',
    officerName: 'Ir. Hendra Gunawan',
    location: 'GI 150 kV Weleri',
    taskTitle: 'Patroli Cek Rutin Visual & Level Minyak Conservator',
    status: 'Selesai',
    assignedAt: '11 Mei 2026, 14:00 WIB',
    documentationPhotos: ['/assets/field_trf_conservator.jpg'],
    reportNotes: 'Level oli konservator di angka 45% (suhu 32°C ambient). Tidak ada tanda kebocoran atau alarm gas Buchholz.'
  }
];

