export const modelConfigs = {
  'gpt-4': {
    label: 'GPT-4.1',
    provider: 'OpenAI',
    models: [
      { value: 'gpt-4.1-2025-04-14', label: 'GPT-4.1 (Recommended)' },
      { value: 'gpt-4.1-mini-2025-04-14', label: 'GPT-4.1 Mini' }
    ],
    settings: {
      temperature: {
        min: 0,
        max: 2,
        default: 1,
        step: 0.1,
        description: 'Controls randomness. Higher = more diverse. Recommended: 1'
      },
      maxTokens: {
        min: 10,
        max: 1000,
        default: 50,
        step: 10,
        description: 'Maximum response length. For numeric ratings, 10-50 is sufficient'
      },
      repetitions: {
        min: 1,
        max: 50,
        default: 25,
        step: 1,
        description: 'Number of ratings per item. Recommended: 25'
      }
    }
  },
  'gpt-5': {
    label: 'GPT-5',
    provider: 'OpenAI',
    isReasoningModel: true,
    models: [
      { value: 'gpt-5-2025-08-07', label: 'GPT-5 (Recommended)' },
      { value: 'gpt-5-mini-2025-08-07', label: 'GPT-5 Mini' }
    ],
    settings: {
      reasoningEffort: {
        options: ['low', 'medium', 'high'],
        default: 'medium',
        description: 'Controls reasoning depth. Higher = more thorough but slower'
      },
      maxCompletionTokens: {
        min: 100,
        max: 10000,
        default: 5000,
        step: 100,
        description: 'Maximum tokens for response including reasoning. Recommended: 5000'
      },
      repetitions: {
        min: 1,
        max: 50,
        default: 25,
        step: 1,
        description: 'Number of ratings per item. Recommended: 25'
      }
    }
  },
  'llama': {
    label: 'Llama (Open Source)',
    provider: 'DeepInfra',
    models: [
      { value: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8', label: 'Llama 4 Maverick (Recommended)' },
      { value: 'meta-llama/Llama-4-Scout-17B-16E-Instruct', label: 'Llama 4 Scout' },
      { value: 'meta-llama/Llama-3.3-70B-Instruct', label: 'Llama 3.3 70B' },
      { value: 'meta-llama/Llama-3.2-11B-Vision-Instruct', label: 'Llama 3.2 11B Vision' }
    ],
    settings: {
      temperature: {
        min: 0,
        max: 2,
        default: 1,
        step: 0.1,
        description: 'Controls randomness. Higher = more diverse. Recommended: 1'
      },
      maxTokens: {
        min: 10,
        max: 1000,
        default: 50,
        step: 10,
        description: 'Maximum response length. For numeric ratings, 10-50 is sufficient'
      },
      repetitions: {
        min: 1,
        max: 50,
        default: 25,
        step: 1,
        description: 'Number of ratings per item. Recommended: 25'
      }
    }
  }
};

// OpenAI template for TEXT data
const openaiTextTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Text
# ==============================================================================

import openai
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = openai.OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Data file
INPUT_CSV = r"path/to/your/data.csv"
TEXT_COLUMN = "text"  # Column name containing text to rate
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(text):
    """Get a single rating for a text item."""
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "system", "content": "You are a content rating assistant."},
            {"role": "user", "content": f"{PROMPT}\\n\\nText to rate: \\"{text}\\""}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each item
for index, row in df.iterrows():
    text = str(row[TEXT_COLUMN])
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(text)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on item {index}, rep {rep}: {e}")
            continue

    results.append({
        'item_index': index,
        'text': text[:100],  # First 100 chars for reference
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed item {index + 1}/{len(df)}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// OpenAI template for IMAGE URL data
const openaiImageUrlTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (URL)
# ==============================================================================

import openai
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = openai.OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Data file - CSV with image filenames
INPUT_CSV = r"path/to/your/filenames.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/images/"  # Base URL for images
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(image_url):
    """Get a single rating for an image URL."""
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "system", "content": "You are a content rating assistant."},
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": image_url, "detail": "high"}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each image
for index, row in df.iterrows():
    filename = str(row.iloc[0])  # First column contains filename
    image_url = BASE_URL + filename
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_url)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {index + 1}/{len(df)}: {filename}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// OpenAI template for LOCAL IMAGE data
const openaiImageLocalTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (Local)
# ==============================================================================

import openai
import base64
import os
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = openai.OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Image folder
IMAGE_FOLDER = r"path/to/your/image/folder"
OUTPUT_CSV = r"path/to/output/ratings.csv"

def encode_image(image_path):
    """Encode image to base64."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

def get_rating(image_path):
    """Get a single rating for a local image."""
    base64_image = encode_image(image_path)
    ext = os.path.splitext(image_path)[1].lower()
    media_type = "image/jpeg" if ext in ['.jpg', '.jpeg'] else "image/png"

    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "system", "content": "You are a content rating assistant."},
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": f"data:{media_type};base64,{base64_image}", "detail": "high"}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Get list of images
image_files = [f for f in os.listdir(IMAGE_FOLDER)
               if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
results = []

# Process each image
for i, filename in enumerate(image_files):
    image_path = os.path.join(IMAGE_FOLDER, filename)
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_path)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {i + 1}/{len(image_files)}: {filename}")

# Save results
import pandas as pd
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// GPT-5 template for TEXT data (reasoning model)
const gpt5TextTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI (GPT-5 Reasoning Model)
# Model:             ${config.model}
# Reasoning Effort:  ${config.reasoningEffort}
# Repetitions:       ${config.repetitions}
# Max Completion Tokens: ${config.maxCompletionTokens}
# Data Modality:     Text
# ==============================================================================

from openai import OpenAI
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
REASONING_EFFORT = "${config.reasoningEffort}"
MAX_COMPLETION_TOKENS = ${config.maxCompletionTokens}
REPETITIONS = ${config.repetitions}

# Data file
INPUT_CSV = r"path/to/your/data.csv"
TEXT_COLUMN = "text"  # Column name containing text to rate
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(text):
    """Get a single rating for a text item."""
    response = client.chat.completions.create(
        model=MODEL,
        reasoning_effort=REASONING_EFFORT,
        max_completion_tokens=MAX_COMPLETION_TOKENS,
        messages=[
            {"role": "developer", "content": "You are a content rating assistant."},
            {"role": "user", "content": f"{PROMPT}\\n\\nText to rate: \\"{text}\\""}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each item
for index, row in df.iterrows():
    text = str(row[TEXT_COLUMN])
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(text)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.5)  # Rate limiting (reasoning models are slower)
        except Exception as e:
            print(f"Error on item {index}, rep {rep}: {e}")
            continue

    results.append({
        'item_index': index,
        'text': text[:100],  # First 100 chars for reference
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed item {index + 1}/{len(df)}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// GPT-5 template for IMAGE URL data (reasoning model)
const gpt5ImageUrlTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI (GPT-5 Reasoning Model)
# Model:             ${config.model}
# Reasoning Effort:  ${config.reasoningEffort}
# Repetitions:       ${config.repetitions}
# Max Completion Tokens: ${config.maxCompletionTokens}
# Data Modality:     Image (URL)
# ==============================================================================

from openai import OpenAI
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
REASONING_EFFORT = "${config.reasoningEffort}"
MAX_COMPLETION_TOKENS = ${config.maxCompletionTokens}
REPETITIONS = ${config.repetitions}

# Data file - CSV with image filenames
INPUT_CSV = r"path/to/your/filenames.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/images/"  # Base URL for images
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(image_url):
    """Get a single rating for an image URL."""
    response = client.chat.completions.create(
        model=MODEL,
        reasoning_effort=REASONING_EFFORT,
        max_completion_tokens=MAX_COMPLETION_TOKENS,
        messages=[
            {"role": "developer", "content": "You are a content rating assistant."},
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": image_url, "detail": "high"}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each image
for index, row in df.iterrows():
    filename = str(row.iloc[0])  # First column contains filename
    image_url = BASE_URL + filename
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_url)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.5)  # Rate limiting (reasoning models are slower)
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {index + 1}/{len(df)}: {filename}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// GPT-5 template for LOCAL IMAGE data (reasoning model)
const gpt5ImageLocalTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI (GPT-5 Reasoning Model)
# Model:             ${config.model}
# Reasoning Effort:  ${config.reasoningEffort}
# Repetitions:       ${config.repetitions}
# Max Completion Tokens: ${config.maxCompletionTokens}
# Data Modality:     Image (Local)
# ==============================================================================

from openai import OpenAI
import base64
import os
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Initialize OpenAI client
client = OpenAI(api_key=API_KEY)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
REASONING_EFFORT = "${config.reasoningEffort}"
MAX_COMPLETION_TOKENS = ${config.maxCompletionTokens}
REPETITIONS = ${config.repetitions}

# Image folder
IMAGE_FOLDER = r"path/to/your/image/folder"
OUTPUT_CSV = r"path/to/output/ratings.csv"

def encode_image(image_path):
    """Encode image to base64."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

def get_rating(image_path):
    """Get a single rating for a local image."""
    base64_image = encode_image(image_path)
    ext = os.path.splitext(image_path)[1].lower()
    media_type = "image/jpeg" if ext in ['.jpg', '.jpeg'] else "image/png"

    response = client.chat.completions.create(
        model=MODEL,
        reasoning_effort=REASONING_EFFORT,
        max_completion_tokens=MAX_COMPLETION_TOKENS,
        messages=[
            {"role": "developer", "content": "You are a content rating assistant."},
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": f"data:{media_type};base64,{base64_image}", "detail": "high"}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Get list of images
image_files = [f for f in os.listdir(IMAGE_FOLDER)
               if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
results = []

# Process each image
for i, filename in enumerate(image_files):
    image_path = os.path.join(IMAGE_FOLDER, filename)
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_path)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.5)  # Rate limiting (reasoning models are slower)
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {i + 1}/{len(image_files)}: {filename}")

# Save results
import pandas as pd
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// Llama template for TEXT data (via DeepInfra)
const llamaTextTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          DeepInfra (Llama - Open Source)
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Text
# ==============================================================================

from openai import OpenAI
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_DEEPINFRA_API_KEY_HERE"

# Initialize client with DeepInfra endpoint
client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.deepinfra.com/v1/openai"
)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Data file
INPUT_CSV = r"path/to/your/data.csv"
TEXT_COLUMN = "text"  # Column name containing text to rate
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(text):
    """Get a single rating for a text item."""
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "user", "content": f"{PROMPT}\\n\\nText to rate: \\"{text}\\""}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each item
for index, row in df.iterrows():
    text = str(row[TEXT_COLUMN])
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(text)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on item {index}, rep {rep}: {e}")
            continue

    results.append({
        'item_index': index,
        'text': text[:100],  # First 100 chars for reference
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed item {index + 1}/{len(df)}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// Llama template for IMAGE URL data (via DeepInfra)
const llamaImageUrlTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          DeepInfra (Llama - Open Source)
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (URL)
# ==============================================================================

from openai import OpenAI
import pandas as pd
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_DEEPINFRA_API_KEY_HERE"

# Initialize client with DeepInfra endpoint
client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.deepinfra.com/v1/openai"
)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Data file - CSV with image filenames
INPUT_CSV = r"path/to/your/filenames.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/images/"  # Base URL for images
OUTPUT_CSV = r"path/to/output/ratings.csv"

def get_rating(image_url):
    """Get a single rating for an image URL."""
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": image_url}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Load data
df = pd.read_csv(INPUT_CSV)
results = []

# Process each image
for index, row in df.iterrows():
    filename = str(row.iloc[0])  # First column contains filename
    image_url = BASE_URL + filename
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_url)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {index + 1}/{len(df)}: {filename}")

# Save results
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

// Llama template for LOCAL IMAGE data (via DeepInfra)
const llamaImageLocalTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          DeepInfra (Llama - Open Source)
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (Local)
# ==============================================================================

from openai import OpenAI
import base64
import os
import numpy as np
from time import sleep

# IMPORTANT: Keep your API key private! Never share code with your real key.
# Anyone with your key can use your account and incur charges.
API_KEY = "PASTE_YOUR_DEEPINFRA_API_KEY_HERE"

# Initialize client with DeepInfra endpoint
client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.deepinfra.com/v1/openai"
)

# Your construct definition (include in preregistration)
PROMPT = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

# Image folder
IMAGE_FOLDER = r"path/to/your/image/folder"
OUTPUT_CSV = r"path/to/output/ratings.csv"

def encode_image(image_path):
    """Encode image to base64."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

def get_rating(image_path):
    """Get a single rating for a local image."""
    base64_image = encode_image(image_path)
    ext = os.path.splitext(image_path)[1].lower()
    media_type = "image/jpeg" if ext in ['.jpg', '.jpeg'] else "image/png"

    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": f"data:{media_type};base64,{base64_image}"}}
            ]}
        ]
    )
    return response.choices[0].message.content.strip()

# Get list of images
image_files = [f for f in os.listdir(IMAGE_FOLDER)
               if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
results = []

# Process each image
for i, filename in enumerate(image_files):
    image_path = os.path.join(IMAGE_FOLDER, filename)
    item_ratings = []

    for rep in range(REPETITIONS):
        try:
            rating = get_rating(image_path)
            rating_val = float(rating)
            if 1 <= rating_val <= 7:
                item_ratings.append(rating_val)
            sleep(0.1)  # Rate limiting
        except Exception as e:
            print(f"Error on {filename}, rep {rep}: {e}")
            continue

    results.append({
        'filename': filename,
        'mean_rating': np.mean(item_ratings) if item_ratings else None,
        'std_rating': np.std(item_ratings) if item_ratings else None,
        'n_valid': len(item_ratings)
    })
    print(f"Processed {i + 1}/{len(image_files)}: {filename}")

# Save results
import pandas as pd
results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)
print(f"Results saved to {OUTPUT_CSV}")
`;

export const codeTemplates = {
  'gpt-4': (config) => {
    if (config.dataModality === 'image') {
      return config.imageSource === 'local'
        ? openaiImageLocalTemplate(config)
        : openaiImageUrlTemplate(config);
    }
    return openaiTextTemplate(config);
  },
  'gpt-5': (config) => {
    if (config.dataModality === 'image') {
      return config.imageSource === 'local'
        ? gpt5ImageLocalTemplate(config)
        : gpt5ImageUrlTemplate(config);
    }
    return gpt5TextTemplate(config);
  },
  'llama': (config) => {
    if (config.dataModality === 'image') {
      return config.imageSource === 'local'
        ? llamaImageLocalTemplate(config)
        : llamaImageUrlTemplate(config);
    }
    return llamaTextTemplate(config);
  }
};
