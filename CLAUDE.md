# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive website supplement for "From Human to Synthetic Coders" - an academic paper on using LLMs as Synthetic Content Coders for research. The site provides scroll-synced code tutorials, a code generator tool, and educational resources.

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

3. **Synchronized description panel**: Right panel (30% width) displays description for the currently visible section
   - Uses Framer Motion for smooth transitions between descriptions
   - Shows section title, description, and line-by-line "Key Details"

4. **Click-to-highlight feature**: Line numbers in "Key Details" are clickable buttons
   - Clicking scrolls to that line's section
   - Highlights the specific line with blue background via `lineProps` on SyntaxHighlighter
   - State tracked in `highlightedLine`

### Code Examples Data Structure

**File**: `src/data/codeExamples.js`

Each example has:
- `code`: Raw Python code imported from `src/data/examples/*.py` using Vite's `?raw` import
- `sections[]`: Array of section definitions with:
  - `lineStart`, `lineEnd`: Define which lines belong to this section
  - `title`, `description`: Basic section info
  - `details[]`: Line-specific annotations with `{line: number, text: string}`

The component groups consecutive lines by section to render them in blocks with sticky headers.

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
│   └── examples/                   # Production Python code files
│       ├── expressiveness_gpt4.py
│       ├── image_quality_gpt4.py
│       └── palatability_llama4.py
└── App.jsx                         # Main app with tab state
```

## Working with Code Examples

### Adding a New Tutorial Example

1. Add Python file to `src/data/examples/your_example.py`
2. Import in `codeExamples.js` using `?raw`: `import yourCode from './examples/your_example.py?raw';`
3. Add new entry to `codeExamples` object with sections defined
4. Add tab configuration to `exampleTabs` array in `TutorialSection.jsx`

### Modifying Section Descriptions

Edit `src/data/codeExamples.js` - each section's `description` and `details[]` array. Line numbers in `details` must match actual code line numbers for click-to-highlight to work correctly.

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

## Known Constraints

- Line highlighting depends on accurate line numbers in `codeExamples.js`
- Text wrapping uses aggressive `break-all` - may break words mid-character
- IntersectionObserver rootMargin tuned for desktop viewports
- Three example Python files must use `?raw` import to load as strings
