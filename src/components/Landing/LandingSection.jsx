import { Home, Rocket, BookOpen, Code2, Library, ArrowRight } from 'lucide-react';

const navigationCards = [
  {
    id: 'overview',
    title: 'Overview',
    icon: Home,
    description: 'Learn about the 9-step process for developing and validating Synthetic Content Coders',
    color: 'from-blue-500 to-blue-600',
    items: [
      'Define your construct and collect content',
      'Partition development and validation data',
      'Collect human criterion ratings',
      'Validate SCC performance'
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    description: 'Set up your development environment and get API credentials',
    color: 'from-green-500 to-green-600',
    items: [
      'Install Python and choose an IDE',
      'Install required packages',
      'Get an OpenAI API key',
      'Optional: Get an Anthropic API key'
    ]
  },
  {
    id: 'tutorial',
    title: 'Interactive Code Examples',
    icon: BookOpen,
    description: 'Explore working Python code with line-by-line explanations',
    color: 'from-purple-500 to-purple-600',
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
    color: 'from-orange-500 to-orange-600',
    items: [
      'Choose between GPT-4 or Claude',
      'Configure temperature and settings',
      'Customize your rating prompt',
      'Download production-ready code'
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: Library,
    description: 'Access additional tools, templates, and best practices',
    color: 'from-cyan-500 to-cyan-600',
    items: [
      'Validation tools and calculators',
      'Prompt templates',
      'Best practices guide',
      'Troubleshooting tips'
    ]
  }
];

export default function LandingSection({ setActiveTab }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <h1 className="text-5xl font-bold text-slate-900 leading-tight">
          Synthetic Content Coders
        </h1>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto">
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
                <span><strong>Cost:</strong> Significantly less expensive than human coding panels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Consistency:</strong> No coder fatigue or drift over time</span>
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

          <p className="text-slate-600 italic border-l-4 border-slate-300 pl-4 mt-6">
            <strong>Important:</strong> SCCs must be validated before use. This site teaches you how to develop
            a properly validated SCC following rigorous psychometric standards.
          </p>
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
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8 text-white max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">New to SCCs?</h3>
        <p className="text-lg mb-6 text-white/90">
          We recommend following this path:
        </p>
        <div className="flex flex-wrap gap-3 items-center text-lg font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            1. Overview
          </button>
          <ArrowRight size={24} className="text-white" />
          <button
            onClick={() => setActiveTab('getting-started')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            2. Getting Started
          </button>
          <ArrowRight size={24} className="text-white" />
          <button
            onClick={() => setActiveTab('tutorial')}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            3. Tutorial
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
