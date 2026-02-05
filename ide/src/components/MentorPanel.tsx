import type { MentorMessage } from '../hooks/useMentor'

interface MentorPanelProps {
  messages: MentorMessage[]
  loading: boolean
  voiceOn: boolean
  onToggleVoice: () => void
  subtitleText: string
  onAskMentor: () => void
  askButtonDisabled: boolean
}

export function MentorPanel({
  messages,
  loading,
  voiceOn,
  onToggleVoice,
  subtitleText,
  onAskMentor,
  askButtonDisabled,
}: MentorPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-2 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          AI Mentor
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAskMentor}
            disabled={askButtonDisabled}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Ask mentor
          </button>
          <button
            type="button"
            onClick={onToggleVoice}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Voice {voiceOn ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      {subtitleText && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Subtitles
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            {subtitleText}
          </p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Analyzing your code…
          </p>
        )}
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.role === 'system'
                  ? 'rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400'
                  : 'rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-800 dark:border-blue-900 dark:bg-slate-800 dark:text-slate-200'
              }
            >
              {msg.role === 'system' && (
                <span className="mr-2 text-xs font-medium text-slate-500 dark:text-slate-500">
                  System:
                </span>
              )}
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
