$e(function() {

  $e('.submit').on('click', function(e){
    e.preventDefault();
    const value = document.querySelector('.input').value;
    if (value) {
      $e('.list').append(`<li>${value}</li>`);
    }
    document.querySelector('.input').value = "";
  });
});
