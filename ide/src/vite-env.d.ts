/// <reference types="vite/client" />

declare module '*.md?raw' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string
  readonly VITE_ELEVENLABS_API_KEY?: string
  readonly VITE_ELEVENLABS_VOICE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
