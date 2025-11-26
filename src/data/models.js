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

export const codeTemplates = {
  'gpt-4': (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          OpenAI
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# ==============================================================================

import openai
import os
import numpy as np
from time import sleep

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Your construct definition (include in preregistration)
prompt_template = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

def get_spc_rating(item_description):
    """
    Get SPC rating for a single item with multiple repetitions.

    Args:
        item_description: The item to rate

    Returns:
        dict with mean, std, and all ratings
    """
    ratings = []

    for i in range(REPETITIONS):
        try:
            # Format prompt with item
            prompt = prompt_template.format(item=item_description)

            # API call
            response = client.chat.completions.create(
                model=MODEL,
                temperature=TEMPERATURE,
                max_tokens=MAX_TOKENS,
                messages=[
                    {"role": "system", "content": "You are a content rating assistant."},
                    {"role": "user", "content": prompt}
                ]
            )

            # Extract rating
            rating_text = response.choices[0].message.content.strip()
            rating = float(rating_text)

            # Validate rating is in expected range (adjust as needed)
            if 1 <= rating <= 7:
                ratings.append(rating)

            # Rate limiting (adjust based on your API tier)
            sleep(0.1)

        except Exception as e:
            print(f"Error on repetition {i+1}: {e}")
            continue

    return {
        'mean': np.mean(ratings) if ratings else None,
        'std': np.std(ratings) if ratings else None,
        'n_valid': len(ratings),
        'all_ratings': ratings
    }

# Example usage
if __name__ == "__main__":
    # Test with a single item
    test_item = "Your test item description here"
    result = get_spc_rating(test_item)

    if result['mean'] is not None:
        print(f"Mean rating: {result['mean']:.2f}")
        print(f"Std dev: {result['std']:.2f}")
        print(f"Valid ratings: {result['n_valid']}/{REPETITIONS}")
    else:
        print("No valid ratings obtained")
`,

  'claude': (config) => `# ==============================================================================
# PREREGISTRATION PARAMETERS (for SCC validation study)
# ==============================================================================
# Provider:          Anthropic
# Model:             ${config.model}
# Temperature:       ${config.temperature}
# Repetitions:       ${config.repetitions}
# Max Tokens:        ${config.maxTokens}
# ==============================================================================

import anthropic
import os
import numpy as np
from time import sleep

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Your construct definition (include in preregistration)
prompt_template = """${config.prompt}"""

# Configuration
MODEL = "${config.model}"
TEMPERATURE = ${config.temperature}
MAX_TOKENS = ${config.maxTokens}
REPETITIONS = ${config.repetitions}

def get_spc_rating(item_description):
    """
    Get SPC rating for a single item with multiple repetitions.

    Args:
        item_description: The item to rate

    Returns:
        dict with mean, std, and all ratings
    """
    ratings = []

    for i in range(REPETITIONS):
        try:
            # Format prompt with item
            prompt = prompt_template.format(item=item_description)

            # API call
            message = client.messages.create(
                model=MODEL,
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            # Extract rating
            rating_text = message.content[0].text.strip()
            rating = float(rating_text)

            # Validate rating is in expected range (adjust as needed)
            if 1 <= rating <= 7:
                ratings.append(rating)

            # Rate limiting (adjust based on your API tier)
            sleep(0.1)

        except Exception as e:
            print(f"Error on repetition {i+1}: {e}")
            continue

    return {
        'mean': np.mean(ratings) if ratings else None,
        'std': np.std(ratings) if ratings else None,
        'n_valid': len(ratings),
        'all_ratings': ratings
    }

# Example usage
if __name__ == "__main__":
    # Test with a single item
    test_item = "Your test item description here"
    result = get_spc_rating(test_item)

    if result['mean'] is not None:
        print(f"Mean rating: {result['mean']:.2f}")
        print(f"Std dev: {result['std']:.2f}")
        print(f"Valid ratings: {result['n_valid']}/{REPETITIONS}")
    else:
        print("No valid ratings obtained")
`
};
