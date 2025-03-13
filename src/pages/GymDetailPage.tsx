
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Globe, Facebook, Instagram, Gift, Mail, Phone, MapPin, User } from "lucide-react";
import SocialLink from "@/components/SocialLink";

export default function GymDetailPage() {
  const { gymId } = useParams();
  
  const { data: gym, isLoading, error } = useQuery({
    queryKey: ['gym', gymId],
    queryFn: async () => {
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
    enabled: !!gymId
  });

  const { data: colors } = useQuery({
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

  if (isLoading) {
    return (
      <div className="min-h-screen w-full max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        <Skeleton className="w-48 sm:w-64 md:w-72 h-48 mb-8" />
        <Skeleton className="w-3/4 h-6 mb-8" />
        <div className="w-full space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-14" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !gym) {
    return <Navigate to="/" replace />;
  }

  // Use colors from the database, or fall back to defaults
  const gymColors = colors || { primary: "#2DD4BF", secondary: "#8B5CF6" };

  return (
    <div className="min-h-screen w-full max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
      <div className="logo-container w-48 sm:w-64 md:w-72 mb-8 animate-float">
        <img
          src={gym.logo}
          alt={gym.name}
          className="w-full h-auto drop-shadow-lg"
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-4 text-center">{gym.name}</h1>
      
      <p className="text-gray-600 mb-8 text-center text-base sm:text-lg max-w-md animate-fade-in">
        {gym.description}
      </p>

      <div className="w-full space-y-4">
        {gym.links.trial && (
          <SocialLink
            href={gym.links.trial}
            icon={Gift}
            label="Book a Free Trial"
            color={gymColors.secondary}
          />
        )}
        
        {gym.links.booking && (
          <SocialLink
            href={gym.links.booking}
            icon={Calendar}
            label="Book a Class"
            color={gymColors.primary}
          />
        )}
        
        {gym.links.website && (
          <SocialLink
            href={gym.links.website}
            icon={Globe}
            label="Visit Website"
            color={gymColors.primary}
          />
        )}
        
        {gym.links.facebook && (
          <SocialLink
            href={gym.links.facebook}
            icon={Facebook}
            label="Follow on Facebook"
            color={gymColors.secondary}
          />
        )}
        
        {gym.links.instagram && (
          <SocialLink
            href={gym.links.instagram}
            icon={Instagram}
            label="Follow on Instagram"
            color={gymColors.primary}
          />
        )}
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        © 2024 {gym.name}. All rights reserved.
      </footer>
    </div>
  );
}
