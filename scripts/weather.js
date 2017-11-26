import $e from '../lib/main.js';

export function weatherApp() {
  navigator.geolocation.getCurrentPosition(gotLocation, noLocation);
  showDate();
}

function gotLocation(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  return $e.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=391d793ba88597f366c30161211f6ee5`,
    dataType: 'json',
    success(data) {
      const jsonData = JSON.parse(data);
      showWeatherInfo(jsonData);
    },
    error() {
      console.error("Something's wrong.");
    }
  });
}

function noLocation() {
  $e.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?id=5128638&appid=391d793ba88597f366c30161211f6ee5',
    dataType: 'json',
    success(data) {
      const jsonData = JSON.parse(data);
      showWeatherInfo(jsonData);
    },
    error() {
      console.error("Something's wrong. :(");
    }
  });
}

function showWeatherInfo(data) {
  let area = data.name;
  let tempF = kelvinToFahrenheit(data.main.temp);
  let tempC = kelvinToCelsius(data.main.temp);
  let humidity = `${data.main.humidity}%`;
  let windSpeed = `${data.wind.speed} mph`;
  let description = data.weather[0].description;

  $e('.data').append(`<span >${area}</span>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span>${description}</span>`);
  $e('.data').append(`<p>The current temperature is ${tempF}°F`);
  $e('.data').append(`<p>The wind speed is ${windSpeed}</p>`);
  $e('.data').append(`<p>The humidity is ${humidity}</p>`);
}

function kelvinToFahrenheit(k) {
  return (k * 9 / 5 - 459.67).toFixed(0);
}

function kelvinToCelsius(k) {
  return (k - 273.15).toFixed(0);
}

function showDate() {
  const date = new Date();
  const dateString = date.toDateString();
  $e(".date").append(dateString);
}
