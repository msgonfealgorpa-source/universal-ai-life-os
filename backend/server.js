// ===== تشخيص: نحمّل كل ملف لوحده لنكتشف المكسور =====
console.log("🔍 Diagnostic import check starting...\n");

let db, detectIntent, extractEntities, getProductRecommendations, generatePlan, saveInteraction, getUserPreferences;

try {
  console.log("[1/6] db.js...");
  const m = await import("./db.js");
  db = m.default;
  m.seedDatabase();
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in db.js:", e.message);
  process.exit(1);
}

try {
  console.log("[2/6] ai/intentEngine.js...");
  const m = await import("./ai/intentEngine.js");
  detectIntent = m.detectIntent;
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in ai/intentEngine.js:", e.message);
  process.exit(1);
}

try {
  console.log("[3/6] ai/entityEngine.js...");
  const m = await import("./ai/entityEngine.js");
  extractEntities = m.extractEntities;
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in ai/entityEngine.js:", e.message);
  process.exit(1);
}

try {
  console.log("[4/6] ai/productEngine.js...");
  const m = await import("./ai/productEngine.js");
  getProductRecommendations = m.getProductRecommendations;
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in ai/productEngine.js:", e.message);
  process.exit(1);
}

try {
  console.log("[5/6] ai/plannerEngine.js...");
  const m = await import("./ai/plannerEngine.js");
  generatePlan = m.generatePlan;
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in ai/plannerEngine.js:", e.message);
  process.exit(1);
}

try {
  console.log("[6/6] ai/learningEngine.js...");
  const m = await import("./ai/learningEngine.js");
  saveInteraction = m.saveInteraction;
  getUserPreferences = m.getUserPreferences;
  console.log("✅ OK\n");
} catch (e) {
  console.error("❌ FATAL in ai/learningEngine.js:", e.message);
  process.exit(1);
}

console.log("🎉 ALL MODULES LOADED! Starting Express...\n");

// ===== السيرفر =====
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json());

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
    res.json({ intent, confidence: score > 0 ? Math.min(score * 30, 95) : 50, result, preferences: getUserPreferences(userId) });
  } catch (err) {
    console.error("💥 API Error:", err);
    res.status(500).json({ error: err.message });
  }
});

const distDir = path.join(__dirname, "../frontend/dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (req, res) => res.sendFile(path.join(distDir, "index.html")));
} else {
  app.get("/health", (req, res) => res.send("OK"));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
