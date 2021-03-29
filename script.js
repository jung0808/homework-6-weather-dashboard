const apiKey = "ae3e2e41e8c51db69dda599ef155ea4d";
const inputIdJs = document.getElementById("inputId");
const buttonIdJs = document.getElementById("buttonId");

buttonIdJs.addEventListener("click", function () {
  let userInputData = inputIdJs.value;
  let currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${userInputData}&units=imperial&appid=${apiKey}`;
  fetch(currentWeatherApi)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      let cityNameJs = document.getElementById("city-name");
      console.log(cityNameJs);
      cityNameJs.innerHTML = data.name;
      document.getElementById("temperature").innerHTML = data.main.temp;
    });

  //   console.log(fetch(currentWeatherApi));
  //   fetch(https://www.google.com).then(response.=>respnose.json()).then(data=>console.log(data))
});
