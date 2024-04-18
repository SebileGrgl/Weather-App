const apiKey = "494526258fb81b1890419b93dcedea45";
const cityInput = document.querySelector(".city-input");
const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box");
const weatherInfoBox = document.querySelector(".weather-info-box");
const weatherDetails = document.querySelector(".weather-details");
const informationBox = document.querySelector(".information-box");
const errorBox = document.querySelector(".error-container");

const weatherImages = {
  clear: "./images/clear.svg",
  clouds: "./images/cloudy-day.svg",
  rain: "./images/rainy.svg",
  snow: "./images/snowy.svg",
  thunderstorm: "./images/thunder.svg",
};

function getWeather() {
  const cityName = document.querySelector(".city-input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod === "404") {
        informationBox.classList.add("unvisible");
        errorBox.classList.remove("unvisible");
        errorBox.classList.add("active");
      } else {
        const temperature = document.querySelector(".weather-info-box h1");
        const weatherImg = document.querySelector(".weather-img");
        const weatherDescription = document.querySelector(".weather-desc");
        const humidity = document.querySelector(".humidity-info");
        const windSpeed = document.querySelector(".wind-info");

        errorBox.classList.add("unvisible");
        informationBox.classList.remove("unvisible");
        temperature.innerHTML = `${parseInt(data.main.temp)}°C`;
        weatherDescription.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        windSpeed.innerHTML = `${parseInt(data.wind.speed)}Km/s`;

        weatherImg.src = weatherImages[data.weather[0].main.toLowerCase()];
      }
    })
    .then(() => {
      weatherInfoBox.classList.add("active");
      weatherDetails.classList.add("active");

      setTimeout(() => {
        weatherDetails.classList.remove("active");
        weatherInfoBox.classList.remove("active");
      }, 3000);
    });
}

searchIcon.addEventListener("click", () => {
  const cityName = document.querySelector(".city-input").value;

  if (cityName === "") {
    searchBox.classList.add("shake-input");
    setTimeout(() => {
      searchBox.classList.remove("shake-input");
    }, 300);
  } else {
    getWeather();
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const cityName = document.querySelector(".city-input").value;
    if (cityName === "") {
      searchBox.classList.add("shake-input");
      setTimeout(() => {
        searchBox.classList.remove("shake-input");
      }, 300);
    } else {
      getWeather();
    }
  }
});
