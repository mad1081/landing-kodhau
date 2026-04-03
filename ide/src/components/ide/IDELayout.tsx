import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProblemPanel } from './ProblemPanel'
import { CodeEditor, type EditorLanguage } from './CodeEditor'
import { MentorPanel } from './MentorPanel'
import { OutputPanel, type OutputLine } from './OutputPanel'
import type { Problem } from '../../data/mockProblem'
import { useAudioDrivenMentor } from '../../hooks/useAudioDrivenMentor'
import { useVoice } from '../../hooks/useVoice'
import type { MentorLanguage } from '../../hooks/useMentor'
import { useCodeRunner, resultToOutputLines, resultToMentorContext } from '../../hooks/useCodeRunner'
import { useLang } from '../../i18n/LangContext'
import { supabase } from '../../lib/supabase'

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
  const [outputLines, setOutputLines] = useState<OutputLine[]>([])
  const [testContext, setTestContext] = useState<string | undefined>(undefined)
  const { run, running } = useCodeRunner(problem.category)

  useEffect(() => {
    setCode(problem.starterCode)
  }, [problem.id, problem.starterCode])

  const isDark = theme === 'dark'
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const editorLanguage: EditorLanguage = problem.category === 'postgresql' ? 'sql' : problem.category === 'python' ? 'python' : 'javascript'

  const { voiceOn, toggleVoice } = useVoice()
  const { t } = useLang()
  const handleRun = useCallback(async () => {
    if (!problem.testCases?.length) return
    const r = await run(code, problem.testCases, problem.functionName)
    if (!r) return
    setOutputLines(resultToOutputLines(r))
    setTestContext(resultToMentorContext(r))
    // Save progress if all tests passed
    if (r.passed === r.total && r.total > 0) {
      supabase.auth.getSession().then(({ data }) => {
        const token = data.session?.access_token
        if (!token) return
        fetch(`${import.meta.env.VITE_API_URL}/api/progress/${problem.id}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {})
      })
    }
  }, [code, problem, run])

  const mentorParams = {
    problemTitle: problem.title,
    problemDescription: problem.description,
    examples: problem.examples.map((e) => ({ input: e.input, output: e.output })),
    constraints: problem.constraints,
    language: mentorLanguage,
    testContext,
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
    <div className="flex h-[100dvh] flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            to="/"
            className="shrink-0 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            {t('backToTasks')}
          </Link>
          <span className="hidden sm:inline text-base font-semibold tracking-tight truncate">KodHau IDE</span>
        </div>
        <div className="flex items-center gap-2">
          {problem.testCases?.length ? (
            <button
              type="button"
              onClick={handleRun}
              disabled={running}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
            >
              {running ? t('running') : t('run')}
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {isDark ? t('light') : t('dark')}
          </button>
        </div>
      </header>

      {/* Desktop: side-by-side. Mobile: vertical stack */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row overflow-auto lg:overflow-hidden">

        {/* Problem panel — full width on mobile, 30% on desktop */}
        <aside className="w-full lg:w-[30%] lg:min-w-[260px] lg:max-w-[380px] lg:shrink-0 lg:overflow-hidden">
          <ProblemPanel problem={problem} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col min-h-0">
          {/* Editor */}
          <section className="h-64 sm:h-72 lg:h-[45%] shrink-0 p-1">
            <CodeEditor
              value={code}
              onChange={setCode}
              theme={isDark ? 'vs-dark' : 'light'}
              language={editorLanguage}
            />
          </section>
          <section className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-[180px] lg:h-[45%] lg:shrink-0">
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
            <div className="min-h-[80px] lg:h-[10%] lg:shrink-0">
              <OutputPanel lines={outputLines} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
