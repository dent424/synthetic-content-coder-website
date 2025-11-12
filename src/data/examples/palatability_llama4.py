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

API_KEY = 'your-api-key-here'
client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.deepinfra.com/v1/openai"
)

N_RATINGS = 25

INPUT_CSV = r"path/to/image_names.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/food-images/"
OUTPUT_CSV = r"path/to/output/palatability_ratings_llama4.csv"

PROMPT = """You are an average US participant from mTurk
in a study on the perception of food.
How palatable is this food for you in general?
Please provide a Palatability rating on a scale from 1 to 100
where 1 is "Not at all" and 100 is "Extremely"

Rules:
- Respond with only a single number (1-100)
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""

def get_ratings(url, n=N_RATINGS):
    response = client.chat.completions.create(
        model="meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": url}
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

df = pd.read_csv(INPUT_CSV)
results = []

for index, row in df.iterrows():
    fname = str(row['Filename'])
    url = BASE_URL + fname
    print(f"Processing {index + 1}/{len(df)}: {fname}")

    ratings, avg, std = get_ratings(url)

    results.append({
        'Filename': fname,
        'Average_Rating': avg,
        'Standard_Deviation': std,
        'All_Ratings': str(ratings)
    })

    if index < len(df) - 1:
        time.sleep(1)

results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)

print(f"\nResults saved to {OUTPUT_CSV}")
print(f"Average rating: {results_df['Average_Rating'].mean():.2f}")
print(f"Range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")
