# -*- coding: utf-8 -*-
"""
Text Sentiment Analysis with GPT-4.1

A simple example of using LLMs to code text data.
Rates sentiment of open-ended survey responses on a 1-7 scale.
"""

import time
from openai import OpenAI
import pandas as pd
import statistics

API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)

N_RATINGS = 25

INPUT_CSV = r"path/to/survey_responses.csv"
OUTPUT_CSV = r"path/to/output/sentiment_ratings.csv"

PROMPT = """You are a research assistant coding open-ended survey responses.
Rate the sentiment of this text on a scale from 1 to 7 where:
1 = Very Negative
4 = Neutral
7 = Very Positive

Rules:
- Respond with only a single number (1-7)
- No text, punctuation, or explanation
- Must rate even if uncertain
- Use the full scale range appropriately"""

def get_ratings(text, n=N_RATINGS):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
                "role": "user",
                "content": f"{PROMPT}\n\nText to rate: \"{text}\""
            }
        ],
        n=n,
        max_tokens=10,
        temperature=1
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
    response_id = str(row['ResponseID'])
    text = str(row['ResponseText'])
    print(f"Processing {index + 1}/{len(df)}: {response_id}")

    ratings, avg, std = get_ratings(text)

    results.append({
        'ResponseID': response_id,
        'ResponseText': text,
        'Average_Rating': avg,
        'Standard_Deviation': std,
        'All_Ratings': str(ratings)
    })

    if index < len(df) - 1:
        time.sleep(1)

results_df = pd.DataFrame(results)
results_df.to_csv(OUTPUT_CSV, index=False)

print(f"\nResults saved to {OUTPUT_CSV}")
print(f"Average sentiment: {results_df['Average_Rating'].mean():.2f}")
print(f"Range: {results_df['Average_Rating'].min()} - {results_df['Average_Rating'].max()}")
