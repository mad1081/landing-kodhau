---
title: "Дерекқор схемасы"
description: "PostgreSQL кестелері, өрістер, байланыстар және RLS саясаты"
---

# Дерекқор схемасы

**Дерекқор:** PostgreSQL (Supabase)  
**Жоба:** `vauvwjvotkoawembictz`

---

## ER диаграммасы

```
courses
  └── modules (course_id → courses.id)
        └── lessons (module_id → modules.id)
              ├── tasks (lesson_id → lessons.id)
              └── [theory_md — Markdown мазмұны]

profiles (id → auth.users.id)
```

---

## Кестелер

### `courses` — Курстар

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `title` | `text` NOT NULL | Курс атауы |
| `slug` | `text` UNIQUE | URL-дос атау (мысалы: `python`) |
| `description` | `text` | Қысқаша сипаттама |
| `icon` | `text` | Emoji немесе белгіше |
| `color` | `text` | HEX түсі (мысалы: `#3B82F6`) |
| `created_at` | `timestamptz` | Жасалған уақыты |

---

### `modules` — Модульдер

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `course_id` | `uuid` FK → `courses.id` | Курсқа сілтеме |
| `title` | `text` NOT NULL | Модуль атауы |
| `order_index` | `int` DEFAULT 0 | Курс ішіндегі реті |
| `created_at` | `timestamptz` | Жасалған уақыты |

---

### `lessons` — Сабақтар

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `module_id` | `uuid` FK → `modules.id` | Модульге сілтеме |
| `title` | `text` NOT NULL | Сабақ атауы |
| `theory_md` | `text` | Теориялық мазмұн (Markdown форматы) |
| `order_index` | `int` DEFAULT 0 | Модуль ішіндегі реті |
| `created_at` | `timestamptz` | Жасалған уақыты |

---

### `tasks` — Тапсырмалар

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `lesson_id` | `uuid` FK → `lessons.id` | Сабаққа сілтеме |
| `title` | `text` NOT NULL | Тапсырма атауы |
| `description` | `text` | Тапсырма шарты |
| `language` | `text` DEFAULT `'javascript'` | Бағдарламалау тілі: `javascript`, `python`, `postgresql` |
| `starter_code` | `text` | Студентке берілетін бастапқы код |
| `function_name` | `text` | Тексерілетін функция атауы (мысалы: `twoSum`) |
| `test_cases` | `jsonb` | Тест жағдайлары массиві (төменде формат) |
| `order_index` | `int` DEFAULT 0 | Сабақ ішіндегі реті |
| `created_at` | `timestamptz` | Жасалған уақыты |

**`test_cases` форматы:**
```json
[
  { "input": [1, 2], "expected": 3 },
  { "input": [-1, 5], "expected": 4 }
]
```

SQL тапсырмалары үшін:
```json
[
  {
    "setup_sql": "CREATE TABLE users (id INT, name TEXT); INSERT INTO users VALUES (1, 'Ali');",
    "query": "SELECT * FROM users WHERE id = 1;",
    "validation_sql": "SELECT COUNT(*) = 1 as ok FROM result;"
  }
]
```

---

### `profiles` — Пайдаланушы профильдері

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK FK → `auth.users.id` | Supabase Auth-пен байланыс |
| `email` | `text` | Электрондық пошта |
| `role` | `text` DEFAULT `'student'` | Рөл: `student`, `teacher`, `admin` |
| `created_at` | `timestamptz` | Тіркелген уақыты |

---

## Қауіпсіздік (RLS)

Supabase Row Level Security қосылған. Барлық жазу операциялары бэкенд арқылы жүргізіледі — сервер `service_role` кілтімен RLS-ті айналып өтеді. Тікелей клиент жазуына тыйым салынған.

| Кесте | Оқу | Жазу |
|---|---|---|
| `courses` | Барлығы | Тек бэкенд (admin/teacher) |
| `modules` | Барлығы | Тек бэкенд (admin/teacher) |
| `lessons` | Барлығы | Тек бэкенд (admin/teacher) |
| `tasks` | Барлығы | Тек бэкенд (admin/teacher) |
| `profiles` | Өз жазбасы | Тек бэкенд (admin) |
