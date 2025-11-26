import { useState } from 'react';
import ScrollSyncedCodeViewer from './ScrollSyncedCodeViewer';
import { codeExamples } from '../../data/codeExamples';
import { Code2, Image, Smile, Utensils, Sparkles, MessageSquare } from 'lucide-react';

const exampleTabs = [
  {
    id: 'basic',
    label: 'Basic',
    icon: Sparkles,
    data: codeExamples.basic
  },
  {
    id: 'sentiment',
    label: 'Sentiment',
    icon: MessageSquare,
    data: codeExamples.sentiment
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
          Use this interactive Python code viewer to understand how to program an SCC.
          Scroll through the code and watch the description panel update with explanations of the code.
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
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
              style={isActive
                ? {
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    fontWeight: '700'
                  }
                : {
                    backgroundColor: 'white',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                    fontWeight: '500'
                  }
              }
            >
              <Icon size={18} />
              <div className="text-left">
                <div style={{ fontWeight: isActive ? '700' : '600' }}>{tab.label}</div>
                <div style={{ fontSize: '0.75rem', color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b' }}>
                  {tab.data.contentType} • {tab.data.model}
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
