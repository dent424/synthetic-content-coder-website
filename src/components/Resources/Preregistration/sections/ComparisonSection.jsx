export default function ComparisonSection({ data, updateField, toggleCheckbox }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Comparison method
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.methods.includes('correlation')}
              onChange={() => toggleCheckbox('methods', 'correlation')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Correlation coefficients</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.methods.includes('rmse')}
              onChange={() => toggleCheckbox('methods', 'rmse')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Root Mean Square Error (RMSE)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.methods.includes('accuracy')}
              onChange={() => toggleCheckbox('methods', 'accuracy')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Accuracy/F1</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.methods.includes('other')}
              onChange={() => toggleCheckbox('methods', 'other')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Other, please specify:</span>
          </label>
          {data.methods.includes('other') && (
            <input
              type="text"
              value={data.methodOther}
              onChange={(e) => updateField('methodOther', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ml-6"
              placeholder="Please specify..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Minimum sufficient criterion for validity
        </label>
        <input
          type="text"
          value={data.criterion}
          onChange={(e) => updateField('criterion', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., r > 0.65"
        />
      </div>
    </div>
  );
}
