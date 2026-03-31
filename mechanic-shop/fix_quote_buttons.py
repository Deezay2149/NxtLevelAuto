#!/usr/bin/env python3
import re

# Read the billing.js file
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the renderQuotesList function - replace HTML entities with actual quotes
# First, let's just replace the problematic " entities in onclick handlers
content = content.replace('"viewQuote(', '"viewQuote(')
content = content.replace('viewQuote(\'${quote.id}\')"', 'viewQuote(\'\' + quote.id + \'\')"')
content = content.replace('"convertQuoteToInvoice(', '"convertQuoteToInvoice(')
content = content.replace('convertQuoteToInvoice(\'${quote.id}\')"', 'convertQuoteToInvoice(\'\' + quote.id + \'\')"')
content = content.replace('"deleteQuote(', '"deleteQuote(')
content = content.replace('deleteQuote(\'${quote.id}\')"', 'deleteQuote(\'\' + quote.id + \'\')"')

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed quote buttons!")
