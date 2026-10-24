import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const galeri = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCu1wVAM09zzyuMRJRA4WTYmRuY649Ux7ySGODO01PUKxiD__Fnx3BjT-zWf2jfF7rjgzv7VxeI1w-iusQJQWoCS5vpXOuImzRxSgeVWZBlUX8cdyIzGrcvoaZhXujAcI5jXZMIitciy4P5WPU2fDzP3APB6s_ZC6PAx0xqr5Iw5v3GLT7tvuRGO8Dh2ahyXNJlhWBJSWiffSl67nmQlZEp1rWs1IFbEhjIQ6vmC-5prpB9csraGerT-w',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuABsXx7rZ3wNZLL80yDUwijaFjJDF_S_HHat3XIGpstjbT30WMn7bd2RiqHaH_mFS2y0Tsh66AN8JX3hTVmS5ntmiMlLCG5xofwOf0Z4uoxDhpWC-4LdnL7FRFD3OzkN8QS3Ey7B9a48h-ATJZYh086in2DZphOzHOnDZrnicYuKxN7bRvPdympQMrYV7PV2_PKL0YvbY_9372aBgF9BeTigjYleWmldlEvKwS1ycEY2Q0-mJsymCJbVg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDtmfCwd4aq3seBY1gHC6HxMeRSnK5ygxLoHk0U8hmImkQJyLx7wqwbHpATKb6j4pE1Xfz7hkDKueHZzDEh6Y8dI3LIjtEZCqz0IUFb8dmS2w9heFw8szM5WJgG5gfVptAwGHYwuSzJuVAqIrPzWpCJuLvWCqIem6rBhiyCTS25bJ_sJt34WBG9sBcFM24zG_2WmVdaiokltkw7ned7IUmhmfyxgKlGygcZHodpV-cKkKVLj8jQLnuq9Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCDTAC-ZuKL4fOcW0kNnvaeL7kM-Um-u2As2T392K_FzxbFLiCqtZ84UeCAJHiNPmVV6bN-Ld7gj7XI3_q96oVevuVwbMJwG333ZEnEqqACIOHGZ6hIPsdTraf7bcfdtK9inPIN-pkjZReUOIc0astPHA3lx0G3C6gHGZ20FIKPRNBsNeUg0PkbmEQNdyBY8hPRQUbGtm-yRPl-GX2Jo5fBZ_-CsnUxBPXdt8eLdEIKHy-zlDEgfQJGlw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPHyNhu0DbvUMDPeySeNDu6yzBa8IN362HXbH9uKO3z3INBaAWEppvKPI-EkAu8rLOfCPgu8mX0IN81wUQiFAnrvPFgmEjzsK5TJWrzcBvNMJma1sDIPiTnBY156eYPeMcduNuiJxhlZZQbb2YyrCj5BbdBsHj6Q-wIuVE028MwNSIPw7xUk4sLpF-MMTPafhAAerx9HLnk4L2G4WKT9i-qsl6E6k9L9C8eBy-6dO2Ui9kGmc8nZpfRQ',
]

export default function GaleriKegiatan() {
  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Galeri</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Galeri Kegiatan</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Dokumentasi kegiatan dan acara SMP Negeri 1 Cipeundeuy.
            </p>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md">
            {galeri.map((src, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden h-40 shadow-sm">
                <img src={src} alt={'Galeri ' + (i + 1)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[24px]">zoom_in</span>
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
