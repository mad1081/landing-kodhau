import { useParams } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { ModuleSection } from '../components/course/ModuleSection'
import { useCoursePlan } from '../hooks/useCoursePlan'
import { getCourseProgress } from '../data/mockCoursePlan'

export function CoursePlanPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>()
  const { plan, loading, error } = useCoursePlan(courseSlug)

  return (
    <AppShell>
      <main className="max-w-[1200px] mx-auto px-8 py-16">

        {loading && (
          <div className="space-y-4">
            <div className="h-20 rounded-xl bg-slate-100 animate-pulse" />
            <div className="h-48 rounded-xl bg-slate-100 animate-pulse" />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm">Failed to load course: {error}</p>
        )}

        {!loading && plan && (
          <>
            <header className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center shadow-sm shrink-0 text-white font-bold text-xl"
                    style={{ background: plan.color ?? '#3525cd' }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h1
                      className="text-5xl font-bold tracking-tight mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#0d1c2f' }}
                    >
                      {plan.title}
                    </h1>
                    <p className="font-medium" style={{ color: '#464555' }}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-72 shrink-0">
                  {(() => {
                    const progress = getCourseProgress(plan)
                    return (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3525cd' }}>
                            {progress}% Completed
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#464555' }}>
                            Overall Progress
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: '#d5e3fd' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ background: 'linear-gradient(90deg, #3525cd 0%, #4f46e5 100%)', width: `${progress}%` }}
                          />
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </header>

            {plan.modules.length === 0 ? (
              <p className="text-slate-400 text-sm">No modules yet. Add them in the Admin panel.</p>
            ) : (
              <div className="space-y-20">
                {plan.modules.map((module, i) => (
                  <ModuleSection key={module.id} module={module} courseSlug={plan.slug} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </AppShell>
  )
}
