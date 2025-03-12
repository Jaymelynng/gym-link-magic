
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { GymLocation } from '@/config/gyms';

export const useGyms = () => {
  return useQuery({
    queryKey: ['gyms'],
    queryFn: async (): Promise<GymLocation[]> => {
      const { data, error } = await supabase
        .from('gyms')
        .select('*');
      
      if (error) {
        console.error('Error fetching gyms:', error);
        throw new Error('Failed to fetch gyms');
      }
      
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGym = (gymId: string | undefined) => {
  return useQuery({
    queryKey: ['gym', gymId],
    queryFn: async (): Promise<GymLocation | null> => {
      if (!gymId) return null;
      
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('id', gymId)
        .single();
      
      if (error) {
        console.error('Error fetching gym:', error);
        if (error.code === 'PGRST116') {
          return null; // No gym found with this ID
        }
        throw new Error('Failed to fetch gym');
      }
      
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!gymId
  });
};
