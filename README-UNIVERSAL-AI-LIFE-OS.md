# 🧠 Universal AI Life OS Platform

<div align="center">

![Universal AI Life OS](https://img.shields.io/badge/Universal%20AI%20Life%20OS-🧠-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**عقلك الرقمي الشخصي الشامل - بدون أي APIs خارجية**

[🚀 Demo](#-demo) · [📋 Features](#-features) · [🔧 Installation](#-installation) · [📖 Documentation](#-documentation)

</div>

---

## 🌐 اللغات | Languages

[العربية](#-نبذة-عربية) | [English](#-overview-english)

---

## 📋 نبذة (عربية)

### 🎯 الهدف

**Universal AI Life OS** هي منصة رقمية ذكية تعمل كـ "عقل رقمي شخصي شامل" للمستخدم، تتيح له:

- 🔍 البحث عن **المنتجات** مع مقارنة الأسعار والتقييمات
- 💼 البحث عن **الوظائف** حسب المهارات والموقع
- ⚙️ البحث عن **الخدمات** المهنية المختلفة
- 🧠 الحصول على **توصيات ذكية** مبنية على اهتماماته

### ✨ المميزات الرئيسية

| الميزة | الوصف |
|--------|-------|
| 🧠 **AI داخلي 100%** | لا يعتمد على أي API خارجي - كل الذكاء محلي |
| 🔒 **خصوصية كاملة** | البيانات تبقى على جهاز المستخدم فقط |
| ⚡ **سرعة فائقة** | استجابة فورية بدون انتظار خوادم خارجية |
| 🌐 **ثنائي اللغة** | دعم كامل للعربية والإنجليزية |
| 🎤 **بحث صوتي** | دعم البحث بالصوت بالعربية |
| 📚 **تعلم ذاتي** | يتعلم من تفاعلات المستخدم لتحسين التوصيات |

### 🏗️ المعمارية

```
┌─────────────────────────────────────────────────────────────┐
│                    🖥️ Frontend (Next.js)                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Search  │ │ Dashboard│ │ Cards   │ │ Voice   │           │
│  │  Bar    │ │ Panel   │ │ View    │ │ Button  │           │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           │
└───────┼──────────┼──────────┼──────────┼───────────────────┘
        │          │          │          │
        ▼          ▼          ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                    🔌 API Layer                              │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ /analyze-request│  │ /route-request  │                   │
│  └────────┬────────┘  └────────┬────────┘                   │
└───────────┼────────────────────┼────────────────────────────┘
            │                    │
            ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                  🧠 Core Brain Engine                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │   Intent     │ │   Entity     │ │   Router     │         │
│  │  Detection   │ │  Extraction  │ │   Engine     │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │  Language    │ │Recommendation│ │   Learning   │         │
│  │  Detection   │ │    Engine    │ │    Engine    │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                  🗄️ Data Layer                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │  Products    │ │    Jobs      │ │  Services    │         │
│  │   (JSON)     │ │   (JSON)     │ │   (JSON)     │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│  ┌──────────────────────────────────────────────┐           │
│  │         Learning Data (LocalStorage)          │           │
│  └──────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Overview (English)

### 🎯 Purpose

**Universal AI Life OS** is an intelligent digital platform that acts as a "comprehensive personal digital brain", enabling users to:

- 🔍 Search for **products** with price comparisons and ratings
- 💼 Search for **jobs** by skills and location
- ⚙️ Find professional **services**
- 🧠 Get **smart recommendations** based on interests

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **100% Local AI** | No external API dependencies - all intelligence is local |
| 🔒 **Full Privacy** | Data stays on the user's device only |
| ⚡ **Ultra Fast** | Instant response without waiting for external servers |
| 🌐 **Bilingual** | Full Arabic and English support |
| 🎤 **Voice Search** | Arabic voice search support |
| 📚 **Self-Learning** | Learns from user interactions to improve recommendations |

---

## 🧠 Core Brain Engine

The heart of the system - a complete local AI engine with:

### Intent Detection Model
```
Supported Intents:
├── product_search   → Search for products
├── job_search       → Search for jobs
├── service_search   → Search for services
├── knowledge        → Information queries
├── website_builder  → Website creation
├── comparison       → Compare products/services
├── recommendation   → Get recommendations
└── unknown          → General search
```

### Entity Extraction
```
Extracted Entities:
├── category    → Product category (laptop, phone, etc.)
├── brand       → Brand name (Apple, Samsung, etc.)
├── budget      → Price range (min/max)
├── useCase     → Use case (programming, gaming, etc.)
├── rating      → Minimum rating required
└── location    → Location for jobs/services
```

### Example Flow

```
Input: "أريد لابتوب للبرمجة بسعر 5000 ريال"
       (I want a laptop for programming with price 5000 SAR)

Processing:
├── Language Detection: Arabic ✓
├── Intent Detection: product_search (confidence: 85%)
├── Entity Extraction:
│   ├── category: laptop
│   ├── useCase: programming
│   └── budget: { max: 5000 }
└── Router: → Product Engine

Output: List of suitable laptops for programming under 5000 SAR
```

---

## 🚀 Demo

![Demo Screenshot](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Universal+AI+Life+OS+Demo)

---

## 🔧 Installation

### Prerequisites

- Node.js 18+
- npm or bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/universal-ai-life-os.git
cd universal-ai-life-os

# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
universal-ai-life-os/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/                # API Routes
│   │   │   ├── 📁 analyze-request/ # Analyze user query
│   │   │   └── 📁 route-request/  # Route to engines
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx            # Main page
│   │   └── 📄 globals.css         # Global styles
│   │
│   ├── 📁 components/             # React Components
│   │   ├── 📁 ui/                 # UI primitives
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   └── ...
│   │   ├── 📄 SearchBar.tsx       # Search with voice
│   │   ├── 📄 ProductCard.tsx     # Product display
│   │   ├── 📄 JobCard.tsx         # Job display
│   │   ├── 📄 ServiceCard.tsx     # Service display
│   │   └── 📄 UserDashboard.tsx   # User panel
│   │
│   ├── 📁 lib/                    # Core Libraries
│   │   ├── 📄 core-brain.ts       # 🧠 Main AI Engine
│   │   ├── 📄 learning-engine.ts  # Learning system
│   │   └── 📄 utils.ts            # Utilities
│   │
│   ├── 📁 data/                   # Data Files
│   │   ├── 📄 products.json       # Products database
│   │   ├── 📄 jobs.json           # Jobs database
│   │   └── 📄 services.json       # Services database
│   │
│   └── 📁 types/                  # TypeScript Types
│       └── 📄 index.ts
│
├── 📄 package.json
├── 📄 next.config.js
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
└── 📄 README.md
```

---

## 📖 Documentation

### API Endpoints

#### POST `/api/analyze-request`

Analyze a user query and extract intent and entities.

**Request:**
```json
{
  "query": "أريد لابتوب للبرمجة"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "intent": "product_search",
    "entities": {
      "category": "laptop",
      "useCase": "programming"
    },
    "confidence": 0.85,
    "language": "ar",
    "suggestedActions": ["عرض جميع laptop", "مقارنة المنتجات"]
  }
}
```

#### POST `/api/route-request`

Route the query to the appropriate engine and get results.

**Request:**
```json
{
  "query": "أريد لابتوب للبرمجة",
  "intent": "product_search",
  "entities": { "category": "laptop", "useCase": "programming" }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [...],
    "totalResults": 5
  }
}
```

### Core Brain Functions

```typescript
import { analyzeQuery, detectIntent, extractEntities } from '@/lib/core-brain';

// Full analysis
const result = await analyzeQuery("أريد لابتوب للبرمجة");

// Intent detection only
const { intent, confidence } = detectIntent("أريد وظيفة مطور");

// Entity extraction only
const entities = extractEntities("أريد آيفون بسعر 3000 ريال", "product_search");
```

### Learning Engine Functions

```typescript
import { 
  recordInteraction, 
  saveSearchHistory, 
  getUserInterests, 
  getUserStats 
} from '@/lib/learning-engine';

// Record user interaction
recordInteraction({
  type: 'click',
  itemId: 'prod-001',
  metadata: { brand: 'Apple', price: 5499 }
});

// Get user statistics
const stats = getUserStats();
```

---

## 🎨 Customization

### Adding New Products

Edit `src/data/products.json`:

```json
{
  "products": [
    {
      "id": "prod-new",
      "name": "New Product",
      "nameAr": "منتج جديد",
      "brand": "Brand",
      "category": "laptop",
      "price": 5000,
      "rating": 4.5,
      "tags": ["laptop", "new"],
      "image": "https://...",
      "inStock": true
    }
  ]
}
```

### Adding New Intents

Edit `src/lib/core-brain.ts`:

```typescript
const INTENT_TRAINING_DATA: Record<IntentType, string[]> = {
  // Add new intent
  travel_search: [
    'سفر', 'رحلة', 'طيران', 'فندق',
    'travel', 'flight', 'hotel', 'trip'
  ],
  // ...
};
```

---

## 🚀 Deployment

### Deploy to Railway

1. Push to GitHub
2. Go to [Railway](https://railway.app)
3. Connect your GitHub repo
4. Deploy automatically

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 📞 Contact

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

---

<div align="center">

**Made with ❤️ for the Arabic tech community**

⭐ Star this repo if you find it useful! ⭐

</div>
