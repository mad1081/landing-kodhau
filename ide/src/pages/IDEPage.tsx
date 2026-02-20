import { Navigate, useParams } from 'react-router-dom'
import { IDELayout } from '../components/IDELayout'
import { getTaskById } from '../data/taskStorage'

export function IDEPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const task = taskId ? getTaskById(taskId) : undefined

  if (!task) {
    return <Navigate to="/" replace />
  }

  return <IDELayout problem={task} />
}
