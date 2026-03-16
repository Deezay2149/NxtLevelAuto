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
let services = JSON.parse(localStorage.getItem('services')) || [];
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let workOrders = JSON.parse(localStorage.getItem('workOrders')) || [];

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
    
    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // If location denied, use default (Johannesburg)
                fetchWeather(defaultLat, defaultLon);
            }
        );
    } else {
        fetchWeather(defaultLat, defaultLon);
    }
}

async function fetchWeather(lat, lon) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    
    try {
        // Using Open-Meteo API (free, no API key required)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`
        );
        
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        const currentWeather = data.current_weather;
        
        // Update temperature
        weatherTemp.textContent = `${Math.round(currentWeather.temperature)}°C`;
        
        // Update icon based on weather code
        weatherIcon.textContent = getWeatherIcon(currentWeather.weathercode, currentWeather.is_day);
        
    } catch (error) {
        console.error('Weather error:', error);
        weatherTemp.textContent = '--°C';
        weatherIcon.textContent = '🌡️';
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
    
    const id = document.getElementById('customer-id').value || generateId();
    const customer = {
        id: id,
        firstName: document.getElementById('customer-firstname').value,
        lastName: document.getElementById('customer-lastname').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
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
            ${customers.map(customer => `
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
function openVehicleModal() {
    document.getElementById('vehicle-form').reset();
    document.getElementById('vehicle-id').value = '';
    currentVehicleImageData = null;
    document.getElementById('vehicle-image-preview').innerHTML = '';
    populateCustomerDropdowns();
    populateBrandDropdown();
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

let currentVehicleImageData = null;

function saveVehicle(e) {
    e.preventDefault();
    
    const id = document.getElementById('vehicle-id').value || generateId();
    const existingVehicle = vehicles.find(v => v.id === id);
    
    const vehicle = {
        id: id,
        customerId: document.getElementById('vehicle-customer').value,
        make: document.getElementById('vehicle-make').value,
        model: document.getElementById('vehicle-model').value,
        year: parseInt(document.getElementById('vehicle-year').value),
        plate: document.getElementById('vehicle-plate').value,
        vin: document.getElementById('vehicle-vin').value,
        color: document.getElementById('vehicle-color').value,
        mileage: parseInt(document.getElementById('vehicle-mileage').value) || 0,
        lastServiceMileage: parseInt(document.getElementById('vehicle-last-service-mileage').value) || 0,
        image: currentVehicleImageData || (existingVehicle ? existingVehicle.image : null),
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
    currentVehicleImageData = null;
}

function renderVehiclesList() {
    const container = document.getElementById('vehicles-list');
    
    if (vehicles.length === 0) {
        container.innerHTML = '<p class="empty-state">No vehicles found. Add your first vehicle!</p>';
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
            ${vehicles.map(vehicle => {
                const customer = customers.find(c => c.id === vehicle.customerId);
                const imageHTML = vehicle.image 
                    ? `<img src="${vehicle.image}" class="vehicle-thumbnail" onclick="showVehicleImage('${vehicle.id}')" alt="Vehicle Image">` 
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

function editVehicle(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;
    
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
    document.getElementById('vehicle-color').value = vehicle.color || '';
    document.getElementById('vehicle-mileage').value = vehicle.mileage || 0;
    document.getElementById('vehicle-last-service-mileage').value = vehicle.lastServiceMileage || 0;
    
    // Display existing image if present
    const previewContainer = document.getElementById('vehicle-image-preview');
    if (vehicle.image) {
        currentVehicleImageData = vehicle.image;
        previewContainer.innerHTML = `
            <img src="${vehicle.image}" class="vehicle-image-preview" onclick="document.getElementById('vehicle-image').click()">
            <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">Click to change image</p>
        `;
    } else {
        currentVehicleImageData = null;
        previewContainer.innerHTML = '';
    }
    
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

function renderServicesList() {
    const container = document.getElementById('services-list');
    
    if (services.length === 0) {
        container.innerHTML = '<p class="empty-state">No services available. Add your first service!</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Est. Time</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${services.map(service => `
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
    const appointment = {
        id: id,
        customerId: document.getElementById('appointment-customer').value,
        vehicleId: document.getElementById('appointment-vehicle').value,
        serviceId: document.getElementById('appointment-service').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        notes: document.getElementById('appointment-notes').value,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };
    
    const existingIndex = appointments.findIndex(a => a.id === id);
    if (existingIndex >= 0) {
        appointments[existingIndex] = appointment;
    } else {
        appointments.push(appointment);
    }
    
    saveData();
    closeModal('appointment-modal');
    renderAppointmentsList();
    updateDashboard();
    showNotification('Appointment scheduled successfully!', 'success');
}

function renderAppointmentsList() {
    const container = document.getElementById('appointments-list');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p class="empty-state">No appointments found. Schedule your first appointment!</p>';
        return;
    }
    
    // Sort by date
    const sortedAppointments = [...appointments].sort((a, b) => 
        new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
    );
    
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
    workOrderParts = [];
    updateWorkOrderPartsList();
    populateWorkOrderDropdowns();
    openModal('work-order-modal');
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
        services: selectedServices,
        parts: workOrderParts.map(p => ({ partId: p.partId, quantity: p.quantity, price: p.price })),
        laborHours: parseFloat(document.getElementById('work-order-labor').value) || 0,
        partsUsed: document.getElementById('work-order-parts').value,
        notes: document.getElementById('work-order-notes').value,
        status: document.getElementById('work-order-status').value,
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

function renderWorkOrdersList() {
    const container = document.getElementById('work-orders-list');
    
    if (workOrders.length === 0) {
        container.innerHTML = '<p class="empty-state">No work orders found. Create your first work order!</p>';
        return;
    }
    
    // Sort by creation date (newest first)
    const sortedWorkOrders = [...workOrders].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Work Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${sortedWorkOrders.map(workOrder => {
                const customer = customers.find(c => c.id === workOrder.customerId);
                const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
                return `
                <tr>
                    <td>#${workOrder.id.substring(0, 8).toUpperCase()}</td>
                    <td>${formatDate(workOrder.createdAt)}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</td>
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
    
    container.innerHTML = '';
    container.appendChild(table);
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
        date: new Date(c.createdAt)
    }));
    
    vehicles.forEach(v => activities.push({
        type: 'vehicle',
        action: 'registered',
        name: `${v.year} ${v.make} ${v.model}`,
        date: new Date(v.createdAt)
    }));
    
    workOrders.forEach(w => activities.push({
        type: 'workorder',
        action: 'created',
        name: `WO #${w.id.substring(0, 8).toUpperCase()}`,
        date: new Date(w.createdAt)
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
            ${recentActivities.map(activity => `
                <li style="padding: 0.75rem; border-bottom: 1px solid var(--border-color);">
                    <strong>${activity.name}</strong> - ${activity.action} (${formatTimeAgo(activity.date)})
                </li>
            `).join('')}
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
                const imageHTML = vehicle.image 
                    ? `<img src="${vehicle.image}" class="vehicle-thumbnail" onclick="showVehicleImage('${vehicle.id}')" alt="Vehicle Image">` 
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
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Work Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredWorkOrders.map(workOrder => {
                const customer = customers.find(c => c.id === workOrder.customerId);
                const vehicle = vehicles.find(v => v.id === workOrder.vehicleId);
                return `
                <tr>
                    <td>#${workOrder.id.substring(0, 8).toUpperCase()}</td>
                    <td>${formatDate(workOrder.createdAt)}</td>
                    <td>${customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                    <td>${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'N/A'}</td>
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
    
    container.innerHTML = '';
    container.appendChild(table);
}

function renderAllLists() {
    renderCustomersList();
    renderVehiclesList();
    renderServicesList();
    renderAppointmentsList();
    renderWorkOrdersList();
    renderPartsList();
    renderInvoicesList();
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
function previewVehicleImage(input) {
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
            currentVehicleImageData = e.target.result;
            const previewContainer = document.getElementById('vehicle-image-preview');
            previewContainer.innerHTML = `
                <img src="${currentVehicleImageData}" class="vehicle-image-preview" onclick="document.getElementById('vehicle-image').click()">
                <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">Click to change image</p>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function showVehicleImage(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle || !vehicle.image) return;
    
    const displayContainer = document.getElementById('vehicle-image-display');
    displayContainer.innerHTML = `
        <img src="${vehicle.image}" class="vehicle-image-full" alt="Full Vehicle Image">
        <p style="margin-top: 1rem; color: var(--text-light);">${vehicle.year} ${vehicle.make} ${vehicle.model}</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="closeModal('vehicle-image-modal')">Close</button>
    `;
    
    openModal('vehicle-image-modal');
}

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
        partsUsed: 'Oil filter - $15.00',
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

function openAddPartToWorkOrder() {
    if (typeof parts === 'undefined' || parts.length === 0) {
        alert('No parts available. Please add parts in the Parts section first.');
        return;
    }
    
    const partId = prompt('Enter Part ID or select from console (F12):\n\n' + 
        parts.map(p => `${p.id.substring(0,8)}: ${p.name} - ${formatCurrency(p.sellingPrice)}`).join('\n'));
    
    if (!partId) return;
    
    const part = parts.find(p => p.id.startsWith(partId) || p.id === partId);
    if (!part) {
        alert('Part not found');
        return;
    }
    
    const quantity = parseInt(prompt(`Enter quantity for ${part.name}:`, '1'));
    if (!quantity || quantity < 1) return;
    
    // Check stock
    if (part.stockQuantity < quantity) {
        alert(`Insufficient stock. Available: ${part.stockQuantity}`);
        return;
    }
    
    // Add to work order parts
    workOrderParts.push({
        partId: part.id,
        name: part.name,
        quantity: quantity,
        price: part.sellingPrice,
        total: quantity * part.sellingPrice
    });
    
    updateWorkOrderPartsList();
}

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