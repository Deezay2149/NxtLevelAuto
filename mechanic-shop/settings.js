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
    shopEmail: 'info@autofixpro.co.za',
    weatherCity: '',
    weatherLat: null,
    weatherLon: null
};

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
    // Weather settings
    document.getElementById('settings-weather-city').value = globalSettings.weatherCity || '';
    document.getElementById('settings-weather-lat').value = globalSettings.weatherLat || '';
    document.getElementById('settings-weather-lon').value = globalSettings.weatherLon || '';
}

function saveSettings(e) {
    e.preventDefault();
    
    const weatherLat = document.getElementById('settings-weather-lat').value;
    const weatherLon = document.getElementById('settings-weather-lon').value;
    const weatherCity = document.getElementById('settings-weather-city').value.trim();
    
    globalSettings = {
        taxRate: parseFloat(document.getElementById('settings-tax-rate').value),
        currency: 'R',
        currencyName: 'South African Rand',
        laborRate: parseFloat(document.getElementById('settings-labor-rate').value),
        serviceReminderKm: parseInt(document.getElementById('settings-service-reminder-km').value),
        shopName: document.getElementById('settings-shop-name').value,
        shopAddress: document.getElementById('settings-shop-address').value,
        shopPhone: document.getElementById('settings-shop-phone').value,
        shopEmail: document.getElementById('settings-shop-email').value,
        weatherCity: weatherCity,
        weatherLat: weatherLat ? parseFloat(weatherLat) : null,
        weatherLon: weatherLon ? parseFloat(weatherLon) : null
    };
    
    localStorage.setItem('globalSettings', JSON.stringify(globalSettings));
    showNotification('Settings saved successfully!', 'success');
    closeModal('settings-modal');
    
    // Refresh weather widget with new settings
    if (typeof initWeatherWidget === 'function') {
        initWeatherWidget();
    }
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
    return `${getCurrency()}${amount.toFixed(2)}`;
}

function getServiceReminderKm() {
    return globalSettings.serviceReminderKm || 15000;
}