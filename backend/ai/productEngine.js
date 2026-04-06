import db from "../db.js";

export function getProductRecommendations(entities, intent) {
  if (intent !== "شراء_منتج") return { type: "message", data: "لا تتوفر معلومات شراء لهذا الطلب حالياً" };

  const stmt = db.prepare("SELECT * FROM knowledge_products WHERE category = 'لابتوب'");
  const products = stmt.all();

  // خوارزمية ترتيب محلية بسيطة
  const scored = products.map(p => {
    let score = p.rating * 10;
    if (entities.useCase && p.tags?.includes(entities.useCase)) score += 15;
    if (entities.budgetNumeric) {
      const diff = Math.abs(p.price - entities.budgetNumeric);
      score += Math.max(0, 50 - diff);
    }
    if (entities.budgetLabel === "متوسط" && p.price >= 2500 && p.price <= 5000) score += 10;
    return { ...p, score };
  });

  return {
    type: "products",
    data: scored.sort((a, b) => b.score - a.score).slice(0, 5)
  };
}
