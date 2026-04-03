import { useEffect, useState } from 'react'
import type { Course } from '../data/mockCourses'
import { mockCourses } from '../data/mockCourses'
import { supabase } from '../lib/supabase'

interface ApiCourse {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  cover_image: string
  total_lessons: number
}

interface ProgressData {
  taskIds: string[]
  lessonIds: string[]
  courseLessons: Record<string, number>
}

const API = import.meta.env.VITE_API_URL

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tasksSolved, setTasksSolved] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)

  useEffect(() => {
    if (!API) {
      setCourses(mockCourses)
      setLoading(false)
      return
    }

    async function fetchCourses() {
      try {
        const { data: session } = await supabase.auth.getSession()
        const token = session.session?.access_token

        const [coursesRes, progressRes] = await Promise.all([
          fetch(`${API}/api/courses`),
          fetch(`${API}/api/progress`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
        ])

        if (!coursesRes.ok) throw new Error(`HTTP ${coursesRes.status}`)
        const data: ApiCourse[] = await coursesRes.json()

        let progress: ProgressData = { taskIds: [], lessonIds: [], courseLessons: {} }
        if (progressRes.ok) {
          const raw = await progressRes.json()
          // Handle both old format (array) and new format (object)
          progress = Array.isArray(raw)
            ? { taskIds: raw, lessonIds: [], courseLessons: {} }
            : raw
        }

        setTasksSolved(progress.taskIds.length)
        setLessonsCompleted(progress.lessonIds.length)

        setCourses(data.map(course => ({
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          icon: course.icon,
          color: course.color,
          coverImage: course.cover_image,
          totalLessons: course.total_lessons ?? 0,
          completedLessons: progress.courseLessons[course.id] ?? 0,
        })))
      } catch (e: any) {
        setError(e.message)
        setCourses(mockCourses)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error, tasksSolved, lessonsCompleted }
}
