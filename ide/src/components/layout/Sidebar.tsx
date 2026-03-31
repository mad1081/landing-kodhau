import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞' },
  { to: '/admin', label: 'Admin', icon: '⚙' },
]

export function Sidebar() {
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
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-white/10">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold">
          D
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">Developer</p>
          <p className="truncate text-xs text-slate-400">Student</p>
        </div>
      </div>
    </aside>
  )
}
