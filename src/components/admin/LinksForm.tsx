
import { GymLocation } from "@/config/gyms";

interface LinksFormProps {
  links: GymLocation['links'];
  onChange: (field: keyof GymLocation['links'], value: string) => void;
}

const LinksForm = ({ links, onChange }: LinksFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Links</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trial Link
          </label>
          <input
            type="text"
            value={links.trial || ""}
            onChange={(e) => onChange("trial", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking Link
          </label>
          <input
            type="text"
            value={links.booking || ""}
            onChange={(e) => onChange("booking", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            value={links.website || ""}
            onChange={(e) => onChange("website", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook
          </label>
          <input
            type="text"
            value={links.facebook || ""}
            onChange={(e) => onChange("facebook", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="text"
            value={links.instagram || ""}
            onChange={(e) => onChange("instagram", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default LinksForm;
