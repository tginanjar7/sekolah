-- Schema for pesan (contact messages) table (idempotent)
create table if not exists public.pesan (
  id uuid primary key default gen_random_uuid(),
  nama varchar(255) not null,
  email varchar(255) not null,
  subjek varchar(255),
  pesan text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.pesan enable row level security;

drop policy if exists "pesan_select_all" on public.pesan;
create policy "pesan_select_all" on public.pesan for select using (true);

drop policy if exists "pesan_insert_all" on public.pesan;
create policy "pesan_insert_all" on public.pesan for insert with check (true);

drop policy if exists "pesan_update_all" on public.pesan;
create policy "pesan_update_all" on public.pesan for update using (true) with check (true);

drop policy if exists "pesan_delete_all" on public.pesan;
create policy "pesan_delete_all" on public.pesan for delete using (true);
