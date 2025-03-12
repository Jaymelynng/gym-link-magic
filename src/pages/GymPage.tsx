
import { useParams, Navigate } from "react-router-dom";
import { Calendar, Globe, Facebook, Instagram, Gift } from "lucide-react";
import SocialLink from "@/components/SocialLink";
import { useGym } from "@/hooks/useGyms";
import { useGymColor } from "@/hooks/useGymColors";
import { Skeleton } from "@/components/ui/skeleton";

const GymPage = () => {
  const { gymId } = useParams();
  const { data: gym, isLoading: isLoadingGym, error: gymError } = useGym(gymId);
  const { data: colors, isLoading: isLoadingColors } = useGymColor(gymId);

  const isLoading = isLoadingGym || isLoadingColors;

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

  if (gymError || !gym) {
    return <Navigate to="/" replace />;
  }

  // Use colors from the database, or fall back to defaults if not found
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
};

export default GymPage;
