# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**To understand what the website does and its content structure, first read [`WEBSITE_SUMMARY.md`](./WEBSITE_SUMMARY.md).** That file explains the user-facing functionality, the 9-step SCC process, and what each section of the site contains. This file (CLAUDE.md) focuses on technical implementation details.

## Project Overview

Interactive website supplement for "From Human to Synthetic Coders" - an academic paper on using LLMs as Synthetic Content Coders for consumer behavior research. The site provides scroll-synced code tutorials with 5 examples (Basic, Sentiment, Expressiveness, Image Quality, Palatability), a code generator tool, and educational resources.

**Target Audience**: Consumer behavior researchers at journals like JCR - assume limited programming experience. Use plain language, not technical jargon.

### References Folder

The `references/` folder contains the unpublished manuscripts that this website supports:
- Main paper: "Psychometric Coding of Content - AKM - R1 UPDATED STARTING 11_3_2025_MAIN_PAPER.pdf"
- Appendix: "Psychometric Coding of Content - AKM - R1 UPDATED STARTING 11_3_2025_ APPENDIX.pdf"

**IMPORTANT**: This folder is excluded from version control via `.gitignore` as the manuscripts are not yet published. Do not commit or push any files from this folder to GitHub.

## Development Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server (Vite)
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Deployment
# Automatic via Vercel on push to main branch
```

## Architecture

### Four-Tab Application Structure

The app uses a simple tab-based navigation system controlled by state in `App.jsx`:

- **Overview Tab** (default): Landing page presenting the 9-step SCC development process
- **Tutorial Tab**: Scroll-synced code viewer with interactive line highlighting
- **Generator Tab**: Form-based Python code generator for LLM content coding
- **Resources Tab**: Preregistration form builder and downloadable templates

Tab state (`activeTab`) is managed in `App.jsx` and passed to `Header.jsx`. Each tab conditionally renders its respective section component.

### Scroll-Synced Tutorial System

**Key Component**: `ScrollSyncedCodeViewer.jsx`

The tutorial uses a sophisticated scroll-sync mechanism:

1. **Section-based code grouping**: Python code is split into sections (Imports, Configuration, API Call, etc.) defined in `src/data/codeExamples.js`

2. **IntersectionObserver tracking**: Detects which code section is currently visible as user scrolls
   - `rootMargin: '-20% 0px -70% 0px'` creates a "detection zone" in the viewport
   - Updates `activeSection` state when a section enters this zone
   - **Manual navigation override**: `isManualNavigation` flag temporarily disables observer when clicking line numbers/section dots to prevent unwanted panel changes

3. **Synchronized description panel**: Right panel (30% width) displays description for the currently visible section
   - Uses Framer Motion for smooth transitions between descriptions
   - Shows section title, description, and line-by-line "Key Details"

4. **Click-to-highlight feature**: Line numbers in "Key Details" are clickable buttons
   - Clicking scrolls to that line's section (`block: 'center'`)
   - Highlights the specific line with blue background (`rgba(59, 130, 246, 0.1)`) via `lineProps` on SyntaxHighlighter
   - State tracked in `highlightedLine`
   - Sets active section immediately and disables observer for 1 second to prevent panel jumping

### Code Examples Data Structure

**File**: `src/data/codeExamples.js`

Each example has:
- `code`: Raw Python code imported from `src/data/examples/*.py` using Vite's `?raw` import
- `contentType`: "Text" or "Images" - displayed in tab subtitles
- `overview`: Extracted from Python docstring (shown in info panel above code)
- `sections[]`: Array of section definitions with:
  - `lineStart`, `lineEnd`: Define which lines belong to this section (must match actual code after docstring removal)
  - `title`, `description`: Basic section info
  - `details[]`: Line-specific annotations with `{line: number, text: string}` - written in plain language for non-programmers

**Helper Functions**:
- `extractDocstring(code)`: Pulls docstring from Python files for overview panel
- `removeDocstring(code)`: Strips docstring for code display (line numbers start after docstring)

The component groups consecutive lines by section to render them in blocks with sticky headers.

**Writing Style for Details**: Use plain language suitable for consumer behavior researchers:
- "spreadsheet file" not "CSV"
- "Send to GPT-4" not "API call"
- "Convert to text format" not "base64 encode"
- Focus on what and why, not technical implementation

### Code Generator Architecture

**Main Component**: `GeneratorSection.jsx`

The generator is a controlled form that:

1. **Model Selection** (`ModelSelector.jsx`): Choose between OpenAI or Claude
   - Each model has different temperature ranges (OpenAI: 0-2, Anthropic: 0-1)
   - OpenAI models (exact API IDs):
     - `gpt-5-2025-08-07` (GPT-5, recommended)
     - `gpt-5-mini-2025-08-07` (GPT-5 Mini)
     - `gpt-4.1-2025-04-14` (GPT-4.1)
     - `gpt-4.1-mini-2025-04-14` (GPT-4.1 Mini)
   - Claude models (exact API IDs):
     - `claude-sonnet-4-5-20250929` (Sonnet 4.5, recommended)
     - `claude-opus-4-5-20251124` (Opus 4.5)
     - `claude-haiku-4-5-20251015` (Haiku 4.5)
     - `claude-sonnet-4-20250514` (Sonnet 4)

2. **Data Modality Selection** (`DataModalitySelector.jsx`): Choose data type
   - **Text**: CSV with text content column - generates code to read text items from CSV
   - **Image (URL)**: CSV with image filenames + base URL - generates code for URL-based images
   - **Image (Local)**: Local image files - generates code with base64 encoding for local files
   - State: `dataModality` ('text' or 'image') and `imageSource` ('url' or 'local')
   - Claude image templates use httpx to download and base64-encode URL images (Claude API requires base64)

3. **Settings Panel** (`SettingsPanel.jsx`): Configure parameters
   - Temperature, max tokens, repetitions
   - Ranges and defaults defined in `src/data/models.js`

4. **Template-based generation**: Uses string interpolation
   - 6 template functions in `src/data/models.js`: openaiTextTemplate, openaiImageUrlTemplate, openaiImageLocalTemplate, claudeTextTemplate, claudeImageUrlTemplate, claudeImageLocalTemplate
   - `codeTemplates` object routes to correct template based on provider, dataModality, and imageSource
   - Generates production-ready OpenAI or Anthropic API code

5. **Code Output** (`CodeOutput.jsx`): Display with syntax highlighting and copy/download

6. **Preregistration Header**: Generated code includes a comment block at the top with key parameters for preregistration (Provider, Model, Temperature, Repetitions, Max Tokens, Data Modality)

### Styling System

**Tailwind Configuration**: `tailwind.config.js`

Custom color scheme:
- `primary`: Deep blue (#1e3a8a) - main brand color for headers, active tabs
- `accent`: Cyan (#0891b2) - secondary highlights
- `annotation`: Amber (#fbbf24) - for line number badges and highlights

**Button Design Pattern**:
- **IMPORTANT**: Use inline styles for button colors, not Tailwind classes. Tailwind color classes (like `bg-primary`, `text-white`) may not compile correctly in this project.
- Active state: `backgroundColor: '#1e3a8a'`, `color: 'white'` (inline styles)
- Inactive state: `backgroundColor: '#f1f5f9'`, `color: '#334155'` (inline styles)
- Layout classes like `flex`, `rounded-lg`, `transition-all` work fine with Tailwind
- This pattern is used in `ModelSelector.jsx` and `TutorialSection.jsx`

### Text Wrapping Strategy

**Critical for code viewer**: `ScrollSyncedCodeViewer.jsx` lines 121-131

To prevent horizontal scrolling in code blocks:
```javascript
customStyle={{
  fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',  // Responsive font sizing
  whiteSpace: 'pre-wrap',                      // Preserve whitespace but wrap
  wordBreak: 'break-all',                      // Break mid-word if needed
  overflowWrap: 'anywhere',                    // Most aggressive wrapping
}}
```

Container must have `overflow-x-hidden` to prevent scroll. Font size uses CSS clamp() for viewport-based scaling.

## File Organization

```
src/
├── components/
│   ├── Layout/
│   │   └── Header.jsx              # Tab navigation + site title
│   ├── Overview/
│   │   └── OverviewSection.jsx     # Landing page with 9-step process
│   ├── Tutorial/
│   │   ├── TutorialSection.jsx     # Example tabs (Expressiveness, Image Quality, etc.)
│   │   └── ScrollSyncedCodeViewer.jsx  # Core scroll-sync + highlighting logic
│   ├── Generator/
│   │   ├── GeneratorSection.jsx    # Main generator component
│   │   ├── ModelSelector.jsx       # OpenAI vs Claude selection
│   │   ├── DataModalitySelector.jsx # Text vs Image data selection
│   │   ├── SettingsPanel.jsx       # Temperature, tokens, repetitions
│   │   └── CodeOutput.jsx          # Display generated code
│   └── Resources/
│       ├── ResourcesSection.jsx    # Resources landing with cards
│       └── Preregistration/        # Preregistration form system
│           ├── PreregistrationModal.jsx  # Main modal with form state
│           ├── FormSection.jsx           # Collapsible section wrapper
│           ├── pdfGenerator.js           # jsPDF generation logic
│           └── sections/                 # Individual form sections
│               ├── ContextSection.jsx
│               ├── ModelSpecSection.jsx
│               ├── ValidationSetSection.jsx
│               ├── HumanRatingSection.jsx
│               ├── SCCRatingSection.jsx
│               ├── ComparisonSection.jsx
│               └── FinetuningSection.jsx
├── data/
│   ├── codeExamples.js             # Tutorial sections + descriptions
│   ├── models.js                   # Model configs + code templates
│   └── examples/                   # Minimalized Python example files
│       ├── basic_gpt4.py           # Simplest example (5 ratings, 3 URLs)
│       ├── sentiment_gpt4.py       # Text sentiment analysis
│       ├── expressiveness_gpt4.py  # Facial expression coding (URL-based)
│       ├── image_quality_gpt4.py   # Image quality (base64 local files)
│       └── palatability_llama4.py  # Food palatability (Llama 4 via DeepInfra)
└── App.jsx                         # Main app with tab state
```

## Working with Code Examples

### Adding a New Tutorial Example

1. Create minimalized Python file in `src/data/examples/your_example.py`
   - Include docstring at top (will be extracted for overview panel)
   - Keep code minimal - no error handling, no main() wrapper
   - Use simple variable names (N_RATINGS not RATINGS_PER_IMAGE)

2. Import in `codeExamples.js` using `?raw`: `import yourCode from './examples/your_example.py?raw';`

3. Add new entry to `codeExamples` object:
   - Include `contentType`: "Text" or "Images"
   - Define sections with accurate line numbers (count from line 1 AFTER docstring removal)
   - Write `details[]` in plain language for researchers

4. Add tab to `exampleTabs` array in `TutorialSection.jsx`
   - Import appropriate icon from lucide-react
   - Tab subtitle will show: `{contentType} • {model}`

### Modifying Section Descriptions

Edit `src/data/codeExamples.js` - each section's `description` and `details[]` array.

**Critical**: Line numbers in `details` must match actual code line numbers AFTER docstring removal for click-to-highlight to work. The `removeDocstring()` function strips the first 8 lines (encoding line + docstring + blank line), so line 1 in the display is line 9 in the raw file.

### Updating Code Templates

Edit `src/data/models.js`:
- `modelConfigs`: Adjust settings ranges, defaults, model variants
- `codeTemplates`: Modify Python code templates (use `${config.property}` for substitution)

## Key Technical Patterns

### State Management
- Tab state in `App.jsx` (no router, just conditional rendering)
- Scroll section tracking via `activeSection` in ScrollSyncedCodeViewer
- Highlighted line via `highlightedLine` state
- Generator form state in `GeneratorSection.jsx`

### Scroll Synchronization
- Uses `IntersectionObserver` with custom `rootMargin`
- Section refs stored in `sectionRefs.current[sectionId]`
- Automatically updates description panel on scroll
- Manual navigation via section dots and line number clicks

### Syntax Highlighting
- Library: `react-syntax-highlighter` with `vscDarkPlus` theme
- Dark background (#1e1e1e) for code, light descriptions panel
- Line-specific styling via `lineProps` function prop
- Responsive font sizing to prevent horizontal overflow

## Deployment

Vercel automatically deploys on push to `main` branch. Configuration:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite (auto-detected)

## Python Example Philosophy

The example Python files are intentionally **minimalized for teaching**, not production:

- **No error handling** - removed ~135 lines of try/except blocks to focus on core concepts
- **No main() wrappers** - code executes at module level
- **No defensive programming** - no validation, no edge case handling
- **Simple variable names** - N_RATINGS not RATINGS_PER_IMAGE
- **Minimal comments** - no decorative headers, no redundant explanations
- **Plain language explanations** - in `codeExamples.js` details, not in Python comments

This makes examples ~30-40% smaller and easier for researchers to understand and adapt.

### Preregistration Form System

**Main Component**: `PreregistrationModal.jsx`

The preregistration form allows users to fill out and download a PDF for their SCC validation study:

1. **Form Structure**: 7 collapsible sections matching the preregistration template
   - Context of SCC (construct, data modality)
   - Model Specification (provider, model, temperature, repetitions, max tokens, prompts)
   - Validation Set Stimuli
   - Human Rating Collection Procedures
   - SCC Rating Procedures
   - Compare SCC and Human Rating
   - Finetuning (optional)

2. **PDF Generation** (`pdfGenerator.js`): Uses jsPDF + jspdf-autotable
   - Import pattern: `import autoTable from 'jspdf-autotable'` (explicit import, not side-effect)
   - Radio/checkbox selections render as plain text values (e.g., "Mean" not "[X] Mean")
   - Repository links show as "Yes: https://..." format

3. **Download Options**:
   - Fill out form → Download as PDF (dynamic)
   - Download blank .docx template (static file from `/public`)

4. **Styling Note**: The Download PDF button in the modal header uses **inline styles** to guarantee visibility (same Tailwind compilation issue as other buttons)

## Known Constraints

- **Tailwind color classes may not compile correctly** - Use inline styles for `backgroundColor` and `color` on buttons. Layout classes (`flex`, `rounded-lg`, etc.) work fine.
- Line highlighting depends on accurate line numbers in `codeExamples.js` matching code after docstring removal
- Text wrapping uses aggressive `break-all` - may break words mid-character
- IntersectionObserver rootMargin tuned for desktop viewports
- All example Python files must use `?raw` import to load as strings
- Manual navigation temporarily disables scroll observer for 1 second - avoid rapid clicking
- jsPDF Helvetica font doesn't support Unicode characters - use ASCII text only in PDF generation
