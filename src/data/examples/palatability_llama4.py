# -*- coding: utf-8 -*-
"""
Food Palatability Rating with Llama 4 (URL-based images)

This script rates food palatability using Llama 4 Maverick via DeepInfra.
Demonstrates open-source LLM usage with an alternative API provider.
"""

import time
from openai import OpenAI
import pandas as pd
import statistics

# --------------------- Configuration ---------------------

API_KEY = 'your-api-key-here'
client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.deepinfra.com/v1/openai"  # DeepInfra endpoint for Llama
)
# Alternatively, you can set the API key as an environment variable:
# openai.api_key = os.getenv("DEEPINFRA_API_KEY")

TOTAL_RATINGS = 25  # Number of ratings to collect per image

# Input/Output Configuration
INPUT_CSV = r"path/to/image_names.csv"  # CSV with filenames
BASE_URL = "https://your-bucket.s3.amazonaws.com/food-images/"  # Base URL for S3 images
OUTPUT_CSV = r"path/to/output/palatability_ratings_llama4.csv"

RATING_PROMPT = """You are an average US participant from mTurk
in a study on the perception of food.
How palatable is this food for you in general?
Please provide a Palatability rating on a scale from 1 to 100 
where 1 is "Not at all" and 100 is "Extremely"

Rules:
- Respond with only a single number (1-100)
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""


def get_ratings(image_url, num_ratings=TOTAL_RATINGS):

    response = client.chat.completions.create(
        model="meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": RATING_PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": image_url}
                    },
                ],
            }
        ],
        n=num_ratings,
        max_tokens=10,
        temperature=1,
    )

    ratings = []
    for choice in response.choices:
        rating = int(choice.message.content.strip())
        ratings.append(rating)
        print(f"  Rating: {rating}")

    avg_rating = round(statistics.mean(ratings), 2)
    rating_std = round(statistics.stdev(ratings), 2)
    print(f"  Average rating: {avg_rating}, StdDev: {rating_std}")
    return ratings, avg_rating, rating_std


def process_from_csv(filenames_csv, output_csv_path):

    df = pd.read_csv(filenames_csv)
    results = []

    # Process each image
    for index, row in df.iterrows():
        fname = str(row['Filename'])
        image_url = BASE_URL + fname

        print(f"Processing {index + 1}/{len(df)}: {fname}")

        # Get ratings from Llama API
        ratings, avg_rating, rating_std = get_ratings(image_url)

        # Add to results
        results.append({
            'Filename': fname,
            'Average_Rating': avg_rating,
            'Standard_Deviation': rating_std,
            'All_Ratings': str(ratings)
        })

        # Add delay to avoid API rate limits between images
        if index < len(df) - 1:
            time.sleep(1)

    # Create and save the dataframe
    results_df = pd.DataFrame(results)
    results_df.to_csv(output_csv_path, index=False)

    print(f"Processing complete. Results saved to {output_csv_path}")
    print(f"Average palatability rating across all images: {results_df['Average_Rating'].mean():.2f}")
    print(f"Rating range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")


def main():
    """Main function to run the script"""
    process_from_csv(INPUT_CSV, OUTPUT_CSV)

if __name__ == "__main__":
    main()
