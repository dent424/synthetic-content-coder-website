// Import the raw Python code files as strings
import expressivenessCode from './examples/expressiveness_gpt4.py?raw';
import imageQualityCode from './examples/image_quality_gpt4.py?raw';
import palatabilityCode from './examples/palatability_llama4.py?raw';

export const codeExamples = {
  expressiveness: {
    id: 'expressiveness',
    title: 'Emotional Expressiveness',
    model: 'GPT-4.1 (OpenAI)',
    description: 'Rate facial emotional expressions using GPT-4.1 with URL-based S3 images',
    code: expressivenessCode,
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 12,
        description: 'Import required Python libraries for API calls, data processing, and statistical calculations.'
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 14,
        lineEnd: 27,
        description: 'Set up API credentials, file paths, and key parameters. Using 25 ratings per image following best practices for stable estimates.',
        details: [
          { line: 17, text: 'Store your OpenAI API key. Use environment variables in production.' },
          { line: 18, text: 'Initialize the OpenAI client with your API key.' },
          { line: 22, text: '25 ratings per image provides stable mean estimates while balancing cost.' },
          { line: 25, text: 'CSV file containing image filenames to process.' },
          { line: 26, text: 'Base URL for S3-hosted images. Images are accessed via URLs rather than local files.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 29,
        lineEnd: 39,
        description: 'Define the prompt that instructs the LLM on how to rate images. Clear scale definition (1-7) and strict output formatting are critical for consistent results.',
        details: [
          { line: 29, text: 'Multi-line string containing the full rating prompt.' },
          { line: 32, text: 'Explicit scale definition with anchors (1=low, 7=high expression).' },
          { line: 35, text: 'Strict formatting rules ensure numeric-only responses for easy parsing.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 42,
        lineEnd: 105,
        description: 'Core function that makes API calls to GPT-4.1 for rating images. Returns multiple ratings per image for statistical analysis.',
        details: [
          { line: 55, text: 'Start the API call using OpenAI\'s chat completions endpoint.' },
          { line: 56, text: 'model: GPT-4.1 turbo model optimized for vision tasks.' },
          { line: 61, text: 'Combine text prompt with image in a single message.' },
          { line: 65, text: 'image_url: URL of the S3-hosted image to rate.' },
          { line: 66, text: 'detail="high": Request high-resolution image analysis for better quality.' },
          { line: 72, text: 'n: Request 25 ratings in a single API call (more efficient than 25 separate calls).' },
          { line: 73, text: 'max_tokens: Limit response to 10 tokens (only need 1-2 digits for rating).' },
          { line: 74, text: 'temperature=1: Higher diversity in ratings to capture full distribution.' },
          { line: 78, text: 'Loop through all 25 responses returned by the API.' },
          { line: 83, text: 'Parse and validate each rating to ensure it\'s numeric and in range (1-7).' },
          { line: 94, text: 'Calculate mean and standard deviation across the 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 108,
        lineEnd: 160,
        description: 'Process multiple images from a CSV file. Constructs URLs, calls the rating function for each image, and saves results to a new CSV.',
        details: [
          { line: 116, text: 'Load CSV file containing image filenames.' },
          { line: 124, text: 'Construct full S3 URL by combining base URL with filename.' },
          { line: 129, text: 'Get 25 ratings for this image (single API call).' },
          { line: 132, text: 'Store results: filename, average rating, standard deviation, and all raw ratings.' },
          { line: 141, text: 'Add 1-second delay between images to respect API rate limits.' },
          { line: 145, text: 'Save all results to CSV for analysis and transparency.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 163,
        lineEnd: 168,
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
    code: imageQualityCode,
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 15,
        description: 'Import required libraries including base64 for encoding local image files.',
        details: [
          { line: 14, text: 'base64: Encode image files as strings for API transmission.' },
          { line: 15, text: 'os: Navigate local file system to find images.' }
        ]
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 17,
        lineEnd: 32,
        description: 'Set up paths for local image folder processing. Using a 1-100 scale instead of 1-7 for finer granularity.',
        details: [
          { line: 20, text: 'Store API key. Never commit keys to version control.' },
          { line: 25, text: '25 ratings per image for stable estimates.' },
          { line: 27, text: 'Path to folder containing local image files.' },
          { line: 28, text: 'Output CSV will contain quality ratings for all images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 30,
        lineEnd: 47,
        description: 'Prompt designed for image quality assessment on 1-100 scale. Distinguishes between quality and aesthetics, providing clear anchor points.',
        details: [
          { line: 34, text: 'Key instruction: Focus on quality (resolution, clarity) not aesthetics (composition, subject).' },
          { line: 36, text: '1-100 scale with labeled anchors (Bad, Poor, Fair, Good, Excellent) for consistency.' }
        ]
      },
      {
        id: 'encoding',
        title: 'Image Encoding',
        lineStart: 49,
        lineEnd: 52,
        description: 'Function to convert local image files to base64-encoded strings for API transmission.',
        details: [
          { line: 51, text: 'Read image as binary and convert to base64 string for embedding in API request.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 55,
        lineEnd: 119,
        description: 'Core rating function using base64-encoded images instead of URLs. Otherwise similar to URL-based approach.',
        details: [
          { line: 64, text: 'Encode the local image file to base64 string.' },
          { line: 69, text: 'Start GPT-4.1 API call for image quality rating.' },
          { line: 70, text: 'model: GPT-4.1 for vision-language tasks.' },
          { line: 79, text: 'Format as data URI: "data:image/png;base64,{encoded_string}".' },
          { line: 80, text: 'detail="high": High-resolution analysis important for quality assessment.' },
          { line: 86, text: 'n=25: Request all 25 ratings in one API call.' },
          { line: 87, text: 'max_tokens=10: Brief responses (just need the number).' },
          { line: 88, text: 'temperature=1: Full diversity in ratings.' },
          { line: 97, text: 'Validate ratings are within 1-100 range.' }
        ]
      },
      {
        id: 'processing',
        title: 'Folder Processing',
        lineStart: 122,
        lineEnd: 177,
        description: 'Process all images in a local folder. Scans for image files, rates each one, and saves results to CSV.',
        details: [
          { line: 135, text: 'Scan folder for image files (.png, .jpg, .jpeg, .gif, .bmp).' },
          { line: 141, text: 'Construct full file path for each image.' },
          { line: 146, text: 'Call rating function which handles base64 encoding internally.' },
          { line: 157, text: 'Add 1-second delay to avoid rate limits.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 180,
        lineEnd: 186,
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
    code: palatabilityCode,
    sections: [
      {
        id: 'imports',
        title: 'Imports & Setup',
        lineStart: 1,
        lineEnd: 12,
        description: 'Same imports as GPT examples - OpenAI SDK works with DeepInfra API.',
        details: []
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 14,
        lineEnd: 28,
        description: 'Configure for Llama 4 via DeepInfra. Note the base_url change and batching strategy.',
        details: [
          { line: 13, text: 'DeepInfra API key (different from OpenAI).' },
          { line: 15, text: 'base_url: Point OpenAI SDK to DeepInfra endpoint instead of OpenAI.' },
          { line: 19, text: 'BATCH=4: Llama API has stricter limits, so batch ratings (4 per call instead of 25).' },
          { line: 20, text: 'TOTAL_RATINGS=25: Still collect 25 total, but spread across multiple calls.' },
          { line: 23, text: 'CSV with image filenames.' },
          { line: 24, text: 'Base URL for S3 bucket hosting food images.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 26,
        lineEnd: 38,
        description: 'Palatability prompt using 1-100 scale. Simple and direct - open-source models sometimes perform better with simpler prompts.',
        details: [
          { line: 30, text: 'Context: "Average US participant from mTurk" helps ground the LLM\'s perspective.' },
          { line: 31, text: 'Single clear question: "How palatable is this food?"' },
          { line: 32, text: '1-100 scale from "Not at all" to "Extremely" palatable.' }
        ]
      },
      {
        id: 'api-call',
        title: 'Batched API Call Function',
        lineStart: 41,
        lineEnd: 106,
        description: 'Core rating function with batching strategy. Makes multiple API calls of 4 ratings each until reaching 25 total.',
        details: [
          { line: 53, text: 'ratings list will be populated across multiple API calls.' },
          { line: 55, text: 'While loop continues until we have 25 total ratings.' },
          { line: 57, text: 'Try-except with retry logic handles API errors gracefully.' },
          { line: 58, text: 'model: Llama 4 Maverick 17B model hosted on DeepInfra.' },
          { line: 73, text: 'n: Request min(4, remaining) ratings. Last batch might be < 4.' },
          { line: 75, text: 'temperature=1: Same as GPT examples for consistency.' },
          { line: 95, text: 'On API error, wait 2 seconds and retry (continue loop).' },
          { line: 100, text: 'After loop completes, calculate statistics across all 25 ratings.' }
        ]
      },
      {
        id: 'processing',
        title: 'CSV Processing',
        lineStart: 108,
        lineEnd: 161,
        description: 'Process images from CSV with batched rating collection. Same overall structure as other examples.',
        details: [
          { line: 118, text: 'Load CSV containing image filenames.' },
          { line: 124, text: 'Construct S3 URL from base URL + filename.' },
          { line: 129, text: 'Call batched rating function (makes multiple API calls internally).' },
          { line: 141, text: 'Delay between images to respect rate limits.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Execution',
        lineStart: 164,
        lineEnd: 170,
        description: 'Entry point for the script.',
        details: []
      }
    ]
  }
};
