import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const identitas = [
  { label: 'Nama Sekolah', value: 'SMP Negeri 1 Cipeundeuy' },
  { label: 'NPSN', value: '20219876' },
  { label: 'Akreditasi', value: 'A (Unggul) - BAN-S/M' },
  { label: 'Status', value: 'Negeri' },
  { label: 'Jenjang', value: 'Sekolah Menengah Pertama (SMP)' },
  { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
  { label: 'Alamat', value: 'Jl. Pendidikan No. 1, Cipeundeuy, Kabupaten Subang, Jawa Barat 41281' },
  { label: 'Telepon', value: '(021) 7890-1234' },
  { label: 'Email', value: 'info@smpn1cipeundeuy.sch.id' },
  { label: 'Kepala Sekolah', value: 'Dra. Nurul Hidayati, M.Pd' },
  { label: 'Tahun Berdiri', value: '1985' },
]

const guru = [
  { nama: 'Dra. Nurul Hidayati, M.Pd', jabatan: 'Kepala Sekolah', mapel: 'Matematika' },
  { nama: 'Ahmad Fauzi, S.Kom', jabatan: 'Wakasek Kurikulum', mapel: 'Informatika' },
  { nama: 'Dr. Hendra Wijaya, M.Sc', jabatan: 'Wakasek Kesiswaan', mapel: 'Fisika' },
  { nama: 'Rian Mahendra, S.Pd', jabatan: 'Guru', mapel: 'Pendidikan Jasmani' },
  { nama: 'Siti Aminah, S.Pd', jabatan: 'Guru', mapel: 'Bahasa Indonesia' },
  { nama: 'Budi Santoso, S.Pd', jabatan: 'Guru', mapel: 'IPA' },
]

const sarana = [
  { nama: 'Ruang Kelas', jumlah: '24 ruang', icon: 'meeting_room' },
  { nama: 'Laboratorium IPA', jumlah: '2 ruang', icon: 'science' },
  { nama: 'Laboratorium Komputer', jumlah: '2 ruang', icon: 'computer' },
  { nama: 'Perpustakaan', jumlah: '1 ruang', icon: 'local_library' },
  { nama: 'Aula / Hall', jumlah: '1 ruang', icon: 'theater_comedy' },
  { nama: 'Lapangan Olahraga', jumlah: '2 lapangan', icon: 'sports_soccer' },
  { nama: 'Masjid Sekolah', jumlah: '1 unit', icon: 'mosque' },
  { nama: 'UKS', jumlah: '1 ruang', icon: 'health_and_safety' },
]

const prestasi = [
  'Medali Emas Olimpiade Sains Nasional (OSN) 2024 - 3 medali',
  'Juara 1 Nusantara STEM Innovation Expo 2024 (Tim Robotik)',
  'Juara Turnamen DBL Seri Provinsi 2024 (Basket Putra)',
  'Beasiswa Penuh Universitas Bergengsi Luar Negeri (3 siswi)',
  'Sekolah Penggerak Kemendikbudristek',
  'Akreditasi A Unggul BAN-S/M',
]

export default function ProfilSekolah() {
  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          {/* Hero */}
          <section className="bg-primary text-on-primary rounded-2xl p-space-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-40 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-space-sm">
              <span className="inline-flex items-center gap-2 bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-1 rounded-full text-tertiary-fixed font-label-md text-label-md font-bold uppercase tracking-wider w-fit">
                <span className="material-symbols-outlined text-[16px]">school</span> Profil Sekolah
              </span>
              <h1 className="font-display-lg text-display-lg tracking-tight text-on-primary">SMP Negeri 1 Cipeundeuy</h1>
              <p className="font-body-xl text-body-xl text-on-primary/85 max-w-3xl leading-relaxed">
                Membentuk generasi unggul, berkarakter, dan berdaya saing melalui pendidikan berkualitas berbasis Kurikulum Merdeka.
              </p>
            </div>
          </section>

          {/* Identitas */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">badge</span> Identitas Sekolah
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              {identitas.map((it) => (
                <div key={it.label} className="flex flex-col sm:flex-row sm:items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low">
                  <span className="font-label-md text-label-md text-on-surface-variant font-semibold w-40 shrink-0">{it.label}</span>
                  <span className="font-body-md text-body-md text-on-surface">{it.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sejarah */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">history_edu</span> Sejarah Sekolah
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              SMP Negeri 1 Cipeundeuy didirikan pada tahun 1985 sebagai respons terhadap kebutuhan pendidikan menengah pertama di wilayah Cipeundeuy. Berawal dari beberapa rombongan belajar dengan fasilitas sederhana, sekolah ini terus berkembang menjadi salah satu institusi pendidikan unggulan di Kabupaten Subang.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Sepanjang perjalanan, SMP Negeri 1 Cipeundeuy telah meluluskan ribuan alumni yang berkontribusi di berbagai bidang, mulai dari akademisi, profesional, hingga pengusaha. Sekolah juga konsisten menerapkan inovasi pembelajaran dan pengembangan karakter peserta didik.
            </p>
          </section>

          {/* Sambutan Kepala Sekolah */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col md:flex-row gap-space-lg items-start">
            <div className="w-full md:w-64 shrink-0 flex flex-col items-center gap-space-sm">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjlJofMjc53Mi5OW1ItnKef60ypb8IbB-tr6QePQBgm-d8-krdo3-8KeMNrFZGbxoAtAqU5Iitr975ZXByursG5SbxRv2w9fZrkkjGBXHMI2ASg_mawnHva5SulcJN5sP8MaOaCB9zPL9A6TGWswkrfm1lALToRt2Kll0nI5wzr_Q0taCFEXnEGXvMMMq5WQT0fqbyFEpwv0hmknadC3aJpXAjLLSmoVjQ8UnISB_YfIedB7eCN6Lq1A" alt="Kepala Sekolah" className="w-40 h-40 rounded-full object-cover shadow-md" />
              <div className="text-center">
                <p className="font-headline-sm text-headline-sm text-on-surface">Dra. Nurul Hidayati, M.Pd</p>
                <p className="font-label-md text-label-md text-on-surface-variant">Kepala Sekolah</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-space-sm">
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary">record_voice_over</span> Sambutan Kepala Sekolah
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di portal informasi SMP Negeri 1 Cipeundeuy. Kami berkomitmen memberikan layanan pendidikan terbaik bagi seluruh peserta didik, dengan menekankan pada pengembangan akademik, karakter, dan kompetensi abad 21.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Mari bersama-sama mewujudkan lingkungan belajar yang inspiratif, inklusif, dan berprestasi. Semoga portal ini menjadi jendela informasi yang bermanfaat bagi wali murid, siswa, dan masyarakat.
              </p>
            </div>
          </section>

          {/* Visi Misi Tujuan */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">visibility</span> Visi, Misi, dan Tujuan
            </h2>
            <div className="bg-primary/5 rounded-xl p-space-md border border-primary/10">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Visi</h3>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
                "Terwujudnya peserta didik yang unggul dalam prestasi, berkarakter mulia, dan berwawasan global berlandaskan iman dan takwa."
              </p>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Misi</h3>
              <ul className="flex flex-col gap-space-xs list-disc pl-5">
                <li className="font-body-md text-body-md text-on-surface-variant">Menyelenggarakan pembelajaran berkualitas berbasis Kurikulum Merdeka.</li>
                <li className="font-body-md text-body-md text-on-surface-variant">Mengembangkan karakter, kedisiplinan, dan kepemimpinan peserta didik.</li>
                <li className="font-body-md text-body-md text-on-surface-variant">Mendorong prestasi akademik dan non-akademik di tingkat daerah hingga nasional.</li>
                <li className="font-body-md text-body-md text-on-surface-variant">Membangun kemitraan dengan orang tua dan masyarakat.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Tujuan</h3>
              <ul className="flex flex-col gap-space-xs list-disc pl-5">
                <li className="font-body-md text-body-md text-on-surface-variant">Meningkatkan mutu pembelajaran dan hasil belajar peserta didik.</li>
                <li className="font-body-md text-body-md text-on-surface-variant">Menciptakan lingkungan sekolah yang aman, nyaman, dan inklusif.</li>
                <li className="font-body-md text-body-md text-on-surface-variant">Mengoptimalkan sarana dan prasarana pendidikan.</li>
              </ul>
            </div>
          </section>

          {/* Struktur Organisasi */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">account_tree</span> Struktur Organisasi
            </h2>
            <div className="flex flex-col items-center gap-space-md">
              <div className="bg-primary text-on-primary px-space-lg py-space-sm rounded-lg shadow-md font-label-lg text-label-lg font-bold">Kepala Sekolah</div>
              <div className="w-px h-6 bg-outline-variant"></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full">
                <div className="bg-surface-container text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-md text-label-md font-semibold">Wakasek Kurikulum</div>
                <div className="bg-surface-container text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-md text-label-md font-semibold">Wakasek Kesiswaan</div>
                <div className="bg-surface-container text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-md text-label-md font-semibold">Wakasek Sarpras</div>
              </div>
              <div className="w-px h-6 bg-outline-variant"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md w-full">
                <div className="bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-sm text-label-sm">Koordinator Guru</div>
                <div className="bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-sm text-label-sm">Bendahara</div>
                <div className="bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-sm text-label-sm">Tim Humas</div>
                <div className="bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg text-center font-label-sm text-label-sm">Koordinator TU</div>
              </div>
            </div>
          </section>

          {/* Guru dan Tendik */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">groups</span> Guru dan Tenaga Kependidikan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {guru.map((g) => (
                <div key={g.nama} className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">person</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{g.nama}</span>
                    <span className="font-label-sm text-label-sm text-primary font-medium">{g.jabatan}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{g.mapel}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sarana dan Prasarana */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">domain</span> Sarana dan Prasarana
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
              {sarana.map((s) => (
                <div key={s.nama} className="flex flex-col items-center gap-space-xs p-space-md rounded-xl bg-surface-container-low text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">{s.nama}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{s.jumlah}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Prestasi */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary">emoji_events</span> Prestasi Sekolah
            </h2>
            <ul className="flex flex-col gap-space-sm">
              {prestasi.map((p) => (
                <li key={p} className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-body-md text-body-md text-on-surface">{p}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
