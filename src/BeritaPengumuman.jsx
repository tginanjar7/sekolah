import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { getAllBerita } from './supabaseClient.js'
import { Link } from 'react-router-dom'

export default function BeritaPengumuman() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllBerita()
      .then((data) => {
        setItems((data || []).filter((b) => b.status === 'terbit'))
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message || 'Gagal memuat data.')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Kanal Informasi</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Berita dan Pengumuman</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Kumpulan berita, pengumuman, dan informasi terkini seputar SMP Negeri 1 Cipeundeuy.
            </p>
          </section>

          {loading && <div className="text-on-surface-variant font-body-md">Memuat data...</div>}
          {error && <div className="text-error font-body-md">Error: {error}</div>}
          {!loading && !error && items.length === 0 && <div className="text-on-surface-variant font-body-md">Belum ada berita.</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {items.map((b) => (
              <article key={b.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  {<img src={b.gambar_sampul || "https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg"} alt={b.judul} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />}
                  <span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold px-2.5 py-1 rounded-md uppercase">{b.kategori}</span>
                </div>
                <div className="p-space-lg flex flex-col gap-space-xs flex-1">
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>{b.tanggal_publikasi ? new Date(b.tanggal_publikasi).toLocaleDateString('id-ID') : ''}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors cursor-pointer mt-1">{b.judul}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{b.ringkasan}</p>
                  <div className="mt-auto pt-space-md">
                    <Link to={"/berita/" + b.id} className="text-primary hover:text-secondary font-label-md text-label-md font-bold flex items-center gap-1">
                      Baca Selengkapnya <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* edited content from admin (if any) */}
          {(() => {
            try {
              const raw = localStorage.getItem('site_pages_v2')
              if (raw) {
                const pg = JSON.parse(raw).find((p) => p.slug === 'berita-pengumuman')
                if (pg && pg.konten) {
                  return (
                    <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md mt-space-xl">
                      <h2 className="font-headline-lg text-headline-lg text-on-surface">{pg.judul}</h2>
                      <div className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line">{pg.konten}</div>
                    </section>
                  )
                }
              }
            } catch (e) {}
            return null
          })()}
        </div>
      </main>
      <Footer />
    </>
  )
}
