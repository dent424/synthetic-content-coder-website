import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Define Construct & Collect Content',
    description: 'Clearly define the construct you want to measure and collect the content that needs to be coded.',
    details: `Understanding Your Measurement Goal

Before implementing an SCC, you need to clearly define what observer judgment you want to measure. SCCs are specifically designed for observer judgments - properties that human coders can reliably assess when viewing content.

Appropriate constructs for SCCs include:
• Visual properties (e.g., image quality, emotional expressiveness in faces)
• Content attributes (e.g., food palatability, advertisement style)
• Perceptual qualities (e.g., trustworthiness, professionalism)

SCCs are NOT appropriate for:
• Internal states of content producers
• Behavioral outcomes of content consumers
• Constructs requiring context beyond the content itself

The Criterion Test

A construct qualifies as an observer judgment if a blinded human coder, given only the content and a coding protocol, can produce reliable ratings. If humans can't consistently code it, neither can an SCC.

Content Collection Considerations

Data Requirements:
• Your content should represent the full scope of what you'll eventually code
• Include sufficient variety to capture the range of your construct
• Consider edge cases and boundary conditions

Practical Guidelines:
• Start with at least 200-300 items for robust validation
• Ensure content quality (resolution, completeness, accessibility)
• Document any exclusion criteria or preprocessing steps

Setting Boundaries

SCCs are validated for specific contexts. Define your boundaries clearly:
• Content domain (e.g., restaurant reviews vs. product reviews)
• Platform/source (e.g., Yelp images vs. Instagram posts)
• Time period (if temporal factors matter)
• Population scope (whose perceptions you're modeling)

Remember: An SCC validated on one domain cannot be applied to another without revalidation. These boundaries aren't limitations—they ensure measurement validity.`
  },
  {
    number: 2,
    title: 'Separate Development & Validation Data',
    description: 'Split your dataset into separate development and validation sets to ensure proper evaluation.',
    details: 'SCCs allow researchers to code content using large digital datasets, but evidence that coding has integrity needs to be presented. This is accomplished by excluding a subset of the data (ground-truth data) and having it rated by human coders, thereby producing a basis for comparison. While there is no set rule for how much data to hold back, validation sample size analyses show that small samples (around 100 items) are often sufficient for stable correlations.'
  },
  {
    number: 3,
    title: 'Collect Human Criterion Data (Development)',
    description: 'Gather human ratings on the development data to establish the criterion standard.',
    details: 'Human coders rate the development set to establish ground-truth ratings. These ratings serve as the standard against which the SCC will be evaluated. The development data helps you understand how well your approach is working before moving to validation.'
  },
  {
    number: 4,
    title: 'Create API Program',
    description: 'Build a program that queries the LLM via API with your specified prompts and parameters.',
    details: 'A computer program is generated which repeatedly calls or "talks to" the LLM through an Application Programming Interface (API) to collect responses. At this stage, researchers must generate a prompt to ask the SCC for ratings, decide on the specific LLM to use (e.g., GPT-4, Claude), and decide how to collect data (set temperature to 0 for consistent responses, or higher to average multiple responses).'
  },
  {
    number: 5,
    title: 'Implement Response Handling',
    description: 'Set up procedures to handle unexpected or malformed responses from the LLM.',
    details: 'While LLMs respond predictably most of the time, their probabilistic nature means SCCs occasionally respond unexpectedly. Researchers should include a cleaning stage in their program which either transforms or excludes unexpected responses. For example, if responses should be 1-7, the response "six" might be recoded as "6" while "B" would be discarded. Some LLMs can run in "structured output" mode to only allow specified responses.'
  },
  {
    number: 6,
    title: 'Collect SCC Ratings & Preregister',
    description: 'Collect Synthetic Content Coder ratings on validation data and preregister key information about your study.',
    details: 'Using the system developed, SCC responses are collected on the validation dataset. Preregistering your validation approach, metrics, and thresholds before examining results helps ensure transparency and prevents p-hacking or selective reporting.'
  },
  {
    number: 7,
    title: 'Collect Human Criterion Data (Validation)',
    description: 'Gather human ratings on the validation set for comparison with SCC ratings.',
    details: 'Human coders rate the validation set using the same instructions and scales as the development set. These independent human ratings provide the ground truth for validating your SCC performance on unseen data.'
  },
  {
    number: 8,
    title: 'Compare SCC & Human Ratings',
    description: 'Evaluate the SCC performance by comparing ratings with human criterion data using appropriate metrics.',
    details: 'SCC-coded and human-coded data are compared using relevant validation metrics such as correlation coefficients (Pearson or Spearman) and Root Mean Square Error (RMSE). Correlations show how well the SCC captures relative differences between items, while RMSE indicates absolute accuracy. Bootstrap resampling can provide confidence intervals for these metrics.'
  },
  {
    number: 9,
    title: 'Deploy or Start Over',
    description: 'Apply the validated SCC to your full dataset, or start over if validation is insufficient.',
    details: 'If validation metrics are sufficiently high, the protocol can be applied to code the entire content database. If validation metrics fall short, researchers may adjust the prompt, modify cleaning procedures, or undertake more complex procedures like fine-tuning. In many cases, it will be necessary to adjust aspects of the system setup, cleaning, and validation stages before final implementation.'
  }
];

export default function OverviewSection() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (number) => {
    setExpandedStep(expandedStep === number ? null : number);
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Developing Synthetic Content Coders
        </h2>
        <p className="text-lg leading-relaxed text-white">
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
          {steps.map((step) => {
            const isExpanded = expandedStep === step.number;

            return (
              <div
                key={step.number}
                className="bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-200 hover:border-accent/50"
              >
                {/* Clickable Header */}
                <button
                  onClick={() => toggleStep(step.number)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
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

                    {/* Chevron Icon */}
                    <div className="flex-shrink-0 text-slate-400">
                      {isExpanded ? (
                        <ChevronDown size={24} />
                      ) : (
                        <ChevronRight size={24} />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 mt-2">
                    <div className="pl-16">
                      <p className="text-slate-700 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
