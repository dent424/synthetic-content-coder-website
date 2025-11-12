import { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export default function ScrollSyncedCodeViewer({ example }) {
  const [activeSection, setActiveSection] = useState(example.sections[0]);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const codeContainerRef = useRef(null);
  const sectionRefs = useRef({});

  // Calculate which lines belong to which section
  const getSectionForLine = (lineNum) => {
    return example.sections.find(
      section => lineNum >= section.lineStart && lineNum <= section.lineEnd
    );
  };

  // Split code into lines
  const codeLines = example.code.split('\n');

  // Create line-to-section mapping
  const lineElements = codeLines.map((line, idx) => {
    const lineNum = idx + 1;
    const section = getSectionForLine(lineNum);
    return {
      lineNum,
      line,
      section: section?.id || null
    };
  });

  // Group consecutive lines by section
  const sectionGroups = [];
  let currentGroup = null;

  lineElements.forEach((item) => {
    if (!currentGroup || currentGroup.sectionId !== item.section) {
      if (currentGroup) {
        sectionGroups.push(currentGroup);
      }
      currentGroup = {
        sectionId: item.section,
        lines: [item],
        startLine: item.lineNum
      };
    } else {
      currentGroup.lines.push(item);
    }
  });

  if (currentGroup) {
    sectionGroups.push(currentGroup);
  }

  // Set up intersection observer for scroll detection
  useEffect(() => {
    const options = {
      root: codeContainerRef.current,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.sectionId;
          const section = example.sections.find(s => s.id === sectionId);
          if (section) {
            setActiveSection(section);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [example]);

  return (
    <div className="flex flex-col gap-4">
      {/* Overview Panel */}
      {example.overview && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-300 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {example.overview}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex gap-6 h-[calc(100vh-320px)]">
        {/* Code Panel - 70% */}
        <div className="w-[70%] overflow-y-auto overflow-x-hidden rounded-lg border border-slate-700 bg-[#1e1e1e]" ref={codeContainerRef}>
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-mono">{example.title}.py</span>
            <span className="text-slate-300">{example.model}</span>
          </div>
        </div>

        {sectionGroups.map((group, groupIdx) => {
          const section = example.sections.find(s => s.id === group.sectionId);

          return (
            <div
              key={groupIdx}
              ref={(el) => {
                if (group.sectionId) {
                  sectionRefs.current[group.sectionId] = el;
                }
              }}
              data-section-id={group.sectionId}
              className={`relative ${activeSection?.id === group.sectionId ? 'bg-slate-900/50' : 'bg-[#1e1e1e]'}`}
            >
              {section && (
                <div className="sticky top-0 bg-primary/95 backdrop-blur px-4 py-2 border-b border-primary z-10">
                  <span className="text-sm font-semibold text-white">{section.title}</span>
                </div>
              )}

              <div className="w-full overflow-hidden">
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
                    lineHeight: '1.8',
                    background: 'transparent',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                  showLineNumbers={true}
                  startingLineNumber={group.startLine}
                  lineNumberStyle={{
                    minWidth: '2.5em',
                    paddingRight: '0.5em',
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                  lineProps={(lineNumber) => {
                    const actualLineNumber = group.startLine + lineNumber - 1;
                    const style = { display: 'block' };
                    if (actualLineNumber === highlightedLine) {
                      style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                      style.borderLeft = '4px solid #3b82f6';
                      style.paddingLeft = '0.5rem';
                      style.transition = 'all 0.3s ease';
                    }
                    return { style };
                  }}
                >
                  {group.lines.map(l => l.line).join('\n')}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description Panel - 30% */}
      <div className="w-[30%]">
        <div className="sticky top-0">
          <div className="bg-white rounded-lg border border-slate-200 shadow-lg">
            <div className="bg-gradient-to-r from-primary to-accent px-4 py-3 rounded-t-lg">
              <h3 className="text-white font-semibold">Section Guide</h3>
            </div>

            <AnimatePresence mode="wait">
              {activeSection && (
                <motion.div
                  key={activeSection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {activeSection.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activeSection.description}
                    </p>
                  </div>

                  {activeSection.details && activeSection.details.length > 0 && (
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                        <Info size={14} className="text-accent" />
                        Key Details
                      </div>

                      {activeSection.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3">
                          <button
                            onClick={() => {
                              setHighlightedLine(detail.line);
                              // Find the section containing this line
                              const section = example.sections.find(
                                s => detail.line >= s.lineStart && detail.line <= s.lineEnd
                              );
                              if (section) {
                                const element = sectionRefs.current[section.id];
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              }
                            }}
                            className="flex-shrink-0 w-12 h-6 rounded bg-annotation/20 text-annotation flex items-center justify-center text-xs font-mono font-bold cursor-pointer hover:bg-annotation/30 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-annotation/50"
                            title={`Jump to line ${detail.line}`}
                          >
                            {detail.line}
                          </button>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {detail.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Section Navigation Dots */}
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      {example.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            const element = sectionRefs.current[section.id];
                            if (element) {
                              element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }
                          }}
                          className={`
                            h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50
                            ${activeSection.id === section.id
                              ? 'w-8 bg-primary active:bg-primary/80'
                              : 'w-2 bg-slate-300 hover:bg-slate-400 active:bg-slate-600'
                            }
                          `}
                          title={section.title}
                          aria-label={`Jump to ${section.title}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Section {example.sections.findIndex(s => s.id === activeSection.id) + 1} of {example.sections.length}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* End of Main Content Area */}
      </div>
    {/* End of Outer Container */}
    </div>
  );
}
