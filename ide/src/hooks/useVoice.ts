import { useCallback, useEffect, useRef, useState } from 'react'

const VOICE_STORAGE_KEY = 'kodhau-ide-voice-on'

export function useVoice() {
  const [voiceOn, setVoiceOnState] = useState(() => {
    try {
      return localStorage.getItem(VOICE_STORAGE_KEY) !== 'false'
    } catch {
      return true
    }
  })
  const [isSpeaking, setIsSpeaking] = useState(false)
  const queueRef = useRef<string[]>([])
  const isPlayingRef = useRef(false)

  useEffect(() => {
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, String(voiceOn))
    } catch {
      // ignore
    }
  }, [voiceOn])

  const toggleVoice = useCallback(() => {
    setVoiceOnState((v) => !v)
  }, [])

  const playNextInQueue = useCallback(async () => {
    if (queueRef.current.length === 0) {
      isPlayingRef.current = false
      setIsSpeaking(false)
      return
    }
    const text = queueRef.current.shift() ?? ''
    if (!text.trim()) {
      playNextInQueue()
      return
    }
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
    const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'Xb7hH8MSUJpSbSDYk0k2'
    if (!apiKey) {
      console.warn('[Voice] VITE_ELEVENLABS_API_KEY not set; skipping TTS. Add the key in .env to hear audio.')
      playNextInQueue()
      return
    }
    console.log('[Voice] Requesting audio from ElevenLabs… (may take a few seconds)')
    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text.slice(0, 2500),
            model_id: 'eleven_v3',
          }),
        }
      )
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.detail?.message || `ElevenLabs error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.onended = () => {
        URL.revokeObjectURL(url)
        playNextInQueue()
      }
      await audio.play()
      console.log('[Voice] Playing audio.')
    } catch (e) {
      console.warn('[Voice] TTS failed (no audio will play):', e)
      playNextInQueue()
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return
      if (!voiceOn) {
        console.log('[Voice] Voice is OFF — text not sent to TTS. Turn Voice ON to hear the mentor.')
        return
      }
      queueRef.current.push(text.trim())
      const queueLen = queueRef.current.length
      console.log('[Voice] Text sent to voice (TTS). Queue length:', queueLen, '— wait a few seconds for audio.')
      if (isPlayingRef.current) return
      isPlayingRef.current = true
      setIsSpeaking(true)
      playNextInQueue()
    },
    [voiceOn, playNextInQueue]
  )

  return { voiceOn, toggleVoice, speak, isSpeaking }
}
