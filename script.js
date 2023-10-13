const apiKey = "e60d88f638e271201f2c62ad8d3ff6cf";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var responseData = await response.json();
    console.log(responseData);

    document.querySelector(".city").innerHTML = responseData.name;
    document.querySelector(".temp").innerHTML =
      Math.round(responseData.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      responseData.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      responseData.wind.speed + " km/h";

    if ((responseData.weather[0] = "Clouds")) {
      weatherIcon.src = "images/clouds.png";
    } else if ((responseData.weather[0] = "Rain")) {
      weatherIcon.src = "images/rain.png";
    } else if ((responseData.weather[0] = "Clear")) {
      weatherIcon.src = "images/clear.png";
    } else if ((responseData.weather[0] = "Snow")) {
      weatherIcon.src = "images/snow.png";
    } else if ((responseData.weather[0] = "Mist")) {
      weatherIcon.src = "images/mist.png";
    } else if ((responseData.weather[0] = "Drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  getWeather(searchBox.value);

  if (searchBox.value == "") {
    document.querySelector(".weather").style.display = "none";
  }

  searchBox.blur();
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    getWeather(searchBox.value);
    searchBox.blur();
  }

  document.querySelector(".error").style.display = "none";

  if (event.key == "Enter" && searchBox.value == "") {
    document.querySelector(".weather").style.display = "none";
  }
});
