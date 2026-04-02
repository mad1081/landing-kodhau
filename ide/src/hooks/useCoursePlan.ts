import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { CoursePlan } from '../data/mockCoursePlan'

export function useCoursePlan(slug: string | undefined) {
  const [plan, setPlan] = useState<CoursePlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function fetch() {
      setLoading(true)
      setError(null)

      const { data: course, error: courseErr } = await supabase
        .from('courses')
        .select('id, slug, title, description, icon, color')
        .eq('slug', slug)
        .single()

      if (courseErr || !course) {
        setError(courseErr?.message ?? 'Course not found')
        setLoading(false)
        return
      }

      const { data: modules, error: modulesErr } = await supabase
        .from('modules')
        .select(`
          id, title, order_index,
          lessons (
            id, title, order_index,
            tasks (id, title, order_index)
          )
        `)
        .eq('course_id', course.id)
        .order('order_index')

      if (modulesErr) {
        setError(modulesErr.message)
        setLoading(false)
        return
      }

      // Get current user's progress
      const { data: { user } } = await supabase.auth.getUser()
      let completedLessonIds: Set<string> = new Set()
      if (user) {
        const { data: progress } = await supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
        completedLessonIds = new Set((progress ?? []).map((p: { lesson_id: string }) => p.lesson_id))
      }

      // Map to CoursePlan shape that existing UI components expect
      const mapped: CoursePlan = {
        slug: course.slug,
        title: course.title,
        description: course.description,
        icon: course.icon ?? '📚',
        color: course.color ?? '#3525cd',
        modules: (modules ?? []).map(m => ({
          id: m.id,
          title: m.title,
          locked: false,
          lessons: (m.lessons as any[] ?? [])
            .sort((a, b) => a.order_index - b.order_index)
            .map(l => ({
              id: l.id,
              title: l.title,
              tasks: (l.tasks as any[] ?? [])
                .sort((a: any, b: any) => a.order_index - b.order_index)
                .map((t: any) => ({
                  id: t.id,
                  title: t.title,
                  completed: completedLessonIds.has(l.id),
                })),
            })),
        })),
      }

      setPlan(mapped)
      setLoading(false)
    }

    fetch()
  }, [slug])

  return { plan, loading, error }
}
