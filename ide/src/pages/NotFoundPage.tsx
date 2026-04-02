import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-full gap-6 py-24 select-none">
        <p className="text-[120px] font-bold leading-none text-indigo-100" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          404
        </p>
        <p className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Page not found
        </p>
        <p className="text-sm text-slate-400">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          Go home
        </button>
      </div>
    </AppShell>
  )
}
