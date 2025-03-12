
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trmsyoidbqpbabzhycsx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybXN5b2lkYnFwYmFiemh5Y3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTMwODgsImV4cCI6MjA1NzM4OTA4OH0.SORmqv-D1NazhU32A6EoVKH6V6Gy5rkoCErNeXal6zA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
