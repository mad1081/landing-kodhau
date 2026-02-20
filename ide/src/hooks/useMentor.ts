import { useCallback, useState } from 'react'
// System prompt loaded at build time (unchanged, used as-is per plan)
import systemPrompt from '../../SYSTEM_PROMPT.md?raw'

export interface MentorMessage {
  id: string
  role: 'mentor' | 'system'
  text: string
}

export type MentorLanguage = 'en' | 'ru' | 'kk'

interface UseMentorParams {
  problemTitle: string
  problemDescription: string
  examples: { input: string; output: string }[]
  constraints: string[]
  language?: MentorLanguage
}

export function useMentor(params: UseMentorParams) {
  const [messages, setMessages] = useState<MentorMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestMentor = useCallback(
    async (code: string) => {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
      if (!apiKey) {
        setError('Missing VITE_OPENROUTER_API_KEY')
        setMessages((m) => [
          ...m,
          {
            id: `sys-${Date.now()}`,
            role: 'system',
            text: 'Mentor is unavailable: add VITE_OPENROUTER_API_KEY to .env',
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

Constraints (it means it is GUARANTEED THAT OTHER INPUTS WON'T BE TYPED, INPUTS ONLY IN GIVEN RANGES):
${params.constraints.join('\n')}

Current code:
\`\`\`python
${code}
\`\`\`

Provide minimal mentor feedback (no full solution, no final code). One short response.`

        const model = import.meta.env.VITE_OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-exp:free'
        const requestPayload = {
          model,
          messages: [
            { role: 'system', content: systemPrompt.trim() },
            { role: 'user', content: userContent },
          ],
          max_tokens: 2048,
        }
        console.log('[Mentor] Request payload:', {
          model: requestPayload.model,
          systemPromptLength: systemPrompt.trim().length,
          systemPromptPreview: systemPrompt.trim().slice(0, 300) + (systemPrompt.trim().length > 300 ? '...' : ''),
          userContent,
          max_tokens: requestPayload.max_tokens,
        })

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestPayload),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          const msg = err?.error?.message ?? err?.message ?? `OpenRouter error: ${res.status}`
          throw new Error(msg)
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string }; finish_reason?: string }>
        }
        const choice = data.choices?.[0]
        const text = choice?.message?.content?.trim()
        const reply = text ?? 'No response from mentor.'
        const finishReason = choice?.finish_reason

        console.log('[Mentor] Raw API response:', data)
        console.log('[Mentor] Extracted reply:', { reply, replyLength: reply.length, finishReason })
        if (finishReason && finishReason !== 'stop') {
          console.warn('[Mentor] Response may be truncated. finish_reason:', finishReason)
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
