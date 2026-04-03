import { useEffect, useState } from 'react'
import type { Course } from '../data/mockCourses'
import { mockCourses } from '../data/mockCourses'


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

const API = import.meta.env.VITE_API_URL

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!API) {
      setCourses(mockCourses)
      setLoading(false)
      return
    }

    async function fetchCourses() {
      try {
        const [coursesRes] = await Promise.all([
          fetch(`${API}/api/courses`),
        ])

        if (!coursesRes.ok) throw new Error(`HTTP ${coursesRes.status}`)
        const data: ApiCourse[] = await coursesRes.json()
        setCourses(data.map(course => ({
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          icon: course.icon,
          color: course.color,
          coverImage: course.cover_image,
          totalLessons: course.total_lessons ?? 0,
          completedLessons: 0, // per-course completed lessons needs separate endpoint
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

  return { courses, loading, error }
}
