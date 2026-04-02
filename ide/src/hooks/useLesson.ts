import { useEffect, useState } from 'react'

export interface LessonData {
  id: string
  title: string
  theory_md: string | null
  module: {
    id: string
    title: string
    course: {
      id: string
      slug: string
      title: string
    }
  }
  tasks: { id: string; title: string }[]
}

const API = import.meta.env.VITE_API_URL

export function useLesson(lessonId: string | undefined) {
  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lessonId) return

    async function fetchLesson() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`${API}/api/lessons/${lessonId}/full`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: LessonData = await res.json()
        setLesson(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [lessonId])

  return { lesson, loading, error }
}
