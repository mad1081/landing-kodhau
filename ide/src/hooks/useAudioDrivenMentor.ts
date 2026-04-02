import { useCallback, useEffect, useRef, useState } from 'react'
import systemPrompt from '../../SYSTEM_PROMPT.md?raw'
import type { MentorLanguage } from './useMentor'
import type { MentorMessage } from './useMentor'

export type MentorPhase =
  | 'IDLE'
  | 'GENERATING_TEXT'
  | 'GENERATING_AUDIO'
  | 'AUDIO_READY'
  | 'SPEAKING_AND_RENDERING'
  | 'COMPLETED'
  | 'CANCELLED'

const LANGUAGE_LABELS: Record<MentorLanguage, string> = {
  en: 'English',
  ru: 'Russian',
  kk: 'Kazakh',
}

function getLanguageInstruction(lang: MentorLanguage): string {
  const name = LANGUAGE_LABELS[lang]
  return `\n\nYou must respond only in ${name}. Use ${name} for all your feedback to the user.`
}

/** Strip Markdown so TTS does not read "star star" or "backtick". */
function stripMarkdownForTTS(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
}

const MS_PER_CHAR_VOICE_OFF = 45

export interface AudioDrivenMentorParams {
  problemTitle: string
  problemDescription: string
  examples: { input: string; output: string }[]
  constraints: string[]
  language: MentorLanguage
  testContext?: string  // pre-formatted execution results from useCodeRunner
}

export function useAudioDrivenMentor(params: AudioDrivenMentorParams, voiceOn: boolean) {
  const [phase, setPhase] = useState<MentorPhase>('IDLE')
  const [displayedText, setDisplayedText] = useState('')
  const [messages, setMessages] = useState<MentorMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const requestIdRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const typewriterRafRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const durationMsRef = useRef(0)
  const pendingTextRef = useRef('')
  const objectUrlRef = useRef<string | null>(null)
  const completedForRequestRef = useRef(false)

  const isBusy =
    phase !== 'IDLE' &&
    phase !== 'COMPLETED' &&
    phase !== 'CANCELLED'

  function cancel() {
    const aborted = abortControllerRef.current
    if (aborted) {
      aborted.abort()
      abortControllerRef.current = null
    }
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
    if (typewriterRafRef.current !== null) {
      cancelAnimationFrame(typewriterRafRef.current)
      typewriterRafRef.current = null
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setPhase('CANCELLED')
    setDisplayedText('')
    pendingTextRef.current = ''
    setTimeout(() => setPhase('IDLE'), 0)
  }

  const askMentor = useCallback(
    async (code: string) => {
      cancel()
      const requestId = ++requestIdRef.current
      const ac = new AbortController()
      abortControllerRef.current = ac
      const signal = ac.signal

      setError(null)
      setPhase('GENERATING_TEXT')
      setDisplayedText('')
      completedForRequestRef.current = false

      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
      if (!apiKey) {
        setError('Missing VITE_OPENROUTER_API_KEY')
        setMessages((m) => [
          ...m,
          { id: `sys-${Date.now()}`, role: 'system', text: 'Mentor is unavailable: add VITE_OPENROUTER_API_KEY to .env' },
        ])
        setPhase('IDLE')
        return
      }

      const userContent = `Problem: ${params.problemTitle}

${params.problemDescription}

Examples:
${params.examples.map((e) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

Constraints:
${params.constraints.join('\n')}

Current code:
\`\`\`
${code}
\`\`\`
${params.testContext ? `\nTest execution results:\n${params.testContext}\n` : ''}
Provide minimal mentor feedback (no full solution, no final code). One short response. Use Markdown: **bold** for the key point, \`backticks\` for code or names.`

      const systemContent = systemPrompt.trim() + getLanguageInstruction(params.language)
      const model = import.meta.env.VITE_OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-exp:free'

      let text: string
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemContent },
              { role: 'user', content: userContent },
            ],
            max_tokens: 2048,
          }),
          signal,
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message ?? err?.message ?? `API error: ${res.status}`)
        }
        const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
        text = data.choices?.[0]?.message?.content?.trim() ?? 'No response from mentor.'
      } catch (e) {
        if ((e as Error).name === 'AbortError') return
        setError(e instanceof Error ? e.message : 'Request failed')
        setPhase('IDLE')
        return
      }

      if (requestId !== requestIdRef.current) return
      pendingTextRef.current = text
      setPhase('GENERATING_AUDIO')

      if (!voiceOn) {
        durationMsRef.current = Math.max(2000, text.length * MS_PER_CHAR_VOICE_OFF)
        startTimeRef.current = performance.now()
        setPhase('SPEAKING_AND_RENDERING')
        const runTypewriter = () => {
          if (requestId !== requestIdRef.current) return
          const elapsed = performance.now() - startTimeRef.current
          const duration = durationMsRef.current
          const progress = Math.min(1, elapsed / duration)
          const len = Math.floor(progress * text.length)
          setDisplayedText(text.slice(0, len))
          if (progress < 1) {
            typewriterRafRef.current = requestAnimationFrame(runTypewriter)
          } else {
            typewriterRafRef.current = null
            if (!completedForRequestRef.current) {
              completedForRequestRef.current = true
              setPhase('COMPLETED')
              setDisplayedText(text)
              setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
            }
          }
        }
        typewriterRafRef.current = requestAnimationFrame(runTypewriter)
        return
      }

      const elevenKey = import.meta.env.VITE_ELEVENLABS_API_KEY
      const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'
      if (!elevenKey) {
        durationMsRef.current = Math.max(2000, text.length * MS_PER_CHAR_VOICE_OFF)
        startTimeRef.current = performance.now()
        setPhase('SPEAKING_AND_RENDERING')
        const runTypewriter = () => {
          if (requestId !== requestIdRef.current) return
          const elapsed = performance.now() - startTimeRef.current
          const duration = durationMsRef.current
          const progress = Math.min(1, elapsed / duration)
          const len = Math.floor(progress * text.length)
          setDisplayedText(text.slice(0, len))
          if (progress < 1) {
            typewriterRafRef.current = requestAnimationFrame(runTypewriter)
          } else {
            typewriterRafRef.current = null
            setPhase('COMPLETED')
            setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
          }
        }
        typewriterRafRef.current = requestAnimationFrame(runTypewriter)
        return
      }

      let blob: Blob
      try {
        const ttsRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
          {
            method: 'POST',
            headers: { 'xi-api-key': elevenKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: stripMarkdownForTTS(text).slice(0, 2500), model_id: 'eleven_multilingual_v2' }),
            signal,
          }
        )
        if (!ttsRes.ok) {
          const err = await ttsRes.json().catch(() => ({}))
          throw new Error(err?.detail?.message ?? `TTS error: ${ttsRes.status}`)
        }
        blob = await ttsRes.blob()
      } catch (e) {
        if ((e as Error).name === 'AbortError') return
        durationMsRef.current = Math.max(2000, text.length * MS_PER_CHAR_VOICE_OFF)
        startTimeRef.current = performance.now()
        setPhase('SPEAKING_AND_RENDERING')
        const runTypewriter = () => {
          if (requestId !== requestIdRef.current) return
          const elapsed = performance.now() - startTimeRef.current
          const duration = durationMsRef.current
          const progress = Math.min(1, elapsed / duration)
          const len = Math.floor(progress * text.length)
          setDisplayedText(text.slice(0, len))
          if (progress < 1) {
            typewriterRafRef.current = requestAnimationFrame(runTypewriter)
          } else {
            typewriterRafRef.current = null
            if (!completedForRequestRef.current) {
              completedForRequestRef.current = true
              setPhase('COMPLETED')
              setDisplayedText(text)
              setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
            }
          }
        }
        typewriterRafRef.current = requestAnimationFrame(runTypewriter)
        return
      }

      if (requestId !== requestIdRef.current) return

      const url = URL.createObjectURL(blob)
      objectUrlRef.current = url
      const audio = new Audio(url)
      audioRef.current = audio

      const onReady = () => {
        if (requestId !== requestIdRef.current) return
        const durationMs = Number.isFinite(audio.duration) ? audio.duration * 1000 : text.length * MS_PER_CHAR_VOICE_OFF
        durationMsRef.current = durationMs
        setPhase('AUDIO_READY')
        startTimeRef.current = performance.now()
        setPhase('SPEAKING_AND_RENDERING')
        audio.play().then(() => {
        const runTypewriter = () => {
          if (requestId !== requestIdRef.current) return
          const elapsed = performance.now() - startTimeRef.current
          const progress = Math.min(1, elapsed / durationMs)
          const len = Math.floor(progress * text.length)
          setDisplayedText(text.slice(0, len))
          if (progress < 1 && !audio.ended) {
            typewriterRafRef.current = requestAnimationFrame(runTypewriter)
          } else {
            typewriterRafRef.current = null
            if (!completedForRequestRef.current) {
              completedForRequestRef.current = true
              setPhase('COMPLETED')
              setDisplayedText(text)
              setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
            }
            if (objectUrlRef.current) {
              URL.revokeObjectURL(objectUrlRef.current)
              objectUrlRef.current = null
            }
            audioRef.current = null
          }
        }
        typewriterRafRef.current = requestAnimationFrame(runTypewriter)
        }).catch(() => {
          typewriterRafRef.current = null
          if (!completedForRequestRef.current) {
            completedForRequestRef.current = true
            setPhase('COMPLETED')
            setDisplayedText(text)
            setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
          }
        })
      }

      const onEnded = () => {
        if (typewriterRafRef.current !== null) {
          cancelAnimationFrame(typewriterRafRef.current)
          typewriterRafRef.current = null
        }
        if (!completedForRequestRef.current) {
          completedForRequestRef.current = true
          setPhase('COMPLETED')
          setDisplayedText(pendingTextRef.current)
          setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text: pendingTextRef.current }])
        }
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current)
          objectUrlRef.current = null
        }
        audioRef.current = null
      }

      audio.addEventListener('loadedmetadata', onReady, { once: true })
      audio.addEventListener('ended', onEnded, { once: true })
      audio.addEventListener('error', () => {
        durationMsRef.current = text.length * MS_PER_CHAR_VOICE_OFF
        startTimeRef.current = performance.now()
        setPhase('SPEAKING_AND_RENDERING')
        const runTypewriter = () => {
          if (requestId !== requestIdRef.current) return
          const elapsed = performance.now() - startTimeRef.current
          const progress = Math.min(1, elapsed / durationMsRef.current)
          const len = Math.floor(progress * text.length)
          setDisplayedText(text.slice(0, len))
          if (progress < 1) {
            typewriterRafRef.current = requestAnimationFrame(runTypewriter)
          } else {
            typewriterRafRef.current = null
            setPhase('COMPLETED')
            setMessages((m) => [...m, { id: `mentor-${Date.now()}`, role: 'mentor', text }])
          }
        }
        typewriterRafRef.current = requestAnimationFrame(runTypewriter)
      }, { once: true })
    },
    [params, voiceOn]
  )

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
      if (typewriterRafRef.current !== null) cancelAnimationFrame(typewriterRafRef.current)
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  return {
    phase,
    displayedText,
    messages,
    error,
    isBusy,
    askMentor,
    cancel,
  }
}
