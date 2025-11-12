// Import the raw Python code files as strings
import basicCode from './examples/basic_gpt4.py?raw';
import expressivenessCode from './examples/expressiveness_gpt4.py?raw';
import imageQualityCode from './examples/image_quality_gpt4.py?raw';
import palatabilityCode from './examples/palatability_llama4.py?raw';

// Helper function to extract docstring from Python code
function extractDocstring(code) {
  const docstringMatch = code.match(/^#.*\n"""([\s\S]*?)"""/);
  if (docstringMatch) {
    return docstringMatch[1].trim();
  }
  return '';
}

// Helper function to remove docstring from code for display
function removeDocstring(code) {
  return code.replace(/^#.*\n"""[\s\S]*?"""\n\n/, '');
}

export const codeExamples = {
  basic: {
    id: 'basic',
    title: 'Basic Rating',
    model: 'GPT-4.1 (OpenAI)',
    description: 'Simplest example: Rate 3 images with minimal code',
    overview: extractDocstring(basicCode),
    code: removeDocstring(basicCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports',
        lineStart: 1,
        lineEnd: 2,
        description: 'Import only essential libraries: time for delays and OpenAI for API calls.'
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 4,
        lineEnd: 17,
        description: 'Set up API key, define 5 ratings per image, and list 3 sample image URLs.',
        details: [
          { line: 6, text: 'Store your OpenAI API key.' },
          { line: 7, text: 'Initialize the OpenAI client.' },
          { line: 10, text: 'Collect 5 ratings per image instead of 25 for simplicity.' },
          { line: 13, text: 'Hardcoded list of 3 image URLs - no CSV processing needed.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Prompt',
        lineStart: 19,
        lineEnd: 23,
        description: 'Simple rating prompt using 1-5 scale. Short and direct.',
        details: [
          { line: 21, text: 'Clear 1-5 scale with quality anchors.' },
          { line: 23, text: 'Request numeric-only response.' }
        ]
      },
      {
        id: 'function',
        title: 'Rating Function',
        lineStart: 25,
        lineEnd: 73,
        description: 'Single function to get ratings for one image. Contains all core API logic.',
        details: [
          { line: 31, text: 'Make API call to GPT-4 turbo model.' },
          { line: 39, text: 'Send prompt as text content.' },
          { line: 42, text: 'Send image as URL.' },
          { line: 49, text: 'Request 5 ratings in a single call.' },
          { line: 50, text: 'Limit to 10 tokens for brief responses.' },
          { line: 51, text: 'Temperature=1 for rating diversity.' },
          { line: 55, text: 'Extract and validate each rating (1-5 range).' }
        ]
      },
      {
        id: 'main',
        title: 'Main Process',
        lineStart: 75,
        lineEnd: 100,
        description: 'Simple loop to rate all images and print results. No CSV export.',
        details: [
          { line: 82, text: 'Loop through the 3 hardcoded image URLs.' },
          { line: 83, text: 'Call rate_image() for each URL.' },
          { line: 86, text: 'Calculate and display average rating.' },
          { line: 93, text: 'Add 1-second delay between images.' }
        ]
      }
    ]
  },

  expressiveness: {
    id: 'expressiveness',
    title: 'Emotional Expressiveness',
    model: 'GPT-4.1 (OpenAI)',
    description: 'Rate facial emotional expressions using GPT-4.1 with URL-based S3 images',
    overview: extractDocstring(expressivenessCode),
    code: removeDocstring(expressivenessCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 4,
        description: 'Import required Python libraries for API calls, data processing, and statistical calculations.'
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 6,
        lineEnd: 19,
        description: 'Set up API credentials, file paths, and key parameters. Using 25 ratings per image following best practices for stable estimates.',
        details: [
          { line: 9, text: 'Store your OpenAI API key. Use environment variables in production.' },
          { line: 10, text: 'Initialize the OpenAI client with your API key.' },
          { line: 14, text: '25 ratings per image provides stable mean estimates while balancing cost.' },
          { line: 17, text: 'CSV file containing image filenames to process.' },
          { line: 18, text: 'Base URL for S3-hosted images. Images are accessed via URLs rather than local files.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 21,
        lineEnd: 35,
        description: 'Define the prompt that instructs the LLM on how to rate images. Clear scale definition (1-7) and strict output formatting are critical for consistent results.',
        details: [
          { line: 21, text: 'Multi-line string containing the full rating prompt.' },
          { line: 24, text: 'Explicit scale definition with anchors (1=low, 7=high expression).' },
          { line: 27, text: 'Strict formatting rules ensure numeric-only responses for easy parsing.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 34,
        lineEnd: 97,
        description: 'Core function that makes API calls to GPT-4.1 for rating images. Returns multiple ratings per image for statistical analysis.',
        details: [
          { line: 47, text: 'Start the API call using OpenAI\'s chat completions endpoint.' },
          { line: 48, text: 'model: GPT-4.1 turbo model optimized for vision tasks.' },
          { line: 53, text: 'Combine text prompt with image in a single message.' },
          { line: 57, text: 'image_url: URL of the S3-hosted image to rate.' },
          { line: 58, text: 'detail="high": Request high-resolution image analysis for better quality.' },
          { line: 64, text: 'n: Request 25 ratings in a single API call (more efficient than 25 separate calls).' },
          { line: 65, text: 'max_tokens: Limit response to 10 tokens (only need 1-2 digits for rating).' },
          { line: 66, text: 'temperature=1: Higher diversity in ratings to capture full distribution.' },
          { line: 70, text: 'Loop through all 25 responses returned by the API.' },
          { line: 75, text: 'Parse and validate each rating to ensure it\'s numeric and in range (1-7).' },
          { line: 86, text: 'Calculate mean and standard deviation across the 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 100,
        lineEnd: 152,
        description: 'Process multiple images from a CSV file. Constructs URLs, calls the rating function for each image, and saves results to a new CSV.',
        details: [
          { line: 108, text: 'Load CSV file containing image filenames.' },
          { line: 116, text: 'Construct full S3 URL by combining base URL with filename.' },
          { line: 121, text: 'Get 25 ratings for this image (single API call).' },
          { line: 124, text: 'Store results: filename, average rating, standard deviation, and all raw ratings.' },
          { line: 133, text: 'Add 1-second delay between images to respect API rate limits.' },
          { line: 137, text: 'Save all results to CSV for analysis and transparency.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 155,
        lineEnd: 160,
        description: 'Entry point for the script. Runs the batch processing function when script is executed directly.',
        details: []
      }
    ]
  },

  imageQuality: {
    id: 'imageQuality',
    title: 'Image Quality',
    model: 'GPT-4.1 (OpenAI)',
    description: 'Rate image quality using GPT-4.1 with base64-encoded local images',
    overview: extractDocstring(imageQualityCode),
    code: removeDocstring(imageQualityCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 7,
        description: 'Import required libraries including base64 for encoding local image files.',
        details: [
          { line: 6, text: 'base64: Encode image files as strings for API transmission.' },
          { line: 7, text: 'os: Navigate local file system to find images.' }
        ]
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 9,
        lineEnd: 24,
        description: 'Set up paths for local image folder processing. Using a 1-100 scale instead of 1-7 for finer granularity.',
        details: [
          { line: 12, text: 'Store API key. Never commit keys to version control.' },
          { line: 17, text: '25 ratings per image for stable estimates.' },
          { line: 19, text: 'Path to folder containing local image files.' },
          { line: 20, text: 'Output CSV will contain quality ratings for all images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 22,
        lineEnd: 39,
        description: 'Prompt designed for image quality assessment on 1-100 scale. Distinguishes between quality and aesthetics, providing clear anchor points.',
        details: [
          { line: 26, text: 'Key instruction: Focus on quality (resolution, clarity) not aesthetics (composition, subject).' },
          { line: 28, text: '1-100 scale with labeled anchors (Bad, Poor, Fair, Good, Excellent) for consistency.' }
        ]
      },
      {
        id: 'encoding',
        title: 'Image Encoding',
        lineStart: 41,
        lineEnd: 44,
        description: 'Function to convert local image files to base64-encoded strings for API transmission.',
        details: [
          { line: 43, text: 'Read image as binary and convert to base64 string for embedding in API request.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 47,
        lineEnd: 111,
        description: 'Core rating function using base64-encoded images instead of URLs. Otherwise similar to URL-based approach.',
        details: [
          { line: 56, text: 'Encode the local image file to base64 string.' },
          { line: 61, text: 'Start GPT-4.1 API call for image quality rating.' },
          { line: 62, text: 'model: GPT-4.1 for vision-language tasks.' },
          { line: 71, text: 'Format as data URI: "data:image/png;base64,{encoded_string}".' },
          { line: 72, text: 'detail="high": High-resolution analysis important for quality assessment.' },
          { line: 78, text: 'n=25: Request all 25 ratings in one API call.' },
          { line: 79, text: 'max_tokens=10: Brief responses (just need the number).' },
          { line: 80, text: 'temperature=1: Full diversity in ratings.' },
          { line: 89, text: 'Validate ratings are within 1-100 range.' }
        ]
      },
      {
        id: 'processing',
        title: 'Folder Processing',
        lineStart: 114,
        lineEnd: 169,
        description: 'Process all images in a local folder. Scans for image files, rates each one, and saves results to CSV.',
        details: [
          { line: 127, text: 'Scan folder for image files (.png, .jpg, .jpeg, .gif, .bmp).' },
          { line: 133, text: 'Construct full file path for each image.' },
          { line: 138, text: 'Call rating function which handles base64 encoding internally.' },
          { line: 149, text: 'Add 1-second delay to avoid rate limits.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 172,
        lineEnd: 178,
        description: 'Entry point that processes the configured image folder.',
        details: []
      }
    ]
  },

  palatability: {
    id: 'palatability',
    title: 'Food Palatability',
    model: 'Llama 4 Maverick (DeepInfra)',
    description: 'Rate food palatability using open-source Llama 4 with batched API calls',
    overview: extractDocstring(palatabilityCode),
    code: removeDocstring(palatabilityCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 4,
        description: 'Same imports as GPT examples - OpenAI SDK works with DeepInfra API.',
        details: []
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 6,
        lineEnd: 20,
        description: 'Configure for Llama 4 via DeepInfra. Note the base_url change and batching strategy.',
        details: [
          { line: 8, text: 'DeepInfra API key (different from OpenAI).' },
          { line: 10, text: 'base_url: Point OpenAI SDK to DeepInfra endpoint instead of OpenAI.' },
          { line: 14, text: 'BATCH=4: Llama API has stricter limits, so batch ratings (4 per call instead of 25).' },
          { line: 15, text: 'TOTAL_RATINGS=25: Still collect 25 total, but spread across multiple calls.' },
          { line: 18, text: 'CSV with image filenames.' },
          { line: 19, text: 'Base URL for S3 bucket hosting food images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 22,
        lineEnd: 34,
        description: 'Palatability prompt using 1-100 scale. Simple and direct - open-source models sometimes perform better with simpler prompts.',
        details: [
          { line: 26, text: 'Context: "Average US participant from mTurk" helps ground the LLM\'s perspective.' },
          { line: 27, text: 'Single clear question: "How palatable is this food?"' },
          { line: 28, text: '1-100 scale from "Not at all" to "Extremely" palatable.' }
        ]
      },
      {
        id: 'api-call',
        title: 'Batched API Call Function',
        lineStart: 37,
        lineEnd: 102,
        description: 'Core rating function with batching strategy. Makes multiple API calls of 4 ratings each until reaching 25 total.',
        details: [
          { line: 45, text: 'ratings list will be populated across multiple API calls.' },
          { line: 47, text: 'While loop continues until we have 25 total ratings.' },
          { line: 49, text: 'Try-except with retry logic handles API errors gracefully.' },
          { line: 50, text: 'model: Llama 4 Maverick 17B model hosted on DeepInfra.' },
          { line: 65, text: 'n: Request min(4, remaining) ratings. Last batch might be < 4.' },
          { line: 67, text: 'temperature=1: Same as GPT examples for consistency.' },
          { line: 87, text: 'On API error, wait 2 seconds and retry (continue loop).' },
          { line: 92, text: 'After loop completes, calculate statistics across all 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'CSV Processing',
        lineStart: 100,
        lineEnd: 153,
        description: 'Process images from CSV with batched rating collection. Same overall structure as other examples.',
        details: [
          { line: 110, text: 'Load CSV containing image filenames.' },
          { line: 116, text: 'Construct S3 URL from base URL + filename.' },
          { line: 121, text: 'Call batched rating function (makes multiple API calls internally).' },
          { line: 133, text: 'Delay between images to respect rate limits.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 156,
        lineEnd: 162,
        description: 'Entry point for the script.',
        details: []
      }
    ]
  }
};
