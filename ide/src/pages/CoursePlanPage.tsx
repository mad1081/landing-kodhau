import { useParams, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { ModuleSection } from '../components/course/ModuleSection'
import { mockCoursePlans, getCourseProgress } from '../data/mockCoursePlan'

export function CoursePlanPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>()
  const navigate = useNavigate()
  const plan = courseSlug ? mockCoursePlans[courseSlug] : undefined

  if (!plan) {
    return (
      <AppShell>
        <div className="flex h-full items-center justify-center text-slate-400 text-sm">
          Course not found.
        </div>
      </AppShell>
    )
  }

  const progress = getCourseProgress(plan)

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-3xl">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Course header */}
        <div className="mb-8 flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white font-bold text-lg"
            style={{ backgroundColor: plan.color }}
          >
            {plan.icon}
          </div>
          <div className="flex-1">
            <h1
              className="text-xl font-bold text-[#0d1c2f]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {plan.title}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">{plan.description}</p>

            {/* Overall progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Overall Progress</span>
                <span>{progress}% Completed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {plan.modules.map((module) => (
            <ModuleSection key={module.id} module={module} courseSlug={plan.slug} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
