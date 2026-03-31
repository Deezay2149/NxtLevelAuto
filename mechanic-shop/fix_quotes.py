#!/usr/bin/env python3

# Read the billing.js file
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the renderQuotesList function
# First, let's just replace all " with actual quotes in the entire file
content = content.replace('"', '"')

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed all HTML entities in billing.js!")
