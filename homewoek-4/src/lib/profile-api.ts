import { supabase } from '@/lib/supabase'

export async function loadProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('id,email,username,profile_url,phone,bio,updated_at')
    .eq('id', userId)
    .single()
    .maybeSingle()
}

export async function updateProfile(
  userId: string,
  payload: {
    username?: string
    profile_url?: string
    phone?: string
    bio?: string
  }
) {
  return supabase.from('profiles').upsert({ id: userId, ...payload })
}
