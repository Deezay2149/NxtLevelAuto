// Parts Management
let parts = JSON.parse(localStorage.getItem('parts')) || [];
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
let currentPartImages = [];  // array of base64 strings

// Sorting state for parts
let partSortColumn = 'name';
let partSortDirection = 'asc';

// Initialize Billing Features
function initializeBilling() {
    initializePartsManagement();
    initializeInvoices();
    renderPartsList();
    renderStockLevelsList();
    renderInvoicesList();
}

// Parts Management Functions
function openPartModal() {
    document.getElementById('part-form').reset();
    document.getElementById('part-id').value = '';
    currentPartImages = [];
    renderPartImageGallery();
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
        serialNumber: document.getElementById('part-serial-number').value || '',
        description: document.getElementById('part-description').value,
        costExVat: parseFloat(document.getElementById('part-cost-ex-vat').value) || 0,
        costPrice: parseFloat(document.getElementById('part-cost-inc-vat').value) || parseFloat(document.getElementById('part-cost-ex-vat').value) || 0,
        sellingPrice: parseFloat(document.getElementById('part-price').value) || 0,
        stockQuantity: parseInt(document.getElementById('part-stock').value) || 0,
        minStockLevel: parseInt(document.getElementById('part-min-stock').value) || 0,
        reorderQty: parseInt(document.getElementById('part-reorder-qty').value) || 0,
        supplierId: supplierId,
        supplier: supplier ? supplier.name : '',
        images: currentPartImages.length ? currentPartImages : (existingPart ? (existingPart.images || (existingPart.image ? [existingPart.image] : [])) : []),
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
    renderStockLevelsList();
    showNotification('Part saved successfully!', 'success');
    currentPartImages = [];
}

// Sort Parts
function sortParts(column) {
    if (partSortColumn === column) {
        partSortDirection = partSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        partSortColumn = column;
        partSortDirection = 'asc';
    }
    renderPartsList();
}

function renderPartsList() {
    const container = document.getElementById('parts-list');
    
    if (parts.length === 0) {
        container.innerHTML = '<p class="empty-state">No parts found. Add your first part!</p>';
        return;
    }
    
    // Sort parts
    const sortedParts = [...parts].sort((a, b) => {
        let aVal, bVal;
        switch (partSortColumn) {
            case 'name':
                aVal = (a.name || '').toLowerCase();
                bVal = (b.name || '').toLowerCase();
                break;
            case 'sku':
                aVal = (a.sku || '').toLowerCase();
                bVal = (b.sku || '').toLowerCase();
                break;
            case 'serialNumber':
                aVal = (a.serialNumber || '').toLowerCase();
                bVal = (b.serialNumber || '').toLowerCase();
                break;
            case 'cost':
                aVal = parseFloat(a.costPrice) || 0;
                bVal = parseFloat(b.costPrice) || 0;
                break;
            case 'price':
                aVal = parseFloat(a.sellingPrice) || 0;
                bVal = parseFloat(b.sellingPrice) || 0;
                break;
            case 'stock':
                aVal = parseInt(a.stockQuantity) || 0;
                bVal = parseInt(b.stockQuantity) || 0;
                break;
            case 'supplier':
                aVal = (a.supplier || '').toLowerCase();
                bVal = (b.supplier || '').toLowerCase();
                break;
            default:
                aVal = (a.name || '').toLowerCase();
                bVal = (b.name || '').toLowerCase();
        }
        if (partSortDirection === 'asc') {
            return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
        } else {
            return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal;
        }
    });
    
    const sortIndicator = (col) => partSortColumn === col ? (partSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    
    const table = document.createElement('table');
    table.className = 'parts-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th class="sortable" onclick="sortParts('name')">Part Name${sortIndicator('name')}</th>
                <th class="sortable" onclick="sortParts('sku')">SKU${sortIndicator('sku')}</th>
                <th class="sortable" onclick="sortParts('serialNumber')">Serial Number${sortIndicator('serialNumber')}</th>
                <th class="sortable" onclick="sortParts('cost')">Cost${sortIndicator('cost')}</th>
                <th class="sortable" onclick="sortParts('price')">Selling Price${sortIndicator('price')}</th>
                <th class="sortable" onclick="sortParts('stock')">Stock${sortIndicator('stock')}</th>
                <th>Min Stock</th>
                <th class="sortable" onclick="sortParts('supplier')">Supplier${sortIndicator('supplier')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedParts.map(part => {
                const minStock = part.minStockLevel || 0;
                const stockClass = minStock > 0 && part.stockQuantity <= minStock ? 'stock-low' : part.stockQuantity <= 5 ? 'stock-low' : part.stockQuantity <= 20 ? 'stock-medium' : 'stock-good';
                const pImgs = part.images && part.images.length ? part.images : (part.image ? [part.image] : []);
                const imageHTML = pImgs.length
                    ? `<div style="position:relative;display:inline-block">` +
                       `<img src="${pImgs[0]}" class="vehicle-thumbnail" onclick="showPartImages('${part.id}')" alt="Part Image">` +
                       (pImgs.length > 1 ? `<span style="position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;font-size:0.65rem;padding:1px 4px;border-radius:3px;">${pImgs.length}📷</span>` : '') +
                       `</div>`
                    : '<span style="color: var(--text-light); font-size: 0.8rem;">No image</span>';
                
                // Create image gallery HTML for hover tooltip
                const galleryHTML = pImgs.length
                    ? `<div class="hover-image-gallery">
                        ${pImgs.map(img => `<img src="${img}" alt="Part Image">`).join('')}
                       </div>`
                    : '<div class="hover-image-gallery">No images</div>';
                
                return `
                <tr class="part-row" data-part-id="${part.id}" data-images='${JSON.stringify(pImgs)}'>
                    <td>${imageHTML}</td>
                    <td>${part.name}</td>
                    <td>${part.sku || 'N/A'}</td>
                    <td>${part.serialNumber || 'N/A'}</td>
                    <td>${formatCurrency(part.costPrice)}</td>
                    <td>${formatCurrency(part.sellingPrice)}</td>
                    <td><span class="stock-badge ${stockClass}">${part.stockQuantity}</span></td>
                    <td>${minStock > 0 ? minStock : '-'}</td>
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
    
    // Add hover event listeners for part rows
    const rows = table.querySelectorAll('.part-row');
    rows.forEach(row => {
        row.addEventListener('mouseenter', showPartImageHover);
        row.addEventListener('mouseleave', hidePartImageHover);
    });
}

// Render Stock Levels List - Parts that need reordering
function renderStockLevelsList() {
    const container = document.getElementById('stock-levels-list');
    const reorderCountEl = document.getElementById('reorder-count');
    const reorderValueEl = document.getElementById('reorder-value');
    
    // Filter parts that need reordering (stock <= minStockLevel and minStockLevel > 0)
    const partsToReorder = parts.filter(part => {
        const minStock = part.minStockLevel || 0;
        return minStock > 0 && part.stockQuantity <= minStock;
    });
    
    // Update summary
    if (reorderCountEl) reorderCountEl.textContent = partsToReorder.length;
    
    let totalValue = 0;
    partsToReorder.forEach(part => {
        const reorderQty = part.reorderQty || (part.minStockLevel - part.stockQuantity + 5);
        totalValue += reorderQty * (part.costPrice || 0);
    });
    if (reorderValueEl) reorderValueEl.textContent = formatCurrency(totalValue);
    
    if (partsToReorder.length === 0) {
        container.innerHTML = '<p class="empty-state">All parts are above minimum stock levels. Great job!</p>';
        return;
    }
    
    // Group by supplier
    const bySupplier = {};
    partsToReorder.forEach(part => {
        const supplierName = part.supplier || 'Unknown Supplier';
        if (!bySupplier[supplierName]) {
            bySupplier[supplierName] = [];
        }
        bySupplier[supplierName].push(part);
    });
    
    let html = '';
    
    // Render by supplier
    Object.keys(bySupplier).sort().forEach(supplierName => {
        const supplierParts = bySupplier[supplierName];
        let supplierTotal = 0;
        
        html += `
            <div class="stock-levels-supplier-group">
                <h3 class="supplier-header">📦 ${supplierName}</h3>
                <table class="stock-levels-table">
                    <thead>
                        <tr>
                            <th>Part Name</th>
                            <th>SKU</th>
                            <th>Current Stock</th>
                            <th>Min Level</th>
                            <th>Reorder Qty</th>
                            <th>Unit Cost</th>
                            <th>Line Total</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        supplierParts.forEach(part => {
            const reorderQty = part.reorderQty || Math.max(1, (part.minStockLevel - part.stockQuantity + 5));
            const lineTotal = reorderQty * (part.costPrice || 0);
            supplierTotal += lineTotal;
            
            const stockClass = part.stockQuantity === 0 ? 'stock-critical' : 'stock-low';
            
            html += `
                <tr class="stock-level-row ${stockClass}">
                    <td>${part.name}</td>
                    <td>${part.sku || 'N/A'}</td>
                    <td><span class="stock-badge stock-low">${part.stockQuantity}</span></td>
                    <td>${part.minStockLevel}</td>
                    <td>${reorderQty}</td>
                    <td>${formatCurrency(part.costPrice)}</td>
                    <td>${formatCurrency(lineTotal)}</td>
                </tr>`;
        });
        
        html += `
                    </tbody>
                    <tfoot>
                        <tr class="supplier-total">
                            <td colspan="6"><strong>${supplierName} Total:</strong></td>
                            <td><strong>${formatCurrency(supplierTotal)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>`;
    });
    
    // Add grand total
    html += `
        <div class="stock-levels-grand-total">
            <h3>Grand Total: ${formatCurrency(totalValue)}</h3>
        </div>`;
    
    container.innerHTML = html;
}

function editPart(id) {
    const part = parts.find(p => p.id === id);
    if (!part) return;

    document.getElementById('part-id').value = part.id;
    document.getElementById('part-name').value = part.name;
    document.getElementById('part-sku').value = part.sku || '';
    document.getElementById('part-serial-number').value = part.serialNumber || '';
    document.getElementById('part-description').value = part.description || '';
    document.getElementById('part-cost-ex-vat').value = part.costExVat || part.costPrice || 0;
    document.getElementById('part-price').value = part.sellingPrice;
    document.getElementById('part-supplier').value = part.supplierId || '';
    document.getElementById('part-stock').value = part.stockQuantity;
    document.getElementById('part-min-stock').value = part.minStockLevel || '';
    document.getElementById('part-reorder-qty').value = part.reorderQty || '';

    // Calculate VAT and profit display
    calculatePartPricing();

    // Load existing images into gallery
    currentPartImages = part.images && part.images.length
        ? [...part.images]
        : (part.image ? [part.image] : []);
    renderPartImageGallery();

    openModal('part-modal');
}

function addPartImages(input) {
    const MAX_IMAGES = 8;
    const files = Array.from(input.files);
    if (!files.length) return;

    const remaining = MAX_IMAGES - currentPartImages.length;
    if (remaining <= 0) {
        showNotification(`Maximum ${MAX_IMAGES} photos allowed per part.`, 'error');
        input.value = '';
        return;
    }

    const toLoad = files.slice(0, remaining);
    if (files.length > remaining) {
        showNotification(`Only ${remaining} more photo(s) can be added (max ${MAX_IMAGES}).`, 'error');
    }

    let loaded = 0;
    toLoad.forEach(file => {
        if (!file.type.match('image.*')) return;
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Each image must be under 5MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            currentPartImages.push(e.target.result);
            loaded++;
            if (loaded === toLoad.length) renderPartImageGallery();
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}

function renderPartImageGallery() {
    const gallery = document.getElementById('part-image-gallery');
    if (!gallery) return;

    const MAX_IMAGES = 8;
    let html = '';

    currentPartImages.forEach((src, idx) => {
        html += `
            <div class="image-gallery-item">
                <img src="${src}" alt="Part photo ${idx+1}" onclick="openImageLightbox(currentPartImages, ${idx})">
                <button class="img-remove-btn" onclick="removePartImage(${idx})" title="Remove">✕</button>
            </div>`;
    });

    if (currentPartImages.length < MAX_IMAGES) {
        html += `
            <div class="image-gallery-add" onclick="document.getElementById('part-image').click()" title="Add photo">
                <span>📷</span><span>Add Photo</span>
            </div>`;
    }

    gallery.innerHTML = html;
}

function removePartImage(idx) {
    if (confirm('Are you sure you want to remove this image?')) {
        currentPartImages.splice(idx, 1);
        renderPartImageGallery();
    }
}

function showPartImages(id) {
    const part = parts.find(p => p.id === id);
    if (!part) return;
    const imgs = part.images && part.images.length ? part.images : (part.image ? [part.image] : []);
    if (!imgs.length) return;
    openImageLightbox(imgs, 0, part.name);
}

// Keep legacy alias
function showPartImage(id) { showPartImages(id); }

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

    // Reset submit button text
    resetInvoiceSubmitButton();

    // Set default values from global settings
    document.getElementById('invoice-tax-rate').value = getTaxRate();
    document.getElementById('invoice-labor-rate').value = getLaborRate();

    openModal('create-invoice-modal');
}

function resetInvoiceSubmitButton() {
    const form = document.getElementById('create-invoice-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Generate Invoice';
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
    }
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

    // Adjust stock for parts that were invoiced
    invoiceParts.forEach(invoicePart => {
        const part = parts.find(p => p.id === invoicePart.partId);
        if (part) {
            part.stockQuantity = Math.max(0, part.stockQuantity - invoicePart.quantity);
        }
    });

    saveBillingData();
    closeModal('create-invoice-modal');
    renderInvoicesList();
    renderPartsList(); // Refresh parts list to show updated stock
    updateDashboard();
    showNotification('Invoice created successfully! Stock adjusted for invoiced parts.', 'success');
}

// Invoice sorting state
let invoiceSortColumn = 'date';
let invoiceSortDirection = 'desc';

function sortInvoices(column) {
    if (invoiceSortColumn === column) {
        invoiceSortDirection = invoiceSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        invoiceSortColumn = column;
        invoiceSortDirection = 'asc';
    }
    renderInvoicesList();
}

function renderInvoicesList() {
    const container = document.getElementById('invoices-list');
    
    if (invoices.length === 0) {
        container.innerHTML = '<p class="empty-state">No invoices found. Create your first invoice!</p>';
        return;
    }
    
    // Sort invoices
    const sortedInvoices = [...invoices].sort((a, b) => {
        let aVal, bVal;
        const aCustomer = customers.find(c => c.id === a.customerId);
        const bCustomer = customers.find(c => c.id === b.customerId);
        switch (invoiceSortColumn) {
            case 'number':
                aVal = (a.invoiceNumber || '').toLowerCase();
                bVal = (b.invoiceNumber || '').toLowerCase();
                break;
            case 'date':
                aVal = new Date(a.createdAt).getTime();
                bVal = new Date(b.createdAt).getTime();
                break;
            case 'customer':
                aVal = aCustomer ? `${aCustomer.firstName} ${aCustomer.lastName}`.toLowerCase() : '';
                bVal = bCustomer ? `${bCustomer.firstName} ${bCustomer.lastName}`.toLowerCase() : '';
                break;
            case 'total':
                aVal = parseFloat(a.total) || 0;
                bVal = parseFloat(b.total) || 0;
                break;
            case 'paid':
                aVal = parseFloat(a.amountPaid) || 0;
                bVal = parseFloat(b.amountPaid) || 0;
                break;
            case 'balance':
                aVal = parseFloat(a.balanceDue) || 0;
                bVal = parseFloat(b.balanceDue) || 0;
                break;
            case 'status':
                aVal = (a.status || '').toLowerCase();
                bVal = (b.status || '').toLowerCase();
                break;
            default:
                aVal = new Date(a.createdAt).getTime();
                bVal = new Date(b.createdAt).getTime();
        }
        if (invoiceSortDirection === 'asc') {
            return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
        } else {
            return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal;
        }
    });

    const sortIndicator = (col) => invoiceSortColumn === col ? (invoiceSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortInvoices('number')">Invoice #${sortIndicator('number')}</th>
                <th class="sortable" onclick="sortInvoices('date')">Date${sortIndicator('date')}</th>
                <th class="sortable" onclick="sortInvoices('customer')">Customer${sortIndicator('customer')}</th>
                <th class="sortable" onclick="sortInvoices('total')">Total${sortIndicator('total')}</th>
                <th class="sortable" onclick="sortInvoices('paid')">Paid${sortIndicator('paid')}</th>
                <th class="sortable" onclick="sortInvoices('balance')">Balance${sortIndicator('balance')}</th>
                <th class="sortable" onclick="sortInvoices('status')">Status${sortIndicator('status')}</th>
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
                            <button class="btn btn-info" onclick="editInvoice('${invoice.id}')">Edit</button>
                            <button class="btn btn-success" onclick="openPaymentModal('${invoice.id}')">Payment</button>
                            <button class="btn btn-secondary" onclick="openStatusModal('${invoice.id}')">Status</button>
                            <button class="btn btn-warning" onclick="openInvoiceNotesModal('${invoice.id}')">Notes</button>
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
    const shopName = getShopName();
    const shopSettings = JSON.parse(localStorage.getItem('globalSettings')) || {};

    // Recalculate totals from stored invoice data
    const laborHours = invoice.laborHours || 0;
    const laborRate = invoice.laborRate || 0;
    const laborTotal = invoice.laborTotal || (laborHours * laborRate);

    let servicesTotal = 0;
    (invoice.services || []).forEach(s => { servicesTotal += parseFloat(s.price || s.total || 0); });

    let partsTotal = 0;
    (invoice.parts || []).forEach(p => { partsTotal += parseFloat(p.total || (p.unitPrice * p.quantity) || 0); });

    let customTotal = 0;
    (invoice.customItems || []).forEach(c => { customTotal += parseFloat(c.total || 0); });

    const subtotal = invoice.subtotal || (servicesTotal + partsTotal + customTotal + laborTotal);
    const discount = invoice.discount || 0;
    const taxRate = invoice.taxRate !== undefined ? invoice.taxRate : (shopSettings.taxRate || 0);
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxAmount = invoice.taxAmount !== undefined ? invoice.taxAmount : (taxableAmount * taxRate / 100);
    const total = invoice.total || (taxableAmount + taxAmount);
    const amountPaid = invoice.amountPaid || 0;
    const balanceDue = invoice.balanceDue !== undefined ? invoice.balanceDue : (total - amountPaid);

    // Services rows
    const servicesRows = (invoice.services || []).map(service => `
        <tr>
            <td>${service.name || 'Service'}</td>
            <td>1</td>
            <td>${formatCurrency(service.price || service.total || 0)}</td>
            <td>${formatCurrency(service.price || service.total || 0)}</td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="color:var(--text-light);text-align:center;">No services</td></tr>';

    // Parts rows
    const partsRows = (invoice.parts || []).map(part => {
        const unitPrice = part.unitPrice || part.price || 0;
        const qty = part.quantity || 1;
        const lineTotal = part.total || (unitPrice * qty);
        return `
        <tr>
            <td>${part.name || 'Part'}</td>
            <td>${qty}</td>
            <td>${formatCurrency(unitPrice)}</td>
            <td>${formatCurrency(lineTotal)}</td>
        </tr>`;
    }).join('');

    // Custom items rows
    const customRows = (invoice.customItems || []).map(item => `
        <tr>
            <td>${item.name || 'Custom Item'}${item.description ? `<br><small>${item.description}</small>` : ''}</td>
            <td>${item.quantity || 1}</td>
            <td>${formatCurrency(item.unitPrice || 0)}</td>
            <td>${formatCurrency(item.total || 0)}</td>
        </tr>
    `).join('');

    let invoiceHTML = `
        <div class="invoice-header">
            <h1>${shopName}</h1>
            ${shopSettings.address ? `<p style="font-size:0.85rem;color:#666;">${shopSettings.address}</p>` : ''}
            ${shopSettings.phone ? `<p style="font-size:0.85rem;color:#666;">Tel: ${shopSettings.phone}</p>` : ''}
            ${shopSettings.email ? `<p style="font-size:0.85rem;color:#666;">Email: ${shopSettings.email}</p>` : ''}
            <h2>INVOICE</h2>
            <p><strong>${invoice.invoiceNumber}</strong></p>
        </div>
        
        <div class="invoice-info">
            <div class="invoice-info-section">
                <h3>Date</h3>
                <p>${new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="invoice-info-section">
                <h3>Last Updated</h3>
                <p>${invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleDateString() : new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="invoice-info-section">
                <h3>Status</h3>
                <p class="status-badge invoice-status-${invoice.status}">${invoice.status}</p>
            </div>
        </div>
        
        <div class="invoice-info">
            <div class="invoice-info-section">
                <h3>Bill To</h3>
                <p><strong>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</strong></p>
                ${customer && customer.email ? `<p>${customer.email}</p>` : ''}
                ${customer && customer.phone ? `<p>${customer.phone}</p>` : ''}
                ${customer && customer.address ? `<p>${customer.address}</p>` : ''}
            </div>
            <div class="invoice-info-section">
                <h3>Vehicle</h3>
                <p><strong>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</strong></p>
                ${vehicle ? `<p>Reg: ${vehicle.registrationNumber || vehicle.plate || 'N/A'}</p>` : ''}
                ${vehicle && vehicle.vin ? `<p>VIN: ${vehicle.vin}</p>` : ''}
                <p>Work Order: <strong>#${workOrder ? workOrder.id.substring(0, 8).toUpperCase() : 'N/A'}</strong></p>
            </div>
        </div>

        <!-- All Line Items in one table -->
        <h3>Invoice Items</h3>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${(invoice.services || []).length > 0 ? `
                    <tr style="background:var(--bg-secondary);"><td colspan="4"><strong>🔧 Services</strong></td></tr>
                    ${servicesRows}
                ` : ''}
                ${(invoice.parts || []).length > 0 ? `
                    <tr style="background:var(--bg-secondary);"><td colspan="4"><strong>🔩 Parts</strong></td></tr>
                    ${partsRows}
                ` : ''}
                ${(invoice.customItems || []).length > 0 ? `
                    <tr style="background:var(--bg-secondary);"><td colspan="4"><strong>➕ Additional Items</strong></td></tr>
                    ${customRows}
                ` : ''}
                ${laborHours > 0 ? `
                    <tr style="background:var(--bg-secondary);"><td colspan="4"><strong>⏱️ Labor</strong></td></tr>
                    <tr>
                        <td>Labor Charges (${laborHours} hrs @ ${formatCurrency(laborRate)}/hr)</td>
                        <td>${laborHours}</td>
                        <td>${formatCurrency(laborRate)}/hr</td>
                        <td>${formatCurrency(laborTotal)}</td>
                    </tr>
                ` : ''}
            </tbody>
        </table>
        
        <div class="invoice-totals">
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Subtotal</span>
                <span class="invoice-totals-value">${formatCurrency(subtotal)}</span>
            </div>
            ${discount > 0 ? `
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Discount</span>
                <span class="invoice-totals-value" style="color:#28a745;">-${formatCurrency(discount)}</span>
            </div>` : ''}
            ${taxRate > 0 ? `
            <div class="invoice-totals-row">
                <span class="invoice-totals-label">Tax (${taxRate}%)</span>
                <span class="invoice-totals-value">${formatCurrency(taxAmount)}</span>
            </div>` : ''}
            <div class="invoice-totals-row" style="font-size:1.15rem;font-weight:700;border-top:2px solid var(--border-color);padding-top:0.5rem;margin-top:0.25rem;">
                <span class="invoice-totals-label">Total</span>
                <span class="invoice-totals-value">${formatCurrency(total)}</span>
            </div>
            ${amountPaid > 0 ? `
            <div class="invoice-totals-row" style="color:#28a745;">
                <span class="invoice-totals-label">Amount Paid</span>
                <span class="invoice-totals-value">-${formatCurrency(amountPaid)}</span>
            </div>
            <div class="invoice-totals-row" style="font-weight:700;color:${balanceDue > 0 ? '#dc3545' : '#28a745'};">
                <span class="invoice-totals-label">Balance Due</span>
                <span class="invoice-totals-value">${formatCurrency(balanceDue)}</span>
            </div>` : ''}
        </div>
        
        ${invoice.notes ? `
        <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: 6px; border-left: 4px solid var(--primary-color);">
            <h4>📝 Notes</h4>
            <p>${invoice.notes}</p>
        </div>
        ` : ''}

        ${invoice.payments && invoice.payments.length > 0 ? `
        <div style="margin-top: 1.5rem;">
            <h4>💳 Payment History</h4>
            <table class="invoice-table">
                <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead>
                <tbody>
                    ${invoice.payments.map(p => `
                    <tr>
                        <td>${new Date(p.date).toLocaleDateString()}</td>
                        <td>${formatCurrency(p.amount)}</td>
                        <td>${p.method || 'N/A'}</td>
                        <td>${p.reference || '-'}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>` : ''}
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



// Render invoice items from existing invoice data (for editing)
function renderInvoiceItemsFromInvoice(invoice) {
    // Render Services
    let servicesHTML = '<div class="invoice-items-section"><h4>🔧 Services</h4>';
    if (invoice.services && invoice.services.length > 0) {
        invoice.services.forEach((item, index) => {
            const price = item.price || item.total || 0;
            servicesHTML += `
                <div class="invoice-line-item">
                    <div class="line-item-number">${index + 1}</div>
                    <div class="line-item-description">${item.name || 'Service'}</div>
                    <div class="line-item-quantity">1</div>
                    <div class="line-item-price">
                        <span class="modified-price">${formatCurrency(price)}</span>
                    </div>
                    <div class="line-item-total">${formatCurrency(price)}</div>
                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('service', ${index})">✏️</button>
                    </div>
                </div>
            `;
        });
    } else {
        servicesHTML += '<p style="color: var(--text-light); padding: 0.5rem;">No services</p>';
    }
    servicesHTML += '</div>';
    document.getElementById('invoice-services-list').innerHTML = servicesHTML;
    
    // Render Parts
    let partsHTML = '<div class="invoice-items-section"><h4>🔩 Parts</h4>';
    if (invoice.parts && invoice.parts.length > 0) {
        invoice.parts.forEach((item, index) => {
            const total = item.total || (item.unitPrice * item.quantity) || 0;
            const unitPrice = item.unitPrice || item.price || 0;
            partsHTML += `
                <div class="invoice-line-item">
                    <div class="line-item-number">${index + 1}</div>
                    <div class="line-item-description">${item.name || 'Part'} (x${item.quantity || 1})</div>
                    <div class="line-item-quantity">${item.quantity || 1}</div>
                    <div class="line-item-price">
                        <span class="modified-price">${formatCurrency(unitPrice)}/ea</span>
                    </div>
                    <div class="line-item-total">${formatCurrency(total)}</div>
                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('part', ${index})">✏️</button>
                    </div>
                </div>
            `;
        });
    } else {
        partsHTML += '<p style="color: var(--text-light); padding: 0.5rem;">No parts</p>';
    }
    partsHTML += '</div>';
    document.getElementById('invoice-parts-list').innerHTML = partsHTML;
    
    // Render Custom Items
    let customHTML = '';
    if (invoice.customItems && invoice.customItems.length > 0) {
        customHTML = '<div class="invoice-items-section"><h4>➕ Custom Items</h4>';
        invoice.customItems.forEach((item, index) => {
            const total = item.total || (item.unitPrice * item.quantity) || 0;
            customHTML += `
                <div class="invoice-line-item custom-item">
                    <div class="line-item-number">${index + 1}</div>
                    <div class="line-item-description">${item.name || 'Custom Item'}</div>
                    <div class="line-item-quantity">${item.quantity || 1}</div>
                    <div class="line-item-price">
                        <span class="modified-price">${formatCurrency(item.unitPrice || 0)}</span>
                    </div>
                    <div class="line-item-total">${formatCurrency(total)}</div>
                    <div class="line-item-actions">
                        <button type="button" class="btn btn-sm btn-secondary" onclick="editInvoiceLineItem('custom', ${index})">✏️</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="removeInvoiceLineItem('custom', ${index})">✕</button>
                    </div>
                </div>
            `;
        });
        customHTML += '</div>';
    }
    document.getElementById('invoice-custom-items-list').innerHTML = customHTML;
}

// Edit a line item in the invoice
function editInvoiceLineItem(type, index) {
    const item = type === 'service' ? invoiceLineItems.services[index] :
                 type === 'part' ? invoiceLineItems.parts[index] :
                 invoiceLineItems.custom[index];
    
    if (!item) return;
    
    const currentPrice = type === 'service' ? (item.price || item.total || 0) :
                         type === 'part' ? (item.unitPrice || item.price || 0) :
                         (item.unitPrice || 0);
    
    const newPrice = prompt(`Enter new price for ${item.name || type}:`, currentPrice);
    
    if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
        const price = parseFloat(newPrice);
        if (type === 'service') {
            item.price = price;
            item.total = price;
        } else if (type === 'part') {
            item.unitPrice = price;
            item.price = price;
            item.total = price * (item.quantity || 1);
        } else if (type === 'custom') {
            item.unitPrice = price;
            item.total = price * (item.quantity || 1);
        }
        
        // Re-render from invoiceLineItems
        const invoice = invoices.find(i => i.id === editingInvoiceId);
        if (invoice) {
            invoice.services = invoiceLineItems.services;
            invoice.parts = invoiceLineItems.parts;
            invoice.customItems = invoiceLineItems.custom;
            renderInvoiceItemsFromInvoice(invoice);
            recalculateInvoiceTotal();
        }
    }
}

// Remove a line item from the invoice
function removeInvoiceLineItem(type, index) {
    if (!confirm('Remove this item?')) return;
    
    if (type === 'custom') {
        invoiceLineItems.custom.splice(index, 1);
    }
    
    // Re-render
    const invoice = invoices.find(i => i.id === editingInvoiceId);
    if (invoice) {
        invoice.customItems = invoiceLineItems.custom;
        renderInvoiceItemsFromInvoice(invoice);
        recalculateInvoiceTotal();
    }
}

function editInvoice(id) {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) {
        showNotification('Invoice not found', 'error');
        return;
    }
    
    // Store the current editing invoice
    editingInvoiceId = id;
    
    // Open the create invoice modal (reusing for edit)
    openModal('create-invoice-modal');
    
    // Update modal title
    document.querySelector('#create-invoice-modal .modal-header h2').textContent = 'Edit Invoice';
    
    // Populate work order dropdown
    const workOrderSelect = document.getElementById('invoice-work-order');
    workOrderSelect.innerHTML = '<option value="">Select Work Order</option>';
    
    workOrders.forEach(wo => {
        const customer = customers.find(c => c.id === wo.customerId);
        const vehicle = vehicles.find(v => v.id === wo.vehicleId);
        const option = document.createElement('option');
        option.value = wo.id;
        option.textContent = `WO-${wo.id.substring(0, 8).toUpperCase()} - ${customer ? customer.firstName + ' ' + customer.lastName : 'Unknown'} - ${vehicle ? vehicle.registrationNumber : 'N/A'}`;
        workOrderSelect.appendChild(option);
    });
    
    // Set the work order
    workOrderSelect.value = invoice.workOrderId || '';
    
    // Set customer and vehicle
    const customer = customers.find(c => c.id === invoice.customerId);
    const vehicle = vehicles.find(v => v.id === invoice.vehicleId);
    
    document.getElementById('invoice-customer').value = customer ? `${customer.firstName} ${customer.lastName}` : 'N/A';
    document.getElementById('invoice-vehicle').value = vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.registrationNumber})` : 'N/A';
    
    // Load invoice items
    invoiceLineItems = {
        services: invoice.services || [],
        parts: invoice.parts || [],
        custom: invoice.customItems || []
    };

    // Store original parts for stock adjustment on save
    invoice._originalParts = JSON.parse(JSON.stringify(invoice.parts || []));

    // Render items for editing (from invoice data, not work order)
    renderInvoiceItemsFromInvoice(invoice);
    
    // Set labor values
    if (document.getElementById('invoice-labor')) {
        document.getElementById('invoice-labor').value = invoice.laborHours || 0;
    }
    if (document.getElementById('invoice-labor-rate')) {
        document.getElementById('invoice-labor-rate').value = invoice.laborRate || 75;
    }
    if (document.getElementById('invoice-discount')) {
        document.getElementById('invoice-discount').value = invoice.discount !== undefined ? invoice.discount : 0;
    }
    if (document.getElementById('invoice-tax-rate')) {
        // Use invoice taxRate as-is (even if 0), only fall back to global if undefined
        document.getElementById('invoice-tax-rate').value = invoice.taxRate !== undefined ? invoice.taxRate : getTaxRate();
    }
    
    // Recalculate totals display
    recalculateInvoiceTotal();
    
    // Enable edit mode banner WITHOUT calling renderEditableInvoiceItems (which reads work order)
    invoiceEditMode = true;
    const banner = document.getElementById('invoice-edit-banner');
    if (banner) banner.style.display = 'flex';
    
    // Show the actions bar
    document.getElementById('invoice-actions-bar').style.display = 'flex';
    
    // Remove the createInvoice handler and add the edit handler
    const form = document.getElementById('create-invoice-form');
    detachCreateInvoiceHandler();
    form.onsubmit = function(e) {
        e.preventDefault();
        saveEditedInvoice();
    };

    // Change submit button text for edit mode
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Save Changes';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');
    }
}

function saveEditedInvoice() {
    if (!editingInvoiceId) return;
    
    const invoice = invoices.find(i => i.id === editingInvoiceId);
    if (!invoice) return;
    
    // Get labor values from form
    const laborHours = parseFloat(document.getElementById('invoice-labor')?.value) || invoice.laborHours || 0;
    const laborRate = parseFloat(document.getElementById('invoice-labor-rate')?.value) || invoice.laborRate || 75;
    const laborTotal = laborHours * laborRate;
    
    // Get discount from form
    const discount = parseFloat(document.getElementById('invoice-discount')?.value) || invoice.discount || 0;
    
    // Get tax rate from form or settings (use 0 if explicitly set to 0)
    const taxRateField = document.getElementById('invoice-tax-rate');
    const taxRate = taxRateField && taxRateField.value !== '' ? parseFloat(taxRateField.value) : (settings.taxRate !== undefined ? settings.taxRate : 15);
    
    // Update invoice items (make copies to avoid reference issues)
    invoice.services = JSON.parse(JSON.stringify(invoiceLineItems.services));
    invoice.parts = JSON.parse(JSON.stringify(invoiceLineItems.parts));
    invoice.customItems = JSON.parse(JSON.stringify(invoiceLineItems.custom));
    
    // Recalculate totals from items
    let servicesTotal = 0;
    invoice.services.forEach(item => {
        servicesTotal += parseFloat(item.price) || parseFloat(item.total) || 0;
    });
    
    let partsTotal = 0;
    invoice.parts.forEach(item => {
        partsTotal += parseFloat(item.total) || 0;
    });
    
    let customTotal = 0;
    invoice.customItems.forEach(item => {
        customTotal += parseFloat(item.total) || 0;
    });
    
    const subtotal = servicesTotal + partsTotal + customTotal + laborTotal;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxAmount = taxableAmount * (taxRate / 100);
    const total = taxableAmount + taxAmount;
    
    // Update invoice with all calculated values
    invoice.laborHours = laborHours;
    invoice.laborRate = laborRate;
    invoice.laborTotal = laborTotal;
    invoice.servicesTotal = servicesTotal;
    invoice.partsTotal = partsTotal;
    invoice.customTotal = customTotal;
    invoice.subtotal = subtotal;
    invoice.discount = discount;
    invoice.taxRate = taxRate;
    invoice.taxAmount = taxAmount;
    invoice.total = total;
    invoice.balanceDue = total - (invoice.amountPaid || 0);
    invoice.updatedAt = new Date().toISOString();

    // Adjust stock for parts - handle quantity changes
    // First, restore stock from old parts (reverse the original deduction)
    if (invoice._originalParts) {
        invoice._originalParts.forEach(oldPart => {
            const part = parts.find(p => p.id === oldPart.partId);
            if (part) {
                part.stockQuantity += oldPart.quantity;
            }
        });
    }

    // Then, deduct stock for new parts
    invoice.parts.forEach(newPart => {
        const part = parts.find(p => p.id === newPart.partId);
        if (part) {
            part.stockQuantity = Math.max(0, part.stockQuantity - newPart.quantity);
        }
    });

    // Clean up temporary tracking
    delete invoice._originalParts;

    // Save to localStorage
    saveBillingData();

    // Close modal and refresh list
    closeModal('create-invoice-modal');
    renderInvoicesList();
    renderPartsList(); // Refresh parts list to show updated stock
    updateDashboard();

    // Reset form and re-add the createInvoice handler
    const form = document.getElementById('create-invoice-form');
    form.onsubmit = null;
    attachCreateInvoiceHandler();
    document.querySelector('#create-invoice-modal .modal-header h2').textContent = 'Create Invoice';
    editingInvoiceId = null;

    showNotification('Invoice updated successfully! Stock adjusted for parts changes.', 'success');
}

function calculateSubtotal() {
    let subtotal = 0;
    
    // Services use 'price' field (not 'total')
    invoiceLineItems.services.forEach(item => {
        subtotal += parseFloat(item.price) || parseFloat(item.total) || 0;
    });
    
    // Parts use 'total' field
    invoiceLineItems.parts.forEach(item => {
        subtotal += parseFloat(item.total) || 0;
    });
    
    // Custom items use 'total' field
    invoiceLineItems.custom.forEach(item => {
        subtotal += parseFloat(item.total) || 0;
    });
    
    return subtotal;
}

function calculateLaborTotal() {
    let total = 0;
    
    invoiceLineItems.services.forEach(item => {
        if (item.type === 'labor' || item.name?.toLowerCase().includes('labor')) {
            total += item.total || 0;
        }
    });
    
    return total;
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
    
    const invoiceDetails = document.getElementById('invoice-details');
    const shopName = getShopName();
    const shopSettings = JSON.parse(localStorage.getItem('globalSettings')) || {};
    
    const printWindow = window.open('', '_blank');
    const printContent = invoiceDetails.innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - ${currentViewingInvoice.invoiceNumber}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
                .shop-info { text-align: center; margin-bottom: 30px; }
                .shop-info h2 { font-size: 24px; margin-bottom: 10px; }
                .shop-info p { font-size: 14px; margin-bottom: 5px; color: #666; }
                .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .invoice-header h1 { font-size: 28px; margin-bottom: 10px; }
                .invoice-header h2 { font-size: 22px; color: #666; }
                .invoice-header p { font-size: 16px; font-weight: bold; }
                .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .invoice-info-section { width: 48%; }
                .invoice-info-section h3 { font-size: 14px; color: #666; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .invoice-info-section p { font-size: 14px; margin-bottom: 5px; }
                h3 { font-size: 18px; margin-bottom: 15px; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                table.invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                table.invoice-table th, table.invoice-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                table.invoice-table th { background: #f5f5f5; font-weight: bold; }
                .invoice-totals { margin-top: 20px; float: right; width: 300px; }
                .invoice-totals-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
                .invoice-totals-row:last-child { border-bottom: none; font-size: 18px; font-weight: bold; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            <div class="shop-info">
                <h2>${shopName}</h2>
                ${shopSettings.shopAddress ? `<p>${shopSettings.shopAddress}</p>` : ''}
                ${shopSettings.shopPhone ? `<p>Tel: ${shopSettings.shopPhone}</p>` : ''}
                ${shopSettings.shopEmail ? `<p>Email: ${shopSettings.shopEmail}</p>` : ''}
            </div>
            ${printContent}
            <div style="clear: both; margin-top: 40px; text-align: center; font-size: 14px; color: #666;">
                <p>Thank you for your business!</p>
                ${shopSettings.shopWebsite ? `<p>Visit us at: ${shopSettings.shopWebsite}</p>` : ''}
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        showNotification('PDF generation started. Choose "Save as PDF" in the print dialog.', 'success');
    }, 250);
}


// Get shop name from settings
function getShopName() {
    try {
        const saved = localStorage.getItem('globalSettings');
        if (saved) {
            const s = JSON.parse(saved);
            return s.shopName || 'NxtLevel Auto';
        }
    } catch(e) {}
    return 'NxtLevel Auto';
}

// WhatsApp Integration
function sendInvoiceWhatsApp() {
    if (!currentViewingInvoice) return;
    
    const customer = customers.find(c => c.id === currentViewingInvoice.customerId);
    if (!customer || !customer.phone) {
        alert('Customer phone number not found');
        return;
    }
    
    const shopName = getShopName();
    
    // Format phone number for WhatsApp (SA format)
    let phoneNumber = customer.phone.replace(/\D/g, '');
    if (phoneNumber.startsWith('0') && phoneNumber.length === 10) {
        phoneNumber = '27' + phoneNumber.substring(1);
    }
    if (phoneNumber.startsWith('1') && phoneNumber.length === 11) {
        phoneNumber = phoneNumber.substring(1);
    }
    
    // Create message
    const message = `🔧 *${shopName} - Invoice*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n*Invoice:* ${currentViewingInvoice.invoiceNumber}\n*Date:* ${new Date(currentViewingInvoice.createdAt).toLocaleDateString()}\n*Status:* ${currentViewingInvoice.status}\n\n*Customer:* ${customer.firstName} ${customer.lastName}\n\n*Total Amount:* ${formatCurrency(currentViewingInvoice.total)}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nThank you for choosing ${shopName}!`;
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    showNotification('WhatsApp opened!', 'success');
}

// SMS Integration
function sendInvoiceSMS() {
    if (!currentViewingInvoice) return;
    
    const customer = customers.find(c => c.id === currentViewingInvoice.customerId);
    if (!customer || !customer.phone) {
        alert('Customer phone number not found');
        return;
    }
    
    const shopName = getShopName();
    const message = `${shopName}: Invoice ${currentViewingInvoice.invoiceNumber} - Total: ${formatCurrency(currentViewingInvoice.total)}. Status: ${currentViewingInvoice.status}. Thank you for your business!`;
    const phone = customer.phone.replace(/\s/g, '');
    
    // Try sms: protocol first (works on mobile/some desktop apps)
    const smsURL = `sms:${phone}?body=${encodeURIComponent(message)}`;
    
    // Show SMS modal with copy option as fallback for desktop
    showSMSModal(phone, message, smsURL);
}

// SMS Modal — works on both desktop and mobile
function showSMSModal(phone, message, smsURL) {
    // Remove existing modal if any
    const existing = document.getElementById('sms-send-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'sms-send-modal';
    modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.5);
        z-index: 9999; display: flex; align-items: center; justify-content: center;
    `;
    modal.innerHTML = `
        <div style="background:white; border-radius:12px; padding:2rem; max-width:520px; width:90%; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
                <h3 style="margin:0; color:#1a1a2e;">💬 Send SMS</h3>
                <button onclick="document.getElementById('sms-send-modal').remove()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:#666;">&times;</button>
            </div>
            <p style="margin:0 0 0.5rem 0; color:#555; font-size:0.9rem;"><strong>To:</strong> ${phone}</p>
            <textarea id="sms-message-preview" readonly style="width:100%;height:120px;padding:0.75rem;border:1px solid #ddd;border-radius:8px;font-size:0.88rem;resize:none;background:#f9f9f9;box-sizing:border-box;">${message}</textarea>
            <div style="display:flex; gap:0.75rem; margin-top:1rem; flex-wrap:wrap;">
                <a href="${smsURL}" style="flex:1; min-width:140px; text-align:center; background:var(--primary-color,#e63946); color:white; padding:0.7rem 1rem; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.9rem;">
                    📱 Open SMS App
                </a>
                <button onclick="copySMSMessage()" style="flex:1; min-width:140px; background:#f0f0f0; border:1px solid #ddd; border-radius:8px; padding:0.7rem 1rem; cursor:pointer; font-weight:600; font-size:0.9rem;">
                    📋 Copy Message
                </button>
            </div>
            <p style="margin:0.75rem 0 0 0; font-size:0.78rem; color:#999; text-align:center;">
                "Open SMS App" works on mobile devices. On desktop, copy the message and send manually.
            </p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
}

function copySMSMessage() {
    const textarea = document.getElementById('sms-message-preview');
    if (!textarea) return;
    navigator.clipboard.writeText(textarea.value).then(() => {
        showNotification('SMS message copied to clipboard!', 'success');
    }).catch(() => {
        textarea.select();
        document.execCommand('copy');
        showNotification('SMS message copied!', 'success');
    });
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

// Store reference to the createInvoice handler so we can remove it during edit
let createInvoiceHandler = null;
let invoiceFormListenerAttached = false;

function attachCreateInvoiceHandler() {
    const form = document.getElementById('create-invoice-form');
    if (!invoiceFormListenerAttached && createInvoiceHandler) {
        form.addEventListener('submit', createInvoiceHandler);
        invoiceFormListenerAttached = true;
    }
}

function detachCreateInvoiceHandler() {
    const form = document.getElementById('create-invoice-form');
    if (invoiceFormListenerAttached && createInvoiceHandler) {
        form.removeEventListener('submit', createInvoiceHandler);
        invoiceFormListenerAttached = false;
    }
}

function initializeInvoices() {
    createInvoiceHandler = createInvoice;
    attachCreateInvoiceHandler();
    
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
                <th>Serial Number</th>
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
                const pImgs = part.images && part.images.length ? part.images : (part.image ? [part.image] : []);
                const imageHTML = pImgs.length
                    ? `<div style=&quot;position:relative;display:inline-block\&quot;>` +
                       `<img src=&quot;${pImgs[0]}\&quot; class=&quot;vehicle-thumbnail\&quot; onclick=&quot;showPartImages('${part.id}')\&quot; alt=&quot;Part Image\&quot;>` +
                       (pImgs.length > 1 ? `<span style=&quot;position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;font-size:0.65rem;padding:1px 4px;border-radius:3px;\&quot;>${pImgs.length}📷</span>` : '') +
                       `</div>`
                    : '<span style=&quot;color: var(--text-light); font-size: 0.8rem;\&quot;>No image</span>';
                return `
                <tr>
                    <td>${imageHTML}</td>
                    <td>${part.name}</td>
                    <td>${part.sku || 'N/A'}</td>
                    <td>${part.serialNumber || 'N/A'}</td>
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
    let servicesTotal = 0;
    let partsTotal = 0;
    let customTotal = 0;
    
    // If editing an existing invoice, calculate from invoiceLineItems directly
    if (editingInvoiceId) {
        // Calculate services total from invoiceLineItems
        invoiceLineItems.services.forEach(item => {
            servicesTotal += parseFloat(item.price) || parseFloat(item.total) || 0;
        });
        
        // Calculate parts total from invoiceLineItems
        invoiceLineItems.parts.forEach(item => {
            partsTotal += parseFloat(item.total) || 0;
        });
        
        // Calculate custom items total
        customTotal = invoiceLineItems.custom.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    } else {
        // Creating new invoice - calculate from work order
        const workOrderId = document.getElementById('invoice-work-order').value;
        const workOrder = workOrders.find(w => w.id === workOrderId);
        
        if (!workOrder) return;
        
        // Calculate services total
        workOrder.services.forEach(serviceId => {
            const service = services.find(s => s.id === serviceId);
            const modifiedItem = invoiceLineItems.services.find(s => s.id === serviceId);
            servicesTotal += modifiedItem ? modifiedItem.price : (service ? service.price : 0);
        });
        
        // Calculate parts total
        if (workOrder.parts) {
            workOrder.parts.forEach(partItem => {
                const part = parts.find(p => p.id === partItem.partId);
                const modifiedItem = invoiceLineItems.parts.find(p => p.id === partItem.partId);
                const price = modifiedItem ? modifiedItem.price : (part ? part.sellingPrice : 0);
                partsTotal += price * partItem.quantity;
            });
        }
        
        // Calculate custom items total
        customTotal = invoiceLineItems.custom.reduce((sum, item) => sum + item.total, 0);
    }
    
    // Calculate labor
    const laborHours = parseFloat(document.getElementById('invoice-labor').value) || 0;
    const laborRate = parseFloat(document.getElementById('invoice-labor-rate').value) || 75;
    const laborTotal = laborHours * laborRate;
    
    // Calculate totals
    const subtotal = servicesTotal + partsTotal + customTotal;
    const discount = parseFloat(document.getElementById('invoice-discount').value) || 0;
    // Use 0 if explicitly set to 0 (don't use || fallback which treats 0 as falsy)
    const taxRateEl = document.getElementById('invoice-tax-rate');
    const taxRate = taxRateEl && taxRateEl.value !== '' ? parseFloat(taxRateEl.value) : 0;
    const grandSubtotal = servicesTotal + partsTotal + customTotal + laborTotal;
    const taxableAmount = Math.max(0, grandSubtotal - discount);
    const tax = taxableAmount * (taxRate / 100);
    const grandTotal = taxableAmount + tax;
    
    // Update display - subtotal includes all items + labor for accuracy
    document.getElementById('invoice-subtotal').textContent = formatCurrency(grandSubtotal);
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
    
    // Re-add the createInvoice handler if it was removed
    const form = document.getElementById('create-invoice-form');
    form.onsubmit = null;
    attachCreateInvoiceHandler();
    
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
    currentSupplierLogoData = null;
    resetSupplierLogoPreview();
    
    if (id) {
        console.log('Opening supplier modal for ID:', id);
        const supplier = suppliers.find(s => s.id === id);
        console.log('Found supplier:', supplier);
        if (supplier) {
            document.getElementById('supplier-id').value = supplier.id;
            document.getElementById('supplier-name').value = supplier.name;
            document.getElementById('supplier-contact').value = supplier.contact || '';
            document.getElementById('supplier-phone').value = supplier.phone || '';
            document.getElementById('supplier-email').value = supplier.email || '';
            document.getElementById('supplier-address').value = supplier.address || '';
            document.getElementById('supplier-website').value = supplier.website || '';
            document.getElementById('supplier-account-number').value = supplier.accountNumber || '';
            document.getElementById('supplier-vat-number').value = supplier.vatNumber || '';
            document.getElementById('supplier-payment-terms').value = supplier.paymentTerms || 'net30';
            document.getElementById('supplier-status').value = supplier.status || 'active';
            document.getElementById('supplier-notes').value = supplier.notes || '';
            
            // Load logo preview
            if (supplier.logo) {
                currentSupplierLogoData = supplier.logo;
                setSupplierLogoPreview(supplier.logo);
            }
        }
    }
    
    openModal('supplier-modal');
}

// Supplier logo helpers
function previewSupplierLogo(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) { alert('Logo must be under 5MB'); input.value = ''; return; }
    if (!file.type.match('image.*')) { alert('Please select an image file'); input.value = ''; return; }
    const reader = new FileReader();
    reader.onload = function(e) {
        currentSupplierLogoData = e.target.result;
        setSupplierLogoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function setSupplierLogoPreview(src) {
    const preview = document.getElementById('supplier-logo-preview');
    if (preview) {
        preview.innerHTML = `<img src="${src}" alt="Supplier Logo" style="max-height:80px;max-width:200px;object-fit:contain;border-radius:8px;">
        <p style="margin:0.3rem 0 0 0;font-size:0.78rem;color:#888;">Click to change</p>`;
    }
}

function resetSupplierLogoPreview() {
    const preview = document.getElementById('supplier-logo-preview');
    if (preview) {
        preview.innerHTML = `<span style="font-size:2.5rem;">🏭</span><p style="margin:0.4rem 0 0 0;font-size:0.82rem;color:#888;">Click to upload logo or photo</p>`;
    }
    const input = document.getElementById('supplier-logo-input');
    if (input) input.value = '';
}

function clearSupplierLogo() {
    currentSupplierLogoData = null;
    resetSupplierLogoPreview();
}

function previewSupplierWebsite() {
    const url = document.getElementById('supplier-website').value.trim();
    if (!url) { alert('Please enter a website URL first.'); return; }
    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    window.open(fullUrl, '_blank');
}

// Save Supplier
function saveSupplier(e) {
    e.preventDefault();
    
    const phone = getValidatedPhone('supplier-phone', true);
    if (phone === null) return;
    
    const id = document.getElementById('supplier-id').value || generateId();
    const existingIndex = suppliers.findIndex(s => s.id === id);
    
    const websiteRaw = document.getElementById('supplier-website').value.trim();
    const website = websiteRaw && !websiteRaw.startsWith('http') ? 'https://' + websiteRaw : websiteRaw;
    const existingSupplier = existingIndex >= 0 ? suppliers[existingIndex] : null;

    const supplier = {
        id: id,
        name: document.getElementById('supplier-name').value,
        contact: document.getElementById('supplier-contact').value,
        phone: phone,
        email: document.getElementById('supplier-email').value,
        address: document.getElementById('supplier-address').value,
        website: website,
        accountNumber: document.getElementById('supplier-account-number').value,
        vatNumber: document.getElementById('supplier-vat-number').value,
        paymentTerms: document.getElementById('supplier-payment-terms').value,
        status: document.getElementById('supplier-status').value,
        notes: document.getElementById('supplier-notes').value,
        logo: currentSupplierLogoData || (existingSupplier ? existingSupplier.logo : null),
        createdAt: existingSupplier ? existingSupplier.createdAt : new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
        suppliers[existingIndex] = supplier;
    } else {
        suppliers.push(supplier);
    }
    
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    currentSupplierLogoData = null;
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
    
    container.innerHTML = suppliers.map(supplier => {
        const logoHtml = supplier.logo
            ? `<img src="${supplier.logo}" class="supplier-logo-thumb" alt="${supplier.name} logo">`
            : `<div class="supplier-logo-placeholder">🏭</div>`;
        
        const websiteHtml = supplier.website
            ? `<p>🌐 <a href="${supplier.website}" target="_blank" style="color:var(--primary-color);text-decoration:none;font-weight:500;" onclick="event.stopPropagation()">${supplier.website.replace(/^https?:\/\//, '')}</a></p>`
            : '';

        return `
        <div class="supplier-item">
            ${logoHtml}
            <div class="supplier-info">
                <h4>${supplier.name} <span class="supplier-status ${supplier.status}">${supplier.status}</span></h4>
                <p>📞 ${supplier.phone} ${supplier.email ? `| ✉️ ${supplier.email}` : ''}</p>
                <p>👤 ${supplier.contact || 'No contact person'}</p>
                ${supplier.accountNumber ? `<p>🔖 Account: ${supplier.accountNumber}</p>` : ''}
                ${websiteHtml}
            </div>
            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="openSupplierModal('${supplier.id}')" type="button">✏️ Edit</button>
                <button class="btn btn-danger" onclick="deleteSupplier('${supplier.id}')" type="button">🗑️ Delete</button>
            </div>
        </div>`;
    }).join('');
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

// Track which VAT field is being actively edited to prevent infinite loops
let _partVatEditingField = null;

// Get VAT rate from global settings (fallback to 15%)
function getPartVatRate() {
    const s = JSON.parse(localStorage.getItem('globalSettings') || '{}');
    return parseFloat(s.taxRate) || 15;
}

// Calculate Part Pricing (triggered by Ex VAT change)
function calculatePartPricing() {
    if (_partVatEditingField === 'inc') return; // prevent loop
    _partVatEditingField = 'ex';

    const costExVat = parseFloat(document.getElementById('part-cost-ex-vat').value) || 0;
    const mode = document.getElementById('part-price-mode').value;
    const vatRate = getPartVatRate();

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
    _partVatEditingField = null;
}

// Calculate Part Pricing from Inc VAT (triggered by Inc VAT change)
function calculatePartPricingFromIncVat() {
    if (_partVatEditingField === 'ex') return; // prevent loop
    _partVatEditingField = 'inc';

    const costIncVat = parseFloat(document.getElementById('part-cost-inc-vat').value) || 0;
    const vatRate = getPartVatRate();

    // Reverse-calculate ex VAT: exVat = incVat / (1 + vatRate/100)
    const costExVat = costIncVat / (1 + vatRate / 100);
    document.getElementById('part-cost-ex-vat').value = costExVat.toFixed(2);

    // Calculate selling price based on mode
    const mode = document.getElementById('part-price-mode').value;
    if (mode === 'percentage') {
        const markupPercent = parseFloat(document.getElementById('part-markup-percent').value) || 0;
        const sellingPrice = costExVat * (1 + markupPercent / 100);
        document.getElementById('part-price').value = sellingPrice.toFixed(2);
    }

    // Calculate and display profit
    calculatePartProfit();
    _partVatEditingField = null;
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

// Book In Images Storage
let currentBookInImages = [];

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
    
    // Reset images
    currentBookInImages = [];
    renderBookInImageGallery();
    
    // Update modal title for new record
    const modalTitle = document.querySelector('#book-in-modal .modal-header h2');
    if (modalTitle) modalTitle.textContent = '📦 Book In Parts from Supplier';
    
    populateSupplierDropdowns();
    addBookInPartRow();
    
    openModal('book-in-modal');
}

// Add Book In Images
function addBookInImages(input) {
    const MAX_IMAGES = 5;
    const files = Array.from(input.files);
    if (!files.length) return;

    const remaining = MAX_IMAGES - currentBookInImages.length;
    if (remaining <= 0) {
        showNotification(`Maximum ${MAX_IMAGES} images allowed.`, 'error');
        input.value = '';
        return;
    }

    const toLoad = files.slice(0, remaining);
    if (files.length > remaining) {
        showNotification(`Only ${remaining} more image(s) can be added.`, 'error');
    }

    let loaded = 0;
    toLoad.forEach(file => {
        if (!file.type.match('image.*')) return;
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Each image must be under 5MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            currentBookInImages.push(e.target.result);
            loaded++;
            if (loaded === toLoad.length) renderBookInImageGallery();
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}

// Render Book In Image Gallery
function renderBookInImageGallery() {
    const gallery = document.getElementById('book-in-image-gallery');
    if (!gallery) return;

    const MAX_IMAGES = 5;
    let html = '';

    currentBookInImages.forEach((src, idx) => {
        html += `
            <div class="image-gallery-item">
                <img src="${src}" alt="Invoice image ${idx+1}" onclick="openImageLightbox(currentBookInImages, ${idx})">
                <button class="img-remove-btn" onclick="removeBookInImage(${idx})" title="Remove">✕</button>
            </div>`;
    });

    if (currentBookInImages.length < MAX_IMAGES) {
        html += `
            <div class="image-gallery-add" onclick="document.getElementById('book-in-images').click()" title="Add images">
                <span>📷</span><span>Add Images</span>
            </div>`;
    }

    gallery.innerHTML = html;
}

// Remove Book In Image
function removeBookInImage(idx) {
    if (confirm('Are you sure you want to remove this image?')) {
        currentBookInImages.splice(idx, 1);
        renderBookInImageGallery();
    }
}

// Add Book In Part Row (optionally pre-fill with existing part data)
function addBookInPartRow(partData = null) {
    const container = document.getElementById('book-in-parts-container');
    const rowId = generateId();
    
    // Get global tax rate from settings
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings')) || {};
    const taxRate = globalSettings.taxRate || 15;
    
    const name = partData ? partData.name : '';
    const qty = partData ? partData.quantity : 1;
    const cost = partData ? partData.costExVat : '';
    const costIncVat = partData && partData.costIncVat ? partData.costIncVat : '';
    const lineTotal = partData ? formatCurrency(partData.quantity * partData.costExVat) : 'R0.00';
    const taxAmount = cost ? (parseFloat(cost) * (taxRate / 100)).toFixed(2) : '0.00';
    
    const row = document.createElement('div');
    row.className = 'book-in-part-row';
    row.id = `book-in-row-${rowId}`;
    row.innerHTML = `
        <input type="text" placeholder="Part Name *" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="name" value="${name}" style="flex:2;">
        <input type="number" placeholder="Qty *" min="1" value="${qty}" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="quantity" style="flex:0.5;">
        <input type="number" placeholder="Cost Ex VAT" min="0" step="0.01" value="${cost}" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="cost" style="flex:0.8;">
        <input type="number" placeholder="Cost Inc VAT" min="0" step="0.01" value="${costIncVat}" onchange="updateBookInTotal()" oninput="updateBookInTotal()" data-field="costIncVat" style="flex:0.8;">
        <span class="book-in-part-tax" data-tax-rate="${taxRate}" style="flex:0.5;text-align:center;color:var(--text-light);font-size:0.85rem;">${taxAmount}</span>
        <span class="book-in-part-total" style="flex:0.6;">${lineTotal}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeBookInPartRow('${rowId}')" style="flex:0.3;">✕</button>
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
    
    // Get global tax rate from settings
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings')) || {};
    const taxRate = globalSettings.taxRate || 15;
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('[data-field="quantity"]').value) || 0;
        const cost = parseFloat(row.querySelector('[data-field="cost"]').value) || 0;
        const costIncVat = parseFloat(row.querySelector('[data-field="costIncVat"]').value) || 0;
        
        // Calculate tax amount based on ex VAT cost
        const taxAmount = cost * (taxRate / 100);
        const taxSpan = row.querySelector('.book-in-part-tax');
        if (taxSpan) {
            taxSpan.textContent = taxAmount.toFixed(2);
            taxSpan.dataset.taxRate = taxRate;
        }
        
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
        const costIncVat = parseFloat(row.querySelector('[data-field="costIncVat"]').value) || 0;
        const taxRate = parseFloat(row.querySelector('.book-in-part-tax')?.dataset.taxRate) || 15;
        const taxAmount = cost * (taxRate / 100);
        
        if (name && quantity > 0) {
            bookedParts.push({
                id: generateId(),
                name: name,
                quantity: quantity,
                costExVat: cost,
                costIncVat: costIncVat,
                taxAmount: taxAmount,
                taxRate: taxRate,
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
        images: currentBookInImages.length ? [...currentBookInImages] : [],
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
    
    // Load existing images
    currentBookInImages = record.images && record.images.length ? [...record.images] : [];
    renderBookInImageGallery();
    
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
    // Update sub-tab buttons using data-tab attribute
    document.querySelectorAll('#parts .sub-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    
    // Update tab content panels
    document.querySelectorAll('#parts .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
    
    // Refresh specific tab content
    if (tabId === 'parts-list-tab') {
        renderPartsList();
    } else if (tabId === 'stock-levels-tab') {
        renderStockLevelsList();
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
let techImages = []; // Temporary storage for images during upload

const TECH_TYPE_CONFIG = {
    article:  { icon: '📄', label: 'Article',  listId: 'tech-articles-list',  countId: 'total-articles-count',  searchId: 'tech-articles-search'  },
    bulletin: { icon: '📋', label: 'Bulletin', listId: 'tech-bulletins-list', countId: 'total-bulletins-count', searchId: 'tech-bulletins-search' },
    tip:      { icon: '💡', label: 'Tip',      listId: 'tech-tips-list',      countId: 'total-tips-count',      searchId: 'tech-tips-search'      }
};

// Handle tech image upload
function handleTechImageUpload(event) {
    const files = Array.from(event.target.files);
    const maxImages = 5;
    
    if (techImages.length + files.length > maxImages) {
        showNotification(`Maximum ${maxImages} images allowed`, 'error');
        return;
    }
    
    files.forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('Please select image files only', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            techImages.push({
                data: e.target.result,
                name: file.name
            });
            renderTechImagePreviews();
        };
        reader.readAsDataURL(file);
    });
    
    // Clear the input so the same file can be selected again
    event.target.value = '';
}

function renderTechImagePreviews() {
    const container = document.getElementById('tech-images-preview');
    if (!container) return;
    
    container.innerHTML = techImages.map((img, index) => `
        <div class="tech-image-preview-item">
            <img src="${img.data}" alt="${img.name}">
            <button type="button" class="remove-image" onclick="removeTechImage(${index})">&times;</button>
        </div>
    `).join('');
}

function removeTechImage(index) {
    if (!confirm('Are you sure you want to remove this image?')) return;
    techImages.splice(index, 1);
    renderTechImagePreviews();
}

function openImageLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.onclick = () => lightbox.remove();
    lightbox.innerHTML = `<img src="${src}" alt="Image">`;
    document.body.appendChild(lightbox);
}

function openTechModal(type, id = null) {
    const cfg = TECH_TYPE_CONFIG[type];
    const titleEl = document.getElementById('tech-modal-title');
    const saveBtn = document.getElementById('tech-save-btn');

    document.getElementById('tech-form').reset();
    document.getElementById('tech-item-id').value = '';
    document.getElementById('tech-item-type').value = type;
    
    // Reset images
    techImages = [];
    renderTechImagePreviews();

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
        
        // Load existing images
        if (item.images && item.images.length > 0) {
            techImages = [...item.images];
            renderTechImagePreviews();
        }
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
        images: techImages,
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
        
        // Images HTML
        const imagesHtml = item.images && item.images.length > 0
            ? `<div class="tech-card-images">${item.images.map(img => `
                <div class="tech-card-image" onclick="openImageLightbox('${img.data}')">
                    <img src="${img.data}" alt="${img.name || 'Image'}">
                </div>
            `).join('')}</div>`
            : '';

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
            ${imagesHtml}
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
    // Update sub-tab buttons using data-tab attribute
    document.querySelectorAll('#technical .sub-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    // Update tab content panels
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

// Part image hover tooltip functions
let partImageHover = null;

function showPartImageHover(e) {
    const row = e.currentTarget;
    const images = JSON.parse(row.dataset.images || '[]');
    
    if (!images || images.length === 0) return;
    
    // Create hover tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'part-image-hover-tooltip';
    tooltip.innerHTML = `
        <div class="hover-tooltip-header">
            <strong>Part Images</strong>
            <span class="hover-tooltip-close">&times;</span>
        </div>
        <div class="hover-tooltip-images">
            ${images.map(img => `<img src="${img}" alt="Part Image">`).join('')}
        </div>
    `;
    
    // Position tooltip
    const rect = row.getBoundingClientRect();
    tooltip.style.left = rect.right + 10 + 'px';
    tooltip.style.top = rect.top + 'px';
    
    document.body.appendChild(tooltip);
    partImageHover = tooltip;
    
    // Close button handler
    tooltip.querySelector('.hover-tooltip-close').addEventListener('click', hidePartImageHover);
    
    // Prevent tooltip from going off screen
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = (rect.left - tooltipRect.width - 10) + 'px';
    }
}

function hidePartImageHover() {
    if (partImageHover) {
        partImageHover.remove();
        partImageHover = null;
    }
}

// Invoice Notes Functions
function openInvoiceNotesModal(id) {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
    
    document.getElementById('invoice-notes-id').value = id;
    document.getElementById('invoice-notes-text').value = invoice.notes || '';
    
    openModal('invoice-notes-modal');
}

// Handle invoice notes form submission
document.addEventListener('DOMContentLoaded', function() {
    const notesForm = document.getElementById('invoice-notes-form');
    if (notesForm) {
        notesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('invoice-notes-id').value;
            const notes = document.getElementById('invoice-notes-text').value;
            
            const invoiceIndex = invoices.findIndex(i => i.id === id);
            if (invoiceIndex >= 0) {
                invoices[invoiceIndex].notes = notes;
                saveData();
                closeModal('invoice-notes-modal');
                showNotification('Invoice notes saved successfully!', 'success');
            }
        });
    }
});
