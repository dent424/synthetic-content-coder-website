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
    details: `Partition Your Data

Why Partitioning Matters

Proper data partitioning is crucial for obtaining unbiased estimates of SCC performance. The partitioning strategy differs based on whether you're using an unfinetuned or finetuned SCC.

Unfinetuned SCCs: Two-Set Structure

For unfinetuned SCCs (using prompts without updating model weights), you need:

1. Test Set (Development)
• Used to develop and refine prompts
• Test different temperature settings
• Evaluate multiple prompt variations
• Size: ~100-150 items typically sufficient

2. Validation Set
• Held out for final, unbiased performance assessment
• Never accessed during development
• Used only once after finalizing prompts
• Size: ~100-150 items for stable estimates

3. Coding Set
• The remaining data you'll code after validation
• No human ratings needed for this set

Finetuned SCCs: Three-Set Structure

For finetuned SCCs (updating model parameters), you need:

1. Training Set
• Used to update model parameters
• Requires human ratings
• Size: Depends on complexity (200+ items common)

2. Test Set
• Evaluate performance during development
• Tune hyperparameters
• Size: ~100-150 items

3. Validation Set
• Final unbiased assessment
• Size: ~100-150 items

4. Coding Set
• Remaining data for final coding

Sampling Strategy

Random Sampling:
• Default approach for most applications
• Ensures each set represents the full distribution
• Use a fixed random seed for reproducibility

Stratified Sampling:
• When specific subgroups matter (e.g., content categories)
• Ensures representation across important dimensions
• Document stratification variables clearly

Size Considerations

The paper's analysis (Web Appendix 1) shows:
• 100 images achieve correlations within 0.001 of full sample
• Standard deviation of 0.037
• 98% of correlations between r=0.70-0.87

Practical recommendations:
• Minimum 100 items per set for stable estimates
• Larger sets (150-200) if resources permit
• Consider your tolerance for uncertainty

Critical Rules

⚠️ Never violate these principles:
• No peeking: Never look at validation set performance during development
• One shot: Validation set can only be used once
• Document everything: Record exact partitioning procedure
• Maintain separation: Keep sets completely independent

Bootstrap Enhancement

While developing on the test set, use bootstrapping to estimate validation performance:
• Resample test set (with replacement) 1,000+ times
• Calculate performance metrics for each sample
• Use median and confidence intervals to guide decisions
• Helps avoid overfitting to test set idiosyncrasies`
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

  // Helper function to format the details text with proper structure
  const formatDetails = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentParagraph = [];
    let currentList = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${key++}`} className="text-slate-700 leading-relaxed mb-4">
            {currentParagraph.join(' ')}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${key++}`} className="list-disc list-inside text-slate-700 leading-relaxed mb-4 space-y-1">
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Empty line - flush current paragraph or list
      if (!trimmed) {
        flushParagraph();
        flushList();
        return;
      }

      // Bullet point
      if (trimmed.startsWith('•')) {
        flushParagraph();
        currentList.push(trimmed.substring(1).trim());
        return;
      }

      // Numbered list item (e.g., "1. Training Set")
      if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph();
        currentList.push(trimmed);
        return;
      }

      // Section header (detect by checking if next significant content is different or it's short and ends without punctuation)
      // Heuristic: if line is short-ish and doesn't end with period, it's likely a header
      const looksLikeHeader = trimmed.length < 50 && !trimmed.endsWith('.') && !trimmed.endsWith(',') && !trimmed.startsWith('⚠️');

      if (looksLikeHeader) {
        flushParagraph();
        flushList();
        elements.push(
          <h4 key={`h-${key++}`} className="font-bold text-slate-900 mt-6 mb-2 first:mt-0">
            {trimmed}
          </h4>
        );
        return;
      }

      // Regular text - add to current paragraph
      flushList();
      currentParagraph.push(trimmed);
    });

    // Flush any remaining content
    flushParagraph();
    flushList();

    return elements;
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">
          Developing Synthetic Content Coders
        </h2>
        <p className="text-lg leading-relaxed text-slate-900">
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
                      {formatDetails(step.details)}
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
