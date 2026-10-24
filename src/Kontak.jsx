import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { addPesan } from './supabaseClient.js'

export default function Kontak() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const nama = form.nama.value.trim()
    const email = form.email.value.trim()
    const subjek = form.subjek.value.trim()
    const pesan = form.pesan.value.trim()
    if (!nama || !email || !pesan) {
      setStatus('error')
      setErrorMsg('Nama, email, dan pesan wajib diisi.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      await addPesan({ nama, email, subjek: subjek || null, pesan })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Gagal mengirim pesan.')
    }
  }

  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Kontak</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Hubungi Kami</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Silakan hubungi SMP Negeri 1 Cipeundeuy melalui informasi berikut atau kirim pesan melalui formulir.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
            <div className="flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary">contact_page</span> Informasi Kontak
                </h2>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Alamat</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Jl. Pendidikan No. 1, Cipeundeuy, Kabupaten Subang, Jawa Barat 41281</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <span className="material-symbols-outlined text-primary text-[24px]">call</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Telepon</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">(021) 7890-1234</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <span className="material-symbols-outlined text-primary text-[24px]">mail</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Email</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">info@smpn1cipeundeuy.sch.id</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <span className="material-symbols-outlined text-primary text-[24px]">schedule</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Jam Layanan</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Senin - Jumat: 07.00 - 16.00 WIB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary">send</span> Kirim Pesan
              </h2>
              <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Nama Lengkap</label>
                  <input name="nama" type="text" required className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="Nama Anda" />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Email</label>
                  <input name="email" type="email" required className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="email@contoh.com" />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Subjek</label>
                  <input name="subjek" type="text" className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25" placeholder="Subjek pesan" />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Pesan</label>
                  <textarea name="pesan" rows="4" required className="w-full px-space-md py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none" placeholder="Tuliskan pesan Anda..."></textarea>
                </div>
                {status === 'success' && (
                  <div className="p-space-sm rounded-lg bg-emerald-50 text-emerald-800 font-body-sm">Pesan berhasil terkirim. Terima kasih!</div>
                )}
                {status === 'error' && (
                  <div className="p-space-sm rounded-lg bg-error-container text-error font-body-sm">{errorMsg}</div>
                )}
                <button type="submit" disabled={status === 'loading'} className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-60">
                  {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
