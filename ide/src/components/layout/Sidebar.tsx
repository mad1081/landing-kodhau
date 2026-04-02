import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconLayoutDashboard, IconSettings, IconUsers, IconUser } from '@tabler/icons-react'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/', label: 'Dashboard', icon: <IconLayoutDashboard size={18} /> },
  { to: '/admin', label: 'Admin', icon: <IconSettings size={18} /> },
  { to: '/groups', label: 'Student Groups', icon: <IconUsers size={18} /> },
  { to: '/profile', label: 'Profile', icon: <IconUser size={18} /> },
]

export function Sidebar() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

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
    <aside className="flex h-screen w-60 flex-col bg-[#0d1c2f] text-white shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
          K
        </div>
        <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          KodHau
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="flex items-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold">
            {initial}
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-white">{email || '…'}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-3 w-full rounded-lg py-1.5 text-xs text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
