import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function setup() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'glace_db'
  });

  console.log('Connected to MySQL. Setting up Project Intelligence tables...');

  // 1. Projects Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_projects (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      progress INT NOT NULL DEFAULT 0,
      budget VARCHAR(64) NOT NULL DEFAULT '$0',
      actual_cost VARCHAR(64) NOT NULL DEFAULT '$0',
      status ENUM('In Progress', 'Completed', 'Planning', 'Delayed') NOT NULL DEFAULT 'In Progress',
      start_date DATE,
      end_date DATE,
      manager VARCHAR(128),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 2. Project Control (Milestones & Budget EVM tracking)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_project_control (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64) NOT NULL,
      milestone_name VARCHAR(255) NOT NULL,
      planned_value VARCHAR(64) NOT NULL,
      earned_value VARCHAR(64) NOT NULL,
      actual_cost VARCHAR(64) NOT NULL,
      cpi DECIMAL(5,2) DEFAULT 1.00,
      spi DECIMAL(5,2) DEFAULT 1.00,
      variance_cost VARCHAR(64) DEFAULT '$0',
      status VARCHAR(32) DEFAULT 'On Track',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 3. Tasks & Issues Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_tasks_issues (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64) NOT NULL,
      title VARCHAR(255) NOT NULL,
      type ENUM('Task', 'Issue') NOT NULL DEFAULT 'Task',
      priority ENUM('High', 'Medium', 'Low') NOT NULL DEFAULT 'Medium',
      assignee VARCHAR(128) NOT NULL,
      due_date DATE,
      status ENUM('To Do', 'In Progress', 'Resolved', 'Closed') NOT NULL DEFAULT 'To Do',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. RFI & Submittals Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_rfi_submittals (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64) NOT NULL,
      rfi_number VARCHAR(64) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      type ENUM('RFI', 'Submittal') NOT NULL DEFAULT 'RFI',
      from_party VARCHAR(128) NOT NULL,
      assigned_to VARCHAR(128) NOT NULL,
      date_submitted DATE NOT NULL,
      status ENUM('Draft', 'Open', 'Under Review', 'Approved', 'Rejected') NOT NULL DEFAULT 'Open',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 5. AI Insights Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_ai_insights (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64),
      category VARCHAR(64) NOT NULL,
      insight_text TEXT NOT NULL,
      impact ENUM('Critical', 'Warning', 'Positive') NOT NULL DEFAULT 'Warning',
      recommendation TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 6. Reports Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pi_reports (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64),
      title VARCHAR(255) NOT NULL,
      period VARCHAR(64) NOT NULL,
      generated_by VARCHAR(128) NOT NULL,
      file_size VARCHAR(32) DEFAULT '2.4 MB',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed Projects if empty
  const [pCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_projects');
  if (pCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_projects (id, name, progress, budget, actual_cost, status, start_date, end_date, manager) VALUES
      ('proj-01', 'Proyek PLTS Cirata Phase 2', 65, '$633,400', '$576,950', 'In Progress', '2026-01-15', '2026-08-30', 'Ir. Hendra Gunawan'),
      ('proj-02', 'Substation 150kV Transmisi Listrik Madiun', 92, '$420,000', '$405,200', 'In Progress', '2026-02-01', '2026-06-15', 'Bambang Sutrisno, ST'),
      ('proj-03', 'Gedung Rektorat UNS Caruban Kampus Terpadu', 40, '$890,000', '$380,000', 'Planning', '2026-03-10', '2026-12-20', 'Ahmad Fadillah, MT'),
      ('proj-04', 'Sistem Tata Udara & Cleanroom HVAC Bio-Lab', 100, '$150,000', '$148,500', 'Completed', '2026-01-05', '2026-04-10', 'Dr. Suryo Prasetyo'),
      ('proj-05', 'Piping & Instrumentasi Unit Pengolahan Limbah', 25, '$310,000', '$115,000', 'Delayed', '2026-02-20', '2026-09-15', 'Agus Kurniawan, ST')
    `);
    console.log('Seeded pi_projects.');
  }

  // Seed Project Control if empty
  const [ctrlCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_project_control');
  if (ctrlCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_project_control (id, project_id, milestone_name, planned_value, earned_value, actual_cost, cpi, spi, variance_cost, status) VALUES
      ('ctrl-1', 'proj-01', 'Pekerjaan Pondasi & Grounding PV Module', '$180,000', '$180,000', '$175,000', 1.03, 1.00, '+$5,000', 'Ahead of Budget'),
      ('ctrl-2', 'proj-01', 'Pemasangan Inverter & Step-Up Transformer', '$250,000', '$230,000', '$240,000', 0.96, 0.92, '-$10,000', 'Cost Variance'),
      ('ctrl-3', 'proj-02', 'Pengujian Relay Proteksi & SCADA RTU', '$120,000', '$120,000', '$118,000', 1.02, 1.00, '+$2,000', 'On Track')
    `);
    console.log('Seeded pi_project_control.');
  }

  // Seed Tasks & Issues
  const [tCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_tasks_issues');
  if (tCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_tasks_issues (id, project_id, title, type, priority, assignee, due_date, status) VALUES
      ('ti-1', 'proj-01', 'Pemeriksaan torsi baut mounting solar panel 1500 Vdc', 'Task', 'High', 'Tim Mekanikal Lapangan', '2026-05-20', 'In Progress'),
      ('ti-2', 'proj-01', 'Keterlambatan pengiriman kabel XLPE 20kV dari vendor', 'Issue', 'High', 'Logistik & Procurement', '2026-05-18', 'To Do'),
      ('ti-3', 'proj-02', 'Kalibrasi CT/PT bay transmisi 150kV sebelum energize', 'Task', 'Medium', 'Tim Proteksi Listrik', '2026-05-25', 'Resolved'),
      ('ti-4', 'proj-03', 'Uji kuat tekan beton silinder 28 hari kolom K-1', 'Task', 'High', 'Quality Control Sipil', '2026-05-30', 'To Do')
    `);
    console.log('Seeded pi_tasks_issues.');
  }

  // Seed RFI & Submittals
  const [rfiCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_rfi_submittals');
  if (rfiCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_rfi_submittals (id, project_id, rfi_number, subject, type, from_party, assigned_to, date_submitted, status) VALUES
      ('rfi-1', 'proj-01', 'RFI-PLTS-004', 'Klarifikasi elevasi kabel trench crossing saluran drainase', 'RFI', 'Kontraktor Utama (PT Adhi)', 'Konsultan MK (PT Virama)', '2026-05-10', 'Under Review'),
      ('rfi-2', 'proj-01', 'SUB-PLTS-012', 'Material Submittal Inverter Central 2.5MW Sungrow', 'Submittal', 'Vendor Supplier', 'Lead Electrical Glace', '2026-05-08', 'Approved'),
      ('rfi-3', 'proj-02', 'RFI-TR-009', 'Perubahan layout jalur kabel kontrol grounding GIS', 'RFI', 'Site Manager PLN', 'Engineering Lead', '2026-05-11', 'Open')
    `);
    console.log('Seeded pi_rfi_submittals.');
  }

  // Seed AI Insights
  const [aiCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_ai_insights');
  if (aiCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_ai_insights (id, project_id, category, insight_text, impact, recommendation) VALUES
      ('ai-1', 'proj-01', 'Schedule Risk', 'Pemasangan kabel XLPE berpotensi menunda energize substation hingga 12 hari kerja jika tidak dialihkan ke vendor sekunder.', 'Critical', 'Segera ajukan PO darurat ke supplier lokal yang memiliki stok ready di Surabaya.'),
      ('ai-2', 'proj-01', 'Budget Optimization', 'Penghematan 4.2% tercapai pada volume galian tanah berkat optimasi elevasi kontur 3D CAD.', 'Positive', 'Terapkan metode perhitungan cut & fill yang sama pada proyek Caruban.'),
      ('ai-3', 'proj-02', 'Resource Load', 'Beban kerja tim komisioning proteksi mencapai 120% kapasitas pada minggu ke-3 Mei.', 'Warning', 'Tambahkan 2 teknisi bersertifikat AK3 Listrik untuk rotasi shift testing.')
    `);
    console.log('Seeded pi_ai_insights.');
  }

  // Seed Reports
  const [repCount]: any = await conn.query('SELECT COUNT(*) as count FROM pi_reports');
  if (repCount[0].count === 0) {
    await conn.query(`
      INSERT INTO pi_reports (id, project_id, title, period, generated_by, file_size) VALUES
      ('rep-1', 'proj-01', 'Laporan Progres Bulanan Proyek PLTS Cirata', 'April 2026', 'System Auto-Generated', '3.8 MB'),
      ('rep-2', 'proj-01', 'Laporan Analisis Nilai Hasil (EVM) & S-Curve', 'Q1 2026', 'Project Controls Team', '1.9 MB'),
      ('rep-3', 'proj-02', 'Audit Kepatuhan K3 & Lingkungan Lapangan', 'Mei 2026', 'HSE Department', '4.2 MB')
    `);
    console.log('Seeded pi_reports.');
  }

  await conn.end();
  console.log('Project Intelligence setup completed successfully!');
}

setup().catch(console.error);

