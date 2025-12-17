import { modelConfigs } from '../../data/models';

export default function SettingsPanel({ provider, config, onConfigChange }) {
  const settings = modelConfigs[provider].settings;
  const isReasoningModel = modelConfigs[provider].isReasoningModel;

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Settings</h3>

      <div className="space-y-6">
        {/* Temperature (for non-reasoning models) */}
        {settings.temperature && (
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
        )}

        {/* Reasoning Effort (for GPT-5 reasoning models) */}
        {settings.reasoningEffort && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                Reasoning Effort
              </label>
              <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {config.reasoningEffort}
              </span>
            </div>
            <select
              value={config.reasoningEffort}
              onChange={(e) => onConfigChange('reasoningEffort', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {settings.reasoningEffort.options.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2">
              {settings.reasoningEffort.description}
            </p>
          </div>
        )}

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

        {/* Max Tokens (for non-reasoning models) */}
        {settings.maxTokens && (
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
        )}

        {/* Max Completion Tokens (for reasoning models) */}
        {settings.maxCompletionTokens && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                Max Completion Tokens
              </label>
              <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {config.maxCompletionTokens}
              </span>
            </div>
            <input
              type="range"
              min={settings.maxCompletionTokens.min}
              max={settings.maxCompletionTokens.max}
              step={settings.maxCompletionTokens.step}
              value={config.maxCompletionTokens}
              onChange={(e) => onConfigChange('maxCompletionTokens', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-500 mt-2">
              {settings.maxCompletionTokens.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
