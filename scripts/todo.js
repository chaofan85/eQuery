import $e from '../lib/main.js';

export function todo() {
  addTodo();
  deleteTodo();
  changeColor();
}

function addTodo() {
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
}

function deleteTodo() {
  $e('.list').on("click", function(e) {
    if ($(e.target).attr('class') === 'delete-item') {
      $e(e.target).parent().remove();
    }
  });
}

function changeColor() {
  $e(".colors div").on('click', function(e) {
    e.stopPropagation();
    $e(".todos").removeClass("yellow blue pink");
    const classname = e.target.getAttribute("class");
    $e(".todos").addClass(`${classname}`);
  });
}
