# Read billing.js
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add move line item functions before renderInvoiceItemsFromInvoice
move_functions = """
// Move line item up or down
function moveInvoiceLineItem(type, index, direction) {
    const invoice = currentEditingInvoice;
    if (!invoice) return;
    
    let itemsArray;
    if (type === 'service') {
        itemsArray = invoice.services;
    } else if (type === 'part') {
        itemsArray = invoice.parts;
    } else if (type === 'custom') {
        itemsArray = invoice.customItems;
    } else {
        return;
    }
    
    if (!itemsArray || itemsArray.length <= 1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Check bounds
    if (newIndex < 0 || newIndex >= itemsArray.length) return;
    
    // Swap items
    const temp = itemsArray[index];
    itemsArray[index] = itemsArray[newIndex];
    itemsArray[newIndex] = temp;
    
    // Re-render
    renderInvoiceItemsFromInvoice(invoice);
    calculateInvoiceTotals();
    
    // Save immediately
    saveBillingData();
}
"""

# Find the function renderInvoiceItemsFromInvoice and insert before it
import re
insert_pattern = r"function renderInvoiceItemsFromInvoice\(invoice\) \{"
content = re.sub(insert_pattern, move_functions + "\n" + insert_pattern, content)

# Now update the render function to include move buttons
# Update services section - find and replace
services_old = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('service', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('service', ${index})">✕</button>
                    </div>'''

services_new = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('service', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('service', ${index}, 'down')" ${index === invoice.services.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('service', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('service', ${index})">✕</button>
                    </div>'''

content = content.replace(services_old, services_new)

# Update parts section
parts_old = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('part', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('part', ${index})">✕</button>
                    </div>'''

parts_new = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('part', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('part', ${index}, 'down')" ${index === invoice.parts.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('part', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('part', ${index})">✕</button>
                    </div>'''

content = content.replace(parts_old, parts_new)

# Update custom items section
custom_old = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('custom', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('custom', ${index})">✕</button>
                    </div>'''

custom_new = '''                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('custom', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('custom', ${index}, 'down')" ${index === invoice.customItems.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('custom', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('custom', ${index})">✕</button>
                    </div>'''

content = content.replace(custom_old, custom_new)

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Added move line item functionality to billing.js")