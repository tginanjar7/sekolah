-- Schema for berita table (idempotent)
create table if not exists public.berita (
  id uuid primary key default gen_random_uuid(),
  judul varchar(255) not null,
  ringkasan varchar(500),
  konten text,
  gambar_sampul varchar(500),
  berkas_lampiran varchar(500),
  kategori varchar(100),
  tanggal_publikasi timestamp with time zone,
  status varchar(20) not null default 'draf',
  adalah_utama boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint berita_status_check check (status in ('draf', 'terbit', 'arsip'))
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists berita_set_updated_at on public.berita;
create trigger berita_set_updated_at
before update on public.berita
for each row execute function public.set_updated_at();

-- RLS
alter table public.berita enable row level security;

drop policy if exists "berita_select_all" on public.berita;
create policy "berita_select_all" on public.berita for select using (true);

drop policy if exists "berita_insert_all" on public.berita;
create policy "berita_insert_all" on public.berita for insert with check (true);

drop policy if exists "berita_update_all" on public.berita;
create policy "berita_update_all" on public.berita for update using (true) with check (true);

drop policy if exists "berita_delete_all" on public.berita;
create policy "berita_delete_all" on public.berita for delete using (true);

-- Sample data (idempotent)
insert into public.berita (id, judul, ringkasan, konten, gambar_sampul, berkas_lampiran, kategori, tanggal_publikasi, status, adalah_utama)
values
  ('11111111-1111-1111-1111-111111111111', 'Siswa SMPN 1 Cipeundeuy Raih Medali Emas OSN 2024', 'Prestasi gemilang di ajang Olimpiade Sains Nasional 2024.', 'Kontingen sains SMPN 1 Cipeundeuy meraih medali emas di bidang IPA dan Matematika.', null, 'SK-Pemenang-OSN-2024.pdf', 'Prestasi', '2024-10-18 08:30:00+07', 'terbit', true),
  ('22222222-2222-2222-2222-222222222222', 'Surat Edaran Pertemuan Orang Tua Murid Kelas X', 'Undangan silaturahmi komite dan konsultasi karir.', 'Undangan resmi pertemuan orang tua murid kelas X dan konsultasi karir peminatan.', null, 'SE_Pertemuan_Wali_X.pdf', 'Pengumuman', '2024-11-10 10:00:00+07', 'terbit', false),
  ('33333333-3333-3333-3333-333333333333', 'Tim Robotik Juara 1 Nusantara STEM Expo', 'Inovasi sistem pemilah sampah pintar.', 'Tim robotik sekolah menjuarai Nusantara STEM Innovation Expo di Surabaya.', null, 'Dokumentasi_STEM.zip', 'Ekstrakurikuler', '2024-11-05 09:00:00+07', 'terbit', false),
  ('44444444-4444-4444-4444-444444444444', 'Jadwal Asesmen Sumatif Akhir Semester', 'Tata tertib dan jadwal ujian CBT.', 'Jadwal ASAS Ganjil 2024/2025 dan tata tertib ujian.', null, 'Panduan_ASAS_2024.pdf', 'Akademik', '2024-11-14 07:00:00+07', 'terbit', false),
  ('55555555-5555-5555-5555-555555555555', 'Alur Pendaftaran PPDB 2025', 'Informasi pendaftaran jalur prestasi dan afirmasi.', 'Alur pendaftaran dan verifikasi berkas PPDB 2025.', null, 'Juknis_PPDB_2025.pdf', 'Pengumuman', '2024-10-20 08:00:00+07', 'draf', false)
on conflict (id) do nothing;
