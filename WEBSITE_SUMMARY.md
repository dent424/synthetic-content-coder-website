# Website Summary: Synthetic Content Coders

## What This Website Does

This is an interactive educational website that teaches consumer behavior researchers how to use Large Language Models (LLMs) like GPT-4 and Claude as **Synthetic Content Coders (SCCs)** - automated systems that can rate and code research content the same way human coders would.

The site is a supplement to the academic paper "From Human to Synthetic Coders" and is designed for researchers with limited programming experience.

## The 9-Step SCC Development Process

The core methodology involves 9 sequential steps:

1. **Define Construct & Collect Content** - Identify what you want to measure (observer judgments only) and gather your content
2. **Separate Development & Validation Data** - Split data into test/validation sets (or train/test/validation for finetuned models)
3. **Collect Human Criterion Data (Development)** - Get human ratings on development set to establish ground truth
4. **Create API Program** - Build a program that queries the LLM with your prompts and parameters
5. **Implement Response Handling** - Set up procedures to clean and handle unexpected LLM responses
6. **Collect SCC Ratings & Preregister** - Run your SCC on validation data and preregister your approach
7. **Collect Human Criterion Data (Validation)** - Get independent human ratings on validation set
8. **Compare SCC & Human Ratings** - Evaluate performance using correlation and RMSE metrics
9. **Deploy or Start Over** - Apply to full dataset if validated, or refine if performance is insufficient

## Four Main Sections (Tabs)

### 1. Overview Tab (Landing Page)
- Presents the 9-step process as expandable/collapsible cards
- Each step includes:
  - Numbered badge
  - Title and brief description
  - Detailed explanation that expands on click (some steps have extensive multi-paragraph guidance)
- Hero section with gradient banner
- Call-to-action section linking to other tabs

### 2. Tutorial Tab
Interactive code viewer with 5 real-world examples:
- **Basic GPT-4** - Simplest example (5 ratings, 3 URLs)
- **Sentiment Analysis** - Text sentiment coding
- **Facial Expressiveness** - Coding facial expressions from image URLs
- **Image Quality** - Rating image quality from local files (base64 encoded)
- **Food Palatability** - Rating food appeal using Llama 4 via DeepInfra

**Key Features:**
- **Scroll-synced code viewer**: As you scroll through Python code, the right panel automatically updates to show explanations for the current section
- **Click-to-highlight**: Click line numbers in explanations to jump to that code and highlight it
- **Section navigation**: Dots on left side jump between major code sections (Imports, Configuration, API Call, Processing, Output)
- **Plain language explanations**: All descriptions written for non-programmers (e.g., "spreadsheet file" not "CSV")
- **Info panel**: Overview at top extracted from Python docstring

### 3. Generator Tab
Form-based tool that generates production-ready Python code:
- **Model selection**: Choose between GPT-4 (OpenAI) or Claude (Anthropic)
- **Settings panel**: Configure temperature, max tokens, number of repetitions
- **Template-based output**: Generates complete Python script with your specifications
- **Copy/Download**: Easy code export

### 4. Resources Tab
Placeholder for future tools, templates, and best practices (currently minimal content)

## Target Audience

Consumer behavior researchers publishing in journals like Journal of Consumer Research (JCR). The site assumes:
- Limited programming experience
- Familiarity with academic research methods
- Understanding of content coding and inter-rater reliability
- No technical background in machine learning or APIs

## Key Design Principles

1. **Plain language over jargon** - Technical concepts explained in accessible terms
2. **Minimalized examples** - Python code simplified for teaching (no error handling, no production complexity)
3. **Interactive learning** - Scroll-sync and click-to-highlight make code exploration intuitive
4. **Researcher-focused** - Emphasizes psychometric validation and research rigor over technical implementation

## Technical Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS with custom color scheme (deep blue primary, cyan accent)
- **Code Display**: react-syntax-highlighter with VS Code Dark Plus theme
- **Animations**: Framer Motion for smooth transitions
- **Deployment**: Vercel (auto-deploys on push to main)

## Content Philosophy

The website follows a "teaching not production" philosophy:
- Python examples are intentionally simplified (~30-40% smaller than production code)
- No error handling, defensive programming, or edge case management in examples
- Focus on core concepts and workflow rather than implementation details
- All explanations written in plain language suitable for researchers without programming backgrounds
