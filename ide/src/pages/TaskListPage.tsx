import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMergedTasks } from '../data/taskStorage'
import type { TaskCategory } from '../data/mockProblem'

function CategoryBadge({ category }: { category: TaskCategory }) {
  const isJs = category === 'javascript'
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        isJs
          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
          : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200'
      }`}
    >
      {isJs ? 'JavaScript' : 'PostgreSQL'}
    </span>
  )
}

export function TaskListPage() {
  const navigate = useNavigate()
  const tasks = useMemo(() => getMergedTasks(), [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Choose a task
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Select a task to open the IDE and solve it with the AI mentor.
        </p>
        <ul className="mt-6 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => navigate(`/ide/${task.id}`)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700/80"
              >
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {task.title}
                </span>
                <CategoryBadge category={task.category} />
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            No tasks yet. Add one from the admin panel.
          </p>
        )}
        <div className="mt-8">
          <Link
            to="/admin"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Admin – Add task
          </Link>
        </div>
      </div>
    </div>
  )
}
