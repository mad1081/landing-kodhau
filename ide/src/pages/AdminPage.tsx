import { useEffect, useState, useCallback } from 'react'
import { IconPlus, IconChevronRight, IconCheck, IconX } from '@tabler/icons-react'
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

type Tab = 'course' | 'module' | 'lesson' | 'task'

interface Course { id: string; slug: string; title: string; icon: string; color: string }
interface Module { id: string; title: string; course_id: string }
interface Lesson { id: string; title: string; module_id: string }


export function AdminPage() {
  const { t } = useLang()
  const [tab, setTab] = useState<Tab>('course')
  const [courses, setCourses] = useState<Course[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

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

  const fetchCourses = useCallback(async () => {
    const res = await fetch(`${API}/api/courses`)
    const data = await res.json()
    setCourses(data ?? [])
  }, [])

  const fetchModules = useCallback(async (courseId: string) => {
    if (!courseId) return
    const res = await fetch(`${API}/api/courses/${courseId}/modules`)
    const data = await res.json()
    setModules(data ?? [])
  }, [])

  const fetchLessons = useCallback(async (moduleId: string) => {
    if (!moduleId) return
    const res = await fetch(`${API}/api/modules/${moduleId}/lessons`)
    const data = await res.json()
    setLessons(data ?? [])
  }, [])

  useEffect(() => { fetchCourses() }, [fetchCourses])
  useEffect(() => { if (selectedCourse) fetchModules(selectedCourse) }, [selectedCourse, fetchModules])
  useEffect(() => { if (selectedModule) fetchLessons(selectedModule) }, [selectedModule, fetchLessons])

  function flash(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 2500)
  }

  function flashErr(msg: string) { flash(msg, false) }

  async function createCourse(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`${API}/api/courses`, {
      method: 'POST',
      headers: await authHeaders(),
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
      method: 'POST',
      headers: await authHeaders(),
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
      method: 'POST',
      headers: await authHeaders(),
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
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ title: taskTitle.trim(), description: taskDesc.trim() || null, language: taskLang, starter_code: taskStarter.trim() || null, function_name: taskFuncName.trim() || null, test_cases, lesson_id: selectedLesson, order_index: 0 }),
    })
    const data = await res.json()
    if (!res.ok) { flashErr(data.error); return }
    setTaskTitle(''); setTaskDesc(''); setTaskStarter(''); setTaskFuncName(''); setTaskTestCases('')
    flash(t('taskCreated'))
  }

  const inputCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const selectCls = 'w-full bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30'
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5'
  const tabs: { id: Tab; label: string }[] = [
    { id: 'course', label: t('newCourse') },
    { id: 'module', label: t('newModule') },
    { id: 'lesson', label: t('newLesson') },
    { id: 'task', label: t('newTask') },
  ]

  return (
    <AppShell>
      {/* Toast overlay */}
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(2px)', background: 'rgba(13,28,47,0.35)' }}>
          <div className={`flex flex-col items-center gap-3 rounded-2xl px-10 py-8 shadow-2xl ${toast.ok ? 'bg-white' : 'bg-white'}`}>
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${toast.ok ? 'bg-green-100' : 'bg-red-100'}`}>
              {toast.ok
                ? <IconCheck size={28} className="text-green-600" strokeWidth={2.5} />
                : <IconX size={28} className="text-red-500" strokeWidth={2.5} />}
            </div>
            <p className="text-sm font-semibold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{toast.msg}</p>
          </div>
        </div>
      )}
      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t('courseManagement')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('manageCourses')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left: courses list */}
          <section className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold tracking-tight border-l-4 border-[#3525cd] pl-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t('liveRepositories')}
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
                <p className="text-xs text-slate-400 px-3 py-2">{t('noCoursesYet')}</p>
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

              {/* Feedback inline removed — using toast overlay */}

              {/* Course form */}
              {tab === 'course' && (
                <form onSubmit={createCourse} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t('titleLabel')}</label>
                      <input className={inputCls} value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="Fullstack JS" required />
                    </div>
                    <div>
                      <label className={labelCls}>{t('slugLabel')}</label>
                      <input className={inputCls} value={courseSlug} onChange={e => setCourseSlug(e.target.value)} placeholder="fullstack-js" required />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('descriptionLabel')}</label>
                    <input className={inputCls} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="Short description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t('iconLabel')}</label>
                      <input className={inputCls} value={courseIcon} onChange={e => setCourseIcon(e.target.value)} placeholder="JS" maxLength={4} />
                    </div>
                    <div>
                      <label className={labelCls}>{t('colorLabel')}</label>
                      <input type="color" className="w-full h-10 rounded-lg cursor-pointer border-none" value={courseColor} onChange={e => setCourseColor(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    {t('createCourse')}
                  </button>
                </form>
              )}

              {/* Module form */}
              {tab === 'module' && (
                <form onSubmit={createModule} className="space-y-4">
                  <div>
                    <label className={labelCls}>{t('courseLabel')}</label>
                    <select className={selectCls} value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} required>
                      <option value="">{t('selectCourseOption')}</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>{t('moduleTitleLabel')}</label>
                    <input className={inputCls} value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Module 01: JavaScript Basics" required />
                  </div>
                  {modules.length > 0 && (
                    <div className="text-xs text-slate-400">
                      {t('existingLabel')} {modules.map(m => m.title).join(', ')}
                    </div>
                  )}
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    {t('createModule')}
                  </button>
                </form>
              )}

              {/* Lesson form */}
              {tab === 'lesson' && (
                <form onSubmit={createLesson} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t('courseLabel')}</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule('') }} required>
                        <option value="">{t('selectCourseOption')}</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{t('moduleLabel')}</label>
                      <select className={selectCls} value={selectedModule} onChange={e => setSelectedModule(e.target.value)} required>
                        <option value="">{t('selectModuleOption')}</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('lessonTitleLabel')}</label>
                    <input className={inputCls} value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="Variables & Scope" required />
                  </div>
                  <div>
                    <label className={labelCls}>{t('theoryMarkdown')}</label>
                    <textarea
                      className={inputCls}
                      rows={12}
                      value={lessonMd}
                      onChange={e => setLessonMd(e.target.value)}
                      placeholder={`## Introduction\n\nExplain the topic here...\n\n\`\`\`javascript\nconsole.log('Hello')\n\`\`\``}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">{t('supportsMarkdown')}</p>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    {t('createLesson')}
                  </button>
                </form>
              )}

              {/* Task form */}
              {tab === 'task' && (
                <form onSubmit={createTask} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className={labelCls}>{t('courseLabel')}</label>
                      <select className={selectCls} value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedModule(''); setSelectedLesson('') }}>
                        <option value="">{t('selectOption')}</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{t('moduleLabel')}</label>
                      <select className={selectCls} value={selectedModule} onChange={e => { setSelectedModule(e.target.value); setSelectedLesson('') }}>
                        <option value="">{t('selectOption')}</option>
                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{t('lessonLabel')}</label>
                      <select className={selectCls} value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} required>
                        <option value="">{t('selectOption')}</option>
                        {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t('taskTitleLabel')}</label>
                      <input className={inputCls} value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Write a sum function" required />
                    </div>
                    <div>
                      <label className={labelCls}>{t('languageLabel')}</label>
                      <select className={selectCls} value={taskLang} onChange={e => setTaskLang(e.target.value)}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="postgresql">PostgreSQL</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('descriptionLabel')}</label>
                    <textarea className={inputCls} rows={2} value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder="What should the student do?" style={{ resize: 'vertical' }} />
                  </div>
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
                    <textarea
                      className={inputCls} rows={4} value={taskTestCases} onChange={e => setTaskTestCases(e.target.value)}
                      placeholder={`[{"input": [2, 3], "expected": 5}, {"input": [0, 0], "expected": 0}]`}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', resize: 'vertical' }}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">{t('testCasesHint')}</p>
                  </div>
                  <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-[#3525cd] hover:opacity-90 transition">
                    {t('createTask')}
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
