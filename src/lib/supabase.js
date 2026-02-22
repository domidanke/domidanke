import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnon) {
  console.warn('⚠️ Supabase credentials missing – gifts will only be stored locally.')
}

export const supabase = (supabaseUrl && supabaseAnon)
  ? createClient(supabaseUrl, supabaseAnon)
  : null

/* ── helpers ── */

export async function sendGift(gift, message, sender) {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('gifts')
    .insert([{ gift_id: gift.id, gift_emoji: gift.emoji, gift_name: gift.name, message, sender }])
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return null
  }
  return data
}

export async function fetchGifts() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data
}

export async function fetchGiftCount() {
  if (!supabase) return 0

  const { count, error } = await supabase
    .from('gifts')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Supabase count error:', error)
    return 0
  }
  return count
}
