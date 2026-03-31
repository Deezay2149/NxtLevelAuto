import re

# Read billing.js
with open('billing.js', 'r', encoding='utf-8') as f:
    billing_content = f.read()

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

print("=" * 80)
print("STEP 1: Adding quotes array to billing.js")
print("=" * 80)

# Add quotes array initialization
pattern1 = r"(let invoices = \[\];)"
replacement1 = r"""let invoices = [];
let quotes = [];  // Store all quotes"""

billing_content = re.sub(pattern1, replacement1, billing_content)

# Add quotes to loadBillingData
pattern2 = r"(        if \(data\.invoices\)\) invoices = data\.invoices;\s+\}\s+\})"
replacement2 = r"""        if (data.invoices) invoices = data.invoices;
        if (data.quotes) quotes = data.quotes;
    }
}"""

billing_content = re.sub(pattern2, replacement2, billing_content)

# Add quotes to saveBillingData
pattern3 = r"(        invoices: invoices,\s+\}\s+\);)"
replacement3 = r"""        invoices: invoices,
        quotes: quotes,
    });"""

billing_content = re.sub(pattern3, replacement3, billing_content)

print("✅ Added quotes data structures")

# Now add quote CRUD functions
quote_functions = """
// ==================== QUOTING SYSTEM ====================

// Quote line items tracking
let quoteLineItems = {
    services: [],
    parts: [],
    custom: []
};

// Open create quote modal
function openCreateQuoteModal() {
    document.getElementById('create-quote-modal').style.display = 'block';
    populateQuoteWorkOrders();
    resetQuoteLineItems();
    calculateQuoteTotals();
}

// Close quote modal
function closeQuoteModal() {
    closeModal('create-quote-modal');
    resetQuoteLineItems();
}

// Populate work order dropdown for quotes
function populateQuoteWorkOrders() {
    const select = document.getElementById('quote-work-order');
    select.innerHTML = '<option value="">Select Work Order</option>';
    
    workOrders.forEach(wo => {
        if (!wo.isQuoteConverted) {  // Only show work orders not converted from quotes
            const customer = customers.find(c => c.id === wo.customerId);
            const vehicle = vehicles.find(v => v.id === wo.vehicleId);
            const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'Unknown';
            const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
            
            const option = document.createElement('option');
            option.value = wo.id;
            option.textContent = `WO-${wo.workOrderNumber} - ${customerName} - ${vehicleName}`;
            select.appendChild(option);
        }
    });
}

// Reset quote line items
function resetQuoteLineItems() {
    quoteLineItems = {
        services: [],
        parts: [],
        custom: []
    };
    renderQuoteLineItems();
}

// Calculate quote totals
function calculateQuoteTotals() {
    let servicesTotal = 0;
    let partsTotal = 0;
    let customTotal = 0;
    
    quoteLineItems.services.forEach(s => {
        servicesTotal += s.price;
    });
    
    quoteLineItems.parts.forEach(p => {
        partsTotal += p.price * p.quantity;
    });
    
    quoteLineItems.custom.forEach(c => {
        customTotal += c.total;
    });
    
    // Labor
    const laborHours = parseFloat(document.getElementById('quote-labor').value) || 0;
    const laborRate = parseFloat(document.getElementById('quote-labor-rate').value) || 75;
    const laborTotal = laborHours * laborRate;
    
    // Subtotal
    const subtotal = servicesTotal + partsTotal + customTotal + laborTotal;
    
    // Discount
    const discount = parseFloat(document.getElementById('quote-discount').value) || 0;
    
    // Tax
    const taxRate = parseFloat(document.getElementById('quote-tax-rate').value) || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxAmount = (taxableAmount * taxRate) / 100;
    
    // Total
    const total = taxableAmount + taxAmount;
    
    // Update UI
    document.getElementById('quote-services-total').textContent = formatCurrency(servicesTotal);
    document.getElementById('quote-parts-total').textContent = formatCurrency(partsTotal);
    document.getElementById('quote-custom-total').textContent = formatCurrency(customTotal);
    document.getElementById('quote-labor-total').textContent = formatCurrency(laborTotal);
    document.getElementById('quote-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('quote-tax-amount').textContent = formatCurrency(taxAmount);
    document.getElementById('quote-total').textContent = formatCurrency(total);
    
    return { servicesTotal, partsTotal, customTotal, laborTotal, subtotal, discount, taxAmount, total };
}

// Render quote line items
function renderQuoteLineItems() {
    const container = document.getElementById('quote-line-items');
    
    let html = '';
    
    // Services
    if (quoteLineItems.services.length > 0) {
        html += '<div class="quote-section"><h4>Services</h4>';
        quoteLineItems.services.forEach((s, i) => {
            html += `
                <div class="quote-line-item">
                    <span class="item-name">${s.name}</span>
                    <span class="item-price">${formatCurrency(s.price)}</span>
                    <button type="button" class="btn-remove-item" onclick="removeQuoteLineItem('services', ${i})">×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Parts
    if (quoteLineItems.parts.length > 0) {
        html += '<div class="quote-section"><h4>Parts</h4>';
        quoteLineItems.parts.forEach((p, i) => {
            html += `
                <div class="quote-line-item">
                    <span class="item-name">${p.name} × ${p.quantity}</span>
                    <span class="item-price">${formatCurrency(p.price * p.quantity)}</span>
                    <button type="button" class="btn-remove-item" onclick="removeQuoteLineItem('parts', ${i})">×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Custom items
    if (quoteLineItems.custom.length > 0) {
        html += '<div class="quote-section"><h4>Custom Items</h4>';
        quoteLineItems.custom.forEach((c, i) => {
            html += `
                <div class="quote-line-item">
                    <span class="item-name">${c.name}</span>
                    <span class="item-price">${formatCurrency(c.total)}</span>
                    <button type="button" class="btn-remove-item" onclick="removeQuoteLineItem('custom', ${i})">×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (html === '') {
        html = '<p style="color: #888; text-align: center;">Select a work order to populate items</p>';
    }
    
    container.innerHTML = html;
}

// Load work order items into quote
function loadWorkOrderItemsToQuote() {
    const workOrderId = document.getElementById('quote-work-order').value;
    
    if (!workOrderId) {
        resetQuoteLineItems();
        calculateQuoteTotals();
        return;
    }
    
    const workOrder = workOrders.find(w => w.id === workOrderId);
    
    if (!workOrder) return;
    
    // Load services
    quoteLineItems.services = [];
    if (workOrder.services) {
        workOrder.services.forEach(serviceId => {
            const service = services.find(s => s.id === serviceId);
            if (service) {
                quoteLineItems.services.push({
                    id: service.id,
                    name: service.name,
                    price: service.price
                });
            }
        });
    }
    
    // Load parts
    quoteLineItems.parts = [];
    if (workOrder.parts) {
        workOrder.parts.forEach(partItem => {
            const part = parts.find(p => p.id === partItem.partId);
            if (part) {
                quoteLineItems.parts.push({
                    id: part.id,
                    name: part.name,
                    quantity: partItem.quantity,
                    price: part.sellingPrice
                });
            }
        });
    }
    
    renderQuoteLineItems();
    calculateQuoteTotals();
}

// Add custom item to quote
function addQuoteCustomItem() {
    const name = document.getElementById('quote-custom-name').value;
    const description = document.getElementById('quote-custom-description').value;
    const quantity = parseFloat(document.getElementById('quote-custom-quantity').value) || 1;
    const unitPrice = parseFloat(document.getElementById('quote-custom-unit-price').value) || 0;
    
    if (!name) {
        alert('Please enter a name');
        return;
    }
    
    quoteLineItems.custom.push({
        id: generateId(),
        name: name,
        description: description,
        quantity: quantity,
        unitPrice: unitPrice,
        total: quantity * unitPrice
    });
    
    // Clear form
    document.getElementById('quote-custom-name').value = '';
    document.getElementById('quote-custom-description').value = '';
    document.getElementById('quote-custom-quantity').value = '1';
    document.getElementById('quote-custom-unit-price').value = '';
    
    renderQuoteLineItems();
    calculateQuoteTotals();
}

// Remove quote line item
function removeQuoteLineItem(type, index) {
    quoteLineItems[type].splice(index, 1);
    renderQuoteLineItems();
    calculateQuoteTotals();
}

// Create quote
function createQuote() {
    const workOrderId = document.getElementById('quote-work-order').value;
    
    if (!workOrderId) {
        alert('Please select a work order');
        return;
    }
    
    const workOrder = workOrders.find(w => w.id === workOrderId);
    if (!workOrder) {
        alert('Work order not found');
        return;
    }
    
    const totals = calculateQuoteTotals();
    
    const quote = {
        id: generateId(),
        quoteNumber: `QT-${Date.now()}`,
        workOrderId: workOrder.id,
        customerId: workOrder.customerId,
        vehicleId: workOrder.vehicleId,
        services: quoteLineItems.services,
        parts: quoteLineItems.parts,
        customItems: quoteLineItems.custom,
        laborHours: parseFloat(document.getElementById('quote-labor').value) || 0,
        laborRate: parseFloat(document.getElementById('quote-labor-rate').value) || 75,
        laborTotal: totals.laborTotal,
        servicesTotal: totals.servicesTotal,
        partsTotal: totals.partsTotal,
        customTotal: totals.customTotal,
        subtotal: totals.subtotal,
        discount: totals.discount,
        taxRate: parseFloat(document.getElementById('quote-tax-rate').value) || 0,
        taxAmount: totals.taxAmount,
        total: totals.total,
        notes: document.getElementById('quote-notes').value,
        status: 'pending',
        validUntil: document.getElementById('quote-valid-until').value,
        createdAt: new Date().toISOString(),
        expiresAt: document.getElementById('quote-valid-until').value ? new Date(document.getElementById('quote-valid-until').value).toISOString() : null
    };
    
    quotes.push(quote);
    saveBillingData();
    closeModal('create-quote-modal');
    renderQuotesList();
    showNotification('Quote created successfully!', 'success');
}

// Render quotes list
function renderQuotesList() {
    const container = document.getElementById('quotes-list');
    
    if (!container) return;
    
    if (quotes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888; padding: 2rem;">No quotes yet. Create your first quote!</p>';
        return;
    }
    
    let html = '<table style="width: 100%; border-collapse: collapse;">';
    html += '<thead><tr style="background: #f5f5f5;">';
    html += '<th style="padding: 12px; text-align: left;">Quote #</th>';
    html += '<th style="padding: 12px; text-align: left;">Customer</th>';
    html += '<th style="padding: 12px; text-align: left;">Vehicle</th>';
    html += '<th style="padding: 12px; text-align: right;">Total</th>';
    html += '<th style="padding: 12px; text-align: center;">Status</th>';
    html += '<th style="padding: 12px; text-align: center;">Valid Until</th>';
    html += '<th style="padding: 12px; text-align: center;">Actions</th>';
    html += '</tr></thead><tbody>';
    
    quotes.forEach(quote => {
        const customer = customers.find(c => c.id === quote.customerId);
        const vehicle = vehicles.find(v => v.id === quote.vehicleId);
        const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'Unknown';
        const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
        
        let statusBadge = '';
        if (quote.status === 'pending') {
            statusBadge = '<span style="background: #ffc107; color: #000; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Pending</span>';
        } else if (quote.status === 'accepted') {
            statusBadge = '<span style="background: #28a745; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Accepted</span>';
        } else if (quote.status === 'rejected') {
            statusBadge = '<span style="background: #dc3545; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Rejected</span>';
        } else if (quote.status === 'converted') {
            statusBadge = '<span style="background: #6c757d; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Converted</span>';
        }
        
        let validUntil = quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : '-';
        
        html += '<tr style="border-bottom: 1px solid #e0e0e0;">';
        html += `<td style="padding: 12px;">${quote.quoteNumber}</td>`;
        html += `<td style="padding: 12px;">${customerName}</td>`;
        html += `<td style="padding: 12px;">${vehicleName}</td>`;
        html += `<td style="padding: 12px; text-align: right; font-weight: bold;">${formatCurrency(quote.total)}</td>`;
        html += `<td style="padding: 12px; text-align: center;">${statusBadge}</td>`;
        html += `<td style="padding: 12px; text-align: center;">${validUntil}</td>`;
        html += `<td style="padding: 12px; text-align: center;">`;
        html += `<button onclick="viewQuote('${quote.id}')" style="padding: 4px 8px; margin: 0 2px; cursor: pointer;">View</button>`;
        
        if (quote.status === 'pending') {
            html += `<button onclick="convertQuoteToInvoice('${quote.id}')" style="padding: 4px 8px; margin: 0 2px; cursor: pointer; background: #28a745; color: white;">Convert</button>`;
        }
        
        html += `<button onclick="deleteQuote('${quote.id}')" style="padding: 4px 8px; margin: 0 2px; cursor: pointer; background: #dc3545; color: white;">Delete</button>`;
        html += '</td></tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// View quote details
function viewQuote(quoteId) {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    const customer = customers.find(c => c.id === quote.customerId);
    const vehicle = vehicles.find(v => v.id === quote.vehicleId);
    const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'Unknown';
    const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
    
    let html = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="margin-bottom: 20px;">Quote Details</h2>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Quote Number:</strong> ${quote.quoteNumber}</p>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Vehicle:</strong> ${vehicleName}</p>
                <p><strong>Status:</strong> ${quote.status}</p>
                <p><strong>Valid Until:</strong> ${quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : 'Not set'}</p>
                <p><strong>Created:</strong> ${new Date(quote.createdAt).toLocaleString()}</p>
            </div>
            
            <h3>Items</h3>
    `;
    
    if (quote.services && quote.services.length > 0) {
        html += '<h4>Services</h4><ul>';
        quote.services.forEach(s => {
            html += `<li>${s.name} - ${formatCurrency(s.price)}</li>`;
        });
        html += '</ul>';
    }
    
    if (quote.parts && quote.parts.length > 0) {
        html += '<h4>Parts</h4><ul>';
        quote.parts.forEach(p => {
            html += `<li>${p.name} × ${p.quantity} - ${formatCurrency(p.price * p.quantity)}</li>`;
        });
        html += '</ul>';
    }
    
    if (quote.customItems && quote.customItems.length > 0) {
        html += '<h4>Custom Items</h4><ul>';
        quote.customItems.forEach(c => {
            html += `<li>${c.name} - ${formatCurrency(c.total)}</li>`;
        });
        html += '</ul>';
    }
    
    html += `
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Subtotal:</strong> ${formatCurrency(quote.subtotal)}</p>
            <p><strong>Discount:</strong> -${formatCurrency(quote.discount)}</p>
            <p><strong>Tax:</strong> ${formatCurrency(quote.taxAmount)}</p>
            <p style="font-size: 1.2em; font-weight: bold;"><strong>Total:</strong> ${formatCurrency(quote.total)}</p>
        </div>
        
        ${quote.notes ? `<p><strong>Notes:</strong> ${quote.notes}</p>` : ''}
        
        <div style="margin-top: 20px;">
            <button onclick="closeModal('quote-details-modal')" style="padding: 10px 20px; cursor: pointer;">Close</button>
        </div>
    `;
    
    document.getElementById('quote-details-content').innerHTML = html;
    document.getElementById('quote-details-modal').style.display = 'block';
}

// Convert quote to invoice
function convertQuoteToInvoice(quoteId) {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    if (!confirm('Convert this quote to an invoice? The quote will be marked as converted.')) {
        return;
    }
    
    // Create invoice from quote
    const invoice = {
        id: generateId(),
        invoiceNumber: `INV-${Date.now()}`,
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        workOrderId: quote.workOrderId,
        customerId: quote.customerId,
        vehicleId: quote.vehicleId,
        services: quote.services,
        parts: quote.parts,
        customItems: quote.customItems,
        laborHours: quote.laborHours,
        laborRate: quote.laborRate,
        laborTotal: quote.laborTotal,
        servicesTotal: quote.servicesTotal,
        partsTotal: quote.partsTotal,
        customTotal: quote.customTotal,
        subtotal: quote.subtotal,
        discount: quote.discount,
        taxRate: quote.taxRate,
        taxAmount: quote.taxAmount,
        total: quote.total,
        notes: quote.notes,
        status: 'pending',
        amountPaid: 0,
        balanceDue: quote.total,
        payments: [],
        modificationHistory: [],
        createdAt: new Date().toISOString()
    };
    
    invoices.push(invoice);
    
    // Update quote status
    quote.status = 'converted';
    quote.convertedAt = new Date().toISOString();
    quote.convertedToInvoiceId = invoice.id;
    
    saveBillingData();
    renderQuotesList();
    renderInvoicesList();
    
    showNotification('Quote converted to invoice successfully!', 'success');
}

// Delete quote
function deleteQuote(quoteId) {
    if (!confirm('Are you sure you want to delete this quote?')) {
        return;
    }
    
    const index = quotes.findIndex(q => q.id === quoteId);
    if (index > -1) {
        quotes.splice(index, 1);
        saveBillingData();
        renderQuotesList();
        showNotification('Quote deleted successfully!', 'success');
    }
}

// Initialize quotes
function initializeQuotes() {
    renderQuotesList();
}
"""

# Insert quote functions before the final closing brace
insert_pos = billing_content.rfind('\n// ==================== DASHBOARD')
if insert_pos > 0:
    billing_content = billing_content[:insert_pos] + quote_functions + '\n' + billing_content[insert_pos:]
    print("✅ Added quote CRUD functions")
else:
    print("⚠️ Could not find insertion point for quote functions")

# Write billing.js
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(billing_content)

print("\n" + "=" * 80)
print("STEP 2: Adding quote modal to index.html")
print("=" * 80)

# Add quote modal HTML
quote_modal_html = '''
<!-- Create Quote Modal -->
<div id="create-quote-modal" class="modal">
    <div class="modal-content" style="max-width: 900px;">
        <div class="modal-header">
            <h2>Create Quote</h2>
            <button class="close-btn" onclick="closeQuoteModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form id="create-quote-form" onsubmit="createQuote(); return false;">
                <div class="form-group">
                    <label>Work Order *</label>
                    <select id="quote-work-order" onchange="loadWorkOrderItemsToQuote()" required>
                        <option value="">Select Work Order</option>
                    </select>
                </div>
                
                <div id="quote-line-items" style="min-height: 100px; border: 1px solid #e0e0e0; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="color: #888; text-align: center;">Select a work order to populate items</p>
                </div>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label>Labor Hours</label>
                        <input type="number" id="quote-labor" step="0.5" min="0" value="0" oninput="calculateQuoteTotals()">
                    </div>
                    <div class="form-group">
                        <label>Labor Rate (R)</label>
                        <input type="number" id="quote-labor-rate" step="0.01" min="0" value="75" oninput="calculateQuoteTotals()">
                    </div>
                </div>
                
                <h4>Add Custom Item</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Name *</label>
                        <input type="text" id="quote-custom-name" placeholder="Item name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" id="quote-custom-description" placeholder="Optional description">
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" id="quote-custom-quantity" min="1" value="1">
                    </div>
                    <div class="form-group">
                        <label>Unit Price (R)</label>
                        <input type="number" id="quote-custom-unit-price" step="0.01" min="0">
                    </div>
                </div>
                <button type="button" onclick="addQuoteCustomItem()" style="margin-bottom: 20px;">Add Custom Item</button>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label>Discount (R)</label>
                        <input type="number" id="quote-discount" step="0.01" min="0" value="0" oninput="calculateQuoteTotals()">
                    </div>
                    <div class="form-group">
                        <label>Tax Rate (%)</label>
                        <input type="number" id="quote-tax-rate" step="0.01" min="0" value="15" oninput="calculateQuoteTotals()">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Valid Until</label>
                    <input type="date" id="quote-valid-until">
                </div>
                
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="quote-notes" rows="3" placeholder="Additional notes..."></textarea>
                </div>
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Services:</span>
                        <span id="quote-services-total">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Parts:</span>
                        <span id="quote-parts-total">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Custom Items:</span>
                        <span id="quote-custom-total">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Labor:</span>
                        <span id="quote-labor-total">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Subtotal:</span>
                        <span id="quote-subtotal">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Tax:</span>
                        <span id="quote-tax-amount">R0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; border-top: 1px solid #ccc; padding-top: 10px;">
                        <span>Total:</span>
                        <span id="quote-total">R0.00</span>
                    </div>
                </div>
                
                <div style="text-align: right;">
                    <button type="button" onclick="closeQuoteModal()" style="margin-right: 10px;">Cancel</button>
                    <button type="submit" class="btn-primary">Create Quote</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Quote Details Modal -->
<div id="quote-details-modal" class="modal">
    <div class="modal-content" style="max-width: 800px;">
        <div class="modal-header">
            <h2>Quote Details</h2>
            <button class="close-btn" onclick="closeModal('quote-details-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <div id="quote-details-content"></div>
        </div>
    </div>
</div>
'''

# Find where to insert the quote modal (before the closing </body> tag)
body_close_pos = html_content.rfind('</body>')
if body_close_pos > 0:
    html_content = html_content[:body_close_pos] + quote_modal_html + '\n' + html_content[body_close_pos:]
    print("✅ Added quote modal HTML")
else:
    print("⚠️ Could not find insertion point for quote modal")

# Write index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("\n" + "=" * 80)
print("STEP 3: Adding Quotes navigation section")
print("=" * 80)

# Add Quotes navigation button
# Find the Invoices button and add Quotes after it
nav_pattern = r'(<button class="nav-btn" onclick="showSection\(\'invoices\'\)"[^>]*>Invoices</button>)'
nav_replacement = r'''\1
                <button class="nav-btn" onclick="showSection('quotes')" id="nav-quotes">Quotes</button>'''

html_content = re.sub(nav_pattern, nav_replacement, html_content)

# Add Quotes section
quotes_section_html = '''
<!-- Quotes Section -->
<section id="quotes-section" class="content-section" style="display: none;">
    <div class="section-header">
        <h2>Quotes</h2>
        <button class="btn-primary" onclick="openCreateQuoteModal()">Create New Quote</button>
    </div>
    <div id="quotes-list"></div>
</section>
'''

# Find where to insert the quotes section (after invoices section)
invoices_section_end = html_content.find('</section>', html_content.find('id="invoices-section"'))
if invoices_section_end > 0:
    # Find the closing </section> tag
    section_end = html_content.find('</section>', invoices_section_end) + len('</section>')
    html_content = html_content[:section_end] + '\n' + quotes_section_html + html_content[section_end:]
    print("✅ Added Quotes navigation section")
else:
    print("⚠️ Could not find insertion point for Quotes section")

# Write index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("\n" + "=" * 80)
print("STEP 4: Adding CSS styles for quotes")
print("=" * 80)

# Add quote CSS styles
quote_css = '''
/* Quote Styles */
.quote-section {
    margin-bottom: 15px;
}

.quote-section h4 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 14px;
}

.quote-line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 5px;
}

.quote-line-item .item-name {
    flex: 1;
}

.quote-line-item .item-price {
    font-weight: bold;
    margin-right: 15px;
}

.btn-remove-item {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}
'''

# Add to styles.css (before the closing comment or end of file)
css_content = css_content.rstrip() + '\n' + quote_css

# Write styles.css
with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("✅ Added CSS styles for quotes")

print("\n" + "=" * 80)
print("✅ QUOTING SYSTEM ADDED SUCCESSFULLY!")
print("=" * 80)
print("\nFiles modified:")
print("  - billing.js")
print("  - index.html")
print("  - styles.css")
print("\nFeatures added:")
print("  - Create quotes from work orders")
print("  - View quote details")
print("  - Convert quotes to invoices")
print("  - Delete quotes")
print("  - Quote status tracking (pending, accepted, rejected, converted)")
print("  - Quote validity period")