export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface Lesson {
  id: string
  title: string
  tasks: Task[]
}

export interface Module {
  id: string
  title: string
  locked: boolean
  lockedMessage?: string
  lessons: Lesson[]
}

export interface CoursePlan {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  modules: Module[]
}

export const mockCoursePlans: Record<string, CoursePlan> = {
  'javascript-101': {
    slug: 'javascript-101',
    title: 'JavaScript 101: Fundamentals',
    description: 'Master the language of the modern web with hands-on exercises.',
    icon: 'JS',
    color: '#f59e0b',
    modules: [
      {
        id: 'm1',
        title: 'Module 01: JavaScript Basics',
        locked: false,
        lessons: [
          {
            id: 'l1',
            title: 'Variables: The Building Blocks',
            tasks: [
              { id: 't1', title: 'Declare a variable', completed: true },
              { id: 't2', title: 'Understanding Const vs Let', completed: false },
              { id: 't3', title: 'Data Types Overview', completed: false },
            ],
          },
          {
            id: 'l2',
            title: 'Simple Math',
            tasks: [
              { id: 't4', title: 'Addition & Subtraction', completed: false },
              { id: 't5', title: 'Multiplication & Division', completed: false },
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Module 02: Logic and Flow',
        locked: true,
        lockedMessage: "Complete 'Variables: The Building Blocks' to unlock this module.",
        lessons: [
          {
            id: 'l3',
            title: 'Conditionals',
            tasks: [
              { id: 't6', title: 'if / else statements', completed: false },
              { id: 't7', title: 'switch statements', completed: false },
            ],
          },
          {
            id: 'l4',
            title: 'Loops',
            tasks: [
              { id: 't8', title: 'for loop basics', completed: false },
              { id: 't9', title: 'while loops', completed: false },
              { id: 't10', title: 'Array iteration with forEach', completed: false },
            ],
          },
        ],
      },
    ],
  },
}

export function getCourseProgress(plan: CoursePlan): number {
  const allTasks = plan.modules.flatMap(m => m.lessons.flatMap(l => l.tasks))
  if (allTasks.length === 0) return 0
  const done = allTasks.filter(t => t.completed).length
  return Math.round((done / allTasks.length) * 100)
}

export function getLessonProgress(lesson: Lesson): number {
  if (lesson.tasks.length === 0) return 0
  const done = lesson.tasks.filter(t => t.completed).length
  return Math.round((done / lesson.tasks.length) * 100)
}
