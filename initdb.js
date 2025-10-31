import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabaseURL = 'https://txxrdepiwhnmzbzbjkno.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eHJkZXBpd2hubXpiemJqa25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQyNTAsImV4cCI6MjA3NTg3MDI1MH0.0OfluptcByKWC6vibVIsS835QGEH-994pzsmfty2BBg';

export const supabase = createClient(supabaseURL, supabaseAnonKey);