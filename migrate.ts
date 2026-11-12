import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function migrate() {
  console.log('🚀 Memulai proses inisialisasi & migrasi database GLACE ke MySQL 8.0...');

  // 1. Buat koneksi awal untuk memastikan database glace_db ada
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  console.log('✅ Terhubung ke MySQL Server.');

  // 2. Buat database glace_db jika belum ada
  const dbName = process.env.DB_NAME || 'glace_db';
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  console.log(`✅ Database \`${dbName}\` terverifikasi.`);

  await connection.changeUser({ database: dbName });

  // 3. Jalankan schema.sql untuk membuat seluruh tabel
  const schemaPath = path.join(process.cwd(), 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  await connection.query(schemaSql);
  console.log('✅ Seluruh tabel di schema.sql berhasil dibuat/diverifikasi.');

  // 4. Migrasikan data lama dari trials_database.json ke tabel trials MySQL
  const jsonPath = path.join(process.cwd(), 'trials_database.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const rawData = fs.readFileSync(jsonPath, 'utf-8');
      const parsed = JSON.parse(rawData);
      const trials = parsed.trials || [];

      console.log(`📦 Memigrasikan ${trials.length} data sesi Free Trial dari JSON ke MySQL...`);
      for (const t of trials) {
        const startedAt = new Date(t.trialStartedAt);
        const expiresAt = new Date(t.trialExpiresAt);

        await connection.query(
          `INSERT INTO trials (id, fingerprint, email, name, role, trial_started_at, trial_expires_at, duration_ms, is_expired)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
             email = VALUES(email),
             name = VALUES(name),
             trial_started_at = VALUES(trial_started_at),
             trial_expires_at = VALUES(trial_expires_at),
             is_expired = VALUES(is_expired)`,
          [
            t.id,
            t.fingerprint,
            t.email,
            t.name,
            t.role || 'Free Trial',
            startedAt,
            expiresAt,
            t.durationMs || 259200000,
            t.isExpired ? 1 : 0,
          ]
        );
      }
      console.log('✅ Migrasi data Free Trial ke tabel `trials` berhasil 100%.');
    } catch (e) {
      console.error('⚠️ Gagal membaca data JSON lama:', e);
    }
  }

  // 5. Inisialisasi data bawaan untuk wbs_tasks jika masih kosong
  const [taskCount]: any = await connection.query('SELECT COUNT(*) as cnt FROM wbs_tasks');
  if (taskCount[0].cnt === 0) {
    console.log('🌱 Mengisi data awal WBS tasks...');
    await connection.query(`
      INSERT INTO wbs_tasks (id, wbs_code, title, cpm, cost, progress, risk, status) VALUES
      ('wbs_1', 'WBS-1.1', 'Site Survey & Soil Investigation (PLN Solar)', 'Critical', '$12,400', 100, 'Low', 'Completed'),
      ('wbs_2', 'WBS-1.2', 'Civil Foundation & PV Mounting Structural Plan', 'Critical', '$45,000', 85, 'Medium', 'In Progress'),
      ('wbs_3', 'WBS-1.3', 'Inverter & Step-Up Transformer Procurement', 'Non-Critical', '$120,000', 60, 'High', 'In Progress'),
      ('wbs_4', 'WBS-1.4', 'Grid Interconnection & Relay Protection Testing', 'Critical', '$30,500', 20, 'Medium', 'Pending')
    `);
  }

  // 6. Inisialisasi data bawaan untuk activities jika masih kosong
  const [actCount]: any = await connection.query('SELECT COUNT(*) as cnt FROM activities');
  if (actCount[0].cnt === 0) {
    console.log('🌱 Mengisi data awal Recent Activities...');
    await connection.query(`
      INSERT INTO activities (id, activity, module, status, icon_type) VALUES
      ('act_1', 'WBS updated for Project PLN Solar', 'Project Intelligence', 'Success', 'wbs'),
      ('act_2', 'New document uploaded: P&ID_RevA.pdf', 'Document Intelligence', 'Success', 'document'),
      ('act_3', 'Added new asset: Transformer #TR-001', 'Asset Intelligence', 'Success', 'asset'),
      ('act_4', 'Created RFQ for electrical equipment', 'Glace Commerce', 'Pending', 'rfq'),
      ('act_5', 'Completed PLC course module 1', 'Glace Academy', 'Success', 'academy')
    `);
  }

  await connection.end();
  console.log('🎉 SELURUH PROSES MIGRASI KE MYSQL SELESAI DENGAN SUKSES!');
}

migrate().catch(err => {
  console.error('❌ Terjadi kesalahan saat migrasi:', err);
  process.exit(1);
});

