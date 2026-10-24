import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { supabase } from './supabaseClient.js'

export default function Halaman() {
  const [pages, setPages] = useState([])
  const [current, setCurrent] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data && data.session) {
        setIsAdmin(true)
        if (new URLSearchParams(window.location.search).get('edit') === '1') {
          setEditMode(true)
        }
      }
    })
    return () => { mounted = false }
  }, [])

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

  function handleSave() {
    if (!contentRef.current || !current) return
    const newKonten = contentRef.current.innerText
    const updated = pages.map((p) => p.id === current.id ? { ...p, konten: newKonten, judul: current.judul } : p)
    setPages(updated)
    localStorage.setItem('site_pages_v2', JSON.stringify(updated))
    setEditMode(false)
    setCurrent(updated.find((p) => p.id === current.id) || current)
  }

  const controls = isAdmin ? (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {!editMode && <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-primary text-on-primary rounded-lg shadow">Edit</button>}
      {editMode && <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-on-primary rounded-lg shadow">Simpan</button>}
      {editMode && <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-surface-container text-on-surface rounded-lg shadow">Batal</button>}
    </div>
  ) : null

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
          <div
            ref={contentRef}
            contentEditable={isAdmin && editMode}
            suppressContentEditableWarning
            className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line outline-none"
          >
            {current.konten}
          </div>
        </div>
      </main>
      <Footer />
      {controls}
    </>
  )
}