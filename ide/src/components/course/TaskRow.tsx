import { useNavigate } from 'react-router-dom'
import type { Task } from '../../data/mockCoursePlan'

interface TaskRowProps {
  task: Task
  courseSlug: string
}

export function TaskRow({ task, courseSlug }: TaskRowProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between py-2.5 pl-4 pr-2">
      <div className="flex items-center gap-3">
        {task.completed ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">
            ✓
          </span>
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300" />
        )}
        <span
          className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}
        >
          {task.title}
        </span>
      </div>

      {!task.completed && (
        <button
          onClick={() => navigate(`/ide/${courseSlug}-${task.id}`)}
          className="rounded-lg border border-indigo-200 px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Start Task
        </button>
      )}
    </div>
  )
}
