// Service Reminders
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// Initialize Reminders
function initializeReminders() {
    renderRemindersList();
}

function checkServiceReminders() {
    const reminderInterval = getServiceReminderKm();
    const container = document.getElementById('reminders-list');
    
    // Find vehicles due for service
    const vehiclesDueForService = vehicles.filter(vehicle => {
        if (!vehicle.mileage || !vehicle.lastServiceMileage) return false;
        
        const kmSinceLastService = vehicle.mileage - vehicle.lastServiceMileage;
        return kmSinceLastService >= reminderInterval;
    });
    
    if (vehiclesDueForService.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 2rem;">
                <h3>✅ No vehicles due for service</h3>
                <p>All vehicles are within their service interval of ${reminderInterval.toLocaleString()} km.</p>
            </div>
        `;
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Vehicle</th>
                <th>Current Mileage</th>
                <th>Last Service</th>
                <th>km Since Service</th>
                <th>Customer</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${vehiclesDueForService.map(vehicle => {
                const customer = customers.find(c => c.id === vehicle.customerId);
                const kmSinceLastService = vehicle.mileage - vehicle.lastServiceMileage;
                const overdueKm = kmSinceLastService - reminderInterval;
                
                return `
                <tr style="background-color: ${kmSinceLastService > reminderInterval + 1000 ? '#fff3f3' : ''}">
                    <td>${vehicle.year} ${vehicle.make} ${vehicle.model}</td>
                    <td>${vehicle.mileage.toLocaleString()} km</td>
                    <td>${vehicle.lastServiceMileage.toLocaleString()} km</td>
                    <td style="color: ${kmSinceLastService > reminderInterval ? 'red' : 'orange'}; font-weight: bold;">
                        ${kmSinceLastService.toLocaleString()} km
                        ${kmSinceLastService > reminderInterval ? `<br><small>(Overdue by ${overdueKm.toLocaleString()} km)</small>` : ''}
                    </td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-success" onclick="sendServiceReminder('${vehicle.id}', 'email')">📧 Email</button>
                            <button class="btn btn-warning" onclick="sendServiceReminder('${vehicle.id}', 'sms')">💬 SMS</button>
                            <button class="btn btn-whatsapp" onclick="sendServiceReminder('${vehicle.id}', 'whatsapp')">📱 WhatsApp</button>
                        </div>
                    </td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
    
    showNotification(`Found ${vehiclesDueForService.length} vehicle(s) due for service!`, 'info');
}

function sendServiceReminder(vehicleId, method) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const customer = customers.find(c => c.id === vehicle.customerId);
    if (!customer) {
        alert('Customer information not found');
        return;
    }
    
    const reminderInterval = getServiceReminderKm();
    const kmSinceLastService = vehicle.mileage - vehicle.lastServiceMileage;
    const shopName = globalSettings.shopName || 'Auto Fix Pro';
    
    let message = '';
    
    if (method === 'email') {
        message = `Subject: Service Reminder - ${vehicle.year} ${vehicle.make} ${vehicle.model}

Dear ${customer.firstName} ${customer.lastName},

This is a friendly reminder that your ${vehicle.year} ${vehicle.make} ${vehicle.model} is due for service.

Vehicle Details:
- License Plate: ${vehicle.plate}
- Current Mileage: ${vehicle.mileage.toLocaleString()} km
- Last Service Mileage: ${vehicle.lastServiceMileage.toLocaleString()} km
- Kilometers Since Last Service: ${kmSinceLastService.toLocaleString()} km
- Service Interval: ${reminderInterval.toLocaleString()} km

${kmSinceLastService > reminderInterval ? 
`⚠️ Your vehicle is ${kmSinceLastService - reminderInterval.toLocaleString()} km overdue for service!` :
'Your vehicle is approaching the service interval.'}

Please contact us to schedule your service appointment.

${shopName}
${globalSettings.shopPhone || ''}
${globalSettings.shopEmail || ''}

Thank you for choosing us!`;
        
        // Open email client
        const emailURL = `mailto:${customer.email}?subject=Service Reminder - ${vehicle.year} ${vehicle.make} ${vehicle.model}&body=${encodeURIComponent(message)}`;
        window.open(emailURL, '_blank');
        
        // Save reminder record
        saveReminderRecord(vehicleId, method, 'email');
        
    } else if (method === 'sms') {
        message = `Service Reminder: Your ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.plate}) is due for service. Current: ${vehicle.mileage.toLocaleString()}km, Last Service: ${vehicle.lastServiceMileage.toLocaleString()}km. Please contact ${globalSettings.shopPhone || 'us'} to book. ${shopName}`;
        
        // Open SMS composer
        const smsURL = `sms:${customer.phone}?body=${encodeURIComponent(message)}`;
        window.open(smsURL, '_blank');
        
        // Save reminder record
        saveReminderRecord(vehicleId, method, 'sms');
        
    } else if (method === 'whatsapp') {
        message = `🔧 *Service Reminder*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear ${customer.firstName},

Your vehicle is due for service:

🚗 ${vehicle.year} ${vehicle.make} ${vehicle.model}
📝 Plate: ${vehicle.plate}
📊 Current Mileage: ${vehicle.mileage.toLocaleString()} km
🔧 Last Service: ${vehicle.lastServiceMileage.toLocaleString()} km
📈 km Since Last Service: ${kmSinceLastService.toLocaleString()} km

${kmSinceLastService > reminderInterval ? 
`⚠️ OVERDUE by ${(kmSinceLastService - reminderInterval).toLocaleString()} km!` :
`📋 Service Interval: ${reminderInterval.toLocaleString()} km`}

Please contact us to schedule your appointment.

📞 ${globalSettings.shopPhone || 'Call us'}
📧 ${globalSettings.shopEmail || 'Email us'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${shopName}`;
        
        // Format phone number for WhatsApp
        let phoneNumber = customer.phone.replace(/\D/g, '');
        if (phoneNumber.startsWith('0') && phoneNumber.length === 10) {
            phoneNumber = '27' + phoneNumber.substring(1);
        }
        if (phoneNumber.startsWith('1') && phoneNumber.length === 11) {
            phoneNumber = phoneNumber.substring(1);
        }
        
        // Open WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        
        // Save reminder record
        saveReminderRecord(vehicleId, method, 'whatsapp');
    }
    
    showNotification(`Reminder sent via ${method}!`, 'success');
}

function saveReminderRecord(vehicleId, method, platform) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    const customer = customers.find(c => c.id === vehicle.customerId);
    
    const reminder = {
        id: generateId(),
        vehicleId: vehicleId,
        customerId: customer ? customer.id : null,
        vehicleName: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown',
        customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown',
        method: method,
        platform: platform,
        vehicleMileage: vehicle ? vehicle.mileage : 0,
        lastServiceMileage: vehicle ? vehicle.lastServiceMileage : 0,
        sentAt: new Date().toISOString()
    };
    
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function renderRemindersList() {
    const container = document.getElementById('reminders-list');
    
    if (reminders.length === 0) {
        container.innerHTML = '<p class="empty-state">No reminders sent yet. Click "Check for Due Services" to find vehicles that need service.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedReminders = [...reminders].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date Sent</th>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Mileage</th>
            </tr>
        </thead>
        <tbody>
            ${sortedReminders.slice(0, 20).map(reminder => `
                <tr>
                    <td>${formatDate(reminder.sentAt)}</td>
                    <td>${reminder.vehicleName}</td>
                    <td>${reminder.customerName}</td>
                    <td><span class="status-badge" style="background: #e7f3ff; color: #0066cc;">${reminder.method}</span></td>
                    <td>${reminder.vehicleMileage.toLocaleString()} km</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Recent Reminders (Last 20)</h3>
    `;
    container.appendChild(table);
}