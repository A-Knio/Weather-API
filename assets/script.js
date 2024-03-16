const apiKey = 'a7b59d28fe970bacf4c352d10dbc86c4';

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

function updateWeatherData(data) {
  const cityNameElement = document.getElementById('cityName');
  const temperatureElement = document.getElementById('temperature');
  const humidityElement = document.getElementById('humidity');
  const windSpeedElement = document.getElementById('windSpeed');
  const weatherIconElement = document.getElementById('weatherIcon');

  cityNameElement.textContent = data.name;
  temperatureElement.textContent = `Temperature: ${data.main.temp}`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIconElement.src = iconUrl;
}

document.getElementById('weatherSearchBtn').addEventListener('click', async () => {
  const city = document.getElementById('weatherSearchInput').value;
  const weatherData = await fetchWeatherData(city);
  updateWeatherData(weatherData);
});