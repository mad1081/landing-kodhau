export interface OutputLine {
  id: string
  text: string
  type: 'stdout' | 'stderr' | 'result'
}

interface OutputPanelProps {
  lines: OutputLine[]
}

export function OutputPanel({ lines }: OutputPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-t border-slate-200 bg-slate-900 px-4 py-3 dark:border-slate-700">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Output
      </h3>
      <div className="font-mono text-sm">
        {lines.length === 0 ? (
          <p className="text-slate-500">Run your code to see output.</p>
        ) : (
          lines.map((line) => (
            <div
              key={line.id}
              className={
                line.type === 'stderr'
                  ? 'text-red-400'
                  : line.type === 'result'
                    ? 'text-emerald-400'
                    : 'text-slate-300'
              }
            >
              {line.text}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const defaultOutputLines: OutputLine[] = [
  { id: '1', text: 'Test 1: passed', type: 'result' },
  { id: '2', text: 'Test 2: failed — expected 5, got 0', type: 'result' },
  { id: '3', text: '2/2 tests run.', type: 'stdout' },
]

export function getDefaultOutputLines(): OutputLine[] {
  return defaultOutputLines
}
