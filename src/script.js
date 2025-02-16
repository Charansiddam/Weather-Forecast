const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const currentLocationButton = document.getElementById('currentLocationButton');
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const forecastContainer = document.getElementById('forecastContainer');
const errorMessage = document.getElementById('errorMessage');
const recentCitiesDropdown = document.getElementById('recent-cities-dropdown');
const recentCitiesDiv = document.getElementById('recentCities');

const apiKey = '1214fc8a5b8b86794b13eca1402e3ac7';
const recentCitiesKey = 'recentCities';

// Weather Icons Map
const weatherIcons = {
    "01d": "fas fa-sun", // Clear sky day
    "01n": "fas fa-moon", // Clear sky night
    "02d": "fas fa-cloud-sun", // Few clouds day
    "02n": "fas fa-cloud-moon", // Few clouds night
    "03d": "fas fa-cloud", // Scattered clouds
    "03n": "fas fa-cloud", // Scattered clouds
    "04d": "fas fa-cloud-meatball", // Broken clouds
    "04n": "fas fa-cloud-meatball", // Broken clouds
    "09d": "fas fa-cloud-showers-heavy", // Shower rain
    "09n": "fas fa-cloud-showers-heavy", // Shower rain
    "10d": "fas fa-cloud-rain", // Rain day
    "10n": "fas fa-cloud-rain", // Rain night
    "11d": "fas fa-bolt", // Thunderstorm
    "11n": "fas fa-bolt", // Thunderstorm
    "13d": "fas fa-snowflake", // Snow
    "13n": "fas fa-snowflake", // Snow
    "50d": "fas fa-smog", // Mist
    "50n": "fas fa-smog" // Mist
};


// Function to fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            const errorData = await response.json(); // Get error details from API
            throw new Error(errorData.message || 'City not found'); // Use API error message if available
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function getForecastData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Function to display weather data
function displayWeatherData(data) {
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    const indianDate = new Date().toLocaleDateString('en-IN'); // Indian date format
    locationElement.textContent = data.name + " (" + indianDate + ")";
    temperatureElement.textContent = `${data.main.temp}°C`;
    windSpeedElement.textContent = `${data.wind.speed} M/S`;
    humidityElement.textContent = `${data.main.humidity}%`;

    // Update weather icon
    const weatherIconCode = data.weather[0].icon;
    weatherIcon.className = `weather-icon ${weatherIcons[weatherIconCode]}`; // Set both classes

    descriptionElement.textContent = data.weather[0].description; // e.g. "Light Rain"
}

function displayForecastData(data) {
    forecastContainer.innerHTML = ''; // Clear previous forecast data
    const dailyForecasts = {}; // Store the first forecast for each day

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to Date
        const dateString = date.toLocaleDateString('en-IN'); // Format date as string (Indian format)

        if (!dailyForecasts[dateString]) {
            dailyForecasts[dateString] = forecast; // Store the first forecast of the day
        }
    });

    const today = new Date();
    let forecastDaysCount = 0;

    for (const dateString in dailyForecasts) {
        const forecast = dailyForecasts[dateString];
        const date = new Date(forecast.dt * 1000);

        if (date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth()) {
            if (forecastDaysCount < 5) {
                const indianDate = date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }); // Indian date format
                const temp = Math.round(forecast.main.temp);
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;
                const icon = forecast.weather[0].icon;
                const weatherIconCode = forecast.weather[0].icon;
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-card';
                forecastItem.innerHTML = `
                    <p class="font-semibold">${indianDate}</p>
                     <i class="weather-icon ${weatherIcons[weatherIconCode]}"></i>
                    <p>Temp: ${temp}°C</p>
                    <p>Wind: ${wind} M/S</p>
                    <p>Humidity: ${humidity}%</p>
                `;
                forecastContainer.appendChild(forecastItem);
                forecastDaysCount++;
            }
        }
    }
}

// Function to get recent cities from local storage
function getRecentCities() {
    const recentCitiesString = localStorage.getItem(recentCitiesKey);
    return recentCitiesString ? JSON.parse(recentCitiesString) : [];
}

// Function to save recent cities to local storage
function saveRecentCities(cities) {
    localStorage.setItem(recentCitiesKey, JSON.stringify(cities));
}

// Function to add a city to recent cities
function addRecentCity(city) {
    let recentCities = getRecentCities();
    if (!recentCities.includes(city)) {
        recentCities.unshift(city); // Add to the beginning
        if (recentCities.length > 5) { // Limit to 5 recent cities
            recentCities.pop(); // Remove the last city
        }
        saveRecentCities(recentCities);
        populateRecentCitiesDropdown();
    }
}

// Function to populate the recent cities dropdown
function populateRecentCitiesDropdown() {
    const recentCities = getRecentCities();
    recentCitiesDropdown.innerHTML = '<option value="">Select a recent city</option>'; // Reset options
    recentCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        recentCitiesDropdown.appendChild(option);
    });

    if (recentCities.length > 0) {
        recentCitiesDiv.classList.remove('hidden');
    } else {
        recentCitiesDiv.classList.add('hidden');
    }
}


// Event listeners
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Trim whitespace
    if (city) {
        getWeatherAndForecast(city);
    } else {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
});

currentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherAndForecastByCoords(latitude, longitude);
            },
            (error) => {
                errorMessage.textContent = 'Error getting location: ' + error.message;
                errorMessage.classList.remove('hidden');
            }
        );
    } else {
        errorMessage.textContent = 'Geolocation is not supported by your browser.';
        errorMessage.classList.remove('hidden');
    }
});

// Event Listener for Recent Cities Dropdown
recentCitiesDropdown.addEventListener('change', () => {
    const selectedCity = recentCitiesDropdown.value;
    if (selectedCity) {
        getWeatherAndForecast(selectedCity);
    }
});


async function getWeatherAndForecast(city) {
    try {
        const weatherData = await getWeatherData(city);
        const forecastData = await getForecastData(city);
        displayWeatherData(weatherData);
        displayForecastData(forecastData);
        addRecentCity(city); // Add the city to recent cities
        errorMessage.classList.add('hidden');
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
}

async function getWeatherAndForecastByCoords(latitude, longitude) {
    try {
        // Reverse geocode to get city name (optional)
        const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        const geoResponse = await fetch(apiUrl);
        const geoData = await geoResponse.json();
        const city = geoData[0].name;
        getWeatherAndForecast(city);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
}

async function getWeatherDataByCoords(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error fetching weather data");
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        throw error;
    }
}
// Call populateRecentCitiesDropdown on page load
populateRecentCitiesDropdown();