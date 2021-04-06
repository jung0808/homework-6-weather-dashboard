const apiKey = "ae3e2e41e8c51db69dda599ef155ea4d";
const inputIdJs = document.getElementById("inputId");
const buttonIdJs = document.getElementById("buttonId");

function getUvIndex(latitude, longitude) {
  let currentUvIndexApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`;
  fetch(currentUvIndexApi)
    .then((Response) => Response.json())
    .then((uvIndexdata) => {
      console.log("This is my UV Index Data", uvIndexdata);
      console.log(uvIndexdata.current.uvi);
      let uviData = document.getElementById("uv-number");
      uviData.innerHTML = uvIndexdata.current.uvi;
      if (uvIndexdata.current.uvi <= 2) {
        uviData.style.backgroundColor = "#33FF57";
      } else if (uvIndexdata.current.uvi >= 3 && uvIndexdata.current.uvi <= 7) {
        uviData.style.backgroundColor = "orange";
      } else {
        uviData.style.backgroundColor = "red";
      }
      // } else if (uvIndexdata.current.uvi < 7) {
      //   uviData.style.backgroundColor = "#FF7733";
      // } else uvIndexdata.current.uvi > 7;
      // {
      //   uviData.style.backgroundColor = "red";
      // }

      // let weatherResultDiv = document.getElementById("weather-result");
      // weatherResultDiv.append(uviData);
      // console.log(uvIndexdata.daily);
      getFiveDays(uvIndexdata.daily);
    });
}

function getFiveDays(fiveDaysForecast) {
  document.getElementById("five-day-forecast").style.display = "flex";
  console.log(fiveDaysForecast);
  for (let i = 0; i < 5; i++) {
    let dailyForecast = document.getElementById(i + 1);
    // console.log(dailyForecast.childNodes[0]);
    console.log(dailyForecast);
    console.log(dailyForecast.childNodes);
    console.log(fiveDaysForecast[i].dt);
    var dateString = moment.unix(fiveDaysForecast[i].dt).format("MM/DD/YYYY");
    dailyForecast.childNodes[1].innerHTML = dateString;
    dailyForecast.childNodes[3].src = `http://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png`;
    console.log(fiveDaysForecast[i].weather[0].icon);

    dailyForecast.childNodes[5].innerHTML = fiveDaysForecast[i].temp.day + "℉ ";
    dailyForecast.childNodes[7].innerHTML = fiveDaysForecast[i].humidity + "% ";
    console.log(fiveDaysForecast[i].temp.day);
    console.log(fiveDaysForecast[i].humidity);
  }
}

buttonIdJs.addEventListener("click", function () {
  let userInputData = inputIdJs.value;
  let currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${userInputData}&units=imperial&appid=${apiKey}`;
  fetch(currentWeatherApi)
    .then((Response) => Response.json())
    .then((data) => {
      document.getElementById("weather-result").style.display = "block";
      document.getElementById("five-day-title").style.display = "block";
      console.log(data);
      console.log(data.coord.lat);
      console.log(data.coord.lon);
      let cityNameJs = document.getElementById("city-name");
      var dateString = moment.unix(data.dt).format("MM/DD/YYYY");
      let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      let weatherIcon2 = document.getElementById("image-icon");
      weatherIcon2.src = weatherIcon;
      // console.log(data.weather[0].icon);
      // console.log(dateString);
      console.log(weatherIcon2);
      // document.getElementById("weather-result").appendChild(weatherIcon2);
      cityNameJs.innerHTML = data.name + "    " + dateString + "  ";
      document.getElementById("temperature").innerHTML =
        "Current Temperature:  " + data.main.temp + " ℉";
      document.getElementById("humidity").innerHTML =
        "Current Humidity:  " + data.main.humidity + "%";
      document.getElementById("wind-speed").innerHTML =
        "Current Wind Speed:  " + data.wind.speed + " MPH";
      getUvIndex(data.coord.lat, data.coord.lon);
    });
  //   console.log(fetch(currentWeatherApi));
  //   fetch(https://www.google.com).then(response.=>respnose.json()).then(data=>console.log(data))
});
