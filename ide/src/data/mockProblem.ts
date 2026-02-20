export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export type TaskCategory = 'javascript' | 'postgresql'

export interface Problem {
  id: string
  category: TaskCategory
  title: string
  description: string
  examples: ProblemExample[]
  constraints: string[]
  starterCode: string
}

/** @deprecated Use Problem */
export type MockProblem = Problem
