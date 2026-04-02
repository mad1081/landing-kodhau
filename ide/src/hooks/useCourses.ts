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
}

function mapCourse(row: ApiCourse): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    icon: row.icon,
    color: row.color,
    coverImage: row.cover_image,
    totalLessons: 0,
    completedLessons: 0,
  }
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
        const res = await fetch(`${API}/api/courses`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ApiCourse[] = await res.json()
        setCourses(data.map(mapCourse))
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
