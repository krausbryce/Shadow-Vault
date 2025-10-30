// Import Supabase library and setup connection to database

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

let supabaseURL = 'https://txxrdepiwhnmzbzbjkno.supabase.co';
let supabaseAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eHJkZXBpd2hubXpiemJqa25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQyNTAsImV4cCI6MjA3NTg3MDI1MH0.0OfluptcByKWC6vibVIsS835QGEH-994pzsmfty2BBg';

//Export Database to Other Funcitons
export let supabase = createClient(supabaseURL, supabaseAPI);

