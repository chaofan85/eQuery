$e(function() {
  console.log($e('h2').html());

  $e('.submit').on('click', function(e){
    e.preventDefault();
    const value = document.querySelector('.input').value;
    $e('.list').append(`<li>${value}</li>`);
    document.querySelector('.input').value = "";
  });
});
