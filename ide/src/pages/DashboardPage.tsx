import { useEffect, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { CourseCard } from '../components/dashboard/CourseCard'
import { useCourses } from '../hooks/useCourses'
import { useLang } from '../i18n/LangContext'
import { supabase } from '../lib/supabase'

const API = import.meta.env.VITE_API_URL

export function DashboardPage() {
  const { courses, loading, error } = useCourses()
  const { t } = useLang()
  const [tasksSolved, setTasksSolved] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token
      if (!token) return
      fetch(`${API}/api/progress`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then((ids: string[]) => setTasksSolved(ids.length))
        .catch(() => {})
    })
  }, [])

  return (
    <AppShell>
      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t('welcomeBack')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('pickUp')}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
          {[
            { label: t('courses'), value: courses.length },
            { label: t('lessonsCompleted'), value: courses.reduce((s, c) => s + c.totalLessons, 0) },
            { label: t('tasksSolved'), value: tasksSolved },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white border border-slate-100 px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-indigo-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-base font-semibold text-[#0d1c2f] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {t('allCourses')}
        </h2>

        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mb-4">{t('couldNotLoad')}: {error}</p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
