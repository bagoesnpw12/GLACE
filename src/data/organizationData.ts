export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Super Admin' | 'Division Head' | 'Lead Engineer' | 'Senior Engineer' | 'Project Manager' | 'Specialist' | 'Staff';
  departmentId: string;
  departmentName: string;
  divisionId: string;
  divisionName: string;
  position: string;
  status: 'Aktif' | 'Cuti' | 'Nonaktif';
  accessLevel: 'Level 1 - Enterprise Admin' | 'Level 2 - Department Lead' | 'Level 3 - Project Access' | 'Level 4 - View Only';
  permissions: string[];
  joinedDate: string;
  lastActive: string;
  directReportsCount?: number;
  location: string;
  phone: string;
}

export interface OrganizationDepartment {
  id: string;
  name: string;
  code: string;
  divisionId: string;
  divisionName: string;
  headName: string;
  headPosition: string;
  headAvatar?: string;
  memberCount: number;
  activeProjectsCount: number;
  description: string;
  budgetAllocated: number;
  location: string;
}

export interface OrganizationDivision {
  id: string;
  name: string;
  code: string;
  directorName: string;
  directorPosition: string;
  departments: OrganizationDepartment[];
  totalMembers: number;
  description: string;
}

export const INITIAL_DIVISIONS: OrganizationDivision[] = [
  {
    id: 'div-eng',
    name: 'Divisi Rekayasa & Keteknikan (Engineering)',
    code: 'DIV-ENG',
    directorName: 'Ir. Hendra Pratama, IPM, ASEAN Eng',
    directorPosition: 'Chief Technology & Engineering Officer',
    totalMembers: 124,
    description: 'Pusat keunggulan teknis, kalkulasi struktural, otomasi industri, dan pengawasan desain terpadu.',
    departments: [
      {
        id: 'dept-civ',
        name: 'Departemen Rekayasa Sipil & Struktur',
        code: 'DEP-CIV',
        divisionId: 'div-eng',
        divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
        headName: 'Dr. Ir. Aditya Nugroho, ST, MT',
        headPosition: 'Head of Civil Engineering',
        memberCount: 38,
        activeProjectsCount: 14,
        description: 'Perencanaan struktur gedung bertingkat, fondasi pondasi dalam, dan analisis seismik SNI 1726.',
        budgetAllocated: 18500000000,
        location: 'Kantor Pusat Jakarta - Lt. 8'
      },
      {
        id: 'dept-elec',
        name: 'Departemen Elektrikal & Instrumentasi',
        code: 'DEP-ELE',
        divisionId: 'div-eng',
        divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
        headName: 'Bagus Setyawan, ST, M.Sc',
        headPosition: 'Head of Electrical & Automation',
        memberCount: 42,
        activeProjectsCount: 19,
        description: 'Sistem tenaga tegangan tinggi 150kV, otomasi SCADA, PLC programming, dan koordinasi proteksi ETAP.',
        budgetAllocated: 24000000000,
        location: 'Engineering Hub Surabaya - Lt. 4'
      },
      {
        id: 'dept-mech',
        name: 'Departemen Mekanikal & HVAC',
        code: 'DEP-MEC',
        divisionId: 'div-eng',
        divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
        headName: 'Dimas Wicaksono, ST',
        headPosition: 'Head of Mechanical & Piping',
        memberCount: 44,
        activeProjectsCount: 12,
        description: 'Pemipaan proses industri, tata udara sentral, pompa transfer, dan kalkulasi ASME B31.3.',
        budgetAllocated: 16200000000,
        location: 'Kantor Pusat Jakarta - Lt. 7'
      }
    ]
  },
  {
    id: 'div-ops',
    name: 'Divisi Operasional & Manajemen Proyek (EPC)',
    code: 'DIV-OPS',
    directorName: 'Budi Santoso, MT, PMP',
    directorPosition: 'VP Project Operations & Field Execution',
    totalMembers: 86,
    description: 'Pengendalian jadwal WBS/CPM proyek lapangan, manajemen vendor subkontraktor, dan jaminan mutu QA/QC.',
    departments: [
      {
        id: 'dept-pm',
        name: 'Departemen Pengendalian Proyek & CPM',
        code: 'DEP-PMO',
        divisionId: 'div-ops',
        divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
        headName: 'Siti Rahmawati, ST, PMP',
        headPosition: 'PMO Lead Director',
        memberCount: 32,
        activeProjectsCount: 22,
        description: 'Pengawasan kurva S, deviasi biaya SPI/CPI, dan koordinasi dokumen submittal kontraktor.',
        budgetAllocated: 12000000000,
        location: 'Kantor Pusat Jakarta - Lt. 9'
      },
      {
        id: 'dept-qa',
        name: 'Departemen Mutu, HSE & Standar Industri',
        code: 'DEP-HSE',
        divisionId: 'div-ops',
        divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
        headName: 'Rizal Fahmi, SKM, CSP',
        headPosition: 'Lead HSE & Quality Assurance',
        memberCount: 28,
        activeProjectsCount: 22,
        description: 'Audit keselamatan kerja OHSAS/SMK3, uji material NDT, dan verifikasi sertifikasi laik operasi.',
        budgetAllocated: 8400000000,
        location: 'Site Office Cilegon & Surabaya'
      },
      {
        id: 'dept-proc',
        name: 'Departemen Pengadaan Industri & Rantai Pasok',
        code: 'DEP-SCM',
        divisionId: 'div-ops',
        divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
        headName: 'Eko Prasetyo, SE, MM',
        headPosition: 'Head of Supply Chain & Vendor Management',
        memberCount: 26,
        activeProjectsCount: 18,
        description: 'Tender korporasi RFQ, pemesanan material impor, serta negosiasi kontrak vendor tier-1.',
        budgetAllocated: 45000000000,
        location: 'Kantor Pusat Jakarta - Lt. 5'
      }
    ]
  },
  {
    id: 'div-tech',
    name: 'Divisi Enterprise AI & Tata Kelola Digital',
    code: 'DIV-TECH',
    directorName: 'Bagoes Nugraha, S.Kom, M.TI',
    directorPosition: 'Chief Information & AI Architect',
    totalMembers: 45,
    description: 'Pengembangan model AI industri GLACE, tata kelola keamanan ISO 27001, serta integrasi API ERP.',
    departments: [
      {
        id: 'dept-ai',
        name: 'Departemen Industrial AI & Algoritma',
        code: 'DEP-IAI',
        divisionId: 'div-tech',
        divisionName: 'Divisi Enterprise AI & Tata Kelola Digital',
        headName: 'Farhan Maulana, M.Sc',
        headPosition: 'Lead AI Engineer',
        memberCount: 24,
        activeProjectsCount: 8,
        description: 'Riset LLM domain rekayasa, OCR skematik CAD, dan machine learning prediksi keausan aset.',
        budgetAllocated: 21000000000,
        location: 'Tech Innovation Lab Bandung'
      },
      {
        id: 'dept-sec',
        name: 'Departemen Keamanan Siber & Integrasi ERP',
        code: 'DEP-SEC',
        divisionId: 'div-tech',
        divisionName: 'Divisi Enterprise AI & Tata Kelola Digital',
        headName: 'Wawan Gunawan, CISSP',
        headPosition: 'Head of Security & Infrastructure',
        memberCount: 21,
        activeProjectsCount: 10,
        description: 'Perlindungan perimeter on-premise, konektivitas SAP/Oracle ERP, dan pemantauan SOC 24/7.',
        budgetAllocated: 14500000000,
        location: 'Data Center Jakarta Cyber Building'
      }
    ]
  }
];

export const INITIAL_MEMBERS: OrganizationMember[] = [
  {
    id: 'usr-001',
    name: 'Bagoes Nugraha, S.Kom, M.TI',
    email: 'bagoesnugrahapw@gmail.com',
    role: 'Super Admin',
    departmentId: 'dept-ai',
    departmentName: 'Departemen Industrial AI & Algoritma',
    divisionId: 'div-tech',
    divisionName: 'Divisi Enterprise AI & Tata Kelola Digital',
    position: 'Chief Information & AI Architect',
    status: 'Aktif',
    accessLevel: 'Level 1 - Enterprise Admin',
    permissions: ['Full Access', 'System Administration', 'User Management', 'Financial Approval', 'Audit Log Access'],
    joinedDate: '12 Jan 2024',
    lastActive: 'Baru saja',
    directReportsCount: 45,
    location: 'Kantor Pusat Jakarta',
    phone: '+62 812-8899-1001'
  },
  {
    id: 'usr-002',
    name: 'Ir. Hendra Pratama, IPM, ASEAN Eng',
    email: 'hendra.pratama@glace.kreasi.digital',
    role: 'Division Head',
    departmentId: 'dept-elec',
    departmentName: 'Departemen Elektrikal & Instrumentasi',
    divisionId: 'div-eng',
    divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
    position: 'Chief Technology & Engineering Officer',
    status: 'Aktif',
    accessLevel: 'Level 1 - Enterprise Admin',
    permissions: ['Engineering Approval', 'Drawing Release', 'Project Signoff', 'Technical Standards Override'],
    joinedDate: '15 Mar 2024',
    lastActive: '12 menit lalu',
    directReportsCount: 124,
    location: 'Kantor Pusat Jakarta',
    phone: '+62 811-2345-6780'
  },
  {
    id: 'usr-003',
    name: 'Dr. Ir. Aditya Nugroho, ST, MT',
    email: 'aditya.nugroho@glace.kreasi.digital',
    role: 'Lead Engineer',
    departmentId: 'dept-civ',
    departmentName: 'Departemen Rekayasa Sipil & Struktur',
    divisionId: 'div-eng',
    divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
    position: 'Head of Civil Engineering',
    status: 'Aktif',
    accessLevel: 'Level 2 - Department Lead',
    permissions: ['Civil Calculation Approval', 'CAD Drawing Review', 'Structural QA/QC'],
    joinedDate: '01 Jun 2024',
    lastActive: '25 menit lalu',
    directReportsCount: 38,
    location: 'Kantor Pusat Jakarta',
    phone: '+62 813-5566-7788'
  },
  {
    id: 'usr-004',
    name: 'Siti Rahmawati, ST, PMP',
    email: 'siti.rahmawati@glace.kreasi.digital',
    role: 'Project Manager',
    departmentId: 'dept-pm',
    departmentName: 'Departemen Pengendalian Proyek & CPM',
    divisionId: 'div-ops',
    divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
    position: 'PMO Lead Director',
    status: 'Aktif',
    accessLevel: 'Level 2 - Department Lead',
    permissions: ['Budget Baseline Control', 'Milestone Handover', 'Contractor Signoff', 'RFI Escalation'],
    joinedDate: '10 Feb 2024',
    lastActive: '1 jam lalu',
    directReportsCount: 32,
    location: 'Kantor Pusat Jakarta',
    phone: '+62 812-4455-9900'
  },
  {
    id: 'usr-005',
    name: 'Bagus Setyawan, ST, M.Sc',
    email: 'bagus.setyawan@glace.kreasi.digital',
    role: 'Senior Engineer',
    departmentId: 'dept-elec',
    departmentName: 'Departemen Elektrikal & Instrumentasi',
    divisionId: 'div-eng',
    divisionName: 'Divisi Rekayasa & Keteknikan (Engineering)',
    position: 'Principal Electrical Protection Engineer',
    status: 'Aktif',
    accessLevel: 'Level 3 - Project Access',
    permissions: ['SLD Diagram Editing', 'ETAP File Calculation', 'Commerce RFQ Generator'],
    joinedDate: '15 Agu 2024',
    lastActive: '3 jam lalu',
    directReportsCount: 14,
    location: 'Engineering Hub Surabaya',
    phone: '+62 815-9988-1234'
  },
  {
    id: 'usr-006',
    name: 'Rizal Fahmi, SKM, CSP',
    email: 'rizal.fahmi@glace.kreasi.digital',
    role: 'Specialist',
    departmentId: 'dept-qa',
    departmentName: 'Departemen Mutu, HSE & Standar Industri',
    divisionId: 'div-ops',
    divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
    position: 'Lead HSE & Quality Assurance',
    status: 'Cuti',
    accessLevel: 'Level 3 - Project Access',
    permissions: ['Safety Audit Logging', 'Incident Report', 'Compliance Review'],
    joinedDate: '20 Sep 2024',
    lastActive: 'Kemarin',
    directReportsCount: 6,
    location: 'Site Office Cilegon',
    phone: '+62 818-1234-5678'
  },
  {
    id: 'usr-007',
    name: 'Eko Prasetyo, SE, MM',
    email: 'eko.prasetyo@glace.kreasi.digital',
    role: 'Division Head',
    departmentId: 'dept-proc',
    departmentName: 'Departemen Pengadaan Industri & Rantai Pasok',
    divisionId: 'div-ops',
    divisionName: 'Divisi Operasional & Manajemen Proyek (EPC)',
    position: 'Head of Supply Chain & Vendor Management',
    status: 'Aktif',
    accessLevel: 'Level 2 - Department Lead',
    permissions: ['Purchase Order Release', 'Corporate Pricing Agreement', 'Vendor Onboarding'],
    joinedDate: '05 Mei 2024',
    lastActive: '4 jam lalu',
    directReportsCount: 26,
    location: 'Kantor Pusat Jakarta',
    phone: '+62 813-8877-6655'
  },
  {
    id: 'usr-008',
    name: 'Wawan Gunawan, CISSP',
    email: 'wawan.gunawan@glace.kreasi.digital',
    role: 'Lead Engineer',
    departmentId: 'dept-sec',
    departmentName: 'Departemen Keamanan Siber & Integrasi ERP',
    divisionId: 'div-tech',
    divisionName: 'Divisi Enterprise AI & Tata Kelola Digital',
    position: 'Head of Security & Infrastructure',
    status: 'Aktif',
    accessLevel: 'Level 1 - Enterprise Admin',
    permissions: ['Network Firewall Rules', 'OAuth SSO Config', 'Data Masking', 'Audit Trail Extraction'],
    joinedDate: '18 Jul 2024',
    lastActive: '5 menit lalu',
    directReportsCount: 21,
    location: 'Data Center Cyber Building',
    phone: '+62 811-9988-7711'
  }
];
