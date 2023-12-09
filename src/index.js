function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#current-icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = `${formatDate(date)},`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDay = days[day];

  return `${formattedDay}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "909ft9b4ed56801561bb3a80d18954oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "909ft9b4ed56801561bb3a80d18954oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast">
          <div class="weather-forecast-daily" id="forecast-daily">
              <span id="weather-forecast-day">${formatDay(day.time)}</span>
              
                <img src="${
                  day.condition.icon_url
                }" class="weather-forecast-icon" />
              <div class="weather-forecast-temperature">
                <span id="weather-forecast-temperature-max">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </span>
                <span id="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
           </div>`;
    }
  });
  let forecast = document.querySelector("#forecast-daily");
  forecast.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Malaysia");
