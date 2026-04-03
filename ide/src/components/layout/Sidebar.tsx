import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  IconLayoutDashboard, IconSettings, IconUsers, IconUser,
  IconChevronLeft, IconChevronRight,
} from '@tabler/icons-react'
import { supabase } from '../../lib/supabase'
import { useLang } from '../../i18n/LangContext'
import type { Lang } from '../../i18n/translations'

const LANGS: { value: Lang; label: string }[] = [
  { value: 'kk', label: 'ҚАЗ' },
  { value: 'ru', label: 'РУС' },
  { value: 'en', label: 'ENG' },
]

interface SidebarProps {
  open: boolean
  collapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export function Sidebar({ open, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { t, lang, setLang } = useLang()

  const navItems = [
    { to: '/', label: t('dashboard'), icon: <IconLayoutDashboard size={18} /> },
    { to: '/admin', label: t('admin'), icon: <IconSettings size={18} /> },
    { to: '/groups', label: t('studentGroups'), icon: <IconUsers size={18} /> },
    { to: '/profile', label: t('profile'), icon: <IconUser size={18} /> },
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email)
    })
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/auth', { replace: true })
  }

  const initial = email ? email[0].toUpperCase() : '?'

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0d1c2f] text-white
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:transition-[width] lg:duration-300
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-14' : 'lg:w-60'}
          w-60
        `}
      >
        {/* Logo + collapse toggle */}
        <div className="flex items-center gap-2 px-3 py-5 border-b border-white/10 min-h-[64px]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
            K
          </div>
          {!collapsed && (
            <span className="flex-1 text-lg font-semibold tracking-tight whitespace-nowrap overflow-hidden" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              KodHau
            </span>
          )}
          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex ml-auto h-6 w-6 items-center justify-center rounded text-slate-400 hover:text-white transition-colors"
          >
            {collapsed ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
          </button>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden ml-auto h-6 w-6 flex items-center justify-center rounded text-slate-400 hover:text-white"
          >
            <IconChevronLeft size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="flex shrink-0 items-center">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Language picker */}
        {!collapsed && (
          <div className="px-3 pb-2 flex gap-1">
            {LANGS.map((l) => (
              <button
                key={l.value}
                onClick={() => setLang(l.value)}
                className={`flex-1 rounded-lg py-1 text-[10px] font-bold tracking-wider transition-colors ${
                  lang === l.value ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}

        {/* User */}
        <div className="border-t border-white/10 px-2 py-3">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold"
              title={collapsed ? email : undefined}
            >
              {initial}
            </div>
            {!collapsed && (
              <p className="min-w-0 flex-1 truncate text-sm text-white">{email || '…'}</p>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={handleSignOut}
              className="mt-2 w-full rounded-lg py-1.5 text-xs text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              {t('signOut')}
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
