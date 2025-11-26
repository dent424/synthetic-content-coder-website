export const modelConfigs = {
  'gpt-4': {
    label: 'OpenAI',
    provider: 'OpenAI',
    models: [
      { value: 'gpt-5-2025-08-07', label: 'GPT-5 (Recommended)' },
      { value: 'gpt-5-mini-2025-08-07', label: 'GPT-5 Mini' },
      { value: 'gpt-4.1-2025-04-14', label: 'GPT-4.1' },
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
  'claude': {
    label: 'Claude',
    provider: 'Anthropic',
    models: [
      { value: 'claude-sonnet-4-5-20250929', label: 'Claude Sonnet 4.5 (Recommended)' },
      { value: 'claude-opus-4-5-20251124', label: 'Claude Opus 4.5' },
      { value: 'claude-haiku-4-5-20251015', label: 'Claude Haiku 4.5' },
      { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4' }
    ],
    settings: {
      temperature: {
        min: 0,
        max: 1,
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
import os
import numpy as np
from time import sleep

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

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
import os
import numpy as np
from time import sleep

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

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

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

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

// Claude template for TEXT data
const claudeTextTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          Anthropic
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Text
# ==============================================================================

import anthropic
import pandas as pd
import os
import numpy as np
from time import sleep

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

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
    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        messages=[
            {"role": "user", "content": f"{PROMPT}\\n\\nText to rate: \\"{text}\\""}
        ]
    )
    return message.content[0].text.strip()

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

// Claude template for IMAGE URL data
const claudeImageUrlTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          Anthropic
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (URL)
# ==============================================================================

import anthropic
import pandas as pd
import httpx
import base64
import os
import numpy as np
from time import sleep

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

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
    """Get a single rating for an image URL (Claude requires base64)."""
    # Download and encode image
    response = httpx.get(image_url)
    base64_image = base64.b64encode(response.content).decode('utf-8')

    # Determine media type from URL
    ext = image_url.split('.')[-1].lower()
    media_type = "image/jpeg" if ext in ['jpg', 'jpeg'] else "image/png"

    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        messages=[
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image", "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": base64_image
                }}
            ]}
        ]
    )
    return message.content[0].text.strip()

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

// Claude template for LOCAL IMAGE data
const claudeImageLocalTemplate = (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          Anthropic
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# Data Modality:     Image (Local)
# ==============================================================================

import anthropic
import base64
import os
import numpy as np
from time import sleep

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

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

    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        messages=[
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image", "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": base64_image
                }}
            ]}
        ]
    )
    return message.content[0].text.strip()

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
  'claude': (config) => {
    if (config.dataModality === 'image') {
      return config.imageSource === 'local'
        ? claudeImageLocalTemplate(config)
        : claudeImageUrlTemplate(config);
    }
    return claudeTextTemplate(config);
  }
};
