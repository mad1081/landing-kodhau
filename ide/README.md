# KodHau IDE

Browser-based coding IDE with an AI mentor for live problem-solving guidance. Built with React, Vite, Monaco Editor, and Tailwind CSS. Matches the KodHau landing design (flat, slate/blue, dark mode).

## Features

- **Left panel**: Problem description, examples, and constraints (mock task: Sum of Two Numbers).
- **Right top**: Monaco code editor (Python), starter code, debounced change detection.
- **Right bottom**: AI Mentor panel — chat-style bubbles, subtitles, Voice ON/OFF toggle.
- **Bottom**: Output/console with mock test results (no real execution).
- **Theme**: Dark/light toggle (persisted in `localStorage`).

The mentor uses the system prompt in `SYSTEM_PROMPT.md` (never gives full solutions; asks pointed questions). When you click "Ask mentor", the app sends the problem + code to OpenRouter and displays the mentor’s reply. If Voice is ON, the reply is also spoken via ElevenLabs TTS.

## Setup

```bash
pnpm install
```

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | Yes (for mentor) | OpenRouter API key ([get one](https://openrouter.ai/keys)). Free-tier models have rate limits. |
| `VITE_OPENROUTER_MODEL` | No | Model ID (default: `google/gemini-2.0-flash-exp:free`). See [OpenRouter models](https://openrouter.ai/models). |
| `VITE_ELEVENLABS_API_KEY` | No (only for voice) | ElevenLabs API key for text-to-speech. |
| `VITE_ELEVENLABS_VOICE_ID` | No | ElevenLabs voice ID; a default is used if unset. |

Without `VITE_OPENROUTER_API_KEY`, the mentor panel will show an error. Without `VITE_ELEVENLABS_API_KEY`, voice is skipped (subtitles still work).

**OpenRouter free tier:** You get an API key for free. Models with a `:free` suffix (e.g. `google/gemini-2.0-flash-exp:free`) are free to use but rate-limited (e.g. 20 requests/min, ~50 free requests/day unless you've added paid credits). You do **not** have to pay to try it; paying adds credits and higher limits. See [OpenRouter pricing](https://openrouter.ai/docs#limits).

## Run

```bash
pnpm dev
```

Open http://localhost:5173.

## Build

```bash
pnpm build
pnpm preview
```

## Project structure

- `src/App.tsx` — Main layout, theme toggle, four panels.
- `src/components/` — `ProblemPanel`, `CodeEditor`, `MentorPanel`, `OutputPanel`.
- `src/hooks/` — `useMentor` (OpenRouter API + SYSTEM_PROMPT), `useVoice` (ElevenLabs TTS).
- `src/data/mockProblem.ts` — Single mock problem and starter code.
- `SYSTEM_PROMPT.md` — Mentor system prompt (used as-is, not modified).
