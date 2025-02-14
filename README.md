# Weather Forecast 

This is a web-based weather forecast application that displays current weather information and a 5-day forecast for a given city or the user's current location.  It utilizes the OpenWeatherMap API and features a clean, responsive design.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Code Explanation](#code-explanation)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Weather Forecast System provides a user-friendly way to access weather information. Users can search for weather by city name or use their current location. The application displays current weather details (temperature, wind, humidity, icon, description) and a 5-day forecast.  Recently searched cities are stored for quick access.

## Features

*   **City Search:** Enter a city name to get weather and forecast data.
*   **Current Location Weather:** Use geolocation to get weather for your current location.
*   **Current Weather Display:** Shows temperature, wind speed, humidity, weather icon, and description.
*   **5-Day Forecast:** Displays the forecast for the next 5 days.
*   **Recent Cities:** Stores recently searched cities for quick access.
*   **Responsive Design:** Adapts to different screen sizes.
*   **Error Handling:** Displays informative error messages.

## Usage

1.  Open `index.html` in your browser.
2.  Enter a city name in the search field and click "Search."
3.  Click "Use Current Location" to get weather for your location (grant permission if prompted).
4.  Use the "Recent Cities" dropdown to quickly view weather for previously searched locations.

## Technologies Used

*   HTML
*   CSS (Tailwind CSS)
*   JavaScript
*   OpenWeatherMap API

## Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)Charansiddam/Weather-Forecast/.git
    ```
2.  **Open `index.html`:** Open the `index.html` file in your web browser.
3.  **API Key:**  You will need an OpenWeatherMap API key.
    *   Go to [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up) and create an account.
    *   Go to your API keys page and generate a key.
    *   Replace the placeholder API key (`'1214fc8a5b8b86794b13eca1402e3ac7'`) in `script.js` with your actual key.

## Code Explanation

*   `script.js`: Contains all the JavaScript logic.
    *   `getWeatherData()`: Fetches current weather data.
    *   `getForecastData()`: Fetches 5-day forecast data.
    *   `displayWeatherData()`: Updates the UI with current weather.
    *   `displayForecastData()`: Updates the UI with forecast data.
    *   `getRecentCities()`, `saveRecentCities()`, `addRecentCity()`: Handle recent city storage.
    *   Event listeners handle user interactions.

## Known Limitations

*   Requires an OpenWeatherMap API key.
*   Geolocation accuracy depends on the user's device and browser.
*   Styling is basic; further CSS enhancements are possible.
*   Recent cities are only stored in local storage.

## Future Enhancements

*   More robust error handling.
*   Improved UI/UX.
*   Backend server and database for persistent data.
*   Support for different units (e.g., Fahrenheit).
*   Search suggestions and autocompletion.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.


## Contact

siddamcharan@gmail.com
