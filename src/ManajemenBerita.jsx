import { useEffect, useState } from 'react'
import { getAllBerita, addBerita, updateBerita, deleteBerita } from './supabaseClient.js'
import AdminHeader from './AdminHeader.jsx'
import Sidebar from './Sidebar.jsx'

const mainHtml = `<main class="w-full pt-16 bg-background min-h-screen px-space-lg py-space-lg"><div class="flex flex-col w-full gap-space-lg">
<!-- Top Section: Header & Action Buttons -->
<div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div class="flex flex-col gap-space-xs max-w-3xl">
<div class="flex items-center gap-space-xs">
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-primary font-bold">
<span class="material-symbols-outlined text-[14px]">auto_stories</span> CMS Humas &amp; Publikasi
        </span>
<span class="text-outline-variant">â€¢</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Tahun Ajaran 2024/2025</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Manajemen Berita &amp; Pengumuman Sekolah</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Kelola alur publikasi artikel, pengumuman kedinasan, edaran PDF resmi, serta kurasi sematan berita utama beranda SMP Negeri 1 Cipeundeuy.</p>
</div>
<div class="flex flex-wrap items-center gap-space-sm shrink-0">
<!-- Periode Dropdown Filter -->
<div class="relative inline-block text-left">
<button class="inline-flex items-center gap-space-xs px-3.5 py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors shadow-sm" id="btn-period-select">
<span class="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
<span class="">Semester Ganjil 2024</span>
<span class="material-symbols-outlined text-[16px]">expand_more</span>
</button>
</div>
<!-- Export Button -->
<button class="inline-flex items-center gap-space-xs px-4 py-2.5 bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-all hover:shadow" onclick="handleExportClick()">
<span class="material-symbols-outlined text-[20px]">file_download</span>
<span class="">Ekspor Laporan</span>
</button>
<!-- Primary Action CTA -->
<button class="inline-flex items-center gap-space-xs px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all active:scale-[0.98]" onclick="openArticleModal('create')">
<span class="material-symbols-outlined text-[20px]">add_circle</span>
<span class="">Tulis Berita Baru</span>
</button>
</div>
</div>
<!-- KPI Summary Cards (5 Metrics Bento Grid) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
<!-- Card 1: Total Berita -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Postingan</span>
<div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">article</span>
</div>
</div>
<div class="mt-space-sm">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-xl text-headline-xl text-on-surface">128</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Artikel</span>
</div>
<div class="flex items-center gap-1 mt-1 text-emerald-700 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
<span class="font-semibold">+12</span> bulan ini
        </div>
</div>
<div class="absolute -right-3 -bottom-3 w-16 h-16 bg-primary/5 rounded-full pointer-events-none"></div>
</div>
<!-- Card 2: Status Terbit Aktif -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Terbit Aktif</span>
<div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div class="mt-space-sm">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-xl text-headline-xl text-emerald-800">94</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Aktif</span>
</div>
<div class="flex items-center gap-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span class="">Tayang di portal publik</span>
</div>
</div>
<div class="absolute -right-3 -bottom-3 w-16 h-16 bg-emerald-500/5 rounded-full pointer-events-none"></div>
</div>
<!-- Card 3: Draf & Terjadwal -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Draf &amp; Terjadwal</span>
<div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">schedule</span>
</div>
</div>
<div class="mt-space-sm">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-xl text-headline-xl text-amber-800">24</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Pos</span>
</div>
<div class="flex items-center gap-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
<span class="font-semibold text-amber-900">18 Draf</span>
<span class="">â€¢</span>
<span class="font-semibold text-primary">6 Otomatis</span>
</div>
</div>
<div class="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-500/5 rounded-full pointer-events-none"></div>
</div>
<!-- Card 4: Arsip -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Arsip Kedaluwarsa</span>
<div class="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
</div>
<div class="mt-space-sm">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-xl text-headline-xl text-on-surface-variant">16</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Artikel</span>
</div>
<div class="flex items-center gap-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
<span class="">Non-aktif dari feed publik</span>
</div>
</div>
<div class="absolute -right-3 -bottom-3 w-16 h-16 bg-surface-variant/30 rounded-full pointer-events-none"></div>
</div>
<!-- Card 5: Total Pembaca & Sparkline -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Tayangan</span>
<div class="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">visibility</span>
</div>
</div>
<div class="mt-space-sm">
<div class="flex items-baseline justify-between gap-space-xs">
<span class="font-headline-xl text-headline-xl text-primary font-bold">342.8K</span>
<!-- Inline Sparkline SVG Chart -->
<svg class="w-16 h-7 text-primary" fill="none" viewBox="0 0 64 24">
<path d="M2 18L14 14L26 19L38 9L50 12L62 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"></path>
<path d="M2 18L14 14L26 19L38 9L50 12L62 4V24H2Z" fill="currentColor" fill-opacity="0.12"></path>
</svg>
</div>
<div class="flex items-center gap-1 mt-1 text-emerald-700 font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">arrow_upward</span>
<span class="">+18.4% engagement</span>
</div>
</div>
<div class="absolute -right-3 -bottom-3 w-16 h-16 bg-primary-container/5 rounded-full pointer-events-none"></div>
</div>
</div>
<!-- Filter, Search, Tab, & Batch Controls -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
<!-- Row 1: Status Tabs & Quick Filter -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
<div class="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container-low rounded-lg" id="status-filter-tabs">
<button class="status-tab-btn active px-3.5 py-1.5 rounded-lg text-label-md font-label-md bg-primary text-on-primary shadow-sm transition-all" data-status="all">
          Semua <span class="ml-1 opacity-80">(128)</span>
</button>
<button class="status-tab-btn px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-status="terbit">
          Terbit <span class="ml-1 opacity-80">(94)</span>
</button>
<button class="status-tab-btn px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-status="draf">
          Draf <span class="ml-1 opacity-80">(18)</span>
</button>
<button class="status-tab-btn px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-status="arsip">
          Arsip <span class="ml-1 opacity-80">(16)</span>
</button>
<button class="status-tab-btn px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-status="pinned">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">star</span>
            Berita Utama (5)
          </span>
</button>
</div>
<!-- Quick Batch Actions (Appears or activates on selection) -->
<div class="hidden items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg" id="batch-action-bar">
<span class="font-label-sm text-label-sm text-primary font-bold" id="batch-count-selected">0 terpilih</span>
<span class="text-outline-variant">|</span>
<button class="px-2.5 py-1 text-label-sm font-label-sm bg-surface-container-lowest text-emerald-800 rounded hover:bg-emerald-50 transition-colors" onclick="applyBatchAction('publish')">
          Terbitkan
        </button>
<button class="px-2.5 py-1 text-label-sm font-label-sm bg-surface-container-lowest text-on-surface-variant rounded hover:bg-surface-container-high transition-colors" onclick="applyBatchAction('archive')">
          Arsipkan
        </button>
<button class="px-2.5 py-1 text-label-sm font-label-sm bg-error text-on-error rounded hover:bg-red-700 transition-colors" onclick="applyBatchAction('delete')">
          Hapus
        </button>
</div>
</div>
<!-- Row 2: Search Input & Category Filters -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
<!-- Search Input -->
<div class="md:col-span-5 relative">
<span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
<input class="w-full pl-10 pr-space-md py-2 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" id="search-input" placeholder="Cari berita berdasarkan judul, topik, atau penulis humas..." type="text">
</div>
<!-- Category Filter -->
<div class="md:col-span-3">
<select class="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" id="filter-category">
<option value="">Semua Kategori (Prestasi, Info, dll)</option>
<option value="Prestasi">Prestasi &amp; Kejuaraan</option>
<option value="Pengumuman">Pengumuman Kedinasan</option>
<option value="Akademik">Akademik &amp; Ujian</option>
<option value="Ekstrakurikuler">Ekstrakurikuler &amp; OSIS</option>
<option value="Agenda">Agenda &amp; Kegiatan Guru</option>
</select>
</div>
<!-- Date Sort / Range Filter -->
<div class="md:col-span-2">
<select class="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" id="filter-sort">
<option value="newest">Terbaru Rilis</option>
<option value="popular">Tayangan Terbanyak</option>
<option value="oldest">Terlama Ditulis</option>
</select>
</div>
<!-- Reset Filter Button -->
<div class="md:col-span-2 flex justify-end">
<button class="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container text-on-surface-variant hover:text-on-surface rounded-lg font-label-md text-label-md transition-colors" onclick="resetFilters()">
<span class="material-symbols-outlined text-[16px]">restart_alt</span>
<span class="">Reset Filter</span>
</button>
</div>
</div>
</div>
<!-- Primary News Data Table -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider select-none">
<th class="py-3.5 pl-4 pr-2 w-12 text-center">
<input class="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" id="master-select-all" onchange="toggleSelectAllRows(this)" type="checkbox">
</th>
<th class="py-3.5 px-2 w-10 text-center">
<span class="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" title="Sematan Berita Utama">star</span>
</th>
<th class="py-3.5 px-3 w-28">Sampul</th>
<th class="py-3.5 px-4 min-w-[320px]">Judul Berita &amp; Ringkasan Konten</th>
<th class="py-3.5 px-3 w-36">Kategori</th>
<th class="py-3.5 px-3 w-44">Berkas Lampiran</th>
<th class="py-3.5 px-3 w-40">Publikasi</th>
<th class="py-3.5 px-3 w-28 text-center">Status</th>
<th class="py-3.5 px-3 w-28 text-right">Tayangan</th>
<th class="py-3.5 pl-3 pr-4 w-32 text-center">Aksi Cepat</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface" id="news-table-body">
<!-- Row 1: Pinned + Prestasi (Terbit) -->
<tr class="hover:bg-surface-container-low/60 transition-colors group">
<td class="py-3.5 pl-4 pr-2 text-center">
<input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox">
</td>
<td class="py-3.5 px-2 text-center">
<button class="text-tertiary hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Berita Utama Beranda (Aktif)">
<span class="material-symbols-outlined text-[20px] text-amber-500" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
</td>
<td class="py-3.5 px-3">
<div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs">
<img alt="Sampul OSN" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Photorealistic photo of Indonesian high school students holding gold medals and Indonesian flag proudly on stage with banners of Olimpiade Sains Nasional 2024, dressed in neat school batik uniforms, bright celebratory stage lighting with deep institutional royal blue background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu1wVAM09zzyuMRJRA4WTYmRuY649Ux7ySGODO01PUKxiD__Fnx3BjT-zWf2jfF7rjgzv7VxeI1w-iusQJQWoCS5vpXOuImzRxSgeVWZBlUX8cdyIzGrcvoaZhXujAcI5jXZMIitciy4P5WPU2fDzP3APB6s_ZC6PAx0xqr5Iw5v3GLT7tvuRGO8Dh2ahyXNJlhWBJSWiffSl67nmQlZEp1rWs1IFbEhjIQ6vmC-5prpB9csraGerT-w">
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-primary font-bold">#NWS-2024-089</span>
<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">PINNED HERO</span>
</div>
<a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">SMPN 1 Cipeundeuy Raih 3 Medali Emas pada OSN Nasional 2024 di Bidang Sains &amp; Informatika</a>
<p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">
                  Kontingen siswa perwakilan sekolah menorehkan sejarah baru dengan memenangkan medali emas di bidang Fisika Terapan, Bioteknologi, dan Pemrograman Terdistribusi.
                </p>
<div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Dra. Nurul Hidayati</span>
<span class="">â€¢</span>
<span class="">Bacaan 4 mnt</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-primary/10 text-primary font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Prestasi
              </span>
</td>
<td class="py-3.5 px-3">
<div class="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors text-[12px] cursor-pointer" onclick="viewPdfPreview('SK_Pemenang_OSN_2024.pdf')">
<span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
<span class="truncate max-w-[120px] font-medium" title="SK_Pemenang_OSN_2024.pdf">SK_OSN_2024.pdf</span>
</div>
</td>
<td class="py-3.5 px-3 text-on-surface-variant">
<div class="flex flex-col">
<span class="font-semibold text-on-surface text-[13px]">18 Okt 2024</span>
<span class="text-[11px] text-on-surface-variant">08:30 WIB</span>
</div>
</td>
<td class="py-3.5 px-3 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-emerald-100 text-emerald-800 font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Terbit
              </span>
</td>
<td class="py-3.5 px-3 text-right">
<div class="flex flex-col items-end">
<span class="font-bold text-on-surface text-[14px]">8.940</span>
<span class="text-[11px] text-emerald-700 font-semibold">+1.2k mgg ini</span>
</div>
</td>
<td class="py-3.5 pl-3 pr-4 text-center">
<div class="flex items-center justify-center gap-1">
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal('edit', 'NWS-2024-089')" title="Edit Artikel">
<span class="material-symbols-outlined text-[18px]">edit_square</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="previewPublicView('NWS-2024-089')" title="Lihat di Beranda Publik">
<span class="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow('NWS-2024-089', 'SMA Bintang Nusantara Raih 3 Medali Emas')" title="Hapus Berita">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: Pengumuman Dinas (Terbit) -->
<tr class="hover:bg-surface-container-low/60 transition-colors group">
<td class="py-3.5 pl-4 pr-2 text-center">
<input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox">
</td>
<td class="py-3.5 px-2 text-center">
<button class="text-outline-variant hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Sematkan ke Berita Utama">
<span class="material-symbols-outlined text-[20px]">star</span>
</button>
</td>
<td class="py-3.5 px-3">
<div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs">
<img alt="Sampul Asesmen Akhir Semester" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High quality institutional photography of clean and organized high school exam classroom hall in Indonesia, neatly lined modern desks with examination question booklets, warm morning sunlight pouring through large glass windows, quiet focused academic atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZXuqav8Ce0orQqorL475Mer11MSr2nIhDYT0wJ6RE9u4solqgSKpEjuoD7qgGJHoA0WAXfbnATyVbp3FtmtvcbH_-DwJqYbPZMsfEBTEVMkos2tmqAUZnlWczfoL9L0IRVAM8S6vaXGUEGK6OtUvZW4KrDkMGEfRIT0gah9hm0I2BIZRv4avhcUIu8JgeqxaeXRL6NTvxErZOLGNaOVVJPV2PvlHYzNjc3VPGw792vwG49185LBo9tQ">
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-primary font-bold">#NWS-2024-088</span>
<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant">SURAT EDARAN</span>
</div>
<a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">
                  Surat Edaran Resmi: Jadwal Pelaksanaan Asesmen Sumatif Akhir Semester (ASAS) Ganjil TP 2024/2025
                </a>
<p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">
                  Diberitahukan kepada seluruh wali murid kelas X, XI, dan XII mengenai tata tertib serta perlengkapan ujian berbasis komputer (CBT).
                </p>
<div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Ahmad Fauzi, S.Kom</span>
<span class="">â€¢</span>
<span class="">Bacaan 2 mnt</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-amber-100 text-amber-900 font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                Pengumuman
              </span>
</td>
<td class="py-3.5 px-3">
<div class="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors text-[12px] cursor-pointer" onclick="viewPdfPreview('SE_Jadwal_ASAS_Ganjil_2024.pdf')">
<span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
<span class="truncate max-w-[120px] font-medium" title="SE_Jadwal_ASAS_Ganjil_2024.pdf">SE_ASAS_2024.pdf</span>
</div>
</td>
<td class="py-3.5 px-3 text-on-surface-variant">
<div class="flex flex-col">
<span class="font-semibold text-on-surface text-[13px]">15 Okt 2024</span>
<span class="text-[11px] text-on-surface-variant">10:15 WIB</span>
</div>
</td>
<td class="py-3.5 px-3 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-emerald-100 text-emerald-800 font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Terbit
              </span>
</td>
<td class="py-3.5 px-3 text-right">
<div class="flex flex-col items-end">
<span class="font-bold text-on-surface text-[14px]">12.450</span>
<span class="text-[11px] text-emerald-700 font-semibold">+3.4k mgg ini</span>
</div>
</td>
<td class="py-3.5 pl-3 pr-4 text-center">
<div class="flex items-center justify-center gap-1">
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal('edit', 'NWS-2024-088')" title="Edit Artikel">
<span class="material-symbols-outlined text-[18px]">edit_square</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="previewPublicView('NWS-2024-088')" title="Lihat di Beranda Publik">
<span class="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow('NWS-2024-088', 'Surat Edaran ASAS TP 2024/2025')" title="Hapus Berita">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: Akademik & Riset (Draf) -->
<tr class="hover:bg-surface-container-low/60 transition-colors group">
<td class="py-3.5 pl-4 pr-2 text-center">
<input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox">
</td>
<td class="py-3.5 px-2 text-center">
<button class="text-outline-variant hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Sematkan ke Berita Utama">
<span class="material-symbols-outlined text-[20px]">star</span>
</button>
</td>
<td class="py-3.5 px-3">
<div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs">
<img alt="Sampul Laboratorium Riset" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" data-alt="Modern high school science laboratory with Indonesian students in lab coats conducting renewable solar cell experiment, clean test tubes and digital microscopes, bright natural ambient lighting, sleek academic interior." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg">
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-on-surface-variant font-bold">#NWS-2024-087</span>
<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800">MENUNGGU REVIEW HUMAS</span>
</div>
<a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">
                  Pengenalan Kurikulum Deep-Learning AI &amp; Robotika Bagi Siswa Peminatan MIPA
                </a>
<p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">
                  Panduan lengkap integrasi modul kecerdasan artifisial terapan bekerja sama dengan Institut Teknologi Bandung untuk semester genap.
                </p>
<div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Dr. Hendra Wijaya, M.Sc</span>
<span class="">â€¢</span>
<span class="">Draf Terakhir: Kemarin, 16:40</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-secondary/15 text-secondary font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Akademik
              </span>
</td>
<td class="py-3.5 px-3">
<span class="text-on-surface-variant/70 text-[12px] italic">Tidak ada berkas</span>
</td>
<td class="py-3.5 px-3 text-on-surface-variant">
<div class="flex flex-col">
<span class="font-semibold text-on-surface text-[13px]">-</span>
<span class="text-[11px] text-amber-700">Draf tersimpan</span>
</div>
</td>
<td class="py-3.5 px-3 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-amber-50 text-amber-800 font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Draf
              </span>
</td>
<td class="py-3.5 px-3 text-right">
<span class="text-on-surface-variant text-[13px]">-</span>
</td>
<td class="py-3.5 pl-3 pr-4 text-center">
<div class="flex items-center justify-center gap-1">
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal('edit', 'NWS-2024-087')" title="Lanjutkan Tulis Draf">
<span class="material-symbols-outlined text-[18px]">edit_square</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50 transition-colors" onclick="publishDirectly('NWS-2024-087')" title="Langsung Terbitkan">
<span class="material-symbols-outlined text-[18px]">send</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow('NWS-2024-087', 'Kurikulum AI &amp; Robotika')" title="Hapus Berita">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 4: Ekstrakurikuler (Terbit) -->
<tr class="hover:bg-surface-container-low/60 transition-colors group">
<td class="py-3.5 pl-4 pr-2 text-center">
<input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox">
</td>
<td class="py-3.5 px-2 text-center">
<button class="text-tertiary hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Berita Utama Beranda">
<span class="material-symbols-outlined text-[20px] text-amber-500" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
</td>
<td class="py-3.5 px-3">
<div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs">
<img alt="Sampul Basket DBL" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Vibrant dynamic photograph of Indonesian high school basketball team celebrating victory on an indoor court, students in blue and white athletic uniforms hugging and cheering with champion trophy, sports arena lighting with dynamic action energy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKkNq_GIsw0UT33QHKdw59kWCv4s9ZX-NDw5aQuNDQom-GCh6jrKh0_deishu3xTl1la2vHnq-0VTIWGE041f11VdL4lbbyW9b9PSfToAWPGvNy9TnxwHN0i38fa_XspW3vUcLPuQpOP1JXBlaYztlDrqarNEgKAO0K3VbUA24iZ8ZyNKeydb-qPZhDxMASo4Q4DONMNQuBWm4HuNiepjzRClIEhMD2q2y3XdnirhE8W7LahBU1e_DLQ">
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-primary font-bold">#NWS-2024-086</span>
<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">PINNED SPOTLIGHT</span>
</div>
<a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">Tim Basket Putra SMPN 1 Cipeundeuy Sukses Menjuarai Turnamen DBL Seri Provinsi 2024</a>
<p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">
                  Melalui babak overtime dramatis, skuad Garuda Muda berhasil mengamankan gelar juara bertahan setelah menumbangkan tim rival sekota.
                </p>
<div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Rian Mahendra, S.Pd</span>
<span class="">â€¢</span>
<span class="">Bacaan 3 mnt</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-emerald-100 text-emerald-800 font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Ekstrakurikuler
              </span>
</td>
<td class="py-3.5 px-3">
<div class="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors text-[12px] cursor-pointer" onclick="viewPdfPreview('Jadwal_Pertandingan_Final.pdf')">
<span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
<span class="truncate max-w-[120px] font-medium" title="Jadwal_Pertandingan_Final.pdf">Bagan_DBL_24.pdf</span>
</div>
</td>
<td class="py-3.5 px-3 text-on-surface-variant">
<div class="flex flex-col">
<span class="font-semibold text-on-surface text-[13px]">12 Okt 2024</span>
<span class="text-[11px] text-on-surface-variant">19:45 WIB</span>
</div>
</td>
<td class="py-3.5 px-3 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-emerald-100 text-emerald-800 font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Terbit
              </span>
</td>
<td class="py-3.5 px-3 text-right">
<div class="flex flex-col items-end">
<span class="font-bold text-on-surface text-[14px]">14.820</span>
<span class="text-[11px] text-emerald-700 font-semibold">+4.1k mgg ini</span>
</div>
</td>
<td class="py-3.5 pl-3 pr-4 text-center">
<div class="flex items-center justify-center gap-1">
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal('edit', 'NWS-2024-086')" title="Edit Artikel">
<span class="material-symbols-outlined text-[18px]">edit_square</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="previewPublicView('NWS-2024-086')" title="Lihat di Beranda Publik">
<span class="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow('NWS-2024-086', 'Turnamen DBL Seri Provinsi 2024')" title="Hapus Berita">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 5: Arsip Kedaluwarsa -->
<tr class="hover:bg-surface-container-low/60 transition-colors group opacity-85">
<td class="py-3.5 pl-4 pr-2 text-center">
<input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox">
</td>
<td class="py-3.5 px-2 text-center">
<button class="text-outline-variant hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Sematkan ke Berita Utama">
<span class="material-symbols-outlined text-[20px]">star</span>
</button>
</td>
<td class="py-3.5 px-3">
<div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs grayscale">
<img alt="Sampul Wisuda Angkatan XXVII" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Indonesian high school graduation ceremony in decorated school auditorium, students wearing traditional smart attire with graduation sashes and caps, banners of Wisuda SMA Bintang Nusantara, formal ambient photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABsXx7rZ3wNZLL80yDUwijaFjJDF_S_HHat3XIGpstjbT30WMn7bd2RiqHaH_mFS2y0Tsh66AN8JX3hTVmS5ntmiMlLCG5xofwOf0Z4uoxDhpWC-4LdnL7FRFD3OzkN8QS3Ey7B9a48h-ATJZYh086in2DZphOzHOnDZrnicYuKxN7bRvPdympQMrYV7PV2_PKL0YvbY_9372aBgF9BeTigjYleWmldlEvKwS1ycEY2Q0-mJsymCJbVg">
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-on-surface-variant font-bold">#NWS-2024-085</span>
<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant">ARSIP SEMESTER LALU</span>
</div>
<a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">
                  Pelepasan &amp; Wisuda Purnawiyata Angkatan XXVII: 100% Lulusan Diterima di PTN Favorit
                </a>
<p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">
                  Rangkuman momentum sakral pelepasan 320 siswa angkatan 2024 yang sukses menembus SNBP dan SNBT nasional.
                </p>
<div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Tim Humas Pusat</span>
<span class="">â€¢</span>
<span class="">Diarsipkan sejak 01 Sep 2024</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-surface-container-high text-on-surface-variant font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>
                Agenda
              </span>
</td>
<td class="py-3.5 px-3">
<div class="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors text-[12px] cursor-pointer" onclick="viewPdfPreview('Buku_Tahunan_XXVII_Ringkasan.pdf')">
<span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
<span class="truncate max-w-[120px] font-medium" title="Buku_Tahunan_XXVII_Ringkasan.pdf">Buku_Wisuda.pdf</span>
</div>
</td>
<td class="py-3.5 px-3 text-on-surface-variant">
<div class="flex flex-col">
<span class="font-semibold text-on-surface text-[13px]">25 Jun 2024</span>
<span class="text-[11px] text-on-surface-variant">14:00 WIB</span>
</div>
</td>
<td class="py-3.5 px-3 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>
                Arsip
              </span>
</td>
<td class="py-3.5 px-3 text-right">
<div class="flex flex-col items-end">
<span class="font-bold text-on-surface text-[14px]">22.110</span>
<span class="text-[11px] text-on-surface-variant">Total akumulasi</span>
</div>
</td>
<td class="py-3.5 pl-3 pr-4 text-center">
<div class="flex items-center justify-center gap-1">
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal('edit', 'NWS-2024-085')" title="Edit Artikel">
<span class="material-symbols-outlined text-[18px]">edit_square</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="restoreFromArchive('NWS-2024-085')" title="Pulihkan / Terbitkan Kembali">
<span class="material-symbols-outlined text-[18px]">unarchive</span>
</button>
<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow('NWS-2024-085', 'Wisuda Purnawiyata Angkatan XXVII')" title="Hapus Permanen">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer / Pagination -->
<div class="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
<div class="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
<span class="">Menampilkan <strong class="text-on-surface font-semibold">1 - 5</strong> dari total <strong class="text-on-surface font-semibold">128</strong> publikasi berita</span>
<span class="text-outline-variant">â€¢</span>
<div class="flex items-center gap-1">
<span class="">Tampilkan</span>
<select class="px-2 py-1 bg-surface-container-low rounded text-label-md font-label-md text-on-surface focus:outline-none">
<option>5</option>
<option selected="">10</option>
<option>25</option>
<option>50</option>
</select>
</div>
</div>
<div class="flex items-center gap-1">
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40 disabled:hover:bg-transparent" disabled="">
<span class="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md">3</button>
<span class="px-1 text-on-surface-variant font-label-md text-label-md">...</span>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md">13</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low">
<span class="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Bottom Section: Quick Audit Log & Status Bar -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
<!-- Log Aktivitas Publikasi Terbaru -->
<div class="lg:col-span-8 bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">history</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Riwayat &amp; Log Perubahan Berita Humas</h2>
</div>
<a class="font-label-md text-label-md text-primary hover:underline flex items-center gap-1" href="#">
          Lihat Log Lengkap <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
<div class="space-y-space-sm mt-1">
<div class="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">upload_file</span>
</div>
<div class="flex-1 min-w-0">
<p class="font-body-sm text-body-sm text-on-surface leading-snug">
<strong class="font-semibold text-primary">Dra. Nurul Hidayati, M.Pd</strong> mengunggah pembaruan lampiran <code class="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[12px]">SE_ASAS_2024.pdf</code> pada pengumuman jadwal semester.
            </p>
<span class="font-label-sm text-label-sm text-on-surface-variant">14 menit yang lalu â€¢ Melalui Portal Admin Humas</span>
</div>
</div>
<div class="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">publish</span>
</div>
<div class="flex-1 min-w-0">
<p class="font-body-sm text-body-sm text-on-surface leading-snug">
<strong class="font-semibold text-primary">Ahmad Fauzi, S.Kom</strong> menerbitkan artikel resmi <span class="italic font-medium">"Kemenangan 3 Medali Emas OSN Nasional 2024"</span> dan menyematkannya ke Berita Utama.
            </p>
<span class="font-label-sm text-label-sm text-on-surface-variant">2 jam yang lalu â€¢ IP Humas Internal (192.168.10.42)</span>
</div>
</div>
<div class="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div class="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">edit_note</span>
</div>
<div class="flex-1 min-w-0">
<p class="font-body-sm text-body-sm text-on-surface leading-snug">
<strong class="font-semibold text-primary">Dr. Hendra Wijaya</strong> menyimpan Draf Postingan <span class="italic font-medium">"Kurikulum Deep-Learning AI &amp; Robotika SMA"</span>.
            </p>
<span class="font-label-sm text-label-sm text-on-surface-variant">Kemarin, 16:40 WIB â€¢ Menunggu Validasi Kepala Sekolah</span>
</div>
</div>
</div>
</div>
<!-- Quick School Storage & CDN Status -->
<div class="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md">
<div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">cloud_sync</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Penyimpanan Media &amp; PDF</h3>
</div>
<span class="font-label-sm text-label-sm text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Terkoneksi S3</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Kapasitas lampiran surat dinas dan galeri foto resolusi tinggi untuk portal publik.</p>
<div class="mt-4 space-y-2">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface font-medium">Terpakai: 14.8 GB</span>
<span class="text-on-surface-variant font-semibold">50 GB Kapasitas</span>
</div>
<div class="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
<div class="bg-primary h-2.5 rounded-full" style="width: 29.6%"></div>
</div>
<div class="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
<span class="">â€¢ 128 Berkas PDF</span>
<span class="">â€¢ 1.420 Foto Dokumentasi</span>
</div>
</div>
</div>
<div class="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">Backup Otomatis Harian</span>
</div>
<span class="font-label-sm text-label-sm text-emerald-800 font-bold">Aktif (02:00 WIB)</span>
</div>
</div>
</div>
<!-- SLIDE-OVER DRAWER MODAL: "Tulis / Edit Postingan Berita" -->
<div aria-labelledby="slide-over-title" aria-modal="true" class="fixed inset-0 z-50 overflow-hidden hidden" id="article-modal" role="dialog">
<!-- Backdrop Blur Overlay -->
<div class="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity duration-300" onclick="closeArticleModal()"></div>
<div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
<div class="w-screen max-w-3xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between transform transition-transform duration-300">
<!-- Drawer Header -->
<div class="px-space-lg py-space-md bg-surface-container-low border-b border-surface-container flex items-center justify-between shrink-0">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[22px]">post_add</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface" id="modal-title">Tulis Postingan Berita Baru</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Lengkapi metadata, unggah media foto, dan sematkan surat edaran resmi.</p>
</div>
</div>
<button class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" onclick="closeArticleModal()">
<span class="material-symbols-outlined text-[24px]">close</span>
</button>
</div>
<!-- Drawer Body Form -->
<div class="flex-1 overflow-y-auto p-space-lg space-y-space-md">
<!-- Toggle Berita Utama & Pin -->
<div class="p-space-md bg-tertiary-fixed/30 rounded-xl flex items-center justify-between border border-tertiary-fixed-dim/30">
<div class="flex items-start gap-space-sm">
<span class="material-symbols-outlined text-tertiary text-[22px] mt-0.5" style="font-variation-settings: 'FILL' 1;">stars</span>
<div>
<h4 class="font-label-lg text-label-lg text-on-tertiary-fixed font-bold">Jadikan Berita Utama (Pinned Hero)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Berita akan disematkan di slider teratas dan kartu sorotan landing page utama.</p>
</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" id="form-is-pinned" type="checkbox">
<div class="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Judul Berita -->
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between" for="form-title">
<span class="">Judul Artikel / Pengumuman <span class="text-error">*</span></span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-normal" id="title-char-count">0 / 150 karakter</span>
</label>
<input class="w-full px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-title" maxlength="150" oninput="document.getElementById('title-char-count').innerText = this.value.length + ' / 150 karakter'" placeholder="Contoh: Siswa SMA Bintang Nusantara Menangkan Medali Emas Olimpiade Sains..." type="text">
</div>
<!-- Kategori & Status Rilis -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold" for="form-category">Kategori Konten <span class="text-error">*</span></label>
<select class="w-full px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-category">
<option value="Prestasi">Prestasi &amp; Kejuaraan</option>
<option value="Pengumuman">Pengumuman Kedinasan &amp; Wali</option>
<option value="Akademik">Akademik &amp; Pembelajaran</option>
<option value="Ekstrakurikuler">Ekstrakurikuler &amp; OSIS</option>
<option value="Agenda">Agenda Sekolah</option>
</select>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold" for="form-status">Status Penayangan <span class="text-error">*</span></label>
<select class="w-full px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-status">
<option value="Terbit">Langsung Terbit (Publik)</option>
<option value="Draf">Simpan Sebagai Draf Internal</option>
<option value="Terjadwal">Jadwalkan Waktu Tayang</option>
<option value="Arsip">Arsip Non-aktif</option>
</select>
</div>
</div>
<!-- Jadwal & Penulis -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold" for="form-date">Tanggal &amp; Waktu Publikasi</label>
<input class="w-full px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-date" type="datetime-local" value="2024-10-18T08:30">
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold" for="form-author">Penulis / Tim Humas</label>
<input class="w-full px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-author" type="text" value="Dra. Nurul Hidayati, M.Pd">
</div>
</div>
<!-- Upload Gambar Sampul (Drag & Drop Thumbnail) -->
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold">Gambar Sampul Berita (16:9 Landscape)</label>
<div class="border-2 border-dashed border-outline-variant/80 hover:border-primary rounded-xl p-space-md flex flex-col items-center justify-center text-center bg-surface-container-low/40 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[24px]">add_photo_alternate</span>
</div>
<p class="font-label-md text-label-md text-on-surface font-semibold">Tarik gambar sampul ke sini atau <span class="text-primary underline">pilih dari komputer</span></p>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-0.5">Mendukung format JPG, PNG, atau WebP resolusi min. 1200x675px (Maks 3MB)</p>
</div>
</div>
<!-- Ringkasan Singkat (Lead Paragraph) -->
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold" for="form-summary">Ringkasan / Sinopsis Singkat (Muncul pada Kartu &amp; SEO)</label>
<textarea class="w-full px-space-md py-2 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all outline-none" id="form-summary" placeholder="Tuliskan 1-2 kalimat pemantik inti berita yang akan ditampilkan pada daftar cuplikan kartu beranda..." rows="2"></textarea>
</div>
<!-- Rich Text Content Editor Mockup -->
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold">Konten Lengkap Berita</label>
<div class="border border-outline-variant/60 rounded-xl overflow-hidden bg-surface-container-lowest">
<!-- Toolbar -->
<div class="bg-surface-container-low px-space-md py-2 border-b border-outline-variant/40 flex flex-wrap items-center gap-1 text-on-surface-variant">
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Tebal" type="button"><span class="material-symbols-outlined text-[18px]">format_bold</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Miring" type="button"><span class="material-symbols-outlined text-[18px]">format_italic</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Garis Bawah" type="button"><span class="material-symbols-outlined text-[18px]">format_underlined</span></button>
<span class="text-outline-variant mx-1">|</span>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Heading 2" type="button"><span class="material-symbols-outlined text-[18px]">format_h2</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Heading 3" type="button"><span class="material-symbols-outlined text-[18px]">format_h3</span></button>
<span class="text-outline-variant mx-1">|</span>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Daftar Poin" type="button"><span class="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Daftar Nomor" type="button"><span class="material-symbols-outlined text-[18px]">format_list_numbered</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Kutipan" type="button"><span class="material-symbols-outlined text-[18px]">format_quote</span></button>
<span class="text-outline-variant mx-1">|</span>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Sisipkan Link" type="button"><span class="material-symbols-outlined text-[18px]">link</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Sisipkan Gambar" type="button"><span class="material-symbols-outlined text-[18px]">image</span></button>
<button class="p-1 hover:bg-surface-container rounded text-on-surface" title="Sisipkan Tabel" type="button"><span class="material-symbols-outlined text-[18px]">table</span></button>
</div>
<!-- Textarea body -->
<textarea class="w-full p-space-md font-body-md text-body-md text-on-surface focus:outline-none resize-y" placeholder="Tuliskan isi rincian artikel lengkap di sini... Anda dapat menyematkan sub-bab, poin penting, dan kutipan resmi guru atau narasumber." rows="6"></textarea>
</div>
</div>
<!-- Unggah Berkas Lampiran (PDF / SK Dinas) -->
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
<span class="">Lampiran Dokumen Resmi (PDF / Word)</span>
<span class="text-[12px] text-on-surface-variant font-normal">Opsional (Maks. 15MB)</span>
</label>
<div class="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-lg border border-dashed border-outline-variant/60">
<div class="w-10 h-10 rounded-lg bg-surface-container text-error flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">picture_as_pdf</span>
</div>
<div class="flex-1 min-w-0">
<p class="font-label-md text-label-md text-on-surface font-medium truncate">Pilih berkas SK Kepala Sekolah, Edaran Orang Tua, atau Buku Panduan...</p>
<span class="font-label-sm text-label-sm text-on-surface-variant">Hanya menerima format berkas .PDF, .DOCX</span>
</div>
<button class="px-3 py-1.5 bg-surface-container-lowest text-primary hover:bg-surface-container rounded font-label-md text-label-md shadow-xs transition-colors shrink-0" type="button">
                Pilih Berkas
              </button>
</div>
</div>
</div>
<!-- Drawer Footer Action Buttons -->
<div class="px-space-lg py-space-md bg-surface-container-low border-t border-surface-container flex items-center justify-between shrink-0">
<button class="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg rounded-lg transition-colors" onclick="closeArticleModal()">
            Batalkan
          </button>
<div class="flex items-center gap-space-sm">
<button class="px-4 py-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg rounded-lg shadow-xs transition-all" onclick="saveArticleDraft()">
              Simpan Draf
            </button>
<button class="px-5 py-2 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all" onclick="publishArticleSubmit()">
              Terbitkan Sekarang
            </button>
</div>
</div>
</div>
</div>
</div>
<!-- MODAL: Konfirmasi Hapus Berita -->
<div aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center hidden" id="delete-modal" role="dialog">
<div class="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity" onclick="closeDeleteModal()"></div>
<div class="relative bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-2xl mx-4 z-10">
<div class="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mb-space-md">
<span class="material-symbols-outlined text-[28px]">delete_forever</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Hapus Postingan Berita?</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed" id="delete-modal-desc">
        Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini akan menghapus berita dari peredaran publik dan memindahkan data ke riwayat arsip terhapus.
      </p>
<div class="flex items-center justify-end gap-space-sm mt-space-lg">
<button class="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg rounded-lg transition-colors" onclick="closeDeleteModal()">
          Batal
        </button>
<button class="px-5 py-2 bg-error hover:bg-red-700 text-on-error font-label-lg text-label-lg rounded-lg shadow-md transition-all" onclick="executeDeleteRow()">
          Ya, Hapus Sekarang
        </button>
</div>
</div>
</div>
<!-- TOAST NOTIFICATION CONTAINER -->
<div class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none" id="toast-notification">
<div class="flex items-center gap-space-sm px-4 py-3 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl">
<span class="material-symbols-outlined text-emerald-400 text-[20px]" id="toast-icon">check_circle</span>
<span class="font-label-lg text-label-lg" id="toast-message">Operasi berhasil dilakukan</span>
</div>
</div>
</div>
<script>
  let targetedDeleteId = null;

  function showToast(message, icon = 'check_circle') {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    
    toastMsg.innerText = message;
    toastIcon.innerText = icon;
    
    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 3200);
  }

  function openArticleModal(mode, articleId = null) {
    const modal = document.getElementById('article-modal');
    const titleEl = document.getElementById('modal-title');
    
    if (mode === 'edit') {
      titleEl.innerText = 'Edit Postingan Berita (' + articleId + ')';
    } else {
      titleEl.innerText = 'Tulis Postingan Berita Baru';
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function saveArticleDraft() {
    closeArticleModal();
    showToast('Draf berita berhasil disimpan ke daftar kerja internal.', 'drafts');
  }

  function publishArticleSubmit() {
    closeArticleModal();
    showToast('Berita berhasil diterbitkan ke portal publik SMA Bintang Nusantara!', 'verified');
  }

  function togglePinStatus(btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon.classList.contains('text-amber-500')) {
      icon.classList.remove('text-amber-500');
      icon.classList.add('text-outline-variant');
      icon.style.fontVariationSettings = "'FILL' 0";
      showToast('Status sematan berita utama dicabut.', 'star_border');
    } else {
      icon.classList.remove('text-outline-variant');
      icon.classList.add('text-amber-500');
      icon.style.fontVariationSettings = "'FILL' 1";
      showToast('Disematkan sebagai Berita Utama Beranda!', 'star');
    }
  }

  function previewPublicView(id) {
    showToast('Membuka pratinjau publik untuk #' + id, 'open_in_new');
  }

  function viewPdfPreview(fileName) {
    showToast('Membuka penampil lampiran: ' + fileName, 'picture_as_pdf');
  }

  function publishDirectly(id) {
    showToast('Artikel #' + id + ' berhasil diubah status menjadi Terbit!', 'verified');
  }

  function restoreFromArchive(id) {
    showToast('Artikel #' + id + ' berhasil dipulihkan dari arsip.', 'unarchive');
  }

  function confirmDeleteRow(id, title) {
    targetedDeleteId = id;
    document.getElementById('delete-modal-desc').innerText = 'Apakah Anda yakin ingin menghapus artikel "' + title + '" (ID: ' + id + ')? Artikel akan ditarik dari feed publik.';
    document.getElementById('delete-modal').classList.remove('hidden');
  }

  function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    targetedDeleteId = null;
  }

  function executeDeleteRow() {
    closeDeleteModal();
    showToast('Berita berhasil dihapus dari sistem manajemen.', 'delete');
  }

  function handleExportClick() {
    showToast('Mengekspor laporan publikasi berkala (Excel/PDF)...', 'download');
  }

  function toggleSelectAllRows(masterCheckbox) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
    checkSelectedCount();
  }

  function checkSelectedCount() {
    const checked = document.querySelectorAll('.row-checkbox:checked');
    const batchBar = document.getElementById('batch-action-bar');
    const countEl = document.getElementById('batch-count-selected');
    
    if (checked.length > 0) {
      batchBar.classList.remove('hidden');
      batchBar.classList.add('flex');
      countEl.innerText = checked.length + ' terpilih';
    } else {
      batchBar.classList.add('hidden');
      batchBar.classList.remove('flex');
      document.getElementById('master-select-all').checked = false;
    }
  }

  function applyBatchAction(actionType) {
    const checked = document.querySelectorAll('.row-checkbox:checked').length;
    if (actionType === 'publish') {
      showToast(checked + ' artikel serentak diubah status menjadi Terbit.', 'verified');
    } else if (actionType === 'archive') {
      showToast(checked + ' artikel serentak dipindahkan ke Arsip.', 'inventory_2');
    } else if (actionType === 'delete') {
      showToast(checked + ' artikel serentak dihapus.', 'delete');
    }
    document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('master-select-all').checked = false;
    checkSelectedCount();
  }

  function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-sort').value = 'newest';
    showToast('Filter pencarian telah direset.', 'refresh');
  }

  // Status Tab filtering simulation
  document.querySelectorAll('.status-tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.status-tab-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.add('text-on-surface-variant', 'hover:text-on-surface');
      });
      this.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      this.classList.remove('text-on-surface-variant', 'hover:text-on-surface');
      showToast('Memfilter status: ' + this.innerText.split(' ')[0], 'filter_alt');
    });
  });
</script></main>`

export default function ManajemenBerita() {
  const [view, setView] = useState('berita')

  const [menus, setMenus] = useState([
    { id: 1, label: 'Beranda', path: '/', active: true },
    { id: 2, label: 'Profil Sekolah', path: '/profil-sekolah', active: true },
    { id: 3, label: 'Berita & Pengumuman', path: '/berita-pengumuman', active: true },
    { id: 4, label: 'Agenda', path: '/agenda', active: true },
    { id: 5, label: 'Galeri Kegiatan', path: '/galeri-kegiatan', active: true },
    { id: 6, label: 'Unduhan & Edaran', path: '/unduhan-edaran', active: true },
    { id: 7, label: 'Kontak', path: '/kontak', active: true },
  ])
  const [newMenuLabel, setNewMenuLabel] = useState('')
  const [newMenuPath, setNewMenuPath] = useState('')
  const [pages, setPages] = useState([
    { id: 1, judul: 'Profil Sekolah', slug: 'profil-sekolah', konten: '' },
    { id: 2, judul: 'Berita dan Pengumuman', slug: 'berita-pengumuman', konten: '' },
    { id: 3, judul: 'Agenda', slug: 'agenda', konten: '' },
    { id: 4, judul: 'Galeri Kegiatan', slug: 'galeri-kegiatan', konten: '' },
    { id: 5, judul: 'Unduhan dan Edaran', slug: 'unduhan-edaran', konten: '' },
    { id: 6, judul: 'Kontak', slug: 'kontak', konten: '' },
  ])
  const [newFile, setNewFile] = useState('')

  const [galeri, setGaleri] = useState([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg',
  ])
  const [newImg, setNewImg] = useState('')

  const [settings, setSettings] = useState({
    nama: 'SMP Negeri 1 Cipeundeuy',
    alamat: 'Jl. Pendidikan No. 1, Cipeundeuy, Kabupaten Subang, Jawa Barat 41281',
    telepon: '(021) 7890-1234',
    email: 'info@smpn1cipeundeuy.sch.id',
    kepala: 'Dra. Nurul Hidayati, M.Pd',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBybPP72_nSQilbylVBT_6fG44ExivySQt3uCLJv_tj3AwirU7ywATfBEn_eoGUBvO3PksqRUAZx7qE2oqteQ5gSF9WkqzFOW2ClOJAj1alPQn6sJMQe3zr01giJJMT_vfuoSFoP6QDfLQccxC9kWW9k0XuIF2cxZaFBjl_BCgp_4C34yniiqlJcdegP64d0ZoKv_mgefLtvc6gFTuFC7xBPREFgAllSePdd-eYZyEk1brQuyQrXvkK3Q',
  })
  const [savedMsg, setSavedMsg] = useState('')
  const [categories, setCategories] = useState(['Prestasi','Pengumuman','Akademik','Ekstrakurikuler','Agenda'])
  const [newCat, setNewCat] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [files, setFiles] = useState([])
  const [newPageJudul, setNewPageJudul] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')
  const [newPageKonten, setNewPageKonten] = useState('')
  const [editPageId, setEditPageId] = useState(null)
  const [menuSavedMsg, setMenuSavedMsg] = useState('')

  const scriptMatch = mainHtml.match(/<script>([\s\S]*?)<\/script>/)
  const rawScript = scriptMatch ? scriptMatch[1] : ''
  const scriptText = rawScript.replace(/\blet\s+targetedDeleteId\b/, 'var targetedDeleteId')

  const adapterScript = `
window.__editingId = null;
window.__deleteId = null;

function renderRow(r) {
  const id = r.id;
  const statusLabel = r.status === 'terbit' ? 'Terbit' : r.status === 'arsip' ? 'Arsip' : 'Draf';
  const statusClass = r.status === 'terbit' ? 'bg-emerald-100 text-emerald-800' : r.status === 'arsip' ? 'bg-surface-container text-on-surface-variant' : 'bg-amber-50 text-amber-800';
  const statusDot = r.status === 'terbit' ? 'bg-emerald-600' : r.status === 'arsip' ? 'bg-outline' : 'bg-amber-500';
  const pinned = !!r.adalah_utama;
  const title = (r.judul||'').replace(/</g,'&lt;');
  const summary = (r.ringkasan||'').replace(/</g,'&lt;');
  const cat = (r.kategori||'-').replace(/</g,'&lt;');
  const dateStr = r.tanggal_publikasi ? new Date(r.tanggal_publikasi).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '-';
  const timeStr = r.tanggal_publikasi ? new Date(r.tanggal_publikasi).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})+' WIB' : '';
  const img = r.gambar_sampul || '';
  return '<tr class="hover:bg-surface-container-low/60 transition-colors group" data-id="'+id+'">' +
    '<td class="py-3.5 pl-4 pr-2 text-center"><input class="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer align-middle" onchange="checkSelectedCount()" type="checkbox"></td>' +
    '<td class="py-3.5 px-2 text-center"><button class="text-'+(pinned?'tertiary':'outline-variant')+' hover:scale-110 transition-transform" onclick="togglePinStatus(this)" title="Sematkan"><span class="material-symbols-outlined text-[20px]'+(pinned?' text-amber-500':'')+'" style="font-variation-settings: '+(pinned?"'FILL' 1":"'FILL' 0")+';">star</span></button></td>' +
    '<td class="py-3.5 px-3"><div class="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container shadow-xs">'+(img?'<img alt="Sampul" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="'+img+'">':'')+'</div></td>' +
    '<td class="py-3.5 px-4"><div class="flex flex-col gap-0.5"><div class="flex items-center gap-2"><span class="font-label-sm text-label-sm text-primary font-bold">#'+id.slice(0,8)+'</span>'+(pinned?'<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">PINNED</span>':'')+'</div><a class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-tight line-clamp-1" href="#">'+title+'</a><p class="text-on-surface-variant font-body-sm text-body-sm line-clamp-1">'+summary+'</p><div class="flex items-center gap-2 mt-1 text-on-surface-variant text-[12px]"><span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[14px]">person</span> Tim Humas</span></div></div></td>' +
    '<td class="py-3.5 px-3"><span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-md font-label-md bg-primary/10 text-primary font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span>'+cat+'</span></td>' +
    '<td class="py-3.5 px-3">'+(r.berkas_lampiran?'<div class="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg text-on-surface-variant text-[12px]"><span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span><span class="truncate max-w-[120px] font-medium">'+r.berkas_lampiran+'</span></div>':'<span class="text-on-surface-variant/70 text-[12px] italic">Tidak ada berkas</span>')+'</td>' +
    '<td class="py-3.5 px-3 text-on-surface-variant"><div class="flex flex-col"><span class="font-semibold text-on-surface text-[13px]">'+dateStr+'</span><span class="text-[11px] text-on-surface-variant">'+timeStr+'</span></div></td>' +
    '<td class="py-3.5 px-3 text-center"><span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm '+statusClass+' font-bold"><span class="w-1.5 h-1.5 rounded-full '+statusDot+'"></span>'+statusLabel+'</span></td>' +
    '<td class="py-3.5 px-3 text-right"><div class="flex flex-col items-end"><span class="font-bold text-on-surface text-[14px]">0</span><span class="text-[11px] text-on-surface-variant">tayangan</span></div></td>' +
    '<td class="py-3.5 pl-3 pr-4 text-center"><div class="flex items-center justify-center gap-1">' +
      '<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onclick="openArticleModal(\\'edit\\', \\''+id+'\\')" title="Edit Artikel"><span class="material-symbols-outlined text-[18px]">edit_square</span></button>' +
      '<button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onclick="confirmDeleteRow(\\''+id+'\\', \\''+(r.judul||'').replace(/'/g,"\\\\\'")+'\\')" title="Hapus Berita"><span class="material-symbols-outlined text-[18px]">delete</span></button>' +
    '</div></td></tr>';
}

window.loadBeritaTable = async function() {
  const tbody = document.getElementById('news-table-body');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="10" class="py-6 text-center text-on-surface-variant">Memuat data...</td></tr>';
  try {
    const rows = await window.getAllBerita();
    if (!rows || rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" class="py-6 text-center text-on-surface-variant">Belum ada data berita.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(renderRow).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="10" class="py-6 text-center text-error">Gagal memuat data: ' + (e.message||e) + '</td></tr>';
  }
};

window.__editingId = null;
var _origOpen = window.openArticleModal;
window.openArticleModal = function(mode, articleId) {
  window.__editingId = (mode === 'edit') ? articleId : null;
  if (typeof _origOpen === 'function') _origOpen(mode, articleId);
};

function buildPayload(statusOverride) {
  const title = (document.getElementById('form-title').value || '').trim();
  if (!title) { showToast('Judul wajib diisi.', 'error'); return null; }
  const category = document.getElementById('form-category').value;
  const statusSel = statusOverride || document.getElementById('form-status').value;
  const status = statusSel === 'Draf' ? 'draf' : statusSel === 'Arsip' ? 'arsip' : 'terbit';
  const dateVal = document.getElementById('form-date').value;
  const summary = document.getElementById('form-summary').value;
  const contentEl = document.querySelector('#article-modal textarea:not(#form-summary)');
  const konten = contentEl ? contentEl.value : summary;
  const pinned = document.getElementById('form-is-pinned').checked;
  return {
    judul: title,
    ringkasan: summary || title,
    konten: konten || summary || title,
    gambar_sampul: null,
    berkas_lampiran: null,
    kategori: category,
    tanggal_publikasi: dateVal ? new Date(dateVal).toISOString() : new Date().toISOString(),
    status: status,
    adalah_utama: pinned,
  };
}

window.saveArticleDraft = async function() {
  const payload = buildPayload('draf');
  if (!payload) return;
  try {
    if (window.__editingId) { await window.updateBerita(window.__editingId, payload); }
    else { await window.addBerita(payload); }
    closeArticleModal();
    showToast('Draf berita berhasil disimpan.', 'drafts');
    window.__editingId = null;
    await window.loadBeritaTable();
  } catch (e) { showToast('Gagal menyimpan: ' + (e.message||e), 'error'); }
};

window.publishArticleSubmit = async function() {
  const payload = buildPayload('terbit');
  if (!payload) return;
  try {
    if (window.__editingId) { await window.updateBerita(window.__editingId, payload); }
    else { await window.addBerita(payload); }
    closeArticleModal();
    showToast('Berita berhasil diterbitkan.', 'verified');
    window.__editingId = null;
    await window.loadBeritaTable();
  } catch (e) { showToast('Gagal menyimpan: ' + (e.message||e), 'error'); }
};

window.__deleteId = null;
var _origConfirmDelete = window.confirmDeleteRow;
window.confirmDeleteRow = function(id, title) {
  window.__deleteId = id;
  if (typeof _origConfirmDelete === 'function') _origConfirmDelete(id, title);
};
window.executeDeleteRow = async function() {
  try {
    if (window.__deleteId) await window.deleteBerita(window.__deleteId);
    closeDeleteModal();
    showToast('Berita berhasil dihapus.', 'delete');
    await window.loadBeritaTable();
  } catch (e) { showToast('Gagal menghapus: ' + (e.message||e), 'error'); }
};

window.togglePinStatus = async function(btn) {
  const icon = btn.querySelector('.material-symbols-outlined');
  const row = btn.closest('tr');
  const id = row ? row.getAttribute('data-id') : null;
  if (!id) return;
  const currentlyPinned = icon.classList.contains('text-amber-500');
  const newPinned = !currentlyPinned;
  try {
    await window.updateBerita(id, { adalah_utama: newPinned });
    await window.loadBeritaTable();
  } catch (e) { showToast('Gagal: ' + (e.message||e), 'error'); }
};

// sidebar navigation switches view
document.querySelectorAll('aside a[data-path]').forEach(function(a){
  const path = a.getAttribute('data-path');
  if (path === 'portal-berita') return; // Lihat Web Publik
  a.addEventListener('click', function(e){
    e.preventDefault();
    if (window.__setAdminView) window.__setAdminView(path);
  });
});

// inject menu-navigasi sidebar link
(function(){
  const nav = document.querySelector('aside nav');
  if (nav && !document.querySelector('aside a[data-path="menu-navigasi"]')) {
    const a = document.createElement('a');
    a.setAttribute('data-path','menu-navigasi');
    a.className = 'flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-primary/80 hover:bg-primary-container hover:text-on-primary transition-all font-label-lg text-label-lg';
    a.href = '#';
    a.innerHTML = '<span class="material-symbols-outlined text-[20px]">menu</span><span class="">Menu Navigasi</span>';
    nav.appendChild(a);
    a.addEventListener('click', function(e){ e.preventDefault(); console.log('Menu Navigasi clicked, setView available:', !!window.__setAdminView); if (window.__setAdminView) window.__setAdminView('menu-navigasi'); });
  }
})();

// inject halaman sidebar link
(function(){
  const nav = document.querySelector('aside nav');
  if (nav && !document.querySelector('aside a[data-path="halaman"]')) {
    const a = document.createElement('a');
    a.setAttribute('data-path','halaman');
    a.className = 'flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-primary/80 hover:bg-primary-container hover:text-on-primary transition-all font-label-lg text-label-lg';
    a.href = '#';
    a.innerHTML = '<span class="material-symbols-outlined text-[20px]">article</span><span class="">Halaman</span>';
    nav.appendChild(a);
    a.addEventListener('click', function(e){ e.preventDefault(); if (window.__setAdminView) window.__setAdminView('halaman'); });
  }
})();

setTimeout(function(){ window.loadBeritaTable(); }, 300);
`;

  useEffect(() => {
    window.getAllBerita = getAllBerita
    window.addBerita = addBerita
    window.updateBerita = updateBerita
    window.deleteBerita = deleteBerita
    window.__setAdminView = (v) => setView(v)
    window.__forceView = (v) => setView(v)
  }, [])

  useEffect(() => {
    document.querySelectorAll('script[data-admin-script="true"]').forEach((el) => el.remove())
    if (scriptText) {
      const s = document.createElement('script')
      s.setAttribute('data-admin-script', 'true')
      try { window.eval(scriptText) } catch (e) { console.error('RAW SCRIPT ERROR:', e.message) }
    }
    document.querySelectorAll('script[data-admin-adapter="true"]').forEach((el) => el.remove())
    if (adapterScript) {
      window.onerror = function(msg, url, line, col) { console.error('WINDOW ERROR:', msg, 'line:', line, 'col:', col); return true; };
      const s2 = document.createElement('script');
      s2.setAttribute('data-admin-adapter', 'true');
      s2.textContent = adapterScript;
      const lines = adapterScript.split('\n');
      console.log('RUNTIME LINE28:', JSON.stringify(lines[27]));
      document.body.appendChild(s2);
    }
  }, [])

  const cleanHtml = mainHtml.replace(/<script>[\s\S]*?<\/script>/, '')

  // panel helpers
  function addCat() { if (newCat.trim()) { setCategories([...categories, newCat.trim()]); setNewCat('') } }
  function addTag() { if (newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag('') } }
  function addFile() { if (newFile.trim()) { setFiles([...files, { nama: newFile.trim(), ukuran: 'â€”' }]); setNewFile('') } }
  function addImg() { if (newImg.trim()) { setGaleri([...galeri, newImg.trim()]); setNewImg('') } }
  function saveSettings() { setSavedMsg('Pengaturan berhasil disimpan (sementara di memori).') }

  const panelClass = 'bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md'

  return (
    <>
      <Sidebar />
      <div className="pl-72 min-h-screen bg-background">
        <AdminHeader />
        <div className="w-full px-space-lg py-space-lg">
          {view === 'berita' || view === 'dashboard-overview' || view === 'log-aktivitas' ? (
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          ) : view === 'kategori-dan-tag' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">label</span> Kategori &amp; Tag</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="flex flex-col gap-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Kategori</h3>
                  <div className="flex gap-space-sm">
                    <input value={newCat} onChange={(e)=>setNewCat(e.target.value)} placeholder="Nama kategori baru" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                    <button onClick={addCat} className="px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-lg">Tambah</button>
                  </div>
                  <ul className="flex flex-col gap-space-xs">
                    {categories.map((c,i) => (
                      <li key={i} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                        <span className="font-body-md text-on-surface">{c}</span>
                        <button onClick={()=>setCategories(categories.filter((_,x)=>x!==i))} className="text-error hover:underline font-label-sm">Hapus</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Tag</h3>
                  <div className="flex gap-space-sm">
                    <input value={newTag} onChange={(e)=>setNewTag(e.target.value)} placeholder="Nama tag baru" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                    <button onClick={addTag} className="px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-lg">Tambah</button>
                  </div>
                  <ul className="flex flex-col gap-space-xs">
                    {tags.map((t,i) => (
                      <li key={i} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                        <span className="font-body-md text-on-surface">{t}</span>
                        <button onClick={()=>setTags(tags.filter((_,x)=>x!==i))} className="text-error hover:underline font-label-sm">Hapus</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : view === 'unggahan-berkas' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">upload_file</span> Unggahan Berkas &amp; PDF</h2>
              <div className="flex gap-space-sm">
                <input value={newFile} onChange={(e)=>setNewFile(e.target.value)} placeholder="Nama berkas baru" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <button onClick={addFile} className="px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-lg">Tambah</button>
              </div>
              <ul className="flex flex-col gap-space-xs">
                {files.map((f,i) => (
                  <li key={i} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                      <span className="font-body-md text-on-surface">{f.nama}</span>
                      <span className="font-label-sm text-on-surface-variant">{f.ukuran}</span>
                    </div>
                    <button onClick={()=>setFiles(files.filter((_,x)=>x!==i))} className="text-error hover:underline font-label-sm">Hapus</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : view === 'galeri-media-admin' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">photo_library</span> Galeri Media</h2>
              <div className="flex gap-space-sm">
                <input value={newImg} onChange={(e)=>setNewImg(e.target.value)} placeholder="URL gambar baru" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <button onClick={addImg} className="px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-lg">Tambah</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                {galeri.map((g,i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden h-24">
                    <img src={g} alt={'media '+i} className="w-full h-full object-cover" />
                    <button onClick={()=>setGaleri(galeri.filter((_,x)=>x!==i))} className="absolute top-1 right-1 bg-error text-on-error rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity">âœ•</button>
                  </div>
                ))}
              </div>
            </div>
          ) : view === 'halaman' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">article</span> Manajemen Halaman</h2>
              <div className="flex flex-col gap-space-sm">
                <input value={newPageJudul} onChange={(e)=>setNewPageJudul(e.target.value)} placeholder="Judul halaman" className="px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <input value={newPageSlug} onChange={(e)=>setNewPageSlug(e.target.value)} placeholder="Slug (mis. profil-sekolah)" className="px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <textarea value={newPageKonten} onChange={(e)=>setNewPageKonten(e.target.value)} placeholder="Konten halaman" rows="4" className="px-space-md py-2 bg-surface-container-low rounded-lg text-body-md resize-none" />
                <button onClick={() => {
                  if (!newPageJudul.trim() || !newPageSlug.trim()) return
                  if (editPageId) {
                    setPages(pages.map((p) => p.id === editPageId ? { ...p, judul: newPageJudul.trim(), slug: newPageSlug.trim(), konten: newPageKonten } : p))
                    setEditPageId(null)
                  } else {
                    setPages([...pages, { id: Date.now(), judul: newPageJudul.trim(), slug: newPageSlug.trim(), konten: newPageKonten }])
                  }
                  setNewPageJudul(''); setNewPageSlug(''); setNewPageKonten('')
                }} className="w-fit px-space-lg py-2.5 bg-primary text-on-primary rounded-lg font-label-lg">{editPageId ? 'Simpan Perubahan' : 'Tambah Halaman'}</button>
              </div>
              <ul className="flex flex-col gap-space-xs">
                {pages.map((p) => (
                  <li key={p.id} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                    <div className="flex flex-col">
                      <span className="font-body-md text-on-surface font-semibold">{p.judul}</span>
                      <span className="font-label-sm text-on-surface-variant">/halaman/{p.slug}</span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <a href={'/halaman/' + p.slug} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:underline font-label-sm">Lihat</a>
                      <button onClick={() => { setEditPageId(p.id); setNewPageJudul(p.judul); setNewPageSlug(p.slug); setNewPageKonten(p.konten) }} className="text-primary hover:underline font-label-sm">Edit</button>
                      <button onClick={() => setPages(pages.filter((x) => x.id !== p.id))} className="text-error hover:underline font-label-sm">Hapus</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => { localStorage.setItem('site_pages_v2', JSON.stringify(pages)); setMenuSavedMsg('Halaman disimpan.') }} className="w-fit px-space-lg py-2.5 bg-primary text-on-primary rounded-lg font-label-lg">Simpan Halaman</button>
            </div>
          ) : view === 'menu-navigasi' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">menu</span> Pengaturan Menu Navigasi</h2>
              <div className="flex gap-space-sm">
                <input value={newMenuLabel} onChange={(e)=>setNewMenuLabel(e.target.value)} placeholder="Label menu" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <input value={newMenuPath} onChange={(e)=>setNewMenuPath(e.target.value)} placeholder="Path (mis. /halaman)" className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                <button onClick={() => { if (newMenuLabel.trim() && newMenuPath.trim()) { setMenus([...menus, { id: Date.now(), label: newMenuLabel.trim(), path: newMenuPath.trim(), active: true }]); setNewMenuLabel(''); setNewMenuPath('') } }} className="px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-lg">Tambah</button>
              </div>
              <ul className="flex flex-col gap-space-xs">
                {menus.map((m) => (
                  <li key={m.id} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                    <div className="flex items-center gap-space-sm">
                      <span className={"w-2 h-2 rounded-full " + (m.active ? 'bg-emerald-500' : 'bg-outline')}></span>
                      <a href={m.path} className="font-body-md text-primary hover:underline font-semibold">{m.label}</a>
                      <span className="font-label-sm text-on-surface-variant">{m.path}</span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <button onClick={() => setMenus(menus.map((x) => x.id === m.id ? { ...x, active: !x.active } : x))} className="text-primary hover:underline font-label-sm">{m.active ? 'Nonaktifkan' : 'Aktifkan'}</button>
                      <button onClick={() => { const l = prompt('Label baru:', m.label); if (l) setMenus(menus.map((x) => x.id === m.id ? { ...x, label: l } : x)) }} className="text-on-surface-variant hover:underline font-label-sm">Edit</button>
                      <button onClick={() => setMenus(menus.filter((x) => x.id !== m.id))} className="text-error hover:underline font-label-sm">Hapus</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => { localStorage.setItem('site_menus', JSON.stringify(menus)); setMenuSavedMsg('Menu navigasi berhasil disimpan.') }} className="w-fit px-space-lg py-2.5 bg-primary text-on-primary rounded-lg font-label-lg">Simpan Menu</button>
              {menuSavedMsg && <div className="p-space-sm rounded-lg bg-emerald-50 text-emerald-800 font-body-sm">{menuSavedMsg}</div>}
            </div>
          ) : view === 'pengaturan-web' ? (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-sm"><span className="material-symbols-outlined text-primary">settings</span> Pengaturan Web</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {Object.keys(settings).map((k) => (
                  <div key={k} className="flex flex-col gap-space-xs">
                    <label className="font-label-md text-label-md text-on-surface font-semibold capitalize">{k}</label>
                    <input value={settings[k]} onChange={(e)=>setSettings({...settings,[k]:e.target.value})} className="w-full px-space-md py-2 bg-surface-container-low rounded-lg text-body-md" />
                  </div>
                ))}
              </div>
              <button onClick={saveSettings} className="w-fit px-space-lg py-2.5 bg-primary text-on-primary rounded-lg font-label-lg">Simpan</button>
              {savedMsg && <div className="p-space-sm rounded-lg bg-emerald-50 text-emerald-800 font-body-sm">{savedMsg}</div>}
            </div>
          ) : (
            <div className={panelClass}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Modul segera tersedia</h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
