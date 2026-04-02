import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconBolt, IconHexagons, IconFileText,
  IconPencil, IconTrash, IconStack2, IconCheck,
  IconChevronDown, IconPlayerPlay, IconPlus,
} from '@tabler/icons-react'
import { AppShell } from '../components/layout/AppShell'
import { addTask, deleteAdminTask, getAdminTasks } from '../data/taskStorage'
import type { TaskCategory } from '../data/mockProblem'

export function AdminPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [added, setAdded] = useState(false)
  const [adminTasks, setAdminTasks] = useState(getAdminTasks())

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = title.trim()
      if (!trimmed) return
      addTask(trimmed, 'javascript' as TaskCategory)
      setTitle('')
      setAdded(true)
      setAdminTasks(getAdminTasks())
      setTimeout(() => setAdded(false), 2000)
    },
    [title]
  )

  const handleDelete = useCallback((id: string) => {
    deleteAdminTask(id)
    setAdminTasks(getAdminTasks())
  }, [])

  return (
    <AppShell>
      <div className="px-8 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold text-[#0d1c2f]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Course Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage courses, modules, and lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Live Repositories */}
          <section className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2
                className="text-sm font-bold tracking-tight border-l-4 border-[#3525cd] pl-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Live Repositories
              </h2>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                title="Create new course"
              >
                <IconPlus size={14} />
              </button>
            </div>

            <div className="rounded-xl p-2 space-y-2" style={{ background: '#eff4ff' }}>

              <div className="bg-white p-4 rounded-xl flex items-center justify-between group hover:bg-[#f8f9ff] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#3525cd]" style={{ background: '#e2dfff' }}>
                    <IconBolt size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0d1c2f]">Fullstack JS</p>
                    <p className="text-xs text-slate-400">24 Modules • 128 Lessons</p>
                  </div>
                </div>
                <button className="text-[#3525cd] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#dde9ff] rounded-lg">
                  <IconPencil size={14} />
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl flex items-center justify-between group hover:bg-[#f8f9ff] transition-colors border-l-4 border-[#005338]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#006591]" style={{ background: '#d5e3fd' }}>
                    <IconHexagons size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0d1c2f]">Backend Systems</p>
                    <p className="text-xs text-slate-400">12 Modules • 45 Lessons</p>
                  </div>
                </div>
                <button className="text-[#3525cd] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#dde9ff] rounded-lg">
                  <IconPencil size={14} />
                </button>
              </div>

              {adminTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-xl flex items-center justify-between group hover:bg-[#f8f9ff] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#006591]" style={{ background: '#d5e3fd' }}>
                      <IconFileText size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#0d1c2f]">{task.title}</p>
                      <p className="text-xs text-slate-400">{task.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => navigate(`/ide/${task.id}`)}
                      className="p-1.5 hover:bg-[#dde9ff] rounded-lg text-[#3525cd]"
                    >
                      <IconPlayerPlay size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg text-red-500"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Creation Flow */}
          <section className="lg:col-span-8">
            <div className="rounded-xl p-6" style={{ background: '#eff4ff' }}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5">
                <h2 className="font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Active Creation Flow
                </h2>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => (
                    <span key={i} className="w-6 h-1 rounded-full bg-[#3525cd]" />
                  ))}
                  <span className="w-6 h-1 rounded-full bg-[#d5e3fd]" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Step 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-[#3525cd] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <label className="block text-sm font-semibold text-[#0d1c2f] mb-2">Task Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Advanced TypeScript Architect"
                    className="w-full bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
                  />
                </div>

                {/* Step 2 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-[#3525cd] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div className="bg-white p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <IconStack2 size={16} className="text-[#006591]" />
                        <input
                          className="bg-transparent font-semibold text-sm p-0 focus:outline-none"
                          placeholder="Module Name"
                          defaultValue="JavaScript Basics"
                        />
                      </div>
                      <button type="button" className="text-slate-400 hover:text-red-500 transition-colors">
                        <IconTrash size={14} />
                      </button>
                    </div>
                    <div className="ml-4 pl-4 space-y-3 border-l-2 border-[#dde9ff]">
                      <div className="p-3 rounded-lg flex items-center justify-between" style={{ background: '#eff4ff' }}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#3525cd] text-white flex items-center justify-center text-[10px] font-bold">3</div>
                          <span className="text-sm font-medium">Variables &amp; Scope</span>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" className="p-1 hover:bg-[#d5e3fd] rounded"><IconPencil size={12} /></button>
                          <button type="button" className="p-1 hover:bg-[#d5e3fd] rounded"><IconChevronDown size={12} /></button>
                        </div>
                      </div>
                      <button type="button" className="flex items-center gap-1.5 text-[#3525cd] text-xs font-semibold px-3 py-1.5 hover:bg-[#3525cd]/5 rounded transition-all">
                        + Add New Lesson
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-[#dde9ff] rounded-xl transition-all"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 text-sm text-white font-semibold rounded-xl transition-all hover:opacity-90"
                    style={{ background: '#3525cd' }}
                  >
                    {added ? (
                      <span className="flex items-center gap-2"><IconCheck size={14} /> Added!</span>
                    ) : 'Deploy Curriculum'}
                  </button>
                </div>

              </form>
            </div>
          </section>

        </div>
      </div>
    </AppShell>
  )
}
