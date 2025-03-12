
import { Link } from "react-router-dom";
import { useGyms } from "@/hooks/useGyms";
import { useGymColors } from "@/hooks/useGymColors";
import { GymLocation } from "@/config/gyms";
import { Skeleton } from "@/components/ui/skeleton";
import ChatbotButton from "@/components/ChatbotButton";
import { toast } from "sonner";

const HomePage = () => {
  const { data: gyms, isLoading: isLoadingGyms, error: gymsError } = useGyms();
  const { data: colors, isLoading: isLoadingColors, error: colorsError } = useGymColors();

  const isLoading = isLoadingGyms || isLoadingColors;

  if (gymsError) {
    toast.error("Failed to load gyms", {
      description: "Please try again later or contact support.",
      position: "bottom-right",
    });
  }

  if (colorsError) {
    toast.error("Failed to load color themes", {
      description: "Default colors will be used instead.",
      position: "bottom-right",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 animate-fade-in">
          Our Gymnastics Locations
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <Skeleton className="w-full h-40 mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ))}
          </div>
        ) : gymsError ? (
          <div className="text-center text-red-500 p-6 bg-red-50 rounded-lg">
            Failed to load gyms. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gyms?.map((gym: GymLocation) => {
              // Use colors from database or fallback to defaults
              const gymColors = (colors && colors[gym.id]) || { primary: '#2DD4BF', secondary: '#8B5CF6' };
              
              return (
                <Link
                  key={gym.id}
                  to={`/gym/${gym.id}`}
                  className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg 
                          transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ 
                    borderLeft: `4px solid ${gymColors?.primary || '#2DD4BF'}`,
                    borderBottom: `4px solid ${gymColors?.secondary || '#8B5CF6'}`
                  }}
                >
                  <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={gym.logo}
                      alt={gym.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary">
                    {gym.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {gym.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      
      <ChatbotButton />
    </div>
  );
};

export default HomePage;
