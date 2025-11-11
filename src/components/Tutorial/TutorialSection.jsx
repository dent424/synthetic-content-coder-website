import { useState } from 'react';
import StageCard from './StageCard';
import { tutorialStages } from '../../data/stages';

export default function TutorialSection() {
  const [expandedStage, setExpandedStage] = useState(1);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Interactive Code Tutorial
        </h2>
        <p className="text-slate-600 mt-2">
          Follow the 6-stage implementation process for Synthetic Psychometric Coders (SPCs).
          Hover over numbered annotations in the code to see detailed explanations.
        </p>
      </div>

      <div className="space-y-4">
        {tutorialStages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isExpanded={expandedStage === stage.id}
            onToggle={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
          />
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Implementation Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Start with Stage 1-3 to test your prompt on a small sample</li>
          <li>• Use Stage 4 settings (25 repetitions, temp=1) for all final coding</li>
          <li>• Always validate with Stage 5 before deploying at scale (Stage 6)</li>
          <li>• Save all raw ratings, not just means, for transparency</li>
        </ul>
      </div>
    </div>
  );
}
