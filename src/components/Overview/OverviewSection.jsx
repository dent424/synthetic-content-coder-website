import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Define Construct & Collect Content',
    description: 'Clearly define the construct you want to measure and collect the content that needs to be coded.'
  },
  {
    number: 2,
    title: 'Separate Development & Validation Data',
    description: 'Split your dataset into separate development and validation sets to ensure proper evaluation.'
  },
  {
    number: 3,
    title: 'Collect Human Criterion Data (Development)',
    description: 'Gather human ratings on the development data to establish the criterion standard.'
  },
  {
    number: 4,
    title: 'Create API Program',
    description: 'Build a program that queries the LLM via API with your specified prompts and parameters.'
  },
  {
    number: 5,
    title: 'Implement Response Handling',
    description: 'Set up procedures to handle unexpected or malformed responses from the LLM.'
  },
  {
    number: 6,
    title: 'Collect SCC Ratings & Preregister',
    description: 'Collect Synthetic Content Coder ratings on validation data and preregister key information about your study.'
  },
  {
    number: 7,
    title: 'Collect Human Criterion Data (Validation)',
    description: 'Gather human ratings on the validation set for comparison with SCC ratings.'
  },
  {
    number: 8,
    title: 'Compare SCC & Human Ratings',
    description: 'Evaluate the SCC performance by comparing ratings with human criterion data using appropriate metrics.'
  },
  {
    number: 9,
    title: 'Deploy or Iterate',
    description: 'Apply the validated SCC to your full dataset, or iterate on earlier steps if validation is insufficient.'
  }
];

export default function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">
          Developing Synthetic Content Coders
        </h2>
        <p className="text-lg leading-relaxed">
          For unfinetuned SCCs, development involves a systematic 9-step process
          to ensure reliability and validity. Follow these steps to create, validate,
          and deploy LLM-based content coding systems for your research.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">
          Implementation Steps
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-lg shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-accent/50"
            >
              <div className="flex items-start gap-4">
                {/* Step Number Badge */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Check Icon */}
                <div className="flex-shrink-0 text-slate-300">
                  <CheckCircle2 size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 mt-8">
        <h3 className="font-bold text-slate-900 mb-3 text-lg">Ready to Get Started?</h3>
        <div className="space-y-2 text-slate-700">
          <p>
            <strong>Tutorial:</strong> See step-by-step code examples for different content types
          </p>
          <p>
            <strong>Code Generator:</strong> Generate customized Python code for GPT-4 or Claude
          </p>
          <p>
            <strong>Resources:</strong> Access validation tools, templates, and best practices
          </p>
        </div>
      </div>
    </div>
  );
}
