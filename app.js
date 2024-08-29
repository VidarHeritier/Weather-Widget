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
}

fetchWeather();
