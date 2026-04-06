import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

// تحديد مسار قاعدة البيانات بدقة لضمان الصلاحيات على رندر
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "life_os.db");

let db;
try {
  db = new Database(dbPath);
  console.log("✅ Database connection established.");
} catch (err) {
  console.error("❌ DB Connection Error:", err.message);
  // في حالة الفشل، نستخدم ذاكرة مؤقتة لعدم توقف السيرفر تماماً
  db = new Database(":memory:"); 
}

// ... (بقية كود الجداول و seedDatabase كما هو) ...
// تأكد من وجود دالة seedDatabase وتصديرها
export function seedDatabase() {
  console.log("🌱 Seeding DB...");
  // ... كود التهيئة ...
}
export default db;
