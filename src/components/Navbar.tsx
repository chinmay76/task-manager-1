import { Link } from "react-router-dom"

type NavbarProps = {
  onLogout?: () => void
  isAuthenticated?: boolean
}

export default function Navbar({ onLogout, isAuthenticated }: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Task Manager
        </Link>
        {isAuthenticated ? (
          <button className="btn-outline" onClick={onLogout}>
            Logout
          </button>
        ) : null}
      </div>
    </header>
  )
}
