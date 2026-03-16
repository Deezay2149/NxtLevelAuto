// Global Settings
let globalSettings = JSON.parse(localStorage.getItem('globalSettings')) || {
    taxRate: 15,
    currency: 'R',
    currencyName: 'South African Rand',
    laborRate: 75,
    serviceReminderKm: 15000,
    shopName: 'NxtLevel Auto',
    shopAddress: '123 Main Street, Johannesburg, South Africa',
    shopPhone: '+27 11 123 4567',
    shopEmail: 'info@nxtlevelauto.co.za'
};

// Apply shop name to all visible elements (header, page title)
function applyShopName() {
    const name = globalSettings.shopName || 'NxtLevel Auto';

    // Update header logo text
    const headerEl = document.getElementById('header-shop-name');
    if (headerEl) headerEl.textContent = name;

    // Update browser tab title
    document.title = name + ' - Mechanic Shop Management';
}

// Initialize Settings
function initializeSettings() {
    loadSettings();
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
}

function loadSettings() {
    document.getElementById('settings-tax-rate').value = globalSettings.taxRate;
    document.getElementById('settings-labor-rate').value = globalSettings.laborRate;
    document.getElementById('settings-service-reminder-km').value = globalSettings.serviceReminderKm;
    document.getElementById('settings-shop-name').value = globalSettings.shopName;
    document.getElementById('settings-shop-address').value = globalSettings.shopAddress;
    document.getElementById('settings-shop-phone').value = globalSettings.shopPhone;
    document.getElementById('settings-shop-email').value = globalSettings.shopEmail;

    // Apply shop name to UI on load
    applyShopName();
}

function saveSettings(e) {
    e.preventDefault();
    
    globalSettings = {
        taxRate: parseFloat(document.getElementById('settings-tax-rate').value),
        currency: 'R',
        currencyName: 'South African Rand',
        laborRate: parseFloat(document.getElementById('settings-labor-rate').value),
        serviceReminderKm: parseInt(document.getElementById('settings-service-reminder-km').value),
        shopName: document.getElementById('settings-shop-name').value,
        shopAddress: document.getElementById('settings-shop-address').value,
        shopPhone: document.getElementById('settings-shop-phone').value,
        shopEmail: document.getElementById('settings-shop-email').value
    };
    
    localStorage.setItem('globalSettings', JSON.stringify(globalSettings));

    // Apply updated shop name immediately to header + title
    applyShopName();

    showNotification('Settings saved successfully!', 'success');
}

function getTaxRate() {
    return globalSettings.taxRate || 15;
}

function getCurrency() {
    return globalSettings.currency || 'R';
}

function getLaborRate() {
    return globalSettings.laborRate || 75;
}

function formatCurrency(amount) {
    return `${getCurrency()}${parseFloat(amount || 0).toFixed(2)}`;
}

function getServiceReminderKm() {
    return globalSettings.serviceReminderKm || 15000;
}