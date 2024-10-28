import { createClient } from "@supabase/supabase-js";

export async function createSupbaseAdmin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SERVICE_ROLE}`,
      },
    },
  });
}

export async function createSupbaseClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.ANON_KEY!);
}
