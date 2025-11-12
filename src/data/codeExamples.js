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
          { line: 4, text: 'Your OpenAI account key goes here - you get this from the OpenAI website.' },
          { line: 5, text: 'This connects your script to OpenAI so you can send images to GPT-4.' },
          { line: 7, text: 'Number of independent ratings to collect for each image (5 is quick for testing).' },
          { line: 9, text: 'List of 3 example image web addresses - this keeps things simple for learning.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Prompt',
        lineStart: 15,
        lineEnd: 17,
        description: 'Simple rating prompt using 1-5 scale. Short and direct.',
        details: [
          { line: 15, text: 'The instructions you give to the AI - tells it to rate quality from 1 (low) to 5 (high).' },
          { line: 17, text: 'Asking for just a number makes the responses easy to analyze.' }
        ]
      },
      {
        id: 'function',
        title: 'Rating Function',
        lineStart: 19,
        lineEnd: 44,
        description: 'Single function to get ratings for one image. Contains all core API logic.',
        details: [
          { line: 20, text: 'This sends your image and instructions to GPT-4 for rating.' },
          { line: 26, text: 'Include your rating instructions (the prompt from above).' },
          { line: 29, text: 'Include the web address of the image you want rated.' },
          { line: 34, text: 'Get 5 independent ratings in one request (more efficient than 5 separate requests).' },
          { line: 35, text: 'Limit how long the response can be (we only need 1-2 characters for a rating).' },
          { line: 36, text: 'Temperature controls randomness - setting it to 1 gives you variety in the ratings.' },
          { line: 41, text: 'Pull out each of the 5 ratings from what GPT-4 sent back.' }
        ]
      },
      {
        id: 'main',
        title: 'Main Process',
        lineStart: 46,
        lineEnd: 54,
        description: 'Simple loop to rate all images and print results. No CSV export.',
        details: [
          { line: 46, text: 'Go through each of the 3 image addresses one at a time.' },
          { line: 48, text: 'Get ratings for this image using the function above.' },
          { line: 51, text: 'Calculate the average of the 5 ratings and show it on screen.' },
          { line: 53, text: 'Wait 1 second before the next image (prevents overwhelming the API).' }
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
          { line: 6, text: 'Your OpenAI account key - get this from openai.com after creating an account.' },
          { line: 7, text: 'This connects your script to OpenAI so you can send text to GPT-4.' },
          { line: 9, text: 'Number of independent ratings per text response (25 gives reliable averages).' },
          { line: 11, text: 'Location of your spreadsheet file with survey responses to analyze.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 14,
        lineEnd: 23,
        description: 'Define a clear 1-7 sentiment scale with anchors (1=Very Negative, 4=Neutral, 7=Very Positive).',
        details: [
          { line: 15, text: 'Tell the AI to act like a research assistant - this helps it stay consistent.' },
          { line: 16, text: 'Define the scale with clear labels: 1=Very Negative, 4=Neutral, 7=Very Positive.' },
          { line: 19, text: 'Ask for just a number so the responses are easy to put into a spreadsheet.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 25,
        lineEnd: 48,
        description: 'Core function that sends text to GPT-4 for sentiment rating. Returns 25 ratings for statistical analysis.',
        details: [
          { line: 26, text: 'Send the text response to GPT-4 for rating.' },
          { line: 31, text: 'Include both your instructions and the actual text you want rated.' },
          { line: 35, text: 'Request 25 independent ratings at once (saves time and money).' },
          { line: 36, text: 'Keep responses short - we only need 1 character for the rating number.' },
          { line: 37, text: 'Temperature=1 introduces randomness so ratings vary (like having multiple coders).' },
          { line: 42, text: 'Pull out each individual rating from the 25 responses GPT-4 returned.' },
          { line: 46, text: 'Calculate the average rating and how much ratings varied (standard deviation).' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 50,
        lineEnd: 73,
        description: 'Process all responses from CSV. Load data, rate each text, and save results with all ratings for transparency.',
        details: [
          { line: 50, text: 'Read in your spreadsheet file with all the survey responses.' },
          { line: 53, text: 'Get the response ID and text from each row of your spreadsheet.' },
          { line: 57, text: 'Get 25 sentiment ratings for this particular response.' },
          { line: 59, text: 'Save the response ID, text, average rating, and all 25 individual ratings.' },
          { line: 68, text: 'Wait 1 second between responses (OpenAI limits how fast you can send requests).' },
          { line: 71, text: 'Export all your results to a new spreadsheet file.' }
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
          { line: 6, text: 'Your OpenAI account key - sign up at openai.com to get one.' },
          { line: 7, text: 'This connects your script to OpenAI so you can send images to GPT-4.' },
          { line: 9, text: '25 ratings per image gives reliable averages without costing too much.' },
          { line: 11, text: 'Spreadsheet file listing all the image filenames you want to rate.' },
          { line: 12, text: 'Web address where your images are stored (like on Amazon S3 or similar).' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 15,
        lineEnd: 29,
        description: 'Define the prompt that instructs the LLM on how to rate images. Clear scale definition (1-7) and strict output formatting are critical for consistent results.',
        details: [
          { line: 15, text: 'Your instructions to the AI - this is like the coding instructions you\'d give a human research assistant.' },
          { line: 21, text: 'Define the scale: 1=low expression, 7=high expression. Clear anchors help consistency.' },
          { line: 24, text: 'Ask for just numbers - this makes it easy to analyze the results in Excel or SPSS.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 31,
        lineEnd: 63,
        description: 'Core function that makes API calls to GPT-4.1 for rating images. Returns multiple ratings per image for statistical analysis.',
        details: [
          { line: 32, text: 'Send the image to GPT-4 for rating.' },
          { line: 33, text: 'Specify which version of GPT-4 to use (this one is good at analyzing images).' },
          { line: 38, text: 'Include both your rating instructions and the image to be rated.' },
          { line: 42, text: 'Provide the web address of the image.' },
          { line: 43, text: 'Ask for high-quality image analysis (gives more accurate ratings).' },
          { line: 49, text: 'Request 25 independent ratings in one go (much faster than 25 separate requests).' },
          { line: 50, text: 'Limit how wordy the response can be (we only need 1-2 characters).' },
          { line: 51, text: 'Temperature=1 adds randomness, like having multiple human coders with different perspectives.' },
          { line: 55, text: 'Go through each of the 25 ratings GPT-4 returned.' },
          { line: 56, text: 'Convert each rating to a number we can calculate with.' },
          { line: 60, text: 'Calculate average rating and standard deviation (shows how much raters agreed).' }
        ]
      },
      {
        id: 'processing',
        title: 'Batch Processing',
        lineStart: 65,
        lineEnd: 90,
        description: 'Process multiple images from a CSV file. Constructs URLs, calls the rating function for each image, and saves results to a new CSV.',
        details: [
          { line: 65, text: 'Read in your spreadsheet file that lists all the images to rate.' },
          { line: 68, text: 'Create the full web address for each image by combining the base URL with the filename.' },
          { line: 73, text: 'Get 25 ratings for this image.' },
          { line: 75, text: 'Save the filename, average rating, standard deviation, and all 25 individual ratings.' },
          { line: 82, text: 'Wait 1 second before the next image (OpenAI limits request speed).' },
          { line: 85, text: 'Export everything to a new spreadsheet file.' },
          { line: 88, text: 'Show overall summary: average rating across all images, lowest and highest.' }
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
          { line: 5, text: 'base64: Converts image files into text format so they can be sent to OpenAI.' },
          { line: 6, text: 'os: Helps find and work with files on your computer.' }
        ]
      },
      {
        id: 'config',
        title: 'Configuration',
        lineStart: 8,
        lineEnd: 14,
        description: 'Set up paths for local image folder processing. Using a 1-100 scale instead of 1-7 for finer granularity.',
        details: [
          { line: 8, text: 'Your OpenAI account key - keep this private, don\'t share it.' },
          { line: 11, text: '25 ratings per image gives reliable averages.' },
          { line: 13, text: 'Folder location on your computer where your images are stored.' },
          { line: 14, text: 'Where to save your results spreadsheet file.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 16,
        lineEnd: 29,
        description: 'Prompt designed for image quality assessment on 1-100 scale. Distinguishes between quality and aesthetics, providing clear anchor points.',
        details: [
          { line: 17, text: 'Tell the AI to focus on technical quality (sharpness, resolution) not how pretty the image is.' },
          { line: 18, text: '1-100 scale with labels at key points (1=Bad, 25=Poor, 50=Fair, 75=Good, 100=Excellent).' }
        ]
      },
      {
        id: 'encoding',
        title: 'Image Encoding',
        lineStart: 31,
        lineEnd: 33,
        description: 'Function to convert local image files to base64-encoded strings for API transmission.',
        details: [
          { line: 32, text: 'Convert your image file into text format so it can be sent over the internet to OpenAI.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 35,
        lineEnd: 69,
        description: 'Core rating function using base64-encoded images instead of URLs. Otherwise similar to URL-based approach.',
        details: [
          { line: 36, text: 'First, convert the image file to text format.' },
          { line: 38, text: 'Send the image to GPT-4 for quality rating.' },
          { line: 39, text: 'Specify which GPT-4 model to use (this one handles images well).' },
          { line: 48, text: 'Package the converted image in a format OpenAI can understand.' },
          { line: 49, text: 'Request high-resolution analysis (more accurate for judging quality).' },
          { line: 55, text: 'Get 25 independent ratings in one request.' },
          { line: 56, text: 'Keep responses short - we only need the rating number.' },
          { line: 57, text: 'Temperature=1 creates variety in ratings (like having multiple human judges).' },
          { line: 62, text: 'Extract each of the 25 ratings from what GPT-4 sent back.' }
        ]
      },
      {
        id: 'processing',
        title: 'Folder Processing',
        lineStart: 71,
        lineEnd: 95,
        description: 'Process all images in a local folder. Scans for image files, rates each one, and saves results to CSV.',
        details: [
          { line: 71, text: 'Find all image files in your folder (looks for .png, .jpg, .jpeg, .gif, .bmp).' },
          { line: 74, text: 'Create the complete file location for each image.' },
          { line: 78, text: 'Get 25 quality ratings for this image (the function handles the conversion automatically).' },
          { line: 87, text: 'Wait 1 second before the next image (OpenAI limits request speed).' },
          { line: 90, text: 'Save all results to a spreadsheet file.' },
          { line: 93, text: 'Show overall summary: average quality across all images, lowest and highest.' }
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
          { line: 6, text: 'Your DeepInfra account key (this is a different service from OpenAI).' },
          { line: 7, text: 'Tell the script to connect to DeepInfra instead of OpenAI (different AI provider).' },
          { line: 12, text: '25 ratings per image for reliable averages.' },
          { line: 14, text: 'Spreadsheet file listing all the food image filenames.' },
          { line: 15, text: 'Web address where your food images are stored online.' }
        ]
      },
      {
        id: 'prompt',
        title: 'Rating Prompt',
        lineStart: 18,
        lineEnd: 28,
        description: 'Palatability prompt using 1-100 scale. Simple and direct - open-source models sometimes perform better with simpler prompts.',
        details: [
          { line: 18, text: 'Give the AI context - pretend to be a typical US consumer taking a survey.' },
          { line: 20, text: 'Ask a simple, clear question: "How palatable is this food for you?"' },
          { line: 21, text: '1-100 scale from "Not at all" palatable to "Extremely" palatable.' }
        ]
      },
      {
        id: 'api-call',
        title: 'API Call Function',
        lineStart: 30,
        lineEnd: 59,
        description: 'Core rating function for Llama 4. Makes single API call requesting 25 ratings at once.',
        details: [
          { line: 31, text: 'Send the food image to Llama 4 for rating.' },
          { line: 32, text: 'Specify which AI model to use (Llama 4 is an open-source alternative to GPT-4).' },
          { line: 45, text: 'Get 25 independent ratings in one request.' },
          { line: 47, text: 'Temperature=1 adds variety (like having multiple survey respondents).' },
          { line: 51, text: 'Pull out each individual rating from the responses.' },
          { line: 56, text: 'Calculate average rating and standard deviation.' }
        ]
      },
      {
        id: 'processing',
        title: 'CSV Processing',
        lineStart: 61,
        lineEnd: 86,
        description: 'Process images from CSV. Same structure as other examples - load CSV, construct URLs, collect ratings, save results.',
        details: [
          { line: 61, text: 'Read in your spreadsheet file with image filenames.' },
          { line: 64, text: 'Create the full web address by combining base URL with each filename.' },
          { line: 69, text: 'Get 25 palatability ratings for this food image.' },
          { line: 78, text: 'Wait 1 second before next image (DeepInfra limits request speed too).' },
          { line: 81, text: 'Save all results to a spreadsheet file.' },
          { line: 84, text: 'Show summary: average palatability across all foods, lowest and highest.' }
        ]
      }
    ]
  }
};
