import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import type { MentorMessage, MentorLanguage } from '../../hooks/useMentor'
import type { MentorPhase } from '../../hooks/useAudioDrivenMentor'

const mentorMarkdownComponents: Components = {
  strong: (props) => (
    <span className="rounded-sm bg-indigo-50 px-1 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
      {props.children}
    </span>
  ),
  code: (props) => (
    <code className="rounded bg-slate-100 px-1 font-mono text-[0.9em] text-slate-800 dark:bg-slate-700 dark:text-slate-200">
      {props.children}
    </code>
  ),
}

interface MentorPanelProps {
  phase: MentorPhase
  displayedText: string
  messages: MentorMessage[]
  error: string | null
  voiceOn: boolean
  onToggleVoice: () => void
  onAskMentor: () => void
  onCancel: () => void
  askButtonDisabled: boolean
  language: MentorLanguage
  onLanguageChange: (lang: MentorLanguage) => void
}

const LANGUAGE_OPTIONS: { value: MentorLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
  { value: 'kk', label: 'Қазақша' },
]

function getStatusMessage(phase: MentorPhase): string {
  switch (phase) {
    case 'GENERATING_TEXT':
      return 'Analyzing your code…'
    case 'GENERATING_AUDIO':
    case 'AUDIO_READY':
      return 'Preparing response…'
    case 'SPEAKING_AND_RENDERING':
      return ''
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return ''
  }
}

export function MentorPanel({
  phase,
  displayedText,
  messages,
  error,
  voiceOn,
  onToggleVoice,
  onAskMentor,
  onCancel,
  askButtonDisabled,
  language,
  onLanguageChange,
}: MentorPanelProps) {
  const statusMessage = getStatusMessage(phase)
  const showTypewriter = phase === 'SPEAKING_AND_RENDERING'
  const subtitleText = displayedText

  return (
    <div className="flex h-full flex-col overflow-hidden border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-2 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          AI Mentor
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as MentorLanguage)}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Mentor response language"
            disabled={askButtonDisabled}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onAskMentor}
            disabled={askButtonDisabled}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Ask mentor
          </button>
          {askButtonDisabled && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-300"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={onToggleVoice}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Voice {voiceOn ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      {subtitleText !== '' && (phase === 'SPEAKING_AND_RENDERING' || phase === 'COMPLETED') && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Subtitles
          </p>
          <div className="mt-1 text-sm text-slate-700 dark:text-slate-300 [&_p]:my-0">
            <ReactMarkdown components={mentorMarkdownComponents}>{subtitleText}</ReactMarkdown>
            {phase === 'SPEAKING_AND_RENDERING' && (
              <span className="inline-block h-4 w-0.5 animate-pulse bg-slate-500 align-middle" aria-hidden />
            )}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <p className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {statusMessage && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {statusMessage}
          </p>
        )}
        <div className="space-y-3">
          {showTypewriter && displayedText && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-800 dark:border-blue-900 dark:bg-slate-800 dark:text-slate-200 [&_p]:my-0">
              <ReactMarkdown components={mentorMarkdownComponents}>{displayedText}</ReactMarkdown>
              {phase === 'SPEAKING_AND_RENDERING' && (
                <span className="inline-block h-4 w-0.5 animate-pulse bg-slate-600 align-middle" aria-hidden />
              )}
            </div>
          )}
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
                {msg.role === 'mentor' ? (
                  <span className="[&_p]:my-0">
                    <ReactMarkdown components={mentorMarkdownComponents}>{msg.text}</ReactMarkdown>
                  </span>
                ) : (
                  msg.text
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
