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

| Қабат | Технология |
|---|---|
| Лендинг | Nuxt 3, Vue 3, Tailwind CSS v4 → Vercel |
| Платформа | React 18, TypeScript, Vite, Tailwind CSS v3 → Vercel |
| Бэкенд | Node.js, Express 5 → Render |
| Дерекқор | PostgreSQL — Supabase |
| Аутентификация | Supabase Auth (JWT + role в user_metadata) |
| Код орындау (JS/Python) | Wandbox API (тегін, аутентификациясыз) |
| Код орындау (SQL) | PGlite (WASM, браузерде) |
| AI Ментор | Anthropic Claude API |

## Жоба құрылымы

```
landing-kodhau/
├── landing/    # Маркетингтік лендинг (Nuxt 3)
├── ide/        # Студент платформасы (React + Vite)
├── backend/    # REST API сервері (Node.js + Express)
└── docs/       # Техникалық құжаттама (Mintlify)
```

## Негізгі мүмкіндіктер

- **Курстар** — Python, JavaScript, SQL курстары (модуль → сабақ → тапсырма)
- **Теория** — Markdown форматындағы сабақ мазмұны
- **Кодтық тапсырмалар** — Monaco редакторы, автоматты тест тексеру
- **AI-ментор** — Claude API, 3 тілде жауап береді, дыбыстық синтез
- **Прогресс** — орындалған тапсырмалар мен сабақтар есепке алынады
- **Топтар** — мұғалім студенттерді топқа email арқылы қосады
- **Рөлдер** — `student` / `teacher` / `admin` (JWT арқылы)
- **Әкімші панелі** — курс, модуль, сабақ, тапсырмаларды CRUD, пайдаланушы рөлін өзгерту

## Рөлдер

| Рөл | Рұқсаттар |
|---|---|
| `student` | Курстарды оқу, тапсырмаларды орындау, прогресті көру |
| `teacher` | + Курс/модуль/сабақ/тапсырма жасау, топ жасау, студент қосу |
| `admin` | + Бәрін жою, пайдаланушы рөлін өзгерту |

## Орнату

```bash
# Барлық бөліктерді орнату
cd backend && npm install
cd ide && pnpm install
cd landing && pnpm install

# .env файлдарын толтыру
cp backend/.env.example backend/.env
```

Толық нұсқаулық: **[kodhau.mintlify.app](https://kodhau.mintlify.app)**
