
import { Shield, AlertCircle } from "lucide-react";
import { GymLocation } from "@/config/gyms";
import { Button } from "@/components/ui/button";

interface GymListProps {
  gyms: GymLocation[];
  selectedGymId: string | null;
  onSelectGym: (gymId: string) => void;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

const GymList = ({ 
  gyms, 
  selectedGymId, 
  onSelectGym, 
  isLoading, 
  error, 
  onRetry 
}: GymListProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-purple-600" />
        <h2 className="font-semibold">Select Gym</h2>
      </div>
      
      {error ? (
        <div className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex gap-2 items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 text-sm">Error loading gyms</h3>
                <p className="text-xs text-red-700 mt-1">{error.message}</p>
                <p className="text-xs text-red-600 mt-2">
                  Make sure your Supabase database has a "gyms" table configured correctly.
                </p>
              </div>
            </div>
          </div>
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="w-full"
          >
            Retry
          </Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="w-full h-10 animate-pulse bg-gray-100 rounded-md"
            />
          ))}
        </div>
      ) : gyms.length > 0 ? (
        <div className="space-y-2">
          {gyms.map((gym) => (
            <button
              key={gym.id}
              onClick={() => onSelectGym(gym.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition ${
                selectedGymId === gym.id
                  ? "bg-purple-100 text-purple-800"
                  : "hover:bg-gray-100"
              }`}
            >
              {gym.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            No gyms found in the database. Add gyms to your Supabase "gyms" table to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default GymList;
