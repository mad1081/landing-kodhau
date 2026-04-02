import { useCallback, useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'

export type EditorLanguage = 'javascript' | 'python' | 'sql'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  onDebouncedChange?: (value: string) => void
  theme: 'light' | 'vs-dark'
  language?: EditorLanguage
  debounceMs?: number
}

export function CodeEditor({
  value,
  onChange,
  onDebouncedChange,
  theme,
  language = 'javascript',
  debounceMs = 600,
}: CodeEditorProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      const v = newValue ?? ''
      setLocalValue(v)
      onChange(v)
      if (onDebouncedChange) {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
          onDebouncedChange(v)
          debounceRef.current = null
        }, debounceMs)
      }
    },
    [onChange, onDebouncedChange, debounceMs]
  )

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      <Editor
        height="100%"
        language={language}
        value={localValue}
        onChange={handleChange}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  )
}
