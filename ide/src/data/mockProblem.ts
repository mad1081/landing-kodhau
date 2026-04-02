export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export type TaskCategory = 'javascript' | 'python' | 'postgresql'

export interface TestCase {
  input: unknown[]   // args passed to the function
  expected: unknown  // expected return value
  // for SQL tasks:
  setup_sql?: string
  validation_sql?: string
}

export interface Problem {
  id: string
  category: TaskCategory
  title: string
  description: string
  examples: ProblemExample[]
  constraints: string[]
  starterCode: string
  testCases?: TestCase[]
  functionName?: string  // e.g. "twoSum" — runner needs this to call the function
}

/** @deprecated Use Problem */
export type MockProblem = Problem
