import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectIsAuthenticated } from "../features/auth/authSelectors"

type ProtectedRouteProps = {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
