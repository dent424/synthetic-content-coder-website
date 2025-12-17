import { Home, Rocket, BookOpen, Code2, Library, ArrowRight } from 'lucide-react';

const navigationCards = [
  {
    id: 'getting-started',
    title: 'System Setup',
    icon: Rocket,
    description: 'Set up your development environment and get API credentials',
    color: 'from-emerald-500 to-emerald-600',
    items: [
      'Install Python and choose an IDE',
      'Install required packages',
      'Get API keys (OpenAI or DeepInfra)',
      'Host images online (for URL-based images)'
    ]
  },
  {
    id: 'overview',
    title: 'Create SCC',
    icon: Home,
    description: 'Learn about the 9-step process for developing and validating Synthetic Content Coders',
    color: 'from-slate-500 to-slate-600',
    items: [
      'Define your construct and collect content',
      'Partition development and validation data',
      'Collect human criterion ratings',
      'Validate SCC performance'
    ]
  },
  {
    id: 'tutorial',
    title: 'Code Tutorial',
    icon: BookOpen,
    description: 'Explore working Python code with line-by-line explanations',
    color: 'from-violet-500 to-violet-600',
    items: [
      'Basic sentiment analysis',
      'Facial expression coding',
      'Image quality assessment',
      'Food palatability ratings'
    ]
  },
  {
    id: 'generator',
    title: 'Code Generator',
    icon: Code2,
    description: 'Generate customized Python code for your specific research needs',
    color: 'from-amber-500 to-amber-600',
    items: [
      'Choose GPT-4.1, GPT-5, or Llama',
      'Configure temperature and settings',
      'Customize your rating prompt',
      'Generate and download code templates for your specific SCC'
    ]
  },
  {
    id: 'resources',
    title: 'Additional Resources',
    icon: Library,
    description: 'Access additional tools and templates for your research',
    color: 'from-sky-500 to-sky-600',
    items: [
      'Preregistration template for SCC validation',
      'Glossary of LLM and content coding terms'
    ]
  }
];

export default function LandingSection({ setActiveTab }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 leading-tight">
          Synthetic Content Coders
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto">
          Use Large Language Models to code content at scale
        </p>
      </div>

      {/* What is an SCC Section */}
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          What is a Synthetic Content Coder?
        </h2>

        <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
          <p>
            A <strong>Synthetic Content Coder (SCC)</strong> is a Large Language Model (LLM) like GPT-4 or Claude
            that has been validated to reliably rate content on specific dimensions—just like human coders, but faster and more scalable.
          </p>

          <p>
            SCCs are designed to measure <strong>observer judgments</strong>: properties that human coders can
            reliably assess when viewing content. Examples include emotional expressiveness in faces,
            food palatability in images, sentiment in text, or professionalism in profile photos.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
            <h3 className="font-bold text-blue-900 mb-3 text-xl">Why Use SCCs?</h3>
            <ul className="space-y-2 text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Scale:</strong> Code thousands of items in hours instead of weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Cost:</strong> Significantly less expensive than human coding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Simplicity:</strong> Technically simpler than traditional machine learning coders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Reproducibility:</strong> Other researchers can replicate your exact coding procedure</span>
              </li>
            </ul>
          </div>

          <p>
            This interactive supplement guides you through the complete process: from setting up your
            development environment, to writing the code, to validating your SCC's performance against
            human ratings.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
            <p className="text-red-900">
              <strong>Important:</strong> SCCs must be validated before use. This site teaches you how to develop
              a properly validated SCC following rigorous content coding standards.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
          Choose Your Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navigationCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className="group bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={32} className="flex-shrink-0" />
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                  </div>
                  <p className="text-white/90 text-base">
                    {card.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <ul className="space-y-2 text-slate-700">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 mt-6 text-slate-600 group-hover:text-slate-900 transition-colors">
                    <span className="font-semibold">Go to {card.title}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Start Recommendation */}
      <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg shadow-lg p-8 text-white max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">New to SCCs?</h3>
        <p className="text-lg mb-6">
          We recommend following this path:
        </p>
        <div className="flex flex-wrap gap-3 items-center text-lg font-semibold">
          <button
            onClick={() => setActiveTab('getting-started')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            1. System Setup
          </button>
          <ArrowRight size={24} className="text-white" />
          <button
            onClick={() => setActiveTab('overview')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            2. Create SCC
          </button>
          <ArrowRight size={24} className="text-white" />
          <button
            onClick={() => setActiveTab('tutorial')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            3. Code Tutorial
          </button>
          <ArrowRight size={24} className="text-white" />
          <button
            onClick={() => setActiveTab('generator')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            4. Code Generator
          </button>
        </div>
      </div>
    </div>
  );
}
