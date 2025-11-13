# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive website supplement for "From Human to Synthetic Coders" - an academic paper on using LLMs as Synthetic Content Coders for consumer behavior research. The site provides scroll-synced code tutorials with 5 examples (Basic, Sentiment, Expressiveness, Image Quality, Palatability), a code generator tool, and educational resources.

**Target Audience**: Consumer behavior researchers at journals like JCR - assume limited programming experience. Use plain language, not technical jargon.

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

### Three-Tab Application Structure

The app uses a simple tab-based navigation system controlled by state in `App.jsx`:

- **Tutorial Tab**: Scroll-synced code viewer with interactive line highlighting
- **Generator Tab**: Form-based Python code generator for LLM content coding
- **Resources Tab**: Placeholder for future tools and templates

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

1. **Model Selection** (`ModelSelector.jsx`): Choose between GPT-4 or Claude
   - Each model has different temperature ranges (OpenAI: 0-2, Anthropic: 0-1)
   - Different model variants (GPT-4 Turbo, Claude Sonnet 4, etc.)

2. **Settings Panel** (`SettingsPanel.jsx`): Configure parameters
   - Temperature, max tokens, repetitions
   - Ranges and defaults defined in `src/data/models.js`

3. **Template-based generation**: Uses string interpolation
   - Templates in `codeTemplates` object in `src/data/models.js`
   - Substitutes user inputs into Python code template
   - Generates production-ready OpenAI or Anthropic API code

4. **Code Output** (`CodeOutput.jsx`): Display with syntax highlighting and copy/download

### Styling System

**Tailwind Configuration**: `tailwind.config.js`

Custom color scheme:
- `primary`: Deep blue (#1e3a8a) - main brand color for headers, active tabs
- `accent`: Cyan (#0891b2) - secondary highlights
- `annotation`: Amber (#fbbf24) - for line number badges and highlights

**Button Design Pattern**:
- Inactive: `bg-slate-100 text-slate-700 font-medium`
- Active: `bg-slate-300 text-slate-700 font-bold shadow-lg`
- Hover/Active states use darker grays and bold text
- Consistent gray scheme throughout (no blue backgrounds for active buttons)

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
│   ├── Tutorial/
│   │   ├── TutorialSection.jsx     # Example tabs (Expressiveness, Image Quality, etc.)
│   │   └── ScrollSyncedCodeViewer.jsx  # Core scroll-sync + highlighting logic
│   ├── Generator/
│   │   ├── GeneratorSection.jsx    # Main generator component
│   │   ├── ModelSelector.jsx       # GPT-4 vs Claude selection
│   │   ├── SettingsPanel.jsx       # Temperature, tokens, repetitions
│   │   └── CodeOutput.jsx          # Display generated code
│   └── Resources/
│       └── ResourcesSection.jsx    # Placeholder section
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

## Known Constraints

- Line highlighting depends on accurate line numbers in `codeExamples.js` matching code after docstring removal
- Text wrapping uses aggressive `break-all` - may break words mid-character
- IntersectionObserver rootMargin tuned for desktop viewports
- All example Python files must use `?raw` import to load as strings
- Manual navigation temporarily disables scroll observer for 1 second - avoid rapid clicking
