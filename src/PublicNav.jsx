import { useEffect, useState } from 'react'

const defaultMenus = [
  { id: 1, label: 'Beranda', path: '/', active: true },
  { id: 2, label: 'Profil Sekolah', path: '/profil-sekolah', active: true },
  { id: 3, label: 'Berita & Pengumuman', path: '/berita-pengumuman', active: true },
  { id: 4, label: 'Agenda', path: '/agenda', active: true },
  { id: 5, label: 'Galeri Kegiatan', path: '/galeri-kegiatan', active: true },
  { id: 6, label: 'Unduhan & Edaran', path: '/unduhan-edaran', active: true },
  { id: 7, label: 'Kontak', path: '/kontak', active: true },
]

export default function PublicNav() {
  const [menus, setMenus] = useState(defaultMenus)

  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem('site_menus')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length) setMenus(parsed)
        }
      } catch (e) {}
    }
    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  const current = window.location.pathname

  return (
    <nav className="hidden lg:flex items-center gap-space-lg" data-active-classes="text-primary font-bold">
      {menus.filter((m) => m.active !== false).map((m) => (
        <a
          key={m.id}
          href={m.path}
          className={
            'font-label-lg text-label-lg transition-colors ' +
            (current === m.path
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary')
          }
        >
          {m.label}
        </a>
      ))}
    </nav>
  )
}
