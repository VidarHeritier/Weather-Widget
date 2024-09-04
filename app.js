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
    iconEl.alt = `Været i dag: ${description}`;
  }

  updateWeather();

  displayForecast(data);
}

function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    clearsky_day: "Klarvær",
    clearsky_night: "Klarvær",
    clearsky_polartwilight: "Klarvær",
    fair_day: "Lettskyet",
    fair_night: "Lettskyet",
    fair_polartwilight: "Lettskyet",
    cloudy: "Skyet",
    fog: "Tåke",
    heavyrain: "Kraftig regn",
    heavyrainandthunder: "Kraftig regn og torden",
    heavyrainshowers_day: "Kraftige regnbyger",
    heavyrainshowers_night: "Kraftige regnbyger",
    heavyrainshowers_polartwilight: "Kraftige regnbyger",
    heavyrainshowersandthunder_day: "Kraftige regnbyger og torden",
    heavyrainshowersandthunder_night: "Kraftige regnbyger og torden",
    heavyrainshowersandthunder_polartwilight: "Kraftige regnbyger og torden",
    heavysleet: "Kraftig sludd",
    heavysleetandthunder: "Kraftig sludd og torden",
    heavysleetshowers_day: "Kraftige sluddbyger",
    heavysleetshowers_night: "Kraftige sluddbyger",
    heavysleetshowers_polartwilight: "Kraftige sluddbyger",
    heavysleetshowersandthunder_day: "Kraftige sluddbyger og torden",
    heavysleetshowersandthunder_night: "Kraftige sluddbyger og torden",
    heavysleetshowersandthunder_polartwilight: "Kraftige sluddbyger og torden",
    heavysnow: "Kraftig snø",
    heavysnowandthunder: "Kraftig snø og torden",
    heavysnowshowers_day: "Kraftige snøbyger",
    heavysnowshowers_night: "Kraftige snøbyger",
    heavysnowshowers_polartwilight: "Kraftige snøbyger",
    heavysnowshowersandthunder_day: "Kraftige snøbyger og torden",
    heavysnowshowersandthunder_night: "Kraftige snøbyger og torden",
    heavysnowshowersandthunder_polartwilight: "Kraftige snøbyger og torden",
    lightrain: "Lett regn",
    lightrainandthunder: "Lett regn og torden",
    lightrainshowers_day: "Lette regnbyger",
    lightrainshowers_night: "Lette regnbyger",
    lightrainshowers_polartwilight: "Lette regnbyger",
    lightrainshowersandthunder_day: "Lette regnbyger og torden",
    lightrainshowersandthunder_night: "Lette regnbyger og torden",
    lightrainshowersandthunder_polartwilight: "Lette regnbyger og torden",
    lightsleet: "Lett sludd",
    lightsleetandthunder: "Lett sludd og torden",
    lightsleetshowers_day: "Lette sluddbyger",
    lightsleetshowers_night: "Lette sluddbyger",
    lightsleetshowers_polartwilight: "Lette sluddbyger",
    lightsnow: "Lett snø",
    lightsnowandthunder: "Lett snø og torden",
    lightsnowshowers_day: "Lette snøbyger",
    lightsnowshowers_night: "Lette snøbyger",
    lightsnowshowers_polartwilight: "Lette snøbyger",
    lightssleetshowersandthunder_day: "Lette sluddbyger og torden",
    lightssleetshowersandthunder_night: "Lette sluddbyger og torden",
    lightssleetshowersandthunder_polartwilight: "Lette sluddbyger og torden",
    lightssnowshowersandthunder_day: "Lette snøbyger og torden",
    lightssnowshowersandthunder_night: "Lette snøbyger og torden",
    lightssnowshowersandthunder_polartwilight: "Lette snøbyger og torden",
    partlycloudy_day: "Delvis skyet",
    partlycloudy_night: "Delvis skyet",
    partlycloudy_polartwilight: "Delvis skyet",
    rain: "Regn",
    rainandthunder: "Regn og torden",
    rainshowers_day: "Regnbyger",
    rainshowers_night: "Regnbyger",
    rainshowers_polartwilight: "Regnbyger",
    rainshowersandthunder_day: "Regnbyger og torden",
    rainshowersandthunder_night: "Regnbyger og torden",
    rainshowersandthunder_polartwilight: "Regnbyger og torden",
    sleet: "Sludd",
    sleetandthunder: "Sludd og torden",
    sleetshowers_day: "Sluddbyger",
    sleetshowers_night: "Sluddbyger",
    sleetshowers_polartwilight: "Sluddbyger",
    sleetshowersandthunder_day: "Sluddbyger og torden",
    sleetshowersandthunder_night: "Sluddbyger og torden",
    sleetshowersandthunder_polartwilight: "Sluddbyger og torden",
    snow: "Snø",
    snowandthunder: "Snø og torden",
    snowshowers_day: "Snøbyger",
    snowshowers_night: "Snøbyger",
    snowshowers_polartwilight: "Snøbyger",
    snowshowersandthunder_day: "Snøbyger og torden",
    snowshowersandthunder_night: "Snøbyger og torden",
    snowshowersandthunder_polartwilight: "Snøbyger og torden",
  };

  return weatherDescriptions[weatherCode] || "Unknown weather";
}

function displayForecast(data) {
  const forecastRow = document.getElementById("forecast-row");

  forecastRow.innerHTML = "";

  const timeseries = data.properties.timeseries;
  const forecastDays = {};

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
    const forecastTime = forecast.time;
    const forecastDate = forecastTime.split("T")[0];

    if (forecastDate <= today) {
      continue;
    }

    if (forecastTime.includes("T12:00:00Z")) {
      forecastDays[forecastDate] = forecast;
    }

    if (Object.keys(forecastDays).length === 6) break;
  }

  for (const dateStr in forecastDays) {
    const forecast = forecastDays[dateStr];
    const forecastDate = new Date(forecast.time);

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
  }
}

fetchWeather();
