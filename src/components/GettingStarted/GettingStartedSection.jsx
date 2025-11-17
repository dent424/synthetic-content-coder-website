import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Install Anaconda',
    description: 'Download Anaconda, which includes Python, Jupyter Notebook, and essential scientific packages.',
    content: `
### What is Anaconda?

Anaconda is a comprehensive Python distribution that includes:
- Python programming language
- Jupyter Notebook (for interactive coding)
- Essential scientific packages (pandas, numpy, etc.)
- Package manager (conda) for easy installation
- Anaconda Navigator (graphical interface)

Installing Anaconda gives you everything you need in one simple download.

### Download and Install Anaconda

**Step 1: Download**

Visit [anaconda.com/download](https://www.anaconda.com/download) and download the installer for your operating system:
- **Windows:** Download the .exe installer
- **Mac:** Download the .pkg installer
- **Linux:** Download the .sh installer

Choose the latest Python 3.x version (currently Python 3.11 or 3.12).

**Step 2: Run the Installer**

- **Windows:** Double-click the .exe file and follow the installation wizard
  - Choose "Just Me" when asked who to install for
  - Accept the default installation location
  - **Important:** Check "Add Anaconda to my PATH environment variable" if you want to use conda from any command prompt

- **Mac:** Double-click the .pkg file and follow the prompts
  - Enter your password when requested
  - Accept the license agreement
  - Install for "Just Me"

**Step 3: Verify Installation**

Open **Anaconda Prompt** (Windows) or **Terminal** (Mac/Linux) and type:

\`\`\`bash
conda --version
python --version
\`\`\`

Both commands should display version numbers. You're ready to go!

### Launch Anaconda Navigator

Anaconda Navigator is a desktop application that lets you launch Jupyter Notebook, manage packages, and more.

- **Windows:** Search for "Anaconda Navigator" in the Start menu
- **Mac:** Find Anaconda Navigator in your Applications folder
- **Or from terminal:** Type \`anaconda-navigator\`
    `.trim()
  },
  {
    number: 2,
    title: 'Choose Your Coding Environment',
    description: 'Select a development environment to write and run your Python code.',
    content: `
### Recommended Options

**Option 1: Jupyter Notebook (Included with Anaconda - Recommended)**

Jupyter Notebook is perfect for SCCs because you can:
- Run code in interactive cells
- See outputs immediately
- Mix code with explanatory text
- Save your work automatically

**To Launch Jupyter:**
1. Open Anaconda Navigator
2. Click "Launch" under Jupyter Notebook
3. Your browser will open showing your files
4. Click "New" → "Python 3" to create a new notebook
5. Type code in a cell and press Shift+Enter to run it

**Option 2: Visual Studio Code**

VS Code is a powerful, free code editor that works great with Python.

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install VS Code
3. Open VS Code
4. Click the Extensions icon (or press Ctrl+Shift+X)
5. Search for "Python" and install the official Python extension by Microsoft
6. Restart VS Code

VS Code works seamlessly with Anaconda - it will automatically detect your Anaconda Python installation.

**Option 3: PyCharm Community Edition**

PyCharm is a full-featured IDE specifically designed for Python development.

1. Download PyCharm Community (free) from [jetbrains.com/pycharm](https://www.jetbrains.com/pycharm/)
2. Install and run PyCharm
3. When creating a project, select your Anaconda Python interpreter

### Test Your Setup

**In Jupyter Notebook:**
1. Create a new notebook
2. In the first cell, type: \`print("Hello from my SCC!")\`
3. Press Shift+Enter to run
4. You should see the output below the cell

**In VS Code or PyCharm:**
1. Create a new file named \`test_scc.py\`
2. Type: \`print("Hello from my SCC!")\`
3. Run the file (F5 or click "Run")
4. You should see the output in the terminal
    `.trim()
  },
  {
    number: 3,
    title: 'Install Required Python Packages',
    description: 'Install the libraries needed to interact with LLM APIs.',
    content: `
### Install the OpenAI Library

Open **Anaconda Prompt** (Windows) or **Terminal** (Mac/Linux) and run:

\`\`\`bash
conda install -c conda-forge openai
\`\`\`

Or use pip (works with Anaconda):

\`\`\`bash
pip install openai
\`\`\`

### Install the Anthropic Library (for Claude)

If you plan to use Claude instead of GPT-4:

\`\`\`bash
pip install anthropic
\`\`\`

### Good News: Many Packages Are Already Installed!

Anaconda includes many useful packages by default:
- **pandas** - For working with spreadsheets and data
- **pillow** - For working with images
- **numpy** - For numerical operations

You can check what's installed by typing:

\`\`\`bash
conda list
\`\`\`

### Verify OpenAI Installation

**In Jupyter Notebook:**
1. Create a new cell
2. Type:
\`\`\`python
import openai
print("OpenAI library installed successfully!")
\`\`\`
3. Press Shift+Enter to run

**In a Python file:**
Create \`test_openai.py\` with the same code and run it.

If you see the success message, you're ready to go!
    `.trim()
  },
  {
    number: 4,
    title: 'Get an OpenAI API Key',
    description: 'Create an OpenAI account and obtain an API key to use GPT-4.',
    content: `
### Step-by-Step Instructions

**1. Create an OpenAI Account**

- Visit [platform.openai.com/signup](https://platform.openai.com/signup)
- Sign up with your email address
- Verify your email

**2. Add Payment Method**

- Go to [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
- Click "Add payment method"
- Enter your credit card information
- **Note:** OpenAI charges pay-as-you-go. You only pay for what you use.

**3. Set Spending Limits (Recommended)**

- In the Billing section, set a monthly spending limit
- Start with a low limit (e.g., $10) while testing
- This prevents unexpected charges

**4. Generate Your API Key**

- Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Click "Create new secret key"
- Give it a name (e.g., "SCC Research Project")
- **Important:** Copy the key immediately - you won't be able to see it again!
- Store it somewhere safe (like a password manager)

**5. Test Your API Key**

Create a file named \`test_api.py\`:

\`\`\`python
from openai import OpenAI

# Replace with your actual API key
client = OpenAI(api_key="sk-proj-...")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Say hello!"}],
    max_tokens=10
)

print(response.choices[0].message.content)
\`\`\`

Run it. If you see a response from GPT-4, your API key works!

### API Key Security Tips

**Never share your API key publicly:**
- Don't commit it to GitHub
- Don't post it in forums or chat
- Don't share it via email

**Use environment variables (recommended):**

Instead of putting the key in your code:

\`\`\`python
import os
from openai import OpenAI

# Set this in your terminal before running:
# export OPENAI_API_KEY="sk-proj-..."

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
\`\`\`

**Monitor your usage:**
- Regularly check [platform.openai.com/usage](https://platform.openai.com/usage)
- Review your spending to avoid surprises
    `.trim()
  },
  {
    number: 5,
    title: 'Optional: Get an Anthropic API Key (for Claude)',
    description: 'If you want to use Claude instead of GPT-4, follow these steps.',
    content: `
### Step-by-Step Instructions

**1. Create an Anthropic Account**

- Visit [console.anthropic.com](https://console.anthropic.com/)
- Sign up with your email address
- Verify your email

**2. Add Credits**

- Go to the Billing section
- Add credits to your account (minimum $5)
- **Note:** Anthropic uses a prepaid credit system

**3. Generate Your API Key**

- Go to API Keys section
- Click "Create Key"
- Give it a name (e.g., "SCC Research")
- **Important:** Copy and save the key immediately!

**4. Test Your API Key**

Create a file named \`test_claude.py\`:

\`\`\`python
from anthropic import Anthropic

# Replace with your actual API key
client = Anthropic(api_key="sk-ant-...")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=10,
    messages=[{"role": "user", "content": "Say hello!"}]
)

print(message.content[0].text)
\`\`\`

Run it. If you see a response from Claude, your API key works!

### When to Use Claude vs GPT-4

**Use GPT-4 when:**
- You want the most widely-used model
- You prefer pay-as-you-go billing
- You're following published SCC research (most examples use GPT-4)

**Use Claude when:**
- You want longer context windows
- You prefer prepaid credits
- You want to compare model performance
    `.trim()
  }
];

export default function GettingStartedSection() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (number) => {
    setExpandedStep(expandedStep === number ? null : number);
  };

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let currentList = [];
    let currentCodeBlock = null;
    let codeLines = [];

    const flushCodeBlock = () => {
      if (currentCodeBlock !== null) {
        elements.push(
          <div key={`code-${elements.length}`} className="bg-slate-900 text-slate-100 rounded-lg p-4 my-4 overflow-x-auto">
            <div className="text-xs text-slate-400 mb-2">{currentCodeBlock}</div>
            <pre className="text-sm">
              <code>{codeLines.join('\n')}</code>
            </pre>
          </div>
        );
        currentCodeBlock = null;
        codeLines = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside text-slate-700 space-y-2 my-4">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      // Code block start
      if (line.startsWith('```')) {
        flushList();
        if (currentCodeBlock === null) {
          currentCodeBlock = line.substring(3) || 'code';
        } else {
          flushCodeBlock();
        }
        return;
      }

      // Inside code block
      if (currentCodeBlock !== null) {
        codeLines.push(line);
        return;
      }

      // Heading
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h4 key={`h-${i}`} className="font-bold text-slate-900 mt-6 mb-3 text-lg">
            {line.substring(4)}
          </h4>
        );
        return;
      }

      // List item or numbered list
      if (line.match(/^[-*]\s/) || line.match(/^\d+\.\s/)) {
        const content = line.replace(/^[-*]\s/, '').replace(/^\d+\.\s/, '')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>');
        currentList.push(content);
        return;
      }

      // Regular paragraph
      if (line.trim()) {
        flushList();
        const content = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.*?)`/g, '<code class="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline inline-flex items-center gap-1">$1 <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>');

        elements.push(
          <p key={`p-${i}`} className="text-slate-700 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: content }} />
        );
      }
    });

    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">
          Getting Started with SCCs
        </h2>
        <p className="leading-relaxed text-slate-700">
          Follow these steps to set up your development environment and get your API credentials.
          If you're new to programming, start with Step 1. If you already have Anaconda or Python installed, skip to Step 3.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isExpanded = expandedStep === step.number;

          return (
            <div
              key={step.number}
              className="bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-200 hover:border-accent/50"
            >
              <button
                onClick={() => toggleStep(step.number)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-slate-400">
                    {isExpanded ? (
                      <ChevronDown size={24} />
                    ) : (
                      <ChevronRight size={24} />
                    )}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                  <div className="pl-16">
                    {renderContent(step.content)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="font-bold text-blue-900 mb-3 text-lg">What's Next?</h3>
        <div className="space-y-2 text-blue-800">
          <p>
            <strong>Tutorial:</strong> See step-by-step code examples for different content types
          </p>
          <p>
            <strong>Code Generator:</strong> Generate customized Python code for your SCC
          </p>
          <p>
            <strong>Validation:</strong> Learn about the 9-step SCC development process
          </p>
        </div>
      </div>
    </div>
  );
}
