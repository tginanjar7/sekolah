-- Replace RLS policies for berita (auth-aware)
-- Select: berita ditampilkan di halaman publik, jadi izinkan semua orang (anon + authenticated).
-- Insert/Update/Delete: hanya pengguna yang sudah login (authenticated).

drop policy if exists "berita_select_all" on public.berita;
create policy "berita_select_all" on public.berita for select using (true);

drop policy if exists "berita_insert_all" on public.berita;
drop policy if exists "berita_insert_auth" on public.berita;
create policy "berita_insert_auth" on public.berita for insert to authenticated with check (true);

drop policy if exists "berita_update_all" on public.berita;
drop policy if exists "berita_update_auth" on public.berita;
create policy "berita_update_auth" on public.berita for update to authenticated using (true) with check (true);

drop policy if exists "berita_delete_all" on public.berita;
drop policy if exists "berita_delete_auth" on public.berita;
create policy "berita_delete_auth" on public.berita for delete to authenticated using (true);
