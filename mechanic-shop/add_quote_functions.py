# Read billing.js
with open('billing.js', 'r', encoding='utf-8') as f:
    content = f.read()

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
        if (!wo.isQuoteConverted) {
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
        html += '<div class=&quot;quote-section&quot;><h4>Services</h4>';
        quoteLineItems.services.forEach((s, i) => {
            html += `
                <div class=&quot;quote-line-item&quot;>
                    <span class=&quot;item-name&quot;>${s.name}</span>
                    <span class=&quot;item-price&quot;>${formatCurrency(s.price)}</span>
                    <button type=&quot;button&quot; class=&quot;btn-remove-item&quot; onclick=&quot;removeQuoteLineItem('services', ${i})&quot;>×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Parts
    if (quoteLineItems.parts.length > 0) {
        html += '<div class=&quot;quote-section&quot;><h4>Parts</h4>';
        quoteLineItems.parts.forEach((p, i) => {
            html += `
                <div class=&quot;quote-line-item&quot;>
                    <span class=&quot;item-name&quot;>${p.name} × ${p.quantity}</span>
                    <span class=&quot;item-price&quot;>${formatCurrency(p.price * p.quantity)}</span>
                    <button type=&quot;button&quot; class=&quot;btn-remove-item&quot; onclick=&quot;removeQuoteLineItem('parts', ${i})&quot;>×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Custom items
    if (quoteLineItems.custom.length > 0) {
        html += '<div class=&quot;quote-section&quot;><h4>Custom Items</h4>';
        quoteLineItems.custom.forEach((c, i) => {
            html += `
                <div class=&quot;quote-line-item&quot;>
                    <span class=&quot;item-name&quot;>${c.name}</span>
                    <span class=&quot;item-price&quot;>${formatCurrency(c.total)}</span>
                    <button type=&quot;button&quot; class=&quot;btn-remove-item&quot; onclick=&quot;removeQuoteLineItem('custom', ${i})&quot;>×</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (html === '') {
        html = '<p style=&quot;color: #888; text-align: center;&quot;>Select a work order to populate items</p>';
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
        container.innerHTML = '<p style=&quot;text-align: center; color: #888; padding: 2rem;&quot;>No quotes yet. Create your first quote!</p>';
        return;
    }
    
    let html = '<table style=&quot;width: 100%; border-collapse: collapse;&quot;>';
    html += '<thead><tr style=&quot;background: #f5f5f5;&quot;>';
    html += '<th style=&quot;padding: 12px; text-align: left;&quot;>Quote #</th>';
    html += '<th style=&quot;padding: 12px; text-align: left;&quot;>Customer</th>';
    html += '<th style=&quot;padding: 12px; text-align: left;&quot;>Vehicle</th>';
    html += '<th style=&quot;padding: 12px; text-align: right;&quot;>Total</th>';
    html += '<th style=&quot;padding: 12px; text-align: center;&quot;>Status</th>';
    html += '<th style=&quot;padding: 12px; text-align: center;&quot;>Valid Until</th>';
    html += '<th style=&quot;padding: 12px; text-align: center;&quot;>Actions</th>';
    html += '</tr></thead><tbody>';
    
    quotes.forEach(quote => {
        const customer = customers.find(c => c.id === quote.customerId);
        const vehicle = vehicles.find(v => v.id === quote.vehicleId);
        const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'Unknown';
        const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
        
        let statusBadge = '';
        if (quote.status === 'pending') {
            statusBadge = '<span style=&quot;background: #ffc107; color: #000; padding: 4px 8px; border-radius: 12px; font-size: 12px;&quot;>Pending</span>';
        } else if (quote.status === 'accepted') {
            statusBadge = '<span style=&quot;background: #28a745; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;&quot;>Accepted</span>';
        } else if (quote.status === 'rejected') {
            statusBadge = '<span style=&quot;background: #dc3545; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;&quot;>Rejected</span>';
        } else if (quote.status === 'converted') {
            statusBadge = '<span style=&quot;background: #6c757d; color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 12px;&quot;>Converted</span>';
        }
        
        let validUntil = quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : '-';
        
        html += '<tr style=&quot;border-bottom: 1px solid #e0e0e0;&quot;>';
        html += `<td style=&quot;padding: 12px;&quot;>${quote.quoteNumber}</td>`;
        html += `<td style=&quot;padding: 12px;&quot;>${customerName}</td>`;
        html += `<td style=&quot;padding: 12px;&quot;>${vehicleName}</td>`;
        html += `<td style=&quot;padding: 12px; text-align: right; font-weight: bold;&quot;>${formatCurrency(quote.total)}</td>`;
        html += `<td style=&quot;padding: 12px; text-align: center;&quot;>${statusBadge}</td>`;
        html += `<td style=&quot;padding: 12px; text-align: center;&quot;>${validUntil}</td>`;
        html += `<td style=&quot;padding: 12px; text-align: center;&quot;>`;
        html += `<button onclick=&quot;viewQuote('${quote.id}')&quot; style=&quot;padding: 4px 8px; margin: 0 2px; cursor: pointer;&quot;>View</button>`;
        
        if (quote.status === 'pending') {
            html += `<button onclick=&quot;convertQuoteToInvoice('${quote.id}')&quot; style=&quot;padding: 4px 8px; margin: 0 2px; cursor: pointer; background: #28a745; color: white;&quot;>Convert</button>`;
        }
        
        html += `<button onclick=&quot;deleteQuote('${quote.id}')&quot; style=&quot;padding: 4px 8px; margin: 0 2px; cursor: pointer; background: #dc3545; color: white;&quot;>Delete</button>`;
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
        <div style=&quot;max-width: 800px; margin: 0 auto; padding: 20px;&quot;>
            <h2 style=&quot;margin-bottom: 20px;&quot;>Quote Details</h2>
            <div style=&quot;background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;&quot;>
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
        <div style=&quot;background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;&quot;>
            <p><strong>Subtotal:</strong> ${formatCurrency(quote.subtotal)}</p>
            <p><strong>Discount:</strong> -${formatCurrency(quote.discount)}</p>
            <p><strong>Tax:</strong> ${formatCurrency(quote.taxAmount)}</p>
            <p style=&quot;font-size: 1.2em; font-weight: bold;&quot;><strong>Total:</strong> ${formatCurrency(quote.total)}</p>
        </div>
        
        ${quote.notes ? `<p><strong>Notes:</strong> ${quote.notes}</p>` : ''}
        
        <div style=&quot;margin-top: 20px;&quot;>
            <button onclick=&quot;closeModal('quote-details-modal')&quot; style=&quot;padding: 10px 20px; cursor: pointer;&quot;>Close</button>
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

# Append to billing.js
content = content.rstrip() + quote_functions

# Write back
with open('billing.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Added quote functions to billing.js")