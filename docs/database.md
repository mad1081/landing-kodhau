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
              │     └── user_task_progress (task_id → tasks.id, user_id → auth.users)
              └── [theory_md — Markdown мазмұны]

groups (teacher_id → auth.users)
  └── group_members (group_id → groups.id, user_id → auth.users)

auth.users (Supabase Auth — role stored in raw_user_meta_data.role)
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

### `auth.users` — Пайдаланушылар (Supabase Auth)

Пайдаланушылар `auth.users` жүйелік кестесінде сақталады. Рөл `raw_user_meta_data.role` өрісінде (`student`, `teacher`, `admin`). Бэкенд `supabase.auth.admin` API арқылы жаңартады.

---

### `user_task_progress` — Тапсырма прогресі

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `user_id` | `uuid` FK → `auth.users` | Пайдаланушы |
| `task_id` | `uuid` FK → `tasks.id` | Орындалған тапсырма |
| `completed_at` | `timestamptz` | Орындалған уақыты |

**Бірегей шектеу:** `(user_id, task_id)` — бір пайдаланушы бір тапсырманы бір рет белгілейді.

**RLS:** пайдаланушы тек өз жазбаларын оқи және жаза алады.

---

### `groups` — Топтар

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `name` | `text` NOT NULL | Топ атауы (мысалы: `9A сынып`) |
| `teacher_id` | `uuid` FK → `auth.users` | Жауапты мұғалім |
| `created_at` | `timestamptz` | Жасалған уақыты |

---

### `group_members` — Топ мүшелері

| Өріс | Тип | Сипаттама |
|---|---|---|
| `id` | `uuid` PK | Бірегей идентификатор |
| `group_id` | `uuid` FK → `groups.id` | Топ |
| `user_id` | `uuid` FK → `auth.users` | Студент |
| `joined_at` | `timestamptz` DEFAULT `now()` | Қосылған уақыты |

**Бірегей шектеу:** `(group_id, user_id)`

**RLS:** пайдаланушы тек өзі кіретін топ жазбаларын оқи алады; жазуды тек бэкенд жүргізеді.

---

## Қауіпсіздік (RLS)

Supabase Row Level Security қосылған. Барлық жазу операциялары бэкенд арқылы жүргізіледі — сервер `service_role` кілтімен RLS-ті айналып өтеді.

| Кесте | Оқу | Жазу |
|---|---|---|
| `courses` | Барлығы | Тек бэкенд (admin/teacher) |
| `modules` | Барлығы | Тек бэкенд (admin/teacher) |
| `lessons` | Барлығы | Тек бэкенд (admin/teacher) |
| `tasks` | Барлығы | Тек бэкенд (admin/teacher) |
| `user_task_progress` | Өз жазбасы | Өз жазбасы (upsert) |
| `groups` | Барлығы | Тек бэкенд (admin/teacher) |
| `group_members` | Өз жазбасы | Тек бэкенд (admin/teacher) |
