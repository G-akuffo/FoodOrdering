import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iwfjhixirqggvptiixck.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZmpoaXhpcnFnZ3ZwdGlpeGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNDY2NTQsImV4cCI6MjA0MTcyMjY1NH0.Ooju3yBoDlnI9n84K_5ECYYOp2ncDN3thClcmI_Yw8E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
