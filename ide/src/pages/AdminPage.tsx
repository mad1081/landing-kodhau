import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addTask, deleteAdminTask, getAdminTasks } from '../data/taskStorage'
import type { TaskCategory } from '../data/mockProblem'

export function AdminPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory>('javascript')
  const [added, setAdded] = useState(false)
  const [adminTasks, setAdminTasks] = useState(getAdminTasks())

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = title.trim()
      if (!trimmed) return
      addTask(trimmed, category)
      setTitle('')
      setAdded(true)
      setAdminTasks(getAdminTasks())
      setTimeout(() => setAdded(false), 2000)
    },
    [title, category]
  )

  const handleDelete = useCallback((id: string) => {
    deleteAdminTask(id)
    setAdminTasks(getAdminTasks())
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Add task
          </h1>
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            ← Back to tasks
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <label htmlFor="task-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Task name
          </label>
          <input
            id="task-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Reverse a string"
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
          />
          <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <div className="mt-2 flex gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === 'javascript'}
                onChange={() => setCategory('javascript')}
                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">JavaScript</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === 'postgresql'}
                onChange={() => setCategory('postgresql')}
                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">PostgreSQL</span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500"
          >
            Add task
          </button>
          {added && (
            <p className="mt-3 text-sm text-green-600 dark:text-green-400">Task added.</p>
          )}
        </form>

        {adminTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              Your added tasks
            </h2>
            <ul className="mt-3 space-y-2">
              {adminTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/ide/${task.id}`)}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
