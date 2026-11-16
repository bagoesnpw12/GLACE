import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'glace_db'
    });

    const [cols]: any = await conn.query('SHOW COLUMNS FROM documents');
    const colNames = cols.map((c: any) => c.Field);
    
    if (!colNames.includes('doc_type')) {
      await conn.query("ALTER TABLE documents ADD COLUMN doc_type VARCHAR(64) DEFAULT 'PDF'");
    }
    if (!colNames.includes('category')) {
      await conn.query("ALTER TABLE documents ADD COLUMN category VARCHAR(100) DEFAULT 'Technical Specification'");
    }
    if (!colNames.includes('status')) {
      await conn.query("ALTER TABLE documents ADD COLUMN status VARCHAR(64) DEFAULT 'Approved'");
    }
    if (!colNames.includes('author')) {
      await conn.query("ALTER TABLE documents ADD COLUMN author VARCHAR(100) DEFAULT 'Lead Engineer'");
    }
    if (!colNames.includes('content_text')) {
      await conn.query("ALTER TABLE documents ADD COLUMN content_text LONGTEXT");
    }
    if (!colNames.includes('file_path')) {
      await conn.query("ALTER TABLE documents ADD COLUMN file_path VARCHAR(255)");
    }

    await conn.query(`
      CREATE TABLE IF NOT EXISTS document_revisions (
        id VARCHAR(64) PRIMARY KEY,
        document_id VARCHAR(64) NOT NULL,
        revision VARCHAR(32) NOT NULL,
        change_summary TEXT,
        changed_by VARCHAR(100) NOT NULL,
        status VARCHAR(64) DEFAULT 'Approved',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        discipline VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        summary TEXT,
        content LONGTEXT,
        tags VARCHAR(255),
        file_size VARCHAR(32),
        author VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('MIGRATION SUCCESSFUL!');
    await conn.end();
  } catch (err: any) {
    console.error('MIGRATION ERROR:', err.message);
  }
}

migrate();

