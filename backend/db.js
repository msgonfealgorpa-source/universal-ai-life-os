import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");
const db = new Database(dbPath);

// تهيئة الجداول
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    interests TEXT,
    preferences TEXT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price REAL,
    rating REAL,
    specs TEXT,
    tags TEXT
  );
`);

// إدخال بيانات تجريبية للمنتجات
const exists = db.prepare("SELECT count(*) as count FROM knowledge_products").get();
if (exists.count === 0) {
  const insert = db.prepare("INSERT INTO knowledge_products (name, category, price, rating, specs, tags) VALUES (?, ?, ?, ?, ?, ?)");
  insert.run("MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2 Chip, 512GB SSD", "برمجة, خفيف, بطارية");
  insert.run("Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD, شاشة 4K", "برمجة, دقة شاشة عالية");
  insert.run("Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين, لوحة مفاتيح ممتازة");
  insert.run("HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب, ميزانية منخفضة");
}

export default db;
