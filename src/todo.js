var main = function() {
	"use strict";

  //some TODOs to start with

  var todos = [
    "finish chapter 4",
    "have a working TODO app"
  ];
  var addTodoFromInputBox = function() {
    var $new_todo;
    var $input_todo = $(".todo-input input");
    if ($input_todo.val() !== "") {
		  $new_todo = $("<li>").text($input_todo.val());
      $new_todo.hide();
		  $("div.todos ol").prepend($new_todo);
      $new_todo.fadeIn();
      todos.push($input_todo.val());
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
    var $element = $(element),
        $todoContent;
    $element.on("click", function() {
      $(".tabs span").removeClass("active");
      $element.addClass("active");
      $("main .todos").empty();
      if ($element.parent().is(":nth-child(1)")) {
        console.log("FIRST TAB CLICKED!");
        $todoContent = $("<ol>");
        todos.reverse().forEach(function (todo) {
          $todoContent.append($("<li>").text(todo));
        });
        todos.reverse();
        $("main .todos").append($todoContent);
      } else if ($element.parent().is(":nth-child(2)")) {
        console.log("SECOND TAB CLICKED!");
        $todoContent = $("<ol>");
        todos.forEach(function (todo) {
          $todoContent.append($("<li>").text(todo));
        });
        $("main .todos").append($todoContent);
      } else if ($element.parent().is(":nth-child(3)")) {
        console.log("THIRD TAB CLICKED!");
        var $input = $("<input class=\"desc\" type=\"text\">")
        var $mcont = $("main .todos");
        $mcont.append($("<h2>").text("Add a TODO"));
        $mcont.append($input);
        var $but = $("<button>").text("+");
        $mcont.append($but);

        $("main .todos button").on("click", function (event) {
          var d = $("main .todos input.desc").val();
          console.log("TODO added " + d);
          if (d != "") {
            todos.push(d);
            $("main .content input.desc").val("");
          } else {
            window.alert("Please enter a description the new item!");
          }
        });
      }
      return false;
    });
  });

  $(".tabs a:first-child span").trigger("click");
};



$(document).ready(main);
