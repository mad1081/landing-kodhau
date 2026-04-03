import { useCallback, useState } from 'react'
import type { TestCase, TaskCategory } from '../data/mockProblem'
import type { OutputLine } from '../components/ide/OutputPanel'

export interface TestResult {
  index: number
  passed: boolean
  input: unknown[]
  expected: unknown
  actual: unknown
  error?: string
}

export interface RunResult {
  testResults: TestResult[]
  passed: number
  total: number
  stdout: string
  stderr: string
}

const API = import.meta.env.VITE_API_URL

// ── Piston (JS / Python) ─────────────────────────────────────────────────────

function buildJsRunner(code: string, functionName: string, testCases: TestCase[]): string {
  return `
${code}

const __tests = ${JSON.stringify(testCases)};
const __results = __tests.map(({ input, expected }, i) => {
  try {
    const actual = ${functionName}(...input);
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    return { index: i, passed: ok, input, expected, actual };
  } catch (e) {
    return { index: i, passed: false, input, expected, actual: null, error: e.message };
  }
});
console.log(JSON.stringify(__results));
`
}

function buildPyRunner(code: string, functionName: string, testCases: TestCase[]): string {
  return `
${code}

import json, sys
__tests = ${JSON.stringify(testCases)}
__results = []
for i, t in enumerate(__tests):
    try:
        actual = ${functionName}(*t["input"])
        ok = actual == t["expected"]
        __results.append({"index": i, "passed": ok, "input": t["input"], "expected": t["expected"], "actual": actual})
    except Exception as e:
        __results.append({"index": i, "passed": False, "input": t["input"], "expected": t["expected"], "actual": None, "error": str(e)})
print(json.dumps(__results))
`
}

async function runPiston(
  language: 'javascript' | 'python',
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<RunResult> {
  const source = language === 'javascript'
    ? buildJsRunner(code, functionName, testCases)
    : buildPyRunner(code, functionName, testCases)

  const pistonLang = language === 'javascript' ? 'javascript' : 'python'

  const res = await fetch(`${API}/api/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: pistonLang,
      version: '*',
      files: [{ content: source }],
    }),
  })

  if (!res.ok) throw new Error(`Piston error: ${res.status}`)
  const data = await res.json()
  const stdout: string = data.run?.stdout ?? ''
  const stderr: string = data.run?.stderr ?? ''

  let testResults: TestResult[] = []
  try {
    testResults = JSON.parse(stdout.trim())
  } catch {
    // stdout wasn't JSON — likely a syntax error
    return { testResults: [], passed: 0, total: testCases.length, stdout, stderr: stderr || stdout }
  }

  const passed = testResults.filter((r) => r.passed).length
  return { testResults, passed, total: testCases.length, stdout, stderr }
}

// ── PGlite (PostgreSQL) ───────────────────────────────────────────────────────

async function runPglite(
  code: string,
  testCases: TestCase[]
): Promise<RunResult> {
  const { PGlite } = await import('@electric-sql/pglite')
  const testResults: TestResult[] = []
  let stderr = ''

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const db = new PGlite()
    try {
      if (tc.setup_sql) await db.exec(tc.setup_sql)
      await db.exec(code)
      let actual: unknown = null
      if (tc.validation_sql) {
        const res = await db.query(tc.validation_sql)
        actual = res.rows
      }
      const ok = JSON.stringify(actual) === JSON.stringify(tc.expected)
      testResults.push({ index: i, passed: ok, input: [], expected: tc.expected, actual })
    } catch (e: any) {
      stderr += e.message + '\n'
      testResults.push({ index: i, passed: false, input: [], expected: tc.expected, actual: null, error: e.message })
    }
    await db.close()
  }

  const passed = testResults.filter((r) => r.passed).length
  return { testResults, passed, total: testCases.length, stdout: '', stderr }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useCodeRunner(category: TaskCategory) {
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<RunResult | null>(null)

  const run = useCallback(async (
    code: string,
    testCases: TestCase[],
    functionName?: string
  ): Promise<RunResult | null> => {
    if (!testCases || testCases.length === 0) return null
    setRunning(true)
    setResult(null)
    try {
      let r: RunResult
      if (category === 'postgresql') {
        r = await runPglite(code, testCases)
      } else {
        if (!functionName) throw new Error('functionName is required for JS/Python tasks')
        r = await runPiston(category === 'python' ? 'python' : 'javascript', code, functionName, testCases)
      }
      setResult(r)
      return r
    } catch (e: any) {
      const r: RunResult = { testResults: [], passed: 0, total: testCases.length, stdout: '', stderr: e.message }
      setResult(r)
      return r
    } finally {
      setRunning(false)
    }
  }, [category])

  return { run, running, result }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function resultToOutputLines(r: RunResult): OutputLine[] {
  const lines: OutputLine[] = []
  for (const t of r.testResults) {
    if (t.passed) {
      lines.push({ id: `t${t.index}`, type: 'result', text: `✓ Test ${t.index + 1}: passed` })
    } else if (t.error) {
      lines.push({ id: `t${t.index}`, type: 'stderr', text: `✗ Test ${t.index + 1}: error — ${t.error}` })
    } else {
      lines.push({
        id: `t${t.index}`, type: 'result',
        text: `✗ Test ${t.index + 1}: expected ${JSON.stringify(t.expected)}, got ${JSON.stringify(t.actual)}`,
      })
    }
  }
  if (r.stderr && r.testResults.length === 0) {
    lines.push({ id: 'err', type: 'stderr', text: r.stderr.trim() })
  }
  lines.push({
    id: 'summary', type: 'stdout',
    text: `${r.passed}/${r.total} tests passed`,
  })
  return lines
}

export function resultToMentorContext(r: RunResult): string {
  if (r.testResults.length === 0 && r.stderr) {
    return `Runtime/syntax error:\n${r.stderr.trim()}`
  }
  const lines = r.testResults.map((t) => {
    if (t.passed) return `Test ${t.index + 1}: PASSED`
    if (t.error) return `Test ${t.index + 1}: ERROR — ${t.error}`
    return `Test ${t.index + 1}: FAILED — input: ${JSON.stringify(t.input)}, expected: ${JSON.stringify(t.expected)}, got: ${JSON.stringify(t.actual)}`
  })
  return `Execution results (${r.passed}/${r.total} passed):\n${lines.join('\n')}`
}
