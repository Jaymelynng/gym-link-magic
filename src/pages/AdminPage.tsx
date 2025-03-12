
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGyms, useUpdateGym } from "@/hooks/useGyms";
import { useGymColor, useUpdateGymColor } from "@/hooks/useGymColors";
import { GymLocation } from "@/config/gyms";
import { Skeleton } from "@/components/ui/skeleton";
import GymList from "@/components/admin/GymList";
import GymEditor from "@/components/admin/GymEditor";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminPage = () => {
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [editedGym, setEditedGym] = useState<GymLocation | null>(null);
  const [editedColors, setEditedColors] = useState<{primary: string, secondary: string} | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch gyms from Supabase
  const { 
    data: gyms, 
    isLoading: isLoadingGyms, 
    error: loadError,
    refetch 
  } = useGyms();
  
  // Fetch colors for the selected gym
  const {
    data: gymColors,
    isLoading: isLoadingColors,
    error: colorError
  } = useGymColor(selectedGymId || undefined);
  
  // Use the Supabase update mutations
  const { mutate: updateGym, isPending: isSavingGym } = useUpdateGym();
  const { mutate: updateGymColor, isPending: isSavingColor } = useUpdateGymColor();

  const handleGymSelect = (gymId: string) => {
    const gym = gyms?.find(g => g.id === gymId);
    if (gym) {
      setSelectedGymId(gymId);
      setEditedGym({...gym});
      
      // If we have colors for this gym, use them, otherwise use defaults
      if (gymColors) {
        setEditedColors({...gymColors});
      } else {
        setEditedColors({ primary: "#2DD4BF", secondary: "#8B5CF6" });
      }
      
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
    if (selectedGymId && editedGym && editedColors) {
      // Clear previous save errors
      setSaveError(null);
      
      // Use the Supabase update mutations
      updateGym(
        { 
          id: selectedGymId, 
          updates: editedGym 
        },
        {
          onSuccess: () => {
            // After gym is updated, update the colors
            updateGymColor(
              { 
                gymId: selectedGymId, 
                colors: editedColors 
              },
              {
                onSuccess: () => {
                  toast({
                    title: "Changes saved",
                    description: `Updated information and colors for ${editedGym.name}`,
                  });
                },
                onError: (error) => {
                  setSaveError(error);
                  toast({
                    title: "Error saving colors",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              }
            );
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

  // Combined loading state
  const isLoading = isLoadingGyms || (selectedGymId && isLoadingColors);
  
  // Combined saving state
  const isSaving = isSavingGym || isSavingColor;

  if (loadError) {
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

          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Database Error</AlertTitle>
            <AlertDescription>
              {loadError.message}
              
              <div className="mt-4 bg-white p-3 rounded border border-red-100">
                <h3 className="text-sm font-medium">Troubleshooting Steps:</h3>
                <ol className="text-sm mt-2 space-y-1 list-decimal pl-5">
                  <li>Ensure you've created the "gyms" and "gym_colors" tables in your Supabase project</li>
                  <li>Check that the tables have the correct columns matching the expected types</li>
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
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
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

        {colorError && (
          <Alert variant="warning" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              There was an issue loading color data. Default colors will be used.
              {colorError.message}
            </AlertDescription>
          </Alert>
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
