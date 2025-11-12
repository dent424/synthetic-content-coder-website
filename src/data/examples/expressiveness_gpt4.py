# -*- coding: utf-8 -*-
"""
Emotional Expressiveness Rating with GPT-4.1 (URL-based images)

This script rates facial expressions using GPT-4.1
It takes a file of urls of images and passes them to the LLM
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

RATING_PROMPT = """You are an expert research assistant hired to code thousands 
of facial images for a psychology study on emotional expression. 
Your job is to evaluate each image and provide a consistent rating based 
on the intensity of the emotional expression shown.

Rating Instructions:
For this image, provide a score based on a 1–7 scale, with 
7 being high happy or sad expression and 1 indicating low happy or sad expression.

Rules:
- Respond with only a single number (1-7) using standard numerals
- Do not use any special Unicode number characters
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""


def get_expression_ratings(image_url, num_ratings=RATINGS_PER_IMAGE):

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
        fname = str(row.iloc[0])
        url = BASE_URL + fname
        print(f"Processing {index+1}/{len(df)}: {url}")

        # Get ratings from OpenAI API
        ratings, avg_rating, rating_std = get_expression_ratings(url)

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
    print(f"Average expression rating across all images: {results_df['Average_Rating'].mean():.2f}")
    print(f"Rating range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")


def main():
    """Main function to run the script"""
    process_from_csv(INPUT_CSV, OUTPUT_CSV)

if __name__ == "__main__":
    main()
