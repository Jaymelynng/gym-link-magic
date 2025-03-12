
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Fetch all gym colors
export const useGymColors = () => {
  return useQuery({
    queryKey: ['gymColors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gym_colors')
        .select('*');
      
      if (error) {
        console.error('Error fetching gym colors:', error);
        throw new Error('Failed to fetch gym colors');
      }
      
      // Convert to the format used in the app
      const formattedColors: Record<string, { primary: string, secondary: string }> = {};
      
      data.forEach((item: { gym_id: string, primary_color: string, secondary_color: string }) => {
        formattedColors[item.gym_id] = {
          primary: item.primary_color,
          secondary: item.secondary_color
        };
      });
      
      return formattedColors;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch colors for a specific gym
export const useGymColor = (gymId: string | undefined) => {
  return useQuery({
    queryKey: ['gymColor', gymId],
    queryFn: async () => {
      if (!gymId) return null;
      
      const { data, error } = await supabase
        .from('gym_colors')
        .select('*')
        .eq('gym_id', gymId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No colors found for this gym
        }
        console.error('Error fetching gym color:', error);
        throw new Error('Failed to fetch gym color');
      }
      
      return {
        primary: data.primary_color,
        secondary: data.secondary_color
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!gymId
  });
};

// Update colors for a specific gym
export const useUpdateGymColor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      gymId, 
      colors 
    }: { 
      gymId: string; 
      colors: { primary: string, secondary: string } 
    }) => {
      const { data, error } = await supabase
        .from('gym_colors')
        .upsert({
          gym_id: gymId,
          primary_color: colors.primary,
          secondary_color: colors.secondary
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error updating gym color:', error);
        throw new Error('Failed to update gym color');
      }
      
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch the relevant queries
      queryClient.invalidateQueries({ queryKey: ['gymColor', variables.gymId] });
      queryClient.invalidateQueries({ queryKey: ['gymColors'] });
    },
  });
};
