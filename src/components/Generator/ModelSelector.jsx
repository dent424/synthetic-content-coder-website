import { modelConfigs } from '../../data/models';

export default function ModelSelector({ selectedProvider, onProviderChange, config, onConfigChange }) {
  const providers = Object.keys(modelConfigs);

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Model Selection</h3>

      {/* Provider Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Provider
        </label>
        <div className="flex gap-3">
          {providers.map((provider) => (
            <button
              key={provider}
              onClick={() => onProviderChange(provider)}
              className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
              style={selectedProvider === provider
                ? {
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }
                : {
                    backgroundColor: '#f1f5f9',
                    color: '#334155'
                  }
              }
            >
              {modelConfigs[provider].label}
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Model
        </label>
        <select
          value={config.model}
          onChange={(e) => onConfigChange('model', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {modelConfigs[selectedProvider].models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-500 mt-2">
          Provider: {modelConfigs[selectedProvider].provider}
        </p>
      </div>
    </div>
  );
}
