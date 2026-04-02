# KodHau Backend API

## Base URL
`http://localhost:5000` (development)
`https://your-render-url.onrender.com` (production)

## Authentication
All endpoints except `/health` require a JWT token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

---

## Endpoints

### Courses
- `GET /api/courses` — List all courses
- `GET /api/courses/:id` — Get single course
- `POST /api/courses` — Create (admin/teacher)
- `PUT /api/courses/:id` — Update (admin/teacher)
- `DELETE /api/courses/:id` — Delete (admin)

### Modules
- `GET /api/courses/:courseId/modules` — List modules for course
- `POST /api/modules` — Create (admin/teacher)
- `PUT /api/modules/:id` — Update (admin/teacher)
- `DELETE /api/modules/:id` — Delete (admin)

### Lessons
- `GET /api/modules/:moduleId/lessons` — List lessons for module
- `GET /api/lessons/:id` — Get single lesson
- `POST /api/lessons` — Create (admin/teacher)
- `PUT /api/lessons/:id` — Update (admin/teacher)
- `DELETE /api/lessons/:id` — Delete (admin)

### Tasks
- `GET /api/lessons/:lessonId/tasks` — List tasks for lesson
- `GET /api/tasks/:id` — Get single task
- `POST /api/tasks` — Create (admin/teacher)
- `PUT /api/tasks/:id` — Update (admin/teacher)
- `DELETE /api/tasks/:id` — Delete (admin)

### Users
- `GET /api/profile` — Get current user profile (authenticated)
- `GET /api/users` — List all users (admin)
- `GET /api/users/:id` — Get user (admin)
- `PUT /api/users/:id` — Update user role (admin)

### Health
- `GET /health` — Server status check

---

## Example: Create a Course

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "JavaScript 101",
    "slug": "javascript-101",
    "description": "Learn JS basics",
    "icon": "JS",
    "color": "#f59e0b"
  }'
```

---

## Role-based Access

| Role | Can READ | Can WRITE (POST/PUT) | Can DELETE |
|------|----------|---------------------|-----------|
| student | courses, modules, lessons, tasks | own profile | — |
| teacher | all | courses, modules, lessons, tasks | — |
| admin | all | all | all |
