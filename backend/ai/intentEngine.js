const intentsConfig = {
  شراء_منتج: ["اشتر", "أريد شراء", "سعر", "مقارنة", "أفضل", "توصية شراء"],
  وظيفة: ["وظيفة", "توظيف", "cv", "مجال عمل", "بحث عمل"],
  موقع: ["أنشئ موقع", "موقع إلكتروني", "استضافة", "دومين"],
  سفر: ["سفر", "تذاكر", "تأشيرة", "فندق", "رحلة"],
  تعلم: ["تعلم", "دورة", "كتاب", "كيف أبدأ"]
};

export function detectIntent(text) {
  const lower = text.toLowerCase().normalize("NFKD");
  let best = { intent: "عام", score: 0 };

  for (const [key, phrases] of Object.entries(intentsConfig)) {
    let score = phrases.filter(p => lower.includes(p)).length;
    if (score > best.score) best = { intent: key, score };
  }
  return best;
}
