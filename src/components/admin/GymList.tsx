
import { Shield } from "lucide-react";
import { GymLocation } from "@/config/gyms";

interface GymListProps {
  gyms: GymLocation[];
  selectedGymId: string | null;
  onSelectGym: (gymId: string) => void;
}

const GymList = ({ gyms, selectedGymId, onSelectGym }: GymListProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-purple-600" />
        <h2 className="font-semibold">Select Gym</h2>
      </div>
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
    </div>
  );
};

export default GymList;
