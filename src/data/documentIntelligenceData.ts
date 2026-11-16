export interface EngineeringDocument {
  id: string;
  title: string;
  doc_type: string;          // PDF, DWG, DOCX, XLSX
  category: string;          // Technical Specification, P&ID, Civil Layout, Calculation Sheet, Electrical SLD
  discipline: string;        // Elektrikal, Sipil, Mekanikal & HVAC, Instrumentasi, Proses
  revision: string;          // Rev 0, Rev A, Rev B, Rev C
  status: 'Approved' | 'Under Review' | 'Draft' | 'Rejected';
  ocr_status: 'Verified 100%' | 'Verified 98%' | 'Symbols Tagged' | 'Processing' | 'Not Processed';
  file_size: string;         // e.g. 4.2 MB
  author: string;            // e.g. Ir. Hendra Gunawan
  content_text?: string;     // Isi teks OCR / teks dokumen untuk AI search & AI comparison
  created_at: string;        // YYYY-MM-DD
  updated_at: string;        // YYYY-MM-DD
  file_path?: string;
}

export interface DocumentRevisionHistory {
  id: string;
  document_id: string;
  document_title?: string;
  revision: string;
  change_summary: string;
  changed_by: string;
  status: 'Approved' | 'Under Review' | 'Draft' | 'Rejected';
  created_at: string;
}

export interface TechnicalDrawingItem {
  id: string;
  drawing_number: string;
  title: string;
  discipline: 'Elektrikal' | 'Sipil' | 'Mekanikal & HVAC' | 'Instrumentasi' | 'Proses';
  revision: string;
  status: 'Disetujui' | 'Review' | 'Draf';
  updated_at: string;
  author: string;
  file_size: string;
  thumbnail_url?: string;
  tags: string[];
}

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  discipline: 'Elektrikal' | 'Sipil' | 'Mekanikal & HVAC' | 'Instrumentasi' | 'Proses';
  category: 'Standard Engineering' | 'Design Manual' | 'SOP & Safety' | 'Vendor Guideline' | 'Commissioning';
  summary: string;
  content: string;
  tags: string[];
  file_size: string;
  author: string;
  updated_at: string;
}

export const INITIAL_DOCUMENTS_DUMMY: EngineeringDocument[] = [
  {
    id: 'doc-01',
    title: 'P&ID_RevA_Sistem_Pendingin_Chiller.pdf',
    doc_type: 'PDF',
    category: 'Piping & Instrumentation',
    discipline: 'Mekanikal & HVAC',
    revision: 'Rev A',
    status: 'Approved',
    ocr_status: 'Verified 100%',
    file_size: '4.2 MB',
    author: 'Dr. Eng. Suryo Prasetyo',
    created_at: '2026-04-10',
    updated_at: '2026-05-10',
    content_text: `DIAGRAM ALIR PERPIPAAN DAN INSTRUMENTASI (P&ID) SISTEM PENDINGIN CHILLER 350 TR.
Spesifikasi Teknis:
1. Pompa sirkulasi air dingin (Chilled Water Pump) kapasitas 180 m3/jam, tekanan discharge 4.2 bar.
2. Diameter pipa suplai evaporator DN 200 schedule 40 dengan isolasi thermal elastomeric nitrile 32 mm.
3. Sensor aliran ultrasonik FT-201 terkalibrasi output 4-20 mA ke DDC BMS unit RSUD.
4. Katup modulasi 2-way motorize actuator Belimo 24V AC/DC dengan failsafe spring return.
5. Rebalancing sistem balancing valve otomatis pada tiap coil AHU ruang bedah lantai 3.`
  },
  {
    id: 'doc-02',
    title: 'Single_Line_Diagram_Gardu_Induk_150kV_Weleri.dwg',
    doc_type: 'DWG',
    category: 'Electrical SLD',
    discipline: 'Elektrikal',
    revision: 'Rev C',
    status: 'Approved',
    ocr_status: 'Symbols Tagged',
    file_size: '12.8 MB',
    author: 'Ir. Hendra Gunawan, IPM',
    created_at: '2026-03-15',
    updated_at: '2026-05-08',
    content_text: `SINGLE LINE DIAGRAM GARDU INDUK 150 KV WELERI BAY PENGHANTAR BATANG 1 & 2.
Komponen SLD:
- Transformator daya 60 MVA 150/20 kV ONAN/ONAF, vector group Dyn11.
- Circuit breaker SF6 ABB LTB 170D1 rating continuous 3150A, breaking capacity 40 kA 3s.
- Disconnector Switch DS 150 kV manual & motor operated dengan earthing switch terintegrasi.
- CT rasio 1200-2400/5-5-5A class 0.2S untuk billing metering dan 5P20 untuk diff protection.
- Surge arrester ZnO 150 kV rated voltage 144 kV MCOV 115 kV discharge class 3.`
  },
  {
    id: 'doc-03',
    title: 'Spesifikasi_Teknis_Panel_Switchgear_20kV_Medium_Voltage.pdf',
    doc_type: 'PDF',
    category: 'Technical Specification',
    discipline: 'Elektrikal',
    revision: 'Rev B',
    status: 'Under Review',
    ocr_status: 'Verified 98%',
    file_size: '5.6 MB',
    author: 'Bambang Sutrisno, ST',
    created_at: '2026-04-20',
    updated_at: '2026-05-12',
    content_text: `SPESIFIKASI TEKNIS PANEL SWITCHGEAR TEGANGAN MENENGAH 20 KV TYPE TESTED IEC 62271-200.
Persyaratan Standar:
- Tingkat tegangan nominal 20 kV, tegangan ketahanan frekuensi daya 50 kV/1 menit, BIL 125 kV.
- Busbar tembaga murni electrolytic E-Cu 99.9% kapasitas hantar arus 1250 A dengan heat shrinkable sleeve.
- Pemutus sirkuit vakum (VCB) motorized withdrawal truck mekanisme operasi pegas anti pumping.
- Relay proteksi numerik MiCOM / Sepam dengan fungsi overcurrent 50/51, earth fault 50N/51N, dan arc flash detection optic sensor.
- Interlock mekanik pintu kompartemen kabel dan sakelar pembumian (earthing switch) wajib lolos uji keselamatan personil Internal Arc Classification IAC AFLR 25kA 1s.`
  },
  {
    id: 'doc-04',
    title: 'Kalkulasi_Struktur_Pondasi_Trafo_Tenaga_60MVA.xlsx',
    doc_type: 'XLSX',
    category: 'Calculation Sheet',
    discipline: 'Sipil',
    revision: 'Rev A',
    status: 'Approved',
    ocr_status: 'Verified 100%',
    file_size: '2.4 MB',
    author: 'Ir. Ahmad Fadillah',
    created_at: '2026-02-18',
    updated_at: '2026-04-25',
    content_text: `PERHITUNGAN STRUKTUR PONDASI RAFT PILE TRAFO TENAGA 60 MVA DENGAN OIL PIT BASIN.
Parameter Desain:
- Total beban statis trafo berisi minyak dielektrik: 85 ton. Beban dinamis gempa zona 4 PGA 0.35g.
- Dimensi plat pondasi: 8.5 m x 6.2 m x tebal 0.8 m beton bertulang mutu fc' 30 MPa (K-350).
- Pondasi tiang pancang spun pile diameter 400 mm kedalaman tanah keras 18 meter (12 titik).
- Kapasitas bak penampung minyak (oil catchment basin) 110% dari volume total minyak trafo (32.000 liter).
- Pipa drainase pemisah minyak (oil-water separator) menuju sumpit penampung darurat.`
  },
  {
    id: 'doc-05',
    title: 'Laporan_Kajian_Lingkungan_AMDAL_IPAL_Industri_Sentral.docx',
    doc_type: 'DOCX',
    category: 'Environmental Study',
    discipline: 'Proses',
    revision: 'Rev 0',
    status: 'Draft',
    ocr_status: 'Not Processed',
    file_size: '8.1 MB',
    author: 'Ratna Kusuma, S.Si, M.Sc',
    created_at: '2026-05-01',
    updated_at: '2026-05-11',
    content_text: `DOKUMEN EVALUASI KINERJA UNIT IPAL PENGOLAHAN LIMBAH CAIR DAN EMISI UDARA.
Parameter baku mutu air limbah Peraturan Menteri LHK No. 68 Tahun 2016:
- Nilai rata-rata BOD inlet 450 mg/L tereduksi menjadi 28 mg/L pada outlet (efisiensi 93.7%).
- COD inlet 850 mg/L terurai menjadi 54 mg/L melalui aerasi biologis extended aeration.
- Sensor monitoring online SPARING memantau pH (7.2), TSS (18 mg/L), dan debit air limbah secara real-time langsung ke server KLHK.
- Rekomendasi: Penambahan chemical defoamer pada bak aerasi nomor 2 untuk mencegah carry-over foam saat debit puncak musim hujan.`
  },
  {
    id: 'doc-06',
    title: 'SOP_Pemasangan_dan_Jointing_Kabel_Tanah_XLPE_20kV.pdf',
    doc_type: 'PDF',
    category: 'Design Manual',
    discipline: 'Elektrikal',
    revision: 'Rev B',
    status: 'Approved',
    ocr_status: 'Verified 100%',
    file_size: '3.9 MB',
    author: 'Dian Permana, MT',
    created_at: '2026-01-20',
    updated_at: '2026-04-18',
    content_text: `STANDAR OPERASIONAL PROSEDUR JOINTING DAN TERMINASI KABEL TANAH XLPE 20 KV.
Prosedur Teknis:
1. Pengupasan outer sheath PVC dan metallic screen copper tape menggunakan pisau kupas presisi khusus kabel tegangan menengah.
2. Pembersihan lapisan semi-konduktor isolasi tanpa menimbulkan goresan mikro pada bahan insulasi XLPE cross-linked polyethylene.
3. Aplikasi tabung stress control cold-shrink / heat-shrink tepat pada batas potong semi-kon.
4. Pengepresan sepatu kabel (cable lug) bimetal menggunakan hydraulic crimping tool dengan tekanan torsi minimal 12 ton.
5. Pengujian integritas isolasi setelah penyambungan: Uji tegangan tinggi VLF (Very Low Frequency) 0.1 Hz tegangan 3U0 selama 15 menit.`
  }
];

export const INITIAL_REVISIONS_DUMMY: DocumentRevisionHistory[] = [
  {
    id: 'rev-01',
    document_id: 'doc-01',
    document_title: 'P&ID_RevA_Sistem_Pendingin_Chiller.pdf',
    revision: 'Rev A',
    change_summary: 'Penyesuaian ukuran diameter pipa suplai evaporator dari DN 150 menjadi DN 200 dan penambahan sensor ultrasonik.',
    changed_by: 'Dr. Eng. Suryo Prasetyo',
    status: 'Approved',
    created_at: '2026-05-10 14:32'
  },
  {
    id: 'rev-02',
    document_id: 'doc-02',
    document_title: 'Single_Line_Diagram_Gardu_Induk_150kV_Weleri.dwg',
    revision: 'Rev C',
    change_summary: 'Revisi koordinasi setting relay diferensial trafo dan penambahan bay penghantar Batang 2.',
    changed_by: 'Ir. Hendra Gunawan',
    status: 'Approved',
    created_at: '2026-05-08 10:15'
  },
  {
    id: 'rev-03',
    document_id: 'doc-03',
    document_title: 'Spesifikasi_Teknis_Panel_Switchgear_20kV_Medium_Voltage.pdf',
    revision: 'Rev B',
    change_summary: 'Pembaruan klausul sertifikasi uji ketahanan busbar arc fault IAC AFLR 25kA 1s sesuai permintaan PLN.',
    changed_by: 'Bambang Sutrisno, ST',
    status: 'Under Review',
    created_at: '2026-05-12 16:45'
  },
  {
    id: 'rev-04',
    document_id: 'doc-04',
    document_title: 'Kalkulasi_Struktur_Pondasi_Trafo_Tenaga_60MVA.xlsx',
    revision: 'Rev A',
    change_summary: 'Penambahan daya dukung tiang spun pile akibat pembaruan berat total trafo 60 MVA dari pabrikan Trafindo.',
    changed_by: 'Ir. Ahmad Fadillah',
    status: 'Approved',
    created_at: '2026-04-25 09:20'
  }
];

export const INITIAL_DRAWINGS_DUMMY: TechnicalDrawingItem[] = [
  {
    id: 'drw-01',
    drawing_number: 'DWG-EL-WLR-001',
    title: 'Tata Letak Peralatan Switchyard 150 kV Gardu Induk Weleri',
    discipline: 'Elektrikal',
    revision: 'Rev C',
    status: 'Disetujui',
    updated_at: '2026-05-08',
    author: 'Ir. Hendra Gunawan',
    file_size: '14.2 MB',
    thumbnail_url: '/assets/drawings/dwg_electrical_150kv.svg',
    tags: ['Switchyard', '150 kV', 'High Voltage', 'Layout']
  },
  {
    id: 'drw-02',
    drawing_number: 'DWG-ME-HVAC-042',
    title: 'Denah Rute Ducting dan Diffuser Cleanroom Ruang Bedah Lantai 3',
    discipline: 'Mekanikal & HVAC',
    revision: 'Rev A',
    status: 'Disetujui',
    updated_at: '2026-05-10',
    author: 'Dr. Eng. Suryo Prasetyo',
    file_size: '8.6 MB',
    thumbnail_url: '/assets/drawings/dwg_hvac_ducting.svg',
    tags: ['HVAC', 'Ducting', 'Cleanroom', 'Hospital']
  },
  {
    id: 'drw-03',
    drawing_number: 'DWG-CV-TRF-015',
    title: 'Detail Penulangan Pondasi Raft Pile & Oil Catcher Basin Trafo 60 MVA',
    discipline: 'Sipil',
    revision: 'Rev B',
    status: 'Review',
    updated_at: '2026-05-11',
    author: 'Ir. Ahmad Fadillah',
    file_size: '11.4 MB',
    thumbnail_url: '/assets/drawings/dwg_civil_foundation.svg',
    tags: ['Pondasi', 'Beton Bertulang', 'Trafo', 'Civil']
  },
  {
    id: 'drw-04',
    drawing_number: 'DWG-IN-SCD-008',
    title: 'Skema Pengawatan Wiring Diagram Interkoneksi RTU SCADA & BCU',
    discipline: 'Instrumentasi',
    revision: 'Rev A',
    status: 'Draf',
    updated_at: '2026-05-04',
    author: 'Dian Permana, MT',
    file_size: '6.2 MB',
    thumbnail_url: '/assets/drawings/dwg_instrument_scada.svg',
    tags: ['Wiring', 'SCADA', 'RTU', 'Protection']
  },
  {
    id: 'drw-05',
    drawing_number: 'DWG-PR-WWTP-021',
    title: 'P&ID Diagram Alir Pengolahan Air Limbah Industri Tekstil Sentral',
    discipline: 'Proses',
    revision: 'Rev A',
    status: 'Disetujui',
    updated_at: '2026-05-06',
    author: 'Ratna Kusuma, S.Si, M.Si',
    file_size: '9.8 MB',
    thumbnail_url: '/assets/drawings/dwg_process_pid.svg',
    tags: ['P&ID', 'Proses', 'IPAL', 'Aerasi']
  },
  {
    id: 'drw-06',
    drawing_number: 'DWG-EL-SWG-012',
    title: 'Tata Letak Kubikel Panel Switchgear 20 kV Ruang Kontrol Utama',
    discipline: 'Elektrikal',
    revision: 'Rev B',
    status: 'Review',
    updated_at: '2026-05-12',
    author: 'Bambang Sutrisno, ST',
    file_size: '10.5 MB',
    thumbnail_url: '/assets/drawings/dwg_switchgear_20kv.svg',
    tags: ['Switchgear', '20 kV', 'Panel', 'Medium Voltage']
  }
];

export const INITIAL_KNOWLEDGE_DUMMY: KnowledgeBaseItem[] = [
  {
    id: 'kb-01',
    title: 'Standar Konstruksi Gardu Induk PLN (Buku 4 Standar Nasional)',
    discipline: 'Elektrikal',
    category: 'Standard Engineering',
    summary: 'Pedoman resmi PLN untuk jarak bebas elektrik (clearance), tata letak gantry, grounding mesh, dan proteksi petir gardu induk tegangan tinggi.',
    content: `STANDAR DESAIN ELEKTRIKAL GARDU INDUK 150 KV:
1. Jarak bebas fase-ke-fase di udara minimal 1.500 mm, jarak fase-ke-tanah 1.450 mm.
2. Tinggi konduktor terendah terhadap permukaan tanah area kerja switchyard minimal 4.300 mm.
3. Nilai tahanan pembumian (grounding grid mesh) harus lebih kecil dari 1.0 Ohm diukur pada musim kemarau.
4. Kawat tanah pelindung petir (groundwire) memiliki sudut proteksi perlindungan maksimal 30 derajat terhadap konduktor luar.`,
    tags: ['PLN', 'Gardu Induk', 'Clearance', 'Grounding'],
    file_size: '18.5 MB',
    author: 'PLN Engineering Lead',
    updated_at: '2026-04-12'
  },
  {
    id: 'kb-02',
    title: 'Pedoman Desain HVAC Cleanroom Rumah Sakit (ASHRAE Standard 170)',
    discipline: 'Mekanikal & HVAC',
    category: 'Design Manual',
    summary: 'Rekomendasi pertukaran udara per jam (ACH), tekanan positif ruangan bedah, dan filtrasi HEPA filter 99.99% untuk fasilitas kesehatan.',
    content: `PEDOMAN TEKNIS CLEANROOM RUANG OPERASI:
- Tekanan udara ruang operasi harus positif relatif terhadap koridor (+15 Pa).
- Air changes per hour (ACH) minimal 20 kali pertukaran udara per jam, dengan minimal 4 kali pasokan udara luar segar.
- Filtrasi wajib 3 tingkat: Pre-filter MERV 8, Secondary MERV 14, dan Terminal HEPA H14 (efisiensi 99.995% pada partikel 0.3 mikron).
- Rentang temperatur operasi dipertahankan pada 20°C - 24°C dengan kelembaban relatif 50% - 60%.`,
    tags: ['Cleanroom', 'ASHRAE 170', 'HEPA', 'Hospital'],
    file_size: '12.1 MB',
    author: 'ASHRAE Technical Committee',
    updated_at: '2026-03-28'
  },
  {
    id: 'kb-03',
    title: 'Manual Panduan Uji Dielektrik Minyak Trafo & Analisis DGA (IEC 60599)',
    discipline: 'Elektrikal',
    category: 'SOP & Safety',
    summary: 'Interpretasi konsentrasi gas terlarut hidrogen, metana, etilen, dan asetilen menggunakan rasio Roger dan segitiga Duval.',
    content: `METODE EVALUASI KESEHATAN MINYAK ISOLASI TRAFO:
- Nilai tegangan tembus (breakdown voltage) minyak baru minimal 60 kV / 2.5 mm sesuai IEC 60156.
- Gas Asetilen (C2H2) > 2 ppm mengindikasikan terjadi pelepasan busur api berenergi tinggi (high energy arcing).
- Gas Hidrogen (H2) tinggi tanpa hidrokarbon mengindikasikan lucutan sebagian (partial discharge / korona).
- Nilai kandungan air (moisture content) dalam minyak diupayakan di bawah 15 ppm pada suhu operasi 60°C.`,
    tags: ['DGA', 'Transformer', 'IEC 60599', 'Oil Testing'],
    file_size: '9.4 MB',
    author: 'High Voltage Specialist Group',
    updated_at: '2026-04-30'
  }
];

