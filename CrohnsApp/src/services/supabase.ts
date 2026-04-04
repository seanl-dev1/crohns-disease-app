import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://qegwvexjiwdyttjsokia.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ3d2ZXhqaXdkeXR0anNva2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjU0OTYsImV4cCI6MjA5MDkwMTQ5Nn0.i-tOicB3nbq9628T846pehs_eaML-M_SXetpDcBhrAU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // not needed for React Native
  },
});
