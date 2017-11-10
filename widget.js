$e(function() {

  $e('.submit').on('click', function(e){
    e.preventDefault();
    const value = document.querySelector('.input').value;
    if (value) {
      $e('.list').append(`<li>${value}</li>`);
    }
    document.querySelector('.input').value = "";
  });

  $e.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=391d793ba88597f366c30161211f6ee5',
    dataType: 'json',
    success(data) {

      const jsonData = JSON.parse(data);
      console.log(jsonData);
      showWeatherInfo(jsonData);
    },
    error() {
      console.error("Something's wrong.");
    }
  });

  function showWeatherInfo(data) {
    // debugger
    let area = data.name;
    let tempF = kelvinToFahrenheit(data.main.temp);
    let tempC = kelvinToCelsius(data.main.temp);
    let humidity = `${data.main.humidity}%`;
    let windSpeed = `${data.wind.speed} mph`;
    let description = data.weather[0].description;

    $e('.data').append(`<p>${area}</p>`);
    $e('.data').append(`<p>${description}</p>`);
    $e('.data').append(`<p>The current temperature is ${tempF}&#8457;`);
    $e('.data').append(`<p>The windSpeed is ${windSpeed}</p>`);
    $e('.data').append(`<p>The humidity is ${humidity}</p>`);
  }

  function kelvinToFahrenheit(k) {
    return (k * 9 / 5 - 459.67).toFixed(0);
  }
  function kelvinToCelsius(k) {
    return (k - 273.15).toFixed(0);
  }

  const date = new Date();
  const dateString = date.toDateString();
  $e(".date").append(dateString);
});
