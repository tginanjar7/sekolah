import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from './auth.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/manajemen-berita', { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal masuk. Periksa email dan kata sandi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs text-center">
          <span className="material-symbols-outlined text-primary text-[40px] mx-auto">lock</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Masuk Admin</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">SMP Negeri 1 Cipeundeuy</p>
        </div>
        {error && <div className="p-space-sm rounded-lg bg-error-container text-error font-body-sm">{error}</div>}
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface font-semibold">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="email@contoh.com" />
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface font-semibold">Kata Sandi</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-60">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
        <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Belum punya akun? <Link to="/register" className="text-primary hover:underline font-semibold">Daftar</Link>
        </p>
      </div>
    </div>
  )
}
