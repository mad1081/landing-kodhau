# API эндпоинттері

**Base URL (өндіріс):** `https://kodhau-backend.onrender.com`  
**Base URL (жергілікті):** `http://localhost:5000`

---

## Аутентификация

Жазуды немесе жойуды талап ететін барлық эндпоинттер `Authorization` тақырыбын талап етеді:

```
Authorization: Bearer <supabase_jwt_token>
```

Токен Supabase Auth арқылы автоматты түрде беріледі. Бэкенд токеннен рөлді оқиды (`user_metadata.role`): `student`, `teacher`, `admin`.

---

## Денсаулық тексеру

```
GET /health
```

**Жауап:**
```json
{ "ok": true }
```

---

## Курстар `/api/courses`

### Барлық курстарды алу

```
GET /api/courses
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "Python негіздері",
    "slug": "python",
    "description": "Python тілін нөлден үйрену",
    "icon": "🐍",
    "color": "#3B82F6",
    "created_at": "2025-01-01T00:00:00Z"
  }
]
```

---

### Жеке курс алу

```
GET /api/courses/:id
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK` — жоғарыдағы объект

---

### Курс жоспарын алу (толық ұялы)

```
GET /api/courses/slug/:slug/plan
```

**Аутентификация:** талап етілмейді

**Мысал:** `GET /api/courses/slug/python/plan`

**Жауап:** `200 OK`
```json
{
  "course": {
    "id": "uuid",
    "slug": "python",
    "title": "Python негіздері",
    "description": "...",
    "icon": "🐍",
    "color": "#3B82F6"
  },
  "modules": [
    {
      "id": "uuid",
      "title": "01: Айнымалылар",
      "order_index": 1,
      "lessons": [
        {
          "id": "uuid",
          "title": "Айнымалылар мен типтер",
          "order_index": 1,
          "tasks": [
            { "id": "uuid", "title": "twoSum", "order_index": 1 }
          ]
        }
      ]
    }
  ]
}
```

**Қате:** `404 Not Found`
```json
{ "error": "Course not found" }
```

---

### Курс жасау

```
POST /api/courses
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:**
```json
{
  "title": "JavaScript",
  "slug": "javascript",
  "description": "JS нөлден жоғары деңгейге",
  "icon": "⚡",
  "color": "#F59E0B"
}
```

**Жауап:** `201 Created` — жасалған курс объектісі

---

### Курс жаңарту

```
PUT /api/courses/:id
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:** жасаумен бірдей өрістер (бөлшектеп жіберуге болады)

**Жауап:** `200 OK` — жаңартылған курс объектісі

---

### Курс жою

```
DELETE /api/courses/:id
```

**Аутентификация:** тек `admin`

**Жауап:** `200 OK`
```json
{ "ok": true }
```

---

## Модульдер `/api/modules`

### Курс модульдерін алу

```
GET /api/courses/:courseId/modules
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK`
```json
[
  {
    "id": "uuid",
    "course_id": "uuid",
    "title": "01: Python негіздері",
    "order_index": 1,
    "created_at": "..."
  }
]
```

---

### Модуль жасау

```
POST /api/modules
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:**
```json
{
  "course_id": "uuid",
  "title": "02: Тізімдер мен сөздіктер",
  "order_index": 2
}
```

**Жауап:** `201 Created`

---

### Модуль жаңарту

```
PUT /api/modules/:id
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:**
```json
{
  "title": "Жаңа атау",
  "order_index": 3
}
```

---

### Модуль жою

```
DELETE /api/modules/:id
```

**Аутентификация:** тек `admin`

---

## Сабақтар `/api/lessons`

### Модуль сабақтарын алу

```
GET /api/modules/:moduleId/lessons
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK`
```json
[
  {
    "id": "uuid",
    "module_id": "uuid",
    "title": "Айнымалылар",
    "theory_md": "# Айнымалылар\n\n...",
    "order_index": 1
  }
]
```

---

### Жеке сабақ алу

```
GET /api/lessons/:id
```

**Аутентификация:** талап етілмейді

---

### Толық сабақ алу (ұялы)

```
GET /api/lessons/:id/full
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK`
```json
{
  "id": "uuid",
  "title": "Айнымалылар мен Арифметикалық Операторлар",
  "theory_md": "# Теория мазмұны (Markdown)",
  "module": {
    "id": "uuid",
    "title": "Module 01: Python негіздері",
    "course": {
      "id": "uuid",
      "slug": "python",
      "title": "Python негіздері"
    }
  },
  "tasks": [
    { "id": "uuid", "title": "twoSum", "order_index": 1 }
  ]
}
```

---

### Сабақ жасау

```
POST /api/lessons
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:**
```json
{
  "module_id": "uuid",
  "title": "Тізімдер",
  "theory_md": "# Тізімдер\n\nPython-да тізімдер...",
  "order_index": 2
}
```

**Жауап:** `201 Created`

---

### Сабақ жаңарту

```
PUT /api/lessons/:id
```

**Аутентификация:** `admin` немесе `teacher`

---

### Сабақ жою

```
DELETE /api/lessons/:id
```

**Аутентификация:** тек `admin`

---

## Тапсырмалар `/api/tasks`

### Сабақ тапсырмаларын алу

```
GET /api/lessons/:lessonId/tasks
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK`
```json
[
  {
    "id": "uuid",
    "lesson_id": "uuid",
    "title": "twoSum",
    "description": "Екі санның қосындысы...",
    "language": "python",
    "starter_code": "def twoSum(a, b):\n    pass",
    "function_name": "twoSum",
    "test_cases": [
      { "input": [1, 2], "expected": 3 },
      { "input": [5, 7], "expected": 12 }
    ],
    "order_index": 1
  }
]
```

---

### Жеке тапсырма алу

```
GET /api/tasks/:id
```

**Аутентификация:** талап етілмейді

**Жауап:** `200 OK` — жоғарыдағы объект

---

### Тапсырма жасау

```
POST /api/tasks
```

**Аутентификация:** `admin` немесе `teacher`

**Сұрау денесі:**
```json
{
  "lesson_id": "uuid",
  "title": "isEven",
  "description": "Санның жұп екенін тексер",
  "language": "python",
  "starter_code": "def isEven(n):\n    pass",
  "function_name": "isEven",
  "test_cases": [
    { "input": [2], "expected": true },
    { "input": [3], "expected": false }
  ],
  "order_index": 1
}
```

**Жауап:** `201 Created`

---

### Тапсырма жаңарту

```
PUT /api/tasks/:id
```

**Аутентификация:** `admin` немесе `teacher`

---

### Тапсырма жою

```
DELETE /api/tasks/:id
```

**Аутентификация:** тек `admin`

---

## Пайдаланушылар `/api/users` және `/api/profile`

### Өз профилін алу

```
GET /api/profile
```

**Аутентификация:** кез-келген тіркелген пайдаланушы

**Жауап:** `200 OK`
```json
{
  "id": "uuid",
  "email": "student@example.com",
  "role": "student",
  "created_at": "..."
}
```

---

### Барлық пайдаланушыларды алу

```
GET /api/users
```

**Аутентификация:** тек `admin`

---

### Жеке пайдаланушы алу

```
GET /api/users/:id
```

**Аутентификация:** тек `admin`

---

### Пайдаланушы рөлін жаңарту

```
PUT /api/users/:id
```

**Аутентификация:** тек `admin`

**Сұрау денесі:**
```json
{ "role": "teacher" }
```

**Жауап:** `200 OK` — жаңартылған профиль

---

## Код орындау `/api/run`

### Код іске қосу

```
POST /api/run
```

**Аутентификация:** талап етілмейді

**Сұрау денесі:**
```json
{
  "language": "python",
  "files": [
    {
      "content": "def twoSum(a, b):\n    return a + b\n\nprint(twoSum(1, 2))"
    }
  ]
}
```

**Қолдау тілдері:** `javascript`, `python`

**Жауап:** `200 OK`
```json
{
  "run": {
    "stdout": "3\n",
    "stderr": ""
  }
}
```

**Қателер:**

| Код | Себеп |
|---|---|
| `400` | Қолдау көрсетілмейтін тіл немесе код жоқ |
| `500` | `RAPIDAPI_KEY` орнатылмаған немесе Judge0 қатесі |

---

## Қате форматы

Барлық қателер бірдей форматта қайтарылады:

```json
{ "error": "Қате сипаттамасы" }
```

| HTTP коды | Мағынасы |
|---|---|
| `400` | Дұрыс емес сұрау |
| `401` | Токен жоқ немесе жарамсыз |
| `403` | Рұқсат жоқ (рөл жеткіліксіз) |
| `404` | Ресурс табылмады |
| `500` | Сервер қатесі |
