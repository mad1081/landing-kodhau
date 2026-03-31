import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Course } from '../data/mockCourses'
import { mockCourses } from '../data/mockCourses'

// Matches the Supabase column names (snake_case) → our Course interface (camelCase)
interface SupabaseCourse {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  cover_image: string
  total_lessons: number
  completed_lessons: number
}

function mapCourse(row: SupabaseCourse): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    icon: row.icon,
    color: row.color,
    coverImage: row.cover_image,
    totalLessons: row.total_lessons,
    completedLessons: row.completed_lessons,
  }
}

const isSupabaseConfigured =
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fall back to mock data if Supabase isn't wired up yet
    if (!isSupabaseConfigured) {
      setCourses(mockCourses)
      setLoading(false)
      return
    }

    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        setError(error.message)
        setCourses(mockCourses) // fallback
      } else {
        setCourses((data as SupabaseCourse[]).map(mapCourse))
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  return { courses, loading, error }
}
