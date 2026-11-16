import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

async function setupDrawingTables() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'glace_db',
  });

  console.log('🔗 Terhubung ke MySQL...');

  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawing_projects (
      id VARCHAR(64) PRIMARY KEY,
      user_email VARCHAR(191) NOT NULL,
      name VARCHAR(191) NOT NULL,
      team VARCHAR(191) DEFAULT 'Tim Engineering',
      description TEXT,
      status ENUM('Berjalan', 'Selesai', 'Perencanaan') DEFAULT 'Berjalan',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_dp_user (user_email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS drawings (
      id VARCHAR(64) PRIMARY KEY,
      project_id VARCHAR(64) NOT NULL,
      user_email VARCHAR(191) NOT NULL,
      title VARCHAR(191) NOT NULL,
      discipline VARCHAR(100) DEFAULT 'Sipil',
      revision VARCHAR(32) DEFAULT 'Rev A',
      status ENUM('Disetujui', 'Review', 'Draf') DEFAULT 'Draf',
      thumbnail TEXT,
      elements_json LONGTEXT,
      layers_json LONGTEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_draw_project (project_id),
      INDEX idx_draw_user (user_email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('✅ Tabel drawing_projects dan drawings berhasil dibuat/diverifikasi.');

  // Isi data awal (seed) jika belum ada
  const [projCount]: any = await conn.query('SELECT COUNT(*) as cnt FROM drawing_projects');
  if (projCount[0].cnt === 0) {
    console.log('🌱 Mengisi sample project...');
    await conn.query(`
      INSERT INTO drawing_projects (id, user_email, name, team, description, status) VALUES
      ('proj_1', 'all', 'Pembangunan Gedung Rektorat UNS Caruban', 'Tim Sipil & MEP', 'Proyek perancangan struktural dan mekanikal gedung kampus caruban', 'Berjalan'),
      ('proj_2', 'all', 'Substation Transmisi Listrik 150kV Madiun', 'Tim Elektrikal & Proteksi', 'Perancangan single line diagram dan proteksi gardu induk', 'Selesai'),
      ('proj_3', 'all', 'Sistem Tata Udara & HVAC Laboratorium Terpadu', 'Tim HVAC & Mekanikal', 'Desain ducting dan perhitungan cooling load lab farmasi', 'Perencanaan')
    `);
  }

  const [drawCount]: any = await conn.query('SELECT COUNT(*) as cnt FROM drawings');
  if (drawCount[0].cnt === 0) {
    console.log('🌱 Mengisi sample drawings sesuai referensi...');
    await conn.query(`
      INSERT INTO drawings (id, project_id, user_email, title, discipline, revision, status) VALUES
      ('draw_1', 'proj_1', 'all', 'Denah Lantai 1', 'Sipil', 'Rev B', 'Disetujui'),
      ('draw_2', 'proj_1', 'all', 'Rangka Mesin A', 'Mekanikal', 'Rev A', 'Review'),
      ('draw_3', 'proj_2', 'all', 'Panel Distribusi', 'Listrik', 'Rev A', 'Draf'),
      ('draw_4', 'proj_2', 'all', 'P&ID Unit 2', 'Proses', 'Rev C', 'Disetujui')
    `);
  }

  await conn.end();
  console.log('🎉 Setup database drawing selesai!');
}

setupDrawingTables().catch(console.error);

