import { IconLock } from '@tabler/icons-react'
import { LessonSection } from './LessonSection'
import type { Module } from '../../data/mockCoursePlan'

interface ModuleSectionProps {
  module: Module
  courseSlug: string
  index: number
}

export function ModuleSection({ module, courseSlug, index }: ModuleSectionProps) {
  const allTasks = module.lessons.flatMap(l => l.tasks)
  const completedTasks = allTasks.filter(t => t.completed).length
  const isInProgress = completedTasks > 0 && completedTasks < allTasks.length
  const moduleNumber = String(index + 1).padStart(2, '0')

  if (module.locked) {
    return (
      <section className="relative">
        {/* Left accent line */}
        <div
          className="absolute -left-4 top-0 bottom-0 w-1 rounded-full hidden lg:block"
          style={{ background: 'rgba(199,196,216,0.3)' }}
        />

        {/* Module header — locked */}
        <div
          className="p-8 rounded-xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-60"
          style={{ background: '#e6eeff' }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-black text-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#777587' }}
            >
              {moduleNumber}
            </span>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#0d1c2f' }}
            >
              {module.title}
            </h2>
          </div>
          <IconLock size={20} style={{ color: '#777587' }} />
        </div>

        {/* Locked lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-4">
            {module.lessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-8 rounded-xl flex items-start gap-8 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                style={{ background: '#eff4ff', border: '1px solid rgba(199,196,216,0.1)' }}
              >
                {/* Lock icon in SVG circle spot */}
                <div
                  className="shrink-0 w-16 h-16 flex items-center justify-center rounded-full"
                  style={{ background: '#d5e3fd' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#777587" strokeWidth="1.5" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#777587" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#0d1c2f' }}
                  >
                    {lesson.title}
                  </h3>
                  {module.lockedMessage && (
                    <p className="text-sm" style={{ color: '#464555' }}>
                      {module.lockedMessage}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative">
      {/* Left accent line */}
      <div
        className="absolute -left-4 top-0 bottom-0 w-1 rounded-full hidden lg:block"
        style={{ background: 'rgba(53,37,205,0.13)' }}
      />

      {/* Module header */}
      <div
        className="p-8 rounded-xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ background: '#eff4ff' }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-black text-2xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3525cd' }}
          >
            {moduleNumber}
          </span>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#0d1c2f' }}
          >
            {module.title}
          </h2>
        </div>

        {isInProgress && (
          <span
            className="px-4 py-1.5 font-bold rounded-full text-xs uppercase tracking-widest"
            style={{ background: 'rgba(53,37,205,0.094)', color: '#3525cd' }}
          >
            In Progress
          </span>
        )}
        {completedTasks === allTasks.length && allTasks.length > 0 && (
          <span
            className="px-4 py-1.5 font-bold rounded-full text-xs uppercase tracking-widest"
            style={{ background: 'rgba(0,83,56,0.1)', color: '#005338' }}
          >
            Complete
          </span>
        )}
      </div>

      {/* 12-col grid: lessons + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Lessons */}
        <div className="lg:col-span-8 space-y-8">
          {module.lessons.map(lesson => (
            <LessonSection key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 p-8 rounded-xl" style={{ background: '#dde9ff' }}>
            <h4
              className="text-sm font-black uppercase mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#3525cd',
                letterSpacing: '0.2em',
              }}
            >
              Module Resources
            </h4>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white">
                <p className="text-xs font-bold mb-1" style={{ color: '#0d1c2f' }}>
                  Cheat Sheet
                </p>
                <p className="text-[10px]" style={{ color: '#464555' }}>
                  A quick guide to syntax and common functions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white">
                <p className="text-xs font-bold mb-1" style={{ color: '#0d1c2f' }}>
                  Code Sandbox
                </p>
                <p className="text-[10px]" style={{ color: '#464555' }}>
                  Experiment with your code in a safe environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
