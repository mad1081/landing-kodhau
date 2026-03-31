import { Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { CoursePlanPage } from './pages/CoursePlanPage'
import { IDEPage } from './pages/IDEPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/course/:courseSlug" element={<CoursePlanPage />} />
      <Route path="/ide/:taskId" element={<IDEPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
