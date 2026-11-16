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

  console.log('Connected to MySQL. Creating new Co Engineer feature tables...');

  // 1. Engineering Intelligence Findings table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS engineering_findings (
      id VARCHAR(64) PRIMARY KEY,
      drawing_id VARCHAR(64),
      title VARCHAR(255) NOT NULL,
      drawing_name VARCHAR(255) NOT NULL,
      category ENUM('Material', 'Dimensi', 'Standar', 'Anotasi') NOT NULL,
      severity ENUM('Tinggi', 'Sedang', 'Rendah') NOT NULL,
      status VARCHAR(32) DEFAULT 'Terbuka',
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 2. Drawing Types table (Mekanikal, Sipil, Listrik, Proses, etc.)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawing_types (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      description TEXT,
      default_paper VARCHAR(32) NOT NULL DEFAULT 'A1',
      template_name VARCHAR(128) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 3. Drawing Comparisons table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawing_comparisons (
      id VARCHAR(64) PRIMARY KEY,
      drawing_id_a VARCHAR(64) NOT NULL,
      drawing_id_b VARCHAR(64) NOT NULL,
      changes_json JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Drawing Control / Workflow Revisions History table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawing_control_history (
      id VARCHAR(64) PRIMARY KEY,
      drawing_id VARCHAR(64) NOT NULL,
      drawing_number VARCHAR(64) NOT NULL,
      drawing_name VARCHAR(255) NOT NULL,
      revision VARCHAR(32) NOT NULL,
      reviewer VARCHAR(128) NOT NULL,
      review_date DATE NOT NULL,
      status ENUM('Draf', 'Review', 'Disetujui', 'Terbit') NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 5. Drawing File Transfers (Import & Export logs)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawing_transfers (
      id VARCHAR(64) PRIMARY KEY,
      type ENUM('import', 'export') NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      format VARCHAR(32) NOT NULL,
      drawing_id VARCHAR(64),
      time_label VARCHAR(64),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed default drawing types if empty
  const [types]: any = await conn.query('SELECT COUNT(*) as count FROM drawing_types');
  if (types[0].count === 0) {
    await conn.query(`
      INSERT INTO drawing_types (id, name, description, default_paper, template_name) VALUES
      ('type_1', 'Mekanikal', 'Komponen, rangka, dan perakitan', 'A1', 'Template ASME Y14.5'),
      ('type_2', 'Sipil', 'Denah, potongan, dan detail struktur', 'A1', 'Template SNI Bangunan Gedung'),
      ('type_3', 'Listrik', 'Panel, wiring, dan diagram kontrol', 'A3', 'Template IEC 60617 SLD'),
      ('type_4', 'Proses', 'P&ID dan tata letak pipa', 'A2', 'Template ISA-5.1 Piping & Instrumentation')
    `);
    console.log('Seeded default drawing types.');
  }

  // Seed default engineering findings if empty
  const [findings]: any = await conn.query('SELECT COUNT(*) as count FROM engineering_findings');
  if (findings[0].count === 0) {
    await conn.query(`
      INSERT INTO engineering_findings (id, drawing_id, title, drawing_name, category, severity, details) VALUES
      ('find_1', 'draw_1', 'Toleransi lubang baut kolom melampaui batas SNI', 'Denah Lantai 1', 'Dimensi', 'Tinggi', 'Perbedaan 1.8mm terdeteksi pada as C-4 vs toleransi maksimum 1.5mm'),
      ('find_2', 'draw_2', 'Spesifikasi baja profil WF belum mencantumkan mutu SS400', 'Rangka Mesin A', 'Material', 'Sedang', 'Perlu konfirmasi sertifikat material mill certificate'),
      ('find_3', 'draw_4', 'Simbol valve relief belum sesuai standar ISA-5.1', 'P&ID Unit 2', 'Standar', 'Sedang', 'Gunakan simbol PSV dengan tag number terstandarisasi'),
      ('find_4', 'draw_3', 'Ketinggian teks anotasi sirkuit cabang kurang terbaca pada skala 1:50', 'Panel Distribusi', 'Anotasi', 'Rendah', 'Ukuran font minimum 2.5mm disarankan untuk cetak A3')
    `);
    console.log('Seeded default engineering findings.');
  }

  // Seed default drawing control history if empty
  const [history]: any = await conn.query('SELECT COUNT(*) as count FROM drawing_control_history');
  if (history[0].count === 0) {
    await conn.query(`
      INSERT INTO drawing_control_history (id, drawing_id, drawing_number, drawing_name, revision, reviewer, review_date, status, notes) VALUES
      ('ctrl_1', 'draw_1', 'DWG-CIP-001', 'Denah Lantai 1', 'Rev B', 'Ir. Hendra (Lead Structural)', '2026-11-10', 'Disetujui', 'Lolos verifikasi perhitungan struktur dan beban geser'),
      ('ctrl_2', 'draw_2', 'DWG-MEC-014', 'Rangka Mesin A', 'Rev A', 'Bambang S. (Senior Mechanical)', '2026-11-11', 'Review', 'Menunggu hasil kalkulasi torsi motor penggerak'),
      ('ctrl_3', 'draw_3', 'DWG-ELE-008', 'Panel Distribusi', 'Rev A', 'Ahmad F. (Electrical Engineer)', '2026-11-12', 'Draf', 'Draf awal pengelompokan beban fase R-S-T'),
      ('ctrl_4', 'draw_4', 'DWG-PRC-003', 'P&ID Unit 2', 'Rev C', 'Dr. Suryo (Process Specialist)', '2026-11-08', 'Disetujui', 'Persetujuan integrasi sistem pendingin sekunder'),
      ('ctrl_5', 'draw_5', 'DWG-PIP-005', 'Tata Letak Pipa', 'Rev A', 'Agus K. (Piping Lead)', '2026-11-12', 'Review', 'Pengecekan slope pipa kondensat')
    `);
    console.log('Seeded default drawing control history.');
  }

  // Seed transfer logs if empty
  const [transfers]: any = await conn.query('SELECT COUNT(*) as count FROM drawing_transfers');
  if (transfers[0].count === 0) {
    await conn.query(`
      INSERT INTO drawing_transfers (id, type, file_name, format, time_label) VALUES
      ('trf_1', 'import', 'denah_lantai_1.dwg', 'DWG', '10:46 AM'),
      ('trf_2', 'import', 'rangka_mesin.pdf', 'PDF', '10:42 AM')
    `);
    console.log('Seeded transfer logs.');
  }

  await conn.end();
  console.log('Setup finished successfully!');
}

setup().catch(console.error);

