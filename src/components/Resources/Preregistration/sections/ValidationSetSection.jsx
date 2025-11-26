export default function ValidationSetSection({ data, updateField }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Number of stimuli
        </label>
        <input
          type="text"
          value={data.numStimuli}
          onChange={(e) => updateField('numStimuli', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., 150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Validation set obtained by
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="obtainedBy"
              value="random"
              checked={data.obtainedBy === 'random'}
              onChange={(e) => updateField('obtainedBy', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Random partition</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="obtainedBy"
              value="other"
              checked={data.obtainedBy === 'other'}
              onChange={(e) => updateField('obtainedBy', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Other, please specify below</span>
          </label>
          {data.obtainedBy === 'other' && (
            <textarea
              value={data.obtainedByOther}
              onChange={(e) => updateField('obtainedByOther', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary mt-2"
              rows={2}
              placeholder="Please specify how the validation set was obtained..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Any data excluded
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="dataExcluded"
              value="no"
              checked={data.dataExcluded === 'no'}
              onChange={(e) => updateField('dataExcluded', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">No</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="dataExcluded"
              value="yes"
              checked={data.dataExcluded === 'yes'}
              onChange={(e) => updateField('dataExcluded', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Yes, please specify below</span>
          </label>
          {data.dataExcluded === 'yes' && (
            <textarea
              value={data.dataExcludedReason}
              onChange={(e) => updateField('dataExcludedReason', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary mt-2"
              rows={3}
              placeholder="Please specify reasons for data exclusion..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Uploaded validation dataset coded by SCC
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="uploadedDataset"
              value="yes"
              checked={data.uploadedDataset === 'yes'}
              onChange={(e) => updateField('uploadedDataset', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">Yes, repository link:</span>
          </label>
          {data.uploadedDataset === 'yes' && (
            <input
              type="text"
              value={data.repositoryLink}
              onChange={(e) => updateField('repositoryLink', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ml-6"
              placeholder="https://..."
            />
          )}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="uploadedDataset"
              value="no"
              checked={data.uploadedDataset === 'no'}
              onChange={(e) => updateField('uploadedDataset', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">No</span>
          </label>
        </div>
      </div>
    </div>
  );
}
