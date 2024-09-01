/* const weatherAPI =
  "https://api.met.no/weatherapi/locationforecast/2.0/?lat=60.39&lon=5.33&altitude=10";

const backgroundImages = [
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/2f6f6e03-8a64-4704-9922-a750c7eb4935.jpg?h=a36c1261925cf3ce0c7fb5b2d81a57f3",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/ca744083-b974-4e45-a1b1-7e709b894111_rw_1920.jpg?h=65d1d8b072ccfd6da6f0f14ef314ee5e",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/56e19612-9437-4e91-83fc-81b08996b976_rw_1920.jpg?h=fce711015addbfa17f39201cd21c6400",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/77b3da7e-db29-42de-b0e2-a1b8997e5d60_rw_1920.jpg?h=5daa0fc40ea67426c6f56c04e7011837",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/e8c8b0e4-598c-41b5-9b77-e35a1934fd91_rw_1920.jpg?h=f43747926d774b630ef4cdaf423e93f0",
];

function setRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedImage = backgroundImages[randomIndex];

  document.body.style.backgroundImage = `url('${selectedImage}')`;
}

setRandomBackgroundImage();

async function fetchWeather() {
  const response = await fetch(weatherAPI);
  const data = await response.json();

  const currentTemp =
    data.properties.timeseries[0].data.instant.details.air_temperature;
  const weatherCode =
    data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

  console.log(data);

  const weatherIconUrl = `https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/${weatherCode}.svg`;

  function updateWeather() {
    const tempEl = document.getElementById("temp");
    const iconEl = document.getElementById("weather-icon");

    tempEl.textContent = `${currentTemp} °C`;
    iconEl.src = weatherIconUrl;
  }

  updateWeather();
}

fetchWeather();
*/

const weatherAPI =
  "https://api.met.no/weatherapi/locationforecast/2.0/?lat=60.39&lon=5.33&altitude=10";

const backgroundImages = [
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/2f6f6e03-8a64-4704-9922-a750c7eb4935.jpg?h=a36c1261925cf3ce0c7fb5b2d81a57f3",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/ca744083-b974-4e45-a1b1-7e709b894111_rw_1920.jpg?h=65d1d8b072ccfd6da6f0f14ef314ee5e",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/56e19612-9437-4e91-83fc-81b08996b976_rw_1920.jpg?h=fce711015addbfa17f39201cd21c6400",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/77b3da7e-db29-42de-b0e2-a1b8997e5d60_rw_1920.jpg?h=5daa0fc40ea67426c6f56c04e7011837",
  "https://cdn.myportfolio.com/95414602-2cfc-4db8-b0e5-8f8f0ab0f701/e8c8b0e4-598c-41b5-9b77-e35a1934fd91_rw_1920.jpg?h=f43747926d774b630ef4cdaf423e93f0",
];

function setRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedImage = backgroundImages[randomIndex];

  document.body.style.backgroundImage = `url('${selectedImage}')`;
}

setRandomBackgroundImage();

async function fetchWeather() {
  const response = await fetch(weatherAPI);
  const data = await response.json();

  const currentTemp =
    data.properties.timeseries[0].data.instant.details.air_temperature;
  const weatherCode =
    data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

  console.log(data);

  const weatherIconUrl = `https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/${weatherCode}.svg`;

  function updateWeather() {
    const tempEl = document.getElementById("temp");
    const iconEl = document.getElementById("weather-icon");

    tempEl.textContent = `${currentTemp} °C`;
    iconEl.src = weatherIconUrl;
  }

  updateWeather();

  displayForecast(data);
}

function displayForecast(data) {
  const forecastRow = document.getElementById("forecast-row");

  forecastRow.innerHTML = "";

  const timeseries = data.properties.timeseries;
  const forecastDays = [];

  function getWeekdayName(dateString) {
    const date = new Date(dateString);
  const options = { weekday: 'long' };
  const norwegianWeekday = new Intl.DateTimeFormat('no-NO', options).format(date);
  return norwegianWeekday.charAt(0).toUpperCase() + norwegianWeekday.slice(1);
  }

  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < timeseries.length; i++) {
    const forecast = timeseries[i];
    const forecastDate = new Date(forecast.time);
    const dateStr = forecastDate.toISOString().split('T')[0];

    if (dateStr <= today) {
      continue;
    }

    if (!forecastDays.includes(dateStr)) {
      forecastDays.push(dateStr);

      const forecastTemp = forecast.data.instant.details.air_temperature;
      const forecastCode = forecast.data.next_6_hours
        ? forecast.data.next_6_hours.summary.symbol_code
        : null;

      const forecastIconUrl = forecastCode
        ? `https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/${forecastCode}.svg`
        : "";

      const forecastItem = document.createElement("div");
      forecastItem.style.textAlign = "center";

      const weekday = document.createElement("p");
      weekday.textContent = getWeekdayName(forecastDate);
      forecastItem.appendChild(weekday);

      if (forecastIconUrl) {
        const icon = document.createElement("img");
        icon.src = forecastIconUrl;
        icon.alt = `Weather icon for ${dateStr}`;
        forecastItem.appendChild(icon);
      }

      const temp = document.createElement("p");
      temp.textContent = `${forecastTemp} °C`;
      forecastItem.appendChild(temp);

      forecastRow.appendChild(forecastItem);

      if (forecastDays.length === 6) break;
    }
  }
}




fetchWeather();
