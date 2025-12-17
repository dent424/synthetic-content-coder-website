import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

export default function GettingStartedSection() {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedSubsections, setExpandedSubsections] = useState({});
  const [copied, setCopied] = useState(false);

  const testCode = `# Install the OpenAI package first (run this once in Anaconda Prompt):
# pip install openai

from openai import OpenAI

# =============================================================================
# SETUP - Replace with your API key
# =============================================================================
client = OpenAI(api_key="YOUR_API_KEY_HERE")

# =============================================================================
# SEND A MESSAGE TO GPT-5
# =============================================================================
response = client.responses.create(

    # The model to use (gpt-5 is the most capable, gpt-5-mini is cheaper)
    model="gpt-5",

    # THE PROMPT: This is what you're asking the model to do.
    # Change this text to ask any question or give any instructions.
    input="What is 2 + 2?",

    # Temperature controls randomness (0 = deterministic, 1 = more creative)
    # NOTE: GPT-5 requires temperature to be set to 1
    temperature=1,

    # Maximum length of the response (in tokens, roughly 4 characters each)
    max_output_tokens=500,

    # Reasoning effort controls how much the model "thinks" before responding
    # Options: "minimal", "low", "medium" (default), "high"
    # Higher = better quality but slower; Lower = faster but less thorough
    reasoning={"effort": "medium"}
)

# =============================================================================
# PRINT THE RESPONSE
# =============================================================================
print(response.output_text)`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <p className="ml-9 mt-2 text-blue-800">
            Install Python and the tools you need to write and run code.
          </p>

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
          <p className="ml-9 mt-2 text-emerald-800">
            Create an OpenAI account and get the key that lets your code talk to GPT-5.
          </p>

          {expandedSteps[2] && (
            <div className="ml-9 mt-3 space-y-6">

              {/* Subsection 2a: What is an API Key? */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2a-what')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2a-what'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2a. What is an API Key?</h4>
                </button>
                {expandedSubsections['2a-what'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      Once your computer is set up, you need to connect it to the LLM. To do this, you will need
                      an <strong>API Key</strong>. An API key is a code that tells the company running the AI that you are using
                      their service. This allows them to charge you money each time you use their services.
                    </p>
                    <p className="text-emerald-900">
                      In this walkthrough, we will show you how to get an API key from <strong>OpenAI</strong> (the company that
                      runs ChatGPT). If this is your first time working with an API, we recommend that you work
                      with an OpenAI API, as they are the best documented.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 2b: Getting an OpenAI Account */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2b-account')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2b-account'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2b. Getting an OpenAI Account</h4>
                </button>
                {expandedSubsections['2b-account'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      The first thing you need to do is get an account with OpenAI. To do this, go to the{' '}
                      <a
                        href="https://openai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                      >
                        OpenAI website
                      </a>
                      {' '}and create an account by clicking <strong>Log in</strong>, then <strong>API Platform</strong>, and then <strong>Sign Up</strong>.
                    </p>
                    <p className="text-emerald-900">
                      You can either create an independent account or link it to other services like your Google or Apple account.
                    </p>

                    {/* Account Screenshot */}
                    <div className="bg-white border border-emerald-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/apikey/OpenAI Get Account.png"
                        alt="OpenAI website showing Log in button and Sign Up options"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Click Log in, then API Platform, then Sign Up to create an account
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subsection 2c: The Main API Page */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2c-mainpage')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2c-mainpage'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2c. The Main API Page</h4>
                </button>
                {expandedSubsections['2c-mainpage'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      Once you've created an account and logged in, you'll be taken to a website full of useful
                      materials. In the image below, we highlight some parts of this website that you might find
                      particularly useful.
                    </p>

                    {/* Main Page Screenshot */}
                    <div className="bg-white border border-emerald-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/apikey/OpenAI Main Page.png"
                        alt="OpenAI API Platform main page showing Get Started section, Core concepts, Models, and settings gear icon"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        The OpenAI Platform dashboard with helpful sections highlighted
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subsection 2d: Adding Money to Your Account */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2d-billing')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2d-billing'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2d. Adding Money to Your Account</h4>
                </button>
                {expandedSubsections['2d-billing'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      APIs charge you money for each "token" they process. A <strong>token</strong> is a part of a word that an
                      LLM uses as it processes text. You can think of a token as being a short word. It is harder to
                      know how images map onto tokens.
                    </p>
                    <p className="text-emerald-900">
                      Models also typically charge more for producing tokens than for reading them. At the time
                      of this writing, GPT-4o charges $2.50 for every million tokens that you send it and $10 for
                      every million tokens that it produces. Note that, whether you are processing text or images,
                      a million tokens is a lot of content!
                    </p>
                    <p className="text-emerald-900">
                      To add money to your account, click the <strong>gear icon</strong> in the upper right corner of the screen
                      (see image in "The Main API Page" section). Then click on <strong>"Billing"</strong> in the navigation bar on
                      the left side. This will allow you to add payment methods and specify how much money you
                      want to add.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 2e: Creating an API Key */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2e-createkey')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2e-createkey'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2e. Creating an API Key</h4>
                </button>
                {expandedSubsections['2e-createkey'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      An API key is a long, secret code that your app uses to identify itself when it talks to another
                      company's service. It tells the company who is making the request so they can control
                      what you're allowed to do, protect their data, and know who to bill for usage.
                    </p>
                    <p className="text-emerald-900">
                      Once you have an account with OpenAI, you can create as many API keys as you want. It's
                      very important to keep this key private. <strong>If someone has your key, they can use your account.</strong>
                    </p>
                    <p className="text-emerald-900">
                      To create a key, click on the <strong>gear icon</strong>. Then click <strong>"API keys"</strong> on the left navigation panel.
                      To create a new key, click the black button in the upper right corner that says <strong>"Create new secret key"</strong>.
                    </p>

                    {/* API Keys List Screenshot */}
                    <div className="bg-white border border-emerald-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/apikey/OpenAI Get Key 1.png"
                        alt="OpenAI API keys page showing list of existing keys and Create new secret key button"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Click "API keys" in the left panel, then "Create new secret key" button
                      </p>
                    </div>

                    <p className="text-emerald-900">
                      Once you click this button, you will see a new screen pop up. You can name your key in the Name field.
                      You will also have to select a project – typically, you will simply select <strong>"Default project"</strong> if you
                      are just getting started. Then click the black <strong>"Create secret key"</strong> button on the bottom right.
                    </p>

                    {/* Create Key Dialog Screenshot */}
                    <div className="bg-white border border-emerald-200 rounded-lg p-4 my-4">
                      <img
                        src="/images/apikey/OpenAI Get Key 2.png"
                        alt="OpenAI create new secret key dialog showing name field, project selection, and create button"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Name your key, select a project, and click "Create secret key"
                      </p>
                    </div>

                    <p className="text-emerald-900">
                      Once you do this, a new screen will appear with your key. You can copy this key and paste it into
                      any program that uses the API.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 2f: Handling API Keys */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2f-handling')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2f-handling'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">2f. Handling API Keys</h4>
                </button>
                {expandedSubsections['2f-handling'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      API keys are long strings of text and numbers. As noted earlier, <strong>if someone gains access to
                      your API key they can use your account</strong>. This means that you should be careful to keep
                      this key private. For example, if you are posting a computer program to OSF, you should
                      never post it with your API key.
                    </p>
                    <p className="text-emerald-900">
                      Once you generate an API key, OpenAI will never give it to you again. This means that if you
                      lose the key, you'll have to generate a new one. Luckily, unlike with house keys, this isn't a
                      big deal. It's free and quick to do so. Just repeat the steps you just followed.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* STEP 3: Try the API - PURPLE */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => toggleStep(3)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[3] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">Step 3: Try the API</h3>
          </button>
          <p className="ml-9 mt-2 text-purple-800">
            Test your setup by sending a simple question to GPT-5 and getting a response.
          </p>

          {expandedSteps[3] && (
            <div className="ml-9 mt-3 space-y-6">

              {/* Subsection 3a: Open a New File in Spyder */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3a-newfile')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3a-newfile'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">3a. Open a New File in Spyder</h4>
                </button>
                {expandedSubsections['3a-newfile'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-purple-900">
                      Open <strong>Spyder</strong> from Anaconda Navigator (as shown in Step 1b). When Spyder opens,
                      you'll see a default file called <code className="bg-purple-100 px-1 rounded">untitled0.py</code> in the left panel.
                      This is where you'll paste your code.
                    </p>

                    {/* API Test Screenshot 1 */}
                    <div className="bg-white border border-purple-200 rounded-lg p-4 my-4 max-w-2xl">
                      <img
                        src="/images/apitest/APITest1.png"
                        alt="Spyder IDE showing where to paste code in the left panel"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Paste your code in the left panel of Spyder (the script editor)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subsection 3b: Paste the Code and Add Your API Key */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3b-paste')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3b-paste'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">3b. Paste the Code and Add Your API Key</h4>
                </button>
                {expandedSubsections['3b-paste'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-purple-900">
                      Copy the code below and paste it into Spyder's left panel. Then find the line that
                      says <code className="bg-purple-100 px-1 rounded">YOUR_API_KEY_HERE</code> and replace it with
                      the API key you generated in Step 2.
                    </p>

                    {/* Code Block */}
                    <div className="relative bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-slate-300" />
                        )}
                      </button>
                      <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap pr-12">
                        {testCode}
                      </pre>
                    </div>

                    <p className="text-purple-900">
                      <strong>Important:</strong> Make sure to replace <code className="bg-purple-100 px-1 rounded">YOUR_API_KEY_HERE</code> with
                      your actual API key.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 3c: Run the Code and Check the Output */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3c-run')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3c-run'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">3c. Run the Code and Check the Output</h4>
                </button>
                {expandedSubsections['3c-run'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-purple-900">
                      In the image below, the <strong style={{color: '#a855f7'}}>lavender box</strong> shows where you need to
                      replace <code className="bg-purple-100 px-1 rounded">YOUR_API_KEY_HERE</code> with your actual API key.
                      To run the code, click the <strong style={{color: '#3b82f6'}}>play button</strong> shown in the blue box
                      (or press <strong>F5</strong> on your keyboard).
                    </p>

                    <p className="text-purple-900">
                      The <strong style={{color: '#eab308'}}>yellow box</strong> at the bottom of the console shows the
                      successful output "4" — this means GPT-5 received your question and sent back the correct answer.
                    </p>

                    {/* API Test Screenshot 2 - Output highlight */}
                    <div className="bg-white border border-purple-200 rounded-lg p-4 my-4 max-w-4xl">
                      <img
                        src="/images/apitest/APITest2.png"
                        alt="Spyder IDE showing the API key location (green box) and successful output (yellow box)"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-slate-600 mt-3 text-center italic">
                        Lavender box: API key location. Blue box: Run button. Yellow box: successful output "4".
                      </p>
                    </div>

                    <p className="text-purple-900 font-medium">
                      If you see "4" printed in the console, your setup is complete! You're ready to start building SCCs.
                    </p>
                  </div>
                )}
              </div>

              {/* Troubleshooting */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3-troubleshoot')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3-troubleshoot'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Troubleshooting</h4>
                </button>
                {expandedSubsections['3-troubleshoot'] && (
                  <div className="ml-6 mt-2 space-y-3">
                    <div>
                      <p className="text-purple-900 font-medium">Error: "No module named 'openai'"</p>
                      <p className="text-purple-800 text-sm">
                        You need to install the OpenAI package. Open Anaconda Prompt (not Spyder) and type: <code className="bg-purple-100 px-1 rounded">pip install openai</code>
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-900 font-medium">Error: "Invalid API key"</p>
                      <p className="text-purple-800 text-sm">
                        Double-check that you copied your API key correctly. Make sure there are no extra spaces before or after the key.
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-900 font-medium">Error: "Insufficient quota" or billing error</p>
                      <p className="text-purple-800 text-sm">
                        You need to add payment information to your OpenAI account. Go to{' '}
                        <a
                          href="https://platform.openai.com/account/billing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 underline"
                        >
                          platform.openai.com/account/billing
                        </a>
                        {' '}to add a payment method.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 4: Host Your Images Online - AMBER (Optional) */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => toggleStep(4)}
            className="w-full text-left flex items-start gap-3 hover:bg-amber-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-amber-700">
              {expandedSteps[4] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-amber-900 flex-1">Step 4: Host Your Images Online (For URL-Based Images Only)</h3>
          </button>
          <p className="ml-9 mt-2 text-amber-800">
            If you're analyzing images, particularly with open-source models, you'll need to put them online so that the LLM can access them. You don't need to do this step if you're working with text.
          </p>

          {expandedSteps[4] && (
            <div className="ml-9 mt-3 space-y-6">

              {/* Subsection 4a: Why Host Images Online? */}
              <div className="border-l-2 border-amber-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4a-why')}
                  className="w-full text-left flex items-start gap-2 hover:text-amber-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4a-why'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">4a. Why Host Images Online?</h4>
                </button>
                {expandedSubsections['4a-why'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-amber-900">
                      When you want an LLM to analyze images, you have two options: send the image as a <strong>URL</strong> (a web link)
                      or encode the image directly in your code (<strong>base64</strong>), which reads images right off your computer.
                      URL-based images are often easier to work with, especially when you have many images to analyze.
                      Some models may also require URL-based images and don't support reading local files.
                    </p>
                    <p className="text-amber-900">
                      To use URLs, your images need to be hosted somewhere online where the LLM can access them.
                      <strong>ImgBB</strong> provides an easy way to host images online — it's free and doesn't require technical setup.
                      However, be mindful of the sensitivity of your images when using any public hosting service.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 4b: Create an Image Hosting Account */}
              <div className="border-l-2 border-amber-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4b-account')}
                  className="w-full text-left flex items-start gap-2 hover:text-amber-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4b-account'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">4b. Create an Image Hosting Account</h4>
                </button>
                {expandedSubsections['4b-account'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-amber-900">
                      There are many image hosting services available, including <strong>AWS S3</strong>, <strong>Google Cloud Storage</strong>,
                      {' '}<strong>Cloudinary</strong>, and <strong>Imgur</strong>. For this guide, we'll use <strong>ImgBB</strong> because
                      it's free, requires no technical setup, and is easy to use. The remaining instructions are specific to ImgBB,
                      but you can follow similar procedures with other services.
                    </p>
                    <p className="text-amber-900">
                      <strong>Note:</strong> Links from services like <strong>Google Drive</strong> or <strong>Dropbox</strong> typically
                      don't work because they point to a preview page rather than the actual image file. You need a <strong>direct link</strong> to
                      the image itself (a URL that ends in <code className="bg-amber-100 px-1 rounded">.jpg</code>, <code className="bg-amber-100 px-1 rounded">.png</code>, etc.).
                    </p>
                    <p className="text-amber-900">
                      Go to{' '}
                      <a
                        href="https://imgbb.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-700 underline font-medium"
                      >
                        imgbb.com
                      </a>
                      {' '}and click <strong>"Sign up"</strong> in the top right corner. You can create a free account
                      using your email or sign in with Google or Facebook.
                    </p>
                    <p className="text-amber-900">
                      While you can upload images without an account, creating one lets you organize your images
                      and access them later.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 4c: Upload Your Images */}
              <div className="border-l-2 border-amber-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4c-upload')}
                  className="w-full text-left flex items-start gap-2 hover:text-amber-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4c-upload'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">4c. Upload Your Images</h4>
                </button>
                {expandedSubsections['4c-upload'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-amber-900">
                      Once logged in, click the <strong>"Start uploading"</strong> button on the homepage, or drag and drop
                      your images directly onto the page. You can upload multiple images at once.
                    </p>
                    <p className="text-amber-900">
                      After uploading, ImgBB will show you each image with several link options. For use with LLMs,
                      you want the <strong>"Direct links"</strong> option — this gives you a URL ending in the image extension
                      (like <code className="bg-amber-100 px-1 rounded">.jpg</code> or <code className="bg-amber-100 px-1 rounded">.png</code>).
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 4d: Get the Direct Link */}
              <div className="border-l-2 border-amber-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4d-link')}
                  className="w-full text-left flex items-start gap-2 hover:text-amber-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4d-link'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">4d. Get the Direct Link</h4>
                </button>
                {expandedSubsections['4d-link'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-amber-900">
                      After uploading an image, click on it to view the details. Look for the <strong>"Direct links"</strong> section
                      and copy the URL. It will look something like:
                    </p>

                    {/* Example URL */}
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4 break-all">
                      https://i.ibb.co/abc123xyz/your-image.jpg
                    </div>

                    <p className="text-amber-900">
                      ImgBB URLs have a base (<code className="bg-amber-100 px-1 rounded">https://i.ibb.co/</code>) but each image
                      also gets a unique code (like <code className="bg-amber-100 px-1 rounded">abc123xyz</code>) in the path.
                      This means you can't use a simple base URL + filename approach — you'll need to copy the <strong>complete URL</strong> for
                      each image individually.
                    </p>

                    <p className="text-amber-900">
                      <strong>For the code template:</strong> Save the full URL string in the first column of your CSV file.
                      The generated code will read directly from this column.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection 4e: Organize URLs for Your SCC */}
              <div className="border-l-2 border-amber-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4e-organize')}
                  className="w-full text-left flex items-start gap-2 hover:text-amber-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4e-organize'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">4e. Organize URLs for Your SCC</h4>
                </button>
                {expandedSubsections['4e-organize'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-amber-900">
                      Create a spreadsheet (Excel or CSV) with one column containing all your image URLs. Each row
                      should have one complete URL. For example:
                    </p>

                    {/* Example CSV */}
                    <div className="bg-white border border-amber-200 rounded-lg p-4 my-4 overflow-x-auto">
                      <table className="text-sm font-mono">
                        <thead>
                          <tr className="border-b border-amber-200">
                            <th className="text-left py-2 px-3 text-amber-900">image_url</th>
                          </tr>
                        </thead>
                        <tbody className="text-amber-800">
                          <tr className="border-b border-amber-100">
                            <td className="py-2 px-3">https://i.ibb.co/abc123/image1.jpg</td>
                          </tr>
                          <tr className="border-b border-amber-100">
                            <td className="py-2 px-3">https://i.ibb.co/def456/image2.jpg</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">https://i.ibb.co/ghi789/image3.jpg</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-amber-900">
                      When using the <strong>Code Generator</strong>, select "Image (URL)" as your data type and leave the
                      Base URL field <strong>empty</strong>. Your code will read the full URLs directly from your CSV file.
                    </p>

                    <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mt-4">
                      <p className="text-amber-900 text-sm">
                        <strong>Tip:</strong> If you're using a cloud service like AWS S3 or Google Cloud Storage where all
                        images share the same base URL (e.g., <code className="bg-amber-50 px-1 rounded">https://mybucket.s3.amazonaws.com/images/</code>),
                        you can enter that as the Base URL and just list filenames in your CSV instead of full URLs.
                      </p>
                    </div>
                  </div>
                )}
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
              <strong>Code Tutorial:</strong> See step-by-step code examples for different content types
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
