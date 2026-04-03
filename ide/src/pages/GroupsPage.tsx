import { useEffect, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { useLang } from '../i18n/LangContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

interface Group {
  id: string
  name: string
  teacher_id: string
}

interface Member {
  id: string
  user_id: string
  email: string
  joined_at: string
}

function getToken() {
  try {
    const raw = localStorage.getItem('sb-vauvwjvotkoawembictz-auth-token')
    if (!raw) return null
    return JSON.parse(raw)?.access_token ?? null
  } catch {
    return null
  }
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function GroupsPage() {
  const { t } = useLang()
  const [role, setRole] = useState<string>('student')
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [newGroupName, setNewGroupName] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch(`${API}/api/profile`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => setRole(d.role ?? 'student'))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/api/groups`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => { setGroups(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function selectGroup(g: Group) {
    setSelectedGroup(g)
    setMembers([])
    setMsg('')
    fetch(`${API}/api/groups/${g.id}/members`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => setMembers(Array.isArray(d) ? d : []))
      .catch(() => {})
  }

  async function createGroup() {
    if (!newGroupName.trim()) return
    const res = await fetch(`${API}/api/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ name: newGroupName.trim() }),
    })
    if (res.ok) {
      const g = await res.json()
      setGroups(prev => [...prev, g])
      setNewGroupName('')
      setMsg('Топ жасалды')
    } else {
      setMsg('Қате')
    }
  }

  async function addMember() {
    if (!selectedGroup || !addEmail.trim()) return
    const res = await fetch(`${API}/api/groups/${selectedGroup.id}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ email: addEmail.trim() }),
    })
    if (res.ok) {
      const { user_id, email } = await res.json()
      setMembers(prev => [...prev, { id: user_id, user_id, email, joined_at: new Date().toISOString() }])
      setAddEmail('')
      setMsg('Студент қосылды')
    } else {
      const e = await res.json()
      setMsg(e.error || 'Қате')
    }
  }

  async function removeMember(userId: string) {
    if (!selectedGroup) return
    await fetch(`${API}/api/groups/${selectedGroup.id}/members/${userId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    setMembers(prev => prev.filter(m => m.user_id !== userId))
  }

  async function deleteGroup(id: string) {
    await fetch(`${API}/api/groups/${id}`, { method: 'DELETE', headers: authHeaders() })
    setGroups(prev => prev.filter(g => g.id !== id))
    if (selectedGroup?.id === id) { setSelectedGroup(null); setMembers([]) }
  }

  const canManage = role === 'admin' || role === 'teacher'

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-[#0d1c2f] mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {t('studentGroupsTitle')}
        </h1>

        {msg && (
          <div className="mb-4 rounded-lg bg-indigo-50 px-4 py-2 text-sm text-indigo-700">{msg}</div>
        )}

        {/* Create group (teacher/admin) */}
        {canManage && (
          <div className="mb-6 flex gap-2">
            <input
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Топ атауы..."
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createGroup()}
            />
            <button
              onClick={createGroup}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              + Топ жасау
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Groups list */}
          <div className="w-56 shrink-0">
            {loading ? (
              <p className="text-sm text-slate-400">Жүктелуде...</p>
            ) : groups.length === 0 ? (
              <p className="text-sm text-slate-400">Топ жоқ</p>
            ) : (
              <ul className="space-y-1">
                {groups.map(g => (
                  <li
                    key={g.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors ${
                      selectedGroup?.id === g.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-100 text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => selectGroup(g)}
                  >
                    <span className="truncate">{g.name}</span>
                    {role === 'admin' && (
                      <button
                        onClick={e => { e.stopPropagation(); deleteGroup(g.id) }}
                        className="ml-2 text-xs opacity-60 hover:opacity-100"
                        title="Жою"
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Members panel */}
          {selectedGroup && (
            <div className="flex-1 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-[#0d1c2f]">{selectedGroup.name} — мүшелер</h2>

              {/* Add member (teacher/admin) */}
              {canManage && (
                <div className="mb-4 flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="student@example.com"
                    value={addEmail}
                    onChange={e => setAddEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addMember()}
                  />
                  <button
                    onClick={addMember}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    + Қосу
                  </button>
                </div>
              )}

              {members.length === 0 ? (
                <p className="text-sm text-slate-400">Мүше жоқ</p>
              ) : (
                <ul className="space-y-2">
                  {members.map(m => (
                    <li key={m.user_id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-700">{m.email}</span>
                      {canManage && (
                        <button
                          onClick={() => removeMember(m.user_id)}
                          className="text-xs text-slate-400 hover:text-red-500"
                        >
                          Шығару
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
