import { useState } from 'react';
import ScrollSyncedCodeViewer from './ScrollSyncedCodeViewer';
import { codeExamples } from '../../data/codeExamples';
import { Code2, Image, Smile, Utensils, Sparkles } from 'lucide-react';

const exampleTabs = [
  {
    id: 'basic',
    label: 'Basic',
    icon: Sparkles,
    data: codeExamples.basic
  },
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
  const [activeExample, setActiveExample] = useState('basic');
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
                flex items-center gap-2 px-6 py-3 rounded-lg transition-all
                focus:outline-none focus:ring-2 focus:ring-slate-400
                ${isActive
                  ? 'bg-slate-300 text-slate-700 shadow-lg font-bold active:bg-slate-400'
                  : 'bg-white border border-slate-200 text-slate-700 font-medium hover:border-slate-300 hover:bg-slate-50 active:bg-slate-200 active:font-bold'
                }
              `}
            >
              <Icon size={18} />
              <div className="text-left">
                <div className={isActive ? 'font-bold' : 'font-semibold'}>{tab.label}</div>
                <div className={`text-xs ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
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
          <li>• <strong>Start with Basic</strong> - The Basic tab shows the simplest possible implementation with minimal code</li>
          <li>• <strong>Scroll through the code</strong> - The description panel automatically updates to explain the current section</li>
          <li>• <strong>Click line numbers</strong> in the description panel to jump to specific lines of code</li>
          <li>• <strong>Compare approaches</strong> - Switch tabs to see different models (GPT-4.1 vs Llama 4) and techniques (URLs vs base64, single vs batched calls)</li>
        </ul>
      </div>
    </div>
  );
}
