
import { Save } from "lucide-react";
import { GymLocation } from "@/config/gyms";
import BasicInfoForm from "./BasicInfoForm";
import LinksForm from "./LinksForm";
import ColorsForm from "./ColorsForm";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface GymEditorProps {
  gym: GymLocation;
  colors: { primary: string; secondary: string };
  onGymChange: (field: keyof GymLocation, value: any) => void;
  onLinkChange: (field: keyof GymLocation['links'], value: string) => void;
  onColorChange: (type: 'primary' | 'secondary', value: string) => void;
  onSave: () => void;
  onPreview: () => void;
  isSaving: boolean;
  saveError: Error | null;
}

const GymEditor = ({
  gym,
  colors,
  onGymChange,
  onLinkChange,
  onColorChange,
  onSave,
  onPreview,
  isSaving,
  saveError
}: GymEditorProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow md:col-span-3">
      <h2 className="text-xl font-semibold mb-6">Edit {gym.name}</h2>
      
      {saveError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error saving changes</AlertTitle>
          <AlertDescription>
            {saveError.message}
            <p className="text-xs mt-1">
              Check your database connection and permissions.
            </p>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6">
        <BasicInfoForm gym={gym} onChange={onGymChange} />
        <LinksForm links={gym.links} onChange={onLinkChange} />
        <ColorsForm colors={colors} onChange={onColorChange} />

        {/* Actions */}
        <div className="pt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GymEditor;
