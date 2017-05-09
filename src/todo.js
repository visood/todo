var main = function() {
	"use strict";

  var addTodoFromInputBox = function() {
    var $new_todo;
    var $input_todo = $(".todo-input input");
    if ($input_todo.val() !== "") {
		  $new_todo = $("<li>").text($input_todo.val());
      $new_todo.hide();
		  $("div.todos ol").append($new_todo);
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


  $(".tabs span").toArray().forEach(function (element) {
    //create a click handler for this element
    //note that element is a DOM element, use $ to get a jQuery object
    var $element = $(element);
    $element.on("click", function() {
      $(".tabs span").removeClass("active");
      $element.addClass("active");
      $("main .todos").empty();

      if ($element.parent().is(":nth-child(1)")) {
        console.log("FIRST TAB CLICKED!");
      } else if ($element.parent().is(":nth-child(2)")) {
        console.log("SECOND TAB CLICKED!");
      } else if ($element.parent().is(":nth-child(3)")) {
        console.log("THIRD TAB CLICKED!");
      }
      return false;
    });
  });
};



$(document).ready(main);
