import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { DashboardPage } from './pages/DashboardPage'
import { CoursePlanPage } from './pages/CoursePlanPage'
import { IDEPage } from './pages/IDEPage'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { LessonTheoryPage } from './pages/LessonTheoryPage'
import { ProfilePage } from './pages/ProfilePage'
import { GroupsPage } from './pages/GroupsPage'

// DEV ONLY: set to false to skip auth
const AUTH_ENABLED = false

function RequireAuth({ session, children }: { session: Session | null; children: JSX.Element }) {
  if (AUTH_ENABLED && !session) return <Navigate to="/auth" replace />
  return children
}

function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (AUTH_ENABLED) {
        if (!session && location.pathname !== '/auth') navigate('/auth', { replace: true })
        if (session && location.pathname === '/auth') navigate('/', { replace: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (AUTH_ENABLED && session === undefined) return null

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<RequireAuth session={session}><DashboardPage /></RequireAuth>} />
      <Route path="/course/:courseSlug" element={<RequireAuth session={session}><CoursePlanPage /></RequireAuth>} />
      <Route path="/ide/:taskId" element={<RequireAuth session={session}><IDEPage /></RequireAuth>} />
      <Route path="/admin" element={<RequireAuth session={session}><AdminPage /></RequireAuth>} />
      <Route path="/lesson/:lessonId" element={<RequireAuth session={session}><LessonTheoryPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth session={session}><ProfilePage /></RequireAuth>} />
      <Route path="/groups" element={<RequireAuth session={session}><GroupsPage /></RequireAuth>} />
    </Routes>
  )
}

export default App
