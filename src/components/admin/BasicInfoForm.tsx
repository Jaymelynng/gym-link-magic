
import { GymLocation } from "@/config/gyms";

interface BasicInfoFormProps {
  gym: GymLocation;
  onChange: (field: keyof GymLocation, value: any) => void;
}

const BasicInfoForm = ({ gym, onChange }: BasicInfoFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Basic Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gym Name
          </label>
          <input
            type="text"
            value={gym.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={gym.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL
          </label>
          <input
            type="text"
            value={gym.logo}
            onChange={(e) => onChange("logo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
