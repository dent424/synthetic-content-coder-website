import { Plus, Trash2 } from 'lucide-react';

export default function ModelSpecSection({
  data,
  updateField,
  addPromptVariant,
  updatePromptVariant,
  removePromptVariant
}) {
  return (
    <div className="space-y-4">
      {/* Model Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Model provider
          </label>
          <input
            type="text"
            value={data.provider}
            onChange={(e) => updateField('provider', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., OpenAI, Anthropic, Meta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            LLM name and version
          </label>
          <input
            type="text"
            value={data.llmVersion}
            onChange={(e) => updateField('llmVersion', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., gpt-4.1-2025-04-14"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Temperature
          </label>
          <input
            type="text"
            value={data.temperature}
            onChange={(e) => updateField('temperature', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Repetitions per Item
          </label>
          <input
            type="text"
            value={data.repetitions}
            onChange={(e) => updateField('repetitions', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Max Tokens
          </label>
          <input
            type="text"
            value={data.maxTokens}
            onChange={(e) => updateField('maxTokens', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 15"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Other configuration
        </label>
        <input
          type="text"
          value={data.other}
          onChange={(e) => updateField('other', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Any additional model configuration (or N/A)"
        />
      </div>

      <p className="text-xs text-slate-500 italic">
        (Instruction on model configuration available at "Code Generator" page of the website)
      </p>

      {/* Primary Prompt */}
      <div className="pt-4 border-t border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Primary prompt <span className="font-normal text-slate-500">(in exact wording)</span>
        </label>
        <textarea
          value={data.primaryPrompt}
          onChange={(e) => updateField('primaryPrompt', e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
          rows={8}
          placeholder="Enter your complete prompt here..."
        />
      </div>

      {/* Prompt Variants */}
      <div className="space-y-3">
        {data.promptVariants.map((variant, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                Prompt variant {index + 1} <span className="font-normal text-slate-500">(optional)</span>
              </label>
              {data.promptVariants.length > 1 && (
                <button
                  onClick={() => removePromptVariant(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove variant"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <textarea
              value={variant}
              onChange={(e) => updatePromptVariant(index, e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
              rows={6}
              placeholder="Enter an alternative prompt variant..."
            />
          </div>
        ))}

        <button
          onClick={addPromptVariant}
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
        >
          <Plus size={16} />
          Add another prompt variant
        </button>
      </div>
    </div>
  );
}
