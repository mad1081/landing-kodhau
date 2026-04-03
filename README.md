# KodHau

Бағдарламалауды үйренуге арналған интерактивті веб-платформа. Студенттер курстарды оқып, теорияны меңгеріп, нақты кодтық тапсырмаларды орындайды. AI-ментор қазақша/орысша/ағылшынша нұсқаулар береді.

## Сілтемелер

| | URL |
|---|---|
| 📄 Құжаттама | [kodhau.mintlify.app](https://kodhau.mintlify.app) |
| 🌐 Лендинг | [kodhau.vercel.app](https://kodhau.vercel.app) |
| 💻 Платформа | [kodhau-ide.vercel.app](https://kodhau-ide.vercel.app) |
| ⚙️ Бэкенд API | [kodhau-learning.onrender.com](https://kodhau-learning.onrender.com) |

## Технологиялар

- **Лендинг** — Nuxt 3, Tailwind CSS (Vercel)
- **Платформа** — React 18, TypeScript, Vite, Tailwind CSS (Vercel)
- **Бэкенд** — Node.js, Express (Render)
- **Дерекқор** — PostgreSQL (Supabase)
- **Аутентификация** — Supabase Auth (JWT)
- **Код орындау** — Judge0 (RapidAPI), PGlite (WASM)
- **AI Ментор** — Claude API (Anthropic)

## Жоба құрылымы

```
landing-kodhau/
├── landing/    # Маркетингтік лендинг (Nuxt 3)
├── ide/        # Студент платформасы (React + Vite)
├── backend/    # REST API сервері (Node.js + Express)
└── docs/       # Техникалық құжаттама
```

## Құжаттама

Толық API сипаттамасы, дерекқор схемасы, аутентификация және орнату нұсқаулығы:
**[kodhau.mintlify.app](https://kodhau.mintlify.app)**
