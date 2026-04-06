import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");
const db = new Database(dbPath);

// 🛠️ إنشاء الجداول
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

// 🌱 دالة التهيئة الآمنة لـ Render
export function seedDatabase() {
  console.log("🔍 Checking database state...");
  const count = db.prepare("SELECT count(*) as count FROM knowledge_products").get();
  
  // إعادة البذر إذا كانت القاعدة فارغة أو في وضع الإنتاج (لأن Render يحذف الملفات)
  if (count.count === 0 || process.env.NODE_ENV === "production") {
    console.log("🌱 Seeding demo data...");
    const insert = db.prepare("INSERT OR IGNORE INTO knowledge_products VALUES (?, ?, ?, ?, ?, ?, ?)");
    const seedData = [
      [1, "MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2 Chip, 512GB SSD", "برمجة, خفيف, بطارية"],
      [2, "Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD, شاشة 4K", "برمجة, دقة عالية"],
      [3, "Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين, لوحة مفاتيح"],
      [4, "HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب, ميزانية منخفضة"],
      [5, "Samsung Galaxy S24", "هاتف", 3100, 4.7, "Snapdragon 8 Gen 3, 12GB RAM", "تصوير, أداء عالي"],
      [6, "iPhone 15", "هاتف", 3800, 4.6, "A16 Bionic, 8GB RAM, 128GB", "تصوير, نظام مستقر"]
    ];
    const runSeed = db.transaction((items) => items.forEach(item => insert.run(...item)));
    runSeed(seedData);
    console.log("✅ Database seeded successfully.");
  }
}

export default db;
