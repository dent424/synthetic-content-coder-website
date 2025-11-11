import { useState } from 'react';
import ScrollSyncedCodeViewer from './ScrollSyncedCodeViewer';
import { codeExamples } from '../../data/codeExamples';
import { Code2, Image, Smile, Utensils } from 'lucide-react';

const exampleTabs = [
  {
    id: 'expressiveness',
    label: 'Expressiveness',
    icon: Smile,
    data: codeExamples.expressiveness
  },
  {
    id: 'imageQuality',
    label: 'Image Quality',
    icon: Image,
    data: codeExamples.imageQuality
  },
  {
    id: 'palatability',
    label: 'Palatability',
    icon: Utensils,
    data: codeExamples.palatability
  },
];

export default function TutorialSection() {
  const [activeExample, setActiveExample] = useState('expressiveness');
  const currentExample = exampleTabs.find(tab => tab.id === activeExample)?.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Interactive Code Examples
        </h2>
        <p className="text-slate-600 mt-2">
          Explore production-ready Python code for LLM-based content coding.
          Scroll through the code and watch the description panel update with relevant explanations.
        </p>
      </div>

      {/* Example Tabs */}
      <div className="flex gap-3 mb-6">
        {exampleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeExample === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveExample(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                focus:outline-none focus:ring-2 focus:ring-primary/30
                ${isActive
                  ? 'bg-primary text-white shadow-lg active:bg-primary/90'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-primary/50 hover:text-primary active:bg-slate-50'
                }
              `}
            >
              <Icon size={18} />
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  {tab.data.model}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code Viewer */}
      {currentExample && (
        <ScrollSyncedCodeViewer example={currentExample} />
      )}

      {/* Usage Tips */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">How to Use These Examples</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Scroll through the code</strong> - The description panel automatically updates to explain the current section</li>
          <li>• <strong>Click the progress dots</strong> at the bottom of the description panel to jump to specific sections</li>
          <li>• <strong>Compare approaches</strong> - Switch tabs to see different models (GPT-4.1 vs Llama 4) and image handling methods (URLs vs base64)</li>
          <li>• <strong>Copy and adapt</strong> - All code is production-ready. Replace API keys and file paths for your own projects</li>
          <li>• <strong>Key settings</strong> - Note the consistent use of temperature=1 and 25 repetitions across all examples</li>
        </ul>
      </div>
    </div>
  );
}
