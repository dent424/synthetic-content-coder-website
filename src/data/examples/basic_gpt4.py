# -*- coding: utf-8 -*-
"""
Basic Image Rating with GPT-4.1

A minimal example demonstrating the core concepts of LLM-based image coding.
Rates 3 sample images with simplified code structure.
"""

import time
from openai import OpenAI

API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)

N_RATINGS = 5

IMAGE_URLS = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
]

PROMPT = """Rate this image on a scale from 1-5, where 1 is low quality and 5 is high quality.

Respond with only a single number (1-5)."""

def rate_image(url):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": url}
                    }
                ]
            }
        ],
        n=N_RATINGS,
        max_tokens=10,
        temperature=1
    )

    ratings = []
    for choice in response.choices:
        rating = int(choice.message.content.strip())
        ratings.append(rating)

    return ratings

for i, url in enumerate(IMAGE_URLS, 1):
    print(f"Rating image {i}...")
    ratings = rate_image(url)

    print(f"  Ratings: {ratings}")
    print(f"  Average: {sum(ratings)/len(ratings):.2f}\n")

    if i < len(IMAGE_URLS):
        time.sleep(1)
