import { modelConfigs } from '../../data/models';

export default function SettingsPanel({ provider, config, onConfigChange }) {
  const settings = modelConfigs[provider].settings;

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Settings</h3>

      <div className="space-y-6">
        {/* Temperature */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Temperature
            </label>
            <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
              {config.temperature}
            </span>
          </div>
          <input
            type="range"
            min={settings.temperature.min}
            max={settings.temperature.max}
            step={settings.temperature.step}
            value={config.temperature}
            onChange={(e) => onConfigChange('temperature', parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 mt-2">
            {settings.temperature.description}
          </p>
        </div>

        {/* Repetitions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Repetitions per Item
            </label>
            <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
              {config.repetitions}
            </span>
          </div>
          <input
            type="range"
            min={settings.repetitions.min}
            max={settings.repetitions.max}
            step={settings.repetitions.step}
            value={config.repetitions}
            onChange={(e) => onConfigChange('repetitions', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 mt-2">
            {settings.repetitions.description}
          </p>
        </div>

        {/* Max Tokens */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Max Tokens
            </label>
            <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
              {config.maxTokens}
            </span>
          </div>
          <input
            type="range"
            min={settings.maxTokens.min}
            max={settings.maxTokens.max}
            step={settings.maxTokens.step}
            value={config.maxTokens}
            onChange={(e) => onConfigChange('maxTokens', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 mt-2">
            {settings.maxTokens.description}
          </p>
        </div>
      </div>
    </div>
  );
}
