import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { AppShell } from '../components/layout/AppShell'

export function ProfilePage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email)
    })
  }, [])

  const initial = email ? email[0].toUpperCase() : '?'

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-full gap-6 py-24">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
          {initial}
        </div>
        <p className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {email || '…'}
        </p>
      </div>
    </AppShell>
  )
}
