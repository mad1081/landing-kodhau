# Аутентификация

---
title: "Аутентификация"
description: "Supabase Auth + JWT + рөлдер жүйесі"
---

KodHau аутентификацияны **Supabase Auth** арқылы жүзеге асырады. Supabase JWT токендерін береді, ал Express бэкенд оларды тексереді.

---

## Аутентификация ағыны

```
1. Студент /auth бетінде email + пароль енгізеді
2. Фронтенд → Supabase Auth: signInWithPassword()
3. Supabase → JWT токенін береді (payload-та role бар)
4. Фронтенд барлық API сұрауларына токенді қосады:
   Authorization: Bearer <jwt>
5. Express middleware токенді декодтайды, req.user-ге жазады
6. Route handler req.user.role-ді тексереді
```

---

## Рөлдер

| Рөл | Сипаттама | Рұқсаттар |
|---|---|---|
| `student` | Әдепкі рөл | Курстарды/сабақтарды/тапсырмаларды оқу |
| `teacher` | Мұғалім | Курс, модуль, сабақ, тапсырма жасау және жаңарту |
| `admin` | Әкімші | Барлығы: жасау, жаңарту, жою + пайдаланушы рөлдерін басқару |

Рөл Supabase-те `user_metadata.role` ретінде сақталады және JWT-ге автоматты қосылады.

---

## Auth Middleware (`backend/middleware/auth.js`)

```js
module.exports = function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    req.user = null  // аутентификацияланбаған сұрау
    return next()
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.user_metadata?.role || 'student',
    }
  } catch (e) {
    req.user = null
  }

  next()
}
```

---

## Рөл тексерулері

Route handler ішінде:

```js
// Teacher немесе Admin
if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
  return res.status(403).json({ error: 'Forbidden' })
}

// Тек Admin
if (!req.user || req.user.role !== 'admin') {
  return res.status(403).json({ error: 'Forbidden' })
}
```

---

## Фронтенд жағынан токен жіберу

```ts
const { data } = await supabase.auth.getSession()
const token = data.session?.access_token

const response = await fetch(`${API}/api/courses`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ title, slug, ... }),
})
```

---

## Supabase Supabase Auth беттер

| Бет | URL |
|---|---|
| Тіркелу / Кіру | `/auth` |
| Шығу | Sidebar-дағы "Шығу" батырмасы |

Тіркелу кезінде `email` + `password` жіберіледі. Supabase email растауды қолдайды (опционалды).
