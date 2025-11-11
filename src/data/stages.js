export const tutorialStages = [
  {
    id: 1,
    title: 'Stage 1: Construct Definition & API Setup',
    description: 'Define your construct and set up the LLM API connection.',
    example: 'Example: Image Quality Rating',
    code: `import openai
import os

# ① Initialize the API client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ② Define your construct clearly
construct_definition = """
Rate the perceived quality of this image on a scale from 1 to 7,
where:
- 1 = Very poor quality
- 7 = Excellent quality

Consider factors like clarity, resolution, lighting, and composition.
"""

# ③ Test data
test_image_url = "https://example.com/test_image.jpg"`,
    annotations: {
      1: {
        title: 'API Initialization',
        content: 'Initialize the OpenAI client with your API key. Store keys in environment variables for security. Never hardcode API keys in your code.'
      },
      2: {
        title: 'Construct Definition',
        content: 'Clearly define your construct with explicit scale anchors. Good definitions include the scale range, anchor points, and what to evaluate. This is critical for consistency.'
      },
      3: {
        title: 'Test Data',
        content: 'Prepare sample stimuli to test your prompt. Start with a few examples that cover the range of your construct (low, medium, high quality).'
      }
    }
  },
  {
    id: 2,
    title: 'Stage 2: Prompt Engineering',
    description: 'Design and test your prompt format for optimal performance.',
    example: 'Example: Food Palatability Assessment',
    code: `# ① Construct the prompt with clear instructions
def create_rating_prompt(item_description, construct):
    prompt = f"""You are assessing consumer perceptions.

Task: Rate the following item on palatability.

Item: {item_description}

Scale: {construct}

Instructions:
- Provide only a numeric rating
- Do not include explanation
- Format: Just the number (e.g., 5)

Rating:"""
    return prompt

# ② Example usage
food_item = "Grilled salmon with roasted vegetables and lemon butter"
construct = "Rate from 1 (not at all palatable) to 7 (extremely palatable)"

prompt = create_rating_prompt(food_item, construct)
print(prompt)`,
    annotations: {
      1: {
        title: 'Prompt Structure',
        content: 'Structure prompts with clear sections: task description, item to rate, scale definition, and output format. This consistency helps the LLM provide reliable ratings.'
      },
      2: {
        title: 'Template Function',
        content: 'Create reusable functions for prompt generation. This ensures consistency across all items and makes it easy to test variations.'
      }
    }
  },
  {
    id: 3,
    title: 'Stage 3: Single Response Testing',
    description: 'Test your prompt with a single API call to verify output format.',
    example: 'Example: Emotional Expressiveness',
    code: `# ① Make a single API call
def get_single_rating(prompt, model="gpt-4-turbo", temperature=1):
    response = client.chat.completions.create(
        model=model,
        temperature=temperature,  # ② Temperature setting
        max_tokens=10,  # ③ Limit tokens for numeric responses
        messages=[
            {"role": "system", "content": "You are a content rating assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()

# Test the function
test_prompt = "Rate this facial expression's emotional expressiveness (1-7)..."
rating = get_single_rating(test_prompt)
print(f"Rating: {rating}")

# ④ Validate the output
try:
    numeric_rating = float(rating)
    assert 1 <= numeric_rating <= 7
    print("✓ Valid rating received")
except:
    print("✗ Invalid rating format - adjust prompt")`,
    annotations: {
      1: {
        title: 'API Call Structure',
        content: 'Use the chat completions endpoint with clear system and user messages. The system message sets the context, while the user message contains your specific rating task.'
      },
      2: {
        title: 'Temperature Setting',
        content: 'Temperature=1 is recommended for content coding. It provides diverse responses while maintaining consistency. Lower temperatures (0.0-0.5) reduce diversity but may be more deterministic.'
      },
      3: {
        title: 'Token Limits',
        content: 'Set max_tokens low for numeric responses (10-50 tokens). This prevents lengthy explanations and keeps responses focused on the rating.'
      },
      4: {
        title: 'Output Validation',
        content: 'Always validate outputs to ensure they match your expected format. Check that responses are numeric and within your scale range.'
      }
    }
  },
  {
    id: 4,
    title: 'Stage 4: Multiple Repetitions',
    description: 'Run 25 repetitions at temperature=1 for each item to get stable estimates.',
    example: 'Recommended: 25 repetitions per item',
    code: `import numpy as np
from time import sleep

# ① Run multiple repetitions for stability
def get_multiple_ratings(prompt, n_repetitions=25, model="gpt-4-turbo"):
    ratings = []

    for i in range(n_repetitions):
        try:
            # ② Get rating
            response = client.chat.completions.create(
                model=model,
                temperature=1,  # ③ Keep temperature at 1
                max_tokens=10,
                messages=[
                    {"role": "system", "content": "You are a content rating assistant."},
                    {"role": "user", "content": prompt}
                ]
            )

            # ④ Extract and validate
            rating_text = response.choices[0].message.content.strip()
            rating = float(rating_text)

            if 1 <= rating <= 7:
                ratings.append(rating)

            # ⑤ Rate limiting
            sleep(0.1)

        except Exception as e:
            print(f"Error on repetition {i+1}: {e}")
            continue

    # ⑥ Calculate statistics
    return {
        'mean': np.mean(ratings),
        'std': np.std(ratings),
        'n_valid': len(ratings),
        'all_ratings': ratings
    }

# Example usage
results = get_multiple_ratings(test_prompt, n_repetitions=25)
print(f"Mean rating: {results['mean']:.2f} (SD: {results['std']:.2f})")`,
    annotations: {
      1: {
        title: 'Repetition Loop',
        content: 'Run 25 repetitions per item. This is the recommended number from the paper - it balances cost and reliability. More repetitions provide stable estimates of the LLM\'s rating distribution.'
      },
      2: {
        title: 'Error Handling',
        content: 'Wrap API calls in try-except blocks. API calls can fail due to rate limits, network issues, or invalid responses. Robust error handling prevents your entire run from failing.'
      },
      3: {
        title: 'Consistent Temperature',
        content: 'Keep temperature=1 constant across all repetitions. This setting provides good coverage of the LLM\'s response distribution. Don\'t vary temperature across repetitions.'
      },
      4: {
        title: 'Validation',
        content: 'Validate each rating before adding to results. Only include ratings that are numeric and within your scale range. Track how many ratings pass validation.'
      },
      5: {
        title: 'Rate Limiting',
        content: 'Add small delays between API calls (0.1-0.5 seconds) to avoid hitting rate limits. Check your API tier\'s rate limits and adjust accordingly.'
      },
      6: {
        title: 'Statistics',
        content: 'Calculate mean and standard deviation for each item. The mean is your SPC rating estimate. Standard deviation indicates how much the LLM\'s ratings vary for this item.'
      }
    }
  },
  {
    id: 5,
    title: 'Stage 5: Bootstrap Validation',
    description: 'Run bootstrap resampling (1000 iterations) to validate against human ratings.',
    example: 'Validate correlation and RMSE stability',
    code: `import numpy as np
from scipy.stats import pearsonr
from sklearn.metrics import mean_squared_error

# ① Prepare validation data
human_ratings = np.array([6.2, 3.8, 5.1, 4.5, 6.8, 2.9, 5.5])
spc_ratings_25 = np.array([
    # 25 ratings per item (rows) x 7 items (columns)
    [6.0, 6.5, 6.0, 5.5, 6.0, 6.5, 6.0, ...],  # Item 1
    [3.5, 4.0, 4.0, 3.5, 4.0, 3.0, 4.5, ...],  # Item 2
    # ... more items
])

# ② Bootstrap resampling function
def bootstrap_validation(human_ratings, spc_ratings_matrix, n_bootstrap=1000):
    """
    Resample SPC ratings and calculate metrics.

    Args:
        human_ratings: Array of human mean ratings
        spc_ratings_matrix: Matrix of SPC ratings (items x repetitions)
        n_bootstrap: Number of bootstrap iterations
    """
    correlations = []
    rmses = []

    for i in range(n_bootstrap):
        # ③ Randomly sample one rating per item
        n_items = len(human_ratings)
        spc_sample = []

        for item_idx in range(n_items):
            # Randomly pick one of the 25 ratings for this item
            random_rating = np.random.choice(spc_ratings_matrix[item_idx])
            spc_sample.append(random_rating)

        spc_sample = np.array(spc_sample)

        # ④ Calculate metrics
        corr, _ = pearsonr(human_ratings, spc_sample)
        rmse = np.sqrt(mean_squared_error(human_ratings, spc_sample))

        correlations.append(corr)
        rmses.append(rmse)

    # ⑤ Return statistics
    return {
        'mean_correlation': np.mean(correlations),
        'std_correlation': np.std(correlations),
        'mean_rmse': np.mean(rmses),
        'std_rmse': np.std(rmses),
        'all_correlations': correlations,
        'all_rmses': rmses
    }

# Run bootstrap
validation_results = bootstrap_validation(human_ratings, spc_ratings_25)
print(f"Correlation: {validation_results['mean_correlation']:.3f} ± {validation_results['std_correlation']:.3f}")
print(f"RMSE: {validation_results['mean_rmse']:.3f} ± {validation_results['std_rmse']:.3f}")`,
    annotations: {
      1: {
        title: 'Validation Data',
        content: 'You need human ratings for a subset of items to validate your SPC. Typically 50-200 items is sufficient for validation. Store both human ratings and all SPC repetitions.'
      },
      2: {
        title: 'Bootstrap Method',
        content: 'Bootstrap resampling tests the stability of your validation metrics. Run 1000 iterations to get reliable estimates of correlation and RMSE distributions.'
      },
      3: {
        title: 'Random Sampling',
        content: 'In each bootstrap iteration, randomly sample one of the 25 ratings for each item. This simulates the variability you\'d get from using a single SPC rating instead of the mean of 25.'
      },
      4: {
        title: 'Validation Metrics',
        content: 'Calculate Pearson correlation and RMSE between human and SPC ratings. Correlation measures linear relationship (higher is better), RMSE measures absolute error (lower is better).'
      },
      5: {
        title: 'Report Statistics',
        content: 'Report mean and SD of correlations and RMSEs across bootstrap iterations. This shows both the expected performance and its stability. Low SD indicates robust performance.'
      }
    }
  },
  {
    id: 6,
    title: 'Stage 6: Results & Deployment',
    description: 'Analyze validation results and deploy your SPC for large-scale coding.',
    example: 'Interpret metrics and scale up',
    code: `import matplotlib.pyplot as plt
import numpy as np

# ① Interpret validation results
def interpret_results(validation_results):
    """
    Provide interpretation guidelines for validation metrics.
    """
    mean_corr = validation_results['mean_correlation']
    mean_rmse = validation_results['mean_rmse']

    print("=== Validation Results ===")
    print(f"Correlation: {mean_corr:.3f}")

    # ② Correlation benchmarks
    if mean_corr >= 0.90:
        print("  ✓ Excellent: SPC ratings highly aligned with human ratings")
    elif mean_corr >= 0.80:
        print("  ✓ Good: SPC suitable for most research applications")
    elif mean_corr >= 0.70:
        print("  ⚠ Acceptable: Consider prompt refinement")
    else:
        print("  ✗ Poor: Revise construct definition and prompt")

    print(f"\\nRMSE: {mean_rmse:.3f}")

    # ③ RMSE interpretation (for 1-7 scale)
    if mean_rmse <= 0.30:
        print("  ✓ Excellent precision")
    elif mean_rmse <= 0.50:
        print("  ✓ Good precision")
    elif mean_rmse <= 0.70:
        print("  ⚠ Acceptable precision")
    else:
        print("  ✗ Poor precision - consider refinement")

# ④ Deployment function
def deploy_spc(items_to_code, prompt_template, n_repetitions=25):
    """
    Deploy validated SPC to code large dataset.

    Args:
        items_to_code: List of items to rate
        prompt_template: Your validated prompt template
        n_repetitions: Number of repetitions (default: 25)
    """
    results = []

    for idx, item in enumerate(items_to_code):
        prompt = prompt_template.format(item=item)
        ratings = get_multiple_ratings(prompt, n_repetitions)

        results.append({
            'item': item,
            'mean_rating': ratings['mean'],
            'std_rating': ratings['std'],
            'n_valid': ratings['n_valid']
        })

        # Progress tracking
        if (idx + 1) % 100 == 0:
            print(f"Processed {idx + 1}/{len(items_to_code)} items")

    return results

# ⑤ Run deployment
interpret_results(validation_results)

# Example deployment (uncomment to run)
# large_dataset = ["item1", "item2", ...]  # Your full dataset
# final_results = deploy_spc(large_dataset, your_prompt_template)`,
    annotations: {
      1: {
        title: 'Results Interpretation',
        content: 'Create clear interpretation guidelines for your validation metrics. This helps you decide whether to proceed with deployment or refine your approach.'
      },
      2: {
        title: 'Correlation Benchmarks',
        content: 'Typical benchmarks: r > 0.90 is excellent, r > 0.80 is good for most research, r > 0.70 is acceptable but consider refinement. These are rough guidelines - your requirements may vary.'
      },
      3: {
        title: 'RMSE Benchmarks',
        content: 'For a 1-7 scale, RMSE < 0.30 is excellent, < 0.50 is good, < 0.70 is acceptable. RMSE is scale-dependent, so adjust these thresholds for different scale ranges.'
      },
      4: {
        title: 'Deployment Function',
        content: 'Once validated, deploy your SPC to code your full dataset. Use the same settings (temperature, repetitions, model) that you validated. Track progress for large datasets.'
      },
      5: {
        title: 'Production Use',
        content: 'After validation, you can code thousands of items efficiently. Always save raw ratings (all repetitions) in addition to means - this allows reanalysis and transparency.'
      }
    }
  }
];
