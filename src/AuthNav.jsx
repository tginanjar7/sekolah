import { useAuth, signOut } from './auth.js'

export default function AuthNav() {
  const { user } = useAuth()

  if (!user) {
    return (
      <a href="/login" className="hidden sm:inline-flex bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-all">
        Masuk
      </a>
    )
  }

  async function handleLogout() {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="hidden sm:inline-flex items-center gap-space-sm">
      <span className="font-label-md text-label-md text-on-surface">{user.email}</span>
      <button onClick={handleLogout} className="bg-surface-container-low text-primary hover:bg-surface-container px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-all">
        Keluar
      </button>
    </div>
  )
}
