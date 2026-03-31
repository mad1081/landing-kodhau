import { LessonSection } from './LessonSection'
import type { Module } from '../../data/mockCoursePlan'

interface ModuleSectionProps {
  module: Module
  courseSlug: string
}

export function ModuleSection({ module, courseSlug }: ModuleSectionProps) {
  const allTasks = module.lessons.flatMap(l => l.tasks)
  const completedTasks = allTasks.filter(t => t.completed).length
  const isInProgress = completedTasks > 0 && completedTasks < allTasks.length

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8f9ff] overflow-hidden">
      {/* Module header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
        <h3
          className="text-base font-semibold text-[#0d1c2f]"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {module.title}
        </h3>
        {module.locked ? (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            🔒 Locked
          </span>
        ) : isInProgress ? (
          <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            In Progress
          </span>
        ) : completedTasks === allTasks.length && allTasks.length > 0 ? (
          <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            ✓ Complete
          </span>
        ) : null}
      </div>

      {/* Locked state */}
      {module.locked ? (
        <div className="flex items-start gap-3 px-5 py-5 text-slate-400">
          <span className="text-xl mt-0.5">🔒</span>
          <p className="text-sm leading-relaxed">{module.lockedMessage}</p>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {module.lessons.map((lesson) => (
            <LessonSection key={lesson.id} lesson={lesson} courseSlug={courseSlug} />
          ))}
        </div>
      )}
    </div>
  )
}
