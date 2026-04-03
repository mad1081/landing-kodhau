---
title: "Код орындау"
description: "Wandbox (JS/Python) және PGlite (SQL) орындау жүйелері"
---

# Код орындау жүйесі

KodHau екі орындау механизмін қолданады: JavaScript/Python үшін **Wandbox**, SQL тапсырмалары үшін **PGlite** (браузерде).

---

## Архитектура

```
Студент "Run" басады
       │
       ▼
useCodeRunner (ide/src/hooks/useCodeRunner.ts)
       │
       ├─── JS/Python ──► POST /api/run (Express)
       │                        │
       │                        ▼
       │                  Wandbox API
       │                  wandbox.org/api/compile.json
       │                  (тегін, аутентификациясыз)
       │                        │
       │                        ▼
       │                  stdout / stderr
       │
       └─── SQL ──────► PGlite (WASM, браузерде)
                        setup_sql → студент коды → validation_sql
                        Нәтиже браузерде тексеріледі
```

---

## Wandbox (JavaScript / Python)

### Конфигурация

| Параметр | Мән |
|---|---|
| API | `https://wandbox.org/api/compile.json` |
| JavaScript компилятор | `nodejs-20.17.0` |
| Python компилятор | `cpython-3.12.7` |
| Аутентификация | Жоқ (тегін, ашық API) |
| Ортасы | Сервер жағы (Express `/api/run`) |

### Сұрау форматы

```json
{
  "compiler": "cpython-3.12.7",
  "code": "print('hello')"
}
```

### Тест орындау логикасы

Студент коды тікелей жіберілмейді. `useCodeRunner` тест орындаушы кодты **студент кодына** қосады:

**JavaScript үшін:**
```js
// студент кодының аяғына қосылады:
const __results = [];
for (const tc of __testCases) {
  try {
    const got = twoSum(...tc.input);
    __results.push({ ok: JSON.stringify(got) === JSON.stringify(tc.expected), got, expected: tc.expected });
  } catch(e) {
    __results.push({ ok: false, got: String(e), expected: tc.expected });
  }
}
console.log(JSON.stringify(__results));
```

**Python үшін:**
```python
# студент кодының аяғына қосылады:
import json
__results = []
for tc in __test_cases:
    try:
        got = twoSum(*tc['input'])
        __results.append({'ok': got == tc['expected'], 'got': got, 'expected': tc['expected']})
    except Exception as e:
        __results.append({'ok': False, 'got': str(e), 'expected': tc['expected']})
print(json.dumps(__results))
```

### Нәтиже форматы (Wandbox → бэкенд → фронтенд)

Wandbox жауабы:
```json
{
  "status": "0",
  "program_output": "[{\"ok\":true,\"got\":3,\"expected\":3}]\n",
  "program_error": ""
}
```

Бэкенд Piston-тәрізді форматқа нормалайды:
```json
{
  "run": {
    "stdout": "[{\"ok\":true,\"got\":3,\"expected\":3}]\n",
    "stderr": ""
  }
}
```

Фронтенд `stdout`-ты JSON-ға парсинг жасайды және тест нәтижелерін OutputPanel-де көрсетеді.

---

## PGlite (SQL)

PGlite — браузерде WASM арқылы жұмыс істейтін PostgreSQL. SQL тапсырмалары серверге жіберілмейді.

### Орындау ағыны

```
1. PGlite инстансын жасау (жаңа in-memory DB)
2. setup_sql орындау (кестелер жасау, деректер қосу)
3. Студент SQL кодын орындау (SELECT, INSERT, ...)
4. validation_sql орындау (нәтиженің дұрыстығын тексеру)
5. Тест passed/failed ретінде белгіленеді
```

### Тест жағдайы форматы

```json
{
  "setup_sql": "CREATE TABLE employees (id INT, salary INT); INSERT INTO employees VALUES (1, 5000), (2, 8000);",
  "query": "SELECT * FROM employees WHERE salary > 6000;",
  "validation_sql": "SELECT COUNT(*) = 1 as ok FROM result;"
}
```

---

## OutputPanel нәтижелері

Тест нәтижелері `OutputPanel` компонентінде көрсетіледі:

```
✅ Test 1 passed  →  got: 3, expected: 3
❌ Test 2 failed  →  got: 0, expected: 12
```

AI Ментор тест нәтижелерін контекст ретінде алады және студентке нақты нұсқаулар береді.

---

## Орталық айнымалылар

| Айнымалы | Орны | Сипаттама |
|---|---|---|
| `SUPABASE_URL` | Render (env) | Supabase жобасының URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Render (env) | RLS айналып өту кілті |
| `ANTHROPIC_API_KEY` | Render (env) | Claude AI ментор кілті |
