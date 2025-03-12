
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGyms, getGymById, updateGym } from '@/lib/supabase';
import { GymLocation } from '@/config/gyms';

export const useGyms = () => {
  return useQuery({
    queryKey: ['gyms'],
    queryFn: getGyms,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGym = (gymId: string | undefined) => {
  return useQuery({
    queryKey: ['gym', gymId],
    queryFn: () => getGymById(gymId as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!gymId
  });
};

export const useUpdateGym = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<GymLocation> }) => 
      updateGym(id, updates),
    onSuccess: (data) => {
      // Invalidate and refetch the individual gym and the gyms list
      queryClient.invalidateQueries({ queryKey: ['gym', data.id] });
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
    },
  });
};
