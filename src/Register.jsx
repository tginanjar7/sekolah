import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from './auth.js'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)
    try {
      await signUp(email, password)
      setInfo('Pendaftaran berhasil. Silakan cek email untuk konfirmasi (jika diaktifkan) lalu masuk.')
    } catch (err) {
      setError(err.message || 'Gagal mendaftar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs text-center">
          <span className="material-symbols-outlined text-primary text-[40px] mx-auto">person_add</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Daftar Admin</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">SMP Negeri 1 Cipeundeuy</p>
        </div>
        {error && <div className="p-space-sm rounded-lg bg-error-container text-error font-body-sm">{error}</div>}
        {info && <div className="p-space-sm rounded-lg bg-emerald-50 text-emerald-800 font-body-sm">{info}</div>}
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface font-semibold">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="email@contoh.com" />
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface font-semibold">Kata Sandi</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="Minimal 6 karakter" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-60">
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
        <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Sudah punya akun? <Link to="/login" className="text-primary hover:underline font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  )
}
