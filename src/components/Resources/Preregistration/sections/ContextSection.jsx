export default function ContextSection({ data, updateField }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Construct to be coded
        </label>
        <input
          type="text"
          value={data.construct}
          onChange={(e) => updateField('construct', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., Facial emotional expressiveness"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Data modality
        </label>
        <select
          value={data.dataModality}
          onChange={(e) => updateField('dataModality', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
        </select>
      </div>
    </div>
  );
}
