import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import rawPublicHtml from '../desain/portal_berita_dan_informasi_sekolah/code.html?raw'

const publicScriptMatch = rawPublicHtml.match(/<script>\s*\(function\(\)[\s\S]*?<\/script>/)
const publicScriptText = publicScriptMatch ? publicScriptMatch[0].replace(/<\/?script>/g, '') : ''

function PublicPage() {
  useEffect(() => {
    if (publicScriptText) {
      const s = document.createElement('script')
      s.setAttribute('data-public-script', 'true')
      document.querySelectorAll('script[data-public-script="true"]').forEach((el) => el.remove())
      s.textContent = publicScriptText
      document.body.appendChild(s)
    }
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
        <Route path="/manajemen-berita" element={<ProtectedRoute><ManajemenBerita /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
