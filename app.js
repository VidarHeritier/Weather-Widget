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

    const description = getWeatherDescription(weatherCode);

    tempEl.textContent = `${currentTemp} °C`;
    iconEl.src = weatherIconUrl;
    iconEl.alt = `Current weather: ${description}`;
  }

  updateWeather();

  displayForecast(data);
}

function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    clearsky_day: "Clear sky during the day",
    clearsky_night: "Clear sky during the night",
    clearsky_polartwilight: "Clear sky during polar twilight",
    cloudy: "Cloudy",
    fair_day: "Fair weather during the day",
    fair_night: "Fair weather during the night",
    fair_polartwilight: "Fair weather during polar twilight",
    fog: "Foggy",
    heavyrain: "Heavy rain",
    heavyrainandthunder: "Heavy rain and thunder",
    heavyrainshowers_day: "Heavy rain showers during the day",
    heavyrainshowers_night: "Heavy rain showers during the night",
    heavyrainshowers_polartwilight: "Heavy rain showers during polar twilight",
    heavyrainshowersandthunder_day:
      "Heavy rain showers and thunder during the day",
    heavyrainshowersandthunder_night:
      "Heavy rain showers and thunder during the night",
    heavyrainshowersandthunder_polartwilight:
      "Heavy rain showers and thunder during polar twilight",
    heavysleet: "Heavy sleet",
    heavysleetandthunder: "Heavy sleet and thunder",
    heavysleetshowers_day: "Heavy sleet showers during the day",
    heavysleetshowers_night: "Heavy sleet showers during the night",
    heavysleetshowers_polartwilight:
      "Heavy sleet showers during polar twilight",
    heavysleetshowersandthunder_day:
      "Heavy sleet showers and thunder during the day",
    heavysleetshowersandthunder_night:
      "Heavy sleet showers and thunder during the night",
    heavysleetshowersandthunder_polartwilight:
      "Heavy sleet showers and thunder during polar twilight",
    heavysnow: "Heavy snow",
    heavysnowandthunder: "Heavy snow and thunder",
    heavysnowshowers_day: "Heavy snow showers during the day",
    heavysnowshowers_night: "Heavy snow showers during the night",
    heavysnowshowers_polartwilight: "Heavy snow showers during polar twilight",
    heavysnowshowersandthunder_day:
      "Heavy snow showers and thunder during the day",
    heavysnowshowersandthunder_night:
      "Heavy snow showers and thunder during the night",
    heavysnowshowersandthunder_polartwilight:
      "Heavy snow showers and thunder during polar twilight",
    lightrain: "Light rain",
    lightrainandthunder: "Light rain and thunder",
    lightrainshowers_day: "Light rain showers during the day",
    lightrainshowers_night: "Light rain showers during the night",
    lightrainshowers_polartwilight: "Light rain showers during polar twilight",
    lightrainshowersandthunder_day:
      "Light rain showers and thunder during the day",
    lightrainshowersandthunder_night:
      "Light rain showers and thunder during the night",
    lightrainshowersandthunder_polartwilight:
      "Light rain showers and thunder during polar twilight",
    lightsleet: "Light sleet",
    lightsleetandthunder: "Light sleet and thunder",
    lightsleetshowers_day: "Light sleet showers during the day",
    lightsleetshowers_night: "Light sleet showers during the night",
    lightsleetshowers_polartwilight:
      "Light sleet showers during polar twilight",
    lightsnow: "Light snow",
    lightsnowandthunder: "Light snow and thunder",
    lightsnowshowers_day: "Light snow showers during the day",
    lightsnowshowers_night: "Light snow showers during the night",
    lightsnowshowers_polartwilight: "Light snow showers during polar twilight",
    lightssleetshowersandthunder_day:
      "Light sleet showers and thunder during the day",
    lightssleetshowersandthunder_night:
      "Light sleet showers and thunder during the night",
    lightssleetshowersandthunder_polartwilight:
      "Light sleet showers and thunder during polar twilight",
    lightssnowshowersandthunder_day:
      "Light snow showers and thunder during the day",
    lightssnowshowersandthunder_night:
      "Light snow showers and thunder during the night",
    lightssnowshowersandthunder_polartwilight:
      "Light snow showers and thunder during polar twilight",
    partlycloudy_day: "Partly cloudy during the day",
    partlycloudy_night: "Partly cloudy during the night",
    partlycloudy_polartwilight: "Partly cloudy during polar twilight",
    rain: "Rain",
    rainandthunder: "Rain and thunder",
    rainshowers_day: "Rain showers during the day",
    rainshowers_night: "Rain showers during the night",
    rainshowers_polartwilight: "Rain showers during polar twilight",
    rainshowersandthunder_day: "Rain showers and thunder during the day",
    rainshowersandthunder_night: "Rain showers and thunder during the night",
    rainshowersandthunder_polartwilight:
      "Rain showers and thunder during polar twilight",
    sleet: "Sleet",
    sleetandthunder: "Sleet and thunder",
    sleetshowers_day: "Sleet showers during the day",
    sleetshowers_night: "Sleet showers during the night",
    sleetshowers_polartwilight: "Sleet showers during polar twilight",
    sleetshowersandthunder_day: "Sleet showers and thunder during the day",
    sleetshowersandthunder_night: "Sleet showers and thunder during the night",
    sleetshowersandthunder_polartwilight:
      "Sleet showers and thunder during polar twilight",
    snow: "Snow",
    snowandthunder: "Snow and thunder",
    snowshowers_day: "Snow showers during the day",
    snowshowers_night: "Snow showers during the night",
    snowshowers_polartwilight: "Snow showers during polar twilight",
    snowshowersandthunder_day: "Snow showers and thunder during the day",
    snowshowersandthunder_night: "Snow showers and thunder during the night",
    snowshowersandthunder_polartwilight:
      "Snow showers and thunder during polar twilight",
  };

  return weatherDescriptions[weatherCode] || "Unknown weather";
}

function displayForecast(data) {
  const forecastRow = document.getElementById("forecast-row");

  forecastRow.innerHTML = "";

  const timeseries = data.properties.timeseries;
  const forecastDays = [];

  function getWeekdayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    const norwegianWeekday = new Intl.DateTimeFormat("no-NO", options).format(
      date
    );
    return norwegianWeekday.charAt(0).toUpperCase() + norwegianWeekday.slice(1);
  }

  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < timeseries.length; i++) {
    const forecast = timeseries[i];
    const forecastDate = new Date(forecast.time);
    const dateStr = forecastDate.toISOString().split("T")[0];

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
        const description = getWeatherDescription(forecastCode);
        icon.alt = `${getWeekdayName(forecastDate)}: ${description}`;
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
