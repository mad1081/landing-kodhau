---
title: "Орнату нұсқаулығы"
description: "Жергілікті орнату және Vercel/Render деплой нұсқаулығы"
---

# Орнату нұсқаулығы

---

## Талаптар

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Git

---

## Жергілікті орнату

### 1. Репозиторийді клондау

```bash
git clone https://github.com/mad1081/landing-kodhau.git
cd landing-kodhau
```

---

### 2. Бэкенд

```bash
cd backend
npm install
```

`.env` файлын жасаңыз:

```env
PORT=5000
SUPABASE_URL=https://vauvwjvotkoawembictz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RAPIDAPI_KEY=your_rapidapi_key
```

Іске қосу:

```bash
npm start
# немесе даму режимі:
npm run dev
```

Сервер: `http://localhost:5000`

---

### 3. IDE (React фронтенд)

```bash
cd ide
pnpm install
```

`.env` файлын жасаңыз:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://vauvwjvotkoawembictz.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Іске қосу:

```bash
pnpm dev
```

Ашылады: `http://localhost:5173`

Өндірістік жинақ:

```bash
pnpm build
```

---

### 4. Лендинг (Nuxt)

```bash
cd landing
pnpm install
```

`.env` файлын жасаңыз:

```env
NUXT_PUBLIC_IDE_URL=http://localhost:5173
```

Іске қосу:

```bash
pnpm dev
```

Ашылады: `http://localhost:3000`

---

## Өндіріске орналастыру

### Бэкенд — Render

1. [render.com](https://render.com) → New Web Service
2. Репозиторийді байланыстыру, `backend/` қалтасын таңдау
3. Build команда: `npm install`
4. Start команда: `npm start`
5. Environment Variables қосу:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RAPIDAPI_KEY`

---

### IDE — Vercel

1. [vercel.com](https://vercel.com) → New Project
2. `ide/` қалтасын Root Directory ретінде орнату
3. Framework Preset: **Vite**
4. Environment Variables:
   - `VITE_API_URL=https://your-backend.onrender.com`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

### Лендинг — Vercel

1. Жаңа Vercel жобасы
2. `landing/` қалтасын Root Directory ретінде орнату
3. Framework Preset: **Nuxt.js**
4. Environment Variables:
   - `NUXT_PUBLIC_IDE_URL=https://your-ide.vercel.app`

---

## Жоба сілтемелері

| Компонент | URL |
|---|---|
| Лендинг | https://kodhau.vercel.app |
| IDE платформасы | https://kodhau-ide.vercel.app |
| Бэкенд API | https://kodhau-learning.onrender.com |
| Supabase дашборд | https://supabase.com/dashboard/project/vauvwjvotkoawembictz |

---

## Постман тестілеу

Барлық эндпоинттерді тексеру үшін [api.md](./api.md) файлындағы мысалдарды пайдаланыңыз.

Негізгі тест ағыны:
1. `GET /health` → `{ "ok": true }`
2. `GET /api/courses` → курстар тізімі
3. `GET /api/courses/slug/python/plan` → толық жоспар
4. `POST /api/run` → код орындау
5. Admin операциялары: Authorization токенімен `POST /api/courses`
