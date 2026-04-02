import { useEffect, useState, useCallback } from 'react'
import { IconPlus, IconChevronRight } from '@tabler/icons-react'
import { AppShell } from '../components/layout/AppShell'
import { supabase } from '../lib/supabase'

type Tab = 'course' | 'module' | 'lesson' | 'task'

interface Course { id: string; slug: string; title: string; icon: string; color: string }
interface Module { id: string; title: string; course_id: string }
interface Lesson { id: string; title: string; module_id: string }


export function AdminPage() {
  const [tab, setTab] = useState<Tab>('course')
  const [courses, setCourses] = useState<Course[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Form fields
  const [courseTitle, setCourseTitle] = useState('')
  const [courseSlug, setCourseSlug] = useState('')
  const [courseDesc, setCourseDesc] = useState('')
  const [courseIcon, setCourseIcon] = useState('📚')
  const [courseColor, setCourseColor] = useState('#3525cd')

  const [moduleTitle, setModuleTitle] = useState('')

  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonMd, setLessonMd] = useState('')

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskLang, setTaskLang] = useState('javascript')
  const [taskStarter, setTaskStarter] = useState('')
  const [taskSolution, setTaskSolution] = useState('')

  const fetchCourses = useCallback(async () => {
    const { data } = await supabase.from('courses').select('id, slug, title, icon, color').order('created_at')
    setCourses(data ?? [])
  }, [])

  const fetchModules = useCallback(async (courseId: string) => {
    if (!courseId) return
    const { data } = await supabase.from('modules').select('id, title, course_id').eq('course_id', courseId).order('order_index')
    setModules(data ?? [])
  }, [])

  const fetchLessons = useCallback(async (moduleId: string) => {
    if (!moduleId) return
    const { data } = await supabase.from('lessons').select('id, title, module_id').eq('module_id', moduleId).order('order_index')
    setLessons(data ?? [])
  }, [])

  useEffect(() => { fetchCourses() }, [fetchCourses])
  useEffect(() => { if (selectedCourse) fetchModules(selectedCourse) }, [selectedCourse, fetchModules])
  useEffect(() => { if (selectedModule) fetchLessons(selectedModule) }, [selectedModule, fetchLessons])

  function flash(msg: string) {
    setSuccess(msg)
    setError('')
    setTimeout(() => setSuccess(''), 2500)
  }

  function flashErr(msg: string) {
    setError(msg)
    setSuccess('')
  }

  async function createCourse(e: React.FormEvent) {
    e.preventDefault()
    const { error: err } = await supabase.from('courses').insert({
      title: courseTitle.trim(),
      slug: courseSlug.trim(),
      description: courseDesc.trim(),
      icon: courseIcon.trim(),
      color: courseColor,
    })
    if (err) { flashErr(err.message); return }
    setCourseTitle(''); setCourseSlug(''); setCourseDesc('')
    await fetchCourses()
    flash('Course created!')
  }

  async function createModule(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedCourse) { flashErr('Select a course first'); return }
    const { error: err } = await supabase.from('modules').insert({
      title: moduleTitle.trim(),
      course_id: selectedCourse,
      order_index: modules.length,
    })
    if (err) { flashErr(err.message); return }
    setModuleTitle('')
    await fetchModules(selectedCourse)
    flash('Module created!')
  }

  async function createLesson(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedModule) { flashErr('Select a module first'); return }
    const { error: err } = await supabase.from('lessons').insert({
      title: lessonTitle.trim(),
      theory_md: lessonMd.trim() || null,
      module_id: selectedModule,
      order_index: lessons.length,
    })
    if (err) { flashErr(err.message); return }
    setLessonTitle(''); setLessonMd('')
    await fetchLessons(selectedModule)
    flash('Lesson created!')
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedLesson) { flashErr('Select a lesson first'); return }
    const { error: err } = await supabase.from('tasks').insert({
      title: taskTitle.trim(),
      description: taskDesc.trim() || null,
      language: taskLang,
      starter_code: taskStarter.trim() || null,
      solution_code: taskSolution.trim() || null,
      lesson_id: selectedLesson,
      order_index: 0,
    })
    if (err) { flashErr(err.message); return }
    setTaskTitle(''); setTaskDesc(''); setTaskStarter(''); setTaskSolution('')
    flash('Task created!')
  }

  const inputCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const selectCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5'
  const tabs: { id: Tab; label: string }[] = [
    { id: 'course', label: 'New Course' },
    { id: 'module', label: 'New Module' },
    { id: 'lesson', label: 'New Lesson' },
    { id: 'task', label: 'New Task' },
  ]

  return (
    <AppShell>
      <div className="px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Course Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">Manage courses, modules, lessons, and tasks.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: courses list */}
          <section className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold tracking-tight border-l-4 border-[#3525cd] pl-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Live Repositories
              </h2>
              <button
                onClick={() => setTab('course')}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                title="Create new course"
              >
                <IconPlus size={14} />
              </button>
            </div>

            <div className="rounded-xl p-2 space-y-2" style={{ background: '#eff4ff' }}>
              {courses.length === 0 && (
                <p className="text-xs text-slate-400 px-3 py-2">No courses yet. Create one →</p>
              )}
              {courses.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCourse(c.id); setTab('module') }}
                  className={`w-full bg-white p-4 rounded-xl flex items-center justify-between group hover:bg-[#f8f9ff] transition-colors text-left ${selectedCourse === c.id ? 'ring-2 ring-[#3525cd]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: '#e2dfff' }}>
                      {c.icon ?? '📚'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#0d1c2f]">{c.title}</p>
                      <p className="text-xs text-slate-400">{c.slug}</p>
                    </div>
                  </div>
                  <IconChevronRight size={14} className="text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* Right: creation form */}
          <section className="lg:col-span-8">
            <div className="rounded-xl p-6" style={{ background: '#eff4ff' }}>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${tab === t.id ? 'bg-[#3525cd] text-white' : 'text-slate-500 hover:text-[#3525cd]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {success && <p className="text-xs text-green-600 font-medium mb-4 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}
              {error && <p className="text-xs text-red-500 font-medium mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              {/* Course form */}
              {tab === 'course' && (
                <form onSubmit={createCourse} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Title</label>
                      <input className={inputCls} value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="Fullstack JS" required />
                    </div>
                    <div>
                      <label className={labelCls}>Slug</label>
                      <input className={inputCls} value={courseSlug} onChange={e => setCourseSlug(e.target.value)} placeholder="fullstack-js" required />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Description</label>
                    <input className={inputCls} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="Short description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Icon (emoji or text)</label>
                      <input className={inputCls} value={courseIcon} onChange={e => setCourseIcon(e.target.value)} placeholder="JS" maxLength={4} />
                    </div>
                    <div>
                      <label className={labelCls}>Color</label>
                      <input type="color" className="w-full h-10 rounded-lg cursor-pointer border-none" value={courseColor} onChange={e => setCourseColor(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    Create Course
                  </button>
                </form>
              )}

              {/* Module form */}
              {tab === 'module' && (
                <form onSubmit={createModule} className="space-y-4">
                  <div>
                    <label className={labelCls}>Course</label>
                    <select className={selectCls} value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} required>
                      <option value="">Select course…</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Module Title</label>
                    <input className={inputCls} value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Module 01: JavaScript Basics" required />
                  </div>
                  {modules.length > 0 && (
                    <div className="text-xs text-slate-400">
                      Existing: {modules.map(m => m.title).join(', ')}
                    </div>
                  )}
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    Create Module
                  </button>
                </form>
              )}

              {/* Lesson form */}
              {tab === 'lesson' && (
                <form onSubmit={createLesson} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Course</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule('') }} required>
                        <option value="">Select course…</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Module</label>
                      <select className={selectCls} value={selectedModule} onChange={e => setSelectedModule(e.target.value)} required>
                        <option value="">Select module…</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Lesson Title</label>
                    <input className={inputCls} value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="Variables & Scope" required />
                  </div>
                  <div>
                    <label className={labelCls}>Theory (Markdown)</label>
                    <textarea
                      className={inputCls}
                      rows={12}
                      value={lessonMd}
                      onChange={e => setLessonMd(e.target.value)}
                      placeholder={`## Introduction\n\nExplain the topic here...\n\n\`\`\`javascript\nconsole.log('Hello')\n\`\`\``}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Supports Markdown with code blocks.</p>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    Create Lesson
                  </button>
                </form>
              )}

              {/* Task form */}
              {tab === 'task' && (
                <form onSubmit={createTask} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className={labelCls}>Course</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule(''); setSelectedLesson('') }}>
                        <option value="">Select…</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Module</label>
                      <select className={selectCls} value={selectedModule} onChange={e => { setSelectedModule(e.target.value); setSelectedLesson('') }}>
                        <option value="">Select…</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Lesson</label>
                      <select className={selectCls} value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} required>
                        <option value="">Select…</option>
                        {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Task Title</label>
                      <input className={inputCls} value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Write a sum function" required />
                    </div>
                    <div>
                      <label className={labelCls}>Language</label>
                      <select className={selectCls} value={taskLang} onChange={e => setTaskLang(e.target.value)}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="postgresql">PostgreSQL</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Description</label>
                    <textarea className={inputCls} rows={2} value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder="What should the student do?" style={{ resize: 'vertical' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Starter Code</label>
                      <textarea className={inputCls} rows={5} value={taskStarter} onChange={e => setTaskStarter(e.target.value)} placeholder="function sum(a, b) {\n  // your code\n}" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className={labelCls}>Solution Code</label>
                      <textarea className={inputCls} rows={5} value={taskSolution} onChange={e => setTaskSolution(e.target.value)} placeholder="function sum(a, b) {\n  return a + b\n}" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }} />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    Create Task
                  </button>
                </form>
              )}

            </div>
          </section>

        </div>
      </div>
    </AppShell>
  )
}
