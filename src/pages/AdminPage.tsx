
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { gymColors } from "@/config/colors";
import { useToast } from "@/hooks/use-toast";
import { useGyms, useUpdateGym } from "@/hooks/useGyms";
import { GymLocation } from "@/config/gyms";
import { Skeleton } from "@/components/ui/skeleton";
import GymList from "@/components/admin/GymList";
import GymEditor from "@/components/admin/GymEditor";

const AdminPage = () => {
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [editedGym, setEditedGym] = useState<GymLocation | null>(null);
  const [editedColors, setEditedColors] = useState<{primary: string, secondary: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch gyms from Supabase
  const { data: gyms, isLoading, error } = useGyms();
  
  // Use the Supabase update mutation
  const { mutate: updateGym, isPending: isSaving } = useUpdateGym();

  const handleGymSelect = (gymId: string) => {
    const gym = gyms?.find(g => g.id === gymId);
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
    if (selectedGymId && editedGym) {
      // Use the Supabase update mutation
      updateGym(
        { 
          id: selectedGymId, 
          updates: editedGym 
        },
        {
          onSuccess: () => {
            toast({
              title: "Changes saved",
              description: `Updated information for ${editedGym.name}`,
            });
          },
          onError: (error) => {
            toast({
              title: "Error saving changes",
              description: error.message,
              variant: "destructive",
            });
          }
        }
      );
    }
  };

  const handlePreview = () => {
    if (selectedGymId) {
      navigate(`/gym/${selectedGymId}`);
    }
  };

  if (error) {
    toast({
      title: "Error loading gyms",
      description: "Failed to load gym data. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gym Admin Panel</h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Gym List */}
          {isLoading ? (
            <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
            </div>
          ) : gyms && gyms.length > 0 ? (
            <GymList 
              gyms={gyms} 
              selectedGymId={selectedGymId} 
              onSelectGym={handleGymSelect} 
            />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
              <p className="text-gray-500">No gyms found</p>
            </div>
          )}

          {/* Edit Form */}
          {isLoading ? (
            <div className="bg-white p-6 rounded-lg shadow md:col-span-3">
              <Skeleton className="h-8 w-1/3 mb-6" />
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-6 w-1/4 mb-3" />
                    <div className="space-y-4">
                      {[...Array(3)].map((_, idx) => (
                        <Skeleton key={idx} className="h-10 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : editedGym && editedColors ? (
            <GymEditor
              gym={editedGym}
              colors={editedColors}
              onGymChange={handleGymChange}
              onLinkChange={handleLinkChange}
              onColorChange={handleColorChange}
              onSave={handleSave}
              onPreview={handlePreview}
              isSaving={isSaving}
            />
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
