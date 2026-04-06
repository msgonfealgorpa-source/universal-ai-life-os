import db from "../db.js";

export function saveInteraction(userId, query, intent, clicked = null) {
  const stmt = db.prepare("INSERT INTO interactions (user_id, query, intent, clicked) VALUES (?, ?, ?, ?)");
  stmt.run(userId, query, intent, clicked);
  
  // تحديث بسيط لاهتمامات المستخدم
  if (!db.prepare("SELECT id FROM users WHERE id = ?").get(userId)) {
    db.prepare("INSERT INTO users (id, interests) VALUES (?, ?)").run(userId, JSON.stringify([intent]));
  }
}

export function getUserPreferences(userId) {
  const rows = db.prepare("SELECT intent, COUNT(*) as count FROM interactions WHERE user_id = ? GROUP BY intent ORDER BY count DESC LIMIT 3").all(userId);
  return rows.map(r => r.intent);
}
