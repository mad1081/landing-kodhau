import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProblemPanel } from './ProblemPanel'
import { CodeEditor, type EditorLanguage } from './CodeEditor'
import { MentorPanel } from './MentorPanel'
import {
  OutputPanel,
  getDefaultOutputLines,
  type OutputLine,
} from './OutputPanel'
import type { Problem } from '../../data/mockProblem'
import { useAudioDrivenMentor } from '../../hooks/useAudioDrivenMentor'
import { useVoice } from '../../hooks/useVoice'
import type { MentorLanguage } from '../../hooks/useMentor'

const THEME_STORAGE_KEY = 'kodhau-ide-theme'
const MENTOR_LANGUAGE_KEY = 'kodhau-ide-mentor-language'

function getInitialTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    // ignore
  }
  return 'light'
}

function getInitialMentorLanguage(): MentorLanguage {
  try {
    const stored = localStorage.getItem(MENTOR_LANGUAGE_KEY)
    if (stored === 'en' || stored === 'ru' || stored === 'kk') return stored
  } catch {
    // ignore
  }
  return 'en'
}

interface IDELayoutProps {
  problem: Problem
}

export function IDELayout({ problem }: IDELayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)
  const [mentorLanguage, setMentorLanguage] = useState<MentorLanguage>(getInitialMentorLanguage)
  const [code, setCode] = useState(problem.starterCode)
  const [outputLines] = useState<OutputLine[]>(getDefaultOutputLines)

  useEffect(() => {
    setCode(problem.starterCode)
  }, [problem.id, problem.starterCode])

  const isDark = theme === 'dark'
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const editorLanguage: EditorLanguage = problem.category === 'postgresql' ? 'sql' : 'javascript'

  const { voiceOn, toggleVoice } = useVoice()
  const mentorParams = {
    problemTitle: problem.title,
    problemDescription: problem.description,
    examples: problem.examples.map((e) => ({ input: e.input, output: e.output })),
    constraints: problem.constraints,
    language: mentorLanguage,
  }
  const {
    phase,
    displayedText,
    messages,
    error,
    isBusy,
    askMentor,
    cancel,
  } = useAudioDrivenMentor(mentorParams, voiceOn)

  const handleAskMentor = useCallback(() => {
    askMentor(code)
  }, [askMentor, code])

  const handleMentorLanguageChange = useCallback((lang: MentorLanguage) => {
    setMentorLanguage(lang)
    try {
      localStorage.setItem(MENTOR_LANGUAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light'
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            ← Back to tasks
          </Link>
          <span className="text-base font-semibold tracking-tight">KodHau IDE</span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[30%] min-w-[280px] shrink-0">
          <ProblemPanel problem={problem} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <section className="h-[45%] min-h-[200px] shrink-0 p-2">
            <CodeEditor
              value={code}
              onChange={setCode}
              theme={isDark ? 'vs-dark' : 'light'}
              language={editorLanguage}
            />
          </section>
          <section className="flex min-h-0 flex-1 flex-col">
            <div className="h-[45%] min-h-[160px] shrink-0">
              <MentorPanel
                phase={phase}
                displayedText={displayedText}
                messages={messages}
                error={error}
                voiceOn={voiceOn}
                onToggleVoice={toggleVoice}
                onAskMentor={handleAskMentor}
                onCancel={cancel}
                askButtonDisabled={isBusy}
                language={mentorLanguage}
                onLanguageChange={handleMentorLanguageChange}
              />
            </div>
            <div className="h-[10%] min-h-[80px] shrink-0">
              <OutputPanel lines={outputLines} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
