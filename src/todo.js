var main = function() {
	"use strict";
	$(".todo-input button").on("click", function (event) {
		console.log("Hello World! Whats TODO today?")
    var $input_todo = $(".todo-input input");
    if ($input_todo.val() !== "") {
		  var $new_todo = $("<li>").text($input_todo.val());
		  $("section.todos ol").append($new_todo);
    }

	});
};

$(document).ready(main);
