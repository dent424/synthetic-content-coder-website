import { useState, useMemo } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { glossaryCategories } from '../../../data/glossaryTerms';

export default function GlossaryModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter terms based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return glossaryCategories;
    }

    const query = searchQuery.toLowerCase();

    return glossaryCategories
      .map(category => ({
        ...category,
        terms: category.terms.filter(
          item =>
            item.term.toLowerCase().includes(query) ||
            item.definition.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.terms.length > 0);
  }, [searchQuery]);

  const totalTerms = glossaryCategories.reduce((sum, cat) => sum + cat.terms.length, 0);
  const matchedTerms = filteredCategories.reduce((sum, cat) => sum + cat.terms.length, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Glossary of Terms</h2>
                <p className="text-sm text-slate-500">Key terminology for LLM-based content coding</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="shrink-0 px-6 py-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-slate-500">
              Showing {matchedTerms} of {totalTerms} terms
            </p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No terms match your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.name} className="space-y-3">
                {/* Category Header */}
                <div className="sticky top-0 bg-slate-50 -mx-6 px-6 py-2 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {category.name}
                  </h3>
                </div>

                {/* Terms */}
                <div className="space-y-4">
                  {category.terms.map((item) => (
                    <div
                      key={item.term}
                      className="pl-4 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
                    >
                      <dt className="font-medium text-primary">
                        {item.term}
                      </dt>
                      <dd className="mt-1 text-sm text-slate-700 leading-relaxed">
                        {item.definition}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 px-6 py-3 bg-slate-50 rounded-b-lg">
          <p className="text-xs text-slate-500 text-center">
            Source: Web Appendix A, "From Human to Synthetic Coders"
          </p>
        </div>
      </div>
    </div>
  );
}
