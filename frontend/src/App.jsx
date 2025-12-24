import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import PredictionPage from './pages/PredictionPage'
import TrendsPage from './pages/TrendsPage'
import FeedbackPage from './pages/FeedbackPage'
import AdminPanel from './pages/AdminPanel'
import SettingsPage from './pages/SettingsPage'
import NotFound from './pages/NotFound'

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback routes */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App