import { Link } from 'react-router-dom'
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
    <div
      className="bg-white p-8 rounded-xl flex items-start gap-8"
      style={{ border: '1px solid rgba(199,196,216,0.15)' }}
    >
      {/* Circular progress ring */}
      <div className="shrink-0">
        <CircularProgress percent={progress} size={64} strokeWidth={3} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/lesson/${lesson.id}`}
          className="block text-xl font-bold mb-6 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#0d1c2f' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#3525cd')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#0d1c2f')}
        >
          {lesson.title}
        </Link>

        <div className="space-y-4">
          {lesson.tasks.map(task => (
            <TaskRow key={task.id} task={task} courseSlug={courseSlug} />
          ))}
        </div>
      </div>
    </div>
  )
}
