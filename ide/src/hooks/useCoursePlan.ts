import { useEffect, useState } from 'react'
import type { CoursePlan } from '../data/mockCoursePlan'

const API = import.meta.env.VITE_API_URL

export function useCoursePlan(slug: string | undefined) {
  const [plan, setPlan] = useState<CoursePlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function fetchPlan() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`${API}/api/courses/slug/${slug}/plan`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const { course, modules } = await res.json()

        const mapped: CoursePlan = {
          slug: course.slug,
          title: course.title,
          description: course.description,
          icon: course.icon ?? '📚',
          color: course.color ?? '#3525cd',
          modules: (modules ?? []).map((m: any) => ({
            id: m.id,
            title: m.title,
            locked: false,
            lessons: (m.lessons as any[] ?? [])
              .sort((a: any, b: any) => a.order_index - b.order_index)
              .map((l: any) => ({
                id: l.id,
                title: l.title,
                tasks: (l.tasks as any[] ?? [])
                  .sort((a: any, b: any) => a.order_index - b.order_index)
                  .map((t: any) => ({
                    id: t.id,
                    title: t.title,
                    completed: false,
                  })),
              })),
          })),
        }

        setPlan(mapped)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()
  }, [slug])

  return { plan, loading, error }
}
