import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { getAllBerita } from './supabaseClient.js'

export default function BeritaDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllBerita()
      .then((data) => {
        const found = (data || []).find((b) => String(b.id) === String(id))
        setItem(found || null)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message || 'Gagal memuat data.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <>
        <Header />
        <main className="w-full pt-28 bg-background min-h-screen">
          <div className="max-w-3xl mx-auto px-gutter py-space-xl text-center text-on-surface-variant">Memuat...</div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !item) {
    return (
      <>
        <Header />
        <main className="w-full pt-28 bg-background min-h-screen">
          <div className="max-w-3xl mx-auto px-gutter py-space-xl text-center">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">{error ? 'Error: ' + error : 'Berita tidak ditemukan'}</h1>
            <Link to="/berita-pengumuman" className="text-primary hover:underline font-label-lg">Kembali ke daftar berita</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-lg">
          <Link to="/berita-pengumuman" className="text-primary hover:underline font-label-md flex items-center gap-1 w-fit">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Kembali ke daftar berita
          </Link>
          <article className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            {<img src={item.gambar_sampul || "https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg"} alt={item.judul} className="w-full h-72 object-cover" />}
            <div className="p-space-xl flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-primary/10 text-primary font-semibold">{item.kategori}</span>
                <span className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">event</span> {item.tanggal_publikasi ? new Date(item.tanggal_publikasi).toLocaleDateString('id-ID') : ''}
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">{item.judul}</h1>
              <p className="font-body-lg text-body-xl text-on-surface-variant leading-relaxed">{item.ringkasan}</p>
              <div className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line">{item.konten}</div>
              {item.berkas_lampiran && (
                <div className="bg-surface-container-low p-space-md rounded-lg flex items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className="w-10 h-10 rounded bg-error-container text-error flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{item.berkas_lampiran}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Dokumen Resmi â€¢ Lampiran</span>
                    </div>
                  </div>
                  <a href="#" className="bg-surface-container hover:bg-surface-variant text-primary px-3 py-1.5 rounded font-label-md text-label-md font-bold flex items-center gap-1 shrink-0 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span> Unduh
                  </a>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}