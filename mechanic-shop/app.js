// Car Brands and Models Data
const carBrandsAndModels = {
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Fortuner', 'Land Cruiser', 'Prius', 'Yaris', 'Auris', 'Avanza', 'Etios', 'Innova', 'Prado', 'Tacoma', 'Tundra', 'Highlander', 'Sequoia', '4Runner', 'Sienna', 'C-HR'],
    'Volkswagen': ['Golf', 'Polo', 'Jetta', 'Passat', 'Tiguan', 'Touareg', 'Amarok', 'Caddy', 'Touran', 'Sharan', 'Beetle', 'Up', 'T-Roc', 'T-Cross', 'Arteon', 'Teramont', 'Taos', 'Virtus', 'Nivus', 'Saveiro'],
    'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'M3', 'M5', 'i3', 'iX3', 'i4', 'i7'],
    'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'CLA', 'CLS', 'SLC', 'SL', 'AMG GT', 'EQC', 'EQS', 'EQA', 'EQB'],
    'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron', 'e-tron GT', 'RS3', 'RS4', 'RS6'],
    'Ford': ['Fiesta', 'Focus', 'Fusion', 'Mondeo', 'Mustang', 'F-150', 'Ranger', 'Edge', 'Escape', 'Explorer', 'Expedition', 'Kuga', 'Puma', 'Bronco', 'EcoSport', 'Territory', 'Transit', 'Tourneo', 'Ka+', 'Galaxy'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Fit', 'Jazz', 'City', 'Amaze', 'BR-V', 'WR-V', 'Pilot', 'Passport', 'Odyssey', 'Ridgeline', 'NSX', 'ZR-V', 'e', 'Breeze', 'Envix', 'Crider'],
    'Hyundai': ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Venue', 'Creta', 'Bayon', 'Staria', 'Ioniq', 'Ioniq 5', 'Ioniq 6', 'Nexo', 'Veloster', 'Accent', 'Aura'],
    'Kia': ['Picanto', 'Rio', 'Ceed', 'Cerato', 'Optima', 'K5', 'Stinger', 'Sportage', 'Sorento', 'Telluride', 'Seltos', 'Stonic', 'Niro', 'EV6', 'Soul', 'Carnival', 'Sedona', 'Mohave', 'K8', 'K900'],
    'Mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-7', 'CX-9', 'MX-5', 'MX-30', 'BT-50', 'CX-60', 'CX-90'],
    'Nissan': ['Micra', 'Note', 'Almera', 'Sentra', 'Altima', 'Maxima', 'Versa', 'Juke', 'Qashqai', 'X-Trail', 'Rogue', 'Murano', 'Pathfinder', 'Patrol', 'Navara', 'Frontier', 'Leaf', 'Ariya', 'GT-R', '370Z'],
    'Renault': ['Twingo', 'Clio', 'Captur', 'Megane', 'Kadjar', 'Koleos', 'Duster', 'Sandero', 'Logan', 'Dokker', 'Lodgy', 'Talisman', 'Scenic', 'Kangoo', 'Trafic', 'Master', 'Zoe', 'Twizy', 'Kiger', 'Triber'],
    'Peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'Partner', 'Expert', 'Boxer', 'Rifter', 'Traveller', 'e-208', 'e-2008', 'e-Traveller', 'i-Cockpit', 'e-308'],
    'Chevrolet': ['Spark', 'Sonic', 'Cruze', 'Malibu', 'Impala', 'Aveo', 'Onix', 'Camaro', 'Corvette', 'Trax', 'Trailblazer', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Colorado', 'Silverado', 'S10', 'Niva', 'Tracker'],
    'Isuzu': ['D-Max', 'mu-X', 'Elf', 'Forward', 'Giga', 'N-Series', 'F-Series', 'C-Series', 'E-Series', 'TF', 'Rodeo', 'Amigo', 'Trooper', 'Rodeo Sport', 'VehiCROSS', 'Hombre', 'i-280', 'i-290', 'i-350', 'i-370'],
    'Suzuki': ['Alto', 'Celerio', 'Swift', 'Baleno', 'Dzire', 'Ciaz', 'Ignis', 'S-Presso', 'Vitara', 'S-Cross', 'Jimny', 'Grand Vitara', 'XL7', 'Ertiga', 'Brezza', 'Fronx', 'Invicto'],
    'Mitsubishi': ['Mirage', 'Attrage', 'Lancer', 'ASX', 'Eclipse Cross', 'Outlander', 'Pajero', 'Montero', 'Triton', 'L200', 'Xpander', 'Xpander Cross', 'Pajero Sport', 'Delica', 'Express'],
    'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'BRZ', 'WRX', 'STI', 'Levorg', 'Solterra'],
    'Volvo': ['XC40', 'XC60', 'XC90', 'C40', 'EX30', 'EX90', 'S60', 'S90', 'V60', 'V90', 'V60 Cross Country', 'V90 Cross Country'],
    'Land Rover': ['Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Defender', 'Freelander'],
    'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator', 'Commander', 'Compass Trailhawk'],
    'Opel': ['Adam', 'Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Zafira', 'Combo', 'Movano', 'Vivaro'],
    'Fiat': ['500', 'Panda', 'Punto', 'Tipo', '500X', '500L', 'Doblò', 'Ducato', 'Fiorino', 'Qubo', 'Strada', 'Toro'],
    'Citroen': ['C1', 'C3', 'C4', 'C5', 'C3 Aircross', 'C5 Aircross', 'Berlingo', 'SpaceTourer', 'Jumper', 'Jumpy', 'Ami'],
    'Jaguar': ['XE', 'XF', 'XJ', 'F-Type', 'F-Pace', 'E-Pace', 'I-Pace'],
    'Porsche': ['911', '718 Boxster', '718 Cayman', 'Taycan', 'Panamera', 'Macan', 'Cayenne'],
    'Lexus': ['IS', 'ES', 'GS', 'LS', 'RC', 'LC', 'UX', 'NX', 'RX', 'GX', 'LX'],
    'Infiniti': ['Q50', 'Q60', 'Q70', 'Q30', 'QX30', 'QX50', 'QX55', 'QX60', 'QX80'],
    'Maserati': ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'MC20', 'GranTurismo', 'GranCabrio'],
    'Alfa Romeo': ['Giulietta', 'Giulia', 'Stelvio', 'Tonale', '4C', '4C Spider'],
    'Mini': ['Cooper', 'Cooper S', 'John Cooper Works', 'Clubman', 'Countryman', 'Paceman', 'Roadster', 'Convertible', 'Electric'],
    'Dacia': ['Sandero', 'Logan', 'Duster', 'Lodgy', 'Dokker', 'Spring', 'Jogger'],
    'Chery': ['Tiggo 2', 'Tiggo 3', 'Tiggo 4', 'Tiggo 5', 'Tiggo 7', 'Tiggo 8', 'Tiggo 8 Pro', 'Tiggo 8 Pro Max', 'Arrizo 5', 'Arrizo 6', 'Arrizo 8', 'Omoda 5'],
    'Geely': ['Coolray', 'Azkarra', 'Okavango', 'Emgrand', 'Emgrand EC7', 'Geometry C', 'Tugella', 'Monjaro', 'Panda Mini', 'Haoyue'],
    'Haval': ['H2', 'H4', 'H6', 'H6C', 'H9', 'Jolion', 'Dargo', 'Tank 300', 'Tank 500', 'GWM Ute'],
    'GWM': ['Steed', 'V240', 'V200', 'Cannon', 'Poer', 'P-Series', 'Tank', 'WEY'],
    'BYD': ['Dolphin', 'Atto 3', 'Seal', 'Tang', 'Han', 'Song Plus', 'Qin Plus', 'Yuan Plus', 'e1', 'e2', 'e3', 'e6', 'e9'],
    'Foton': ['Tunland', 'Sauvana', 'Gratour', 'Aumark', 'View', 'Thunder', 'Estes', 'Amarok'],
    'JAC': ['T6', 'T8', 'X200', 'X500', 'S2', 'S3', 'S4', 'Rein', 'e-J7', 'e-JS4'],
    'Mahindra': ['Bolero', 'Scorpio', 'XUV300', 'XUV500', 'XUV700', 'Thar', 'KUV100', 'TUV300', 'Marazzo', 'Alturas G4'],
    'Tata': ['Tiago', 'Tigor', 'Nexon', 'Harrier', 'Safari', 'Altroz', 'Punch', 'Hexa', 'Sumo', 'Safari Storme'],
    'DFSK': ['Glory 580', 'Glory i-Auto', 'Super Cab', 'EC35', 'ECV', 'Loadhopper'],
    'BAIC': ['Beijing X3', 'Beijing X55', 'Beijing X7', 'BJ40', 'BJ80', 'EU5', 'EU7'],
    'Proton': ['Saga', 'Persona', 'Iriz', 'Exora', 'X50', 'X70', 'X90', 'S70'],
    'Perodua': ['Axia', 'Bezza', 'Myvi', 'Alza', 'Aruz', 'Ativa'],
    'MG': ['3', 'ZS', 'ZS EV', 'HS', 'RX5', 'RX8', 'Marvel R', 'One', 'Cyberster', 'GTX', 'Hector', 'Gloster', 'Astor'],
    'SsangYong': ['Tivoli', 'XLV', 'Korando', 'Rexton', 'Rexton Sports', 'Musso', 'Torres', 'Korando e-Motion'],
    'Daihatsu': ['Mira', 'Charade', 'Cuore', 'Sirion', 'Terios', 'Xenia', 'Gran Max', 'Luxio', 'Ayla', 'Sigra'],
    'Ferrari': ['Roma', 'Portofino', 'SF90 Stradale', 'F8 Tributo', 'F8 Spider', '296 GTB', '296 GTS', '812 Superfast', '812 GTS', 'SF90 Spider'],
    'Lamborghini': ['Huracan', 'Aventador', 'Urus', 'Revuelto', 'Countach LPI', 'Sian', 'Essenza SCV12'],
    'Bentley': ['Continental GT', 'Continental GTC', 'Flying Spur', 'Bentayga', 'Mulsanne'],
    'Rolls-Royce': ['Ghost', 'Phantom', 'Wraith', 'Dawn', 'Cullinan', 'Spectre'],
    'Aston Martin': ['Vantage', 'DB11', 'DBS', 'DBX', 'Valhalla', 'Valkyrie'],
    'Lotus': ['Elise', 'Exige', 'Evora', 'Emira', 'Eletre', 'Evija'],
    'McLaren': ['540C', '570S', '570GT', '600LT', '620R', '650S', '675LT', '720S', '765LT', 'Artura', 'GT', 'Speedtail', 'Elva', 'Sabre', 'Senna', 'P1']
};

// Data Store
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

// Sorting state variables
let customerSortColumn = 'name';
let customerSortDirection = 'asc';
let vehicleSortColumn = 'plate';
let vehicleSortDirection = 'asc';
let serviceSortColumn = 'name';
let serviceSortDirection = 'asc';
let appointmentSortColumn = 'date';
let appointmentSortDirection = 'asc';

let services = JSON.parse(localStorage.getItem('services')) || [];
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let workOrders = JSON.parse(localStorage.getItem('workOrders')) || [];
let workOrderSortColumn = 'date';
let workOrderSortDirection = 'desc';
let technicians = JSON.parse(localStorage.getItem('technicians')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeForms();
    initializeSearch();
    updateDashboard();
    renderAllLists();
    initWeatherWidget();
    updateCurrentDate();
    loadSampleData();
    initializeBilling();
    loadSampleParts();
    initializeSettings();
    initializeReminders();
    updateAllCurrencyDisplays();
    initPartsReturns();
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.dataset.section;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
            document.getElementById(section).classList.add('active');
            
            // Refresh lists if needed
            renderAllLists();
        });
    });
}

// Update Current Date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Weather Widget Functions
async function initWeatherWidget() {
    // Default location: Johannesburg, South Africa
    const defaultLat = -26.2041;
    const defaultLon = 28.0473;

    // Check if user has saved a custom location in Global Settings
    const saved = JSON.parse(localStorage.getItem('globalSettings')) || {};
    if (saved.weatherLat && saved.weatherLon) {
        fetchWeather(saved.weatherLat, saved.weatherLon, saved.weatherCity || '');
        return;
    }

    // Fall back to browser geolocation, then Johannesburg default
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                fetchWeather(defaultLat, defaultLon);
            }
        );
    } else {
        fetchWeather(defaultLat, defaultLon);
    }
}

async function fetchWeather(lat, lon, cityOverride) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherLocation = document.getElementById('weather-location');
    const todayForecast = document.getElementById('today-forecast');
    const tomorrowForecast = document.getElementById('tomorrow-forecast');
    
    try {
        const [weatherResponse, geoResponse] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        ]);
        
        if (!weatherResponse.ok) throw new Error('Weather fetch failed');
        
        const data = await weatherResponse.json();
        const currentWeather = data.current_weather;
        
        if (weatherTemp) weatherTemp.textContent = `${Math.round(currentWeather.temperature)}°C`;
        if (weatherIcon) weatherIcon.textContent = getWeatherIcon(currentWeather.weathercode, currentWeather.is_day);
        if (weatherDesc) weatherDesc.textContent = getWeatherDescription(currentWeather.weathercode);
        
        if (weatherLocation) {
            if (cityOverride) {
                weatherLocation.textContent = `📍 ${cityOverride}`;
            } else if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                const city = geoData.address?.city || geoData.address?.town || geoData.address?.suburb || geoData.address?.county || 'Your Area';
                weatherLocation.textContent = `📍 ${city}`;
            }
        }
        
        // Populate today and tomorrow forecasts from daily data
        if (data.daily && todayForecast) {
            const todayMax = data.daily.temperature_2m_max[0];
            const todayMin = data.daily.temperature_2m_min[0];
            todayForecast.textContent = `${Math.round(todayMax)}°C / ${Math.round(todayMin)}°C`;
        }
        
        if (data.daily && tomorrowForecast) {
            const tomorrowMax = data.daily.temperature_2m_max[1];
            const tomorrowMin = data.daily.temperature_2m_min[1];
            tomorrowForecast.textContent = `${Math.round(tomorrowMax)}°C / ${Math.round(tomorrowMin)}°C`;
        }
        
    } catch (error) {
        console.error('Weather error:', error);
        if (weatherTemp) weatherTemp.textContent = '--°C';
        if (weatherIcon) weatherIcon.textContent = '🌡️';
        if (weatherDesc) weatherDesc.textContent = 'Unavailable';
        if (weatherLocation) weatherLocation.textContent = '📍 --';
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Rime Fog', 51: 'Light Drizzle', 53: 'Drizzle',
        55: 'Heavy Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
        71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 77: 'Snow Grains',
        80: 'Rain Showers', 81: 'Showers', 82: 'Heavy Showers',
        85: 'Snow Showers', 86: 'Heavy Snow Showers',
        95: 'Thunderstorm', 96: 'Thunderstorm + Hail', 99: 'Heavy Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
}


// Look up lat/lon for a typed city name using Nominatim (OpenStreetMap)
async function lookupWeatherCity() {
    const cityInput = document.getElementById('settings-weather-city');
    const latInput  = document.getElementById('settings-weather-lat');
    const lonInput  = document.getElementById('settings-weather-lon');
    if (!cityInput) return;

    const cityName = cityInput.value.trim();
    if (!cityName) {
        showNotification('Please enter a city name first.', 'error');
        return;
    }

    showNotification('Looking up coordinates for "' + cityName + '"…', 'info');

    try {
        const resp = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`,
            { headers: { 'Accept-Language': 'en' } }
        );
        if (!resp.ok) throw new Error('Nominatim request failed');
        const results = await resp.json();
        if (!results || results.length === 0) {
            showNotification('City not found. Try a different name.', 'error');
            return;
        }
        const { lat, lon, display_name } = results[0];
        if (latInput) latInput.value = parseFloat(lat).toFixed(4);
        if (lonInput) lonInput.value = parseFloat(lon).toFixed(4);
        // Update city field with the canonical name returned
        const shortName = display_name.split(',')[0].trim();
        cityInput.value = shortName;
        showNotification(`Found: ${shortName} (${parseFloat(lat).toFixed(4)}, ${parseFloat(lon).toFixed(4)})`, 'success');
    } catch (err) {
        console.error('lookupWeatherCity error:', err);
        showNotification('Could not look up coordinates. Check your connection.', 'error');
    }
}

function getWeatherIcon(code, isDay) {
    // Weather codes: https://open-meteo.com/en/docs
    const icons = {
        0: isDay ? '☀️' : '🌙',  // Clear
        1: isDay ? '🌤️' : '🌙',  // Mainly clear
        2: '⛅',  // Partly cloudy
        3: '☁️',  // Overcast
        45: '🌫️',  // Foggy
        48: '🌫️',  // Depositing rime fog
        51: '🌧️',  // Drizzle: Light
        53: '🌧️',  // Drizzle: Moderate
        55: '🌧️',  // Drizzle: Dense
        61: '🌧️',  // Rain: Slight
        63: '🌧️',  // Rain: Moderate
        65: '🌧️',  // Rain: Heavy
        71: '🌨️',  // Snow: Slight
        73: '🌨️',  // Snow: Moderate
        75: '🌨️',  // Snow: Heavy
        77: '🌨️',  // Snow grains
        80: '🌦️',  // Rain showers: Slight
        81: '🌦️',  // Rain showers: Moderate
        82: '⛈️',   // Rain showers: Violent
        85: '🌨️',  // Snow showers: Slight
        86: '🌨️',  // Snow showers: Heavy
        95: '⛈️',   // Thunderstorm
        96: '⛈️',   // Thunderstorm with hail
        99: '⛈️'    // Thunderstorm with heavy hail
    };
    
    return icons[code] || '🌡️';
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Reset form
    const form = document.querySelector(`#${modalId} form`);
    if (form) form.reset();
}

// Customer Functions
function openCustomerModal() {
    document.getElementById('customer-form').reset();
    document.getElementById('customer-id').value = '';
    openModal('customer-modal');
}

function saveCustomer(e) {
    e.preventDefault();
    
    const phone = getValidatedPhone('customer-phone', true);
    if (phone === null) return; // Validation failed
    
    const id = document.getElementById('customer-id').value || generateId();
    const customer = {
        id: id,
        firstName: document.getElementById('customer-firstname').value,
        lastName: document.getElementById('customer-lastname').value,
        email: document.getElementById('customer-email').value,
        phone: phone,
        address: document.getElementById('customer-address').value,
        createdAt: new Date().toISOString()
    };
    
    // Check if editing existing customer
    const existingIndex = customers.findIndex(c => c.id === id);
    if (existingIndex >= 0) {
        customers[existingIndex] = customer;
    } else {
        customers.push(customer);
    }
    
    saveData();
    closeModal('customer-modal');
    renderCustomersList();
    updateDashboard();
    showNotification('Customer saved successfully!', 'success');
}

function renderCustomersList() {
    const container = document.getElementById('customers-list');
    
    if (customers.length === 0) {
        container.innerHTML = '<p class="empty-state">No customers found. Add your first customer!</p>';
        return;
    }
    
    // Sort customers
    const sortedCustomers = [...customers].sort((a, b) => {
        let aVal, bVal;
        switch (customerSortColumn) {
            case 'name':
                aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
                bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
                break;
            case 'email':
                aVal = (a.email || '').toLowerCase();
                bVal = (b.email || '').toLowerCase();
                break;
            case 'phone':
                aVal = (a.phone || '').toLowerCase();
                bVal = (b.phone || '').toLowerCase();
                break;
            default:
                aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
                bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
        }
        if (customerSortDirection === 'asc') {
            return aVal.localeCompare(bVal);
        } else {
            return bVal.localeCompare(aVal);
        }
    });
    
    const sortIndicator = (col) => customerSortColumn === col ? (customerSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortCustomers('name')">Name${sortIndicator('name')}</th>
                <th class="sortable" onclick="sortCustomers('email')">Email${sortIndicator('email')}</th>
                <th class="sortable" onclick="sortCustomers('phone')">Phone${sortIndicator('phone')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedCustomers.map(customer => `
                <tr>
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editCustomer('${customer.id}')">Edit</button>
                            <button class="btn btn-success" onclick="viewCustomerVehicles('${customer.id}')">Vehicles</button>
                            <button class="btn btn-danger" onclick="deleteCustomer('${customer.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    
    document.getElementById('customer-id').value = customer.id;
    document.getElementById('customer-firstname').value = customer.firstName;
    document.getElementById('customer-lastname').value = customer.lastName;
    document.getElementById('customer-email').value = customer.email;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-address').value = customer.address;
    
    openModal('customer-modal');
}

function deleteCustomer(id) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    // Check if customer has vehicles
    const hasVehicles = vehicles.some(v => v.customerId === id);
    if (hasVehicles) {
        alert('Cannot delete customer with associated vehicles. Please delete vehicles first.');
        return;
    }
    
    customers = customers.filter(c => c.id !== id);
    saveData();
    renderCustomersList();
    updateDashboard();
    showNotification('Customer deleted successfully!', 'success');
}

function viewCustomerVehicles(customerId) {
    const customerVehicles = vehicles.filter(v => v.customerId === customerId);
    if (customerVehicles.length === 0) {
        alert('This customer has no vehicles registered.');
        return;
    }
    
    const vehicleList = customerVehicles.map(v => 
        `${v.year} ${v.make} ${v.model} - ${v.plate}`
    ).join('\n');
    
    alert(`Customer Vehicles:\n\n${vehicleList}`);
}

// Vehicle Functions
function openVehicleModal(vehicleId = null) {
    document.getElementById('vehicle-form').reset();
    document.getElementById('vehicle-id').value = '';
    currentVehicleImages = [];
    currentLicenceDisc = null;
    renderVehicleImageGallery();
    renderLicenceDiscPreview();
    populateCustomerDropdowns();
    populateBrandDropdown();
    
    // If editing, load existing vehicle data
    if (vehicleId) {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            document.getElementById('vehicle-id').value = vehicle.id;
            document.getElementById('vehicle-customer').value = vehicle.customerId;
            document.getElementById('vehicle-make').value = vehicle.make;
            updateModelDropdown();
            document.getElementById('vehicle-model').value = vehicle.model;
            document.getElementById('vehicle-year').value = vehicle.year;
            document.getElementById('vehicle-plate').value = vehicle.plate;
            document.getElementById('vehicle-vin').value = vehicle.vin || '';
            document.getElementById('vehicle-engine-code').value = vehicle.engineCode || '';
            document.getElementById('vehicle-color').value = vehicle.color || '';
            document.getElementById('vehicle-mileage').value = vehicle.mileage || '';
            document.getElementById('vehicle-last-service-mileage').value = vehicle.lastServiceMileage || '';
            
            // Load existing images
            if (vehicle.images && vehicle.images.length) {
                currentVehicleImages = [...vehicle.images];
                renderVehicleImageGallery();
            }
            
            // Load existing licence disc
            if (vehicle.licenceDisc) {
                currentLicenceDisc = vehicle.licenceDisc;
                renderLicenceDiscPreview();
            }
        }
    }
    
    openModal('vehicle-modal');
}

// Populate Brand Dropdown
function populateBrandDropdown() {
    const brandSelect = document.getElementById('vehicle-make');
    brandSelect.innerHTML = '<option value="">Select Brand</option>';
    
    // Get sorted list of brands
    const brands = Object.keys(carBrandsAndModels).sort();
    
    brands.forEach(brand => {
        brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
    });
}

// Update Model Dropdown based on selected Brand
function updateModelDropdown() {
    const brandSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');
    const selectedBrand = brandSelect.value;
    
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    
    if (!selectedBrand) {
        modelSelect.disabled = true;
        return;
    }
    
    modelSelect.disabled = false;
    const models = carBrandsAndModels[selectedBrand] || [];
    
    models.forEach(model => {
        modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
    });
}

let currentVehicleImages = [];  // array of base64 strings
let currentLicenceDisc = null;  // base64 string for licence disc
let isEditingVehicle = false;  // track if we're editing an existing vehicle

// Handle licence disc image upload
function handleLicenceDiscUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentLicenceDisc = e.target.result;
        renderLicenceDiscPreview();
    };
    reader.readAsDataURL(file);
}

function renderLicenceDiscPreview() {
    const container = document.getElementById('licence-disc-preview');
    if (!container) return;
    
    if (currentLicenceDisc) {
        container.classList.add('has-image');
        container.innerHTML = `
            <div class="licence-disc-image-container">
                <img src="${currentLicenceDisc}" alt="Licence Disc" onclick="event.stopPropagation(); openImageLightbox('${currentLicenceDisc}')">
                <button type="button" class="remove-disc" onclick="event.stopPropagation(); removeLicenceDisc()">&times;</button>
            </div>
        `;
    } else {
        container.classList.remove('has-image');
        container.innerHTML = `
            <div class="licence-disc-placeholder">
                <span>📋</span>
                <span>Click to add licence disc photo</span>
            </div>
        `;
    }
}

function removeLicenceDisc() {
    if (!confirm('Are you sure you want to remove the licence disc photo?')) return;
    currentLicenceDisc = null;
    document.getElementById('vehicle-licence-disc').value = '';
    renderLicenceDiscPreview();
}

function saveVehicle(e) {
    e.preventDefault();
    
    const id = document.getElementById('vehicle-id').value || generateId();
    const existingVehicle = vehicles.find(v => v.id === id);
    
    // When editing, use currentVehicleImages (even if empty - user may have removed all images)
    // When creating new, use currentVehicleImages
    let imagesToSave = currentVehicleImages;
    
    // If we're editing and no changes were made to images, keep existing
    // But if user explicitly removed images, currentVehicleImages reflects that
    if (isEditingVehicle) {
        imagesToSave = currentVehicleImages; // Use whatever is in current array (could be empty)
    }
    
    const vehicle = {
        id: id,
        customerId: document.getElementById('vehicle-customer').value,
        make: document.getElementById('vehicle-make').value,
        model: document.getElementById('vehicle-model').value,
        year: parseInt(document.getElementById('vehicle-year').value),
        plate: document.getElementById('vehicle-plate').value,
        vin: document.getElementById('vehicle-vin').value,
        engineCode: document.getElementById('vehicle-engine-code').value,
        color: document.getElementById('vehicle-color').value,
        mileage: parseInt(document.getElementById('vehicle-mileage').value) || 0,
        lastServiceMileage: parseInt(document.getElementById('vehicle-last-service-mileage').value) || 0,
        licenceDisc: currentLicenceDisc, // Can be null if removed
        images: imagesToSave,
        createdAt: existingVehicle ? existingVehicle.createdAt : new Date().toISOString()
    };
    
    const existingIndex = vehicles.findIndex(v => v.id === id);
    if (existingIndex >= 0) {
        vehicles[existingIndex] = vehicle;
    } else {
        vehicles.push(vehicle);
    }
    
    saveData();
    closeModal('vehicle-modal');
    renderVehiclesList();
    updateDashboard();
    showNotification('Vehicle saved successfully!', 'success');
    currentVehicleImages = [];
    currentLicenceDisc = null;
    isEditingVehicle = false;
}

function renderVehiclesList() {
    const container = document.getElementById('vehicles-list');

    if (vehicles.length === 0) {
        container.innerHTML = '<p class="empty-state">No vehicles found. Add your first vehicle!</p>';
        return;
    }

    // Sort vehicles
    const sortedVehicles = [...vehicles].sort((a, b) => {
        let aVal, bVal;

        switch (vehicleSortColumn) {
            case 'vehicle':
                aVal = `${a.year} ${a.make} ${a.model}`.toLowerCase();
                bVal = `${b.year} ${b.make} ${b.model}`.toLowerCase();
                break;
            case 'plate':
                aVal = (a.plate || '').toLowerCase();
                bVal = (b.plate || '').toLowerCase();
                break;
            case 'engineCode':
                aVal = (a.engineCode || '').toLowerCase();
                bVal = (b.engineCode || '').toLowerCase();
                break;
            case 'mileage':
                aVal = a.mileage || 0;
                bVal = b.mileage || 0;
                break;
            case 'customer':
                const aCust = customers.find(c => c.id === a.customerId);
                const bCust = customers.find(c => c.id === b.customerId);
                aVal = aCust ? `${aCust.firstName} ${aCust.lastName}`.toLowerCase() : '';
                bVal = bCust ? `${bCust.firstName} ${bCust.lastName}`.toLowerCase() : '';
                break;
            default:
                aVal = a[vehicleSortColumn] || '';
                bVal = b[vehicleSortColumn] || '';
        }

        if (vehicleSortDirection === 'asc') {
            return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
    });

    // Generate sort indicator
    const sortIndicator = (col) => {
        if (vehicleSortColumn === col) {
            return vehicleSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>';
        }
        return '';
    };

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th class="sortable" onclick="sortVehicles('vehicle')" style="cursor:pointer;">Vehicle${sortIndicator('vehicle')}</th>
                <th class="sortable" onclick="sortVehicles('plate')" style="cursor:pointer;">License Plate${sortIndicator('plate')}</th>
                <th class="sortable" onclick="sortVehicles('engineCode')" style="cursor:pointer;">Engine Code${sortIndicator('engineCode')}</th>
                <th class="sortable" onclick="sortVehicles('mileage')" style="cursor:pointer;">Mileage (km)${sortIndicator('mileage')}</th>
                <th class="sortable" onclick="sortVehicles('customer')" style="cursor:pointer;">Customer${sortIndicator('customer')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedVehicles.map(vehicle => {
                const customer = customers.find(c => c.id === vehicle.customerId);
                const vImgs = vehicle.images && vehicle.images.length ? vehicle.images : (vehicle.image ? [vehicle.image] : []);
                const imageHTML = vImgs.length
                    ? `<div style="position:relative;display:inline-block">` +
                       `<img src="${vImgs[0]}" class="vehicle-thumbnail" onclick="showVehicleImages('${vehicle.id}')" alt="Vehicle Image">` +
                       (vImgs.length > 1 ? `<span style="position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;font-size:0.65rem;padding:1px 4px;border-radius:3px;">${vImgs.length}📷</span>` : '') +
                       `</div>`
                    : '<span style="color: var(--text-light); font-size: 0.8rem;">No image</span>';
                const mileage = vehicle.mileage ? vehicle.mileage.toLocaleString() : '0';
                const engineCode = vehicle.engineCode || '-';
                return `
                <tr>
                    <td>${imageHTML}</td>
                    <td>${vehicle.year} ${vehicle.make} ${vehicle.model}</td>
                    <td>${vehicle.plate}</td>
                    <td>${engineCode}</td>
                    <td>${mileage}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editVehicle('${vehicle.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteVehicle('${vehicle.id}')">Delete</button>
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

function sortVehicles(column) {
    if (vehicleSortColumn === column) {
        vehicleSortDirection = vehicleSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        vehicleSortColumn = column;
        vehicleSortDirection = 'asc';
    }
    renderVehiclesList();
}

// Sort Customers
function sortCustomers(column) {
    if (customerSortColumn === column) {
        customerSortDirection = customerSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        customerSortColumn = column;
        customerSortDirection = 'asc';
    }
    renderCustomersList();
}

// Sort Services
function sortServices(column) {
    if (serviceSortColumn === column) {
        serviceSortDirection = serviceSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        serviceSortColumn = column;
        serviceSortDirection = 'asc';
    }
    renderServicesList();
}

// Sort Appointments
function sortAppointments(column) {
    if (appointmentSortColumn === column) {
        appointmentSortDirection = appointmentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        appointmentSortColumn = column;
        appointmentSortDirection = 'asc';
    }
    renderAppointmentsList();
}

function editVehicle(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;
    
    // Set editing mode
    isEditingVehicle = true;
    
    populateCustomerDropdowns();
    populateBrandDropdown();
    document.getElementById('vehicle-id').value = vehicle.id;
    document.getElementById('vehicle-customer').value = vehicle.customerId;
    
    // Set brand and trigger model dropdown population
    document.getElementById('vehicle-make').value = vehicle.make;
    updateModelDropdown();
    
    // Set model after dropdown is populated
    setTimeout(() => {
        document.getElementById('vehicle-model').value = vehicle.model;
    }, 10);
    
    document.getElementById('vehicle-year').value = vehicle.year;
    document.getElementById('vehicle-plate').value = vehicle.plate;
    document.getElementById('vehicle-vin').value = vehicle.vin || '';
    document.getElementById('vehicle-engine-code').value = vehicle.engineCode || '';
    document.getElementById('vehicle-color').value = vehicle.color || '';
    document.getElementById('vehicle-mileage').value = vehicle.mileage || 0;
    document.getElementById('vehicle-last-service-mileage').value = vehicle.lastServiceMileage || 0;
    
    // Load existing images into gallery
    currentVehicleImages = vehicle.images && vehicle.images.length
        ? [...vehicle.images]
        : (vehicle.image ? [vehicle.image] : []);
    renderVehicleImageGallery();
    
    // Load existing licence disc
    currentLicenceDisc = vehicle.licenceDisc || null;
    renderLicenceDiscPreview();

    openModal('vehicle-modal');
}

function deleteVehicle(id) {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    vehicles = vehicles.filter(v => v.id !== id);
    saveData();
    renderVehiclesList();
    updateDashboard();
    showNotification('Vehicle deleted successfully!', 'success');
}

// Service Functions
function openServiceModal() {
    document.getElementById('service-form').reset();
    document.getElementById('service-id').value = '';
    openModal('service-modal');
}

function saveService(e) {
    e.preventDefault();
    
    const id = document.getElementById('service-id').value || generateId();
    const service = {
        id: id,
        name: document.getElementById('service-name').value,
        description: document.getElementById('service-description').value,
        price: parseFloat(document.getElementById('service-price').value),
        estimatedTime: parseFloat(document.getElementById('service-time').value) || 0
    };
    
    const existingIndex = services.findIndex(s => s.id === id);
    if (existingIndex >= 0) {
        services[existingIndex] = service;
    } else {
        services.push(service);
    }
    
    saveData();
    closeModal('service-modal');
    renderServicesList();
    showNotification('Service saved successfully!', 'success');
}

function renderServicesList(filteredServices = null) {
    const container = document.getElementById('services-list');
    let displayServices = filteredServices || [...services];
    
    if (displayServices.length === 0) {
        container.innerHTML = '<p class="empty-state">No services found. Add your first service!</p>';
        return;
    }
    
    // Sort services (only if not filtered)
    if (!filteredServices) {
        displayServices.sort((a, b) => {
            let aVal, bVal;
            switch (serviceSortColumn) {
                case 'name':
                    aVal = (a.name || '').toLowerCase();
                    bVal = (b.name || '').toLowerCase();
                    break;
                case 'description':
                    aVal = (a.description || '').toLowerCase();
                    bVal = (b.description || '').toLowerCase();
                    break;
                case 'price':
                    aVal = parseFloat(a.price) || 0;
                    bVal = parseFloat(b.price) || 0;
                    break;
                case 'time':
                    aVal = parseFloat(a.estimatedTime) || 0;
                    bVal = parseFloat(b.estimatedTime) || 0;
                    break;
                default:
                    aVal = (a.name || '').toLowerCase();
                    bVal = (b.name || '').toLowerCase();
            }
            if (serviceSortDirection === 'asc') {
                return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
            } else {
                return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal;
            }
        });
    }
    
    const sortIndicator = (col) => serviceSortColumn === col ? (serviceSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortServices('name')">Service Name${sortIndicator('name')}</th>
                <th class="sortable" onclick="sortServices('description')">Description${sortIndicator('description')}</th>
                <th class="sortable" onclick="sortServices('price')">Price${sortIndicator('price')}</th>
                <th class="sortable" onclick="sortServices('time')">Est. Time${sortIndicator('time')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${displayServices.map(service => `
                <tr>
                    <td>${service.name}</td>
                    <td>${service.description || 'N/A'}</td>
                    <td>${formatCurrency(service.price)}</td>
                    <td>${service.estimatedTime ? service.estimatedTime + ' hrs' : 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editService('${service.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteService('${service.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function filterServicesList() {
    const searchTerm = document.getElementById('service-search').value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderServicesList();
        return;
    }
    
    const filtered = services.filter(service => 
        service.name.toLowerCase().includes(searchTerm) ||
        (service.description && service.description.toLowerCase().includes(searchTerm)) ||
        formatCurrency(service.price).toLowerCase().includes(searchTerm)
    );
    
    renderServicesList(filtered);
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    document.getElementById('service-id').value = service.id;
    document.getElementById('service-name').value = service.name;
    document.getElementById('service-description').value = service.description || '';
    document.getElementById('service-price').value = service.price;
    document.getElementById('service-time').value = service.estimatedTime || '';
    
    openModal('service-modal');
}

function deleteService(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    services = services.filter(s => s.id !== id);
    saveData();
    renderServicesList();
    showNotification('Service deleted successfully!', 'success');
}

// Appointment Functions
function openAppointmentModal() {
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-id').value = '';
    populateAppointmentDropdowns();
    openModal('appointment-modal');
}

function populateAppointmentDropdowns() {
    const customerSelect = document.getElementById('appointment-customer');
    const vehicleSelect = document.getElementById('appointment-vehicle');
    const serviceSelect = document.getElementById('appointment-service');
    
    // Populate customers
    customerSelect.innerHTML = '<option value="">Select Customer</option>';
    customers.forEach(customer => {
        customerSelect.innerHTML += `<option value="${customer.id}">${customer.firstName} ${customer.lastName}</option>`;
    });
    
    // Populate services
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    services.forEach(service => {
        serviceSelect.innerHTML += `<option value="${service.id}">${service.name} - ${formatCurrency(service.price)}</option>`;
    });
    
    // Vehicle select will be populated when customer is selected
    vehicleSelect.innerHTML = '<option value="">Select Customer First</option>';
    vehicleSelect.disabled = true;
    
    // Add event listener to update vehicles when customer changes
    customerSelect.onchange = function() {
        const customerId = this.value;
        vehicleSelect.innerHTML = '<option value="">Select Vehicle</option>';
        vehicleSelect.disabled = !customerId;
        
        if (customerId) {
            const customerVehicles = vehicles.filter(v => v.customerId === customerId);
            customerVehicles.forEach(vehicle => {
                vehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.plate}</option>`;
            });
        }
    };
}

function saveAppointment(e) {
    e.preventDefault();
    
    const id = document.getElementById('appointment-id').value || generateId();
    const existingAppointment = appointments.find(a => a.id === id);
    const isEdit = !!existingAppointment;
    
    const appointment = {
        id: id,
        customerId: document.getElementById('appointment-customer').value,
        vehicleId: document.getElementById('appointment-vehicle').value,
        serviceId: document.getElementById('appointment-service').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        notes: document.getElementById('appointment-notes').value,
        status: existingAppointment ? existingAppointment.status : 'scheduled',
        createdAt: existingAppointment ? existingAppointment.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    const existingIndex = appointments.findIndex(a => a.id === id);
    if (existingIndex >= 0) {
        appointments[existingIndex] = appointment;
    } else {
        appointments.push(appointment);
    }
    
    saveData();
    closeModal('appointment-modal');
    
    // Reset modal title
    document.querySelector('#appointment-modal .modal-header h2').textContent = 'Schedule Appointment';
    
    renderAppointmentsList();
    updateDashboard();
    showNotification(isEdit ? 'Appointment updated successfully!' : 'Appointment scheduled successfully!', 'success');
}

function renderAppointmentsList() {
    const container = document.getElementById('appointments-list');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p class="empty-state">No appointments found. Schedule your first appointment!</p>';
        return;
    }
    
    // Sort appointments
    const sortedAppointments = [...appointments].sort((a, b) => {
        let aVal, bVal;
        const aCustomer = customers.find(c => c.id === a.customerId);
        const bCustomer = customers.find(c => c.id === b.customerId);
        const aVehicle = vehicles.find(v => v.id === a.vehicleId);
        const bVehicle = vehicles.find(v => v.id === b.vehicleId);
        const aService = services.find(s => s.id === a.serviceId);
        const bService = services.find(s => s.id === b.serviceId);
        
        switch (appointmentSortColumn) {
            case 'date':
                aVal = new Date(a.date + ' ' + a.time).getTime();
                bVal = new Date(b.date + ' ' + b.time).getTime();
                break;
            case 'customer':
                aVal = aCustomer ? `${aCustomer.firstName} ${aCustomer.lastName}`.toLowerCase() : '';
                bVal = bCustomer ? `${bCustomer.firstName} ${bCustomer.lastName}`.toLowerCase() : '';
                break;
            case 'vehicle':
                aVal = aVehicle ? `${aVehicle.make} ${aVehicle.model}`.toLowerCase() : '';
                bVal = bVehicle ? `${bVehicle.make} ${bVehicle.model}`.toLowerCase() : '';
                break;
            case 'service':
                aVal = aService ? aService.name.toLowerCase() : '';
                bVal = bService ? bService.name.toLowerCase() : '';
                break;
            case 'status':
                aVal = (a.status || '').toLowerCase();
                bVal = (b.status || '').toLowerCase();
                break;
            default:
                aVal = new Date(a.date + ' ' + a.time).getTime();
                bVal = new Date(b.date + ' ' + b.time).getTime();
        }
        if (appointmentSortDirection === 'asc') {
            return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
        } else {
            return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal;
        }
    });
    
    const sortIndicator = (col) => appointmentSortColumn === col ? (appointmentSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortAppointments('date')">Date &amp; Time${sortIndicator('date')}</th>
                <th class="sortable" onclick="sortAppointments('customer')">Customer${sortIndicator('customer')}</th>
                <th class="sortable" onclick="sortAppointments('vehicle')">Vehicle${sortIndicator('vehicle')}</th>
                <th class="sortable" onclick="sortAppointments('service')">Service${sortIndicator('service')}</th>
                <th class="sortable" onclick="sortAppointments('status')">Status${sortIndicator('status')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedAppointments.map(appointment => {
                const customer = customers.find(c => c.id === appointment.customerId);
                const vehicle = vehicles.find(v => v.id === appointment.vehicleId);
                const service = services.find(s => s.id === appointment.serviceId);
                return `
                <tr>
                    <td>${formatDate(appointment.date)} ${appointment.time}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</td>
                    <td>${service ? service.name : 'N/A'}</td>
                    <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-info" onclick="editAppointment('${appointment.id}')">Edit</button>
                            <button class="btn btn-success" onclick="completeAppointment('${appointment.id}')">Complete</button>
                            <button class="btn btn-warning" onclick="cancelAppointment('${appointment.id}')">Cancel</button>
                            <button class="btn btn-danger" onclick="deleteAppointment('${appointment.id}')">Delete</button>
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

function completeAppointment(id) {
    const index = appointments.findIndex(a => a.id === id);
    if (index >= 0) {
        appointments[index].status = 'completed';
        saveData();
        renderAppointmentsList();
        updateDashboard();
        showNotification('Appointment marked as completed!', 'success');
    }
}

function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) {
        showNotification('Appointment not found', 'error');
        return;
    }
    
    // Reset form and set the ID
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-id').value = appointment.id;
    
    // Populate dropdowns first
    populateAppointmentDropdowns();
    
    // Wait a bit for dropdowns to populate, then set values
    setTimeout(() => {
        document.getElementById('appointment-customer').value = appointment.customerId;
        
        // Trigger the customer change event to populate vehicles
        const customerSelect = document.getElementById('appointment-customer');
        const event = new Event('change');
        customerSelect.dispatchEvent(event);
        
        // Wait for vehicles to populate
        setTimeout(() => {
            document.getElementById('appointment-vehicle').value = appointment.vehicleId;
            document.getElementById('appointment-service').value = appointment.serviceId;
            document.getElementById('appointment-date').value = appointment.date;
            document.getElementById('appointment-time').value = appointment.time;
            document.getElementById('appointment-notes').value = appointment.notes || '';
            
            // Update modal title
            document.querySelector('#appointment-modal .modal-header h2').textContent = 'Edit Appointment';
            
            openModal('appointment-modal');
        }, 100);
    }, 100);
}

function cancelAppointment(id) {
    const index = appointments.findIndex(a => a.id === id);
    if (index >= 0) {
        appointments[index].status = 'cancelled';
        saveData();
        renderAppointmentsList();
        updateDashboard();
        showNotification('Appointment cancelled!', 'warning');
    }
}

function deleteAppointment(id) {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    
    appointments = appointments.filter(a => a.id !== id);
    saveData();
    renderAppointmentsList();
    updateDashboard();
    showNotification('Appointment deleted!', 'success');
}

// Work Order Functions
function openWorkOrderModal() {
    document.getElementById('work-order-form').reset();
    document.getElementById('work-order-id').value = '';
    document.getElementById('completed-date-group').style.display = 'none';
    document.getElementById('work-order-completed-date').value = '';
    workOrderParts = [];
    updateWorkOrderPartsList();
    populateWorkOrderDropdowns();
    openModal('work-order-modal');
}

function toggleCompletedDate() {
    const status = document.getElementById('work-order-status').value;
    const completedDateGroup = document.getElementById('completed-date-group');
    
    if (status === 'completed') {
        completedDateGroup.style.display = 'block';
        // Set today's date as default if not already set
        if (!document.getElementById('work-order-completed-date').value) {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('work-order-completed-date').value = today;
        }
    } else {
        completedDateGroup.style.display = 'none';
    }
}

function populateWorkOrderDropdowns() {
    const customerSelect = document.getElementById('work-order-customer');
    const vehicleSelect = document.getElementById('work-order-vehicle');
    const servicesContainer = document.getElementById('work-order-services');
    
    // Populate customers
    customerSelect.innerHTML = '<option value="">Select Customer</option>';
    customers.forEach(customer => {
        customerSelect.innerHTML += `<option value="${customer.id}">${customer.firstName} ${customer.lastName}</option>`;
    });
    
    // Populate services as properly aligned checkboxes
    servicesContainer.innerHTML = `
        <div class="services-selection-container">
            <div class="services-selection-header">Select Services</div>
            ${services.map(service => `
                <label class="service-item" data-service-id="${service.id}">
                    <input type="checkbox" 
                           value="${service.id}" 
                           class="service-checkbox" 
                           data-price="${service.price}"
                           aria-label="${service.name} - ${formatCurrency(service.price)}">
                    <span class="service-label">
                        <span class="service-name">${service.name}</span>
                        <span class="service-price">${formatCurrency(service.price)}</span>
                    </span>
                </label>
            `).join('')}
        </div>
    `;
    
    // Add event listeners for service selection
    initializeServiceSelection();

    // Populate technicians
    populateTechnicianDropdowns();

    // Vehicle select will be populated when customer changes
    vehicleSelect.innerHTML = '<option value="">Select Customer First</option>';
    vehicleSelect.disabled = true;
}

// Initialize service selection with visual feedback
function initializeServiceSelection() {
    const container = document.getElementById('work-order-services');
    if (!container) return;
    
    container.addEventListener('change', function(e) {
        if (e.target.classList.contains('service-checkbox')) {
            const serviceItem = e.target.closest('.service-item');
            serviceItem.classList.toggle('selected', e.target.checked);
            updateWorkOrderEstimatedTotal();
        }
    });
    
    // Also handle click on the entire row
    container.addEventListener('click', function(e) {
        const serviceItem = e.target.closest('.service-item');
        if (serviceItem && !e.target.classList.contains('service-checkbox')) {
            const checkbox = serviceItem.querySelector('.service-checkbox');
            checkbox.checked = !checkbox.checked;
            serviceItem.classList.toggle('selected', checkbox.checked);
            updateWorkOrderEstimatedTotal();
        }
    });
}

// Update estimated total on work order form
function updateWorkOrderEstimatedTotal() {
    let servicesTotal = 0;
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
        servicesTotal += parseFloat(checkbox.dataset.price) || 0;
    });
    
    let partsTotal = workOrderParts.reduce((sum, p) => sum + p.total, 0);
    let laborHours = parseFloat(document.getElementById('work-order-labor')?.value) || 0;
    let laborTotal = laborHours * getLaborRate();
    
    const estimatedTotal = servicesTotal + partsTotal + laborTotal;
    
    // Update display if element exists
    const totalDisplay = document.getElementById('work-order-estimated-total');
    if (totalDisplay) {
        totalDisplay.textContent = formatCurrency(estimatedTotal);
    }
}

function loadCustomerVehicles() {
    const customerId = document.getElementById('work-order-customer').value;
    const vehicleSelect = document.getElementById('work-order-vehicle');
    
    vehicleSelect.innerHTML = '<option value="">Select Vehicle</option>';
    vehicleSelect.disabled = !customerId;
    
    if (customerId) {
        const customerVehicles = vehicles.filter(v => v.customerId === customerId);
        customerVehicles.forEach(vehicle => {
            vehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.plate}</option>`;
        });
    }
}

function saveWorkOrder(e) {
    e.preventDefault();
    
    const selectedServices = [];
    let totalCost = 0;
    
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
        const serviceId = checkbox.value;
        const service = services.find(s => s.id === serviceId);
        if (service) {
            selectedServices.push(serviceId);
            totalCost += service.price;
        }
    });
    
    if (selectedServices.length === 0) {
        alert('Please select at least one service');
        return;
    }
    
    // Add parts cost to total
    workOrderParts.forEach(part => {
        totalCost += part.total;
    });
    
    const id = document.getElementById('work-order-id').value || generateId();
    const workOrder = {
        id: id,
        customerId: document.getElementById('work-order-customer').value,
        vehicleId: document.getElementById('work-order-vehicle').value,
        technicianId: document.getElementById('work-order-technician').value || null,
        services: selectedServices,
        parts: workOrderParts.map(p => ({ partId: p.partId, quantity: p.quantity, price: p.price })),
        laborHours: parseFloat(document.getElementById('work-order-labor').value) || 0,
        partsUsed: document.getElementById('work-order-parts').value,
        notes: document.getElementById('work-order-notes').value,
        status: document.getElementById('work-order-status').value,
        completedDate: document.getElementById('work-order-completed-date').value || null,
        totalCost: totalCost,
        createdAt: new Date().toISOString()
    };
    
    const existingIndex = workOrders.findIndex(w => w.id === id);
    if (existingIndex >= 0) {
        workOrders[existingIndex] = workOrder;
    } else {
        workOrders.push(workOrder);
    }
    
    // Clear work order parts
    workOrderParts = [];
    
    saveData();
    closeModal('work-order-modal');
    renderWorkOrdersList();
    updateDashboard();
    showNotification('Work order created successfully!', 'success');
}

function sortWorkOrders(column) {
    if (workOrderSortColumn === column) {
        workOrderSortDirection = workOrderSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        workOrderSortColumn = column;
        workOrderSortDirection = 'asc';
    }
    const searchInput = document.getElementById('work-order-search');
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = workOrders.filter(w => {
            const customer = customers.find(c => c.id === w.customerId);
            return customer && (
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                w.id.includes(searchTerm)
            );
        });
        renderFilteredWorkOrders(filtered);
    } else {
        renderWorkOrdersList();
    }
}

function applyWorkOrderSort(list) {
    return [...list].sort((a, b) => {
        let valA, valB;
        switch (workOrderSortColumn) {
            case 'number':
                valA = a.id.substring(0, 8).toUpperCase();
                valB = b.id.substring(0, 8).toUpperCase();
                break;
            case 'date':
                valA = new Date(a.createdAt);
                valB = new Date(b.createdAt);
                break;
            case 'customer': {
                const cA = customers.find(c => c.id === a.customerId);
                const cB = customers.find(c => c.id === b.customerId);
                valA = cA ? (cA.firstName + ' ' + cA.lastName).toLowerCase() : '';
                valB = cB ? (cB.firstName + ' ' + cB.lastName).toLowerCase() : '';
                break;
            }
            case 'vehicle': {
                const vA = vehicles.find(v => v.id === a.vehicleId);
                const vB = vehicles.find(v => v.id === b.vehicleId);
                valA = vA ? (vA.year + ' ' + vA.make + ' ' + vA.model).toLowerCase() : '';
                valB = vB ? (vB.year + ' ' + vB.make + ' ' + vB.model).toLowerCase() : '';
                break;
            }
            case 'technician': {
                const tA = technicians.find(t => t.id === a.technicianId);
                const tB = technicians.find(t => t.id === b.technicianId);
                valA = tA ? (tA.firstName + ' ' + tA.lastName).toLowerCase() : 'zzz';
                valB = tB ? (tB.firstName + ' ' + tB.lastName).toLowerCase() : 'zzz';
                break;
            }
            case 'total':
                valA = parseFloat(a.totalCost) || 0;
                valB = parseFloat(b.totalCost) || 0;
                break;
            case 'status':
                valA = a.status || '';
                valB = b.status || '';
                break;
            default:
                valA = new Date(a.createdAt);
                valB = new Date(b.createdAt);
        }
        if (valA < valB) return workOrderSortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return workOrderSortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function buildWorkOrderTable(list) {
    const si = (col) => workOrderSortColumn === col ? (workOrderSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';
    const sorted = applyWorkOrderSort(list);
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortWorkOrders('number')">Work Order #${si('number')}</th>
                <th class="sortable" onclick="sortWorkOrders('date')">Date${si('date')}</th>
                <th class="sortable" onclick="sortWorkOrders('customer')">Customer${si('customer')}</th>
                <th class="sortable" onclick="sortWorkOrders('vehicle')">Vehicle${si('vehicle')}</th>
                <th class="sortable" onclick="sortWorkOrders('technician')">Technician${si('technician')}</th>
                <th class="sortable" onclick="sortWorkOrders('total')">Total Cost${si('total')}</th>
                <th class="sortable" onclick="sortWorkOrders('status')">Status${si('status')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sorted.map(workOrder => {
                const customer = customers.find(c => c.id === workOrder.customerId);
                const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
                const technician = technicians.find(t => t.id === workOrder.technicianId);
                return `
                <tr>
                    <td>#${workOrder.id.substring(0, 8).toUpperCase()}</td>
                    <td>${formatDate(workOrder.createdAt)}</td>
                    <td>${customer ? customer.firstName + ' ' + customer.lastName : 'N/A'}</td>
                    <td>${vehicle ? vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model : 'N/A'}</td>
                    <td>${technician ? technician.firstName + ' ' + technician.lastName : 'Unassigned'}</td>
                    <td>${formatCurrency(workOrder.totalCost)}</td>
                    <td><span class="status-badge status-${workOrder.status}">${workOrder.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="viewWorkOrderDetails('${workOrder.id}')">View</button>
                            <button class="btn btn-primary" onclick="editWorkOrder('${workOrder.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteWorkOrder('${workOrder.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    return table;
}

function renderWorkOrdersList() {
    const container = document.getElementById('work-orders-list');
    if (workOrders.length === 0) {
        container.innerHTML = '<p class="empty-state">No work orders found. Create your first work order!</p>';
        return;
    }
    container.innerHTML = '';
    container.appendChild(buildWorkOrderTable(workOrders));
}

function viewWorkOrderDetails(id) {
    const workOrder = workOrders.find(w => w.id === id);
    if (!workOrder) return;
    
    const customer = customers.find(c => c.id === workOrder.customerId);
    const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
    
    let servicesList = '';
    workOrder.services.forEach(serviceId => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            servicesList += `- ${service.name}: ${formatCurrency(service.price)}\n`;
        }
    });
    
    const details = `
Work Order #${workOrder.id.substring(0, 8).toUpperCase()}
====================================
Date: ${new Date(workOrder.createdAt).toLocaleString()}
Status: ${workOrder.status.toUpperCase()}

Customer: ${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}
Email: ${customer ? customer.email : 'N/A'}
Phone: ${customer ? customer.phone : 'N/A'}

Vehicle: ${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}
License Plate: ${vehicle ? vehicle.plate : 'N/A'}

Services:
${servicesList}

Total Cost: ${formatCurrency(workOrder.totalCost)}
Labor Hours: ${workOrder.laborHours}
Parts Used: ${workOrder.partsUsed || 'None'}

Notes:
${workOrder.notes || 'No notes'}
    `;
    
    alert(details);
}

function deleteWorkOrder(id) {
    if (!confirm('Are you sure you want to delete this work order?')) return;
    
    workOrders = workOrders.filter(w => w.id !== id);
    saveData();
    renderWorkOrdersList();
    updateDashboard();
    showNotification('Work order deleted!', 'success');
}

function editWorkOrder(id) {
    const workOrder = workOrders.find(w => w.id === id);
    if (!workOrder) {
        alert('Work order not found');
        return;
    }
    
    // Reset and populate the form
    document.getElementById('work-order-form').reset();
    document.getElementById('work-order-id').value = workOrder.id;
    
    // Populate dropdowns first
    populateWorkOrderDropdowns();
    
    // Set customer and load vehicles
    document.getElementById('work-order-customer').value = workOrder.customerId;
    loadCustomerVehicles();
    
    // Set vehicle
    setTimeout(() => {
        document.getElementById('work-order-vehicle').value = workOrder.vehicleId;
        // Set technician after vehicle
        setTimeout(() => {
            document.getElementById('work-order-technician').value = workOrder.technicianId || '';
        }, 50);
    }, 100);

    // Set services (checkboxes)
    setTimeout(() => {
        document.querySelectorAll('.service-checkbox').forEach(checkbox => {
            checkbox.checked = workOrder.services.includes(checkbox.value);
        });
    }, 100);
    
    // Load parts
    workOrderParts = [];
    if (workOrder.parts && workOrder.parts.length > 0) {
        workOrder.parts.forEach(p => {
            const part = parts.find(pt => pt.id === p.partId);
            if (part) {
                workOrderParts.push({
                    partId: p.partId,
                    name: part.name,
                    quantity: p.quantity,
                    price: p.price,
                    total: p.quantity * p.price
                });
            }
        });
    }
    updateWorkOrderPartsList();
    
    // Set other fields
    document.getElementById('work-order-labor').value = workOrder.laborHours || 0;
    document.getElementById('work-order-notes').value = workOrder.notes || '';
    document.getElementById('work-order-status').value = workOrder.status;
    
    // Set completed date and toggle visibility
    const completedDateGroup = document.getElementById('completed-date-group');
    if (workOrder.status === 'completed') {
        completedDateGroup.style.display = 'block';
    } else {
        completedDateGroup.style.display = 'none';
    }
    document.getElementById('work-order-completed-date').value = workOrder.completedDate || '';
    
    // Open modal
    openModal('work-order-modal');
}

// Dashboard Functions
function updateDashboard() {
    // Update statistics
    document.getElementById('total-customers').textContent = customers.length;
    document.getElementById('total-vehicles').textContent = vehicles.length;
    
    // Count appointments today
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today && a.status === 'scheduled').length;
    document.getElementById('appointments-today').textContent = todayAppointments;
    
    // Count active work orders
    const activeWorkOrders = workOrders.filter(w => w.status === 'in-progress' || w.status === 'pending').length;
    document.getElementById('active-work-orders').textContent = activeWorkOrders;
    
    // Update recent activity
    updateRecentActivity();
    
    // Update upcoming appointments
    updateUpcomingAppointments();
}

function updateRecentActivity() {
    const container = document.getElementById('recent-activity');
    const activities = [];
    
    // Get recent activities from all data
    customers.forEach(c => activities.push({
        type: 'customer',
        action: 'added',
        name: `${c.firstName} ${c.lastName}`,
        date: new Date(c.createdAt),
        id: c.id
    }));
    
    vehicles.forEach(v => activities.push({
        type: 'vehicle',
        action: 'registered',
        name: `${v.year} ${v.make} ${v.model}`,
        date: new Date(v.createdAt),
        id: v.id
    }));
    
    workOrders.forEach(w => activities.push({
        type: 'workorder',
        action: 'created',
        name: `WO #${w.id.substring(0, 8).toUpperCase()}`,
        date: new Date(w.createdAt),
        id: w.id
    }));
    
    // Sort by date (newest first) and take top 5
    activities.sort((a, b) => b.date - a.date);
    const recentActivities = activities.slice(0, 5);
    
    if (recentActivities.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }
    
    container.innerHTML = `
        <ul style="list-style: none; padding: 0;">
            ${recentActivities.map(activity => {
                let onclickAction = '';
                let style = 'cursor: pointer; color: var(--primary-color);';
                
                switch(activity.type) {
                    case 'customer':
                        onclickAction = `editCustomer('${activity.id}')`;
                        break;
                    case 'vehicle':
                        onclickAction = `editVehicle('${activity.id}')`;
                        break;
                    case 'workorder':
                        onclickAction = `viewWorkOrder('${activity.id}')`;
                        break;
                }
                
                return `
                    <li style="padding: 0.75rem; border-bottom: 1px solid var(--border-color);">
                        <a href="#" onclick="event.preventDefault(); ${onclickAction}" style="${style} text-decoration: none;">
                            <strong>${activity.name}</strong>
                        </a> 
                        - ${activity.action} (${formatTimeAgo(activity.date)})
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

function updateUpcomingAppointments() {
    const container = document.getElementById('upcoming-appointments');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get upcoming appointments (today and future)
    const upcoming = appointments
        .filter(a => new Date(a.date) >= today && a.status === 'scheduled')
        .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
        .slice(0, 5);
    
    if (upcoming.length === 0) {
        container.innerHTML = '<p class="empty-state">No upcoming appointments</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Service</th>
            </tr>
        </thead>
        <tbody>
            ${upcoming.map(appointment => {
                const customer = customers.find(c => c.id === appointment.customerId);
                const service = services.find(s => s.id === appointment.serviceId);
                return `
                <tr>
                    <td>${formatDate(appointment.date)} ${appointment.time}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${service ? service.name : 'N/A'}</td>
                </tr>
            `;
            }).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

// Helper Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ===========================================
// PHONE NUMBER VALIDATION & FORMATTING
// Format enforced: +27 XX XXX XXXX
// ===========================================

/**
 * Format a phone number into +27 XX XXX XXXX
 * Accepts: 0721234567, 27721234567, +27721234567, +27 72 123 4567
 * Returns formatted string or null if invalid
 */
function formatSAPhone(raw) {
    // Strip everything except digits and leading +
    let digits = raw.replace(/\s/g, '');
    
    // Remove all non-digit chars for processing
    let nums = digits.replace(/\D/g, '');
    
    // Convert local format: 0XXXXXXXXX -> 27XXXXXXXXX
    if (nums.startsWith('0') && nums.length === 10) {
        nums = '27' + nums.substring(1);
    }
    
    // Remove country code prefix if already has 27
    if (nums.startsWith('27') && nums.length === 11) {
        // Good: 27XXXXXXXXX
    } else {
        return null; // Invalid
    }
    
    // Must be exactly 11 digits: 27 + 9 digits
    if (nums.length !== 11) return null;
    
    // Format: +27 XX XXX XXXX
    return `+${nums.substring(0,2)} ${nums.substring(2,4)} ${nums.substring(4,7)} ${nums.substring(7,11)}`;
}

/**
 * Validate and format phone input on-the-fly.
 * Call this on oninput of a phone field.
 */
function liveFormatPhone(input) {
    // Only reformat if user has typed enough to try
    const raw = input.value;
    const digits = raw.replace(/\D/g, '');
    
    // Auto-insert +27 prefix if user starts typing with 0
    if (raw === '0') {
        input.value = '+27 ';
        // Move cursor to end
        setTimeout(() => { input.setSelectionRange(input.value.length, input.value.length); }, 0);
        return;
    }
    
    // Remove invalid style once user starts correcting
    input.style.borderColor = '';
}

/**
 * Validate phone on blur - shows error style if invalid.
 * Returns true if valid, false if invalid.
 */
function validatePhoneField(input) {
    const val = input.value.trim();
    if (!val) {
        // Empty - let required attr handle it
        input.style.borderColor = '';
        input.title = '';
        return true;
    }
    const formatted = formatSAPhone(val);
    if (!formatted) {
        input.style.borderColor = '#e03131';
        input.style.boxShadow = '0 0 0 2px rgba(224,49,49,0.2)';
        input.title = 'Invalid format. Use: +27 72 768 0826';
        showNotification('Phone number must be in format: +27 72 768 0826', 'error');
        return false;
    }
    // Auto-correct to formatted version
    input.value = formatted;
    input.style.borderColor = '#2f9e44';
    input.style.boxShadow = '0 0 0 2px rgba(47,158,68,0.2)';
    input.title = '';
    return true;
}

/**
 * Get validated phone value from an input field.
 * Returns formatted value or shows error and returns null.
 */
function getValidatedPhone(inputId, required = true) {
    const input = document.getElementById(inputId);
    if (!input) return null;
    const val = input.value.trim();
    if (!val && !required) return '';
    if (!val && required) {
        input.style.borderColor = '#e03131';
        showNotification('Phone number is required', 'error');
        return null;
    }
    const formatted = formatSAPhone(val);
    if (!formatted) {
        input.style.borderColor = '#e03131';
        input.style.boxShadow = '0 0 0 2px rgba(224,49,49,0.2)';
        showNotification('Phone number must be in format: +27 72 768 0826', 'error');
        input.focus();
        return null;
    }
    input.value = formatted;
    return formatted;
}

function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('workOrders', JSON.stringify(workOrders));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    
    return formatDate(date);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'warning' ? 'var(--warning-color)' : 'var(--danger-color)'};
        color: white;
        border-radius: 6px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function populateCustomerDropdowns() {
    const customerSelect = document.getElementById('vehicle-customer');
    customerSelect.innerHTML = '<option value="">Select Customer</option>';
    customers.forEach(customer => {
        customerSelect.innerHTML += `<option value="${customer.id}">${customer.firstName} ${customer.lastName}</option>`;
    });
}

function initializeForms() {
    document.getElementById('customer-form').addEventListener('submit', saveCustomer);
    document.getElementById('vehicle-form').addEventListener('submit', saveVehicle);
    document.getElementById('service-form').addEventListener('submit', saveService);
    document.getElementById('appointment-form').addEventListener('submit', saveAppointment);
    document.getElementById('work-order-form').addEventListener('submit', saveWorkOrder);
    document.getElementById('technician-form').addEventListener('submit', saveTechnician);
    document.getElementById('expense-form').addEventListener('submit', saveExpense);
}

function initializeSearch() {
    // Customer search
    document.getElementById('customer-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCustomers = customers.filter(c => 
            c.firstName.toLowerCase().includes(searchTerm) ||
            c.lastName.toLowerCase().includes(searchTerm) ||
            c.email.toLowerCase().includes(searchTerm) ||
            c.phone.includes(searchTerm)
        );
        renderFilteredCustomers(filteredCustomers);
    });
    
    // Vehicle search
    document.getElementById('vehicle-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredVehicles = vehicles.filter(v => 
            v.make.toLowerCase().includes(searchTerm) ||
            v.model.toLowerCase().includes(searchTerm) ||
            v.plate.toLowerCase().includes(searchTerm)
        );
        renderFilteredVehicles(filteredVehicles);
    });
    
    // Appointment search
    document.getElementById('appointment-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredAppointments = appointments.filter(a => {
            const customer = customers.find(c => c.id === a.customerId);
            return customer && (
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                a.date.includes(searchTerm)
            );
        });
        renderFilteredAppointments(filteredAppointments);
    });
    
    // Work order search
    document.getElementById('work-order-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredWorkOrders = workOrders.filter(w => {
            const customer = customers.find(c => c.id === w.customerId);
            return customer && (
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                w.id.includes(searchTerm)
            );
        });
        renderFilteredWorkOrders(filteredWorkOrders);
    });

    // Expense search
    const expenseSearch = document.getElementById('expense-search');
    if (expenseSearch) {
        expenseSearch.addEventListener('input', renderExpensesList);
    }

    // Technician search
    const techSearch = document.getElementById('technician-search');
    if (techSearch) {
        techSearch.addEventListener('input', renderTechniciansList);
    }
}

function renderFilteredCustomers(filteredCustomers) {
    const container = document.getElementById('customers-list');
    
    if (filteredCustomers.length === 0) {
        container.innerHTML = '<p class="empty-state">No customers found matching your search.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredCustomers.map(customer => `
                <tr>
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editCustomer('${customer.id}')">Edit</button>
                            <button class="btn btn-success" onclick="viewCustomerVehicles('${customer.id}')">Vehicles</button>
                            <button class="btn btn-danger" onclick="deleteCustomer('${customer.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function renderFilteredVehicles(filteredVehicles) {
    const container = document.getElementById('vehicles-list');
    
    if (filteredVehicles.length === 0) {
        container.innerHTML = '<p class="empty-state">No vehicles found matching your search.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Vehicle</th>
                <th>License Plate</th>
                <th>Mileage (km)</th>
                <th>Customer</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredVehicles.map(vehicle => {
                const customer = customers.find(c => c.id === vehicle.customerId);
                const vImgs = vehicle.images && vehicle.images.length ? vehicle.images : (vehicle.image ? [vehicle.image] : []);
                const imageHTML = vImgs.length
                    ? `<div style="position:relative;display:inline-block">` +
                       `<img src="${vImgs[0]}" class="vehicle-thumbnail" onclick="showVehicleImages('${vehicle.id}')" alt="Vehicle Image">` +
                       (vImgs.length > 1 ? `<span style="position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;font-size:0.65rem;padding:1px 4px;border-radius:3px;">${vImgs.length}📷</span>` : '') +
                       `</div>`
                    : '<span style="color: var(--text-light); font-size: 0.8rem;">No image</span>';
                const mileage = vehicle.mileage ? vehicle.mileage.toLocaleString() : '0';
                return `
                <tr>
                    <td>${imageHTML}</td>
                    <td>${vehicle.year} ${vehicle.make} ${vehicle.model}</td>
                    <td>${vehicle.plate}</td>
                    <td>${mileage}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editVehicle('${vehicle.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteVehicle('${vehicle.id}')">Delete</button>
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

function renderFilteredAppointments(filteredAppointments) {
    const container = document.getElementById('appointments-list');
    
    if (filteredAppointments.length === 0) {
        container.innerHTML = '<p class="empty-state">No appointments found matching your search.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredAppointments.map(appointment => {
                const customer = customers.find(c => c.id === appointment.customerId);
                const vehicle = vehicles.find(v => v.id === appointment.vehicleId);
                const service = services.find(s => s.id === appointment.serviceId);
                return `
                <tr>
                    <td>${formatDate(appointment.date)} ${appointment.time}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</td>
                    <td>${service ? service.name : 'N/A'}</td>
                    <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-info" onclick="editAppointment('${appointment.id}')">Edit</button>
                            <button class="btn btn-success" onclick="completeAppointment('${appointment.id}')">Complete</button>
                            <button class="btn btn-warning" onclick="cancelAppointment('${appointment.id}')">Cancel</button>
                            <button class="btn btn-danger" onclick="deleteAppointment('${appointment.id}')">Delete</button>
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

function renderFilteredWorkOrders(filteredWorkOrders) {
    const container = document.getElementById('work-orders-list');
    if (filteredWorkOrders.length === 0) {
        container.innerHTML = '<p class="empty-state">No work orders found matching your search.</p>';
        return;
    }
    container.innerHTML = '';
    container.appendChild(buildWorkOrderTable(filteredWorkOrders));
}

function renderAllLists() {
    renderCustomersList();
    renderVehiclesList();
    renderServicesList();
    renderAppointmentsList();
    renderWorkOrdersList();
    renderPartsList();
    renderInvoicesList();
    renderExpensesList();
    renderTechniciansList();
    // Tech Knowledge Base
    if (typeof renderTechList === 'function') {
        renderTechList('article');
        renderTechList('bulletin');
        renderTechList('tip');
        updateTechSummary('article');
        updateTechSummary('bulletin');
        updateTechSummary('tip');
    }
}

// Load Sample Data
// Vehicle Image Functions
function addVehicleImages(input) {
    const MAX_IMAGES = 8;
    const files = Array.from(input.files);
    if (!files.length) return;

    const remaining = MAX_IMAGES - currentVehicleImages.length;
    if (remaining <= 0) {
        showNotification(`Maximum ${MAX_IMAGES} photos allowed per vehicle.`, 'error');
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
        const reader = new FileReader();
        reader.onload = function(e) {
            currentVehicleImages.push(e.target.result);
            loaded++;
            if (loaded === toLoad.length) renderVehicleImageGallery();
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}

function renderVehicleImageGallery() {
    const gallery = document.getElementById('vehicle-image-gallery');
    if (!gallery) return;

    const MAX_IMAGES = 8;
    let html = '';

    currentVehicleImages.forEach((src, idx) => {
        html += `
            <div class="image-gallery-item">
                <img src="${src}" alt="Vehicle photo ${idx+1}" onclick="openImageLightbox(currentVehicleImages, ${idx})">
                <button class="img-remove-btn" onclick="removeVehicleImage(${idx})" title="Remove">✕</button>
            </div>`;
    });

    if (currentVehicleImages.length < MAX_IMAGES) {
        html += `
            <div class="image-gallery-add" onclick="document.getElementById('vehicle-image').click()" title="Add photo">
                <span>📷</span><span>Add Photo</span>
            </div>`;
    }

    gallery.innerHTML = html;
}

function removeVehicleImage(idx) {
    if (confirm('Are you sure you want to remove this image?')) {
        currentVehicleImages.splice(idx, 1);
        renderVehicleImageGallery();
    }
}

function showVehicleImages(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;
    const imgs = vehicle.images && vehicle.images.length ? vehicle.images : (vehicle.image ? [vehicle.image] : []);
    if (!imgs.length) return;
    openImageLightbox(imgs, 0, `${vehicle.year} ${vehicle.make} ${vehicle.model}`);
}

// Keep legacy name as alias for backward compat
function showVehicleImage(id) { showVehicleImages(id); }


// ─── Universal Image Lightbox ────────────────────────────────────────────────
// Opens a full-screen lightbox to browse an array of images
let _lbImages = [];
let _lbIndex  = 0;

function openImageLightbox(images, startIndex, captionText) {
    _lbImages = images || [];
    _lbIndex  = startIndex || 0;
    if (!_lbImages.length) return;

    // Remove any existing lightbox
    const existing = document.getElementById('img-lightbox');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'img-lightbox';
    overlay.className = 'img-lightbox-overlay';
    overlay.innerHTML = `
        <button class="img-lightbox-close" onclick="document.getElementById('img-lightbox').remove()" title="Close">&times;</button>
        <img id="lb-img" src="${_lbImages[_lbIndex]}" alt="Image ${_lbIndex+1}">
        <div class="img-lightbox-nav" ${_lbImages.length < 2 ? 'style="display:none"' : ''}>
            <button onclick="lbNav(-1)">&#8249; Prev</button>
            <span class="img-lightbox-counter" id="lb-counter">${_lbIndex+1} / ${_lbImages.length}</span>
            <button onclick="lbNav(1)">Next &#8250;</button>
        </div>
        ${captionText ? `<p style="color:rgba(255,255,255,0.8);font-size:0.9rem;margin:0">${captionText}</p>` : ''}
    `;

    // Close on overlay background click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
}

function lbNav(dir) {
    _lbIndex = (_lbIndex + dir + _lbImages.length) % _lbImages.length;
    const img = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');
    if (img) img.src = _lbImages[_lbIndex];
    if (counter) counter.textContent = `${_lbIndex+1} / ${_lbImages.length}`;
}
// ─────────────────────────────────────────────────────────────────────────────

function loadSampleData() {
    // Only load sample data if no data exists
    if (customers.length > 0 || services.length > 0) {
        return;
    }
    
    // Sample Services
    const sampleServices = [
        { id: generateId(), name: 'Oil Change', description: 'Standard oil change with filter replacement', price: 49.99, estimatedTime: 0.5 },
        { id: generateId(), name: 'Brake Inspection', description: 'Complete brake system inspection', price: 29.99, estimatedTime: 0.5 },
        { id: generateId(), name: 'Tire Rotation', description: 'Rotate tires for even wear', price: 35.00, estimatedTime: 0.5 },
        { id: generateId(), name: 'Engine Tune-up', description: 'Complete engine tune-up and diagnostics', price: 149.99, estimatedTime: 2 },
        { id: generateId(), name: 'Air Filter Replacement', description: 'Replace engine air filter', price: 24.99, estimatedTime: 0.25 },
        { id: generateId(), name: 'Battery Replacement', description: 'Remove and install new battery', price: 89.99, estimatedTime: 0.5 }
    ];
    
    services = sampleServices;
    
    // Sample Customers
    const sampleCustomers = [
        { id: generateId(), firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', address: '123 Main St, City, ST 12345', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: generateId(), firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@email.com', phone: '(555) 234-5678', address: '456 Oak Ave, Town, ST 67890', createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: generateId(), firstName: 'Mike', lastName: 'Johnson', email: 'mike.j@email.com', phone: '(555) 345-6789', address: '789 Pine Rd, Village, ST 13579', createdAt: new Date(Date.now() - 259200000).toISOString() }
    ];
    
    customers = sampleCustomers;
    
    // Sample Vehicles
    const sampleVehicles = [
        { id: generateId(), customerId: customers[0].id, make: 'Toyota', model: 'Camry', year: 2020, plate: 'ABC-1234', vin: '1HGCM82633A123456', color: 'Silver', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: generateId(), customerId: customers[1].id, make: 'Honda', model: 'Civic', year: 2019, plate: 'XYZ-5678', vin: '2HGES16578H123456', color: 'Blue', createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: generateId(), customerId: customers[2].id, make: 'Ford', model: 'F-150', year: 2021, plate: 'DEF-9012', vin: '1FTEW1EP4JKF123456', color: 'Black', createdAt: new Date(Date.now() - 259200000).toISOString() }
    ];
    
    vehicles = sampleVehicles;
    
    // Sample Appointment
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const sampleAppointment = {
        id: generateId(),
        customerId: customers[0].id,
        vehicleId: vehicles[0].id,
        serviceId: services[0].id,
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        notes: 'Regular maintenance',
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(sampleAppointment);
    
    // Sample Work Order
    const sampleWorkOrder = {
        id: generateId(),
        customerId: customers[1].id,
        vehicleId: vehicles[1].id,
        services: [services[0].id, services[2].id],
        parts: [],
        laborHours: 1,
        partsUsed: 'Oil filter - R15.00',
        notes: 'Customer requested full service',
        status: 'completed',
        totalCost: 49.99 + 35.00,
        createdAt: new Date(Date.now() - 3600000).toISOString()
    };
    
    workOrders.push(sampleWorkOrder);
    
    saveData();
    updateDashboard();
    renderAllLists();
}

// Update all currency displays to use the global currency setting
function updateAllCurrencyDisplays() {
    // This function re-renders all lists to update currency displays
    // when the global currency setting changes
    renderServicesList();
    renderWorkOrdersList();
    renderAppointmentsList();
}

// Work Order Parts Management
let workOrderParts = [];



function updateWorkOrderPartsList() {
    const container = document.getElementById('work-order-parts-list');
    const hiddenInput = document.getElementById('work-order-parts');
    
    if (workOrderParts.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); font-size: 0.9rem;">No parts added</p>';
        hiddenInput.value = '';
        return;
    }
    
    container.innerHTML = workOrderParts.map((p, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: var(--bg-color); border-radius: 4px; margin-bottom: 0.5rem;">
            <span>${p.name} x ${p.quantity}</span>
            <span>
                ${formatCurrency(p.total)}
                <button type="button" class="btn btn-danger" style="padding: 0.2rem 0.5rem; margin-left: 0.5rem;" onclick="removePartFromWorkOrder(${index})">×</button>
            </span>
        </div>
    `).join('');
    
    // Update hidden input with parts summary
    hiddenInput.value = workOrderParts.map(p => `${p.name} x${p.quantity} - ${formatCurrency(p.total)}`).join(', ');
}

function removePartFromWorkOrder(index) {
    workOrderParts.splice(index, 1);
    updateWorkOrderPartsList();
}

// Part Selection Modal Functions
let selectedPartsForWorkOrder = {};

function openAddPartToWorkOrder() {
    if (typeof parts === 'undefined' || parts.length === 0) {
        alert('No parts available. Please add parts in the Parts section first.');
        return;
    }
    
    // Reset selection
    selectedPartsForWorkOrder = {};
    
    // Populate the part selection grid
    renderPartSelectionGrid();
    
    // Open the modal
    document.getElementById('select-part-modal').classList.add('active');
}

function renderPartSelectionGrid(filteredParts = null) {
    const grid = document.getElementById('part-selection-grid');
    const partsToRender = filteredParts || parts;
    
    if (partsToRender.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No parts found</p>';
        return;
    }
    
    grid.innerHTML = partsToRender.map(part => {
        const isSelected = selectedPartsForWorkOrder[part.id];
        const stockClass = part.stockQuantity <= 5 ? 'low' : 'good';
        
        return `
            <div class="part-selection-card ${isSelected ? 'selected' : ''}" onclick="togglePartSelection('${part.id}')">
                <div class="part-selection-card-header">
                    <h4>${part.name}</h4>
                    ${part.sku ? `<span class="part-sku">${part.sku}</span>` : ''}
                </div>
                <div class="part-selection-card-body">
                    ${part.description ? `<p>${part.description.substring(0, 50)}${part.description.length > 50 ? '...' : ''}</p>` : '<p>No description</p>'}
                </div>
                <div class="part-selection-card-footer">
                    <span class="price">${formatCurrency(part.sellingPrice)}</span>
                    <span class="stock ${stockClass}">Stock: ${part.stockQuantity}</span>
                </div>
                ${isSelected ? `
                    <div class="part-selection-quantity" onclick="event.stopPropagation()">
                        <label>Qty:</label>
                        <input type="number" min="1" max="${part.stockQuantity}" value="${selectedPartsForWorkOrder[part.id].quantity}" 
                               onchange="updatePartSelectionQty('${part.id}', this.value)">
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function togglePartSelection(partId) {
    const part = parts.find(p => p.id === partId);
    if (!part) return;
    
    if (selectedPartsForWorkOrder[partId]) {
        delete selectedPartsForWorkOrder[partId];
    } else {
        if (part.stockQuantity <= 0) {
            alert('This part is out of stock');
            return;
        }
        selectedPartsForWorkOrder[partId] = {
            partId: part.id,
            name: part.name,
            quantity: 1,
            price: part.sellingPrice,
            maxStock: part.stockQuantity
        };
    }
    
    renderPartSelectionGrid();
    updateSelectedPartsSummary();
}

function updatePartSelectionQty(partId, qty) {
    const quantity = parseInt(qty);
    if (!selectedPartsForWorkOrder[partId]) return;
    
    if (quantity < 1) {
        delete selectedPartsForWorkOrder[partId];
        renderPartSelectionGrid();
    } else if (quantity > selectedPartsForWorkOrder[partId].maxStock) {
        alert(`Maximum available stock: ${selectedPartsForWorkOrder[partId].maxStock}`);
    } else {
        selectedPartsForWorkOrder[partId].quantity = quantity;
    }
    updateSelectedPartsSummary();
}

function updateSelectedPartsSummary() {
    const summary = document.getElementById('selected-parts-summary');
    const selectedCount = Object.keys(selectedPartsForWorkOrder).length;
    
    if (selectedCount === 0) {
        summary.innerHTML = '<span>No parts selected</span>';
    } else {
        const totalQty = Object.values(selectedPartsForWorkOrder).reduce((sum, p) => sum + p.quantity, 0);
        const totalAmount = Object.values(selectedPartsForWorkOrder).reduce((sum, p) => sum + (p.quantity * p.price), 0);
        summary.innerHTML = `<strong>${selectedCount}</strong> part(s) selected | Total: <strong>${formatCurrency(totalAmount)}</strong>`;
    }
}

function filterPartsForSelection() {
    const searchTerm = document.getElementById('part-selection-search').value.toLowerCase();
    
    if (!searchTerm) {
        renderPartSelectionGrid();
        return;
    }
    
    const filtered = parts.filter(part => 
        part.name.toLowerCase().includes(searchTerm) || 
        (part.sku && part.sku.toLowerCase().includes(searchTerm))
    );
    renderPartSelectionGrid(filtered);
}

function confirmPartSelection() {
    const selectedCount = Object.keys(selectedPartsForWorkOrder).length;
    
    if (selectedCount === 0) {
        alert('Please select at least one part');
        return;
    }
    
    // Add selected parts to work order
    Object.values(selectedPartsForWorkOrder).forEach(p => {
        workOrderParts.push({
            partId: p.partId,
            name: p.name,
            quantity: p.quantity,
            price: p.price,
            total: p.quantity * p.price
        });
    });
    
    // Update the display
    updateWorkOrderPartsList();
    
    // Close modal
    closeModal('select-part-modal');
    
    // Reset selection
    selectedPartsForWorkOrder = {};
}

// ==========================================
// PARTS RETURNS FUNCTIONALITY
// ==========================================

let partsReturns = [];

function initPartsReturns() {
    // Load returns from localStorage
    const savedReturns = localStorage.getItem('partsReturns');
    if (savedReturns) {
        partsReturns = JSON.parse(savedReturns);
    }
    
    // Initialize form handler
    const returnForm = document.getElementById('return-form');
    if (returnForm) {
        returnForm.addEventListener('submit', saveReturn);
    }
    
    renderReturnsList();
    updateReturnsSummary();
}

function openReturnModal() {
    document.getElementById('return-form').reset();
    document.getElementById('return-id').value = '';
    document.getElementById('return-part-details').innerHTML = '<p style="color: var(--text-light);">Select a part to see details</p>';
    populateReturnDropdowns();
    openModal('return-modal');
}

function populateReturnDropdowns() {
    // Populate parts dropdown
    const partSelect = document.getElementById('return-part');
    partSelect.innerHTML = '<option value="">Select Part</option>';
    parts.forEach(part => {
        partSelect.innerHTML += `<option value="${part.id}">${part.name} (${part.sku || 'No SKU'}) - Stock: ${part.stockQuantity}</option>`;
    });
    
    // Populate work orders dropdown
    const workOrderSelect = document.getElementById('return-work-order');
    workOrderSelect.innerHTML = '<option value="">None</option>';
    workOrders.forEach(wo => {
        const customer = customers.find(c => c.id === wo.customerId);
        workOrderSelect.innerHTML += `<option value="${wo.id}">WO #${wo.id.substring(0, 8).toUpperCase()} - ${customer ? customer.firstName + ' ' + customer.lastName : 'N/A'}</option>`;
    });
}

function loadPartDetails() {
    const partId = document.getElementById('return-part').value;
    const detailsDiv = document.getElementById('return-part-details');
    const quantityInput = document.getElementById('return-quantity');
    const refundInput = document.getElementById('return-refund-amount');
    
    if (!partId) {
        detailsDiv.innerHTML = '<p style="color: var(--text-light);">Select a part to see details</p>';
        return;
    }
    
    const part = parts.find(p => p.id === partId);
    if (!part) {
        detailsDiv.innerHTML = '<p style="color: red;">Part not found</p>';
        return;
    }
    
    detailsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <div><strong>Name:</strong> ${part.name}</div>
            <div><strong>SKU:</strong> ${part.sku || 'N/A'}</div>
            <div><strong>Cost Price:</strong> ${formatCurrency(part.costPrice)}</div>
            <div><strong>Selling Price:</strong> ${formatCurrency(part.sellingPrice)}</div>
            <div><strong>Current Stock:</strong> ${part.stockQuantity}</div>
            <div><strong>Supplier:</strong> ${part.supplier || 'N/A'}</div>
        </div>
    `;
    
    // Set max quantity and suggest refund amount
    quantityInput.max = part.stockQuantity;
    quantityInput.value = 1;
    refundInput.value = part.costPrice;
}

function saveReturn(e) {
    e.preventDefault();
    
    const partId = document.getElementById('return-part').value;
    const part = parts.find(p => p.id === partId);
    
    if (!part) {
        alert('Please select a valid part');
        return;
    }
    
    const quantity = parseInt(document.getElementById('return-quantity').value);
    if (quantity > part.stockQuantity) {
        alert(`Cannot return more than available stock (${part.stockQuantity})`);
        return;
    }
    
    const returnType = document.getElementById('return-type').value;
    const returnItem = {
        id: document.getElementById('return-id').value || generateId(),
        partId: partId,
        partName: part.name,
        partSku: part.sku || 'N/A',
        quantity: quantity,
        returnType: returnType,
        reason: document.getElementById('return-reason').value,
        workOrderId: document.getElementById('return-work-order').value,
        notes: document.getElementById('return-notes').value,
        refundAmount: parseFloat(document.getElementById('return-refund-amount').value) || 0,
        status: 'processed',
        createdAt: new Date().toISOString()
    };
    
    // Update part stock if restocking
    if (returnType === 'restock') {
        part.stockQuantity += quantity;
    }
    
    // Save return
    const existingIndex = partsReturns.findIndex(r => r.id === returnItem.id);
    if (existingIndex >= 0) {
        partsReturns[existingIndex] = returnItem;
    } else {
        partsReturns.push(returnItem);
    }
    
    // Save to localStorage
    localStorage.setItem('partsReturns', JSON.stringify(partsReturns));
    saveData();
    
    closeModal('return-modal');
    renderReturnsList();
    updateReturnsSummary();
    renderPartsList();
    showNotification('Return processed successfully!', 'success');
}

function renderReturnsList() {
    const container = document.getElementById('returns-list');
    if (!container) return;
    
    if (partsReturns.length === 0) {
        container.innerHTML = '<p class="empty-state">No returns processed yet.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedReturns = [...partsReturns].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Return #</th>
                <th>Date</th>
                <th>Part</th>
                <th>Qty</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Refund</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedReturns.map(ret => `
                <tr>
                    <td>#${ret.id.substring(0, 8).toUpperCase()}</td>
                    <td>${formatDate(ret.createdAt)}</td>
                    <td>${ret.partName}<br><small style="color: var(--text-light);">${ret.partSku}</small></td>
                    <td>${ret.quantity}</td>
                    <td><span class="return-type-badge ${ret.returnType}">${ret.returnType}</span></td>
                    <td>${formatReason(ret.reason)}</td>
                    <td>${formatCurrency(ret.refundAmount)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="viewReturnDetails('${ret.id}')">View</button>
                            <button class="btn btn-danger" onclick="deleteReturn('${ret.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

function formatReason(reason) {
    const reasons = {
        'wrong-part': 'Wrong Part',
        'defective': 'Defective/Damaged',
        'customer-cancelled': 'Customer Cancelled',
        'overstock': 'Overstock',
        'warranty': 'Warranty Claim',
        'other': 'Other'
    };
    return reasons[reason] || reason;
}

function updateReturnsSummary() {
    const countEl = document.getElementById('total-returns-count');
    const valueEl = document.getElementById('total-returns-value');
    
    if (countEl) {
        countEl.textContent = partsReturns.length;
    }
    
    if (valueEl) {
        const totalValue = partsReturns.reduce((sum, r) => sum + r.refundAmount, 0);
        valueEl.textContent = formatCurrency(totalValue);
    }
}

function viewReturnDetails(id) {
    const ret = partsReturns.find(r => r.id === id);
    if (!ret) return;
    
    const workOrder = workOrders.find(w => w.id === ret.workOrderId);
    const part = parts.find(p => p.id === ret.partId);
    
    const details = `
Return #${ret.id.substring(0, 8).toUpperCase()}
====================================
Date: ${new Date(ret.createdAt).toLocaleString()}

Part: ${ret.partName}
SKU: ${ret.partSku}
Quantity: ${ret.quantity}

Type: ${ret.returnType.toUpperCase()}
Reason: ${formatReason(ret.reason)}
Refund Amount: ${formatCurrency(ret.refundAmount)}

Work Order: ${workOrder ? `#${workOrder.id.substring(0, 8).toUpperCase()}` : 'None'}
Notes: ${ret.notes || 'No notes'}

Part Details:
- Cost Price: ${part ? formatCurrency(part.costPrice) : 'N/A'}
- Selling Price: ${part ? formatCurrency(part.sellingPrice) : 'N/A'}
- Current Stock: ${part ? part.stockQuantity : 'N/A'}
    `;
    
    alert(details);
}

function deleteReturn(id) {
    if (!confirm('Are you sure you want to delete this return record?')) return;
    
    const ret = partsReturns.find(r => r.id === id);
    
    // If it was a restock, reduce the stock back
    if (ret && ret.returnType === 'restock') {
        const part = parts.find(p => p.id === ret.partId);
        if (part) {
            part.stockQuantity = Math.max(0, part.stockQuantity - ret.quantity);
        }
    }
    
    partsReturns = partsReturns.filter(r => r.id !== id);
    localStorage.setItem('partsReturns', JSON.stringify(partsReturns));
    saveData();
    
    renderReturnsList();
    updateReturnsSummary();
    renderPartsList();
    showNotification('Return record deleted!', 'success');
}
// ===========================================
// REPORTS FUNCTIONALITY
// ===========================================

function handlePeriodChange() {
    const period = document.getElementById('report-period').value;
    const customRange = document.getElementById('custom-date-range');
    
    if (period === 'custom') {
        customRange.style.display = 'flex';
    } else {
        customRange.style.display = 'none';
    }
}

function getReportDateRange() {
    const period = document.getElementById('report-period').value;
    const today = new Date();
    let startDate, endDate;
    
    switch (period) {
        case 'this-month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        case 'last-month':
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
        case 'this-quarter':
            const quarterStart = Math.floor(today.getMonth() / 3) * 3;
            startDate = new Date(today.getFullYear(), quarterStart, 1);
            endDate = new Date(today.getFullYear(), quarterStart + 3, 0);
            break;
        case 'last-quarter':
            const lastQuarterStart = Math.floor(today.getMonth() / 3) * 3 - 3;
            startDate = new Date(today.getFullYear(), lastQuarterStart, 1);
            endDate = new Date(today.getFullYear(), lastQuarterStart + 3, 0);
            break;
        case 'this-year':
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31);
            break;
        case 'last-year':
            startDate = new Date(today.getFullYear() - 1, 0, 1);
            endDate = new Date(today.getFullYear() - 1, 11, 31);
            break;
        case 'custom':
            const fromVal = document.getElementById('report-from-date').value;
            const toVal = document.getElementById('report-to-date').value;
            if (!fromVal || !toVal) {
                alert('Please select both from and to dates');
                return null;
            }
            startDate = new Date(fromVal);
            endDate = new Date(toVal);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'all-time':
        default:
            startDate = new Date(0);
            endDate = new Date();
            break;
    }
    
    return { startDate, endDate };
}

function generateReports() {
    try {
        console.log('generateReports called');
        const dateRange = getReportDateRange();
        if (!dateRange) return;
        
        const { startDate, endDate } = dateRange;
        console.log('Date range:', startDate, 'to', endDate);
        
        // Get invoices within date range - reload from localStorage
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        console.log('Total invoices:', invoices.length);
    const filteredInvoices = invoices.filter(inv => {
        // Use createdAt if date is not available
        const invDate = new Date(inv.date || inv.createdAt);
        return invDate >= startDate && invDate <= endDate;
    });
    console.log('Filtered invoices:', filteredInvoices.length);
    
    // Calculate cashflow data
    generateCashflowReport(filteredInvoices, startDate, endDate);
    
    // Calculate profit & loss data
    generateProfitLossReport(filteredInvoices, startDate, endDate);
    
    showNotification('Reports generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating reports:', error);
        showNotification('Error generating reports: ' + error.message, 'error');
    }
}

function generateCashflowReport(invoices, startDate, endDate) {
    console.log('generateCashflowReport called with', invoices.length, 'invoices');
    
    // Calculate inflows from ALL invoices (not just paid - for revenue tracking)
    // For cashflow, we show both total revenue and paid invoices
    const paidInvoices = invoices.filter(inv => inv.status === 'paid' || inv.paidDate || inv.status === 'Paid');
    console.log('Paid invoices:', paidInvoices.length);
    console.log('Total invoices for revenue:', invoices.length);
    
    let totalInflows = 0;
    let inflowsList = [];
    
    // Use all invoices for total revenue
    invoices.forEach(inv => {
        const amount = parseFloat(inv.total) || 0;
        totalInflows += amount;
        
        // Get customer name - check both customers array and invoice's customerName
        let customerName = 'Unknown';
        if (inv.customerName) {
            customerName = inv.customerName;
        } else if (inv.customerId) {
            const customer = customers.find(c => c.id === inv.customerId);
            if (customer) {
                customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.name || 'Unknown';
            }
        }
        
        inflowsList.push({
            invoiceNumber: inv.invoiceNumber || inv.id.substring(0, 8).toUpperCase(),
            customerName: customerName,
            date: inv.paidDate || inv.date || inv.createdAt,
            amount: amount
        });
    });
    
    // Sort inflows by date
    inflowsList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Calculate outflows from expenses
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const filteredExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        // Parse date string (YYYY-MM-DD format) and create date at start of day
        const expDateParts = exp.date.split('T')[0].split('-');
        const expDate = new Date(parseInt(expDateParts[0]), parseInt(expDateParts[1]) - 1, parseInt(expDateParts[2]));
        const expDateTime = expDate.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return expDateTime >= startTime && expDateTime <= endTime;
    });
    
    let totalOutflows = 0;
    let outflowsList = [];
    
    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalOutflows += amount;
        outflowsList.push({
            description: exp.description || 'Expense',
            category: exp.category || 'General',
            date: exp.date,
            amount: amount
        });
    });
    
    // Sort outflows by date
    outflowsList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update UI
    document.getElementById('cashflow-inflows').textContent = formatCurrency(totalInflows);
    document.getElementById('cashflow-outflows').textContent = formatCurrency(totalOutflows);
    document.getElementById('cashflow-net').textContent = formatCurrency(totalInflows - totalOutflows);
    
    // Populate inflows table
    const inflowsTableBody = document.getElementById('cashflow-inflows-list');
    if (inflowsList.length === 0) {
        inflowsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No paid invoices in this period</td></tr>';
    } else {
        inflowsTableBody.innerHTML = inflowsList.map(item => `
            <tr>
                <td>${item.invoiceNumber}</td>
                <td>${item.customerName}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${formatCurrency(item.amount)}</td>
            </tr>
        `).join('');
    }
    
    // Populate outflows table
    const outflowsTableBody = document.getElementById('cashflow-outflows-list');
    if (outflowsList.length === 0) {
        outflowsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No expenses in this period</td></tr>';
    } else {
        outflowsTableBody.innerHTML = outflowsList.map(item => `
            <tr>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${formatCurrency(item.amount)}</td>
            </tr>
        `).join('');
    }
}

function generateProfitLossReport(invoices, startDate, endDate) {
    let totalRevenue = 0;
    let laborRevenue = 0;
    let partsRevenue = 0;
    let serviceRevenue = 0;
    
    invoices.forEach(inv => {
        // Add the invoice total to revenue
        totalRevenue += parseFloat(inv.total) || 0;
        
        // Add labor total if it exists (separate field on invoice)
        if (inv.laborTotal) {
            laborRevenue += parseFloat(inv.laborTotal) || 0;
        }
        
        // Calculate revenue from services (services use 'price' field, not 'total')
        if (inv.services && Array.isArray(inv.services)) {
            inv.services.forEach(item => {
                const amount = parseFloat(item.price) || 0;
                serviceRevenue += amount;
            });
        }
        
        // Calculate revenue from parts (parts have 'total' field)
        if (inv.parts && Array.isArray(inv.parts)) {
            inv.parts.forEach(item => {
                const amount = parseFloat(item.total) || 0;
                partsRevenue += amount;
            });
        }
        
        // Calculate revenue from custom items
        if (inv.customItems && Array.isArray(inv.customItems)) {
            inv.customItems.forEach(item => {
                const amount = parseFloat(item.total) || 0;
                if ((item.name || '').toLowerCase().includes('labor') || (item.description || '').toLowerCase().includes('labor')) {
                    laborRevenue += amount;
                } else if ((item.type || '') === 'part') {
                    partsRevenue += amount;
                } else {
                    serviceRevenue += amount;
                }
            });
        }
    });
    
    console.log('P&L - Total Revenue:', totalRevenue, 'Labor:', laborRevenue, 'Parts:', partsRevenue, 'Services:', serviceRevenue);
    
    // Calculate expenses
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    console.log('P&L - Total expenses in storage:', expenses.length);
    
    const filteredExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        // Parse date string (YYYY-MM-DD format) and create date at start of day
        const expDateParts = exp.date.split('T')[0].split('-');
        const expDate = new Date(parseInt(expDateParts[0]), parseInt(expDateParts[1]) - 1, parseInt(expDateParts[2]));
        // Set time to start/end of day for proper comparison
        const expDateTime = expDate.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return expDateTime >= startTime && expDateTime <= endTime;
    });
    
    console.log('P&L - Filtered expenses:', filteredExpenses.length);
    
    let totalExpenses = 0;
    const expenseCategories = {};
    
    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalExpenses += amount;
        
        const category = exp.category || 'Other';
        if (!expenseCategories[category]) {
            expenseCategories[category] = 0;
        }
        expenseCategories[category] += amount;
    });
    
    // Update UI
    document.getElementById('pnl-revenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('pnl-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('pnl-profit').textContent = formatCurrency(totalRevenue - totalExpenses);
    
    // Update revenue breakdown
    document.getElementById('revenue-labor').textContent = formatCurrency(laborRevenue);
    document.getElementById('revenue-parts').textContent = formatCurrency(partsRevenue);
    document.getElementById('revenue-services').textContent = formatCurrency(serviceRevenue);
    
    // Update expense breakdown
    const expenseBreakdown = document.getElementById('expense-breakdown');
    if (Object.keys(expenseCategories).length === 0) {
        expenseBreakdown.innerHTML = '<div class="breakdown-item"><span>No expenses in this period</span><span>R0.00</span></div>';
    } else {
        expenseBreakdown.innerHTML = Object.entries(expenseCategories)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => `
                <div class="breakdown-item">
                    <span>${category}</span>
                    <span>${formatCurrency(amount)}</span>
                </div>
            `).join('');
    }
}

function switchReportTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Show/hide report content
    document.querySelectorAll('.report-content').forEach(c => c.style.display = 'none');
    document.getElementById(`${tab}-report`).style.display = 'block';
}

// ==========================================
// REPORT DOWNLOAD FUNCTIONS
// ==========================================

function downloadReportPDF() {
    const dateRange = getReportDateRange();
    if (!dateRange) return;

    const { startDate, endDate } = dateRange;
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    const filteredInvoices = invoices.filter(inv => {
        const invDate = new Date(inv.date || inv.createdAt);
        return invDate >= startDate && invDate <= endDate;
    });

    const filteredExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= startDate && expDate <= endDate;
    });

    // Calculate totals
    let totalRevenue = 0;
    let totalExpenses = 0;
    let laborRevenue = 0;
    let partsRevenue = 0;
    let serviceRevenue = 0;

    filteredInvoices.forEach(inv => {
        totalRevenue += parseFloat(inv.total) || 0;
        laborRevenue += parseFloat(inv.laborTotal) || 0;
        if (inv.services) inv.services.forEach(s => serviceRevenue += parseFloat(s.price) || 0);
        if (inv.parts) inv.parts.forEach(p => partsRevenue += parseFloat(p.total) || 0);
    });

    filteredExpenses.forEach(exp => {
        totalExpenses += parseFloat(exp.amount) || 0;
    });

    const netProfit = totalRevenue - totalExpenses;
    const periodText = document.getElementById('report-period').value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Create PDF content
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Financial Report - ${periodText}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1e40af; margin-top: 30px; }
        .report-period { background: #f3f4f6; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px; }
        .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .summary-card.income { background: #dcfce7; }
        .summary-card.expense { background: #fee2e2; }
        .summary-card.net { background: #dbeafe; }
        .summary-card h4 { margin: 0 0 10px 0; font-size: 14px; }
        .summary-card p { margin: 0; font-size: 24px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        .breakdown { margin: 20px 0; }
        .breakdown-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <h1>NxtLevel Auto - Financial Report</h1>
    <div class="report-period">
        <strong>Report Period:</strong> ${periodText}<br>
        <strong>Generated:</strong> ${new Date().toLocaleString()}
    </div>

    <h2>Summary</h2>
    <div class="summary-grid">
        <div class="summary-card income">
            <h4>Total Revenue</h4>
            <p>${formatCurrency(totalRevenue)}</p>
        </div>
        <div class="summary-card expense">
            <h4>Total Expenses</h4>
            <p>${formatCurrency(totalExpenses)}</p>
        </div>
        <div class="summary-card net">
            <h4>Net Profit/Loss</h4>
            <p>${formatCurrency(netProfit)}</p>
        </div>
    </div>

    <h2>Revenue Breakdown</h2>
    <div class="breakdown">
        <div class="breakdown-item"><span>Labor Income</span><span>${formatCurrency(laborRevenue)}</span></div>
        <div class="breakdown-item"><span>Parts Sales</span><span>${formatCurrency(partsRevenue)}</span></div>
        <div class="breakdown-item"><span>Service Charges</span><span>${formatCurrency(serviceRevenue)}</span></div>
    </div>

    <h2>Revenue Transactions</h2>
    <table>
        <thead><tr><th>Invoice #</th><th>Customer</th><th>Date</th><th>Amount</th></tr></thead>
        <tbody>
            ${filteredInvoices.map(inv => `
                <tr>
                    <td>${inv.invoiceNumber || inv.id.substring(0, 8).toUpperCase()}</td>
                    <td>${inv.customerName || 'Unknown'}</td>
                    <td>${new Date(inv.date || inv.createdAt).toLocaleDateString()}</td>
                    <td>${formatCurrency(inv.total)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <h2>Expenses</h2>
    <table>
        <thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th></tr></thead>
        <tbody>
            ${filteredExpenses.map(exp => `
                <tr>
                    <td>${exp.description}</td>
                    <td>${exp.category}</td>
                    <td>${new Date(exp.date).toLocaleDateString()}</td>
                    <td>${formatCurrency(exp.amount)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="footer">
        Generated by NxtLevel Auto Management System
    </div>
</body>
</html>`;

    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.focus();

    // Trigger print dialog after a short delay
    setTimeout(() => {
        printWindow.print();
    }, 500);

    showNotification('PDF generated! Use the print dialog to save.', 'success');
}

function downloadReportExcel() {
    const dateRange = getReportDateRange();
    if (!dateRange) return;

    const { startDate, endDate } = dateRange;
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    const filteredInvoices = invoices.filter(inv => {
        const invDate = new Date(inv.date || inv.createdAt);
        return invDate >= startDate && invDate <= endDate;
    });

    const filteredExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= startDate && expDate <= endDate;
    });

    // Calculate totals
    let totalRevenue = 0;
    let totalExpenses = 0;

    filteredInvoices.forEach(inv => totalRevenue += parseFloat(inv.total) || 0);
    filteredExpenses.forEach(exp => totalExpenses += parseFloat(exp.amount) || 0);

    // Create CSV content
    let csvContent = "NxtLevel Auto - Financial Report\n";
    csvContent += `Report Period:,${document.getElementById('report-period').value}\n`;
    csvContent += `Generated:,${new Date().toLocaleString()}\n\n`;

    // Summary
    csvContent += "SUMMARY\n";
    csvContent += "Metric,Amount\n";
    csvContent += `Total Revenue,${totalRevenue.toFixed(2)}\n`;
    csvContent += `Total Expenses,${totalExpenses.toFixed(2)}\n`;
    csvContent += `Net Profit/Loss,${(totalRevenue - totalExpenses).toFixed(2)}\n\n`;

    // Revenue Transactions
    csvContent += "REVENUE TRANSACTIONS\n";
    csvContent += "Invoice Number,Customer,Date,Amount\n";
    filteredInvoices.forEach(inv => {
        csvContent += `"${inv.invoiceNumber || inv.id.substring(0, 8).toUpperCase()}","${inv.customerName || 'Unknown'}","${new Date(inv.date || inv.createdAt).toLocaleDateString()}",${inv.total}\n`;
    });
    csvContent += "\n";

    // Expenses
    csvContent += "EXPENSES\n";
    csvContent += "Description,Category,Date,Amount\n";
    filteredExpenses.forEach(exp => {
        csvContent += `"${exp.description}","${exp.category}","${new Date(exp.date).toLocaleDateString()}",${exp.amount}\n`;
    });

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    showNotification('Excel/CSV file downloaded!', 'success');
}

// ==========================================
// TECHNICIAN MANAGEMENT
// ==========================================

function openTechnicianModal() {
    document.getElementById('technician-form').reset();
    document.getElementById('technician-id').value = '';
    document.querySelector('#technician-modal .modal-header h2').textContent = 'Add Technician';
    openModal('technician-modal');
}

function saveTechnician(e) {
    e.preventDefault();

    const id = document.getElementById('technician-id').value || generateId();
    const existingTechnician = technicians.find(t => t.id === id);

    const technician = {
        id: id,
        firstName: document.getElementById('technician-first-name').value,
        lastName: document.getElementById('technician-last-name').value,
        email: document.getElementById('technician-email').value,
        phone: document.getElementById('technician-phone').value,
        specialization: document.getElementById('technician-specialization').value,
        hourlyRate: parseFloat(document.getElementById('technician-hourly-rate').value) || 0,
        status: document.getElementById('technician-status').value,
        notes: document.getElementById('technician-notes').value,
        createdAt: existingTechnician ? existingTechnician.createdAt : new Date().toISOString()
    };

    const existingIndex = technicians.findIndex(t => t.id === id);
    if (existingIndex >= 0) {
        technicians[existingIndex] = technician;
    } else {
        technicians.push(technician);
    }

    localStorage.setItem('technicians', JSON.stringify(technicians));
    closeModal('technician-modal');
    renderTechniciansList();
    populateTechnicianDropdowns();
    showNotification('Technician saved successfully!', 'success');
}

function renderTechniciansList() {
    const container = document.getElementById('technicians-list');
    const searchTerm = document.getElementById('technician-search').value.toLowerCase();

    let filteredTechnicians = technicians;
    if (searchTerm) {
        filteredTechnicians = technicians.filter(t =>
            t.firstName.toLowerCase().includes(searchTerm) ||
            t.lastName.toLowerCase().includes(searchTerm) ||
            (t.specialization && t.specialization.toLowerCase().includes(searchTerm))
        );
    }

    if (filteredTechnicians.length === 0) {
        container.innerHTML = '<p class="empty-state">No technicians found. Add your first technician!</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Hourly Rate</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredTechnicians.map(t => `
                <tr>
                    <td>${t.firstName} ${t.lastName}</td>
                    <td>${t.email || 'N/A'}</td>
                    <td>${t.phone || 'N/A'}</td>
                    <td>${t.specialization || 'N/A'}</td>
                    <td>${t.hourlyRate ? formatCurrency(t.hourlyRate) + '/hr' : 'N/A'}</td>
                    <td><span class="status-badge ${t.status}">${t.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editTechnician('${t.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteTechnician('${t.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    container.innerHTML = '';
    container.appendChild(table);
}

function editTechnician(id) {
    const technician = technicians.find(t => t.id === id);
    if (!technician) return;

    document.getElementById('technician-id').value = technician.id;
    document.getElementById('technician-first-name').value = technician.firstName;
    document.getElementById('technician-last-name').value = technician.lastName;
    document.getElementById('technician-email').value = technician.email || '';
    document.getElementById('technician-phone').value = technician.phone || '';
    document.getElementById('technician-specialization').value = technician.specialization || '';
    document.getElementById('technician-hourly-rate').value = technician.hourlyRate || '';
    document.getElementById('technician-status').value = technician.status || 'active';
    document.getElementById('technician-notes').value = technician.notes || '';

    document.querySelector('#technician-modal .modal-header h2').textContent = 'Edit Technician';
    openModal('technician-modal');
}

function deleteTechnician(id) {
    if (!confirm('Are you sure you want to delete this technician?')) return;

    technicians = technicians.filter(t => t.id !== id);
    localStorage.setItem('technicians', JSON.stringify(technicians));
    renderTechniciansList();
    populateTechnicianDropdowns();
    showNotification('Technician deleted successfully!', 'success');
}

function populateTechnicianDropdowns() {
    const selects = [
        document.getElementById('work-order-technician')
    ];

    selects.forEach(select => {
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Technician</option>';
        technicians.filter(t => t.status === 'active').forEach(t => {
            const option = document.createElement('option');
            option.value = t.id;
            option.textContent = `${t.firstName} ${t.lastName}${t.specialization ? ` (${t.specialization})` : ''}`;
            select.appendChild(option);
        });
        select.value = currentValue;
    });
}

// ==========================================
// EXPENSE MANAGEMENT
// ==========================================

function openExpenseModal() {
    document.getElementById('expense-form').reset();
    document.getElementById('expense-id').value = '';
    // Set today's date as default
    document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
    document.querySelector('#expense-modal .modal-header h2').textContent = 'Add Expense';
    openModal('expense-modal');
}

function saveExpense(e) {
    e.preventDefault();

    const id = document.getElementById('expense-id').value || generateId();
    const existingExpense = expenses.find(e => e.id === id);

    const expense = {
        id: id,
        description: document.getElementById('expense-description').value,
        category: document.getElementById('expense-category').value,
        amount: parseFloat(document.getElementById('expense-amount').value),
        date: document.getElementById('expense-date').value,
        paymentMethod: document.getElementById('expense-payment-method').value,
        vendor: document.getElementById('expense-vendor').value,
        reference: document.getElementById('expense-reference').value,
        notes: document.getElementById('expense-notes').value,
        createdAt: existingExpense ? existingExpense.createdAt : new Date().toISOString()
    };

    const existingIndex = expenses.findIndex(e => e.id === id);
    if (existingIndex >= 0) {
        expenses[existingIndex] = expense;
    } else {
        expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    closeModal('expense-modal');
    renderExpensesList();
    showNotification('Expense saved successfully!', 'success');
}

// Expense sorting state
let expenseSortColumn = 'date';
let expenseSortDirection = 'desc';

function sortExpenses(column) {
    if (expenseSortColumn === column) {
        expenseSortDirection = expenseSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        expenseSortColumn = column;
        expenseSortDirection = 'asc';
    }
    renderExpensesList();
}

function updateExpenseSummary() {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const monthTotal = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const yearTotal = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === thisYear;
    }).reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    // Average monthly (based on months with data)
    const monthsWithData = new Set(expenses.map(e => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${d.getMonth()}`;
    })).size || 1;
    const allTimeTotal = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const avgMonthly = allTimeTotal / monthsWithData;

    const el = id => document.getElementById(id);
    if (el('expense-month-total')) el('expense-month-total').textContent = formatCurrency(monthTotal);
    if (el('expense-year-total')) el('expense-year-total').textContent = formatCurrency(yearTotal);
    if (el('expense-count')) el('expense-count').textContent = expenses.length;
    if (el('expense-avg-monthly')) el('expense-avg-monthly').textContent = formatCurrency(avgMonthly);
}

function renderExpenseCategoryBreakdown(filteredExpenses) {
    const container = document.getElementById('expense-category-breakdown');
    if (!container) return;

    const categoryTotals = {};
    filteredExpenses.forEach(e => {
        const cat = e.category || 'Other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(e.amount) || 0);
    });

    const total = Object.values(categoryTotals).reduce((s, v) => s + v, 0);
    if (total === 0) { container.innerHTML = ''; return; }

    const colors = {
        'Parts & Supplies': '#3498db',
        'Tools & Equipment': '#2ecc71',
        'Rent & Utilities': '#e74c3c',
        'Salaries & Wages': '#9b59b6',
        'Vehicle Expenses': '#f39c12',
        'Insurance': '#1abc9c',
        'Marketing & Advertising': '#e67e22',
        'Office Supplies': '#34495e',
        'Professional Services': '#16a085',
        'Maintenance & Repairs': '#c0392b',
        'Other': '#95a5a6'
    };

    container.innerHTML = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .map(([cat, amt]) => {
            const pct = ((amt / total) * 100).toFixed(1);
            const color = colors[cat] || '#95a5a6';
            return `<div style="background:${color}15;border:1px solid ${color}40;border-radius:6px;padding:0.4rem 0.75rem;font-size:0.8rem;display:flex;flex-direction:column;gap:2px;">
                <span style="font-weight:600;color:${color};">${cat}</span>
                <span style="color:var(--text-color);">${formatCurrency(amt)} <span style="color:var(--text-light);">(${pct}%)</span></span>
            </div>`;
        }).join('');
}

function renderExpensesList() {
    const container = document.getElementById('expenses-list');
    const searchTerm = (document.getElementById('expense-search')?.value || '').toLowerCase();
    const filterCategory = document.getElementById('expense-filter-category')?.value || '';
    const filterMonth = document.getElementById('expense-filter-month')?.value || '';

    const now = new Date();

    let filteredExpenses = expenses.filter(e => {
        // Search filter
        if (searchTerm && !(
            e.description.toLowerCase().includes(searchTerm) ||
            e.category.toLowerCase().includes(searchTerm) ||
            (e.vendor && e.vendor.toLowerCase().includes(searchTerm)) ||
            (e.reference && e.reference.toLowerCase().includes(searchTerm))
        )) return false;

        // Category filter
        if (filterCategory && e.category !== filterCategory) return false;

        // Month filter
        if (filterMonth) {
            const d = new Date(e.date);
            if (filterMonth === 'this-month') {
                if (d.getMonth() !== now.getMonth() || d.getFullYear() !== now.getFullYear()) return false;
            } else if (filterMonth === 'last-month') {
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                if (d.getMonth() !== lastMonth.getMonth() || d.getFullYear() !== lastMonth.getFullYear()) return false;
            } else if (filterMonth === 'this-year') {
                if (d.getFullYear() !== now.getFullYear()) return false;
            }
        }

        return true;
    });

    // Update summary & breakdown
    updateExpenseSummary();
    renderExpenseCategoryBreakdown(filteredExpenses);

    if (filteredExpenses.length === 0) {
        container.innerHTML = '<p class="empty-state">No expenses found. Add your first expense!</p>';
        return;
    }

    // Sort
    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        let aVal, bVal;
        switch (expenseSortColumn) {
            case 'date':
                aVal = new Date(a.date).getTime();
                bVal = new Date(b.date).getTime();
                break;
            case 'description':
                aVal = (a.description || '').toLowerCase();
                bVal = (b.description || '').toLowerCase();
                break;
            case 'category':
                aVal = (a.category || '').toLowerCase();
                bVal = (b.category || '').toLowerCase();
                break;
            case 'vendor':
                aVal = (a.vendor || '').toLowerCase();
                bVal = (b.vendor || '').toLowerCase();
                break;
            case 'payment':
                aVal = (a.paymentMethod || '').toLowerCase();
                bVal = (b.paymentMethod || '').toLowerCase();
                break;
            case 'amount':
                aVal = parseFloat(a.amount) || 0;
                bVal = parseFloat(b.amount) || 0;
                break;
            default:
                aVal = new Date(a.date).getTime();
                bVal = new Date(b.date).getTime();
        }
        if (expenseSortDirection === 'asc') {
            return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
        } else {
            return typeof aVal === 'string' ? bVal.localeCompare(aVal) : bVal - aVal;
        }
    });

    // Calculate total
    const total = sortedExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const sortIndicator = (col) => expenseSortColumn === col ? (expenseSortDirection === 'asc' ? '<span class="sort-arrow">▲</span>' : '<span class="sort-arrow">▼</span>') : '';

    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable" onclick="sortExpenses('date')">Date${sortIndicator('date')}</th>
                <th class="sortable" onclick="sortExpenses('description')">Description${sortIndicator('description')}</th>
                <th class="sortable" onclick="sortExpenses('category')">Category${sortIndicator('category')}</th>
                <th class="sortable" onclick="sortExpenses('vendor')">Vendor${sortIndicator('vendor')}</th>
                <th class="sortable" onclick="sortExpenses('payment')">Payment${sortIndicator('payment')}</th>
                <th class="sortable" onclick="sortExpenses('amount')">Amount${sortIndicator('amount')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedExpenses.map(e => `
                <tr>
                    <td>${formatDate(e.date)}</td>
                    <td>
                        <strong>${e.description}</strong>
                        ${e.reference ? `<br><span style="font-size:0.75rem;color:var(--text-light);">Ref: ${e.reference}</span>` : ''}
                        ${e.notes ? `<br><span style="font-size:0.75rem;color:var(--text-light);">${e.notes}</span>` : ''}
                    </td>
                    <td><span style="background:var(--bg-secondary);padding:2px 8px;border-radius:12px;font-size:0.8rem;">${e.category}</span></td>
                    <td>${e.vendor || '<span style="color:var(--text-light)">N/A</span>'}</td>
                    <td>${e.paymentMethod || '<span style="color:var(--text-light)">N/A</span>'}</td>
                    <td style="font-weight:600;color:var(--danger-color);">${formatCurrency(e.amount)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editExpense('${e.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteExpense('${e.id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot>
            <tr style="background:var(--bg-secondary);font-weight:700;">
                <td colspan="5" style="padding:0.75rem;text-align:right;">Total (${sortedExpenses.length} record${sortedExpenses.length !== 1 ? 's' : ''})</td>
                <td style="padding:0.75rem;color:var(--danger-color);font-size:1.05rem;">${formatCurrency(total)}</td>
                <td></td>
            </tr>
        </tfoot>
    `;

    container.innerHTML = '';
    container.appendChild(table);
}

function editExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;

    document.getElementById('expense-id').value = expense.id;
    document.getElementById('expense-description').value = expense.description;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-date').value = expense.date;
    document.getElementById('expense-payment-method').value = expense.paymentMethod || 'Cash';
    document.getElementById('expense-vendor').value = expense.vendor || '';
    document.getElementById('expense-reference').value = expense.reference || '';
    document.getElementById('expense-notes').value = expense.notes || '';

    document.querySelector('#expense-modal .modal-header h2').textContent = 'Edit Expense';
    openModal('expense-modal');
}

function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpensesList();
    showNotification('Expense deleted successfully!', 'success');
}
