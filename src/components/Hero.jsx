import { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient.js'

const defaultHtml = `<!-- HERO SECTION WITH EDITORIAL DEPTH -->
<section class="relative overflow-hidden bg-primary text-on-primary -mt-28 pt-36 pb-20 px-gutter shadow-xl">
<div class="absolute -right-24 -top-24 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-40 pointer-events-none"></div>
<div class="absolute left-1/3 -bottom-20 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-30 pointer-events-none"></div>
<div class="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-xl">
<!-- Quick Status Badges -->
<div class="flex flex-wrap items-center gap-space-sm">
<span class="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-1 rounded-full text-tertiary-fixed font-label-md text-label-md font-bold uppercase tracking-wider">
<span class="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
          Tahun Ajaran 2026/2027
        </span>
<span class="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-1 rounded-full text-on-primary font-label-md text-label-md">
<span class="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
          Akreditasi A Unggul BAN-S/M
        </span>
<span class="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-1 rounded-full text-on-primary font-label-md text-label-md">
<span class="material-symbols-outlined text-[16px] text-primary-fixed-dim">school</span>
          Sekolah Penggerak Kemendikbudristek
        </span>
</div>
<!-- Main Headline Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
<div class="lg:col-span-8 flex flex-col gap-space-md">
<h1 class="font-display-lg text-display-lg tracking-tight text-on-primary">Pusat Informasi &amp; Prestasi <span class="text-tertiary-fixed">SMP Negeri 1 Cipeundeuy</span></h1>
<p class="font-body-xl text-body-xl text-on-primary/85 max-w-2xl leading-relaxed">Membuka jendela informasi terkini seputar implementasi Kurikulum Merdeka, torehan prestasi peserta didik kancah daerah hingga nasional, agenda akademik tahunan, serta rilisan siaran pers resmi SMP Negeri 1 Cipeundeuy.</p>
</div>
<div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm items-start lg:items-end justify-end">
<a class="w-full sm:w-auto lg:w-full bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-space-lg py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs group" href="#feed-berita">
<span class="">Jelajahi Berita &amp; Pengumuman</span>
<span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_downward</span>
</a>
<a class="w-full sm:w-auto lg:w-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary border-none font-label-lg text-label-lg font-semibold px-space-lg py-3 rounded-lg transition-all flex items-center justify-center gap-space-xs" href="#edaran-unduhan">
<span class="material-symbols-outlined text-[20px]">download</span>
<span class="">Unduh Edaran Resmi PDF</span>
</a>
</div>
</div>
<!-- Interactive Search & Filter Bar Barricade -->
<div class="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-xl text-on-surface">
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
<div class="md:col-span-5 relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md focus:bg-surface-container-lowest focus:outline-none transition-all placeholder:text-on-surface-variant/60" id="live-search-input" placeholder="Cari topik berita, nomor surat edaran, atau agenda..." type="text">
</div>
<div class="md:col-span-3">
<select class="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none cursor-pointer" id="kategori-filter-select">
<option value="all">Semua Kategori Informasi</option>
<option value="akademik">Akademik &amp; Kurikulum</option>
<option value="prestasi">Prestasi Siswa</option>
<option value="ekstrakulikuler">Ekstrakurikuler &amp; Seni</option>
<option value="pengumuman">Pengumuman &amp; Edaran</option>
<option value="agenda">Agenda Sekolah</option>
</select>
</div>
<div class="md:col-span-2">
<select class="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none cursor-pointer">
<option value="2024">Tahun 2024</option>
<option value="2025">Tahun 2025</option>
<option value="all">Semua Arsip</option>
</select>
</div>
<div class="md:col-span-2">
<button class="w-full bg-primary-container hover:bg-primary text-on-primary py-2.5 px-space-md rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs transition-colors shadow-sm" type="button">
<span class="material-symbols-outlined text-[18px]">tune</span>
<span class="">Terapkan</span>
</button>
</div>
</div>
</div>
</div>
</section>`

export default function Hero() {
  const [savedHtml, setSavedHtml] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setIsAdmin(true)
        if (new URLSearchParams(window.location.search).get('edit') === '1') setEditMode(true)
      }
    })
    const raw = localStorage.getItem('hero_html')
    if (raw) setSavedHtml(raw)
  }, [])

  function handleSave() {
    if (contentRef.current) {
      const html = contentRef.current.innerHTML
      localStorage.setItem('hero_html', html)
      setSavedHtml(html)
      setEditMode(false)
    }
  }

  const controls = isAdmin ? (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {!editMode && <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-primary text-on-primary rounded-lg shadow">Edit Hero</button>}
      {editMode && <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-on-primary rounded-lg shadow">Simpan</button>}
      {editMode && <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-surface-container text-on-surface rounded-lg shadow">Batal</button>}
      {!editMode && savedHtml && savedHtml.trim() && <button onClick={() => { localStorage.removeItem('hero_html'); setSavedHtml(null) }} className="px-4 py-2 bg-error text-on-error rounded-lg shadow">Reset Default</button>}
    </div>
  ) : null

  if (savedHtml && savedHtml.trim() && !editMode) {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: savedHtml }} />
        {controls}
      </>
    )
  }

  return (
    <>
      <div ref={contentRef} contentEditable={isAdmin && editMode} suppressContentEditableWarning dangerouslySetInnerHTML={{ __html: defaultHtml }} />
      {controls}
    </>
  )
}