import { useState } from 'react';
import { FileText, Download, BookOpen } from 'lucide-react';
import PreregistrationModal from './Preregistration/PreregistrationModal';
import GlossaryModal from './Glossary/GlossaryModal';

const resources = [
  {
    id: 'preregistration',
    title: 'Preregistration Template',
    description: 'Fill out and download a preregistration form for your SCC validation study.',
    icon: FileText,
    status: 'Available',
    onClick: 'preregistration'
  },
  {
    id: 'glossary',
    title: 'Glossary of Terms',
    description: 'Key terminology for understanding LLM-based content coding, from foundational concepts to practical implementation.',
    icon: BookOpen,
    status: 'Available',
    onClick: 'glossary'
  }
];

export default function ResourcesSection() {
  const [showPreregistration, setShowPreregistration] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const handleResourceClick = (resourceId) => {
    if (resourceId === 'preregistration') {
      setShowPreregistration(true);
    } else if (resourceId === 'glossary') {
      setShowGlossary(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Additional Resources
        </h2>
        <p className="text-slate-600 mt-2">
          Tools and templates to support your LLM content coding research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const isClickable = resource.onClick !== null;

          return (
            <div
              key={resource.id}
              onClick={() => isClickable && handleResourceClick(resource.onClick)}
              className={`bg-white rounded-lg shadow-md border border-slate-200 p-6 transition-shadow ${
                isClickable
                  ? 'hover:shadow-lg cursor-pointer hover:border-primary/30'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                  isClickable
                    ? 'bg-primary/10 text-primary'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">
                      {resource.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      resource.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {resource.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {resource.description}
                  </p>
                  {resource.id === 'preregistration' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResourceClick(resource.onClick);
                        }}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Fill Out Form
                      </button>
                      <a
                        href="/SCC_Preregistration_Template.docx"
                        download="SCC_Preregistration_Template.docx"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download size={16} />
                        Download Blank Template
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preregistration Modal */}
      {showPreregistration && (
        <PreregistrationModal onClose={() => setShowPreregistration(false)} />
      )}

      {/* Glossary Modal */}
      {showGlossary && (
        <GlossaryModal onClose={() => setShowGlossary(false)} />
      )}
    </div>
  );
}
