
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Save, ArrowLeft } from "lucide-react";
import { gyms, GymLocation } from "@/config/gyms";
import { gymColors } from "@/config/colors";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [editedGym, setEditedGym] = useState<GymLocation | null>(null);
  const [editedColors, setEditedColors] = useState<{primary: string, secondary: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGymSelect = (gymId: string) => {
    const gym = gyms.find(g => g.id === gymId);
    if (gym) {
      setSelectedGymId(gymId);
      setEditedGym({...gym});
      setEditedColors({...gymColors[gymId]});
    }
  };

  const handleGymChange = (field: keyof GymLocation, value: any) => {
    if (editedGym) {
      setEditedGym({...editedGym, [field]: value});
    }
  };

  const handleLinkChange = (field: keyof GymLocation['links'], value: string) => {
    if (editedGym) {
      setEditedGym({
        ...editedGym,
        links: {...editedGym.links, [field]: value}
      });
    }
  };

  const handleColorChange = (type: 'primary' | 'secondary', value: string) => {
    if (editedColors) {
      setEditedColors({...editedColors, [type]: value});
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now we'll just show a toast
    toast({
      title: "Changes saved",
      description: `Updated information for ${editedGym?.name}`,
    });
  };

  const handlePreview = () => {
    if (selectedGymId) {
      navigate(`/gym/${selectedGymId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold">Gym Admin Panel</h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Gym List */}
          <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
            <h2 className="font-semibold mb-4">Select Gym</h2>
            <div className="space-y-2">
              {gyms.map((gym) => (
                <button
                  key={gym.id}
                  onClick={() => handleGymSelect(gym.id)}
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

          {/* Edit Form */}
          {editedGym && editedColors ? (
            <div className="bg-white p-6 rounded-lg shadow md:col-span-3">
              <h2 className="text-xl font-semibold mb-6">Edit {editedGym.name}</h2>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gym Name
                      </label>
                      <input
                        type="text"
                        value={editedGym.name}
                        onChange={(e) => handleGymChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editedGym.description}
                        onChange={(e) => handleGymChange("description", e.target.value)}
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
                        value={editedGym.logo}
                        onChange={(e) => handleGymChange("logo", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Links</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trial Link
                      </label>
                      <input
                        type="text"
                        value={editedGym.links.trial || ""}
                        onChange={(e) => handleLinkChange("trial", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Booking Link
                      </label>
                      <input
                        type="text"
                        value={editedGym.links.booking || ""}
                        onChange={(e) => handleLinkChange("booking", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        value={editedGym.links.website || ""}
                        onChange={(e) => handleLinkChange("website", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook
                      </label>
                      <input
                        type="text"
                        value={editedGym.links.facebook || ""}
                        onChange={(e) => handleLinkChange("facebook", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={editedGym.links.instagram || ""}
                        onChange={(e) => handleLinkChange("instagram", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Brand Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={editedColors.primary}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="h-10 w-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={editedColors.primary}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={editedColors.secondary}
                          onChange={(e) => handleColorChange("secondary", e.target.value)}
                          className="h-10 w-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={editedColors.secondary}
                          onChange={(e) => handleColorChange("secondary", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    onClick={handlePreview}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    Preview
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow md:col-span-3 flex items-center justify-center">
              <p className="text-gray-500">Select a gym to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
