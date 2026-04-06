// قاعدة بيانات في الذاكرة - صفر مكتبات خارجية - مستحيل تفشل
const data = {
  users: [],
  interactions: [],
  knowledge_products: []
};

class Statement {
  constructor(sql) {
    this.sql = sql;
    this.tableName = sql.includes("knowledge_products")
      ? "knowledge_products"
      : sql.includes("interactions")
      ? "interactions"
      : "users";
  }

  run(...p) {
    const t = data[this.tableName];
    if (this.sql.trim().toUpperCase().startsWith("INSERT")) {
      t.push({
        id: p[0], name: p[1], category: p[2], price: p[3],
        rating: p[4], specs: p[5], tags: p[6],
        user_id: p[1], query: p[2], intent: p[3], clicked: p[4],
        interests: p[0], preferences: p[1]
      });
    }
    if (this.sql.trim().toUpperCase().startsWith("UPDATE")) {
      const id = p[p.length - 1];
      const row = t.find(r => r.id === id);
      if (row) {
        if (this.sql.includes("interests")) row.interests = p[0];
        if (this.sql.includes("preferences")) row.preferences = p[1];
      }
    }
  }

  get(...p) {
    const t = data[this.tableName];
    if (this.sql.includes("count(*)")) return { count: t.length };
    if (p.length > 0) return t.find(r => r.id === p[0] || r.user_id === p[0]);
    return t[0];
  }

  all(...p) {
    const t = data[this.tableName];
    if (p.length === 0) return [...t];
    if (this.sql.includes("LIKE")) {
      const term = String(p[0]).replace(/%/g, "");
      return t.filter(r =>
        (r.tags && r.tags.includes(term)) ||
        (r.name && r.name.includes(term)) ||
        (r.category && r.category.includes(term))
      );
    }
    if (this.sql.includes("category")) return t.filter(r => r.category === p[0]);
    if (this.sql.includes("user_id")) return t.filter(r => r.user_id === p[0]);
    return [...t];
  }
}

const db = {
  exec() {},
  prepare(sql) { return new Statement(sql); },
  pragma() {}
};

export default db;

export function seedDatabase() {
  console.log("🌱 Checking database...");
  const count = db.prepare("SELECT count(*) as count FROM knowledge_products").get();
  if (count.count === 0) {
    console.log("⏳ Seeding...");
    const ins = db.prepare("INSERT INTO knowledge_products VALUES (?,?,?,?,?,?,?)");
    [
      [1, "MacBook Air M2", "لابتوب", 4500, 4.8, "16GB RAM, M2, 512GB SSD", "برمجة, خفيف"],
      [2, "Dell XPS 13", "لابتوب", 3800, 4.6, "16GB RAM, i7, 512GB SSD", "برمجة, شاشة 4K"],
      [3, "Lenovo ThinkPad", "لابتوب", 3200, 4.7, "16GB RAM, i5, 512GB SSD", "برمجة, متين"],
      [4, "HP Pavilion Gaming", "لابتوب", 2800, 4.3, "8GB RAM, GTX 1650, 256GB SSD", "ألعاب"],
      [5, "Samsung Galaxy S24", "هاتف", 3100, 4.7, "Snapdragon 8 Gen 3, 12GB RAM", "تصوير, أداء"],
      [6, "iPhone 15", "هاتف", 3800, 4.6, "A16 Bionic, 8GB RAM, 128GB", "تصوير, نظام"]
    ].forEach(item => ins.run(...item));
    console.log("✅ Seeded.");
  }
}
