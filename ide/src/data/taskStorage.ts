import type { Problem, TaskCategory } from './mockProblem'
import { STATIC_TASKS } from './taskList'

const STORAGE_KEY = 'kodhau-ide-admin-tasks'

const DEFAULT_STARTER_CODE: Record<TaskCategory, string> = {
  javascript: '// Your code here\n',
  python: '# Your code here\n',
  postgresql: '-- Your SQL here\n',
}

const PLACEHOLDER_EXAMPLE = { input: '…', output: '…' }

function getAdminTasksFromStorage(): Problem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Problem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getAdminTasks(): Problem[] {
  return getAdminTasksFromStorage()
}

export function getMergedTasks(): Problem[] {
  const admin = getAdminTasksFromStorage()
  return [...STATIC_TASKS, ...admin]
}

export function getTaskById(id: string): Problem | undefined {
  const merged = getMergedTasks()
  return merged.find((t) => t.id === id)
}

export function addTask(title: string, category: TaskCategory): Problem {
  const admin = getAdminTasksFromStorage()
  const id = `local-${crypto.randomUUID()}`
  const newTask: Problem = {
    id,
    category,
    title,
    description: 'Describe the task…',
    examples: [PLACEHOLDER_EXAMPLE],
    constraints: [],
    starterCode: DEFAULT_STARTER_CODE[category],
  }
  const next = [...admin, newTask]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return newTask
}

export function deleteAdminTask(id: string): void {
  if (!id.startsWith('local-')) return
  const admin = getAdminTasksFromStorage().filter((t) => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(admin))
}
