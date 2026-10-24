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
  ('11111111-1111-1111-1111-111111111111', 'Siswa SMPN 1 Cipeundeuy Raih Medali Emas OSN 2024', 'Prestasi gemilang di ajang Olimpiade Sains Nasional 2024.', 'Kontingen sains SMPN 1 Cipeundeuy meraih medali emas di bidang IPA dan Matematika.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu1wVAM09zzyuMRJRA4WTYmRuY649Ux7ySGODO01PUKxiD__Fnx3BjT-zWf2jfF7rjgzv7VxeI1w-iusQJQWoCS5vpXOuImzRxSgeVWZBlUX8cdyIzGrcvoaZhXujAcI5jXZMIitciy4P5WPU2fDzP3APB6s_ZC6PAx0xqr5Iw5v3GLT7tvuRGO8Dh2ahyXNJlhWBJSWiffSl67nmQlZEp1rWs1IFbEhjIQ6vmC-5prpB9csraGerT-w', 'SK-Pemenang-OSN-2024.pdf', 'Prestasi', '2024-10-18 08:30:00+07', 'terbit', true),
  ('22222222-2222-2222-2222-222222222222', 'Surat Edaran Pertemuan Orang Tua Murid Kelas X', 'Undangan silaturahmi komite dan konsultasi karir.', 'Undangan resmi pertemuan orang tua murid kelas X dan konsultasi karir peminatan.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuByNd6mOd9N-dpUD9V1ihTe1rCCAS53g0qSMfnj4FFManHW-t3qOTCcl9PClQkDJcTIz_zwzuPjmTPtDCXrhLoKxNim4LjToDlK4UFvVSwFcCku4r7YaSgX-jI8kaAnPHlOooHL5I2Alk9bbEk7dmHGJSGq-rHmqOoDyaNpAUhu7bjrM6pRmlQgRgpanoAYe4zWH8nO0lWFmYYxDiGIxiDInrMVlVWRjcqHLPyU5r-NonAbYuMK8LenwA', 'SE_Pertemuan_Wali_X.pdf', 'Pengumuman', '2024-11-10 10:00:00+07', 'terbit', false),
  ('33333333-3333-3333-3333-333333333333', 'Tim Robotik Juara 1 Nusantara STEM Expo', 'Inovasi sistem pemilah sampah pintar.', 'Tim robotik sekolah menjuarai Nusantara STEM Innovation Expo di Surabaya.', null, 'Dokumentasi_STEM.zip', 'Ekstrakurikuler', '2024-11-05 09:00:00+07', 'terbit', false),
  ('44444444-4444-4444-4444-444444444444', 'Jadwal Asesmen Sumatif Akhir Semester', 'Tata tertib dan jadwal ujian CBT.', 'Jadwal ASAS Ganjil 2024/2025 dan tata tertib ujian.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ5Rn2hx2ee1iCLSxPwdwSg2Y-dpIjRWexJ1QlDW11pyHTbliJ_gdBPnfLyzBBUBxbTqCzKxq-DXfdkHTgL01Rrm0xKFdZ7U_jhHwFchkEn_pldiUNDXd0K0o-7ktgI_ODe4gZSsup7gKPZYumM5ulw1GTbULwnTbNahi7F9Yon4NaGBOgi_lsg6MBkPg3z94TbpZ6Lh1nlv-uAYIY1gZABPeURwsvgfzh5djeN4qRUAzDqz1U_luSg', 'Panduan_ASAS_2024.pdf', 'Akademik', '2024-11-14 07:00:00+07', 'terbit', false),
  ('55555555-5555-5555-5555-555555555555', 'Alur Pendaftaran PPDB 2025', 'Informasi pendaftaran jalur prestasi dan afirmasi.', 'Alur pendaftaran dan verifikasi berkas PPDB 2025.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUpRPCcQbKe0bIeCSdnQA5XSQMQJPIpFHV1RWYKwj3iev_hEkOQyPNda6Kct8BnUQs2Go_HWSqrlmc-e_x7sFjSz8hDEy_bO8OOVzKJ7fGiMdc9wI-1h0HYabmxPoJAgXaxDl9FNb54S_TeN9IXKQu8vgdtTA-sSi8vfS_UyH_iDIiEmioS4EVcesPurL3t5B1zmtxDs2tveSQMVrVD1UKM3Jv-pv7N3qVvzb-5Tup7cZg2x6W8Dhcg', 'Juknis_PPDB_2025.pdf', 'Pengumuman', '2024-10-20 08:00:00+07', 'draf', false)
on conflict (id) do nothing;
