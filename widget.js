$e(function() {

  $e('.submit').on('click', function(e){
    e.preventDefault();
    const value = document.querySelector('.input').value;
    if (value) {
      $e('.list').
      append(`<li class="list-item"><span class="item">${value}</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="delete-item">X</span></li>`);
    }
    document.querySelector('.input').value = "";
  });

  $e('.list').on("click", function(e) {
    if ($(e.target).attr('class') === 'delete-item') {
      $e(e.target).parent().remove();
    }
  });

  $e.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=NY,US&appid=391d793ba88597f366c30161211f6ee5',
    dataType: 'json',
    success(data) {

      const jsonData = JSON.parse(data);
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

    $e('.data').append(`<span >${area}</span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span>${description}</span>`);
    $e('.data').append(`<p>The current temperature is ${tempF}°F`);
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
