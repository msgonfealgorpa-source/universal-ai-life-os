import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { detectIntent } from "./ai/intentEngine.js";
import { extractEntities } from "./ai/entityEngine.js";
import { getProductRecommendations } from "./ai/productEngine.js";
import { generatePlan } from "./ai/plannerEngine.js";
import { saveInteraction, getUserPreferences } from "./ai/learningEngine.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
// تشغيل تلقائي لتهيئة البيانات التجريبية عند كل بداية تشغيل
import { fileURLToPath } from "url";
import path from "path";

if (process.env.NODE_ENV === "production") {
  const seedStmt = db.prepare("SELECT count(*) as count FROM knowledge_products").get();
  if (seedStmt.count === 0) {
    console.log("🌱 Re-seeding demo products...");
    // أعد هنا كود insert.run() الموجود في db.js أو استورده كدالة منفصلة
  }
}
// API الأساسي
app.post("/api/analyze", (req, res) => {
  const { query, userId = "guest" } = req.body;
  const { intent, score } = detectIntent(query);
  const entities = extractEntities(query);

  saveInteraction(userId, query, intent);

  let result;
  if (intent === "شراء_منتج") {
    result = getProductRecommendations(entities, intent);
  } else {
    result = generatePlan(intent);
  }

  // إضافة تفضيلات المستخدم
  result.preferences = getUserPreferences(userId);

  res.json({ intent, confidence: score > 0 ? Math.min(score * 30, 95) : 50, result });
});

// عرض الواجهة في الإنتاج
if (process.env.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distDir));
  app.get("*", (req, res) => res.sendFile(path.join(distDir, "index.html")));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 AI Life OS Running on :${PORT}`));
