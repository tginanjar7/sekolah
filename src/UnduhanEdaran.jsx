import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const unduhan = [
  { judul: 'Surat Edaran No. 142/Disdik-DKI', keterangan: 'Libur Semester Ganjil • 420 KB', icon: 'picture_as_pdf' },
  { judul: 'Kalender Akademik 2024/2025', keterangan: 'Revisi Terkini • 1.2 MB', icon: 'picture_as_pdf' },
  { judul: 'Formulir Bebas Pinjam Perpustakaan', keterangan: 'Dokumen Siswa XII • 180 KB', icon: 'description' },
  { judul: 'Struktur Kurikulum Merdeka Fase E-F', keterangan: 'Panduan Mata Pelajaran • 2.8 MB', icon: 'picture_as_pdf' },
  { judul: 'Juknis PPDB 2025', keterangan: 'Panduan Pendaftaran • 1.5 MB', icon: 'picture_as_pdf' },
  { judul: 'Formulir Pendaftaran Ekstrakurikuler', keterangan: 'Dokumen Siswa • 220 KB', icon: 'description' },
]

export default function UnduhanEdaran() {
  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Unduhan & Edaran</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Unduhan dan Edaran</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Kumpulan dokumen resmi, edaran, dan formulir SMP Negeri 1 Cipeundeuy.
            </p>
          </section>

          <div className="flex flex-col gap-space-sm">
            {unduhan.map((u, i) => (
              <a key={i} href="#" className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-space-md group">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">{u.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate group-hover:text-primary">{u.judul}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{u.keterangan}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[24px]">download</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
