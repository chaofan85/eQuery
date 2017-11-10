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
    console.log(data.weather[0].main);
    console.log(data.main.temp, data.main.humidity);
    return;
  }
});
