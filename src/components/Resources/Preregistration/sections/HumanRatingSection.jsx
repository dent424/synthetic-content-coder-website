export default function HumanRatingSection({ data, updateField, toggleCheckbox }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Rated by
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.ratedBy.includes('trained')}
              onChange={() => toggleCheckbox('ratedBy', 'trained')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Trained researcher</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.ratedBy.includes('crowdsourced')}
              onChange={() => toggleCheckbox('ratedBy', 'crowdsourced')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Crowd-sourced workers (e.g., MTurk, Prolific)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.ratedBy.includes('other')}
              onChange={() => toggleCheckbox('ratedBy', 'other')}
              className="text-primary focus:ring-primary rounded"
            />
            <span className="text-sm text-slate-700">Other, please specify:</span>
          </label>
          {data.ratedBy.includes('other') && (
            <input
              type="text"
              value={data.ratedByOther}
              onChange={(e) => updateField('ratedByOther', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ml-6"
              placeholder="Please specify..."
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of human coders
          </label>
          <input
            type="text"
            value={data.numCoders}
            onChange={(e) => updateField('numCoders', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of stimuli per coder
          </label>
          <input
            type="text"
            value={data.stimuliPerCoder}
            onChange={(e) => updateField('stimuliPerCoder', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 150"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Instruction given to raters <span className="font-normal text-slate-500">(in exact wording)</span>
        </label>
        <textarea
          value={data.instructions}
          onChange={(e) => updateField('instructions', e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          rows={4}
          placeholder="Enter the exact instructions given to human raters..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Preprocessing
          </label>
          <input
            type="text"
            value={data.preprocessing}
            onChange={(e) => updateField('preprocessing', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., N/A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Exclusion criteria
          </label>
          <input
            type="text"
            value={data.exclusionCriteria}
            onChange={(e) => updateField('exclusionCriteria', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., N/A"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Aggregation (handling intercoder disagreement)
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="humanAggregation"
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
              name="humanAggregation"
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
              name="humanAggregation"
              value="na"
              checked={data.aggregation === 'na'}
              onChange={(e) => updateField('aggregation', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">N/A</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="humanAggregation"
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
    </div>
  );
}
