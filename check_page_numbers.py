import re

with open("Lenscraft_5_AI_Technologies_Implementation.pdf", "rb") as f:
    data = f.read()

# Let's inspect pages
pages = data.split(b"/Type /Page\n")
print(f"Number of page chunks: {len(pages)}")

