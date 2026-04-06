import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");

let db;

try {
  // محاولة الاتصال بالملف المحلي
  db = new Database(dbPath);
  // تفعيل وضع WAL لأداء أفضل وتقليل أخطاء القفل في رندر
  db.pragma('journal_mode = WAL');
  console.log("✅ Database connection established.");
} catch (err) {
  console.error("❌ DB Connection Error:", err.message);
  // في حال فشل الاتصال بالملف، نستخدم ذاكرة مؤقتة لعدم توقف الموقع
  db = new Database(":memory:"); 
}

// ------------------------------------------------------------------
// 🔧 هذا هو الجزء الذي كان مفقوداً ويجب إعادته: إنشاء الجداول
// ------------------------------------------------------------------
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

// دالة تعبئة البيانات (تستخدم عند البدء)
export function seedDatabase() {
  console.log("🌱 Checking database state...");
  const count = db.prepare("SELECT count(*) as count FROM knowledge_products").get();
  
  // إذا كانت القاعدة فارغة، قم بتعبئة البيانات
  if (count.count === 0) {
    console.log("⏳ Seeding demo data...");
    const insert = db.prepare("INSERT OR IGNORE INTO knowledge_products VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    const runInsert = db.transaction((items) => {
      for (const item of items) insert.run(...item);
    });

    runInsert([
      [1, "MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2 Chip, 512GB SSD", "برمجة, خفيف, بطارية"],
      [2, "Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD, شاشة 4K", "برمجة, دقة عالية"],
      [3, "Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين"],
      [4, "HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب"],
      [5, "Samsung Galaxy S24", "هاتف", 3100, 4.7, "Snapdragon 8 Gen 3, 12GB RAM", "تصوير, أداء"],
      [6, "iPhone 15", "هاتف", 3800, 4.6, "A16 Bionic, 8GB RAM, 128GB", "تصوير, نظام"]
    ]);
    console.log("✅ Database seeded successfully.");
  }
}

export default db;
