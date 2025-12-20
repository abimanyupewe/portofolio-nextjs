
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase Environment Variables. Check your .env file and restart the server.');
}

// Create client with fallback or valid values
export const supabase = createClient(supabaseUrl, supabaseKey || "missing-key");
