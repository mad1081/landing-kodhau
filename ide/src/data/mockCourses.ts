export interface Course {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  coverImage: string
  totalLessons: number
  completedLessons: number
}

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'javascript-101',
    title: 'JavaScript 101: Fundamentals',
    description: 'Master variables, functions, loops, and core JS concepts from scratch.',
    icon: 'JS',
    color: '#f59e0b',
    coverImage: 'https://picsum.photos/seed/javascript/800/300',
    totalLessons: 12,
    completedLessons: 0,
  },
  {
    id: '2',
    slug: 'react-masterclass',
    title: 'React Masterclass',
    description: 'Build modern UIs with components, hooks, and state management.',
    icon: 'Re',
    color: '#38bdf8',
    coverImage: 'https://picsum.photos/seed/react/800/300',
    totalLessons: 16,
    completedLessons: 0,
  },
  {
    id: '3',
    slug: 'nodejs-backend',
    title: 'Node.js Backend Essentials',
    description: 'Create REST APIs, work with databases, and deploy server-side apps.',
    icon: 'No',
    color: '#4ade80',
    coverImage: 'https://picsum.photos/seed/nodejs/800/300',
    totalLessons: 14,
    completedLessons: 0,
  },
  {
    id: '4',
    slug: 'python-data-science',
    title: 'Python for Data Science',
    description: 'Analyze data, build models, and visualize insights with Python.',
    icon: 'Py',
    color: '#a78bfa',
    coverImage: 'https://picsum.photos/seed/python/800/300',
    totalLessons: 18,
    completedLessons: 0,
  },
]
