# -*- coding: utf-8 -*-
"""
Food Palatability Rating with Llama 4 (URL-based images with batching)

This script rates food palatability using Llama 4 Maverick via DeepInfra.
Demonstrates batched API calls and open-source LLM usage.
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

BATCH = 4  # Number of ratings per API call
TOTAL_RATINGS = 25  # Total ratings to collect per image

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


def get_ratings(image_url, total_ratings=TOTAL_RATINGS, batch_size=BATCH):
    """
    Get palatability rating for an image using Llama 4 API with batching

    Args:
        image_url (str): The URL of the image to rate
        total_ratings (int): Total number of ratings to collect
        batch_size (int): Number of ratings to request per API call

    Returns:
        tuple: (list of ratings, average rating, standard deviation)
    """
    ratings = []

    while len(ratings) < total_ratings:
        try:
            response = client.chat.completions.create(
                model="meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": RATING_PROMPT},
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": image_url},

                            },
                        ],
                    }
                ],
                n=min(batch_size, total_ratings - len(ratings)),
                max_tokens=10,
                temperature=1,
            )

            for choice in response.choices:
                raw_rating = choice.message.content.strip()

                # Ensure we only get a number between 1-100
                try:
                    rating = int(raw_rating)
                    if 1 <= rating <= 100:
                        ratings.append(rating)
                        print(f"  Rating: {rating}")
                    else:
                        print(f"  Warning: Rating out of range (1-100): {rating}")
                except ValueError:
                    print(f"  Error: Invalid rating received: {raw_rating}")

        except Exception as e:
            print(f"  API error: {e}, retrying in 2s")
            time.sleep(2)
            continue

    avg_rating = round(statistics.mean(ratings), 2)
    rating_std = round(statistics.stdev(ratings), 2) if len(ratings) > 1 else 0
    print(f"  Collected {len(ratings)} valid ratings out of {total_ratings} requested")
    print(f"  Average rating: {avg_rating}, StdDev: {rating_std}")
    return ratings, avg_rating, rating_std


def process_from_csv(filenames_csv, output_csv_path):
    """
    Processes image filenames from a CSV (matched to a BASE_URL)
    and fetches ratings using the LLM API. Results are saved to CSV.

    Args:
        filenames_csv (str): Path to input CSV with a 'Filename' column
        output_csv_path (str): Path to save output CSV file
    """
    try:
        # Create a list to store results
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
                'Average_Rating': avg_rating if avg_rating is not None else "Error",
                'Standard_Deviation': rating_std,
                'All_Ratings': str(ratings) if ratings else "Error"
            })

            # Optional: Add delay to avoid API rate limits between images
            if index < len(df) - 1:
                time.sleep(1)  # 1 second delay between processing different images

        # Create and save the dataframe
        results_df = pd.DataFrame(results)
        results_df.to_csv(output_csv_path, index=False)

        print(f"Processing complete. Results saved to {output_csv_path}")

        # Print a summary
        success_count = results_df[results_df['Average_Rating'] != "Error"].shape[0]
        print(f"Summary: {success_count}/{len(df)} images processed successfully")

        # Print average ratings statistics
        valid_ratings = results_df[results_df['Average_Rating'] != "Error"]['Average_Rating']
        if not valid_ratings.empty and len(valid_ratings) > 0:
            print(f"Average palatability rating across all images: {valid_ratings.mean():.2f}")
            print(f"Rating range: {valid_ratings.min()} - {valid_ratings.max()}")

    except Exception as e:
        print(f"Error processing images: {e}")


def main():
    """Main function to run the script"""
    process_from_csv(INPUT_CSV, OUTPUT_CSV)

if __name__ == "__main__":
    main()
