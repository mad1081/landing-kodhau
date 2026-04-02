import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { IDELayout } from '../components/ide/IDELayout'
import { getTaskById } from '../data/taskStorage'
import type { Problem, TaskCategory } from '../data/mockProblem'

const API = import.meta.env.VITE_API_URL

function mapApiTask(t: any): Problem {
  return {
    id: t.id,
    category: (t.language ?? 'javascript') as TaskCategory,
    title: t.title,
    description: t.description ?? '',
    examples: [],
    constraints: [],
    starterCode: t.starter_code ?? '',
    functionName: t.function_name ?? undefined,
    testCases: t.test_cases ?? undefined,
  }
}

export function IDEPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const [problem, setProblem] = useState<Problem | null | 'not-found'>(null)

  useEffect(() => {
    if (!taskId) { setProblem('not-found'); return }

    // Try static/local tasks first
    const local = getTaskById(taskId)
    if (local) { setProblem(local); return }

    // Fall back to backend
    fetch(`${API}/api/tasks/${taskId}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setProblem(mapApiTask(data)))
      .catch(() => setProblem('not-found'))
  }, [taskId])

  if (problem === null) return null // loading
  if (problem === 'not-found') return <Navigate to="/" replace />
  return <IDELayout problem={problem} />
}
