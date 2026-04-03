import { useState, useEffect } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  children: React.ReactNode
}

const COLLAPSED_KEY = 'kodhau-sidebar-collapsed'

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSED_KEY) === 'true' } catch { return false }
  })

  function toggleCollapse() {
    setCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem(COLLAPSED_KEY, String(next)) } catch {}
      return next
    })
  }

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="h-screen overflow-hidden bg-[#f8f9ff]">
      <Sidebar
        open={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main content — on desktop offset by sidebar width, on mobile full width */}
      <div className={`flex h-full flex-col min-w-0 overflow-hidden transition-[margin] duration-300 ${collapsed ? 'lg:ml-14' : 'lg:ml-60'}`}>
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <IconMenu2 size={20} />
          </button>
          <span className="text-base font-semibold tracking-tight text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            KodHau
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
