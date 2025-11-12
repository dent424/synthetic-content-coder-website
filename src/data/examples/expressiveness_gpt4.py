# -*- coding: utf-8 -*-
"""
Emotional Expressiveness Rating from Images with GPT-4.1 Stored on the Internet

It takes a file of URLs of images and passes them to the LLM.
Each file is rated 25 times and then returned in a file.
"""

import time
from openai import OpenAI
import pandas as pd
import statistics

API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)

N_RATINGS = 25

INPUT_CSV = r"path/to/expressiveness_filenames.csv"
BASE_URL = "https://your-bucket.s3.amazonaws.com/images/"
OUTPUT_CSV = r"path/to/output/gpt_expressiveness_ratings.csv"

PROMPT = """You are an expert research assistant hired to code thousands
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

def get_ratings(url, n=N_RATINGS):
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
                            "url": url,
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

df = pd.read_csv(INPUT_CSV)
results = []

for index, row in df.iterrows():
    fname = str(row.iloc[0])
    url = BASE_URL + fname
    print(f"Processing {index+1}/{len(df)}: {fname}")

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
