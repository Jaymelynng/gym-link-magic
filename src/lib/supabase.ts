
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trmsyoidbqpbabzhycsx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybXN5b2lkYnFwYmFiemh5Y3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTMwODgsImV4cCI6MjA1NzM4OTA4OH0.SORmqv-D1NazhU32A6EoVKH6V6Gy5rkoCErNeXal6zA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions to interact with Supabase
export const getGyms = async () => {
  const { data, error } = await supabase
    .from('gyms')
    .select('*');
  
  if (error) {
    console.error('Error fetching gyms:', error);
    throw new Error('Failed to fetch gyms');
  }
  
  return data || [];
};

export const getGymById = async (id: string) => {
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching gym:', error);
    if (error.code === 'PGRST116') {
      return null; // No gym found with this ID
    }
    throw new Error('Failed to fetch gym');
  }
  
  return data;
};

export const updateGym = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('gyms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating gym:', error);
    throw new Error('Failed to update gym');
  }
  
  return data;
};
