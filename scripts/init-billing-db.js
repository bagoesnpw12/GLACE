const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'glace_db'
  });

  console.log('Connected to MySQL database.');

  // 1. Organizations table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS organizations (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      legal_name VARCHAR(191) NOT NULL,
      tax_id VARCHAR(64) DEFAULT NULL,
      billing_email VARCHAR(191) DEFAULT NULL,
      billing_address TEXT DEFAULT NULL,
      faktur_pajak_required TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 2. Subscriptions table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id VARCHAR(64) PRIMARY KEY,
      org_id VARCHAR(64) NOT NULL,
      plan_name VARCHAR(64) NOT NULL,
      tier_code VARCHAR(32) NOT NULL,
      status ENUM('active', 'past_due', 'canceled', 'trial') DEFAULT 'active',
      seats_total INT NOT NULL DEFAULT 250,
      seats_used INT NOT NULL DEFAULT 182,
      billing_cycle ENUM('monthly', 'annual') DEFAULT 'annual',
      renewal_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_org (org_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Payment Methods table (masked details only, no raw sensitive numbers)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS payment_methods (
      id VARCHAR(64) PRIMARY KEY,
      org_id VARCHAR(64) NOT NULL,
      provider VARCHAR(64) NOT NULL,
      method_type VARCHAR(64) NOT NULL,
      masked_account VARCHAR(32) NOT NULL,
      is_default TINYINT(1) DEFAULT 1,
      status VARCHAR(32) DEFAULT 'verified',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_org (org_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 4. Invoices table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id VARCHAR(64) PRIMARY KEY,
      org_id VARCHAR(64) NOT NULL,
      invoice_no VARCHAR(64) NOT NULL UNIQUE,
      invoice_date DATE NOT NULL,
      description TEXT NOT NULL,
      subtotal DECIMAL(15,2) NOT NULL,
      tax_amount DECIMAL(15,2) NOT NULL,
      total_amount DECIMAL(15,2) NOT NULL,
      status ENUM('paid', 'pending', 'canceled') DEFAULT 'paid',
      payment_method_summary VARCHAR(128) NOT NULL,
      pdf_url VARCHAR(255) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_org (org_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 5. Billing Audit Logs table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS billing_audit_logs (
      id VARCHAR(64) PRIMARY KEY,
      org_id VARCHAR(64) NOT NULL,
      user_id VARCHAR(64) NOT NULL,
      user_email VARCHAR(191) NOT NULL,
      action VARCHAR(128) NOT NULL,
      details TEXT DEFAULT NULL,
      ip_address VARCHAR(45) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_org (org_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Seed default organization if empty
  const [orgs] = await conn.query('SELECT COUNT(*) as cnt FROM organizations');
  if (orgs[0].cnt === 0) {
    await conn.query(`
      INSERT INTO organizations (id, name, legal_name, tax_id, billing_email, billing_address, faktur_pajak_required)
      VALUES (
        'org_glace_corp',
        'PT Global Digital Nusantara Tbk',
        'PT Global Digital Nusantara Tbk',
        '01.345.678.9-012.000',
        'finance@perusahaan.co.id',
        'Gedung Cyber 2 Lt. 18, Jl. HR Rasuna Said Blok X-5, Jakarta Selatan 12950',
        1
      )
    `);

    await conn.query(`
      INSERT INTO subscriptions (id, org_id, plan_name, tier_code, status, seats_total, seats_used, billing_cycle, renewal_date)
      VALUES (
        'sub_enterprise_01',
        'org_glace_corp',
        'Platinum Enterprise Tier',
        'platinum_enterprise',
        'active',
        250,
        182,
        'annual',
        '2027-11-01'
      )
    `);

    await conn.query(`
      INSERT INTO payment_methods (id, org_id, provider, method_type, masked_account, is_default, status)
      VALUES (
        'pay_bca_01',
        'org_glace_corp',
        'BCA',
        'BCA Corporate Virtual Account',
        '**** **** **** 8821',
        1,
        'verified'
      )
    `);

    await conn.query(`
      INSERT INTO invoices (id, org_id, invoice_no, invoice_date, description, subtotal, tax_amount, total_amount, status, payment_method_summary)
      VALUES
        ('inv_01', 'org_glace_corp', 'INV/2026/GLC-1092', '2026-11-01', 'Langganan Enterprise Solutions — Tahunan (250 Lisensi Kursi)', 144000000.00, 15840000.00, 159840000.00, 'paid', 'BCA Virtual Account ****8821'),
        ('inv_02', 'org_glace_corp', 'INV/2026/GLC-0842', '2025-11-01', 'Langganan Enterprise Solutions — Tahunan (150 Lisensi Kursi)', 96000000.00, 10560000.00, 106560000.00, 'paid', 'Transfer Bank Mandiri'),
        ('inv_03', 'org_glace_corp', 'INV/2025/GLC-0419', '2025-05-15', 'Paket Tambahan Token Komputasi AI Industri (500M Tokens)', 25000000.00, 2750000.00, 27750000.00, 'paid', 'BCA Virtual Account ****8821')
    `);
  }

  // Ensure default user is linked to org_glace_corp
  await conn.query("UPDATE users SET workspace_id = 'org_glace_corp' WHERE workspace_id IS NULL");

  console.log('Database schema and seed data for billing ready.');
  await conn.end();
}

run().catch(console.error);
