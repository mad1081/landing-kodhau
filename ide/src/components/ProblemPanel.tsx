import type { Problem } from '../data/mockProblem'

interface ProblemPanelProps {
  problem: Problem
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {problem.title}
      </h2>
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-400">
        {problem.description}
      </p>
      <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
        Examples
      </h3>
      <div className="mt-2 space-y-3">
        {problem.examples.map((ex, i) => (
          <div
            key={i}
            className="rounded-md border border-slate-200 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-900"
          >
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Input: {ex.input}
            </p>
            <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
              Output: {ex.output}
            </p>
            {ex.explanation && (
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {ex.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
        Constraints
      </h3>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
        {problem.constraints.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
