const apiKey = "ab9a9400f6470f1d0ba5af5481e8ac9d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (!response.ok) {
    console.error("Failed to fetch weather data:", response.statusText);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();
  console.log(data);

  if (!data.main || !data.weather || !data.weather[0]) {
    console.error("Weather data is not available:", data);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + "km/h";

  switch (data.weather[0].main.toLowerCase()) {
    case "clouds":
      weatherIcon.src = "img/cloudy.png";
      break;
    case "clear":
      weatherIcon.src = "img/clear.png";
      break;
    case "rain":
      weatherIcon.src = "img/rain.png";
      break;
    case "snow":
      weatherIcon.src = "img/snow.png";
      break;
    case "thunderstorm":
      weatherIcon.src = "img/thunderstorm.png";
      break;
    case "mist":
      weatherIcon.src = "img/mist.png";
      break;
    case "haze":
      weatherIcon.src = "img/haze.png";
      break;
    case "fog":
      weatherIcon.src = "img/fog.png";
      break;
    default:
      weatherIcon.src = "img/default.png";
      break;
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
