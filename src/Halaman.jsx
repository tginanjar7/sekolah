import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function Halaman() {
  const [pages, setPages] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('site_pages_v2')
      if (raw) setPages(JSON.parse(raw))
    } catch (e) {}
  }, [])

  const slug = window.location.pathname.replace('/halaman/', '')

  useEffect(() => {
    const p = pages.find((x) => x.slug === slug)
    setCurrent(p || null)
  }, [pages, slug])

  if (!current) {
    return (
      <>
        <Header />
        <main className="w-full pt-28 bg-background min-h-screen">
          <div className="max-w-3xl mx-auto px-gutter py-space-xl text-center">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Halaman tidak ditemukan</h1>
            <a href="/" className="text-primary hover:underline font-label-lg">Kembali ke Beranda</a>
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
          <h1 className="font-headline-xl text-headline-xl text-on-surface">{current.judul}</h1>
          <div className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line">{current.konten}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
