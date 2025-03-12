
import { useParams, Navigate } from "react-router-dom";
import { Calendar, Globe, Facebook, Instagram, Gift } from "lucide-react";
import SocialLink from "@/components/SocialLink";
import { gyms } from "@/config/gyms";
import { gymColors } from "@/config/colors";

const GymPage = () => {
  const { gymId } = useParams();
  const gym = gyms.find(g => g.id === gymId);

  if (!gym) {
    return <Navigate to="/" replace />;
  }

  // Get gym-specific colors or fallback to default
  const colors = gymColors[gym.id] || { primary: "#2DD4BF", secondary: "#8B5CF6" };

  return (
    <div className="min-h-screen w-full max-w-lg mx-auto px-6 py-12 flex flex-col items-center">
      <div className="logo-container">
        <img
          src={gym.logo}
          alt={gym.name}
          className="w-full h-auto"
        />
      </div>
      
      <p className="text-gray-600 mb-8 text-center text-lg">
        {gym.description}
      </p>

      <div className="w-full space-y-3">
        {gym.links.trial && (
          <SocialLink
            href={gym.links.trial}
            icon={Gift}
            label="Book a Free Trial"
            color={colors.secondary}
          />
        )}
        
        {gym.links.booking && (
          <SocialLink
            href={gym.links.booking}
            icon={Calendar}
            label="Book a Class"
            color={colors.primary}
          />
        )}
        
        {gym.links.website && (
          <SocialLink
            href={gym.links.website}
            icon={Globe}
            label="Visit Website"
            color={colors.primary}
          />
        )}
        
        {gym.links.facebook && (
          <SocialLink
            href={gym.links.facebook}
            icon={Facebook}
            label="Follow on Facebook"
            color={colors.secondary}
          />
        )}
        
        {gym.links.instagram && (
          <SocialLink
            href={gym.links.instagram}
            icon={Instagram}
            label="Follow on Instagram"
            color={colors.primary}
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
