import { useNavigate } from 'react-router-dom'
import type { Task } from '../../data/mockCoursePlan'
import { useLang } from '../../i18n/LangContext'

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {task.completed ? (
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{ background: '#005338' }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span
            className="flex h-5 w-5 shrink-0 rounded-full border-2"
            style={{ borderColor: '#c7c4d8' }}
          />
        )}
        <span
          className="text-sm leading-snug"
          style={{
            color: task.completed ? '#777587' : '#0d1c2f',
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </span>
      </div>

      {task.completed ? (
        <span
          className="ml-4 shrink-0 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: '#005338' }}
        >
          {t('completed')}
        </span>
      ) : (
        <button
          onClick={() => navigate(`/ide/${task.id}`)}
          className="ml-4 shrink-0 border px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all hover:text-white"
          style={{
            borderColor: 'rgba(53,37,205,0.2)',
            color: '#3525cd',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = '#3525cd'
            el.style.color = '#ffffff'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = '#3525cd'
          }}
        >
          {t('startTask')}
        </button>
      )}
    </div>
  )
}
