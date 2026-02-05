export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export interface MockProblem {
  title: string
  description: string
  examples: ProblemExample[]
  constraints: string[]
  starterCode: string
}

export const mockProblem: MockProblem = {
  title: 'Sum of Two Numbers',
  description: `Given two integers \`a\` and \`b\`, return their sum.

This is a simple warm-up: just add the two numbers and return the result.`,
  examples: [
    {
      input: 'a = 2, b = 3',
      output: '5',
      explanation: '2 + 3 = 5.',
    },
    {
      input: 'a = -1, b = 1',
      output: '0',
    },
  ],
  constraints: [
    '-1000 <= a <= 1000',
    '-1000 <= b <= 1000',
  ],
  starterCode: `def sum_two(a: int, b: int) -> int:
    # Your code here
    return 0
`,
}
