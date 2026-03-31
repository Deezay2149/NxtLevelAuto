// Parts Management
let parts = JSON.parse(localStorage.getItem('parts')) || [];
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
let currentPartImageData = null;

// Initialize Billing Features
function initializeBilling() {
    initializePartsManagement();
    initializeInvoices();
    renderPartsList();
    renderInvoicesList();
}

// Parts Management Functions
function openPartModal() {
    document.getElementById('part-form').reset();
    document.getElementById('part-id').value = '';
    document.getElementById('part-image-preview').innerHTML = '';
    document.getElementById('part-cost-ex-vat').value = '';
    document.getElementById('part-cost-inc-vat').value = '';
    document.getElementById('part-price').value = '';
    document.getElementById('part-price-mode').value = 'manual';
    document.getElementById('markup-percentage-group').style.display = 'none';
    
    // Reset profit display
    document.getElementById('display-cost-ex-vat').textContent = 'R0.00';
    document.getElementById('display-selling-price').textContent = 'R0.00';
    document.getElementById('display-profit').textContent = 'R0.00';
    document.getElementById('display-profit-margin').textContent = '0%';
    
    // Populate supplier dropdown
    populateSupplierDropdowns();
    
    currentPartImageData = null;
    openModal('part-modal');
}

function savePart(e) {
    e.preventDefault();
    
    const id = document.getElementById('part-id').value || generateId();
    const existingPart = parts.find(p => p.id === id);
    const supplierId = document.getElementById('part-supplier').value;
    const supplier = suppliers.find(s => s.id === supplierId);
    
    const part = {
        id: id,
        name: document.getElementById('part-name').value,
        sku: document.getElementById('part-sku').value,
        description: document.getElementById('part-description').value,
        costExVat: parseFloat(document.getElementById('part-cost-ex-vat').value) || 0,
        costPrice: parseFloat(document.getElementById('part-cost-inc-vat').value) || parseFloat(document.getElementById('part-cost-ex-vat').value) || 0,
        sellingPrice: parseFloat(document.getElementById('part-price').value) || 0,
        stockQuantity: parseInt(document.getElementById('part-stock').value) || 0,
        supplierId: supplierId,
        supplier: supplier ? supplier.name : '',
        image: currentPartImageData || (existingPart ? existingPart.image : null),
        createdAt: existingPart ? existingPart.createdAt : new Date().toISOString()
    };
    
    const existingIndex = parts.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
        parts[existingIndex] = part;
    } else {
        parts.push(part);
    }
    
    saveBillingData();
    closeModal('part-modal');
    renderPartsList();
    showNotification('Part saved successfully!', 'success');
    currentPartImageData = null;
}

function renderPartsList() {
    const container = document.getElementById('parts-list');
    
    if (parts.length === 0) {
        container.innerHTML = '<p class="empty-state">No parts found. Add your first part!</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'parts-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Part Name</th>
                <th>SKU</th>
                <th>Cost</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Supplier</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${parts.map(part => {
                const stockClass = part.stockQuantity <= 5 ? 'stock-low' : part.stockQuantity <= 20 ? 'stock-medium' : 'stock-good';
                const imageHTML = part.image 
                    ? `<img src="${part.image}" class="vehicle-thumbnail" onclick="showPartImage('${part.id}')" alt="Part Image">` 
                    : '<span style="color: var(--text-light); font-size: 0.8rem;">No image</span>';
                return `
                <tr>
                    <td>${imageHTML}</td>
                    <td>${part.name}</td>
                    <td>${part.sku || 'N/A'}</td>
                    <td>${formatCurrency(part.costPrice)}</td>
                    <td>${formatCurrency(part.sellingPrice)}</td>
                    <td><span class="stock-badge ${stockClass}">${part.stockQuantity}</span></td>
                    <td>${part.supplier || 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editPart('${part.id}')">Edit</button>
                            <button class="btn btn-success" onclick="adjustStock('${part.id}')">Stock</button>
                            <button class="btn btn-danger" onclick="deletePart('${part.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function editPart(id) {
    const part = parts.find(p => p.id === id);
    if (!part) return;
    
    document.getElementById('part-id').value = part.id;
    document.getElementById('part-name').value = part.name;
    document.getElementById('part-sku').value = part.sku || '';
    document.getElementById('part-description').value = part.description || '';
    document.getElementById('part-cost-ex-vat').value = part.costExVat || part.costPrice || 0;
    document.getElementById('part-price').value = part.sellingPrice;
    document.getElementById('part-supplier').value = part.supplierId || '';
    document.getElementById('part-stock').value = part.stockQuantity;
    
    // Calculate VAT and profit display
    calculatePartPricing();
    
    // Show image preview if exists
    const previewContainer = document.getElementById('part-image-preview');
    if (part.image) {
        currentPartImageData = part.image;
        previewContainer.innerHTML = `
            <img src="${part.image}" class="vehicle-image-preview" onclick="document.getElementById('part-image').click()">
            <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">Click to change image</p>
        `;
    } else {
        currentPartImageData = null;
        previewContainer.innerHTML = '';
    }
    
    openModal('part-modal');
}

function previewPartImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            input.value = '';
            return;
        }
        
        // Check file type
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            currentPartImageData = e.target.result;
            const previewContainer = document.getElementById('part-image-preview');
            previewContainer.innerHTML = `
                <img src="${currentPartImageData}" class="vehicle-image-preview" onclick="document.getElementById('part-image').click()">
                <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">Click to change image</p>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function showPartImage(id) {
    const part = parts.find(p => p.id === id);
    if (!part || !part.image) return;
    
    const displayContainer = document.getElementById('part-image-display');
    displayContainer.innerHTML = `
        <img src="${part.image}" class="vehicle-image-full" alt="Full Part Image">
        <p style="margin-top: 1rem; color: var(--text-light);">${part.name}</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="closeModal('part-image-modal')">Close</button>
    `;
    
    openModal('part-image-modal');
}

function adjustStock(id) {
    const part = parts.find(p => p.id === id);
    if (!part) return;
    
    const adjustment = prompt(`Current stock: ${part.stockQuantity}\n\nEnter stock adjustment (positive to add, negative to remove):`);
    
    if (adjustment !== null && adjustment !== '') {
        const newStock = part.stockQuantity + parseInt(adjustment);
        if (newStock < 0) {
            alert('Stock cannot be negative!');
            return;
        }
        
        part.stockQuantity = newStock;
        saveBillingData();
        renderPartsList();
        showNotification(`Stock adjusted to ${newStock}`, 'success');
    }
}

function deletePart(id) {
    if (!confirm('Are you sure you want to delete this part?')) return;
    
    parts = parts.filter(p => p.id !== id);
    saveBillingData();
    renderPartsList();
    showNotification('Part deleted!', 'success');
}

// Invoice Management Functions
function openCreateInvoiceModal() {
    document.getElementById('create-invoice-form').reset();
    document.getElementById('invoice-id').value = '';
    document.getElementById('invoice-services-list').innerHTML = '';
    document.getElementById('invoice-parts-list').innerHTML = '';
    document.getElementById('invoice-custom-items-list').innerHTML = '';
    populateWorkOrderDropdown();
    
    // Reset invoice edit mode
    resetInvoiceEditMode();
    
    // Set default values from global settings
    document.getElementById('invoice-tax-rate').value = getTaxRate();
    document.getElementById('invoice-labor-rate').value = getLaborRate();
    
    openModal('create-invoice-modal');
}

function populateWorkOrderDropdown() {
    const workOrderSelect = document.getElementById('invoice-work-order');
    workOrderSelect.innerHTML = '<option value="">Select Work Order</option>';
    
    // Get work orders that don't have invoices yet
    const invoicedWorkOrderIds = invoices.map(i => i.workOrderId);
    const availableWorkOrders = workOrders.filter(w => !invoicedWorkOrderIds.includes(w.id));
    
    if (availableWorkOrders.length === 0) {
        if (workOrders.length === 0) {
            workOrderSelect.innerHTML += '<option value="" disabled>No work orders found. Create a work order first.</option>';
        } else {
            workOrderSelect.innerHTML += '<option value="" disabled>All work orders have invoices</option>';
        }
        return;
    }
    
    // Group by status for better organization
    const completedOrders = availableWorkOrders.filter(w => w.status === 'completed');
    const inProgressOrders = availableWorkOrders.filter(w => w.status === 'in-progress');
    const pendingOrders = availableWorkOrders.filter(w => w.status === 'pending');
    
    // Add completed orders first (recommended for invoicing)
    if (completedOrders.length > 0) {
        workOrderSelect.innerHTML += '<optgroup label="✅ Completed (Ready for Invoice)">';
        completedOrders.forEach(workOrder => {
            const customer = customers.find(c => c.id === workOrder.customerId);
            const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
            const label = `WO #${workOrder.id.substring(0, 8).toUpperCase()} - ${customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'} - ${vehicle ? `${vehicle.make} ${vehicle.model}` : ''}`;
            workOrderSelect.innerHTML += `<option value="${workOrder.id}">${label}</option>`;
        });
        workOrderSelect.innerHTML += '</optgroup>';
    }
    
    // Add in-progress orders
    if (inProgressOrders.length > 0) {
        workOrderSelect.innerHTML += '<optgroup label="🔧 In Progress">';
        inProgressOrders.forEach(workOrder => {
            const customer = customers.find(c => c.id === workOrder.customerId);
            const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
            const label = `WO #${workOrder.id.substring(0, 8).toUpperCase()} - ${customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'} - ${vehicle ? `${vehicle.make} ${vehicle.model}` : ''}`;
            workOrderSelect.innerHTML += `<option value="${workOrder.id}">${label}</option>`;
        });
        workOrderSelect.innerHTML += '</optgroup>';
    }
    
    // Add pending orders
    if (pendingOrders.length > 0) {
        workOrderSelect.innerHTML += '<optgroup label="⏳ Pending">';
        pendingOrders.forEach(workOrder => {
            const customer = customers.find(c => c.id === workOrder.customerId);
            const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
            const label = `WO #${workOrder.id.substring(0, 8).toUpperCase()} - ${customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'} - ${vehicle ? `${vehicle.make} ${vehicle.model}` : ''}`;
            workOrderSelect.innerHTML += `<option value="${workOrder.id}">${label}</option>`;
        });
        workOrderSelect.innerHTML += '</optgroup>';
    }
}

function loadWorkOrderData() {
    const workOrderId = document.getElementById('invoice-work-order').value;
    if (!workOrderId) {
        document.getElementById('invoice-customer').value = '';
        document.getElementById('invoice-vehicle').value = '';
        document.getElementById('invoice-services-list').innerHTML = '';
        document.getElementById('invoice-parts-list').innerHTML = '';
        document.getElementById('invoice-custom-items-list').innerHTML = '';
        document.getElementById('invoice-labor').value = '';
        document.getElementById('invoice-actions-bar').style.display = 'none';
        return;
    }
    
    const workOrder = workOrders.find(w => w.id === workOrderId);
    if (!workOrder) return;
    
    const customer = customers.find(c => c.id === workOrder.customerId);
    const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
    
    document.getElementById('invoice-customer').value = customer ? `${customer.firstName} ${customer.lastName}` : '';
    document.getElementById('invoice-vehicle').value = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
    document.getElementById('invoice-labor').value = workOrder.laborHours || 0;
    
    // Show actions bar for editing
    document.getElementById('invoice-actions-bar').style.display = 'flex';
    
    // Reset line items when loading new work order
    invoiceLineItems = { services: [], parts: [], custom: [] };
    
    // If in edit mode, render editable items
    if (invoiceEditMode) {
        renderEditableInvoiceItems();
    } else {
        // Load services (read-only mode)
        let servicesHTML = '<div class="invoice-items-section"><h4>🔧 Services</h4>';
        workOrder.services.forEach(serviceId => {
            const service = services.find(s => s.id === serviceId);
            if (service) {
                servicesHTML += `
                    <div class="invoice-item">
                        <div class="invoice-item-name">${service.name}</div>
                        <div class="invoice-item-price">${formatCurrency(service.price)}</div>
                    </div>
                `;
            }
        });
        servicesHTML += '</div>';
        document.getElementById('invoice-services-list').innerHTML = servicesHTML;
        
        // Load parts if any (read-only mode)
        let partsHTML = '<div class="invoice-items-section"><h4>🔩 Parts</h4>';
        if (workOrder.parts && workOrder.parts.length > 0) {
            workOrder.parts.forEach(partItem => {
                const part = parts.find(p => p.id === partItem.partId);
                if (part) {
                    partsHTML += `
                        <div class="invoice-item">
                            <div class="invoice-item-name">${part.name} (x${partItem.quantity})</div>
                            <div class="invoice-item-price">${formatCurrency(part.sellingPrice * partItem.quantity)}</div>
                        </div>
                    `;
                }
            });
        } else {
            partsHTML += '<p style="color: var(--text-light); padding: 0.5rem;">No parts added</p>';
        }
        partsHTML += '</div>';
        document.getElementById('invoice-parts-list').innerHTML = partsHTML;
        document.getElementById('invoice-custom-items-list').innerHTML = '';
    }
    
    // Calculate and display totals
    recalculateInvoiceTotal();
}

function createInvoice(e) {
    e.preventDefault();
    
    const workOrderId = document.getElementById('invoice-work-order').value;
    const workOrder = workOrders.find(w => w.id === workOrderId);
    
    if (!workOrder) {
        alert('Please select a work order');
        return;
    }
    
    // Calculate services total (with price modifications)
    let servicesTotal = 0;
    const invoiceServices = workOrder.services.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        const modifiedItem = invoiceLineItems.services.find(s => s.id === serviceId);
        if (service) {
            const price = modifiedItem ? modifiedItem.price : service.price;
            servicesTotal += price;
            return {
                serviceId: service.id,
                name: service.name,
                originalPrice: service.price,
                price: price,
                modified: !!modifiedItem,
                modificationReason: modifiedItem?.modificationHistory?.[0]?.reason || null
            };
        }
        return null;
    }).filter(Boolean);
    
    // Calculate parts total (with price modifications)
    let partsTotal = 0;
    const invoiceParts = [];
    if (workOrder.parts && workOrder.parts.length > 0) {
        workOrder.parts.forEach(partItem => {
            const part = parts.find(p => p.id === partItem.partId);
            const modifiedItem = invoiceLineItems.parts.find(p => p.id === partItem.partId);
            if (part) {
                const unitPrice = modifiedItem ? modifiedItem.price : part.sellingPrice;
                const itemTotal = unitPrice * partItem.quantity;
                partsTotal += itemTotal;
                invoiceParts.push({
                    partId: part.id,
                    name: part.name,
                    quantity: partItem.quantity,
                    originalUnitPrice: part.sellingPrice,
                    unitPrice: unitPrice,
                    total: itemTotal,
                    modified: !!modifiedItem
                });
            }
        });
    }
    
    // Calculate custom items total
    let customTotal = 0;
    const invoiceCustomItems = invoiceLineItems.custom.map(item => {
        customTotal += item.total;
        return {
            id: item.id,
            type: item.type,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
            notes: item.notes,
            isCustom: true
        };
    });
    
    // Calculate labor cost
    const laborHours = parseFloat(document.getElementById('invoice-labor').value) || 0;
    const laborRate = parseFloat(document.getElementById('invoice-labor-rate').value) || 75;
    const laborTotal = laborHours * laborRate;
    
    // Calculate subtotal
    const subtotal = servicesTotal + partsTotal + customTotal + laborTotal;
    
    // Calculate discount
    const discount = parseFloat(document.getElementById('invoice-discount').value) || 0;
    
    // Calculate tax
    const taxRate = parseFloat(document.getElementById('invoice-tax-rate').value) || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxAmount = (taxableAmount * taxRate) / 100;
    
    // Calculate total
    const total = taxableAmount + taxAmount;
    
    const invoice = {
        id: generateId(),
        invoiceNumber: `INV-${Date.now()}`,
        workOrderId: workOrder.id,
        customerId: workOrder.customerId,
        vehicleId: workOrder.vehicleId,
        services: invoiceServices,
        parts: invoiceParts,
        customItems: invoiceCustomItems,
        laborHours: laborHours,
        laborRate: laborRate,
        laborTotal: laborTotal,
        servicesTotal: servicesTotal,
        partsTotal: partsTotal,
        customTotal: customTotal,
        subtotal: subtotal,
        discount: discount,
        taxRate: taxRate,
        taxAmount: taxAmount,
        total: total,
        notes: document.getElementById('invoice-notes').value,
        status: 'pending',
        amountPaid: 0,
        balanceDue: total,
        payments: [],
        modificationHistory: [],
        createdAt: new Date().toISOString()
    };
    
    invoices.push(invoice);
    saveBillingData();
    closeModal('create-invoice-modal');
    renderInvoicesList();
    updateDashboard();
    showNotification('Invoice created successfully!', 'success');
}

function renderInvoicesList() {
    const container = document.getElementById('invoices-list');
    
    if (invoices.length === 0) {
        container.innerHTML = '<p class="empty-state">No invoices found. Create your first invoice!</p>';
        return;
    }
    
    // Sort by creation date (newest first)
    const sortedInvoices = [...invoices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedInvoices.map(invoice => {
                const customer = customers.find(c => c.id === invoice.customerId);
                const statusClass = `invoice-status-${invoice.status}`;
                const amountPaid = invoice.amountPaid || 0;
                const balanceDue = invoice.balanceDue || invoice.total;
                return `
                <tr>
                    <td>${invoice.invoiceNumber}</td>
                    <td>${formatDate(invoice.createdAt)}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${formatCurrency(invoice.total)}</td>
                    <td style="color: #28a745; font-weight: bold;">${formatCurrency(amountPaid)}</td>
                    <td style="color: ${balanceDue > 0 ? '#dc3545' : '#28a745'}; font-weight: bold;">${formatCurrency(balanceDue)}</td>
                    <td><span class="status-badge ${statusClass}">${invoice.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="viewInvoice('${invoice.id}')">View</button>
                            <button class="btn btn-success" onclick="openPaymentModal('${invoice.id}')">Payment</button>
                            <button class="btn btn-secondary" onclick="openStatusModal('${invoice.id}')">Status</button>
                            <button class="btn btn-danger" onclick="deleteInvoice('${invoice.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

let currentViewingInvoice = null;

function viewInvoice(id) {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
    
    currentViewingInvoice = invoice;
    
    const customer = customers.find(c => c.id === invoice.customerId);
    const vehicle = vehicles.find(v => v.id === invoice.vehicleId);
    const workOrder = workOrders.find(w => w.id === invoice.workOrderId);
    
    let invoiceHTML = `
        <div class="invoice-header">
            <h1>INVOICE</h1>
            <p><strong>${invoice.invoiceNumber}</strong></p>
        </div>
        
        <div class="invoice-info">
            <div class="invoice-info-section">
                <h3>Date</h3>
                <p>${new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="invoice-info-section">
                <h3>Due Date</h3>
                <p>${new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="invoice-info-section">
                <h3>Status</h3>
                <p class="status-badge invoice-status-${invoice.status}">${invoice.status}</p>
            </div>
        </div>
        
        <div class="invoice-info">
            <div class="invoice-info-section">
                <h3>Bill To</h3>
                <p>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</p>
                <p>${customer ? customer.email : ''}</p>
                <p>${customer ? customer.phone : ''}</p>
                <p>${customer ? customer.address || '' : ''}</p>
            </div>
            <div class="invoice-info-section">
                <h3>Vehicle</h3>
                <p>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</p>
                <p>${vehicle ? `Plate: ${vehicle.plate}` : ''}</p>
                <p>Work Order: #${workOrder ? workOrder.id.substring(0, 8).toUpperCase() : 'N/A'}</p>
            </div>
        </div>
        
        <h3>Services</h3>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.services.map(service => `
                    <tr>
                        <td>${service.name}</td>
                        <td>${formatCurrency(service.price)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        ${invoice.parts && invoice.parts.length > 0 ? `
        <h3>Parts</h3>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Part Name</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.parts.map(part => `
                    <tr>
                        <td>${part.name}</td>
                        <td>${part.quantity}</td>
                        <td>${formatCurrency(part.unitPrice)}</td>
                        <td>${formatCurrency(part.total)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        ` : ''}
        
        <h3>Labor</h3>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Labor Charges</td>
                    <td>${invoice.laborHours}</td>
                    <td>${formatCurrency(invoice.laborRate)}/hr</td>
                    <td>${formatCurrency(invoice.laborTotal)}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="invoice-totals">
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Subtotal</span>
                <span class="invoice-totals-value">${formatCurrency(invoice.subtotal)}</span>
            </div>
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Discount</span>
                <span class="invoice-totals-value">-${formatCurrency(invoice.discount)}</span>
            </div>
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Tax (${invoice.taxRate}%)</span>
                <span class="invoice-totals-value">${formatCurrency(invoice.taxAmount)}</span>
            </div>
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Total</span>
                <span class="invoice-totals-value">${formatCurrency(invoice.total)}</span>
            </div>
        </div>
        
        ${invoice.notes ? `
        <div style="margin-top: 2rem; padding: 1rem; background: var(--light-bg); border-radius: 6px;">
            <h4>Notes</h4>
            <p>${invoice.notes}</p>
        </div>
        ` : ''}
    `;
    
    document.getElementById('invoice-details').innerHTML = invoiceHTML;
    openModal('invoice-view-modal');
}

function markInvoicePaid(id) {
    const index = invoices.findIndex(i => i.id === id);
    if (index >= 0) {
        invoices[index].status = 'paid';
        invoices[index].paidAt = new Date().toISOString();
        saveBillingData();
        renderInvoicesList();
        showNotification('Invoice marked as paid!', 'success');
    }
}

function deleteInvoice(id) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    
    invoices = invoices.filter(i => i.id !== id);
    saveBillingData();
    renderInvoicesList();
    showNotification('Invoice deleted!', 'success');
}

// PDF Generation
function downloadInvoicePDF() {
    if (!currentViewingInvoice) return;
    
    const customer = customers.find(c => c.id === currentViewingInvoice.customerId);
    const vehicle = vehicles.find(v => v.id === currentViewingInvoice.vehicleId);
    
    let invoiceText = `
================================================================================
                           AUTO FIX PRO - INVOICE
================================================================================

Invoice Number: ${currentViewingInvoice.invoiceNumber}
Date: ${new Date(currentViewingInvoice.createdAt).toLocaleDateString()}
Status: ${currentViewingInvoice.status.toUpperCase()}

--------------------------------------------------------------------------------
BILL TO:
${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}
${customer ? customer.email : ''}
${customer ? customer.phone : ''}
${customer ? customer.address || '' : ''}

--------------------------------------------------------------------------------
VEHICLE:
${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}
${vehicle ? `License Plate: ${vehicle.plate}` : ''}

--------------------------------------------------------------------------------
SERVICES:
${currentViewingInvoice.services.map(s => `  ${s.name}............................. ${formatCurrency(s.price)}`).join('\n')}

${currentViewingInvoice.parts && currentViewingInvoice.parts.length > 0 ? `
PARTS:
${currentViewingInvoice.parts.map(p => `  ${p.name} (x${p.quantity})......................... ${formatCurrency(p.total)}`).join('\n')}
` : ''}

LABOR:
  Labor Charges (${currentViewingInvoice.laborHours} hrs @ ${formatCurrency(currentViewingInvoice.laborRate)}/hr).... ${formatCurrency(currentViewingInvoice.laborTotal)}

--------------------------------------------------------------------------------
SUMMARY:
  Subtotal: ${formatCurrency(currentViewingInvoice.subtotal)}
  Discount: -${formatCurrency(currentViewingInvoice.discount)}
  Tax (${currentViewingInvoice.taxRate}%): ${formatCurrency(currentViewingInvoice.taxAmount)}
  ---------------------------------------------------
  TOTAL: ${formatCurrency(currentViewingInvoice.total)}

${currentViewingInvoice.notes ? `
NOTES:
${currentViewingInvoice.notes}
` : ''}

================================================================================
                           Thank you for your business!
================================================================================
    `;
    
    // Create a blob and download
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentViewingInvoice.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Invoice downloaded!', 'success');
}

// WhatsApp Integration
function sendInvoiceWhatsApp() {
    if (!currentViewingInvoice) return;
    
    const customer = customers.find(c => c.id === currentViewingInvoice.customerId);
    if (!customer || !customer.phone) {
        alert('Customer phone number not found');
        return;
    }
    
    // Format phone number for WhatsApp
    let phoneNumber = customer.phone.replace(/\D/g, '');
    // Remove leading '0' for South African format (27)
    if (phoneNumber.startsWith('0') && phoneNumber.length === 10) {
        phoneNumber = '27' + phoneNumber.substring(1);
    }
    // Remove leading '1' if present (international format)
    if (phoneNumber.startsWith('1') && phoneNumber.length === 11) {
        phoneNumber = phoneNumber.substring(1);
    }
    
    // Create message
    const message = `🔧 *Auto Fix Pro - Invoice*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Invoice:* ${currentViewingInvoice.invoiceNumber}
*Date:* ${new Date(currentViewingInvoice.createdAt).toLocaleDateString()}
*Status:* ${currentViewingInvoice.status}

*Customer:* ${customer.firstName} ${customer.lastName}

*Total Amount:* ${formatCurrency(currentViewingInvoice.total)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for choosing Auto Fix Pro!`;
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// SMS Integration
function sendInvoiceSMS() {
    if (!currentViewingInvoice) return;
    
    const customer = customers.find(c => c.id === currentViewingInvoice.customerId);
    if (!customer || !customer.phone) {
        alert('Customer phone number not found');
        return;
    }
    
    // Create message
    const message = `Auto Fix Pro Invoice ${currentViewingInvoice.invoiceNumber} - Total: ${formatCurrency(currentViewingInvoice.total)}. Status: ${currentViewingInvoice.status}. Thank you for your business!`;
    
    // For SMS, we'll use tel: protocol which opens the phone app
    const smsURL = `sms:${customer.phone}?body=${encodeURIComponent(message)}`;
    window.open(smsURL, '_blank');
    
    showNotification('SMS composer opened!', 'success');
}

// Helper Functions
function saveBillingData() {
    localStorage.setItem('parts', JSON.stringify(parts));
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

function initializePartsManagement() {
    document.getElementById('part-form').addEventListener('submit', savePart);
    
    // Initialize parts search
    document.getElementById('parts-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredParts = parts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            (p.sku && p.sku.toLowerCase().includes(searchTerm)) ||
            (p.supplier && p.supplier.toLowerCase().includes(searchTerm))
        );
        renderFilteredParts(filteredParts);
    });
}

function initializeInvoices() {
    document.getElementById('create-invoice-form').addEventListener('submit', createInvoice);
    
    // Initialize invoice search
    document.getElementById('invoice-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredInvoices = invoices.filter(i => {
            const customer = customers.find(c => c.id === i.customerId);
            return customer && (
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                i.invoiceNumber.toLowerCase().includes(searchTerm)
            );
        });
        renderFilteredInvoices(filteredInvoices);
    });
}

function renderFilteredParts(filteredParts) {
    const container = document.getElementById('parts-list');
    
    if (filteredParts.length === 0) {
        container.innerHTML = '<p class="empty-state">No parts found matching your search.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'parts-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Part Name</th>
                <th>SKU</th>
                <th>Cost</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Supplier</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredParts.map(part => {
                const stockClass = part.stockQuantity <= 5 ? 'stock-low' : part.stockQuantity <= 20 ? 'stock-medium' : 'stock-good';
                const imageHTML = part.image 
                    ? `<img src="${part.image}" class="vehicle-thumbnail" onclick="showPartImage('${part.id}')" alt="Part Image">` 
                    : '<span style="color: var(--text-light); font-size: 0.8rem;">No image</span>';
                return `
                <tr>
                    <td>${imageHTML}</td>
                    <td>${part.name}</td>
                    <td>${part.sku || 'N/A'}</td>
                    <td>${formatCurrency(part.costPrice)}</td>
                    <td>${formatCurrency(part.sellingPrice)}</td>
                    <td><span class="stock-badge ${stockClass}">${part.stockQuantity}</span></td>
                    <td>${part.supplier || 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editPart('${part.id}')">Edit</button>
                            <button class="btn btn-success" onclick="adjustStock('${part.id}')">Stock</button>
                            <button class="btn btn-danger" onclick="deletePart('${part.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function renderFilteredInvoices(filteredInvoices) {
    const container = document.getElementById('invoices-list');
    
    if (filteredInvoices.length === 0) {
        container.innerHTML = '<p class="empty-state">No invoices found matching your search.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredInvoices.map(invoice => {
                const customer = customers.find(c => c.id === invoice.customerId);
                const statusClass = `invoice-status-${invoice.status}`;
                return `
                <tr>
                    <td>${invoice.invoiceNumber}</td>
                    <td>${formatDate(invoice.createdAt)}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${formatCurrency(invoice.total)}</td>
                    <td><span class="status-badge ${statusClass}">${invoice.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="viewInvoice('${invoice.id}')">View</button>
                            <button class="btn btn-success" onclick="markInvoicePaid('${invoice.id}')">Paid</button>
                            <button class="btn btn-danger" onclick="deleteInvoice('${invoice.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

// Load sample parts data
function loadSampleParts() {
    if (parts.length > 0) return;
    
    const sampleParts = [
        { id: generateId(), name: 'Oil Filter', sku: 'OF-001', description: 'Standard oil filter', costPrice: 8.00, sellingPrice: 15.00, stockQuantity: 50, supplier: 'AutoParts Co', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Brake Pads (Front)', sku: 'BP-001', description: 'Ceramic brake pads front', costPrice: 25.00, sellingPrice: 45.00, stockQuantity: 30, supplier: 'BrakeMaster', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Air Filter', sku: 'AF-001', description: 'Engine air filter', costPrice: 10.00, sellingPrice: 20.00, stockQuantity: 40, supplier: 'AutoParts Co', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Spark Plugs', sku: 'SP-001', description: 'Set of 4 spark plugs', costPrice: 15.00, sellingPrice: 30.00, stockQuantity: 25, supplier: 'IgnitionPro', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Wiper Blades', sku: 'WB-001', description: 'Pair of wiper blades', costPrice: 12.00, sellingPrice: 25.00, stockQuantity: 35, supplier: 'VisionAuto', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Engine Oil (5W-30)', sku: 'EO-001', description: '5 quarts synthetic oil', costPrice: 18.00, sellingPrice: 35.00, stockQuantity: 60, supplier: 'LubeMaster', createdAt: new Date().toISOString() }
    ];
    
    parts = sampleParts;
    saveBillingData();
    renderPartsList();
}

// ==================== PAYMENT FUNCTIONS ====================

let currentPaymentInvoiceId = null;

function openPaymentModal(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    currentPaymentInvoiceId = invoiceId;
    
    const modalHtml = `
        <div id="payment-modal" class="modal active">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>💳 Record Payment</h2>
                    <button class="close-btn" onclick="closePaymentModal()">&times;</button>
                </div>
                <div style="padding: 1rem;">
                    <div style="background: var(--bg-color); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>
                        <p><strong>Total Amount:</strong> ${formatCurrency(invoice.total)}</p>
                        <p><strong>Amount Paid:</strong> <span style="color: #28a745;">${formatCurrency(invoice.amountPaid || 0)}</span></p>
                        <p><strong>Balance Due:</strong> <span style="color: ${invoice.balanceDue > 0 ? '#dc3545' : '#28a745'};">${formatCurrency(invoice.balanceDue || invoice.total)}</span></p>
                    </div>
                    
                    <form id="payment-form" onsubmit="recordPayment(event)">
                        <div class="form-group">
                            <label>Payment Amount *</label>
                            <input type="number" id="payment-amount" step="0.01" min="0.01" max="${invoice.balanceDue || invoice.total}" required placeholder="Enter payment amount">
                        </div>
                        <div class="form-group">
                            <label>Payment Method *</label>
                            <select id="payment-method" required>
                                <option value="">Select Method</option>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="eft">EFT/Bank Transfer</option>
                                <option value="credit">Credit Card</option>
                                <option value="debit">Debit Card</option>
                                <option value="snapscan">SnapScan</option>
                                <option value="zapper">Zapper</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Reference/Receipt #</label>
                            <input type="text" id="payment-reference" placeholder="Optional reference number">
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea id="payment-notes" rows="2" placeholder="Optional notes"></textarea>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-success">✓ Record Payment</button>
                            <button type="button" class="btn btn-secondary" onclick="closePaymentModal()">Cancel</button>
                        </div>
                    </form>
                    
                    ${invoice.payments && invoice.payments.length > 0 ? `
                        <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                            <h4>Payment History</h4>
                            <table style="width: 100%; font-size: 0.9rem;">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Ref</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${invoice.payments.map(p => `
                                        <tr>
                                            <td>${formatDate(p.date)}</td>
                                            <td>${formatCurrency(p.amount)}</td>
                                            <td>${p.method}</td>
                                            <td>${p.reference || '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('payment-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.remove();
    currentPaymentInvoiceId = null;
}

function recordPayment(e) {
    e.preventDefault();
    
    if (!currentPaymentInvoiceId) return;
    
    const invoice = invoices.find(i => i.id === currentPaymentInvoiceId);
    if (!invoice) return;
    
    const amount = parseFloat(document.getElementById('payment-amount').value);
    const method = document.getElementById('payment-method').value;
    const reference = document.getElementById('payment-reference').value;
    const notes = document.getElementById('payment-notes').value;
    
    // Validate amount
    const balanceDue = invoice.balanceDue || invoice.total;
    if (amount > balanceDue) {
        alert(`Payment amount cannot exceed balance due of ${formatCurrency(balanceDue)}`);
        return;
    }
    
    // Initialize payments array if not exists
    if (!invoice.payments) {
        invoice.payments = [];
    }
    
    // Add payment record
    const payment = {
        id: generateId(),
        amount: amount,
        method: method,
        reference: reference,
        notes: notes,
        date: new Date().toISOString()
    };
    
    invoice.payments.push(payment);
    
    // Update amounts
    invoice.amountPaid = (invoice.amountPaid || 0) + amount;
    invoice.balanceDue = invoice.total - invoice.amountPaid;
    
    // Update status based on payment
    if (invoice.balanceDue <= 0) {
        invoice.status = 'paid';
        invoice.balanceDue = 0;
    } else if (invoice.amountPaid > 0) {
        invoice.status = 'partial';
    }
    
    saveBillingData();
    closePaymentModal();
    renderInvoicesList();
    showNotification(`Payment of ${formatCurrency(amount)} recorded successfully!`, 'success');
}

// ==================== STATUS FUNCTIONS ====================

let currentStatusInvoiceId = null;

function openStatusModal(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    currentStatusInvoiceId = invoiceId;
    
    const statusOptions = [
        { value: 'pending', label: '⏳ Pending', color: '#ffc107' },
        { value: 'partial', label: '💳 Partially Paid', color: '#17a2b8' },
        { value: 'paid', label: '✅ Paid', color: '#28a745' },
        { value: 'overdue', label: '⚠️ Overdue', color: '#dc3545' },
        { value: 'cancelled', label: '❌ Cancelled', color: '#6c757d' },
        { value: 'refunded', label: '↩️ Refunded', color: '#6f42c1' }
    ];
    
    const modalHtml = `
        <div id="status-modal" class="modal active">
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>📊 Change Invoice Status</h2>
                    <button class="close-btn" onclick="closeStatusModal()">&times;</button>
                </div>
                <div style="padding: 1rem;">
                    <div style="background: var(--bg-color); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>
                        <p><strong>Current Status:</strong> <span class="status-badge invoice-status-${invoice.status}">${invoice.status}</span></p>
                        <p><strong>Balance Due:</strong> ${formatCurrency(invoice.balanceDue || invoice.total)}</p>
                    </div>
                    
                    <form id="status-form" onsubmit="updateInvoiceStatus(event)">
                        <div class="form-group">
                            <label>New Status *</label>
                            <select id="new-status" required>
                                ${statusOptions.map(opt => `
                                    <option value="${opt.value}" ${invoice.status === opt.value ? 'selected' : ''} style="color: ${opt.color};">
                                        ${opt.label}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Notes (Optional)</label>
                            <textarea id="status-notes" rows="2" placeholder="Reason for status change"></textarea>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-primary">✓ Update Status</button>
                            <button type="button" class="btn btn-secondary" onclick="closeStatusModal()">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('status-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeStatusModal() {
    const modal = document.getElementById('status-modal');
    if (modal) modal.remove();
    currentStatusInvoiceId = null;
}

function updateInvoiceStatus(e) {
    e.preventDefault();
    
    if (!currentStatusInvoiceId) return;
    
    const invoice = invoices.find(i => i.id === currentStatusInvoiceId);
    if (!invoice) return;
    
    const newStatus = document.getElementById('new-status').value;
    const notes = document.getElementById('status-notes').value;
    
    const oldStatus = invoice.status;
    invoice.status = newStatus;
    
    // Add status change to history
    if (!invoice.statusHistory) {
        invoice.statusHistory = [];
    }
    
    invoice.statusHistory.push({
        from: oldStatus,
        to: newStatus,
        notes: notes,
        changedAt: new Date().toISOString()
    });
    
    saveBillingData();
    closeStatusModal();
    renderInvoicesList();
    showNotification(`Invoice status updated to "${newStatus}"`, 'success');
}

// ==================== HELPER FUNCTIONS ====================

function markInvoicePaid(invoiceId) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    
    if (invoice.status === 'paid') {
        alert('Invoice is already marked as paid');
        return;
    }
    
    if (confirm(`Mark invoice ${invoice.invoiceNumber} as fully paid?`)) {
        // Record full payment
        const balanceDue = invoice.balanceDue || invoice.total;
        
        if (!invoice.payments) {
            invoice.payments = [];
        }
        
        invoice.payments.push({
            id: generateId(),
            amount: balanceDue,
            method: 'other',
            reference: 'Marked as paid',
            notes: 'Full payment recorded',
            date: new Date().toISOString()
        });
        
        invoice.amountPaid = invoice.total;
        invoice.balanceDue = 0;
        invoice.status = 'paid';
        
        saveBillingData();
        renderInvoicesList();
        showNotification('Invoice marked as paid!', 'success');
    }
}

// ==================== DYNAMIC INVOICE EDITING ====================

let invoiceEditMode = false;
let customLineItems = [];
let invoiceLineItems = { services: [], parts: [], custom: [] };

function toggleInvoiceEditMode(enable) {
    invoiceEditMode = enable;
    const banner = document.getElementById('invoice-edit-banner');
    const actionsBar = document.getElementById('invoice-actions-bar');
    
    if (enable) {
        banner.style.display = 'flex';
        actionsBar.style.display = 'flex';
        renderEditableInvoiceItems();
    } else {
        banner.style.display = 'none';
        actionsBar.style.display = 'none';
        loadWorkOrderData(); // Reload original data
    }
}

function openAddLineItemModal() {
    document.getElementById('add-line-item-form').reset();
    document.getElementById('custom-item-type').value = 'service';
    selectLineItemType('service');
    openModal('add-line-item-modal');
}

function selectLineItemType(type) {
    document.getElementById('custom-item-type').value = type;
    document.querySelectorAll('.line-item-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
}

// Handle add line item form submission
document.addEventListener('DOMContentLoaded', function() {
    const addLineItemForm = document.getElementById('add-line-item-form');
    if (addLineItemForm) {
        addLineItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addCustomLineItem();
        });
    }
});

function addCustomLineItem() {
    const type = document.getElementById('custom-item-type').value;
    const description = document.getElementById('custom-item-description').value;
    const quantity = parseInt(document.getElementById('custom-item-quantity').value) || 1;
    const price = parseFloat(document.getElementById('custom-item-price').value) || 0;
    const notes = document.getElementById('custom-item-notes').value;
    
    if (!description || price <= 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    const customItem = {
        id: generateId(),
        type: type,
        name: description,
        description: description,
        quantity: quantity,
        unitPrice: price,
        total: quantity * price,
        notes: notes,
        isCustom: true,
        originalPrice: price,
        modificationHistory: []
    };
    
    invoiceLineItems.custom.push(customItem);
    renderEditableInvoiceItems();
    closeModal('add-line-item-modal');
    recalculateInvoiceTotal();
    showNotification('Custom line item added!', 'success');
}

function renderEditableInvoiceItems() {
    const workOrderId = document.getElementById('invoice-work-order').value;
    const workOrder = workOrders.find(w => w.id === workOrderId);
    
    if (!workOrder) return;
    
    // Render Services
    let servicesHTML = '<div class="invoice-items-section"><h4>🔧 Services</h4>';
    workOrder.services.forEach((serviceId, index) => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            const modifiedItem = invoiceLineItems.services.find(s => s.id === serviceId);
            const currentPrice = modifiedItem ? modifiedItem.price : service.price;
            const isModified = modifiedItem && modifiedItem.price !== service.price;
            
            servicesHTML += `
                <div class="invoice-line-item ${isModified ? 'modified-item' : ''}">
                    <div class="line-item-number">${index + 1}</div>
                    <div class="line-item-description">${service.name}</div>
                    <div class="line-item-quantity">1</div>
                    <div class="line-item-price">
                        ${isModified ? `<span class="original-price">${formatCurrency(service.price)}</span>` : ''}
                        <span class="modified-price">${formatCurrency(currentPrice)}</span>
                    </div>
                    <div class="line-item-total">${formatCurrency(currentPrice)}</div>
                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="openPriceOverrideModal('service', '${serviceId}', ${currentPrice}, ${service.price})">✏️</button>
                    </div>
                </div>
            `;
        }
    });
    servicesHTML += '</div>';
    document.getElementById('invoice-services-list').innerHTML = servicesHTML;
    
    // Render Parts
    let partsHTML = '<div class="invoice-items-section"><h4>🔩 Parts</h4>';
    if (workOrder.parts && workOrder.parts.length > 0) {
        workOrder.parts.forEach((partItem, index) => {
            const part = parts.find(p => p.id === partItem.partId);
            if (part) {
                const lineTotal = part.sellingPrice * partItem.quantity;
                const modifiedItem = invoiceLineItems.parts.find(p => p.id === partItem.partId);
                const currentPrice = modifiedItem ? modifiedItem.price : part.sellingPrice;
                const isModified = modifiedItem && modifiedItem.price !== part.sellingPrice;
                
                partsHTML += `
                    <div class="invoice-line-item ${isModified ? 'modified-item' : ''}">
                        <div class="line-item-number">${index + 1}</div>
                        <div class="line-item-description">${part.name} (x${partItem.quantity})</div>
                        <div class="line-item-quantity">${partItem.quantity}</div>
                        <div class="line-item-price">
                            ${isModified ? `<span class="original-price">${formatCurrency(part.sellingPrice)}/ea</span>` : ''}
                            <span class="modified-price">${formatCurrency(currentPrice)}/ea</span>
                        </div>
                        <div class="line-item-total">${formatCurrency(currentPrice * partItem.quantity)}</div>
                        <div class="line-item-actions">
                            <button type="button" class="btn btn-sm btn-secondary" onclick="openPriceOverrideModal('part', '${partItem.partId}', ${currentPrice}, ${part.sellingPrice})">✏️</button>
                        </div>
                    </div>
                `;
            }
        });
    } else {
        partsHTML += '<p style="color: var(--text-light); padding: 0.5rem;">No parts added</p>';
    }
    partsHTML += '</div>';
    document.getElementById('invoice-parts-list').innerHTML = partsHTML;
    
    // Render Custom Items
    let customHTML = '';
    if (invoiceLineItems.custom.length > 0) {
        customHTML = '<div class="invoice-items-section"><h4>➕ Custom Items</h4>';
        invoiceLineItems.custom.forEach((item, index) => {
            customHTML += `
                <div class="invoice-line-item custom-item">
                    <div class="line-item-number">${index + 1}</div>
                    <div class="line-item-description">${item.name}</div>
                    <div class="line-item-quantity">${item.quantity}</div>
                    <div class="line-item-price">
                        <span class="modified-price">${formatCurrency(item.unitPrice)}</span>
                    </div>
                    <div class="line-item-total">${formatCurrency(item.total)}</div>
                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="openPriceOverrideModal('custom', '${item.id}', ${item.unitPrice}, ${item.originalPrice})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeCustomLineItem('${item.id}')">✕</button>
                    </div>
                </div>
            `;
        });
        customHTML += '</div>';
    }
    document.getElementById('invoice-custom-items-list').innerHTML = customHTML;
}

function openPriceOverrideModal(itemType, itemId, currentPrice, originalPrice) {
    document.getElementById('override-item-type').value = itemType;
    document.getElementById('override-item-index').value = itemId;
    document.getElementById('override-current-price').textContent = formatCurrency(originalPrice);
    document.getElementById('override-new-price').value = currentPrice;
    document.getElementById('override-reason').value = '';
    document.getElementById('override-notes').value = '';
    document.getElementById('override-notes-group').style.display = 'none';
    
    // Show/hide notes based on reason selection
    document.getElementById('override-reason').onchange = function() {
        document.getElementById('override-notes-group').style.display = 
            this.value === 'other' ? 'block' : 'none';
    };
    
    openModal('price-override-modal');
}

function applyQuickDiscount(percentage) {
    const currentPriceEl = document.getElementById('override-current-price');
    const currentPriceText = currentPriceEl.textContent;
    const currentPrice = parseFloat(currentPriceText.replace(/[^0-9.-]/g, ''));
    const newPrice = currentPrice * (1 - percentage / 100);
    document.getElementById('override-new-price').value = newPrice.toFixed(2);
}

function confirmPriceOverride() {
    const itemType = document.getElementById('override-item-type').value;
    const itemId = document.getElementById('override-item-index').value;
    const newPrice = parseFloat(document.getElementById('override-new-price').value);
    const reason = document.getElementById('override-reason').value;
    const notes = document.getElementById('override-notes').value;
    
    if (!reason) {
        alert('Please select a reason for the price change');
        return;
    }
    
    if (reason === 'other' && !notes) {
        alert('Please provide additional notes');
        return;
    }
    
    // Find and update the item
    if (itemType === 'service') {
        let existingItem = invoiceLineItems.services.find(s => s.id === itemId);
        if (existingItem) {
            existingItem.price = newPrice;
            existingItem.modificationHistory.push({
                oldPrice: existingItem.price,
                newPrice: newPrice,
                reason: reason,
                notes: notes,
                timestamp: new Date().toISOString()
            });
        } else {
            const service = services.find(s => s.id === itemId);
            invoiceLineItems.services.push({
                id: itemId,
                name: service.name,
                originalPrice: service.price,
                price: newPrice,
                modificationHistory: [{
                    oldPrice: service.price,
                    newPrice: newPrice,
                    reason: reason,
                    notes: notes,
                    timestamp: new Date().toISOString()
                }]
            });
        }
    } else if (itemType === 'part') {
        let existingItem = invoiceLineItems.parts.find(p => p.id === itemId);
        if (existingItem) {
            existingItem.price = newPrice;
        } else {
            const part = parts.find(p => p.id === itemId);
            invoiceLineItems.parts.push({
                id: itemId,
                name: part.name,
                originalPrice: part.sellingPrice,
                price: newPrice
            });
        }
    } else if (itemType === 'custom') {
        const customItem = invoiceLineItems.custom.find(c => c.id === itemId);
        if (customItem) {
            customItem.unitPrice = newPrice;
            customItem.total = customItem.quantity * newPrice;
        }
    }
    
    closeModal('price-override-modal');
    renderEditableInvoiceItems();
    recalculateInvoiceTotal();
    showNotification('Price updated successfully!', 'success');
}

function removeCustomLineItem(itemId) {
    if (confirm('Remove this custom line item?')) {
        invoiceLineItems.custom = invoiceLineItems.custom.filter(item => item.id !== itemId);
        renderEditableInvoiceItems();
        recalculateInvoiceTotal();
        showNotification('Line item removed', 'success');
    }
}

function recalculateInvoiceTotal() {
    const workOrderId = document.getElementById('invoice-work-order').value;
    const workOrder = workOrders.find(w => w.id === workOrderId);
    
    if (!workOrder) return;
    
    // Calculate services total
    let servicesTotal = 0;
    workOrder.services.forEach(serviceId => {
        const service = services.find(s => s.id === serviceId);
        const modifiedItem = invoiceLineItems.services.find(s => s.id === serviceId);
        servicesTotal += modifiedItem ? modifiedItem.price : (service ? service.price : 0);
    });
    
    // Calculate parts total
    let partsTotal = 0;
    if (workOrder.parts) {
        workOrder.parts.forEach(partItem => {
            const part = parts.find(p => p.id === partItem.partId);
            const modifiedItem = invoiceLineItems.parts.find(p => p.id === partItem.partId);
            const price = modifiedItem ? modifiedItem.price : (part ? part.sellingPrice : 0);
            partsTotal += price * partItem.quantity;
        });
    }
    
    // Calculate custom items total
    let customTotal = invoiceLineItems.custom.reduce((sum, item) => sum + item.total, 0);
    
    // Calculate labor
    const laborHours = parseFloat(document.getElementById('invoice-labor').value) || 0;
    const laborRate = parseFloat(document.getElementById('invoice-labor-rate').value) || 75;
    const laborTotal = laborHours * laborRate;
    
    // Calculate totals
    const subtotal = servicesTotal + partsTotal + customTotal;
    const discount = parseFloat(document.getElementById('invoice-discount').value) || 0;
    const taxRate = parseFloat(document.getElementById('invoice-tax-rate').value) || 0;
    const taxableAmount = Math.max(0, subtotal + laborTotal - discount);
    const tax = taxableAmount * (taxRate / 100);
    const grandTotal = taxableAmount + tax;
    
    // Update display
    document.getElementById('invoice-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('invoice-labor-display').textContent = laborHours;
    document.getElementById('invoice-labor-total').textContent = formatCurrency(laborTotal);
    document.getElementById('invoice-discount-display').textContent = '-' + formatCurrency(discount);
    document.getElementById('invoice-tax-display').textContent = taxRate;
    document.getElementById('invoice-tax-total').textContent = formatCurrency(tax);
    document.getElementById('invoice-grand-total').textContent = formatCurrency(grandTotal);
}

// Reset invoice line items when opening new invoice
function resetInvoiceEditMode() {
    invoiceEditMode = false;
    customLineItems = [];
    invoiceLineItems = { services: [], parts: [], custom: [] };
    
    const banner = document.getElementById('invoice-edit-banner');
    const actionsBar = document.getElementById('invoice-actions-bar');
    if (banner) banner.style.display = 'none';
    if (actionsBar) actionsBar.style.display = 'none';
}

// ===========================================
// SUPPLIER MANAGEMENT
// ===========================================
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
let bookInRecords = JSON.parse(localStorage.getItem('bookInRecords')) || [];

// Initialize Supplier Management
function initSupplierManagement() {
    renderSuppliersList();
    updateSuppliersSummary();
}

// Open Supplier Modal
function openSupplierModal(id = null) {
    document.getElementById('supplier-form').reset();
    document.getElementById('supplier-id').value = '';
    
    if (id) {
        const supplier = suppliers.find(s => s.id === id);
        if (supplier) {
            document.getElementById('supplier-id').value = supplier.id;
            document.getElementById('supplier-name').value = supplier.name;
            document.getElementById('supplier-contact').value = supplier.contact || '';
            document.getElementById('supplier-phone').value = supplier.phone || '';
            document.getElementById('supplier-email').value = supplier.email || '';
            document.getElementById('supplier-address').value = supplier.address || '';
            document.getElementById('supplier-account-number').value = supplier.accountNumber || '';
            document.getElementById('supplier-vat-number').value = supplier.vatNumber || '';
            document.getElementById('supplier-payment-terms').value = supplier.paymentTerms || 'net30';
            document.getElementById('supplier-status').value = supplier.status || 'active';
            document.getElementById('supplier-notes').value = supplier.notes || '';
        }
    }
    
    openModal('supplier-modal');
}

// Save Supplier
function saveSupplier(e) {
    e.preventDefault();
    
    const id = document.getElementById('supplier-id').value || generateId();
    const existingIndex = suppliers.findIndex(s => s.id === id);
    
    const supplier = {
        id: id,
        name: document.getElementById('supplier-name').value,
        contact: document.getElementById('supplier-contact').value,
        phone: document.getElementById('supplier-phone').value,
        email: document.getElementById('supplier-email').value,
        address: document.getElementById('supplier-address').value,
        accountNumber: document.getElementById('supplier-account-number').value,
        vatNumber: document.getElementById('supplier-vat-number').value,
        paymentTerms: document.getElementById('supplier-payment-terms').value,
        status: document.getElementById('supplier-status').value,
        notes: document.getElementById('supplier-notes').value,
        createdAt: existingIndex >= 0 ? suppliers[existingIndex].createdAt : new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
        suppliers[existingIndex] = supplier;
    } else {
        suppliers.push(supplier);
    }
    
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    closeModal('supplier-modal');
    renderSuppliersList();
    updateSuppliersSummary();
    populateSupplierDropdowns();
    showNotification('Supplier saved successfully!', 'success');
}

// Delete Supplier
function deleteSupplier(id) {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    
    suppliers = suppliers.filter(s => s.id !== id);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    renderSuppliersList();
    updateSuppliersSummary();
    populateSupplierDropdowns();
    showNotification('Supplier deleted successfully!', 'success');
}

// Render Suppliers List
function renderSuppliersList() {
    const container = document.getElementById('suppliers-list');
    
    if (suppliers.length === 0) {
        container.innerHTML = '<p class="empty-state">No suppliers found. Add your first supplier!</p>';
        return;
    }
    
    container.innerHTML = suppliers.map(supplier => `
        <div class="supplier-item">
            <div class="supplier-info">
                <h4>${supplier.name} <span class="supplier-status ${supplier.status}">${supplier.status}</span></h4>
                <p>📞 ${supplier.phone} ${supplier.email ? `| ✉️ ${supplier.email}` : ''}</p>
                <p>👤 ${supplier.contact || 'No contact person'}</p>
                ${supplier.accountNumber ? `<p>Account: ${supplier.accountNumber}</p>` : ''}
            </div>
            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="openSupplierModal('${supplier.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteSupplier('${supplier.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Update Suppliers Summary
function updateSuppliersSummary() {
    const totalEl = document.getElementById('total-suppliers-count');
    const activeEl = document.getElementById('active-suppliers-count');
    
    if (totalEl) totalEl.textContent = suppliers.length;
    if (activeEl) activeEl.textContent = suppliers.filter(s => s.status === 'active').length;
}

// Populate Supplier Dropdowns
function populateSupplierDropdowns() {
    const dropdowns = [
        document.getElementById('part-supplier'),
        document.getElementById('book-in-supplier')
    ];
    
    dropdowns.forEach(dropdown => {
        if (!dropdown) return;
        
        const currentValue = dropdown.value;
        dropdown.innerHTML = '<option value="">Select Supplier</option>';
        
        suppliers.filter(s => s.status === 'active').forEach(supplier => {
            dropdown.innerHTML += `<option value="${supplier.id}">${supplier.name}</option>`;
        });
        
        dropdown.value = currentValue;
    });
}

// ===========================================
// PARTS PRICING CALCULATIONS
// ===========================================

// Toggle Price Mode (Manual vs Percentage)
function togglePriceMode() {
    const mode = document.getElementById('part-price-mode').value;
    const markupGroup = document.getElementById('markup-percentage-group');
    
    if (mode === 'percentage') {
        markupGroup.style.display = 'block';
        calculatePartPricing();
    } else {
        markupGroup.style.display = 'none';
    }
}

// Calculate Part Pricing
function calculatePartPricing() {
    const costExVat = parseFloat(document.getElementById('part-cost-ex-vat').value) || 0;
    const mode = document.getElementById('part-price-mode').value;
    const vatRate = 15; // South African VAT rate
    
    // Calculate cost including VAT
    const costIncVat = costExVat * (1 + vatRate / 100);
    document.getElementById('part-cost-inc-vat').value = costIncVat.toFixed(2);
    
    // Calculate selling price based on mode
    let sellingPrice = 0;
    if (mode === 'percentage') {
        const markupPercent = parseFloat(document.getElementById('part-markup-percent').value) || 0;
        sellingPrice = costExVat * (1 + markupPercent / 100);
        document.getElementById('part-price').value = sellingPrice.toFixed(2);
    } else {
        sellingPrice = parseFloat(document.getElementById('part-price').value) || 0;
    }
    
    // Calculate and display profit
    calculatePartProfit();
}

// Calculate Part Profit
function calculatePartProfit() {
    const costExVat = parseFloat(document.getElementById('part-cost-ex-vat').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('part-price').value) || 0;
    
    const profit = sellingPrice - costExVat;
    const profitMargin = costExVat > 0 ? (profit / costExVat * 100) : 0;
    
    document.getElementById('display-cost-ex-vat').textContent = formatCurrency(costExVat);
    document.getElementById('display-selling-price').textContent = formatCurrency(sellingPrice);
    document.getElementById('display-profit').textContent = formatCurrency(profit);
    document.getElementById('display-profit-margin').textContent = profitMargin.toFixed(1) + '%';
    
    // Color code profit display
    const profitDisplay = document.getElementById('profit-display');
    if (profit < 0) {
        profitDisplay.classList.add('profit-negative');
    } else {
        profitDisplay.classList.remove('profit-negative');
    }
}

// ===========================================
// BOOK IN PARTS FUNCTIONALITY
// ===========================================

// Open Book In Modal
function openBookInModal() {
    document.getElementById('book-in-form').reset();
    document.getElementById('book-in-id').value = '';
    document.getElementById('book-in-invoice-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('book-in-parts-container').innerHTML = '';
    const totalField = document.getElementById('book-in-total-value');
    totalField.value = '0';
    delete totalField.dataset.manualEntry;
    
    const hint = document.getElementById('book-in-calculated-subtotal');
    if (hint) hint.textContent = '';
    
    // Update modal title for new record
    const modalTitle = document.querySelector('#book-in-modal .modal-header h2');
    if (modalTitle) modalTitle.textContent = '📦 Book In Parts from Supplier';
    
    populateSupplierDropdowns();
    addBookInPartRow();
    
    openModal('book-in-modal');
}

// Add Book In Part Row (optionally pre-fill with existing part data)
function addBookInPartRow(partData = null) {
    const container = document.getElementById('book-in-parts-container');
    const rowId = generateId();
    
    const name = partData ? partData.name : '';
    const qty = partData ? partData.quantity : 1;
    const cost = partData ? partData.costExVat : '';
    const lineTotal = partData ? formatCurrency(partData.quantity * partData.costExVat) : 'R0.00';
    
    const row = document.createElement('div');
    row.className = 'book-in-part-row';
    row.id = `book-in-row-${rowId}`;
    row.innerHTML = `
        <input type="text" placeholder="Part Name *" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="name" value="${name}">
        <input type="number" placeholder="Qty *" min="1" value="${qty}" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="quantity">
        <input type="number" placeholder="Cost Ex VAT" min="0" step="0.01" value="${cost}" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="cost">
        <span class="book-in-part-total">${lineTotal}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeBookInPartRow('${rowId}')">✕</button>
    `;
    
    container.appendChild(row);
}

// Remove Book In Part Row
function removeBookInPartRow(rowId) {
    const row = document.getElementById(`book-in-row-${rowId}`);
    if (row) {
        row.remove();
        updateBookInTotal();
    }
}

// Update Book In Total
function updateBookInTotal() {
    const container = document.getElementById('book-in-parts-container');
    const rows = container.querySelectorAll('.book-in-part-row');
    let total = 0;
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('[data-field="quantity"]').value) || 0;
        const cost = parseFloat(row.querySelector('[data-field="cost"]').value) || 0;
        const lineTotal = qty * cost;
        
        row.querySelector('.book-in-part-total').textContent = formatCurrency(lineTotal);
        total += lineTotal;
    });
    
    // Update the calculated subtotal hint
    const hint = document.getElementById('book-in-calculated-subtotal');
    if (hint) hint.textContent = 'Parts subtotal: ' + formatCurrency(total);
    
    // Only auto-fill total if the field is empty or user has not manually changed it
    const totalField = document.getElementById('book-in-total-value');
    if (!totalField.dataset.manualEntry) {
        totalField.value = total.toFixed(2);
    }
}

// Save Book In Record (handles both create and edit)
function saveBookIn(e) {
    e.preventDefault();
    
    const container = document.getElementById('book-in-parts-container');
    const rows = container.querySelectorAll('.book-in-part-row');
    const bookedParts = [];
    
    rows.forEach(row => {
        const name = row.querySelector('[data-field="name"]').value.trim();
        const quantity = parseInt(row.querySelector('[data-field="quantity"]').value) || 0;
        const cost = parseFloat(row.querySelector('[data-field="cost"]').value) || 0;
        
        if (name && quantity > 0) {
            bookedParts.push({
                id: generateId(),
                name: name,
                quantity: quantity,
                costExVat: cost,
                total: quantity * cost
            });
        }
    });
    
    if (bookedParts.length === 0) {
        alert('Please add at least one part to book in.');
        return;
    }
    
    const existingId = document.getElementById('book-in-id').value;
    const isEdit = existingId && bookInRecords.find(r => r.id === existingId);
    const id = existingId || generateId();
    const supplierId = document.getElementById('book-in-supplier').value;
    const supplier = suppliers.find(s => s.id === supplierId);
    
    const record = {
        id: id,
        supplierId: supplierId,
        supplierName: supplier ? supplier.name : 'Unknown',
        invoiceNumber: document.getElementById('book-in-invoice-number').value,
        invoiceDate: document.getElementById('book-in-invoice-date').value,
        totalValue: parseFloat(document.getElementById('book-in-total-value').value) || 0,
        parts: bookedParts,
        notes: document.getElementById('book-in-notes').value,
        createdAt: isEdit ? bookInRecords.find(r => r.id === existingId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (isEdit) {
        // For edits: reverse old stock changes, then apply new ones
        const oldRecord = bookInRecords.find(r => r.id === existingId);
        
        // Reverse old stock
        oldRecord.parts.forEach(op => {
            const existingPart = parts.find(p => p.name.toLowerCase() === op.name.toLowerCase());
            if (existingPart) {
                existingPart.stockQuantity = Math.max(0, existingPart.stockQuantity - op.quantity);
            }
        });
        
        // Apply new stock
        bookedParts.forEach(bp => {
            let existingPart = parts.find(p => p.name.toLowerCase() === bp.name.toLowerCase());
            if (existingPart) {
                existingPart.stockQuantity += bp.quantity;
            } else {
                parts.push({
                    id: generateId(),
                    name: bp.name,
                    sku: '',
                    description: '',
                    costPrice: bp.costExVat,
                    costExVat: bp.costExVat,
                    sellingPrice: bp.costExVat * 1.3,
                    stockQuantity: bp.quantity,
                    supplier: supplierId,
                    supplierName: supplier ? supplier.name : '',
                    createdAt: new Date().toISOString()
                });
            }
        });
        
        // Replace record in array
        const idx = bookInRecords.findIndex(r => r.id === existingId);
        bookInRecords[idx] = record;
        
    } else {
        // New record: add parts to inventory
        bookedParts.forEach(bp => {
            let existingPart = parts.find(p => p.name.toLowerCase() === bp.name.toLowerCase());
            if (existingPart) {
                existingPart.stockQuantity += bp.quantity;
            } else {
                parts.push({
                    id: generateId(),
                    name: bp.name,
                    sku: '',
                    description: '',
                    costPrice: bp.costExVat,
                    costExVat: bp.costExVat,
                    sellingPrice: bp.costExVat * 1.3,
                    stockQuantity: bp.quantity,
                    supplier: supplierId,
                    supplierName: supplier ? supplier.name : '',
                    createdAt: new Date().toISOString()
                });
            }
        });
        
        bookInRecords.push(record);
    }
    
    localStorage.setItem('bookInRecords', JSON.stringify(bookInRecords));
    localStorage.setItem('parts', JSON.stringify(parts));
    
    closeModal('book-in-modal');
    renderPartsList();
    renderBookInList();
    updateBookInSummary();
    showNotification(isEdit ? 'Invoice updated successfully!' : 'Parts booked in successfully!', 'success');
}

// Render Book In List
function renderBookInList() {
    const container = document.getElementById('book-in-list');
    
    if (bookInRecords.length === 0) {
        container.innerHTML = '<p class="empty-state">No parts booked in yet.</p>';
        return;
    }
    
    const sortedRecords = [...bookInRecords].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = sortedRecords.map(record => `
        <div class="book-in-item" style="background: white; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.5rem 0;">📦 Invoice #${record.invoiceNumber}</h4>
                    <p style="margin: 0.25rem 0; color: #666; font-size: 0.9rem;">Supplier: ${record.supplierName}</p>
                    <p style="margin: 0.25rem 0; color: #666; font-size: 0.9rem;">Date: ${new Date(record.invoiceDate).toLocaleDateString()}</p>
                    <p style="margin: 0.25rem 0; color: #666; font-size: 0.9rem;">Parts: ${record.parts.length} item${record.parts.length !== 1 ? 's' : ''}</p>
                    ${record.notes ? `<p style="margin: 0.25rem 0; color: #888; font-size: 0.85rem; font-style: italic;">📝 ${record.notes}</p>` : ''}
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                    <span style="font-size: 1.2rem; font-weight: 700; color: var(--primary-color);">${formatCurrency(record.totalValue)}</span>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;" onclick="editBookIn('${record.id}')">✏️ Edit</button>
                        <button class="btn btn-danger" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;" onclick="deleteBookIn('${record.id}')">🗑️ Delete</button>
                    </div>
                </div>
            </div>
            ${record.parts.length > 0 ? `
            <div style="margin-top: 0.75rem; border-top: 1px solid #f0f0f0; padding-top: 0.75rem;">
                <p style="margin: 0 0 0.4rem 0; font-size: 0.8rem; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Parts</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${record.parts.map(p => `<span style="background: #f0f4ff; color: #3b5bdb; border-radius: 20px; padding: 0.2rem 0.6rem; font-size: 0.8rem;">${p.name} × ${p.quantity}</span>`).join('')}
                </div>
            </div>` : ''}
        </div>
    `).join('');
}

// Edit Book In Record
function editBookIn(id) {
    const record = bookInRecords.find(r => r.id === id);
    if (!record) return;
    
    // Reset the form first
    document.getElementById('book-in-form').reset();
    document.getElementById('book-in-parts-container').innerHTML = '';
    
    // Update modal title
    const modalTitle = document.querySelector('#book-in-modal .modal-header h2');
    if (modalTitle) modalTitle.textContent = '✏️ Edit Book In Invoice';
    
    // Populate supplier dropdowns first
    populateSupplierDropdowns();
    
    // Set the hidden ID (this tells saveBookIn it's an edit)
    document.getElementById('book-in-id').value = record.id;
    
    // Populate fields
    document.getElementById('book-in-supplier').value = record.supplierId;
    document.getElementById('book-in-invoice-number').value = record.invoiceNumber;
    document.getElementById('book-in-invoice-date').value = record.invoiceDate;
    document.getElementById('book-in-notes').value = record.notes || '';
    
    // Set total value (mark as manual since we're loading saved data)
    const totalField = document.getElementById('book-in-total-value');
    totalField.value = record.totalValue.toFixed(2);
    totalField.dataset.manualEntry = '1';
    
    // Populate part rows
    record.parts.forEach(part => {
        addBookInPartRow(part);
    });
    
    // Update the subtotal hint
    const hint = document.getElementById('book-in-calculated-subtotal');
    const subtotal = record.parts.reduce((sum, p) => sum + (p.quantity * p.costExVat), 0);
    if (hint) hint.textContent = 'Parts subtotal: ' + formatCurrency(subtotal);
    
    openModal('book-in-modal');
}

// Delete Book In Record
function deleteBookIn(id) {
    if (!confirm('Are you sure you want to delete this invoice record? This will NOT reverse stock changes.')) return;
    
    bookInRecords = bookInRecords.filter(r => r.id !== id);
    localStorage.setItem('bookInRecords', JSON.stringify(bookInRecords));
    
    renderBookInList();
    updateBookInSummary();
    showNotification('Invoice record deleted.', 'success');
}

// Update Book In Summary
function updateBookInSummary() {
    const countEl = document.getElementById('total-booked-count');
    const valueEl = document.getElementById('total-booked-value');
    
    if (countEl) countEl.textContent = bookInRecords.length;
    if (valueEl) {
        const total = bookInRecords.reduce((sum, r) => sum + r.totalValue, 0);
        valueEl.textContent = formatCurrency(total);
    }
}

// ===========================================
// PARTS TAB SWITCHING
// ===========================================

function switchPartsTab(tabId) {
    // Update sub-tab buttons
    const subTabs = document.querySelectorAll('#parts .sub-tab');
    subTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find and activate the clicked tab
    subTabs.forEach(tab => {
        if (tab.getAttribute('onclick') && tab.getAttribute('onclick').includes(tabId)) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('#parts .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Refresh specific tab content
    if (tabId === 'parts-list-tab') {
        renderPartsList();
    } else if (tabId === 'parts-returns-tab') {
        renderPartsReturnsList();
    } else if (tabId === 'parts-book-in-tab') {
        renderBookInList();
        updateBookInSummary();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initSupplierManagement();
    populateSupplierDropdowns();
    
    // Add form submission handlers
    const supplierForm = document.getElementById('supplier-form');
    if (supplierForm) {
        supplierForm.addEventListener('submit', saveSupplier);
    }
    
    const bookInForm = document.getElementById('book-in-form');
    if (bookInForm) {
        bookInForm.addEventListener('submit', saveBookIn);
    }

    // Init technical knowledge base
    initTechKnowledgeBase();
});

// Update initializeBilling to include supplier + tech init
const originalInitializeBilling = initializeBilling;
initializeBilling = function() {
    originalInitializeBilling();
    initSupplierManagement();
    populateSupplierDropdowns();
    initTechKnowledgeBase();
};

// ===========================================
// TECHNICAL KNOWLEDGE BASE
// ===========================================

let techItems = JSON.parse(localStorage.getItem('techItems')) || [];

const TECH_TYPE_CONFIG = {
    article:  { icon: '📄', label: 'Article',  listId: 'tech-articles-list',  countId: 'total-articles-count',  searchId: 'tech-articles-search'  },
    bulletin: { icon: '📋', label: 'Bulletin', listId: 'tech-bulletins-list', countId: 'total-bulletins-count', searchId: 'tech-bulletins-search' },
    tip:      { icon: '💡', label: 'Tip',      listId: 'tech-tips-list',      countId: 'total-tips-count',      searchId: 'tech-tips-search'      }
};

function openTechModal(type, id = null) {
    const cfg = TECH_TYPE_CONFIG[type];
    const titleEl = document.getElementById('tech-modal-title');
    const saveBtn = document.getElementById('tech-save-btn');

    document.getElementById('tech-form').reset();
    document.getElementById('tech-item-id').value = '';
    document.getElementById('tech-item-type').value = type;

    if (id) {
        const item = techItems.find(i => i.id === id);
        if (!item) return;
        titleEl.textContent = `✏️ Edit ${cfg.label}`;
        saveBtn.textContent = `Update ${cfg.label}`;
        document.getElementById('tech-item-id').value = item.id;
        document.getElementById('tech-title').value = item.title;
        document.getElementById('tech-category').value = item.category || '';
        document.getElementById('tech-applies-to').value = item.appliesTo || '';
        document.getElementById('tech-content').value = item.content;
        document.getElementById('tech-author').value = item.author || '';
        document.getElementById('tech-priority').value = item.priority || 'normal';
        document.getElementById('tech-tags').value = (item.tags || []).join(', ');
    } else {
        titleEl.textContent = `${cfg.icon} Add ${cfg.label}`;
        saveBtn.textContent = `Save ${cfg.label}`;
    }

    openModal('tech-modal');
}

function saveTechItem(e) {
    e.preventDefault();

    const type = document.getElementById('tech-item-type').value;
    const existingId = document.getElementById('tech-item-id').value;
    const isEdit = existingId && techItems.find(i => i.id === existingId);

    const tagsRaw = document.getElementById('tech-tags').value;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    const item = {
        id: existingId || generateId(),
        type: type,
        title: document.getElementById('tech-title').value.trim(),
        category: document.getElementById('tech-category').value.trim(),
        appliesTo: document.getElementById('tech-applies-to').value.trim(),
        content: document.getElementById('tech-content').value.trim(),
        author: document.getElementById('tech-author').value.trim(),
        priority: document.getElementById('tech-priority').value,
        tags: tags,
        createdAt: isEdit ? techItems.find(i => i.id === existingId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (isEdit) {
        const idx = techItems.findIndex(i => i.id === existingId);
        techItems[idx] = item;
    } else {
        techItems.push(item);
    }

    localStorage.setItem('techItems', JSON.stringify(techItems));
    closeModal('tech-modal');
    renderTechList(type);
    updateTechSummary(type);
    showNotification(isEdit ? `${TECH_TYPE_CONFIG[type].label} updated!` : `${TECH_TYPE_CONFIG[type].label} saved!`, 'success');
}

function deleteTechItem(id) {
    const item = techItems.find(i => i.id === id);
    if (!item) return;
    if (!confirm(`Delete this ${TECH_TYPE_CONFIG[item.type].label}? This cannot be undone.`)) return;
    techItems = techItems.filter(i => i.id !== id);
    localStorage.setItem('techItems', JSON.stringify(techItems));
    renderTechList(item.type);
    updateTechSummary(item.type);
    showNotification(`${TECH_TYPE_CONFIG[item.type].label} deleted.`, 'success');
}

function toggleTechContent(id) {
    const contentEl = document.getElementById(`tech-content-${id}`);
    const btnEl = document.getElementById(`tech-read-more-${id}`);
    if (!contentEl) return;
    if (contentEl.classList.contains('expanded')) {
        contentEl.classList.remove('expanded');
        if (btnEl) btnEl.textContent = 'Read more ▼';
    } else {
        contentEl.classList.add('expanded');
        if (btnEl) btnEl.textContent = 'Show less ▲';
    }
}

function renderTechList(type, filter = '') {
    const cfg = TECH_TYPE_CONFIG[type];
    const container = document.getElementById(cfg.listId);
    if (!container) return;

    let items = techItems.filter(i => i.type === type);

    if (filter) {
        const q = filter.toLowerCase();
        items = items.filter(i =>
            i.title.toLowerCase().includes(q) ||
            (i.category && i.category.toLowerCase().includes(q)) ||
            (i.appliesTo && i.appliesTo.toLowerCase().includes(q)) ||
            (i.content && i.content.toLowerCase().includes(q)) ||
            (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
        );
    }

    if (items.length === 0) {
        container.innerHTML = `<p class="empty-state">No ${cfg.label.toLowerCase()}s found. Click "+ Add ${cfg.label}" to create one.</p>`;
        return;
    }

    const sorted = [...items].sort((a, b) => {
        const priorityOrder = { critical: 0, important: 1, normal: 2, info: 3 };
        const pa = priorityOrder[a.priority] ?? 2;
        const pb = priorityOrder[b.priority] ?? 2;
        if (pa !== pb) return pa - pb;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    container.innerHTML = sorted.map(item => {
        const priorityBadge = item.priority !== 'normal'
            ? `<span class="tech-priority-badge ${item.priority}">${item.priority.toUpperCase()}</span>`
            : '';
        const tagsHtml = item.tags && item.tags.length
            ? `<div class="tech-card-tags">${item.tags.map(t => `<span class="tech-tag">#${t}</span>`).join('')}</div>`
            : '';
        const metaParts = [];
        if (item.category) metaParts.push(`🗂️ ${item.category}`);
        if (item.appliesTo) metaParts.push(`🚗 ${item.appliesTo}`);
        if (item.author) metaParts.push(`👤 ${item.author}`);
        metaParts.push(`🕒 ${new Date(item.updatedAt).toLocaleDateString()}`);
        const metaHtml = `<div class="tech-card-meta">${metaParts.map(m => `<span>${m}</span>`).join('')}</div>`;

        return `
        <div class="tech-knowledge-card priority-${item.priority}">
            <div class="tech-card-header">
                <h4 class="tech-card-title">${cfg.icon} ${item.title}</h4>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    ${priorityBadge}
                    <div class="tech-card-actions">
                        <button class="btn btn-secondary" style="padding:0.3rem 0.7rem;font-size:0.8rem;" onclick="openTechModal('${item.type}','${item.id}')">✏️ Edit</button>
                        <button class="btn btn-danger" style="padding:0.3rem 0.7rem;font-size:0.8rem;" onclick="deleteTechItem('${item.id}')">🗑️</button>
                    </div>
                </div>
            </div>
            ${metaHtml}
            <div class="tech-card-content" id="tech-content-${item.id}">${item.content}</div>
            <button class="tech-read-more" id="tech-read-more-${item.id}" onclick="toggleTechContent('${item.id}')">Read more ▼</button>
            ${tagsHtml}
        </div>`;
    }).join('');
}

function updateTechSummary(type) {
    const cfg = TECH_TYPE_CONFIG[type];
    const countEl = document.getElementById(cfg.countId);
    if (countEl) countEl.textContent = techItems.filter(i => i.type === type).length;
}

function filterTechItems(type) {
    const cfg = TECH_TYPE_CONFIG[type];
    const searchEl = document.getElementById(cfg.searchId);
    renderTechList(type, searchEl ? searchEl.value : '');
}

function switchTechTab(tabId) {
    // Update sub-tab buttons
    const subTabs = document.querySelectorAll('#technical .sub-tab');
    subTabs.forEach(tab => tab.classList.remove('active'));
    subTabs.forEach(tab => {
        if (tab.getAttribute('onclick') && tab.getAttribute('onclick').includes(tabId)) {
            tab.classList.add('active');
        }
    });

    // Update tab content
    document.querySelectorAll('#technical .tab-content').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    // Refresh content
    const typeMap = {
        'tech-articles-tab':  'article',
        'tech-bulletins-tab': 'bulletin',
        'tech-tips-tab':      'tip'
    };
    const type = typeMap[tabId];
    if (type) {
        renderTechList(type);
        updateTechSummary(type);
    }
}

function initTechKnowledgeBase() {
    // Wire up the form submission
    const techForm = document.getElementById('tech-form');
    if (techForm) techForm.addEventListener('submit', saveTechItem);

    // Initial render for all types
    renderTechList('article');
    renderTechList('bulletin');
    renderTechList('tip');
    updateTechSummary('article');
    updateTechSummary('bulletin');
    updateTechSummary('tip');
}

// ==================== QUOTING SYSTEM ====================

// Quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

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
    if (!select) return;
    select.innerHTML = '<option value="">Select Work Order</option>';
    
    if (typeof workOrders !== 'undefined') {
        workOrders.forEach(wo => {
            if (!wo.isQuoteConverted) {
                const customer = typeof customers !== 'undefined' ? customers.find(c => c.id === wo.customerId) : null;
                const vehicle = typeof vehicles !== 'undefined' ? vehicles.find(v => v.id === wo.vehicleId) : null;
                const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'Unknown';
                const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
                
                const option = document.createElement('option');
                option.value = wo.id;
                option.textContent = `WO-${wo.workOrderNumber} - ${customerName} - ${vehicleName}`;
                select.appendChild(option);
            }
        });
    }
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

// Render quote line items
function renderQuoteLineItems() {
    // Services
    const servicesContainer = document.getElementById('quote-services-list');
    if (servicesContainer) {
        let servicesHtml = '';
        quoteLineItems.services.forEach((s, idx) => {
            servicesHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:#f9f9f9;margin-bottom:4px;border-radius:4px;">
                <span>${s.name}</span>
                <span>
                    <strong>${formatCurrency(s.price)}</strong>
                    <button type="button" onclick="removeQuoteService(${idx})" style="margin-left:8px;background:#dc3545;color:white;border:none;padding:2px 6px;border-radius:3px;cursor:pointer;">&times;</button>
                </span>
            </div>`;
        });
        servicesContainer.innerHTML = servicesHtml || '<p style="color:#888;font-style:italic;">No services added</p>';
    }
    
    // Parts
    const partsContainer = document.getElementById('quote-parts-list');
    if (partsContainer) {
        let partsHtml = '';
        quoteLineItems.parts.forEach((p, idx) => {
            partsHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:#f9f9f9;margin-bottom:4px;border-radius:4px;">
                <span>${p.name} × ${p.quantity}</span>
                <span>
                    <strong>${formatCurrency(p.price * p.quantity)}</strong>
                    <button type="button" onclick="removeQuotePart(${idx})" style="margin-left:8px;background:#dc3545;color:white;border:none;padding:2px 6px;border-radius:3px;cursor:pointer;">&times;</button>
                </span>
            </div>`;
        });
        partsContainer.innerHTML = partsHtml || '<p style="color:#888;font-style:italic;">No parts added</p>';
    }
    
    // Custom items
    const customContainer = document.getElementById('quote-custom-list');
    if (customContainer) {
        let customHtml = '';
        quoteLineItems.custom.forEach((c, idx) => {
            customHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:#f9f9f9;margin-bottom:4px;border-radius:4px;">
                <span>${c.name}</span>
                <span>
                    <strong>${formatCurrency(c.total)}</strong>
                    <button type="button" onclick="removeQuoteCustom(${idx})" style="margin-left:8px;background:#dc3545;color:white;border:none;padding:2px 6px;border-radius:3px;cursor:pointer;">&times;</button>
                </span>
            </div>`;
        });
        customContainer.innerHTML = customHtml || '<p style="color:#888;font-style:italic;">No custom items added</p>';
    }
    
    calculateQuoteTotals();
}

// Remove functions
function removeQuoteService(idx) {
    quoteLineItems.services.splice(idx, 1);
    renderQuoteLineItems();
}

function removeQuotePart(idx) {
    quoteLineItems.parts.splice(idx, 1);
    renderQuoteLineItems();
}

function removeQuoteCustom(idx) {
    quoteLineItems.custom.splice(idx, 1);
    renderQuoteLineItems();
}

// Add service to quote
function addServiceToQuote() {
    const select = document.getElementById('quote-service-select');
    if (!select || !select.value) return;
    
    const service = typeof services !== 'undefined' ? services.find(s => s.id === select.value) : null;
    if (service) {
        quoteLineItems.services.push({
            id: service.id,
            name: service.name,
            price: service.price
        });
        select.value = '';
        renderQuoteLineItems();
    }
}

// Add part to quote
function addPartToQuote() {
    const select = document.getElementById('quote-part-select');
    if (!select || !select.value) return;
    
    const part = typeof parts !== 'undefined' ? parts.find(p => p.id === select.value) : null;
    if (part) {
        quoteLineItems.parts.push({
            id: part.id,
            name: part.name,
            price: part.sellingPrice,
            quantity: 1
        });
        select.value = '';
        renderQuoteLineItems();
    }
}

// Add custom item to quote
function addCustomToQuote() {
    const nameInput = document.getElementById('quote-custom-name');
    const totalInput = document.getElementById('quote-custom-total');
    
    if (!nameInput || !totalInput || !nameInput.value || !totalInput.value) return;
    
    quoteLineItems.custom.push({
        name: nameInput.value,
        total: parseFloat(totalInput.value)
    });
    
    nameInput.value = '';
    totalInput.value = '';
    renderQuoteLineItems();
}

// Calculate quote totals
function calculateQuoteTotals() {
    const servicesTotal = quoteLineItems.services.reduce((sum, s) => sum + s.price, 0);
    const partsTotal = quoteLineItems.parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const customTotal = quoteLineItems.custom.reduce((sum, c) => sum + c.total, 0);
    
    const subtotal = servicesTotal + partsTotal + customTotal;
    const discount = parseFloat(document.getElementById('quote-discount')?.value) || 0;
    const taxRate = parseFloat(document.getElementById('quote-tax-rate')?.value) || 15;
    const taxAmount = (subtotal - discount) * (taxRate / 100);
    const total = subtotal - discount + taxAmount;
    
    const servicesTotalEl = document.getElementById('quote-services-total');
    const partsTotalEl = document.getElementById('quote-parts-total');
    const customTotalEl = document.getElementById('quote-custom-total');
    const subtotalEl = document.getElementById('quote-subtotal');
    const taxEl = document.getElementById('quote-tax-amount');
    const totalEl = document.getElementById('quote-grand-total');
    
    if (servicesTotalEl) servicesTotalEl.textContent = formatCurrency(servicesTotal);
    if (partsTotalEl) partsTotalEl.textContent = formatCurrency(partsTotal);
    if (customTotalEl) customTotalEl.textContent = formatCurrency(customTotal);
    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(taxAmount);
    if (totalEl) totalEl.textContent = formatCurrency(total);
}

// Save quote
function saveQuote(e) {
    if (e) e.preventDefault();
    
    const workOrderId = document.getElementById('quote-work-order')?.value;
    const customerId = document.getElementById('quote-customer')?.value;
    const vehicleId = document.getElementById('quote-vehicle')?.value;
    const validUntil = document.getElementById('quote-valid-until')?.value;
    const notes = document.getElementById('quote-notes')?.value || '';
    const discount = parseFloat(document.getElementById('quote-discount')?.value) || 0;
    const taxRate = parseFloat(document.getElementById('quote-tax-rate')?.value) || 15;
    
    const servicesTotal = quoteLineItems.services.reduce((sum, s) => sum + s.price, 0);
    const partsTotal = quoteLineItems.parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const customTotal = quoteLineItems.custom.reduce((sum, c) => sum + c.total, 0);
    const subtotal = servicesTotal + partsTotal + customTotal;
    const taxAmount = (subtotal - discount) * (taxRate / 100);
    const total = subtotal - discount + taxAmount;
    
    const quote = {
        id: generateId(),
        quoteNumber: `QT-${Date.now().toString().slice(-6)}`,
        workOrderId: workOrderId,
        customerId: customerId,
        vehicleId: vehicleId,
        services: [...quoteLineItems.services],
        parts: [...quoteLineItems.parts],
        customItems: [...quoteLineItems.custom],
        servicesTotal: servicesTotal,
        partsTotal: partsTotal,
        customTotal: customTotal,
        subtotal: subtotal,
        discount: discount,
        taxRate: taxRate,
        taxAmount: taxAmount,
        total: total,
        status: 'pending',
        expiresAt: validUntil,
        notes: notes,
        createdAt: new Date().toISOString()
    };
    
    quotes.push(quote);
    saveQuotesData();
    closeModal('create-quote-modal');
    renderQuotesList();
    showNotification('Quote created successfully!', 'success');
}

// Save quotes to localStorage
function saveQuotesData() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Render quotes list with styled buttons (matching customer page style)
function renderQuotesList() {
    const container = document.getElementById('quotes-list');
    
    if (!container) return;
    
    if (quotes.length === 0) {
        container.innerHTML = '<p class="empty-state">No quotes found. Create your first quote!</p>';
        return;
    }
    
    let html = '<table>';
    html += '<thead><tr>';
    html += '<th>Quote #</th>';
    html += '<th>Customer</th>';
    html += '<th>Vehicle</th>';
    html += '<th>Total</th>';
    html += '<th>Status</th>';
    html += '<th>Valid Until</th>';
    html += '<th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    quotes.forEach(quote => {
        const customer = typeof customers !== 'undefined' ? customers.find(c => c.id === quote.customerId) : null;
        const vehicle = typeof vehicles !== 'undefined' ? vehicles.find(v => v.id === quote.vehicleId) : null;
        const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'N/A';
        const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A';
        
        let statusBadge = '';
        if (quote.status === 'pending') {
            statusBadge = '<span class="status-badge status-pending">Pending</span>';
        } else if (quote.status === 'accepted') {
            statusBadge = '<span class="status-badge status-accepted">Accepted</span>';
        } else if (quote.status === 'rejected') {
            statusBadge = '<span class="status-badge status-rejected">Rejected</span>';
        } else if (quote.status === 'converted') {
            statusBadge = '<span class="status-badge status-converted">Converted</span>';
        }
        
        let validUntil = quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : '-';
        
        html += '<tr>';
        html += `<td>${quote.quoteNumber}</td>`;
        html += `<td>${customerName}</td>`;
        html += `<td>${vehicleName}</td>`;
        html += `<td style="text-align:right;font-weight:bold;">${formatCurrency(quote.total)}</td>`;
        html += `<td style="text-align:center;">${statusBadge}</td>`;
        html += `<td style="text-align:center;">${validUntil}</td>`;
        html += '<td>';
        html += '<div class="action-buttons" onclick="event.stopPropagation()">';
        html += `<button class="btn btn-secondary" onclick="viewQuote('${quote.id}')">View</button>`;
        
        if (quote.status === 'pending') {
            html += `<button class="btn btn-success" onclick="convertQuoteToInvoice('${quote.id}')">Convert</button>`;
        }
        
        html += `<button class="btn btn-danger" onclick="deleteQuote('${quote.id}')">Delete</button>`;
        html += '</div>';
        html += '</td>';
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// View quote details
function viewQuote(quoteId) {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    const customer = typeof customers !== 'undefined' ? customers.find(c => c.id === quote.customerId) : null;
    const vehicle = typeof vehicles !== 'undefined' ? vehicles.find(v => v.id === quote.vehicleId) : null;
    const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'N/A';
    const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A';
    
    let html = `
        <div class="quote-view-container">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem;padding:1rem;background:#f8f9fa;border-radius:8px;">
                <div><strong>Quote Number</strong><br>${quote.quoteNumber}</div>
                <div><strong>Customer</strong><br>${customerName}</div>
                <div><strong>Vehicle</strong><br>${vehicleName}</div>
                <div><strong>Status</strong><br>${quote.status}</div>
                <div><strong>Valid Until</strong><br>${quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : 'Not set'}</div>
                <div><strong>Created</strong><br>${new Date(quote.createdAt).toLocaleDateString()}</div>
            </div>
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
            <div style="background:#f8f9fa;padding:1rem;border-radius:8px;margin-top:1rem;">
                <p><strong>Subtotal:</strong> ${formatCurrency(quote.subtotal)}</p>
                <p><strong>Discount:</strong> -${formatCurrency(quote.discount)}</p>
                <p><strong>Tax:</strong> ${formatCurrency(quote.taxAmount)}</p>
                <p style="font-size:1.2em;font-weight:bold;"><strong>Total:</strong> ${formatCurrency(quote.total)}</p>
            </div>
            ${quote.notes ? `<p style="margin-top:1rem;"><strong>Notes:</strong> ${quote.notes}</p>` : ''}
            <div style="margin-top:1.5rem;display:flex;gap:10px;">
                <button class="btn btn-secondary" onclick="closeModal('quote-view-modal')">Close</button>
                ${quote.status === 'pending' ? `<button class="btn btn-success" onclick="convertQuoteToInvoice('${quote.id}'); closeModal('quote-view-modal');">Convert to Invoice</button>` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('quote-view-content').innerHTML = html;
    openModal('quote-view-modal');
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
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        workOrderId: quote.workOrderId,
        customerId: quote.customerId,
        vehicleId: quote.vehicleId,
        services: quote.services,
        parts: quote.parts,
        customItems: quote.customItems,
        laborHours: quote.laborHours || 0,
        laborRate: quote.laborRate || 0,
        laborTotal: quote.laborTotal || 0,
        servicesTotal: quote.servicesTotal,
        partsTotal: quote.partsTotal,
        customTotal: quote.customTotal,
        subtotal: quote.subtotal,
        discount: quote.discount,
        taxRate: quote.taxRate,
        taxAmount: quote.taxAmount,
        total: quote.total,
        notes: quote.notes,
        status: 'draft',
        amountPaid: 0,
        balanceDue: quote.total,
        createdAt: new Date().toISOString()
    };
    
    invoices.push(invoice);
    quote.status = 'converted';
    
    saveBillingData();
    saveQuotesData();
    renderQuotesList();
    renderInvoicesList();
    showNotification('Quote converted to invoice successfully!', 'success');
}

// Delete quote
function deleteQuote(quoteId) {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    
    quotes = quotes.filter(q => q.id !== quoteId);
    saveQuotesData();
    renderQuotesList();
    showNotification('Quote deleted successfully!', 'success');
}

// Filter quotes
function filterQuotes() {
    const searchTerm = document.getElementById('quotes-search')?.value.toLowerCase().trim() || '';
    
    if (!searchTerm) {
        renderQuotesList();
        return;
    }
    
    const filtered = quotes.filter(quote => {
        const customer = typeof customers !== 'undefined' ? customers.find(c => c.id === quote.customerId) : null;
        const vehicle = typeof vehicles !== 'undefined' ? vehicles.find(v => v.id === quote.vehicleId) : null;
        const customerName = customer ? `${customer.firstName} ${customer.lastName}`.toLowerCase() : '';
        const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase() : '';
        
        return quote.quoteNumber.toLowerCase().includes(searchTerm) ||
               customerName.includes(searchTerm) ||
               vehicleName.includes(searchTerm);
    });
    
    // Render filtered list
    const container = document.getElementById('quotes-list');
    if (!container) return;
    
    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-state">No quotes match your search.</p>';
        return;
    }
    
    let html = '<table>';
    html += '<thead><tr>';
    html += '<th>Quote #</th>';
    html += '<th>Customer</th>';
    html += '<th>Vehicle</th>';
    html += '<th>Total</th>';
    html += '<th>Status</th>';
    html += '<th>Valid Until</th>';
    html += '<th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    filtered.forEach(quote => {
        const customer = typeof customers !== 'undefined' ? customers.find(c => c.id === quote.customerId) : null;
        const vehicle = typeof vehicles !== 'undefined' ? vehicles.find(v => v.id === quote.vehicleId) : null;
        const customerName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : 'N/A';
        const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A';
        
        let statusBadge = '';
        if (quote.status === 'pending') {
            statusBadge = '<span class="status-badge status-pending">Pending</span>';
        } else if (quote.status === 'accepted') {
            statusBadge = '<span class="status-badge status-accepted">Accepted</span>';
        } else if (quote.status === 'rejected') {
            statusBadge = '<span class="status-badge status-rejected">Rejected</span>';
        } else if (quote.status === 'converted') {
            statusBadge = '<span class="status-badge status-converted">Converted</span>';
        }
        
        let validUntil = quote.expiresAt ? new Date(quote.expiresAt).toLocaleDateString() : '-';
        
        html += '<tr>';
        html += `<td>${quote.quoteNumber}</td>`;
        html += `<td>${customerName}</td>`;
        html += `<td>${vehicleName}</td>`;
        html += `<td style="text-align:right;font-weight:bold;">${formatCurrency(quote.total)}</td>`;
        html += `<td style="text-align:center;">${statusBadge}</td>`;
        html += `<td style="text-align:center;">${validUntil}</td>`;
        html += '<td>';
        html += '<div class="action-buttons" onclick="event.stopPropagation()">';
        html += `<button class="btn btn-secondary" onclick="viewQuote('${quote.id}')">View</button>`;
        
        if (quote.status === 'pending') {
            html += `<button class="btn btn-success" onclick="convertQuoteToInvoice('${quote.id}')">Convert</button>`;
        }
        
        html += `<button class="btn btn-danger" onclick="deleteQuote('${quote.id}')">Delete</button>`;
        html += '</div>';
        html += '</td>';
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Initialize quotes on page load
document.addEventListener('DOMContentLoaded', function() {
    renderQuotesList();
});
