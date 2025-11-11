import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnotatedCode from './AnnotatedCode';

export default function StageCard({ stage, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {stage.id}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-900">
              {stage.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {stage.description}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="text-slate-400" />
          ) : (
            <ChevronDown className="text-slate-400" />
          )}
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              {stage.example && (
                <div className="mb-4 text-sm text-accent font-medium">
                  {stage.example}
                </div>
              )}
              <AnnotatedCode code={stage.code} annotations={stage.annotations} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
