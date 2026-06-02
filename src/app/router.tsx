import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AdminPage } from '@/pages/AdminPage'
import { ReviewPage } from '@/pages/ReviewPage'
import { ForecastPage } from '@/pages/ForecastPage'

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/forecast" element={<ForecastPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </HashRouter>
  )
}
