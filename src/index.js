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
  //   let highTempElement = document.querySelector("#high-temp");
  //   let lowTempElement = document.querySelector("#low-temp");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  //   highTempElement.innerHTML = `${response.data.temperature.maximum}°C`;
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
  // let dates = date.getDate();
  // let month = date.getMonth();
  // let months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "Jul",
  //   "Aug",
  //   "Sept",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // // let year = date.getFullYear();

  // // if (dates < 10) {
  // //   dates = `0${dates}`;
  // // }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDay = days[day];
  // let formattedMonth = months[month];
  return `${formattedDay}, ${hours}:${minutes}`;
  // ${dates}/${formattedMonth}/${year},
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// let currentDateELement = document.querySelector("#current-date");
// let now = new Date();

// currentDateELement.innerHTML = formatDate(now);
searchCity("Paris");
