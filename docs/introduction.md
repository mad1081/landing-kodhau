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
└── backend/          # REST API сервері (Node.js + Express, Render)
```

## Технологиялар стегі

| Қабат | Технология | Орналасу |
|---|---|---|
| Лендинг | Nuxt 3, Tailwind CSS | Vercel |
| Фронтенд (IDE) | React 18, TypeScript, Vite, Tailwind CSS | Vercel |
| Бэкенд | Node.js, Express | Render |
| Дерекқор | PostgreSQL (Supabase) | Supabase Cloud |
| Аутентификация | Supabase Auth (JWT) | Supabase Cloud |
| Код орындау | Judge0 (RapidAPI) | Сыртқы API |
| SQL орындау | PGlite (WASM, браузерде) | Клиент жағында |
| AI Ментор | Claude API (Anthropic) | Сыртқы API |

---

## Онлайн құжаттама

**[kodhau.mintlify.app](https://kodhau.mintlify.app)** — толық интерактивті docs сайты

## Құжаттар

- [API эндпоинттері](./api.md)
- [Дерекқор схемасы](./database.md)
- [Аутентификация](./auth.md)
- [Код орындау](./code-execution.md)
- [Орнату нұсқаулығы](./setup.md)
