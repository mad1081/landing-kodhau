import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

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

export function useLesson(lessonId: string | undefined) {
  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lessonId) return

    async function fetch() {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('lessons')
        .select(`
          id, title, theory_md,
          module:modules (
            id, title,
            course:courses (id, slug, title)
          ),
          tasks (id, title, order_index)
        `)
        .eq('id', lessonId)
        .single()

      if (err || !data) {
        setError(err?.message ?? 'Lesson not found')
        setLoading(false)
        return
      }

      setLesson({
        ...data,
        tasks: (data.tasks as any[] ?? []).sort((a, b) => a.order_index - b.order_index),
        module: data.module as any,
      })
      setLoading(false)
    }

    fetch()
  }, [lessonId])

  return { lesson, loading, error }
}
