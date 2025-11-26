export default function FinetuningSection({ data, updateField }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 italic">
        This section is optional. Fill it out only if you plan to fine-tune a model.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Training hyperparameters
        </label>
        <textarea
          value={data.hyperparameters}
          onChange={(e) => updateField('hyperparameters', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          rows={3}
          placeholder="Enter training hyperparameters if applicable..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Uploaded training dataset
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="finetuneDataset"
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
              name="finetuneDataset"
              value="no"
              checked={data.uploadedDataset === 'no'}
              onChange={(e) => updateField('uploadedDataset', e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-700">No</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-slate-200"></div>
        <span className="text-sm text-slate-400 font-medium">OR</span>
        <div className="flex-1 border-t border-slate-200"></div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Link to the finetuned model
        </label>
        <input
          type="text"
          value={data.finetunedModelLink}
          onChange={(e) => updateField('finetunedModelLink', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
