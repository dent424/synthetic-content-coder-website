# -*- coding: utf-8 -*-
"""
Image Quality Rating with GPT-4.1 (Base64-encoded local images)

This script rates image quality from local image files using base64 encoding.
Uses a 1-100 scale for quality assessment.
"""

import time
from openai import OpenAI
import pandas as pd
import statistics
import base64
import os

# --------------------- Configuration ---------------------

# Replace with your actual OpenAI API key
API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)
# Alternatively, you can set the API key as an environment variable:
# openai.api_key = os.getenv("OPENAI_API_KEY")

RATINGS_PER_IMAGE = 25

IMAGE_FOLDER = r"path/to/your/image/folder"
OUTPUT_CSV = r"path/to/output/gpt_quality_ratings.csv"

RATING_PROMPT = """You are an average US participant from mTurk in a study on the perception of image quality.
How would you rate the quality of this image? Please focus on image quality rather than image aesthetics.
Please provide a Image Quality rating on a scale from 1 to 100 where
1 is "Bad"
25 is "Poor"
50 is "Fair"
75 is "Good"
100 is "Excellent"

Rules:
- Respond with only a single number (1-100)
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""

def encode_image(image_path):
    """Encode image file to base64 string"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def get_quality_ratings(image_path, num_ratings=RATINGS_PER_IMAGE):

    base64_image = encode_image(image_path)

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
                            "url": f"data:image/png;base64,{base64_image}",
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


def process_image_folder(folder_path, output_csv_path):

    results = []

    # Get all files in the directory
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

    print(f"Found {len(image_files)} images to process")

    # Process each image
    for index, image_file in enumerate(image_files):
        image_path = os.path.join(folder_path, image_file)

        print(f"Processing image {index + 1}/{len(image_files)}: {image_file}")

        # Get ratings from OpenAI API
        ratings, avg_rating, rating_std = get_quality_ratings(image_path)

        # Add to results
        results.append({
            'Filename': image_file,
            'Average_Rating': avg_rating,
            'Standard_Deviation': rating_std,
            'All_Ratings': str(ratings)
        })

        # Add delay to avoid API rate limits between images
        if index < len(image_files) - 1:
            time.sleep(1)

    # Create and save the dataframe
    results_df = pd.DataFrame(results)
    results_df.to_csv(output_csv_path, index=False)

    print(f"Processing complete. Results saved to {output_csv_path}")
    print(f"Average quality rating across all images: {results_df['Average_Rating'].mean():.2f}")
    print(f"Rating range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")


def main():
    """Main function to run the script"""
    process_image_folder(IMAGE_FOLDER, OUTPUT_CSV)

if __name__ == "__main__":
    main()
