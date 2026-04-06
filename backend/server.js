import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import db, { seedDatabase } from "./db.js"; // ✅ استيراد صحيح للقاعدة ودالة التهيئة
import { detectIntent } from "./ai/intentEngine.js";
import { extractEntities } from "./ai/entityEngine.js";
import { getProductRecommendations } from "./ai/productEngine.js";
import { generatePlan } from "./ai/plannerEngine.js";
import { saveInteraction, getUserPreferences } from "./ai/learningEngine.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// ✅ تهيئة قاعدة البيانات تلقائيًا عند التشغيل
seedDatabase();

// 🧠 نقطة النهاية الرئيسية
app.post("/api/analyze", (req, res) => {
  try {
    const { query, userId = "guest" } = req.body;
    if (!query?.trim()) return res.status(400).json({ error: "النص مطلوب" });

    const { intent, score } = detectIntent(query);
    const entities = extractEntities(query);

    saveInteraction(userId, query, intent);

    const result = intent === "شراء_منتج" 
      ? getProductRecommendations(entities, intent) 
      : generatePlan(intent);

    result.preferences = getUserPreferences(userId);

    res.json({
      intent,
      confidence: score > 0 ? Math.min(score * 30, 95) : 50,
      result
    });
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ error: "خطأ داخلي في المعالجة" });
  }
});

// 🌐 عرض الواجهة في الإنتاج
if (process.env.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distDir));
  // fallback لـ SPA
  app.get("*", (req, res) => res.sendFile(path.join(distDir, "index.html")));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 AI Life OS Running on :${PORT}`));
