import { useState } from 'react';
import { modelConfigs, codeTemplates } from '../../data/models';
import ModelSelector from './ModelSelector';
import DataModalitySelector from './DataModalitySelector';
import SettingsPanel from './SettingsPanel';
import CodeOutput from './CodeOutput';

export default function GeneratorSection() {
  const [selectedProvider, setSelectedProvider] = useState('gpt-4');
  const [dataModality, setDataModality] = useState('text');
  const [imageSource, setImageSource] = useState('url');
  const [config, setConfig] = useState({
    model: 'gpt-4.1-2025-04-14',
    temperature: 1,
    maxTokens: 50,
    repetitions: 25,
    // GPT-5 specific defaults
    reasoningEffort: 'low',
    maxCompletionTokens: 5000,
    prompt: `Rate the following item on [CONSTRUCT NAME] on a scale from 1 to 7, where:
- 1 = [LOWEST ANCHOR]
- 7 = [HIGHEST ANCHOR]

Item: {item}

Instructions:
- Provide only a numeric rating
- Do not include explanation
- Format: Just the number (e.g., 5)

Rating:`
  });

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    const newConfig = modelConfigs[provider];
    const settings = newConfig.settings;

    // Build new config based on provider's available settings
    const updatedConfig = {
      ...config,
      model: newConfig.models[0].value,
      repetitions: settings.repetitions.default,
    };

    // Add settings specific to non-reasoning models (GPT-4.1, Llama)
    if (settings.temperature) {
      updatedConfig.temperature = settings.temperature.default;
    }
    if (settings.maxTokens) {
      updatedConfig.maxTokens = settings.maxTokens.default;
    }

    // Add settings specific to reasoning models (GPT-5)
    if (settings.reasoningEffort) {
      updatedConfig.reasoningEffort = settings.reasoningEffort.default;
    }
    if (settings.maxCompletionTokens) {
      updatedConfig.maxCompletionTokens = settings.maxCompletionTokens.default;
    }

    setConfig(updatedConfig);
  };

  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const generatedCode = codeTemplates[selectedProvider]({
    ...config,
    dataModality,
    imageSource
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Code Generator
        </h2>
        <p className="text-slate-600 mt-2">
          Generate customized Python code for your SCC.
          Configure your prompt and settings, then copy or download the generated code.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This code provides a starting point and may need adjustments for your specific setup
            (file paths, column names, data format, etc.). If you encounter issues, try pasting the code into an LLM
            like ChatGPT or Claude along with your error message—it can help you debug and adapt the code to your needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Input Form */}
        <div className="space-y-6">
          <ModelSelector
            selectedProvider={selectedProvider}
            onProviderChange={handleProviderChange}
            config={config}
            onConfigChange={handleConfigChange}
          />

          <DataModalitySelector
            dataModality={dataModality}
            onModalityChange={setDataModality}
            imageSource={imageSource}
            onImageSourceChange={setImageSource}
          />

          <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
            <label className="block mb-2 font-semibold text-slate-900">
              Your Prompt Template
            </label>
            <p className="text-sm text-slate-600 mb-4">
              Use <code className="bg-slate-100 px-1 rounded">{'{item}'}</code> as a placeholder for the item to be rated.
            </p>
            <textarea
              value={config.prompt}
              onChange={(e) => handleConfigChange('prompt', e.target.value)}
              className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your prompt template..."
            />
          </div>

          <SettingsPanel
            provider={selectedProvider}
            config={config}
            onConfigChange={handleConfigChange}
          />
        </div>

        {/* Right Panel - Code Output */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CodeOutput code={generatedCode} />
        </div>
      </div>

      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-semibold text-amber-900 mb-2">Important Notes</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Replace placeholder text in the prompt with your actual construct definition</li>
          <li>• Test your prompt on a small sample before running at scale</li>
          <li>• Keep your API key private—never share code containing your real key</li>
          <li>• Validate outputs to ensure they match your expected format</li>
          <li>• Always run validation (Stage 5) before deployment</li>
        </ul>
      </div>
    </div>
  );
}
