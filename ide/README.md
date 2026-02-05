# KodHau IDE

Browser-based coding IDE with an AI mentor for live problem-solving guidance. Built with React, Vite, Monaco Editor, and Tailwind CSS. Matches the KodHau landing design (flat, slate/blue, dark mode).

## Features

- **Left panel**: Problem description, examples, and constraints (mock task: Sum of Two Numbers).
- **Right top**: Monaco code editor (Python), starter code, debounced change detection.
- **Right bottom**: AI Mentor panel — chat-style bubbles, subtitles, Voice ON/OFF toggle.
- **Bottom**: Output/console with mock test results (no real execution).
- **Theme**: Dark/light toggle (persisted in `localStorage`).

The mentor uses the system prompt in `SYSTEM_PROMPT.md` (never gives full solutions; asks pointed questions). When you edit code, after a short debounce the app sends the problem + code to the Gemini API and displays the mentor’s reply. If Voice is ON, the reply is also spoken via ElevenLabs TTS.

## Setup

```bash
pnpm install
```

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Yes (for mentor) | Google Gemini API key (e.g. for gemini-1.5-flash). |
| `VITE_ELEVENLABS_API_KEY` | No (only for voice) | ElevenLabs API key for text-to-speech. |
| `VITE_ELEVENLABS_VOICE_ID` | No | ElevenLabs voice ID; a default is used if unset. |

Without `VITE_GEMINI_API_KEY`, the mentor panel will show an error message. Without `VITE_ELEVENLABS_API_KEY`, voice playback is skipped (subtitles still work).

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
- `src/hooks/` — `useMentor` (Gemini API + SYSTEM_PROMPT), `useVoice` (ElevenLabs TTS).
- `src/data/mockProblem.ts` — Single mock problem and starter code.
- `SYSTEM_PROMPT.md` — Mentor system prompt (used as-is, not modified).
