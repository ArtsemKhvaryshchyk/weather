const apiKey = "ab9a9400f6470f1d0ba5af5481e8ac9d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°c`;
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    
    const gifPaths = {
      clouds: "images/gifs/cloudy.gif",
      clear: "images/gifs/clear.gif",
      rain: "images/gifs/rain.gif",
      snow: "images/gifs/snow.gif",
      thunderstorm: "images/gifs/thunderstorm.gif",
      mist: "images/gifs/mist.gif",
      haze: "images/gifs/haze.gif"
    };

    weatherIcon.src = gifPaths[weatherCondition] || "images/gifs/clear.gif";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim()) {
    checkWeather(searchBox.value.trim());
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchBox.value.trim()) {
    checkWeather(searchBox.value.trim());
  }
});