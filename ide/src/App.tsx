import { Routes, Route } from 'react-router-dom'
import { TaskListPage } from './pages/TaskListPage'
import { IDEPage } from './pages/IDEPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskListPage />} />
      <Route path="/ide/:taskId" element={<IDEPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
