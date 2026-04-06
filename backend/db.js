import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");

let db;

// 1. الاتصال بقاعدة البيانات مع حماية كاملة لبيئة رندر
try {
  // محاولة الاتصال بملف فعلي
  db = new Database(dbPath);
  console.log("✅ File database connected.");
} catch (err) {
  // إذا فشل إنشاء الملف (يحدث أحياناً على رندر)، نستخدم الذاكرة المؤقتة كبديل آمن
  console.warn("⚠️ File DB failed, using in-memory fallback:", err.message);
  db = new Database(":memory:"); 
}

// 2. إنشاء الجداول
db.exec(`
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

// 3. دالة تعبئة البيانات
export function seedDatabase() {
  console.log("🌱 Checking database state...");
  const count = db.prepare("SELECT count(*) as count FROM knowledge_products").get();

  if (count.count === 0) {
    console.log("⏳ Seeding demo data...");
    const insert = db.prepare(
      "INSERT OR IGNORE INTO knowledge_products VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    const runInsert = db.transaction((items) => {
      for (const item of items) {
        insert.run(...item);
      }
    });

    runInsert([
      [1, "MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2 Chip, 512GB SSD", "برمجة, خفيف"],
      [2, "Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD", "برمجة, شاشة 4K"],
      [3, "Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين"],
      [4, "HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب"],
      [5, "Samsung Galaxy S24", "هاتف", 3100, 4.7, "Snapdragon 8 Gen 3, 12GB RAM", "تصوير, أداء"],
      [6, "iPhone 15", "هاتف", 3800, 4.6, "A16 Bionic, 8GB RAM, 128GB", "تصوير, نظام"]
    ]);

    console.log("✅ Database seeded successfully.");
  }
}

// 4. التصدير
export default db;
