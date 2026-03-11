import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Navbar from "../components/Navbar"
import ProtectedRoute from "../components/ProtectedRoute"
import { logout } from "../features/auth/authSlice"
import { selectIsAuthenticated } from "../features/auth/authSelectors"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"

export default function AppRoutes() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
