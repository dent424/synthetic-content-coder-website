import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export default function AnnotatedCode({ code, annotations }) {
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  // Split code into lines and process annotations
  const renderCodeWithAnnotations = () => {
    const lines = code.split('\n');
    const processedCode = lines.map((line, idx) => {
      // Check if this line has an annotation marker (①, ②, etc.)
      const annotationMatch = line.match(/# ([①②③④⑤⑥])/);
      if (annotationMatch) {
        const marker = annotationMatch[1];
        // Map unicode markers to numbers
        const markerMap = { '①': 1, '②': 2, '③': 3, '④': 4, '⑤': 5, '⑥': 6 };
        const annotationNum = markerMap[marker];
        return {
          line,
          annotation: annotationNum,
          lineNum: idx
        };
      }
      return { line, annotation: null, lineNum: idx };
    }).filter(item => item.line.trim() !== '');

    return processedCode;
  };

  const processedLines = renderCodeWithAnnotations();

  return (
    <div className="relative">
      {/* Code block */}
      <div className="rounded-lg overflow-hidden border border-slate-700">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.7',
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Annotation markers overlay */}
      <div className="mt-4 space-y-2">
        {Object.entries(annotations).map(([num, annotation]) => (
          <button
            key={num}
            onClick={() => setActiveAnnotation(activeAnnotation === parseInt(num) ? null : parseInt(num))}
            className={`
              w-full text-left p-3 rounded-lg border transition-all
              ${activeAnnotation === parseInt(num)
                ? 'bg-annotation/10 border-annotation shadow-md'
                : 'bg-white border-slate-200 hover:border-annotation/50 hover:bg-annotation/5'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-annotation text-slate-900 text-sm font-bold flex items-center justify-center">
                {num}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  {annotation.title}
                  <Info size={14} className="text-slate-400" />
                </div>
                <AnimatePresence>
                  {activeAnnotation === parseInt(num) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-slate-600 mt-2">
                        {annotation.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
