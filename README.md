# Synthetic Psychometric Coders - Interactive Supplement

Interactive website supplement for the paper "From Human to Synthetic Coders" on using LLMs as Synthetic Psychometric Coders (SPCs) for consumer behavior research.

## Features

- **Interactive Tutorial**: 6-stage implementation walkthrough with annotated Python code
- **Code Generator**: Generate customized code for GPT-4 or Claude with model-specific settings
- **Resources**: Validation tools, templates, and best practices (coming soon)

## Tech Stack

- React + Vite
- Tailwind CSS
- React Syntax Highlighter
- Framer Motion

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This site is configured for deployment on Vercel:

1. Import the GitHub repository in Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

## Usage

### Tutorial Section
- Expand each stage to see annotated code examples
- Click numbered annotations to see detailed explanations
- Follow the 6-stage process from construct definition to deployment

### Code Generator
- Select your LLM provider (OpenAI or Anthropic)
- Enter your prompt template (use `{item}` as placeholder)
- Adjust settings (temperature, repetitions, max tokens)
- Copy or download the generated Python code

### Resources
- Placeholder section for future tools and templates

## Customization

To add your own content:

1. **Tutorial stages**: Edit `src/data/stages.js`
2. **Model configurations**: Edit `src/data/models.js`
3. **Code templates**: Update templates in `src/data/models.js`

## License

MIT
