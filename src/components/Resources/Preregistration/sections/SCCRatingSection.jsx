export default function SCCRatingSection({ data, updateField }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Aggregation of multiple responses
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sccAggregation"
              value="mean"
              checked={data.aggregation === 'mean'}
              onChange={(e) => updateField('aggregation', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Mean</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sccAggregation"
              value="median"
              checked={data.aggregation === 'median'}
              onChange={(e) => updateField('aggregation', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Median</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sccAggregation"
              value="majority"
              checked={data.aggregation === 'majority'}
              onChange={(e) => updateField('aggregation', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Majority vote</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sccAggregation"
              value="other"
              checked={data.aggregation === 'other'}
              onChange={(e) => updateField('aggregation', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Other, please specify:</span>
          </label>
          {data.aggregation === 'other' && (
            <input
              type="text"
              value={data.aggregationOther}
              onChange={(e) => updateField('aggregationOther', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ml-6"
              placeholder="Please specify..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Error handling
        </label>
        <textarea
          value={data.errorHandling}
          onChange={(e) => updateField('errorHandling', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          rows={2}
          placeholder="e.g., Coded numbers not in the 1-7 scale return an error"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Batching strategy
        </label>
        <input
          type="text"
          value={data.batchingStrategy}
          onChange={(e) => updateField('batchingStrategy', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., N/A"
        />
      </div>
    </div>
  );
}
