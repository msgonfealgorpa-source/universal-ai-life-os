import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// استيراد المحركات
import db, { seedDatabase } from "./db.js"; 
import { detectIntent } from "./ai/intentEngine.js";
import { extractEntities } from "./ai/entityEngine.js";
import { getProductRecommendations } from "./ai/productEngine.js";
import { generatePlan } from "./ai/plannerEngine.js";
import { saveInteraction, getUserPreferences } from "./ai/learningEngine.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// تهيئة قاعدة البيانات
try {
  seedDatabase();
} catch (e) {
  console.warn("⚠️ DB Init warning:", e.message);
}

// 🧠 API Endpoint
app.post("/api/analyze", (req, res) => {
  try {
    const { query, userId = "guest" } = req.body;
    
    if (!query?.trim()) {
      return res.status(400).json({ error: "Empty query" });
    }

    const { intent, score } = detectIntent(query);
    const entities = extractEntities(query);
    saveInteraction(userId, query, intent);

    // ✅ تم إضافة const هنا (كان هذا هو السبب الرئيسي لانهيار السيرفر)
    const result = intent === "شراء_منتج" 
      ? getProductRecommendations(entities, intent) 
      : generatePlan(intent);

    res.json({
      intent,
      confidence: score > 0 ? Math.min(score * 30, 95) : 50,
      result,
      preferences: getUserPreferences(userId)
    });
  } catch (err) {
    console.error("💥 Logic Error:", err);
    res.status(500).json({ error: "Internal Logic Error", details: err.message });
  }
});

// 🌐 تقديم الواجهة الأمامية (إذا كنت تدمجها مع الباك إند)
const distDir = path.join(__dirname, "../frontend/dist");

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    console.warn("⚠️ Frontend dist folder not found. Serving API only.");
  }
} else {
  app.get("/health", (req, res) => res.send("OK"));
}

// تشغيل السيرفر
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));
