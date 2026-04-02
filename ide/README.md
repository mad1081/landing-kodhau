## KodHau IDE

Browser-based coding IDE with an AI mentor for live problem-solving guidance. Built with React, Vite, Monaco Editor, Tailwind CSS, and React Router.

The IDE lets you pick a task, open an editor for that task, and work with a mentor that speaks (optional) and responds in multiple languages.

---

## High-level features

- **Task list page (`/`)**
  - Shows all available tasks from:
    - **Static tasks**: bundled in code.
    - **Admin tasks**: created locally and stored in `localStorage`.
  - Clicking a task opens the IDE at `/ide/:taskId`.
  - If there are no tasks, the page suggests creating one in the admin panel.

- **IDE page (`/ide/:taskId`)**
  - **Left panel**: `ProblemPanel` – task title, description, examples, and constraints.
  - **Top-right**: `CodeEditor` – Monaco editor with:
    - JavaScript or SQL mode (based on task category).
    - Debounced change support (for future live analysis).
  - **Bottom-right (mentor)**: `MentorPanel` – AI mentor with:
    - "Ask mentor" button.
    - Voice ON/OFF toggle.
    - Language selector: English, Russian, Kazakh.
    - Streaming subtitles and chat history.
  - **Bottom**: `OutputPanel` – mock console / test output (currently static).
  - **Theme toggle**: light / dark mode, stored in `localStorage`.

- **Admin page (`/admin`)**
  - Form to add tasks:
    - Name/title.
    - Category: JavaScript or PostgreSQL.
  - Created tasks are stored in `localStorage` and merged into the main task list.
  - List of admin tasks with:
    - **Open** – navigates to `/ide/:taskId`.
    - **Delete** – removes the task from `localStorage`.

---

## Mentor behaviour and audio

- **Core logic**
  - The mentor uses `SYSTEM_PROMPT.md` as a system message and **never gives full solutions**.
  - When you click **Ask mentor**, the app sends:
    - Problem title, description, examples, constraints.
    - Current code from the editor.
  - The mentor responds with short, focused hints.

- **Text-only flow (`useMentor`)**
  - `useMentor` powers a basic, non-audio mentor:
    - Sends a single chat completion request to OpenRouter.
    - Appends responses to the message list as `mentor` messages.
    - Shows errors as `system` messages if the API fails or the key is missing.

- **Audio-driven flow (`useAudioDrivenMentor`)**
  - Main IDE flow uses `useAudioDrivenMentor`, which:
    - Calls OpenRouter for a mentor message (including a language instruction).
    - Optionally calls ElevenLabs TTS to generate an audio clip.
    - Shows a typewriter-style subtitle (`displayedText`) in sync with:
      - Either the audio playback, or
      - A synthetic timer when audio is disabled/unavailable.
    - Manages phases like:
      - `GENERATING_TEXT`, `GENERATING_AUDIO`, `SPEAKING_AND_RENDERING`, `COMPLETED`, `CANCELLED`.
    - Supports **Cancel** to abort the current request and audio playback.

- **Voice toggle (`useVoice`)**
  - `useVoice` controls whether the mentor should speak:
    - `voiceOn` and `toggleVoice` are wired into `MentorPanel`.
    - If voice is OFF or ElevenLabs keys are missing, the IDE shows subtitles only.

- **Language selection**
  - User can choose the mentor language in the UI:
    - English (`en`), Russian (`ru`), Kazakh (`kk`).
  - `useAudioDrivenMentor` appends a language instruction to the system prompt so the model stays in that language.
  - The selected language is stored in `localStorage` and restored on load.

---

## Task storage and creation

- **Static tasks**
  - Defined in `src/data/taskList.ts` with type `Problem` from `mockProblem.ts`.
  - Always available and shipped with the build.

- **Admin-created tasks**
  - `addTask(title, category)`:
    - Creates a new `Problem` with:
      - ID prefixed with `local-` and a `crypto.randomUUID()`.
      - Placeholder description, one placeholder example, and empty constraints.
      - Starter code based on category:
        - JavaScript: `// Your code here\n`
        - PostgreSQL: `-- Your SQL here\n`
    - Persists tasks into `localStorage` under `kodhau-ide-admin-tasks`.
  - `getAdminTasks()`:
    - Returns all admin tasks from `localStorage`.
  - `getMergedTasks()`:
    - Returns `[STATIC_TASKS, adminTasks]` combined for the task list page.
  - `getTaskById(id)`:
    - Finds a task in the merged list by ID.
  - `deleteAdminTask(id)`:
    - Removes a task from the admin list if its ID starts with `local-`.

---

## Routing and pages

- `src/App.tsx`
  - Defines three routes:
    - `/` → `TaskListPage`
    - `/ide/:taskId` → `IDEPage`
    - `/admin` → `AdminPage`

- `TaskListPage`
  - Reads tasks with `getMergedTasks()`.
  - Renders a simple, card-style list of tasks.
  - Navigates to `/ide/:taskId` when a task card is clicked.

- `IDEPage`
  - Reads `taskId` from the URL.
  - Uses `getTaskById` to resolve a `Problem`.
  - If not found, redirects to `/`.
  - Renders `IDELayout` with the resolved problem.

- `AdminPage`
  - Provides the form to create admin tasks.
  - Shows the list of admin tasks with `Open` / `Delete` actions.

---

## Setup

```bash
pnpm install
```

---

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | Yes (for mentor) | OpenRouter API key (`https://openrouter.ai/keys`). Free-tier models have rate limits. |
| `VITE_OPENROUTER_MODEL` | No | Model ID (default: `google/gemini-2.0-flash-exp:free`). |
| `VITE_ELEVENLABS_API_KEY` | No (only for voice) | ElevenLabs API key for text-to-speech. |
| `VITE_ELEVENLABS_VOICE_ID` | No | ElevenLabs voice ID; a default is used if unset. |

Behaviour when keys are missing:

- **No `VITE_OPENROUTER_API_KEY`**: mentor shows an error and cannot answer.
- **No `VITE_ELEVENLABS_API_KEY`**: mentor still works, but with subtitles only (no audio).

---

## Run locally

```bash
pnpm dev
```

Open `http://localhost:5173`.

---

## Build and preview

```bash
pnpm build
pnpm preview
```

---

## Internal structure (overview)

- `src/App.tsx` – router + page wiring.
- `src/pages/TaskListPage.tsx` – task list UI.
- `src/pages/IDEPage.tsx` – task resolution + IDE layout.
- `src/pages/AdminPage.tsx` – task creation and management.
- `src/components/IDELayout.tsx` – main 4-panel layout + theme and mentor orchestration.
- `src/components/ProblemPanel.tsx` – problem text, examples, constraints.
- `src/components/CodeEditor.tsx` – Monaco editor wrapper.
- `src/components/MentorPanel.tsx` – mentor UI, subtitles, messages, and controls.
- `src/components/OutputPanel.tsx` – console-style output.
- `src/hooks/useAudioDrivenMentor.ts` – combined mentor + audio + subtitles.
- `src/hooks/useMentor.ts` – simple text-only mentor.
- `src/hooks/useVoice.ts` – voice ON/OFF state.
- `src/data/mockProblem.ts` – problem types and base mock task.
- `src/data/taskList.ts` – static tasks.
- `src/data/taskStorage.ts` – localStorage-based admin task management.
- `SYSTEM_PROMPT.md` – mentor system prompt (used as-is, not modified).
