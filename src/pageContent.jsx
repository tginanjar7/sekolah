import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export function getPage(slug) {
  try {
    const raw = localStorage.getItem('site_pages_v2')
    if (raw) {
      const pages = JSON.parse(raw)
      return pages.find((p) => p.slug === slug) || null
    }
  } catch (e) {}
  return null
}

export function SavedPage({ page }) {
  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-lg">
          <h1 className="font-headline-xl text-headline-xl text-on-surface">{page.judul}</h1>
          <div className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line">{page.konten}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
