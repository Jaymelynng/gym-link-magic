
interface ColorsFormProps {
  colors: { primary: string; secondary: string };
  onChange: (type: 'primary' | 'secondary', value: string) => void;
}

const ColorsForm = ({ colors, onChange }: ColorsFormProps) => {
  return (
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
              value={colors.primary}
              onChange={(e) => onChange("primary", e.target.value)}
              className="h-10 w-10 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={colors.primary}
              onChange={(e) => onChange("primary", e.target.value)}
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
              value={colors.secondary}
              onChange={(e) => onChange("secondary", e.target.value)}
              className="h-10 w-10 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={colors.secondary}
              onChange={(e) => onChange("secondary", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsForm;
