import { useCallback, useState } from 'react'
// System prompt loaded at build time (unchanged, used as-is per plan)
import systemPrompt from '../../SYSTEM_PROMPT.md?raw'

export interface MentorMessage {
  id: string
  role: 'mentor' | 'system'
  text: string
}

interface UseMentorParams {
  problemTitle: string
  problemDescription: string
  examples: { input: string; output: string }[]
  constraints: string[]
}

export function useMentor(params: UseMentorParams) {
  const [messages, setMessages] = useState<MentorMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestMentor = useCallback(
    async (code: string) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        setError('Missing VITE_GEMINI_API_KEY')
        setMessages((m) => [
          ...m,
          {
            id: `sys-${Date.now()}`,
            role: 'system',
            text: 'Mentor is unavailable: add VITE_GEMINI_API_KEY to .env',
          },
        ])
        return
      }

      setLoading(true)
      setError(null)
      setMessages((m) => [
        ...m,
        { id: `sys-${Date.now()}`, role: 'system', text: 'Analyzing your code…' },
      ])

      try {
        const userContent = `Problem: ${params.problemTitle}

${params.problemDescription}

Examples:
${params.examples.map((e) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

Constraints:
${params.constraints.join('\n')}

Current code:
\`\`\`python
${code}
\`\`\`

Provide minimal mentor feedback (no full solution, no final code). One short response.`

        const requestPayload = {
          systemInstruction: { parts: [{ text: systemPrompt.trim() }] },
          contents: [{ role: 'user', parts: [{ text: userContent }] }],
          generationConfig: { maxOutputTokens: 2048 },
        }
        console.log('[Mentor] Request payload:', {
          systemPromptLength: systemPrompt.trim().length,
          systemPromptPreview: systemPrompt.trim().slice(0, 300) + (systemPrompt.trim().length > 300 ? '...' : ''),
          userContent,
          generationConfig: requestPayload.generationConfig,
        })

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${encodeURIComponent(apiKey)}`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          const msg = err?.error?.message ?? err?.message ?? `Gemini error: ${res.status}`
          throw new Error(msg)
        }

        const data = (await res.json()) as {
          candidates?: Array<{
            content?: { parts?: Array<{ text?: string }> }
            finishReason?: string
          }>
        }
        const candidate = data.candidates?.[0]
        const text = candidate?.content?.parts?.[0]?.text?.trim()
        const reply = text ?? 'No response from mentor.'
        const finishReason = candidate?.finishReason

        console.log('[Mentor] Raw API response:', data)
        console.log('[Mentor] Extracted reply:', { reply, replyLength: reply.length, finishReason })
        if (finishReason && finishReason !== 'STOP') {
          console.warn('[Mentor] Response may be truncated. finishReason:', finishReason)
        }

        setMessages((m) => {
          const withoutLast = m[m.length - 1]?.role === 'system' ? m.slice(0, -1) : m
          return [
            ...withoutLast,
            { id: `mentor-${Date.now()}`, role: 'mentor', text: reply },
          ]
        })
        return reply
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : 'Request failed'
        setError(errMsg)
        setMessages((m) => {
          const withoutLast = m[m.length - 1]?.role === 'system' ? m.slice(0, -1) : m
          return [
            ...withoutLast,
            { id: `sys-${Date.now()}`, role: 'system', text: `Error: ${errMsg}` },
          ]
        })
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [params]
  )

  return { messages, setMessages, loading, error, requestMentor }
}
