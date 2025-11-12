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

API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)

N_RATINGS = 25

IMAGE_FOLDER = r"path/to/your/image/folder"
OUTPUT_CSV = r"path/to/output/gpt_quality_ratings.csv"

PROMPT = """You are an average US participant from mTurk in a study on the perception of image quality.
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

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

def get_ratings(path, n=N_RATINGS):
    base64_image = encode_image(path)

    response = client.chat.completions.create(
        model="gpt-4.1-2025-04-14",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": PROMPT},
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
        n=n,
        max_tokens=10,
        temperature=1,
    )

    ratings = []
    for choice in response.choices:
        rating = int(choice.message.content.strip())
        ratings.append(rating)
        print(f"  Rating: {rating}")

    avg = round(statistics.mean(ratings), 2)
    std = round(statistics.stdev(ratings), 2)
    print(f"  Average: {avg}, StdDev: {std}")
    return ratings, avg, std

image_files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
results = []

for index, filename in enumerate(image_files):
    path = os.path.join(IMAGE_FOLDER, filename)
    print(f"Processing {index + 1}/{len(image_files)}: {filename}")

    ratings, avg, std = get_ratings(path)

    results.append({
        'Filename': filename,
        'Average_Rating': avg,
        'Standard_Deviation': std,
        'All_Ratings': str(ratings)
    })

    if index < len(image_files) - 1:
        time.sleep(1)

results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)

print(f"\nResults saved to {OUTPUT_CSV}")
print(f"Average rating: {results_df['Average_Rating'].mean():.2f}")
print(f"Range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")
