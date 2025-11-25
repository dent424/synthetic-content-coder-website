import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function GettingStartedSection() {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedSubsections, setExpandedSubsections] = useState({});

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const toggleSubsection = (subsectionId) => {
    setExpandedSubsections(prev => ({ ...prev, [subsectionId]: !prev[subsectionId] }));
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">
          System Setup: Getting Your Computer Ready for SCCs
        </h2>
        <p className="leading-relaxed text-slate-700">
          To run an SCC, you will need to install a programming language and an application to write
          these programs in. This application is called an <strong>Integrated Development Environment (IDE)</strong>.
          You will also need to install a few <strong>packages</strong> (extra commands) for your programming
          language that allow you to access your LLM.
        </p>
        <p className="leading-relaxed text-slate-700">
          In this walkthrough, we will show you how to install the Python programming language, the
          Spyder IDE, and some key packages.
        </p>
      </div>

      {/* STEP 1: Get Your Computer Ready - BLUE */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => toggleStep(1)}
            className="w-full text-left flex items-start gap-3 hover:bg-blue-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-blue-700">
              {expandedSteps[1] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-blue-900 flex-1">Step 1: Get Your Computer Ready</h3>
          </button>

          {expandedSteps[1] && (
            <div className="ml-9 mt-3 space-y-6">

              {/* Subsection 1a: Download and Install Anaconda */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('1a-anaconda')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['1a-anaconda'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">1a. Download and Install Anaconda</h4>
                </button>
                {expandedSubsections['1a-anaconda'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-blue-900">
                      For beginners, we recommend using the Python programming language and the Spyder
                      IDE. This is because both can be downloaded together from an organization named
                      Anaconda. <strong>Anaconda is a free software that bundles Python with scientific computing
                      tools.</strong> It's the simplest way to get everything you need.
                    </p>

                    <p className="text-blue-900">
                      Go to{' '}
                      <a
                        href="https://www.anaconda.com/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        www.anaconda.com/download
                      </a>
                      {' '}and download it based on your operating system. In the image below, you can see the part
                      of the site that you will download from in the red box.
                    </p>

                    {/* Anaconda Download Screenshot */}
                    <div className="bg-white border border-blue-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/anaconda/Anaconda1.png"
                        alt="Anaconda download page showing installer options for Windows, Mac, and Linux"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Download Anaconda from the official website for your operating system
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subsection 1b: Running Spyder and Accessing Python */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('1b-spyder')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['1b-spyder'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">1b. Running Spyder and Accessing Python</h4>
                </button>
                {expandedSubsections['1b-spyder'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-blue-900">
                      After installing Anaconda, look for a program on your computer called <strong>Anaconda Navigator</strong>
                      {' '}and open it. From here, you will see a menu with many programs. Pick the one called
                      <strong> Spyder</strong>. Spyder is a program that lets you access the Python programming language.
                    </p>

                    <p className="text-blue-900">
                      In the image below, you will see Anaconda Navigator with Spyder in a red box.
                    </p>

                    {/* Anaconda Navigator Screenshot */}
                    <div className="bg-white border border-blue-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/anaconda/Anaconda2.png"
                        alt="Anaconda Navigator interface showing various applications including Spyder"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Launch Spyder from the Anaconda Navigator application menu
                      </p>
                    </div>

                    <h5 className="text-md font-bold text-blue-900 mt-6">Getting Used to Spyder</h5>

                    <p className="text-blue-900">
                      Spyder can look intimidating at first but it's not too bad. You should see a few panels.
                      Typically, <strong>the one on the left is where you write your programs</strong> (also called scripts). We
                      provide templates that you can use here. <strong>The one on the right is where you interact with
                      Python and run programs.</strong> We won't go into lots of detail here, but{' '}
                      <a
                        href="https://docs.spyder-ide.org/current/videos/first-steps-with-spyder.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        this
                      </a>
                      {' '}is an excellent guide.
                    </p>

                    {/* Spyder Interface Screenshot */}
                    <div className="bg-white border border-blue-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/anaconda/Spyder1.png"
                        alt="Spyder IDE interface showing the script editor panel on the left and Python console on the right"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Spyder interface: Left panel for writing scripts, right panel for interacting with Python
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subsection 1c: Install the API */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('1c-api')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['1c-api'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">1c. Install the API</h4>
                </button>
                {expandedSubsections['1c-api'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-blue-900">
                      The API is installed within Python as a <strong>package</strong>. You can think of this as a way of adding
                      extra commands for Python to use that allow it to communicate with an LLM. To install the
                      OpenAI API, type this in the right panel and hit enter:
                    </p>

                    {/* Code block for pip install command */}
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">In [1]:</span>
                        <span>pip install OpenAI</span>
                      </div>
                    </div>

                    <p className="text-blue-900">
                      See the image below for how this should look. You will likely see a lot of text appear in the window.
                      <strong> Wait for it to finish.</strong> Once that's done, your computer is ready to create an SCC!
                    </p>

                    {/* Spyder Console Screenshot */}
                    <div className="bg-white border border-blue-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/anaconda/Spyder2.png"
                        alt="Spyder console showing the pip install OpenAI command"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Type the pip install command in the Python console (right panel)
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* STEP 2: Get an API Key - EMERALD (Placeholder) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => toggleStep(2)}
            className="w-full text-left flex items-start gap-3 hover:bg-emerald-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-emerald-700">
              {expandedSteps[2] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-emerald-900 flex-1">Step 2: Get an API Key</h3>
          </button>

          {expandedSteps[2] && (
            <div className="ml-9 mt-3">
              <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-6">
                <p className="text-emerald-900 italic">
                  Content coming soon. This section will guide you through obtaining API keys from OpenAI and Anthropic.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 3: Testing Your API - PURPLE (Placeholder) */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => toggleStep(3)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[3] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">Step 3: Testing Your API</h3>
          </button>

          {expandedSteps[3] && (
            <div className="ml-9 mt-3">
              <div className="bg-purple-100 border border-purple-300 rounded-lg p-6">
                <p className="text-purple-900 italic">
                  Content coming soon. This section will show you how to test that your API connection is working properly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-6">
        <h3 className="font-bold text-slate-900 mb-3 text-lg">What's Next?</h3>
        <div className="space-y-2 text-slate-700">
          <p>
            Once you've completed system setup, you can:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              <strong>Create SCC:</strong> Learn the 9-step process for developing and validating SCCs
            </li>
            <li>
              <strong>Tutorial:</strong> See step-by-step code examples for different content types
            </li>
            <li>
              <strong>Code Generator:</strong> Generate customized Python code for GPT-4 or Claude
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
