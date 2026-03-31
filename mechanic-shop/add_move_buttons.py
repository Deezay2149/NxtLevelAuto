import re

# Read billing.js
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for services line item actions (with escaped unicode)
services_pattern = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('service', \${index}\)">\\\\u270f\\\\ufe0f</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('service', \${index}\)">\\\\u2715</button>\n                    </div>"""

services_replacement = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('service', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('service', ${index}, 'down')" ${index === invoice.services.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('service', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('service', ${index})">✕</button>
                    </div>"""

content = re.sub(services_pattern, services_replacement, content)

# Pattern for parts line item actions
parts_pattern = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('part', \${index}\)">\\\\u270f\\\\ufe0f</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('part', \${index}\)">\\\\u2715</button>\n                    </div>"""

parts_replacement = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('part', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('part', ${index}, 'down')" ${index === invoice.parts.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('part', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('part', ${index})">✕</button>
                    </div>"""

content = re.sub(parts_pattern, parts_replacement, content)

# Pattern for custom items line item actions
custom_pattern = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('custom', \${index}\)">\\\\u270f\\\\ufe0f</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('custom', \${index}\)">\\\\u2715</button>\n                    </div>"""

custom_replacement = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('custom', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('custom', ${index}, 'down')" ${index === invoice.customItems.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('custom', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('custom', ${index})">✕</button>
                    </div>"""

content = re.sub(custom_pattern, custom_replacement, content)

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Added move buttons to billing.js")