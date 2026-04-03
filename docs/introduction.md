---
title: "Кіріспе"
description: "KodHau платформасына техникалық шолу"
---

# KodHau — Техникалық құжаттама

**KodHau** — бағдарламалауды үйренуге арналған интерактивті веб-платформа. Студенттер курстарды оқып, теорияны меңгеріп, нақты кодтық тапсырмаларды орындайды. AI-ментор кодты талдап, қазақша/орысша/ағылшынша нұсқаулар береді.

---

## Жоба құрылымы

```
landing-kodhau/
├── landing/          # Маркетингтік лендинг (Nuxt 3, Vercel)
├── ide/              # Студент платформасы (React + Vite, Vercel)
├── backend/          # REST API сервері (Node.js + Express, Render)
└── docs/             # Техникалық құжаттама (Mintlify)
```

## Технологиялар стегі

| Қабат | Технология | Орналасу |
|---|---|---|
| Лендинг | Nuxt 3 + Vue 3, Tailwind CSS v4 | Vercel |
| Фронтенд (IDE) | React 18, TypeScript, Vite, Tailwind CSS v3 | Vercel |
| Бэкенд | Node.js, Express 5 | Render |
| Дерекқор | PostgreSQL (Supabase) | Supabase Cloud |
| Аутентификация | Supabase Auth (JWT + user_metadata.role) | Supabase Cloud |
| Код орындау (JS/Python) | Wandbox API (тегін) | Сыртқы API |
| SQL орындау | PGlite (WASM, браузерде) | Клиент жағында |
| AI Ментор | Claude API (Anthropic) | Сыртқы API |

---

## Негізгі мүмкіндіктер

| Мүмкіндік | Сипаттама |
|---|---|
| Курстар | Python, JavaScript, SQL — модуль → сабақ → тапсырма |
| Теория | Markdown форматындағы сабақ мазмұны |
| Код редактор | Monaco Editor, синтаксис бөлектеу |
| Код орындау | JS/Python → Wandbox, SQL → PGlite (браузерде) |
| Тест тексеру | Автоматты тест жағдайлары, pass/fail нәтижесі |
| AI-ментор | Claude API, 3 тілде, дыбыстық синтез |
| Прогресс | Орындалған тапсырмалар мен сабақтар есепке алынады |
| Топтар | Мұғалім студенттерді топқа email арқылы қосады |
| Рөлдер | `student` / `teacher` / `admin` — JWT арқылы |
| Әкімші панелі | CRUD операциялары, пайдаланушы рөлін өзгерту |
| Аутентификация | Email/пароль, Magic Link, GitHub OAuth |
| Тіл | Қазақша / Орысша / Ағылшынша (i18n) |

---

## Рөлдер жүйесі

| Рөл | Рұқсаттар |
|---|---|
| `student` | Курстарды оқу, тапсырмаларды орындау, прогресті көру |
| `teacher` | + Контент жасау, топ басқару, студент қосу |
| `admin` | + Барлық мазмұнды жою, пайдаланушы рөлін өзгерту |

Рөл Supabase Auth-тағы `user_metadata.role` өрісінде сақталады. Жаңа пайдаланушы тіркелгенде автоматты түрде `student` рөлі беріледі (Postgres trigger арқылы).

---

## Беттер (IDE фронтенд)

| Бет | URL | Рұқсат |
|---|---|---|
| Аутентификация | `/auth` | Барлығы |
| Бастапқы бет | `/` | Тіркелген |
| Курс жоспары | `/course/:slug` | Тіркелген |
| Сабақ теориясы | `/lesson/:id` | Тіркелген |
| Код редактор | `/ide/:taskId` | Тіркелген |
| Топтар | `/groups` | Тіркелген |
| Профиль | `/profile` | Тіркелген |
| Әкімші панелі | `/admin` | `teacher` / `admin` |

---

## Онлайн сілтемелер

| | URL |
|---|---|
| 🌐 Лендинг | [kodhau.vercel.app](https://kodhau.vercel.app) |
| 💻 Платформа | [kodhau-ide.vercel.app](https://kodhau-ide.vercel.app) |
| ⚙️ API | [kodhau-learning.onrender.com](https://kodhau-learning.onrender.com) |
| 📄 Docs | [kodhau.mintlify.app](https://kodhau.mintlify.app) |

---

## Құжаттар

- [API эндпоинттері](./api.md)
- [Дерекқор схемасы](./database.md)
- [Аутентификация](./auth.md)
- [Код орындау](./code-execution.md)
- [Орнату нұсқаулығы](./setup.md)
