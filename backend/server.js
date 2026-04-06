import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// استيراد المحركات (تأكد أن أسماء الملفات في مجلد ai مطابقة تماماً للحالة)
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
  console.warn("⚠️ DB Init warning (ignored):", e.message);
}

// 🧠 API Endpoint مع حماية كاملة
app.post("/api/analyze", (req, res) => {
  try {
    const { query, userId = "guest" } = req.body;
    if (!query?.trim()) return res.status(400).json({ error: "Empty query" });

    const { intent, score } = detectIntent(query);
    const entities = extractEntities(query);
    saveInteraction(userId, query, intent);

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

// 🌐 Frontend Serving Logic (مع حماية من ملف مفقود)
const distDir = path.join(__dirname, "../frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distDir));

  app.get("*", (req, res) => {
    const indexPath = path.join(distDir, "index.html");
    // التحقق مما إذا تم بناء الواجهة بنجاح
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`🚨 Error: index.html not found in ${distDir}. Check build command.`);
    }
  });
} else {
  // Dev Proxy
  app.get("/health", (req, res) => res.send("OK"));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));
