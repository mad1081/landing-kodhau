import { useState } from 'react'
import { supabase } from '../lib/supabase'
import githubLogo from '../assets/logos/github-invertocat-white.svg'

export function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  async function handleGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1c2f]">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-8 text-white">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">K</div>
          <span className="text-lg font-semibold">KodHau</span>
        </div>

        {sent ? (
          <p className="text-slate-300">Check your email — magic link sent to <strong>{email}</strong>.</p>
        ) : mode === 'password' ? (
          <>
            <form onSubmit={handlePassword} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <button
              onClick={() => { setMode('magic'); setError('') }}
              className="mt-3 w-full text-center text-xs text-slate-500 hover:text-slate-300"
            >
              Use magic link instead
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleMagicLink} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send magic link'}
              </button>
            </form>
            <button
              onClick={() => { setMode('password'); setError('') }}
              className="mt-3 w-full text-center text-xs text-slate-500 hover:text-slate-300"
            >
              Use password instead
            </button>
          </>
        )}

        <div className="my-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="flex-1 border-t border-white/10" />
          or
          <span className="flex-1 border-t border-white/10" />
        </div>

        <button
          onClick={handleGitHub}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-sm font-medium hover:bg-white/10"
        >
          <img src={githubLogo} alt="" className="h-4 w-4" />
          Continue with GitHub
        </button>
      </div>
    </div>
  )
}
