var main = function() {
	"use strict";

  var addTodoFromInputBox = function() {
    var $new_todo;
    var $input_todo = $(".todo-input input");
    if ($input_todo.val() !== "") {
		  $new_todo = $("<li>").text($input_todo.val());
      $new_todo.hide();
		  $("section.todos ol").append($new_todo);
      $new_todo.fadeIn();
    }

    $input_todo.val("");
  };

	$(".todo-input button").on("click", function (event) {
		console.log("Hello World! Whats TODO today?")

    addTodoFromInputBox();
	});

	$(".todo-input input").on("keypress", function (event) {
    var $new_todo;
    if (event.keyCode == 13) {
      addTodoFromInputBox();
    }
	});

};

$(document).ready(main);
