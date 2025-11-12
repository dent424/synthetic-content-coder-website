# -*- coding: utf-8 -*-
"""
Basic Image Rating with GPT-4.1

A minimal example demonstrating the core concepts of LLM-based image coding.
Rates 3 sample images with simplified code structure.
"""

import time
from openai import OpenAI

# --------------------- Configuration ---------------------

API_KEY = 'your-api-key-here'
client = OpenAI(api_key=API_KEY)

# Number of ratings to collect per image
RATINGS_PER_IMAGE = 5

# Sample images to rate (replace with your own URLs)
IMAGE_URLS = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
]

# --------------------- Rating Prompt ---------------------

PROMPT = """Rate this image on a scale from 1-5, where 1 is low quality and 5 is high quality.

Respond with only a single number (1-5)."""

# --------------------- Rating Function ---------------------

def rate_image(image_url):
    """Get multiple ratings for a single image."""

    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": image_url}
                    }
                ]
            }
        ],
        n=RATINGS_PER_IMAGE,
        max_tokens=10,
        temperature=1
    )

    # Extract ratings from responses
    ratings = []
    for choice in response.choices:
        rating = int(choice.message.content.strip())
        ratings.append(rating)

    return ratings

# --------------------- Main Process ---------------------

def main():
    """Rate all sample images and display results."""

    print("Starting image rating...")
    print(f"Rating {len(IMAGE_URLS)} images with {RATINGS_PER_IMAGE} ratings each\n")

    for i, url in enumerate(IMAGE_URLS, 1):
        print(f"Rating image {i}...")
        ratings = rate_image(url)

        avg = sum(ratings) / len(ratings)
        print(f"  URL: {url}")
        print(f"  Ratings: {ratings}")
        print(f"  Average: {avg:.2f}\n")

        # Brief delay between images
        if i < len(IMAGE_URLS):
            time.sleep(1)

    print("Rating complete!")

# --------------------- Run Script ---------------------

if __name__ == "__main__":
    main()
