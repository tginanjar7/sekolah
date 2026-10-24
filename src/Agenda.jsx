import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const defaultAgendaItems = [
  { bulan: 'NOV', tanggal: '25', judul: 'Peringatan Hari Guru Nasional', waktu: '07.30 WIB', tempat: 'Lapangan Utama', kategori: 'Upacara' },
  { bulan: 'DES', tanggal: '02', judul: 'Tryout Akbar UTBK SNBT 2025', waktu: '08.00 WIB', tempat: 'Lab Komputer 1-4', kategori: 'Akademik' },
  { bulan: 'DES', tanggal: '15', judul: 'Pentas Seni "Bintang Fest 2024"', waktu: '13.00 WIB', tempat: 'Hall Graha Budaya', kategori: 'Seni' },
  { bulan: 'JAN', tanggal: '10', judul: 'Rapat Orang Tua Murid Semester Genap', waktu: '09.00 WIB', tempat: 'Aula Sekolah', kategori: 'Pengumuman' },
  { bulan: 'FEB', tanggal: '05', judul: 'Lomba Sains Antar Kelas', waktu: '08.00 WIB', tempat: 'Ruang Kelas', kategori: 'Kompetisi' },
]

export default function Agenda() {
  const [items, setItems] = useState(defaultAgendaItems)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('agenda_items')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) setItems(parsed)
      }
    } catch (e) {}
  }, [])

  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Agenda Sekolah</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Agenda Kegiatan</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Jadwal kegiatan dan acara SMP Negeri 1 Cipeundeuy.
            </p>
          </section>

          <div className="flex flex-col gap-space-md">
            {items.map((a, i) => (
              <div key={i} className="flex items-center gap-space-lg p-space-md bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-lg bg-primary text-on-primary flex flex-col items-center justify-center shrink-0">
                  <span className="font-label-sm text-label-sm font-semibold uppercase leading-none">{a.bulan}</span>
                  <span className="font-headline-sm text-headline-sm font-bold leading-none mt-1">{a.tanggal}</span>
                </div>
                <div className="flex-1 flex flex-col gap-space-xs min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-md font-label-md bg-primary/10 text-primary font-semibold w-fit">{a.kategori}</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{a.judul}</h3>
                  <div className="flex flex-wrap items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {a.waktu}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {a.tempat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}