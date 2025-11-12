// Import the raw Python code files as strings
import basicCode from './examples/basic_gpt4.py?raw';
import sentimentCode from './examples/sentiment_gpt4.py?raw';
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
    contentType: 'Images',
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
        lineEnd: 13,
        description: 'Set up API key, define 5 ratings per image, and list 3 sample image URLs.',
        details: [
          { line: 4, text: 'Store your OpenAI API key.' },
          { line: 5, text: 'Initialize the OpenAI client.' },
          { line: 7, text: 'Collect 5 ratings per image instead of 25 for simplicity.' },
          { line: 9, text: 'Hardcoded list of 3 image URLs - no CSV processing needed.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Prompt',
        lineStart: 15,
        lineEnd: 17,
        description: 'Simple rating prompt using 1-5 scale. Short and direct.',
        details: [
          { line: 15, text: 'Clear 1-5 scale with quality anchors.' },
          { line: 17, text: 'Request numeric-only response.' }
        ]
      },
      {
        id: 'function',
        title: 'Rating Function',
        lineStart: 19,
        lineEnd: 44,
        description: 'Single function to get ratings for one image. Contains all core API logic.',
        details: [
          { line: 20, text: 'Make API call to GPT-4 turbo model.' },
          { line: 26, text: 'Send prompt as text content.' },
          { line: 29, text: 'Send image as URL.' },
          { line: 34, text: 'Request 5 ratings in a single call.' },
          { line: 35, text: 'Limit to 10 tokens for brief responses.' },
          { line: 36, text: 'Temperature=1 for rating diversity.' },
          { line: 41, text: 'Extract each rating from the response.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Process',
        lineStart: 46,
        lineEnd: 54,
        description: 'Simple loop to rate all images and print results. No CSV export.',
        details: [
          { line: 46, text: 'Loop through the 3 hardcoded image URLs.' },
          { line: 48, text: 'Call rate_image() for each URL.' },
          { line: 51, text: 'Calculate and display average rating.' },
          { line: 53, text: 'Add 1-second delay between images.' }
        ]
      }
    ]
  },

  sentiment: {
    id: 'sentiment',
    title: 'Text Sentiment',
    model: 'GPT-4.1 (OpenAI)',
    contentType: 'Text',
    description: 'Rate sentiment of text responses from survey data',
    overview: extractDocstring(sentimentCode),
    code: removeDocstring(sentimentCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports',
        lineStart: 1,
        lineEnd: 4,
        description: 'Import essential libraries for API calls, CSV processing, and statistics.'
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 6,
        lineEnd: 12,
        description: 'Set up API credentials and file paths. Using 25 ratings per text for reliable sentiment estimates.',
        details: [
          { line: 6, text: 'Store your OpenAI API key.' },
          { line: 7, text: 'Initialize the OpenAI client.' },
          { line: 9, text: '25 ratings per text provides stable estimates.' },
          { line: 11, text: 'CSV file with ResponseID and ResponseText columns.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 14,
        lineEnd: 23,
        description: 'Define a clear 1-7 sentiment scale with anchors (1=Very Negative, 4=Neutral, 7=Very Positive).',
        details: [
          { line: 15, text: 'Position the LLM as a research assistant for consistency.' },
          { line: 16, text: '1-7 scale with clear negative-neutral-positive anchors.' },
          { line: 19, text: 'Strict formatting rules ensure numeric-only responses.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 25,
        lineEnd: 48,
        description: 'Core function that sends text to GPT-4 for sentiment rating. Returns 25 ratings for statistical analysis.',
        details: [
          { line: 26, text: 'Make API call to GPT-4 turbo model.' },
          { line: 31, text: 'Embed the text to rate directly in the prompt.' },
          { line: 35, text: 'Request 25 ratings in a single API call.' },
          { line: 36, text: 'Limit to 10 tokens (only need 1 digit).' },
          { line: 37, text: 'Temperature=1 for rating diversity.' },
          { line: 42, text: 'Extract each rating from the responses.' },
          { line: 46, text: 'Calculate mean and standard deviation.' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 50,
        lineEnd: 73,
        description: 'Process all responses from CSV. Load data, rate each text, and save results with all ratings for transparency.',
        details: [
          { line: 50, text: 'Load CSV file containing survey responses.' },
          { line: 53, text: 'Extract ResponseID and ResponseText from each row.' },
          { line: 57, text: 'Get 25 sentiment ratings for this text.' },
          { line: 59, text: 'Store results including original text and all ratings.' },
          { line: 68, text: 'Add 1-second delay between texts to respect rate limits.' },
          { line: 71, text: 'Save all results to CSV.' }
        ]
      }
    ]
  },

  expressiveness: {
    id: 'expressiveness',
    title: 'Emotional Expressiveness',
    model: 'GPT-4.1 (OpenAI)',
    contentType: 'Images',
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
        lineEnd: 13,
        description: 'Set up API credentials, file paths, and key parameters. Using 25 ratings per image following best practices for stable estimates.',
        details: [
          { line: 6, text: 'Store your OpenAI API key.' },
          { line: 7, text: 'Initialize the OpenAI client with your API key.' },
          { line: 9, text: '25 ratings per image provides stable mean estimates while balancing cost.' },
          { line: 11, text: 'CSV file containing image filenames to process.' },
          { line: 12, text: 'Base URL for S3-hosted images. Images are accessed via URLs rather than local files.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 15,
        lineEnd: 29,
        description: 'Define the prompt that instructs the LLM on how to rate images. Clear scale definition (1-7) and strict output formatting are critical for consistent results.',
        details: [
          { line: 15, text: 'Multi-line string containing the full rating prompt.' },
          { line: 21, text: 'Explicit scale definition with anchors (1=low, 7=high expression).' },
          { line: 24, text: 'Strict formatting rules ensure numeric-only responses for easy parsing.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 31,
        lineEnd: 63,
        description: 'Core function that makes API calls to GPT-4.1 for rating images. Returns multiple ratings per image for statistical analysis.',
        details: [
          { line: 32, text: 'Start the API call using OpenAI\'s chat completions endpoint.' },
          { line: 33, text: 'model: GPT-4.1 model optimized for vision tasks.' },
          { line: 38, text: 'Combine text prompt with image in a single message.' },
          { line: 42, text: 'image_url: URL of the S3-hosted image to rate.' },
          { line: 43, text: 'detail="high": Request high-resolution image analysis for better quality.' },
          { line: 49, text: 'n: Request 25 ratings in a single API call (more efficient than 25 separate calls).' },
          { line: 50, text: 'max_tokens: Limit response to 10 tokens (only need 1-2 digits for rating).' },
          { line: 51, text: 'temperature=1: Higher diversity in ratings to capture full distribution.' },
          { line: 55, text: 'Loop through all 25 responses returned by the API.' },
          { line: 56, text: 'Parse each rating to integer.' },
          { line: 60, text: 'Calculate mean and standard deviation across the 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 65,
        lineEnd: 90,
        description: 'Process multiple images from a CSV file. Constructs URLs, calls the rating function for each image, and saves results to a new CSV.',
        details: [
          { line: 65, text: 'Load CSV file containing image filenames.' },
          { line: 68, text: 'Construct full S3 URL by combining base URL with filename.' },
          { line: 73, text: 'Get 25 ratings for this image (single API call).' },
          { line: 75, text: 'Store results: filename, average rating, standard deviation, and all raw ratings.' },
          { line: 82, text: 'Add 1-second delay between images to respect API rate limits.' },
          { line: 85, text: 'Save all results to CSV for analysis.' },
          { line: 88, text: 'Print summary statistics.' }
        ]
      }
    ]
  },

  imageQuality: {
    id: 'imageQuality',
    title: 'Image Quality',
    model: 'GPT-4.1 (OpenAI)',
    contentType: 'Images',
    description: 'Rate image quality using GPT-4.1 with base64-encoded local images',
    overview: extractDocstring(imageQualityCode),
    code: removeDocstring(imageQualityCode),
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 6,
        description: 'Import required libraries including base64 for encoding local image files.',
        details: [
          { line: 5, text: 'base64: Encode image files as strings for API transmission.' },
          { line: 6, text: 'os: Navigate local file system to find images.' }
        ]
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 8,
        lineEnd: 14,
        description: 'Set up paths for local image folder processing. Using a 1-100 scale instead of 1-7 for finer granularity.',
        details: [
          { line: 8, text: 'Store API key. Never commit keys to version control.' },
          { line: 11, text: '25 ratings per image for stable estimates.' },
          { line: 13, text: 'Path to folder containing local image files.' },
          { line: 14, text: 'Output CSV will contain quality ratings for all images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 16,
        lineEnd: 29,
        description: 'Prompt designed for image quality assessment on 1-100 scale. Distinguishes between quality and aesthetics, providing clear anchor points.',
        details: [
          { line: 17, text: 'Key instruction: Focus on quality (resolution, clarity) not aesthetics (composition, subject).' },
          { line: 18, text: '1-100 scale with labeled anchors (Bad, Poor, Fair, Good, Excellent) for consistency.' }
        ]
      },
      {
        id: 'encoding',
        title: 'Image Encoding',
        lineStart: 31,
        lineEnd: 33,
        description: 'Function to convert local image files to base64-encoded strings for API transmission.',
        details: [
          { line: 32, text: 'Read image as binary and convert to base64 string for embedding in API request.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 35,
        lineEnd: 69,
        description: 'Core rating function using base64-encoded images instead of URLs. Otherwise similar to URL-based approach.',
        details: [
          { line: 36, text: 'Encode the local image file to base64 string.' },
          { line: 38, text: 'Start GPT-4.1 API call for image quality rating.' },
          { line: 39, text: 'model: GPT-4.1 for vision-language tasks.' },
          { line: 48, text: 'Format as data URI: "data:image/png;base64,{encoded_string}".' },
          { line: 49, text: 'detail="high": High-resolution analysis important for quality assessment.' },
          { line: 55, text: 'n=25: Request all 25 ratings in one API call.' },
          { line: 56, text: 'max_tokens=10: Brief responses (just need the number).' },
          { line: 57, text: 'temperature=1: Full diversity in ratings.' },
          { line: 62, text: 'Parse each rating from the responses.' }
        ]
      },
      {
        id: 'processing',
        title: 'Folder Processing',
        lineStart: 71,
        lineEnd: 95,
        description: 'Process all images in a local folder. Scans for image files, rates each one, and saves results to CSV.',
        details: [
          { line: 71, text: 'Scan folder for image files (.png, .jpg, .jpeg, .gif, .bmp).' },
          { line: 74, text: 'Construct full file path for each image.' },
          { line: 78, text: 'Call rating function which handles base64 encoding internally.' },
          { line: 87, text: 'Add 1-second delay to avoid rate limits.' },
          { line: 90, text: 'Save all results to CSV.' },
          { line: 93, text: 'Print summary statistics.' }
        ]
      }
    ]
  },

  palatability: {
    id: 'palatability',
    title: 'Food Palatability',
    model: 'Llama 4 Maverick (DeepInfra)',
    contentType: 'Images',
    description: 'Rate food palatability using open-source Llama 4 via DeepInfra',
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
        lineEnd: 16,
        description: 'Configure for Llama 4 via DeepInfra. Note the base_url change to DeepInfra endpoint.',
        details: [
          { line: 6, text: 'DeepInfra API key (different from OpenAI).' },
          { line: 7, text: 'base_url: Point OpenAI SDK to DeepInfra endpoint instead of OpenAI.' },
          { line: 12, text: '25 ratings per image, collected in a single API call.' },
          { line: 14, text: 'CSV with image filenames.' },
          { line: 15, text: 'Base URL for S3 bucket hosting food images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 18,
        lineEnd: 28,
        description: 'Palatability prompt using 1-100 scale. Simple and direct - open-source models sometimes perform better with simpler prompts.',
        details: [
          { line: 18, text: 'Context: "Average US participant from mTurk" helps ground the LLM\'s perspective.' },
          { line: 20, text: 'Single clear question: "How palatable is this food?"' },
          { line: 21, text: '1-100 scale from "Not at all" to "Extremely" palatable.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 30,
        lineEnd: 59,
        description: 'Core rating function for Llama 4. Makes single API call requesting 25 ratings at once.',
        details: [
          { line: 31, text: 'Start API call to DeepInfra Llama endpoint.' },
          { line: 32, text: 'model: Llama 4 Maverick 17B model hosted on DeepInfra.' },
          { line: 45, text: 'n: Request 25 ratings in single call.' },
          { line: 47, text: 'temperature=1: Same as GPT examples for consistency.' },
          { line: 51, text: 'Parse ratings from all responses.' },
          { line: 56, text: 'Calculate statistics across the 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'CSV Processing',
        lineStart: 61,
        lineEnd: 86,
        description: 'Process images from CSV. Same structure as other examples - load CSV, construct URLs, collect ratings, save results.',
        details: [
          { line: 61, text: 'Load CSV containing image filenames.' },
          { line: 64, text: 'Construct S3 URL from base URL + filename.' },
          { line: 69, text: 'Call rating function to get 25 ratings.' },
          { line: 78, text: 'Delay between images to respect rate limits.' },
          { line: 81, text: 'Save results to CSV.' },
          { line: 84, text: 'Print summary statistics.' }
        ]
      }
    ]
  }
};
