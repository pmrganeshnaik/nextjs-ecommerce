import { createServerComponentClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createServerComponentClient({
    cookies
  })
}