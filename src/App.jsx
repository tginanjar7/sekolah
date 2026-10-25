import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Content from './components/Content.jsx'
import Footer from './components/Footer.jsx'
import ManajemenBerita from './ManajemenBerita.jsx'
import ProfilSekolah from './ProfilSekolah.jsx'
import BeritaPengumuman from './BeritaPengumuman.jsx'
import BeritaDetail from './BeritaDetail.jsx'
import Agenda from './Agenda.jsx'
import GaleriKegiatan from './GaleriKegiatan.jsx'
import UnduhanEdaran from './UnduhanEdaran.jsx'
import Kontak from './Kontak.jsx'
import Halaman from './Halaman.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { getAllBerita } from './supabaseClient.js'
import rawPublicHtml from '../desain/portal_berita_dan_informasi_sekolah/code.html?raw'

const publicScriptMatch = rawPublicHtml.match(/<script>\s*\(function\(\)[\s\S]*?<\/script>/)
const publicScriptText = publicScriptMatch ? publicScriptMatch[0].replace(/<\/?script>/g, '') : ''

function injectPublicScript() {
  document.querySelectorAll('script[data-public-script="true"]').forEach((el) => el.remove())
  if (publicScriptText) {
    const s = document.createElement('script')
    s.setAttribute('data-public-script', 'true')
    s.textContent = publicScriptText
    document.body.appendChild(s)
  }
}

function renderNewsCards(items) {
  const grid = document.getElementById('news-cards-grid')
  if (!grid) return
  const cards = items.slice(0, 6).map((b) => {
    const title = (b.judul || '').replace(/</g, '&lt;')
    const summary = (b.ringkasan || '').replace(/</g, '&lt;')
    const cat = (b.kategori || '-').replace(/</g, '&lt;')
    const date = b.tanggal_publikasi ? new Date(b.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
    const img = b.gambar_sampul || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg'
    return `<article class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between" data-category="${cat.toLowerCase()}">
      <div class="flex flex-col">
        <div class="relative h-48 w-full overflow-hidden">
          <img class="w-full h-full object-cover transition-transform hover:scale-105 duration-300" src="${img}" alt="${title}">
          <span class="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold px-2.5 py-1 rounded-md uppercase">${cat}</span>
          <span class="absolute top-3 right-3 bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-secondary"></span> Terbit</span>
        </div>
        <div class="p-space-lg flex flex-col gap-space-xs">
          <div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[14px]">event</span>
            <span>${date}</span>
            <span>•</span>
            <span>Humas Sekolah</span>
          </div>
          <h4 class="font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors cursor-pointer mt-1">${title}</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">${summary}</p>
        </div>
      </div>
      <div class="px-space-lg pb-space-lg pt-0 flex flex-col gap-space-sm">
        <div class="flex items-center justify-between pt-2">
          <a class="text-primary hover:text-secondary font-label-md text-label-md font-bold flex items-center gap-1" href="/berita/${b.id}">
            Baca Selengkapnya <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </a>
          <button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">bookmark_border</span></button>
        </div>
      </div>
    </article>`
  }).join('')
  grid.innerHTML = cards
}

function PublicPage() {
  useEffect(() => {
    injectPublicScript()
    getAllBerita()
      .then((data) => {
        const published = (data || []).filter((b) => b.status === 'terbit')
        if (published.length) {
          renderNewsCards(published)
          // re-inject filter script so it binds to new cards
          injectPublicScript()
        }
      })
      .catch((e) => { console.warn('news fetch failed, keeping static cards:', e && e.message) })
  }, [])
  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          <Hero />
          <Content />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil-sekolah" element={<ProfilSekolah />} />
        <Route path="/berita-pengumuman" element={<BeritaPengumuman />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/galeri-kegiatan" element={<GaleriKegiatan />} />
        <Route path="/unduhan-edaran" element={<UnduhanEdaran />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/galeri" element={<Navigate to="/galeri-kegiatan" replace />} />
        <Route path="/media" element={<Navigate to="/galeri-kegiatan" replace />} />
        <Route path="/profil" element={<Navigate to="/profil-sekolah" replace />} />
        <Route path="/manajemen-berita" element={<ProtectedRoute><ManajemenBerita /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
