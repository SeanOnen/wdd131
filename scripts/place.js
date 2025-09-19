// Debug: Check if script is running
console.log("Script loaded");

// Update current year and last modified date
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');

if (currentYearSpan && lastModifiedSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;
    console.log("Last Modified set to:", document.lastModified);
} else {
    console.error("One or more DOM elements not found:", { currentYearSpan, lastModifiedSpan });
}

// Wind chill calculation function (Metric units)
function calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Static values for temperature and wind speed
const temperature = 27; // °C
const windSpeed = 8; // km/h

// Check wind chill conditions
const windChillSpan = document.getElementById('wind-chill');
if (windChillSpan) {
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillSpan.textContent = `${calculateWindChill(temperature, windSpeed)}°C`;
    } else {
        windChillSpan.textContent = 'N/A';
    }
} else {
    console.error("Wind chill span not found");
}