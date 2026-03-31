import { CircularProgress } from './CircularProgress'
import { TaskRow } from './TaskRow'
import type { Lesson } from '../../data/mockCoursePlan'
import { getLessonProgress } from '../../data/mockCoursePlan'

interface LessonSectionProps {
  lesson: Lesson
  courseSlug: string
}

export function LessonSection({ lesson, courseSlug }: LessonSectionProps) {
  const progress = getLessonProgress(lesson)

  return (
    <div className="rounded-xl border border-slate-100 bg-white">
      {/* Lesson header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <span
          className="text-sm font-semibold text-[#0d1c2f]"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {lesson.title}
        </span>
        <CircularProgress percent={progress} size={36} strokeWidth={3} />
      </div>

      {/* Tasks */}
      <div className="divide-y divide-slate-50">
        {lesson.tasks.map((task) => (
          <TaskRow key={task.id} task={task} courseSlug={courseSlug} />
        ))}
      </div>
    </div>
  )
}
