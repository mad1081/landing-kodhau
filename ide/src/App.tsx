import { useCallback, useEffect, useRef, useState } from 'react'
import { ProblemPanel } from './components/ProblemPanel'
import { CodeEditor } from './components/CodeEditor'
import { MentorPanel } from './components/MentorPanel'
import {
  OutputPanel,
  getDefaultOutputLines,
  type OutputLine,
} from './components/OutputPanel'
import { mockProblem } from './data/mockProblem'
import { useMentor, type MentorLanguage } from './hooks/useMentor'
import { useVoice } from './hooks/useVoice'

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

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)
  const [mentorLanguage, setMentorLanguage] = useState<MentorLanguage>(getInitialMentorLanguage)
  const [code, setCode] = useState(mockProblem.starterCode)
  const [outputLines] = useState<OutputLine[]>(getDefaultOutputLines)

  const isDark = theme === 'dark'
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const { voiceOn, toggleVoice, speak, isSpeaking } = useVoice()
  const mentorParams = {
    problemTitle: mockProblem.title,
    problemDescription: mockProblem.description,
    examples: mockProblem.examples.map((e) => ({ input: e.input, output: e.output })),
    constraints: mockProblem.constraints,
    language: mentorLanguage,
  }
  const { messages, loading, requestMentor } = useMentor(mentorParams)
  const lastMentorReplyRef = useRef<string | null>(null)

  useEffect(() => {
    const mentorMessages = messages.filter((m) => m.role === 'mentor')
    const last = mentorMessages[mentorMessages.length - 1]
    if (!last) return
    if (last.text === lastMentorReplyRef.current) return
    lastMentorReplyRef.current = last.text
    if (voiceOn) {
      console.log('[Voice] Mentor reply received. Sending text to TTS — wait a few seconds for audio.')
      speak(last.text)
    }
  }, [messages, voiceOn, speak])

  const subtitleText = (() => {
    const mentorMessages = messages.filter((m) => m.role === 'mentor')
    return mentorMessages[mentorMessages.length - 1]?.text ?? ''
  })()

  const handleAskMentor = useCallback(() => {
    requestMentor(code)
  }, [requestMentor, code])

  const askButtonDisabled = loading || isSpeaking

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
        <span className="text-base font-semibold tracking-tight">KodHau IDE</span>
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
          <ProblemPanel problem={mockProblem} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <section className="h-[45%] min-h-[200px] shrink-0 p-2">
            <CodeEditor
              value={code}
              onChange={setCode}
              theme={isDark ? 'vs-dark' : 'light'}
            />
          </section>
          <section className="flex min-h-0 flex-1 flex-col">
            <div className="h-[45%] min-h-[160px] shrink-0">
              <MentorPanel
                messages={messages}
                loading={loading}
                voiceOn={voiceOn}
                onToggleVoice={toggleVoice}
                subtitleText={subtitleText}
                onAskMentor={handleAskMentor}
                askButtonDisabled={askButtonDisabled}
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

export default App
