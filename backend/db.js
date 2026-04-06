import initSqlJs from 'sql.js';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");

let _db = null;

// --- 1. محاكاة دقيقة لـ better-sqlite3 حتى تعمل ملفات AI بدون تعديل ---
class StmtWrapper {
  constructor(stmt) {
    this._stmt = stmt;
  }
  run(...params) {
    if (params && params.length > 0) this._stmt.bind(params);
    this._stmt.step();
    this._stmt.reset();
  }
  get(...params) {
    if (params && params.length > 0) this._stmt.bind(params);
    let row = undefined;
    if (this._stmt.step()) {
      row = this._stmt.getAsObject();
    }
    this._stmt.reset();
    return row;
  }
  all(...params) {
    if (params && params.length > 0) this._stmt.bind(params);
    const rows = [];
    while (this._stmt.step()) {
      rows.push(this._stmt.getAsObject());
    }
    this._stmt.reset();
    return rows;
  }
}

class DbWrapper {
  constructor(sqlDb) {
    this._sqlDb = sqlDb;
  }
  exec(sql) {
    this._sqlDb.exec(sql);
  }
  prepare(sql) {
    return new StmtWrapper(this._sqlDb.prepare(sql));
  }
  pragma() {} // لا نحتاجه في sql.js
}

// استخدام Proxy لخداعة باقي الملفات أن هذا هو better-sqlite3 الأصلي
const dbProxy = new Proxy({}, {
  get(target, prop) {
    if (!_db) throw new Error("Database not initialized!");
    const val = _db[prop];
    return typeof val === 'function' ? val.bind(_db) : val;
  }
});
// ---------------------------------------------------------------------

// 2. تهيئة قاعدة البيانات (غير متزامن لأن sql.js يحتاج لتحميل ملف wasm)
export async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: file => path.join(__dirname, "../node_modules/sql.js/dist", file)
  });

  let sqlDb;
  try {
    if (fs.existsSync(dbPath)) {
      const fileBuffer = fs.readFileSync(dbPath);
      sqlDb = new SQL.Database(fileBuffer);
    } else {
      sqlDb = new SQL.Database();
    }
    console.log("✅ Database connected successfully (sql.js).");
  } catch (err) {
    sqlDb = new SQL.Database();
    console.warn("⚠️ Using in-memory fallback:", err.message);
  }

  _db = new DbWrapper(sqlDb);

  _db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      interests TEXT DEFAULT '[]',
      preferences TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      query TEXT,
      intent TEXT,
      clicked TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS knowledge_products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      category TEXT,
      price REAL,
      rating REAL,
      specs TEXT,
      tags TEXT
    );
  `);

  seedDatabase();
}

// 3. دالة تعبئة البيانات
export function seedDatabase() {
  console.log("🌱 Checking database state...");
  const count = dbProxy.prepare("SELECT count(*) as count FROM knowledge_products").get();

  if (count && count.count === 0) {
    console.log("⏳ Seeding demo data...");
    const insert = dbProxy.prepare(
      "INSERT OR IGNORE INTO knowledge_products VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    const items = [
      [1, "MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2 Chip, 512GB SSD", "برمجة, خفيف"],
      [2, "Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD", "برمجة, شاشة 4K"],
      [3, "Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين"],
      [4, "HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب"],
      [5, "Samsung Galaxy S24", "هاتف", 3100, 4.7, "Snapdragon 8 Gen 3, 12GB RAM", "تصوير, أداء"],
      [6, "iPhone 15", "هاتف", 3800, 4.6, "A16 Bionic, 8GB RAM, 128GB", "تصوير, نظام"]
    ];

    for (const item of items) {
      insert.run(...item);
    }
    console.log("✅ Database seeded successfully.");
  }
}

export default dbProxy;
