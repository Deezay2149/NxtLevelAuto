import re

# Read billing.js
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add closeModal function before openCreateQuoteModal
close_modal_func = """// Generic modal close function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

"""

# Insert before openCreateQuoteModal
content = re.sub(
    r"function openCreateQuoteModal\(\)",
    close_modal_func + "function openCreateQuoteModal()",
    content
)

# Now add move line item functionality before renderInvoiceItemsFromInvoice
move_func = """// Move line item up or down
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

content = re.sub(
    r"function renderInvoiceItemsFromInvoice\(invoice\)",
    move_func + "function renderInvoiceItemsFromInvoice(invoice)",
    content
)

# Add move buttons to services, parts, and custom items
# Services
services_old = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('service', \${index}\)">✏️</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('service', \${index}\)">✕</button>\n                    </div>"""
services_new = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('service', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('service', ${index}, 'down')" ${index === invoice.services.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('service', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('service', ${index})">✕</button>
                    </div>"""
content = re.sub(services_old, services_new, content)

# Parts
parts_old = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('part', \${index}\)">✏️</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('part', \${index}\)">✕</button>\n                    </div>"""
parts_new = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('part', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('part', ${index}, 'down')" ${index === invoice.parts.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('part', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('part', ${index})">✕</button>
                    </div>"""
content = re.sub(parts_old, parts_new, content)

# Custom
custom_old = r"""                    <div class="line-item-actions">\n                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem\('custom', \${index}\)">✏️</button>\n                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem\('custom', \${index}\)">✕</button>\n                    </div>"""
custom_new = """                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-move-up" onclick="moveInvoiceLineItem('custom', ${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" class="btn btn-sm btn-move-down" onclick="moveInvoiceLineItem('custom', ${index}, 'down')" ${index === invoice.customItems.length - 1 ? 'disabled' : ''}>↓</button>
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('custom', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('custom', ${index})">✕</button>
                    </div>"""
content = re.sub(custom_old, custom_new, content)

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Added closeModal and move line item functionality")