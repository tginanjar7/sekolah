import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getAllBerita() {
  const { data, error } = await supabase.from('berita').select('*').order('tanggal_publikasi', { ascending: false })
  if (error) throw error
  return data
}

export async function addBerita(payload) {
  const { data, error } = await supabase.from('berita').insert([payload]).select()
  if (error) throw error
  return data
}

export async function updateBerita(id, payload) {
  const { data, error } = await supabase.from('berita').update(payload).eq('id', id).select()
  if (error) throw error
  return data
}

export async function deleteBerita(id) {
  const { error } = await supabase.from('berita').delete().eq('id', id)
  if (error) throw error
  return true
}
