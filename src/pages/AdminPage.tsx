
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { gymColors } from "@/config/colors";
import { useToast } from "@/hooks/use-toast";
import { useGyms, useUpdateGym } from "@/hooks/useGyms";
import { GymLocation } from "@/config/gyms";
import { Skeleton } from "@/components/ui/skeleton";
import GymList from "@/components/admin/GymList";
import GymEditor from "@/components/admin/GymEditor";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const AdminPage = () => {
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [editedGym, setEditedGym] = useState<GymLocation | null>(null);
  const [editedColors, setEditedColors] = useState<{primary: string, secondary: string} | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch gyms from Supabase
  const { 
    data: gyms, 
    isLoading, 
    error: loadError,
    refetch 
  } = useGyms();
  
  // Use the Supabase update mutation
  const { mutate: updateGym, isPending: isSaving } = useUpdateGym();

  const handleGymSelect = (gymId: string) => {
    const gym = gyms?.find(g => g.id === gymId);
    if (gym) {
      setSelectedGymId(gymId);
      setEditedGym({...gym});
      setEditedColors({...gymColors[gymId]});
      // Clear previous save errors when selecting a new gym
      setSaveError(null);
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
      // Clear previous save errors
      setSaveError(null);
      
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
            setSaveError(error);
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

  const handleRetry = () => {
    refetch();
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
          <h1 className="text-2xl font-bold">Gym Admin Panel</h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
        </div>

        {loadError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h2 className="font-medium text-red-800">Database Error</h2>
                <p className="text-sm text-red-700 mt-1">{loadError.message}</p>
                
                <div className="mt-4 bg-white p-3 rounded border border-red-100">
                  <h3 className="text-sm font-medium">Troubleshooting Steps:</h3>
                  <ol className="text-sm mt-2 space-y-1 list-decimal pl-5">
                    <li>Ensure you've created a "gyms" table in your Supabase project</li>
                    <li>Check that the table has the correct columns matching the GymLocation type</li>
                    <li>Verify that your database permissions allow read/write access</li>
                    <li>Confirm your Supabase connection details are correct</li>
                  </ol>
                </div>
                
                <Button 
                  onClick={handleRetry} 
                  className="mt-4"
                  variant="outline"
                >
                  Retry Connection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Gym List */}
          <GymList 
            gyms={gyms || []} 
            selectedGymId={selectedGymId} 
            onSelectGym={handleGymSelect}
            isLoading={isLoading}
            error={loadError}
            onRetry={handleRetry}
          />

          {/* Edit Form */}
          {editedGym && editedColors ? (
            <GymEditor
              gym={editedGym}
              colors={editedColors}
              onGymChange={handleGymChange}
              onLinkChange={handleLinkChange}
              onColorChange={handleColorChange}
              onSave={handleSave}
              onPreview={handlePreview}
              isSaving={isSaving}
              saveError={saveError}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow md:col-span-3 flex items-center justify-center">
              <p className="text-gray-500">
                {loadError ? "Fix the database connection to edit gyms" : "Select a gym to edit"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
