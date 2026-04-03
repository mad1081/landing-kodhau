import { useEffect, useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { IconPlus, IconChevronRight, IconCheck, IconX, IconTrash } from '@tabler/icons-react'
import { AppShell } from '../components/layout/AppShell'
import { useLang } from '../i18n/LangContext'
import { supabase } from '../lib/supabase'

const API = import.meta.env.VITE_API_URL

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

type Tab = 'course' | 'module' | 'lesson' | 'task' | 'users'

interface Course { id: string; slug: string; title: string; icon: string; color: string }
interface Module { id: string; title: string; course_id: string }
interface Lesson { id: string; title: string; module_id: string }
interface Task { id: string; title: string; lesson_id: string }
interface User { id: string; email: string; role: string }

export function AdminPage() {
  const { t } = useLang()
  const [role, setRole] = useState<string | null>(null)
  const [roleLoading, setRoleLoading] = useState(true)

  const [tab, setTab] = useState<Tab>('course')
  const [courses, setCourses] = useState<Course[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  // Users tab
  const [users, setUsers] = useState<User[]>([])
  const [userSearch, setUserSearch] = useState('')

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
  const [taskFuncName, setTaskFuncName] = useState('')
  const [taskTestCases, setTaskTestCases] = useState('')

  // Load role
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const r = data.session?.user?.user_metadata?.role ?? 'student'
      setRole(r)
      setRoleLoading(false)
    })
  }, [])

  const fetchCourses = useCallback(async () => {
    const res = await fetch(`${API}/api/courses`)
    const data = await res.json()
    setCourses(data ?? [])
  }, [])

  const fetchModules = useCallback(async (courseId: string) => {
    if (!courseId) return
    const res = await fetch(`${API}/api/courses/${courseId}/modules`)
    setModules((await res.json()) ?? [])
  }, [])

  const fetchLessons = useCallback(async (moduleId: string) => {
    if (!moduleId) return
    const res = await fetch(`${API}/api/modules/${moduleId}/lessons`)
    setLessons((await res.json()) ?? [])
  }, [])

  const fetchTasks = useCallback(async (lessonId: string) => {
    if (!lessonId) return
    const res = await fetch(`${API}/api/lessons/${lessonId}/tasks`)
    setTasks((await res.json()) ?? [])
  }, [])

  const fetchUsers = useCallback(async (q = '') => {
    const headers = await authHeaders()
    const url = q ? `${API}/api/users?email=${encodeURIComponent(q)}` : `${API}/api/users`
    const res = await fetch(url, { headers })
    if (res.ok) setUsers((await res.json()) ?? [])
  }, [])

  useEffect(() => { fetchCourses() }, [fetchCourses])
  useEffect(() => { if (selectedCourse) fetchModules(selectedCourse) }, [selectedCourse, fetchModules])
  useEffect(() => { if (selectedModule) fetchLessons(selectedModule) }, [selectedModule, fetchLessons])
  useEffect(() => { if (selectedLesson) fetchTasks(selectedLesson) }, [selectedLesson, fetchTasks])
  useEffect(() => { if (tab === 'users') fetchUsers() }, [tab, fetchUsers])

  function flash(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 2500)
  }
  function flashErr(msg: string) { flash(msg, false) }

  // ── Create ──────────────────────────────────────────────────────────────────

  async function createCourse(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`${API}/api/courses`, {
      method: 'POST', headers: await authHeaders(),
      body: JSON.stringify({ title: courseTitle.trim(), slug: courseSlug.trim(), description: courseDesc.trim(), icon: courseIcon.trim(), color: courseColor }),
    })
    const data = await res.json()
    if (!res.ok) { flashErr(data.error); return }
    setCourseTitle(''); setCourseSlug(''); setCourseDesc('')
    await fetchCourses()
    flash(t('courseCreated'))
  }

  async function createModule(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedCourse) { flashErr(t('selectCourseFirst')); return }
    const res = await fetch(`${API}/api/modules`, {
      method: 'POST', headers: await authHeaders(),
      body: JSON.stringify({ title: moduleTitle.trim(), course_id: selectedCourse, order_index: modules.length }),
    })
    const data = await res.json()
    if (!res.ok) { flashErr(data.error); return }
    setModuleTitle('')
    await fetchModules(selectedCourse)
    flash(t('moduleCreated'))
  }

  async function createLesson(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedModule) { flashErr(t('selectModuleFirst')); return }
    const res = await fetch(`${API}/api/lessons`, {
      method: 'POST', headers: await authHeaders(),
      body: JSON.stringify({ title: lessonTitle.trim(), theory_md: lessonMd.trim() || null, module_id: selectedModule, order_index: lessons.length }),
    })
    const data = await res.json()
    if (!res.ok) { flashErr(data.error); return }
    setLessonTitle(''); setLessonMd('')
    await fetchLessons(selectedModule)
    flash(t('lessonCreated'))
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedLesson) { flashErr(t('selectLessonFirst')); return }
    let test_cases = null
    if (taskTestCases.trim()) {
      try { test_cases = JSON.parse(taskTestCases.trim()) } catch { flashErr(t('invalidJson')); return }
    }
    const res = await fetch(`${API}/api/tasks`, {
      method: 'POST', headers: await authHeaders(),
      body: JSON.stringify({ title: taskTitle.trim(), description: taskDesc.trim() || null, language: taskLang, starter_code: taskStarter.trim() || null, function_name: taskFuncName.trim() || null, test_cases, lesson_id: selectedLesson, order_index: 0 }),
    })
    const data = await res.json()
    if (!res.ok) { flashErr(data.error); return }
    setTaskTitle(''); setTaskDesc(''); setTaskStarter(''); setTaskFuncName(''); setTaskTestCases('')
    await fetchTasks(selectedLesson)
    flash(t('taskCreated'))
  }

  // ── Delete ──────────────────────────────────────────────────────────────────

  async function deleteItem(url: string, onSuccess: () => void) {
    const res = await fetch(`${API}${url}`, { method: 'DELETE', headers: await authHeaders() })
    if (!res.ok) { flashErr('Delete failed'); return }
    onSuccess()
    flash('Deleted')
  }

  // ── Users ───────────────────────────────────────────────────────────────────

  async function toggleTeacher(user: User) {
    const newRole = user.role === 'teacher' ? 'student' : 'teacher'
    const res = await fetch(`${API}/api/users/${user.id}`, {
      method: 'PUT', headers: await authHeaders(),
      body: JSON.stringify({ role: newRole }),
    })
    if (!res.ok) { flashErr('Failed to update role'); return }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u))
    flash(`${user.email} → ${newRole}`)
  }

  // ── Styles ──────────────────────────────────────────────────────────────────

  const inputCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const selectCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5'

  const tabs: { id: Tab; label: string; adminOnly?: boolean }[] = [
    { id: 'course', label: t('newCourse') },
    { id: 'module', label: t('newModule') },
    { id: 'lesson', label: t('newLesson') },
    { id: 'task', label: t('newTask') },
    { id: 'users', label: 'Пайдаланушылар', adminOnly: true },
  ]

  if (roleLoading) return null
  if (role !== 'admin' && role !== 'teacher') return <Navigate to="/" replace />

  return (
    <AppShell>
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(2px)', background: 'rgba(13,28,47,0.35)' }}>
          <div className="flex flex-col items-center gap-3 rounded-2xl px-10 py-8 shadow-2xl bg-white">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${toast.ok ? 'bg-green-100' : 'bg-red-100'}`}>
              {toast.ok ? <IconCheck size={28} className="text-green-600" strokeWidth={2.5} /> : <IconX size={28} className="text-red-500" strokeWidth={2.5} />}
            </div>
            <p className="text-sm font-semibold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{toast.msg}</p>
          </div>
        </div>
      )}

      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t('courseManagement')}</h1>
          <p className="mt-1 text-sm text-slate-500">{t('manageCourses')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left: courses list */}
          <section className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold tracking-tight border-l-4 border-[#3525cd] pl-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t('liveRepositories')}
              </h2>
              <button onClick={() => setTab('course')} className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
                <IconPlus size={14} />
              </button>
            </div>

            <div className="rounded-xl p-2 space-y-2" style={{ background: '#eff4ff' }}>
              {courses.length === 0 && <p className="text-xs text-slate-400 px-3 py-2">{t('noCoursesYet')}</p>}
              {courses.map(c => (
                <div key={c.id} className={`w-full bg-white p-4 rounded-xl flex items-center justify-between group hover:bg-[#f8f9ff] transition-colors ${selectedCourse === c.id ? 'ring-2 ring-[#3525cd]' : ''}`}>
                  <button className="flex items-center gap-3 flex-1 text-left" onClick={() => { setSelectedCourse(c.id); setTab('module') }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: '#e2dfff' }}>{c.icon ?? '📚'}</div>
                    <div>
                      <p className="font-semibold text-sm text-[#0d1c2f]">{c.title}</p>
                      <p className="text-xs text-slate-400">{c.slug}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-1">
                    <IconChevronRight size={14} className="text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                    {role === 'admin' && (
                      <button onClick={() => deleteItem(`/api/courses/${c.id}`, () => { fetchCourses(); if (selectedCourse === c.id) setSelectedCourse('') })}
                        className="ml-1 p-1 rounded text-slate-300 hover:text-red-500 transition-colors">
                        <IconTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modules list when course selected */}
            {selectedCourse && modules.length > 0 && (
              <div className="rounded-xl p-2 space-y-1" style={{ background: '#f0f4ff' }}>
                <p className="text-xs font-bold text-slate-400 px-2 pb-1">Модульдер</p>
                {modules.map(m => (
                  <div key={m.id} className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg ${selectedModule === m.id ? 'ring-2 ring-[#3525cd]' : ''}`}>
                    <button className="text-sm text-[#0d1c2f] flex-1 text-left" onClick={() => { setSelectedModule(m.id); setTab('lesson') }}>{m.title}</button>
                    <button onClick={() => deleteItem(`/api/modules/${m.id}`, () => { fetchModules(selectedCourse); if (selectedModule === m.id) setSelectedModule('') })}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors">
                      <IconTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Lessons list when module selected */}
            {selectedModule && lessons.length > 0 && (
              <div className="rounded-xl p-2 space-y-1" style={{ background: '#f5f7ff' }}>
                <p className="text-xs font-bold text-slate-400 px-2 pb-1">Сабақтар</p>
                {lessons.map(l => (
                  <div key={l.id} className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg ${selectedLesson === l.id ? 'ring-2 ring-[#3525cd]' : ''}`}>
                    <button className="text-sm text-[#0d1c2f] flex-1 text-left" onClick={() => { setSelectedLesson(l.id); setTab('task') }}>{l.title}</button>
                    <button onClick={() => deleteItem(`/api/lessons/${l.id}`, () => { fetchLessons(selectedModule); if (selectedLesson === l.id) setSelectedLesson('') })}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors">
                      <IconTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tasks list when lesson selected */}
            {selectedLesson && tasks.length > 0 && (
              <div className="rounded-xl p-2 space-y-1" style={{ background: '#f8f9ff' }}>
                <p className="text-xs font-bold text-slate-400 px-2 pb-1">Тапсырмалар</p>
                {tasks.map(tk => (
                  <div key={tk.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg">
                    <span className="text-sm text-[#0d1c2f]">{tk.title}</span>
                    <button onClick={() => deleteItem(`/api/tasks/${tk.id}`, () => fetchTasks(selectedLesson))}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors">
                      <IconTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Right: forms */}
          <section className="lg:col-span-8">
            <div className="rounded-xl p-6" style={{ background: '#eff4ff' }}>
              {/* Tabs */}
              <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl flex-wrap">
                {tabs.filter(tb => !tb.adminOnly || role === 'admin').map(tb => (
                  <button key={tb.id} onClick={() => setTab(tb.id)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${tab === tb.id ? 'bg-[#3525cd] text-white' : 'text-slate-500 hover:text-[#3525cd]'}`}>
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Course form */}
              {tab === 'course' && (
                <form onSubmit={createCourse} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>{t('titleLabel')}</label><input className={inputCls} value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="Fullstack JS" required /></div>
                    <div><label className={labelCls}>{t('slugLabel')}</label><input className={inputCls} value={courseSlug} onChange={e => setCourseSlug(e.target.value)} placeholder="fullstack-js" required /></div>
                  </div>
                  <div><label className={labelCls}>{t('descriptionLabel')}</label><input className={inputCls} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="Short description" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>{t('iconLabel')}</label><input className={inputCls} value={courseIcon} onChange={e => setCourseIcon(e.target.value)} placeholder="JS" maxLength={4} /></div>
                    <div><label className={labelCls}>{t('colorLabel')}</label><input type="color" className="w-full h-10 rounded-lg cursor-pointer border-none" value={courseColor} onChange={e => setCourseColor(e.target.value)} /></div>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">{t('createCourse')}</button>
                </form>
              )}

              {/* Module form */}
              {tab === 'module' && (
                <form onSubmit={createModule} className="space-y-4">
                  <div><label className={labelCls}>{t('courseLabel')}</label>
                    <select className={selectCls} value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} required>
                      <option value="">{t('selectCourseOption')}</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>{t('moduleTitleLabel')}</label><input className={inputCls} value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Module 01: JavaScript Basics" required /></div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">{t('createModule')}</button>
                </form>
              )}

              {/* Lesson form */}
              {tab === 'lesson' && (
                <form onSubmit={createLesson} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>{t('courseLabel')}</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule('') }} required>
                        <option value="">{t('selectCourseOption')}</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>{t('moduleLabel')}</label>
                      <select className={selectCls} value={selectedModule} onChange={e => setSelectedModule(e.target.value)} required>
                        <option value="">{t('selectModuleOption')}</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className={labelCls}>{t('lessonTitleLabel')}</label><input className={inputCls} value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="Variables & Scope" required /></div>
                  <div>
                    <label className={labelCls}>{t('theoryMarkdown')}</label>
                    <textarea className={inputCls} rows={12} value={lessonMd} onChange={e => setLessonMd(e.target.value)}
                      placeholder={`## Introduction\n\nExplain the topic here...`}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }} />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 17.2a2 2 0 0 1-2.83-2.83l8.49-8.49"/></svg>
                        Attach .md file
                        <input type="file" accept=".md" className="hidden" />
                      </label>
                      <p className="text-[10px] text-slate-400">{t('supportsMarkdown')}</p>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">{t('createLesson')}</button>
                </form>
              )}

              {/* Task form */}
              {tab === 'task' && (
                <form onSubmit={createTask} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className={labelCls}>{t('courseLabel')}</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule(''); setSelectedLesson('') }}>
                        <option value="">{t('selectOption')}</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>{t('moduleLabel')}</label>
                      <select className={selectCls} value={selectedModule} onChange={e => { setSelectedModule(e.target.value); setSelectedLesson('') }}>
                        <option value="">{t('selectOption')}</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>{t('lessonLabel')}</label>
                      <select className={selectCls} value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} required>
                        <option value="">{t('selectOption')}</option>
                        {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>{t('taskTitleLabel')}</label><input className={inputCls} value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Write a sum function" required /></div>
                    <div><label className={labelCls}>{t('languageLabel')}</label>
                      <select className={selectCls} value={taskLang} onChange={e => setTaskLang(e.target.value)}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="postgresql">PostgreSQL</option>
                      </select>
                    </div>
                  </div>
                  <div><label className={labelCls}>{t('descriptionLabel')}</label><textarea className={inputCls} rows={2} value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder="What should the student do?" style={{ resize: 'vertical' }} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t('functionNameLabel')}</label>
                      <input className={inputCls} value={taskFuncName} onChange={e => setTaskFuncName(e.target.value)} placeholder="e.g. twoSum" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                      <p className="text-[10px] text-slate-400 mt-1">{t('functionNameHint')}</p>
                    </div>
                    <div>
                      <label className={labelCls}>{t('starterCodeLabel')}</label>
                      <textarea className={inputCls} rows={4} value={taskStarter} onChange={e => setTaskStarter(e.target.value)} placeholder="function sum(a, b) {\n  // your code\n}" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('testCasesJson')}</label>
                    <textarea className={inputCls} rows={4} value={taskTestCases} onChange={e => setTaskTestCases(e.target.value)}
                      placeholder={`[{"input": [2, 3], "expected": 5}]`}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }} />
                    <p className="text-[10px] text-slate-400 mt-1">{t('testCasesHint')}</p>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">{t('createTask')}</button>
                </form>
              )}

              {/* Users tab (admin only) */}
              {tab === 'users' && role === 'admin' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input className={inputCls} value={userSearch} onChange={e => setUserSearch(e.target.value)}
                      placeholder="Email бойынша іздеу..." />
                    <button onClick={() => fetchUsers(userSearch)}
                      className="px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition whitespace-nowrap">
                      Іздеу
                    </button>
                  </div>

                  <div className="space-y-2">
                    {users.map(u => (
                      <div key={u.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#0d1c2f]">{u.email}</p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>{u.role}</span>
                        </div>
                        {u.role !== 'admin' && (
                          <button onClick={() => toggleTeacher(u)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                              u.role === 'teacher'
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}>
                            {u.role === 'teacher' ? 'Мұғалімді алу' : 'Мұғалім ету'}
                          </button>
                        )}
                      </div>
                    ))}
                    {users.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Пайдаланушылар табылмады</p>}
                  </div>
                </div>
              )}

            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
