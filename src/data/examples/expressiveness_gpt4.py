# -*- coding: utf-8 -*-
"""
Emotional Expressiveness Rating with GPT-4.1 (URL-based images)

This script rates facial expressions from images hosted on Amazon S3.
Images are accessed via URLs rather than local files.
"""

import time
from openai import OpenAI
import pandas as pd
import statistics

# --------------------- Configuration ---------------------

# Replace with your actual OpenAI API key
API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)
# Alternatively, you can set the API key as an environment variable:
# openai.api_key = os.getenv("OPENAI_API_KEY")

RATINGS_PER_IMAGE = 25

# Input/Output Configuration
INPUT_CSV = r"path/to/expressiveness_filenames.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/images/"
OUTPUT_CSV = r"path/to/output/gpt_expressiveness_ratings.csv"

RATING_PROMPT = """You are an expert research assistant hired to code thousands of facial images for a psychology study on emotional expression. Your job is to evaluate each image and provide a consistent rating based on the intensity of the emotional expression shown.

Rating Instructions:
For this image, provide a score based on a 1–7 scale, with 7 being high happy or sad expression and 1 indicating low happy or sad expression.

Rules:
- Respond with only a single number (1-7) using standard numerals
- Do not use any special Unicode number characters
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""


def get_expression_ratings(image_url, num_ratings=RATINGS_PER_IMAGE):
    """
    Get expression rating for an image using OpenAI API

    Args:
        image_url (str): The URL of the image to rate
        num_ratings (int): Number of ratings to collect

    Returns:
        tuple: (list of ratings, average rating, standard deviation)
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-2025-04-14",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": RATING_PROMPT},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url,
                            "detail":"high",
                            },
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
            raw_rating = choice.message.content.strip()

            # Ensure we only get a number between 1-7
            try:
                rating = int(raw_rating)
                if 1 <= rating <= 7:
                    ratings.append(rating)
                    print(f"  Rating: {rating}")
                else:
                    print(f"  Warning: Rating out of range (1-7): {rating}")
            except ValueError:
                print(f"  Error: Invalid rating received: {raw_rating}")

        # Calculate statistics if we have any valid ratings
        if ratings:
            avg_rating = round(statistics.mean(ratings), 2)
            rating_std = round(statistics.stdev(ratings), 2) if len(ratings) > 1 else 0
            print(f"  Collected {len(ratings)} valid ratings out of {num_ratings} requested")
            print(f"  Average rating: {avg_rating}, StdDev: {rating_std}")
            return ratings, avg_rating, rating_std
        else:
            print("  No valid ratings received")
            return [], None, None

    except Exception as e:
        print(f"  Error calling OpenAI API: {e}")
        return [], None, None


def process_from_csv(filenames_csv, output_csv_path):
    """
    Process all images from CSV filenames and save ratings to CSV

    Args:
        filenames_csv (str): Path to CSV containing image filenames
        output_csv_path (str): Path to save output CSV file
    """
    df = pd.read_csv(filenames_csv)

    try:
        # Create a list to store results
        results = []

        # Process each image
        for index, row in df.iterrows():
            fname = str(row.iloc[0])
            url = BASE_URL + fname
            print(f"Processing {index+1}/{len(df)}: {url}")

            # Get ratings from OpenAI API
            ratings, avg_rating, rating_std = get_expression_ratings(url)

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
            print(f"Average expression rating across all images: {valid_ratings.mean():.2f}")
            print(f"Rating range: {valid_ratings.min()} - {valid_ratings.max()}")

    except Exception as e:
        print(f"Error processing images: {e}")


def main():
    """Main function to run the script"""
    process_from_csv(INPUT_CSV, OUTPUT_CSV)

if __name__ == "__main__":
    main()
